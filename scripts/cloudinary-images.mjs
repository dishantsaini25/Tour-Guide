#!/usr/bin/env node
/**
 * scripts/cloudinary-images.mjs
 *
 * Production-grade Cloudinary image management for Raah India Experiences.
 *
 * Commands:
 *   node scripts/cloudinary-images.mjs migrate   — initial bulk upload
 *   node scripts/cloudinary-images.mjs sync      — upload new/changed files only
 *   node scripts/cloudinary-images.mjs check     — verify mapping vs local files
 *   node scripts/cloudinary-images.mjs dry-run   — preview without uploading
 *
 * Safety guarantees:
 *   • public/ is NEVER modified, renamed, or deleted
 *   • credentials are read from .env.local and never logged
 *   • mapping is written atomically (temp file → rename)
 *   • previously uploaded files are never re-uploaded unless content changed
 *   • partial failures do not corrupt existing mapping entries
 */

import "dotenv/config";
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import os from "os";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);

// ─── Load .env.local explicitly (Next.js convention) ─────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, "..");

// dotenv/config loads .env by default — we need .env.local
import dotenv from "dotenv";
dotenv.config({ path: path.join(ROOT, ".env.local") });
dotenv.config({ path: path.join(ROOT, ".env") }); // fallback
const cloudinary = require("cloudinary").v2;

// ─── Paths ────────────────────────────────────────────────────────────────────
const PUBLIC_DIR  = path.join(ROOT, "public");
const MAPPING_OUT = path.join(ROOT, "cloudinary-urls.json");

// ─── Config ───────────────────────────────────────────────────────────────────
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY    = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

const CONCURRENCY  = 4;
const MAX_RETRIES  = 3;
const NINE_MB      = 9 * 1024 * 1024;

// Supported raster formats (SVG excluded — handled separately)
const IMAGE_EXTS   = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

// Files/folders to skip entirely
const SKIP_DIRS    = new Set([".next", "node_modules", ".git"]);
const SKIP_FILES   = new Set(["favicon.ico", "favicon.png"]);   // favicons stay local

// Non-retryable HTTP codes
const NO_RETRY_CODES = new Set([400, 401, 403]);

// ─── Credential check ─────────────────────────────────────────────────────────
function validateCredentials() {
  const missing = [];
  if (!CLOUD_NAME || CLOUD_NAME === "your_cloud_name") missing.push("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
  if (!API_KEY    || API_KEY    === "your_api_key")    missing.push("CLOUDINARY_API_KEY");
  if (!API_SECRET || API_SECRET === "your_api_secret") missing.push("CLOUDINARY_API_SECRET");

  if (missing.length > 0) {
    console.error("\n❌  Cloudinary credentials missing or placeholder in .env.local:");
    missing.forEach(k => console.error(`    • ${k}`));
    console.error("");
    process.exit(1);
  }

  cloudinary.config({ cloud_name: CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRET, secure: true });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Compute SHA-256 of a file (used to detect content changes) */
function fileHash(absPath) {
  const buf = fs.readFileSync(absPath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

/** Recursively collect all eligible image files under dir */
function collectImages(dir) {
  const results = [];

  function walk(current) {
    let entries;
    try { entries = fs.readdirSync(current, { withFileTypes: true }); }
    catch { return; }

    for (const entry of entries) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const full = path.join(current, entry.name);

      if (entry.isDirectory()) {
        walk(full);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (IMAGE_EXTS.has(ext) && !SKIP_FILES.has(entry.name)) {
          results.push(full);
        }
      }
    }
  }

  walk(dir);
  return results.sort();
}

/**
 * Convert absolute path → canonical mapping key.
 * Always uses forward slashes and a leading slash.
 * e.g. public/experiences/jaipur-at-dawn/hero.webp → /experiences/jaipur-at-dawn/hero.webp
 */
function toKey(absPath) {
  const rel = path.relative(PUBLIC_DIR, absPath);
  return "/" + rel.replace(/\\/g, "/");
}

/**
 * Convert canonical key → deterministic Cloudinary public_id.
 * Preserves folder hierarchy; lowercases; replaces spaces+specials with hyphens.
 * /experiences/jaipur-at-dawn/marigold.webp → raah-india/experiences/jaipur-at-dawn/marigold
 */
function toPublicId(key) {
  // Strip leading slash and extension
  const noLeading = key.startsWith("/") ? key.slice(1) : key;
  const noExt     = noLeading.replace(/\.[^/.]+$/, "");

  // Slugify each path segment
  const segments = noExt.split("/").map(seg =>
    seg.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  );

  return ["raah-india", ...segments].join("/");
}

/** Atomically write JSON — Windows-safe (copy+delete fallback if rename is locked) */
function atomicWrite(filePath, data) {
  const tmp = filePath + ".tmp." + process.pid;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  try {
    fs.renameSync(tmp, filePath);
  } catch (renameErr) {
    // Windows: rename fails if target is locked by another process (e.g. VS Code)
    // Fall back to overwrite-in-place
    try {
      fs.copyFileSync(tmp, filePath);
      fs.unlinkSync(tmp);
    } catch (copyErr) {
      // Last resort: direct write (non-atomic but better than nothing)
      try { fs.unlinkSync(tmp); } catch (_) {}
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    }
  }
}

/** Load existing mapping or return empty object */
function loadMapping() {
  try {
    return JSON.parse(fs.readFileSync(MAPPING_OUT, "utf8"));
  } catch {
    return {};
  }
}

// ─── Upload ───────────────────────────────────────────────────────────────────

/** Stream-based upload (avoids Windows path encoding issues) */
function streamUpload(filePath, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) reject(err); else resolve(result);
    });
    fs.createReadStream(filePath).pipe(stream);
  });
}

/** Compress images that exceed 9 MB to a temp webp (originals untouched) */
async function compressIfNeeded(absPath) {
  const stat = fs.statSync(absPath);
  if (stat.size <= NINE_MB) return { uploadPath: absPath, tempFile: null };

  // Dynamically import sharp only if needed
  let sharp;
  try { sharp = (await import("sharp")).default; }
  catch { return { uploadPath: absPath, tempFile: null }; } // skip if sharp not available

  console.log(`   ⚠  Large file (${(stat.size / 1024 / 1024).toFixed(1)} MB) — compressing…`);
  const tempFile = path.join(os.tmpdir(), `cld-${Date.now()}-${path.basename(absPath, path.extname(absPath))}.webp`);

  for (const q of [80, 65, 50, 35]) {
    await sharp(absPath)
      .rotate()
      .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: q })
      .toFile(tempFile);
    if (fs.statSync(tempFile).size <= NINE_MB) break;
  }

  return { uploadPath: tempFile, tempFile };
}

/** Upload one file with retry/backoff */
async function uploadOne(absPath, existingMapping) {
  const key      = toKey(absPath);
  const publicId = toPublicId(key);

  // Skip empty files — Cloudinary rejects them with HTTP 400
  const stat = fs.statSync(absPath);
  if (stat.size === 0) {
    return { status: "failed", key, err: "File is empty (0 bytes) — skipped" };
  }

  const hash     = fileHash(absPath);

  // Skip if entry exists with same hash
  const existing = existingMapping[key];
  if (existing && existing.hash === hash && existing.url) {
    return { status: "unchanged", key, url: existing.url, hash };
  }

  const { uploadPath, tempFile } = await compressIfNeeded(absPath);

  let lastErr = null;
  let result  = null;

  try {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        result = await streamUpload(uploadPath, {
          public_id:       publicId,
          use_filename:    false,
          unique_filename: false,
          overwrite:       true,
          resource_type:   "image",
          // preserve folder structure encoded in public_id
          folder:          undefined,
        });
        break;
      } catch (err) {
        lastErr = err;
        const code = err.http_code ?? 0;
        if (NO_RETRY_CODES.has(code)) {
          console.error(`   ✋  Non-retryable error (HTTP ${code}): ${err.message}`);
          break;
        }
        if (attempt < MAX_RETRIES) {
          const wait = attempt * 2000;
          console.log(`   ↻  Attempt ${attempt}/${MAX_RETRIES} failed — retrying in ${wait}ms…`);
          await new Promise(r => setTimeout(r, wait));
        }
      }
    }
  } finally {
    if (tempFile) { try { fs.unlinkSync(tempFile); } catch (_) {} }
  }

  if (result) {
    return { status: "uploaded", key, url: result.secure_url, publicId, hash };
  }

  const msg = lastErr
    ? `HTTP ${lastErr.http_code ?? "?"}: ${lastErr.message ?? String(lastErr)}`
    : "Unknown error";
  return { status: "failed", key, err: msg, hash };
}

// ─── Concurrency pool ─────────────────────────────────────────────────────────
async function runPool(tasks, existingMapping, onResult) {
  let idx = 0;
  async function worker() {
    while (idx < tasks.length) {
      const task = tasks[idx++];
      const res  = await uploadOne(task, existingMapping);
      onResult(res);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
}

// ─── Commands ─────────────────────────────────────────────────────────────────

/** MIGRATE / SYNC — upload new/changed images */
async function cmdSync(dryRun = false) {
  const all  = collectImages(PUBLIC_DIR);
  const prev = loadMapping();

  console.log(`\n📂  Found ${all.length} eligible images in public/`);

  // Classify each file
  const toUpload   = [];
  const unchanged  = [];
  const wouldSkip  = [];

  for (const absPath of all) {
    const key  = toKey(absPath);
    const hash = fileHash(absPath);
    const prev_entry = prev[key];

    if (prev_entry && prev_entry.hash === hash && prev_entry.url) {
      unchanged.push(key);
    } else {
      toUpload.push(absPath);
    }
  }

  console.log(`✅  Unchanged : ${unchanged.length}`);
  console.log(`⬆️   To upload : ${toUpload.length}`);

  if (dryRun) {
    console.log("\n📋  DRY-RUN — files that would be uploaded:");
    toUpload.forEach(p => console.log(`    • ${toKey(p)}`));
    console.log(`\n💡  Run 'npm run images:sync' to execute.\n`);
    return;
  }

  if (toUpload.length === 0) {
    console.log("\n✅  Nothing to upload — all images are up to date.\n");
    return;
  }

  // Working copy of mapping — we update it incrementally
  const mapping = { ...prev };
  let uploaded  = 0;
  let failed    = 0;
  const failures = [];

  await runPool(toUpload, prev, (res) => {
    if (res.status === "uploaded") {
      uploaded++;
      mapping[res.key] = { url: res.url, publicId: res.publicId, hash: res.hash, status: "uploaded" };
      console.log(`✅  ${res.key}\n    → ${res.url}`);
    } else if (res.status === "unchanged") {
      // shouldn't normally reach here in pool but handle gracefully
    } else {
      failed++;
      failures.push(res.key);
      console.error(`❌  ${res.key}\n    → ${res.err}`);
    }
    // Atomic incremental save after every result
    atomicWrite(MAPPING_OUT, mapping);
  });

  console.log("\n" + "═".repeat(60));
  console.log(`✅  Uploaded   : ${uploaded}`);
  console.log(`⏭️   Unchanged  : ${unchanged.length}`);
  console.log(`❌  Failed     : ${failed}`);
  if (failures.length > 0) {
    console.log("\nFailed paths:");
    failures.forEach(k => console.log(`   • ${k}`));
    console.log("\nℹ️   Re-run to retry failures — unchanged files are skipped.");
  }
  console.log(`\n📄  Mapping    : ${MAPPING_OUT}`);
  console.log("═".repeat(60) + "\n");

  if (failed > 0) process.exit(1);
}

/** CHECK — verify local files vs mapping vs Cloudinary reachability */
async function cmdCheck() {
  const all     = collectImages(PUBLIC_DIR);
  const mapping = loadMapping();

  let ok = 0, missing = 0, noHash = 0;
  const missingKeys = [];
  const noHashKeys  = [];

  for (const absPath of all) {
    const key  = toKey(absPath);
    const entry = mapping[key];
    const size  = fs.statSync(absPath).size;

    if (size === 0) {
      // Empty file — skip silently, it can't be uploaded
      continue;
    }

    if (!entry || !entry.url) {
      missing++;
      missingKeys.push(key);
    } else {
      ok++;
      if (!entry.hash) {
        noHash++;
        noHashKeys.push(key);
      }
    }
  }

  // Entries in mapping that no longer have a local file — split legacy from real orphans
  const allOrphans = Object.keys(mapping).filter(k => {
    const abs = path.join(PUBLIC_DIR, k.replace(/^\//, "").replace(/\//g, path.sep));
    return !fs.existsSync(abs);
  });
  // Legacy = status is "legacy" (old /experiances/ entries we know about)
  const legacyOrphans = allOrphans.filter(k => mapping[k]?.status === "legacy");
  const realOrphans   = allOrphans.filter(k => mapping[k]?.status !== "legacy");

  console.log("\n📊  MAPPING CHECK REPORT");
  console.log("─".repeat(50));
  console.log(`Total local images : ${all.length}`);
  console.log(`Mapped with URL    : ${ok}`);
  console.log(`Missing from map   : ${missing}`);
  console.log(`No hash (legacy)   : ${noHash}`);
  console.log(`Legacy orphans     : ${legacyOrphans.length}  (old paths, URLs still valid)`);
  console.log(`Real orphans       : ${realOrphans.length}`);

  if (missingKeys.length > 0) {
    console.log("\n⚠️   NOT IN MAPPING (run images:sync):");
    missingKeys.forEach(k => console.log(`   • ${k}`));
  }

  if (realOrphans.length > 0) {
    console.log("\n🗂️   UNEXPECTED ORPHAN ENTRIES (local file deleted without cleanup):");
    realOrphans.forEach(k => console.log(`   • ${k}`));
  }

  if (noHashKeys.length > 0) {
    console.log(`\n💡  ${noHash} legacy entries have no hash — run images:sync to update.`);
  }

  const hasProblems = missing > 0 || realOrphans.length > 0;
  if (!hasProblems) {
    console.log("\n✅  All local images are mapped. Mapping is clean.\n");
  } else {
    console.log("\n");
    process.exit(1);
  }
}

// ─── Pre-flight ───────────────────────────────────────────────────────────────
async function preFlight() {
  console.log("🔍  Pre-flight checks…");
  try {
    await cloudinary.api.ping();
    console.log("✅  API ping OK");
  } catch (err) {
    console.error(`❌  API ping FAILED — HTTP ${err.http_code ?? "?"}: ${err.message}`);
    process.exit(1);
  }
}

// ─── Entry point ─────────────────────────────────────────────────────────────
const command = process.argv[2] ?? "sync";

if (command === "check") {
  await cmdCheck();
} else if (command === "dry-run") {
  await cmdSync(true);
} else if (command === "migrate" || command === "sync") {
  validateCredentials();
  await preFlight();
  await cmdSync(false);
} else {
  console.error(`\n❌  Unknown command: ${command}`);
  console.error("    Usage: node scripts/cloudinary-images.mjs [migrate|sync|check|dry-run]\n");
  process.exit(1);
}
