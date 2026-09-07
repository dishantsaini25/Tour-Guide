// ── Production base URL ───────────────────────────────────────────
// Keep in sync with app/sitemap.js
const BASE_URL = "https://www.raahexperiences.in";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Disallow internal API routes — not public pages
      disallow: "/api/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
