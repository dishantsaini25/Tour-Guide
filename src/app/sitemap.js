import { experiences } from "@/data/experiences";

// ── Production base URL ───────────────────────────────────────────
// Update this if the domain changes.
const BASE_URL = "https://www.raahexperiences.in";

export default function sitemap() {
  // ── Static pages ────────────────────────────────────────────────
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/experiences`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ── Dynamic experience/tour detail pages ─────────────────────────
  // Slugs are sourced directly from the experiences data file.
  const experiencePages = experiences.map((exp) => ({
    url: `${BASE_URL}/experiences/${exp.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ── Dynamic journal article pages ────────────────────────────────
  // Journal articles are currently rendered on a single /journal page
  // (no individual slug routes exist), so they are not included here.
  // If individual article pages are added in the future, uncomment:
  //
  // const journalPages = journalArticles.map((article) => ({
  //   url: `${BASE_URL}/journal/${article.slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: "monthly",
  //   priority: 0.6,
  // }));

  return [...staticPages, ...experiencePages];
}
