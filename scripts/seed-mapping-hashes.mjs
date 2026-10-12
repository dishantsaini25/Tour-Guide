/**
 * scripts/seed-mapping-hashes.mjs
 *
 * One-time utility: reads cloudinary-urls.json (legacy string format),
 * computes SHA-256 hashes for each local file that still exists,
 * and rewrites the mapping in the new object format:
 *   { url, publicId, hash, status }
 *
 * Files in the old /experiances/ folder (no longer referenced) are
 * kept as-is so we don't lose the URL, but flagged status: "legacy".
 *
 * Run once:  node scripts/seed-mapping-hashes.mjs
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname   = path.dirname(fileURLToPath(import.meta.url));
const ROOT        = path.resolve(__dirname, "..");
const PUBLIC_DIR  = path.join(ROOT, "public");
const MAPPING_OUT = path.join(ROOT, "cloudinary-urls.json");

function fileHash(absPath) {
  const buf = fs.readFileSync(absPath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function toPublicId(url) {
  // Extract public_id from Cloudinary URL
  // e.g. https://res.cloudinary.com/wnmdgqiz/image/upload/v1234/raah-india/foo/bar.jpg
  // → raah-india/foo/bar
  try {
    const parts = url.split("/image/upload/");
    if (parts.length < 2) return "";
    const afterUpload = parts[1];
    // Remove version prefix like v1234567/
    const noVersion = afterUpload.replace(/^v\d+\//, "");
    // Remove file extension
    return noVersion.replace(/\.[^/.]+$/, "");
  } catch {
    return "";
  }
}

function atomicWrite(filePath, data) {
  const tmp = filePath + ".tmp." + process.pid;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tmp, filePath);
}

const raw = JSON.parse(fs.readFileSync(MAPPING_OUT, "utf8"));
const output = {};
let seeded = 0, legacy = 0, missing = 0;

for (const [key, value] of Object.entries(raw)) {
  // Already in new format — keep as-is
  if (typeof value === "object" && value !== null && value.url) {
    output[key] = value;
    continue;
  }

  const url = typeof value === "string" ? value : null;
  if (!url) continue;

  const absPath = path.join(PUBLIC_DIR, key.replace(/^\//, "").replace(/\//g, path.sep));
  const publicId = toPublicId(url);

  if (fs.existsSync(absPath)) {
    const hash = fileHash(absPath);
    output[key] = { url, publicId, hash, status: "uploaded" };
    seeded++;
  } else {
    // File no longer exists locally (e.g. old /experiances/ images, deleted Gemini image)
    output[key] = { url, publicId, hash: null, status: "legacy" };
    legacy++;
  }
}

atomicWrite(MAPPING_OUT, output);

console.log(`✅  Seeded ${seeded} entries with file hashes`);
console.log(`📦  Marked ${legacy} legacy entries (local file no longer exists)`);
console.log(`📄  Written to: ${MAPPING_OUT}`);
