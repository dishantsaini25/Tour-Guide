import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { cloudImg } from "@/lib/cloudinaryImage";
import JournalBody from "@/components/JournalBody";
import FAQAccordion from "@/components/FAQAccordion";
import { journalArticles, getRelatedJournalArticles } from "@/data/journal";
import { getExperienceBySlug } from "@/data/experiences";
import JournalImageGrid from "@/components/JournalImageGrid";
import SetPageLang from "@/components/SetPageLang";

export async function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);
  if (!article) return {};

   const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt;
  const url = `https://www.raahexperiences.in/journal/${article.slug}`;
  const image = cloudImg(article.image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: article.lang === "es" ? { es: url } : undefined,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [image],
      locale: article.lang === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";
const OR = "#FF8C00", GO = "#F5A623";
const CH = "#1A1209", MU = "#6B5B2E", CR = "#FFFDE7", PH = "#FFD89B";
const ORG = { "@id": "https://www.raahexperiences.in/#organization" };
const LABELS = {
  en: {
    back: "Back to The Journal",
    journal: "The Raah Journal",
    by: "By",
    faqs: "Frequently Asked Questions",
    guests: "From Our Guests",
    sign: "— The Raah Journal, Jaipur",
    keepKicker: "Keep Reading",
    keepTitle: "More From The Journal",
    readMore: "Read Story",
    bookKicker: "Book The Experience",
    bookTitle: "Live This Story",
    viewExp: "View Experience",
  },
  es: {
    back: "Volver al Journal",
    journal: "The Raah Journal",
    by: "Por",
    faqs: "Preguntas frecuentes",
    guests: "De nuestros viajeros",
    sign: "— The Raah Journal, Jaipur",
    keepKicker: "Sigue leyendo",
    keepTitle: "Más artículos del Journal",
    readMore: "Leer artículo",
    bookKicker: "Reserva la experiencia",
    bookTitle: "Vive esta historia",
    viewExp: "Ver experiencia",
  },
};
const AUTHOR = {
  "@type": "Person",
  "@id": "https://www.raahexperiences.in/about#shobhit-sankhla",
  name: "Shobhit Sankhla",
  url: "https://www.raahexperiences.in/about",
};

export default async function JournalArticlePage({ params }) {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const pageUrl = `https://www.raahexperiences.in/journal/${article.slug}`;
  const related = (article.relatedExperiences || [])
    .map((s) => getExperienceBySlug(s))
    .filter(Boolean);
  const moreArticles = getRelatedJournalArticles(article.slug, 3);
  const t = LABELS[article.lang] || LABELS.en;

  return (
    <>
      <SetPageLang lang={article.lang} />

      {/* ── BlogPosting schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${pageUrl}#article`,
            mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
            headline: article.title,
                     description: article.metaDescription || article.excerpt,
            image: cloudImg(article.image),
            url: pageUrl,
            inLanguage: article.lang || "en",
            author: AUTHOR,
            publisher: ORG,
                       ...(article.datePublished && { datePublished: `${article.datePublished}T00:00:00+05:30` }),
            ...(article.dateModified && { dateModified: `${article.dateModified}T00:00:00+05:30` }),
          }),
        }}
      />

      {/* ── BreadcrumbList schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.raahexperiences.in" },
              { "@type": "ListItem", position: 2, name: "The Journal", item: "https://www.raahexperiences.in/journal" },
              { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
            ],
          }),
        }}
      />

      {/* ── FAQPage schema ── */}
      {article.faqs && article.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              inLanguage: article.lang || "en",
              mainEntity: article.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}

      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "50vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <Image src={cloudImg(article.image)} alt={article.title} fill className="object-cover object-center" priority sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(20,10,0,0.92) 0%,rgba(20,10,0,0.30) 55%,transparent 100%)" }} />

        <div style={{ position: "absolute", top: "88px", left: 0, right: 0, zIndex: 20, maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
          <Link href="/journal" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.78)", fontFamily: IN, fontSize: "0.8rem", fontWeight: 500, textDecoration: "none" }}>
            <ArrowLeft size={14} /> {t.back}
          </Link>
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "900px", margin: "0 auto", padding: "140px 20px 52px", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: IN, fontSize: "0.72rem", color: "rgba(255,255,255,0.65)" }}>
    <Clock size={11} style={{ color: OR }} />{article.readTime}
  </span>
  <span style={{ color: "rgba(255,255,255,0.4)" }}>·</span>
  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: IN, fontSize: "0.72rem", color: "rgba(255,255,255,0.65)" }}>
    <BookOpen size={11} style={{ color: OR }} />{t.journal}
  </span>
  <span style={{ color: "rgba(255,255,255,0.4)" }}>·</span>
  <Link href="/about" style={{ fontFamily: IN, fontSize: "0.72rem", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>
    {t.by} Shobhit Sankhla
  </Link>
  {article.datePublished && (
    <>
      <span style={{ color: "rgba(255,255,255,0.4)" }}>·</span>
      <time dateTime={article.datePublished} style={{ fontFamily: IN, fontSize: "0.72rem", color: "rgba(255,255,255,0.65)" }}>
        {new Date(article.datePublished).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })}
      </time>
    </>
  )}
</div>
          <h1 style={{ fontFamily: PF, fontWeight: 700, fontSize: "clamp(2rem,5vw,3.4rem)", color: "#FFFFFF", lineHeight: 1.1 }}>
            {article.title}
          </h1>
        </div>
      </section>

      {/* ── Body ── */}
      <div style={{ background: "#FFFFFF", padding: "52px 0 80px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 20px" }}>
          <JournalBody text={article.body} />

          {article.faqs && article.faqs.length > 0 && (
            <div style={{ marginTop: "40px" }}>
              <h2 style={{ fontFamily: PF, fontSize: "1.35rem", fontWeight: 700, color: CH, marginBottom: "16px" }}>
                {t.faqs}
              </h2>
              <FAQAccordion items={article.faqs} />
            </div>
          )}

          {article.images && article.images.length > 0 && (
            <div style={{ marginTop: "40px" }}>
              <h2 style={{ fontFamily: PF, fontSize: "1.35rem", fontWeight: 700, color: CH, marginBottom: "16px" }}>
                {t.guests}
              </h2>
              <JournalImageGrid images={article.images} />
            </div>
          )}

          <div style={{ marginTop: "36px", paddingTop: "22px", borderTop: `1px solid ${PH}` }}>
            <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "0.9rem", color: MU }}>
              {t.sign}
            </p>
          </div>
        </div>
      </div>

      {/* ── Keep Reading (related journal articles) ── */}
      {moreArticles.length > 0 && (
        <div style={{ background: "#FFFFFF", padding: "0 0 72px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "8px" }}>
                {t.keepKicker}
              </p>
              <div style={{ width: "36px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px", margin: "0 auto 16px" }} />
              <h2 style={{ fontFamily: PF, fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 700, color: CH }}>
                {t.keepTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {moreArticles.map((a) => (
                <Link key={a.slug} href={`/journal/${a.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: CR, border: `1px solid ${PH}`, borderRadius: "18px", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ position: "relative", height: "170px" }}>
                      <Image src={cloudImg(a.image)} alt={a.title} fill className="object-cover object-center" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" />
                    </div>
                    <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                      <h3 style={{ fontFamily: PF, fontSize: "1.05rem", fontWeight: 700, color: CH, lineHeight: 1.3 }}>
                        {a.title}
                      </h3>
                      {a.excerpt && (
                        <p style={{ fontFamily: IN, fontSize: "0.85rem", color: MU, lineHeight: 1.6, fontWeight: 300, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {a.excerpt}
                        </p>
                      )}
                      <span style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: IN, fontSize: "0.72rem", fontWeight: 700, color: OR, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {t.readMore} <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Related Experiences ── */}
      {related.length > 0 && (
        <div style={{ background: CR, padding: "64px 0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "8px" }}>
                {t.bookKicker}
              </p>
              <div style={{ width: "36px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px", margin: "0 auto 16px" }} />
              <h2 style={{ fontFamily: PF, fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 700, color: CH }}>
                {t.bookTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((exp) => (
                <Link key={exp.slug} href={`/experiences/${exp.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#FFFFFF", border: `1px solid ${PH}`, borderRadius: "18px", overflow: "hidden", height: "100%" }}>
                    <div style={{ position: "relative", height: "160px" }}>
                      <Image src={cloudImg(exp.cardImage)} alt={exp.title} fill className="object-cover object-center" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" />
                    </div>
                    <div style={{ padding: "18px" }}>
                      <h3 style={{ fontFamily: PF, fontSize: "1.05rem", fontWeight: 700, color: CH, marginBottom: "6px" }}>
                        {exp.title}
                      </h3>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: IN, fontSize: "0.72rem", fontWeight: 700, color: OR, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {t.viewExp} <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}