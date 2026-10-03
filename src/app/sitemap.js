import { experiences } from "@/data/experiences";
import { journalArticles } from "@/data/journal";

// ── Production base URL ───────────────────────────────────────────
const BASE_URL = "https://www.raahexperiences.in";

const HOME_UPDATED        = "2026-10-02";
const EXPERIENCES_UPDATED = "2026-10-02";
const JOURNAL_UPDATED     = "2026-10-02";

function withDate(entry, date) {
  return date ? { ...entry, lastModified: new Date(date) } : entry;
}

export default function sitemap() {
  // ── Static pages ────────────────────────────────────────────────
  const staticPages = [
    withDate({ url: BASE_URL, changeFrequency: "weekly", priority: 1.0 }, HOME_UPDATED),
    withDate({ url: `${BASE_URL}/experiences`, changeFrequency: "weekly", priority: 0.9 }, EXPERIENCES_UPDATED),
    withDate({ url: `${BASE_URL}/journal`, changeFrequency: "weekly", priority: 0.7 }, JOURNAL_UPDATED),
    { url: `${BASE_URL}/about`,   changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faq`,     changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/gallery`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/terms`,   changeFrequency: "yearly",  priority: 0.3 },
  ];

  // ── Experience pages ────────────────────────────────────────────
  const experiencePages = experiences.map((exp) =>
    withDate(
      { url: `${BASE_URL}/experiences/${exp.slug}`, changeFrequency: "monthly", priority: 0.8 },
      exp.dateModified || EXPERIENCES_UPDATED
    )
  );

  // ── Journal articles ────────────────────────────────────────────
  const journalPages = journalArticles.map((article) =>
    withDate(
      { url: `${BASE_URL}/journal/${article.slug}`, changeFrequency: "monthly", priority: 0.6 },
      article.dateModified || article.datePublished
    )
  );

  return [...staticPages, ...experiencePages, ...journalPages];
}