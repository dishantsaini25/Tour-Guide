/**
 * src/lib/cloudinaryImage.js
 *
 * Resolves any local image path to its Cloudinary URL.
 * Falls back silently to the original local path if not found —
 * so nothing ever breaks and public/ images remain a safety net.
 *
 * Usage (client OR server components):
 *   import { cloudImg } from "@/lib/cloudinaryImage";
 *   <Image src={cloudImg(exp.heroImage)} ... />
 */

// Static import of the URL map — bundled at build time, zero runtime I/O
import urlMap from "../../cloudinary-urls.json";

/**
 * Returns the Cloudinary secure_url for a local public/ path,
 * or the original path unchanged if no mapping exists.
 *
 * @param {string|null|undefined} localPath  e.g. "/experiances/Farm and fire/thumbnail.jpg"
 * @returns {string}
 */
export function cloudImg(localPath) {
  // Already a full URL (Cloudinary, Unsplash, Pexels, etc.) — return as-is
  if (!localPath || localPath.startsWith("http")) return localPath || "";

  // Normalise: ensure leading slash, decode %20 etc.
  let key = localPath.startsWith("/") ? localPath : `/${localPath}`;
  try { key = decodeURIComponent(key); } catch (_) { /* keep original */ }

  // Look up in the JSON map
  if (urlMap[key]) return urlMap[key];

  // Fallback: return original local path so public/ image is used
  return localPath;
}
