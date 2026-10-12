/**
 * src/lib/cloudinaryImage.js
 *
 * Centralised image URL resolver for Raah India Experiences.
 *
 * Converts any local public/ path → its Cloudinary secure_url.
 * Falls back to the original local path if no mapping entry exists,
 * so nothing breaks when a new image has not been synced yet.
 *
 * Mapping formats supported:
 *   Legacy  : { "/path/img.jpg": "https://res.cloudinary.com/…" }
 *   Current : { "/path/img.jpg": { url: "https://…", publicId: "…", hash: "…", status: "uploaded" } }
 *
 * Usage (client OR server components, App Router or Pages Router):
 *   import { cloudImg } from "@/lib/cloudinaryImage";
 *   <Image src={cloudImg(exp.heroImage)} … />
 *   style={{ backgroundImage: `url(${cloudImg("/images/hero.webp")})` }}
 *
 * Rules:
 *   • Never expose Cloudinary API credentials — this file is safe to import anywhere.
 *   • Never fabricate a URL — return the local path as-is if the mapping has no entry.
 *   • Already-external URLs (https://…) are returned unchanged.
 *   • Encoded paths (/journal%20Images/…) are decoded before lookup.
 */

// Bundled at build time — zero runtime I/O, works in both RSC and client components.
import urlMap from "../../cloudinary-urls.json";

/**
 * Resolve a local public/ image path to its Cloudinary URL.
 *
 * @param {string|null|undefined} localPath
 *   A public/-relative path, e.g. "/experiences/jaipur-at-dawn/hero.webp"
 * @returns {string}
 *   The Cloudinary secure_url, or the original path when no mapping exists.
 */
export function cloudImg(localPath) {
  // Pass external URLs straight through
  if (!localPath || localPath.startsWith("http")) return localPath ?? "";

  // Normalise: ensure leading slash; decode percent-encoded characters
  let key = localPath.startsWith("/") ? localPath : `/${localPath}`;
  try { key = decodeURIComponent(key); } catch (_) { /* keep original on malformed input */ }

  const entry = urlMap[key];
  if (!entry) return localPath;           // not yet synced — fall back to local file

  // Support both legacy string format and current object format
  if (typeof entry === "string") return entry;
  if (entry.url)                 return entry.url;

  return localPath;                       // malformed entry — fail safe
}

/**
 * Return true if the path is already served from Cloudinary.
 * Useful for conditional rendering or debugging.
 *
 * @param {string|null|undefined} localPath
 * @returns {boolean}
 */
export function isOnCloudinary(localPath) {
  const resolved = cloudImg(localPath);
  return resolved.startsWith("https://res.cloudinary.com/");
}
