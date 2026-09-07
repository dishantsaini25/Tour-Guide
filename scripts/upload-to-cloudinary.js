/**
 * scripts/upload-to-cloudinary.js
 *
 * Bulk-migrates every image in public/ to Cloudinary.
 * CommonJS only — no TypeScript, no ESM.
 *
 * Run:    npm run upload:images
 * Resume: re-run the same command; already-uploaded paths are skipped.
 *
 * Safety guarantees:
 *  - public/ is NEVER modified, renamed, or deleted
 *  - Temp files are written to os.tmpdir() and deleted after each upload
 *  - .env.local is read but never printed, modified, or re-saved
 */

"use strict";

const dotenv     = require("dotenv");
const cloudinary = require("cloudinary").v2;
const sharp      = require("sharp");
const fs         = require("fs");
const path       = require("path");
const os         = require("os");

// ─── 1. Load credentials (read-only, never print secrets) ─────────────────
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY    = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (
  !CLOUD_NAME || CLOUD_NAME === "your_cloud_name" ||
  !API_KEY    || API_KEY    === "your_api_key"    ||
  !API_SECRET || API_SECRET === "your_api_secret"
) {
  console.error(
    "\n❌  Cloudinary credentials are missing or still placeholder.\n" +
    "   Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY,\n" +
    "   and CLOUDINARY_API_SECRET in .env.local, then re-run.\n"
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key:    API_KEY,
  api_secret: API_SECRET,
  secure:     true,
});

// ─── 2. Constants ─────────────────────────────────────────────────────────
const ROOT        = path.resolve(__dirname, "..");
const PUBLIC_DIR  = path.join(ROOT, "public");
const OUTPUT      = path.join(ROOT, "cloudinary-urls.json");
const NINE_MB     = 9 * 1024 * 1024;
const CONCURRENCY = 4;
const MAX_RETRIES = 3;

// Skip .zip, .svg, .ico, .txt — upload raster images only
const IMAGE_EXTS  = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

// HTTP codes that must NOT be retried (auth errors)
const NO_RETRY_CODES = new Set([400, 401, 403]);

// ─── 3. Slugify — a-z0-9 and hyphens only ────────────────────────────────
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── 4. Collect all images recursively ───────────────────────────────────
function collectImages(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectImages(full));
    } else if (IMAGE_EXTS.has(path.extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

// ─── 5. Compress large images locally (never touches originals) ───────────
async function compressIfNeeded(absPath) {
  const stat = fs.statSync(absPath);

  // Also check megapixels via sharp metadata
  let meta = { width: 0, height: 0 };
  try { meta = await sharp(absPath).metadata(); } catch (_) {}
  const mp = ((meta.width || 0) * (meta.height || 0)) / 1_000_000;
  const tooBig   = stat.size > NINE_MB;
  const tooLarge = mp > 24;

  if (!tooBig && !tooLarge) return { uploadPath: absPath, tempFile: null };

  const reason = tooBig
    ? `${(stat.size / 1024 / 1024).toFixed(1)} MB`
    : `${mp.toFixed(0)} MP`;
  console.log(`   ⚠  ${reason} — compressing locally…`);

  const tempFile = path.join(
    os.tmpdir(),
    `cld-${Date.now()}-${path.basename(absPath, path.extname(absPath))}.webp`
  );

  // Try progressively lower quality until file is under 9 MB
  const qualities = [80, 65, 50, 35];
  for (const q of qualities) {
    await sharp(absPath)
      .rotate()                                                    // apply EXIF rotation
      .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: q })
      .toFile(tempFile);

    if (fs.statSync(tempFile).size <= NINE_MB) break;
  }

  // Last resort: shrink dimensions more aggressively
  if (fs.statSync(tempFile).size > NINE_MB) {
    await sharp(absPath)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 30 })
      .toFile(tempFile);
  }

  return { uploadPath: tempFile, tempFile };
}

// ─── 6. Stream-based upload (avoids Windows path issues) ─────────────────
function streamUpload(filePath, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    fs.createReadStream(filePath).pipe(stream);
  });
}

// ─── 7. Upload a single file with retries ────────────────────────────────
async function uploadOne(absPath, urlMap) {
  // Build original key (unmodified, for JSON mapping)
  const relNative  = path.relative(PUBLIC_DIR, absPath);
  const relPosix   = relNative.replace(/\\/g, "/");
  const originalKey = `/${relPosix}`;

  // Build slugified Cloudinary folder + public_id
  const segments   = relPosix.split("/");
  const rawName    = segments.pop();
  const nameNoExt  = rawName.replace(/\.[^.]+$/, "");
  const slugSegs   = segments.map(slugify);
  const folder     = ["raah-india", ...slugSegs].join("/");
  const public_id  = slugify(nameNoExt);

  // Compress if needed — temp file written to os.tmpdir(), NOT public/
  const { uploadPath, tempFile } = await compressIfNeeded(absPath);

  let lastErr = null;
  try {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result = await streamUpload(uploadPath, {
          folder,
          public_id,
          use_filename:    false,
          unique_filename: false,
          overwrite:       true,
          resource_type:   "image",
        });
        urlMap[originalKey] = result.secure_url;
        return { ok: true, key: originalKey, url: result.secure_url };
      } catch (err) {
        lastErr = err;
        const code = err.http_code ?? 0;
        // Don't retry auth errors
        if (NO_RETRY_CODES.has(code)) {
          console.error(
            `   ✋  Non-retryable error (HTTP ${code}): ${err.message}`
          );
          break;
        }
        if (attempt < MAX_RETRIES) {
          const wait = attempt * 2000;
          console.log(`   ↻  Attempt ${attempt}/${MAX_RETRIES} failed, retrying in ${wait}ms…`);
          await new Promise(r => setTimeout(r, wait));
        }
      }
    }
  } finally {
    // Delete temp file regardless of outcome — original public/ file untouched
    if (tempFile) {
      try { fs.unlinkSync(tempFile); } catch (_) {}
    }
  }

  const msg = lastErr
    ? `HTTP ${lastErr.http_code ?? "?"}: ${lastErr.message ?? String(lastErr)}`
    : "Unknown error";
  return { ok: false, key: originalKey, err: msg };
}

// ─── 8. Concurrency pool ─────────────────────────────────────────────────
async function runPool(tasks, urlMap, onResult) {
  let idx = 0;
  async function worker() {
    while (idx < tasks.length) {
      const task = tasks[idx++];
      const res  = await uploadOne(task, urlMap);
      onResult(res);
      // Atomic incremental save after every result
      fs.writeFileSync(OUTPUT, JSON.stringify(urlMap, null, 2), "utf8");
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
}

// ─── 9. Pre-flight checks ─────────────────────────────────────────────────
async function preFlight() {
  // 9a: API ping
  console.log("🔍  Running pre-flight checks…");
  try {
    await cloudinary.api.ping();
    console.log("✅  API ping OK");
  } catch (err) {
    console.error(`❌  API ping FAILED — HTTP ${err.http_code ?? "?"}: ${err.message}`);
    console.error(`   full: ${JSON.stringify({ http_code: err.http_code, message: err.message, name: err.name })}`);
    process.exit(1);
  }

  // 9b: Tiny inline PNG upload — use stream so data-URI restriction doesn't block it
  const tinyBuf = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQAABjE+ibYAAAAASUVORK5CYII=",
    "base64"
  );
  try {
    await new Promise((resolve, reject) => {
      const s = cloudinary.uploader.upload_stream(
        { public_id: "raah-india/_preflight-test", overwrite: true, resource_type: "image" },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      s.end(tinyBuf);
    });
    console.log("✅  Tiny-image upload OK");
  } catch (err) {
    console.error(`❌  Tiny-image upload FAILED — HTTP ${err.http_code ?? "?"}: ${err.message}`);
    console.error(`   full: ${JSON.stringify({ http_code: err.http_code, message: err.message, name: err.name })}`);
    process.exit(1);
  }

  // 9c: Real image smoke test — first image found in public/
  const sample = collectImages(PUBLIC_DIR)[0];
  if (sample) {
    const sampleRel = path.relative(PUBLIC_DIR, sample).replace(/\\/g, "/");
    console.log(`🔍  Smoke-testing real image: ${sampleRel}`);
    try {
      const { uploadPath, tempFile } = await compressIfNeeded(sample);
      const res = await streamUpload(uploadPath, {
        folder:          "raah-india/_smoke-test",
        public_id:       "smoke",
        use_filename:    false,
        unique_filename: false,
        overwrite:       true,
        resource_type:   "image",
      });
      if (tempFile) { try { fs.unlinkSync(tempFile); } catch (_) {} }
      console.log(`✅  Smoke test OK → ${res.secure_url}`);
    } catch (err) {
      console.error(`❌  Smoke test FAILED — HTTP ${err.http_code ?? "?"}: ${err.message}`);
      console.error(`   full: ${JSON.stringify({ http_code: err.http_code, message: err.message, name: err.name })}`);
      process.exit(1);
    }
  }

  console.log("✅  All pre-flight checks passed.\n");
}

// ─── Main ─────────────────────────────────────────────────────────────────
async function main() {
  await preFlight();

  const allImages = collectImages(PUBLIC_DIR);
  console.log(`📂  Found ${allImages.length} images in public/`);
  console.log(`☁️   Cloud: ${CLOUD_NAME}  |  Concurrency: ${CONCURRENCY}\n`);

  // Resume: load existing map
  let urlMap = {};
  if (fs.existsSync(OUTPUT)) {
    try { urlMap = JSON.parse(fs.readFileSync(OUTPUT, "utf8")); } catch (_) {}
  }

  // Skip already-uploaded
  const toUpload = allImages.filter(abs => {
    const key = "/" + path.relative(PUBLIC_DIR, abs).replace(/\\/g, "/");
    return !urlMap[key];
  });

  const skipCount = allImages.length - toUpload.length;
  if (skipCount > 0) console.log(`⏭️   Skipping ${skipCount} already uploaded.\n`);

  if (toUpload.length === 0) {
    console.log("✅  All images already on Cloudinary. Nothing to do.");
    console.log(`📄  URL map: ${OUTPUT}\n`);
    return;
  }

  const failedPaths = [];
  let successCount  = 0;
  let failCount     = 0;

  await runPool(toUpload, urlMap, (res) => {
    if (res.ok) {
      successCount++;
      console.log(`✅  ${res.key}\n    → ${res.url}`);
    } else {
      failCount++;
      failedPaths.push(res.key);
      console.error(`❌  ${res.key}\n    → ${res.err}`);
    }
  });

  console.log("\n═══════════════════════════════════════════════════");
  console.log(`✅  Uploaded  : ${successCount}`);
  console.log(`⏭️   Skipped   : ${skipCount}`);
  console.log(`❌  Failed    : ${failCount}`);
  if (failedPaths.length > 0) {
    console.log("\nFailed paths:");
    failedPaths.forEach(p => console.log(`   • ${p}`));
  }
  console.log(`\n📄  URL map   : ${OUTPUT}`);
  console.log("═══════════════════════════════════════════════════\n");

  if (failCount > 0) {
    console.log("ℹ️   Re-run 'npm run upload:images' to retry failures.");
    console.log("    Already-uploaded files are skipped automatically.\n");
  }
}

main().catch(err => { console.error("Fatal:", err); process.exit(1); });
