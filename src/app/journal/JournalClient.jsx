"use client";
import Image from "next/image";
import Link from "next/link";
import MobileSlider from "@/components/MobileSlider";
import { journalArticles } from "@/data/experiences";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

/* Supplementary data not in the data file */
const META = {
  "jaipur-before-sunrise":  { date: "March 2024",    color: "#FF8C00" },
  "five-conversations":      { date: "February 2024", color: "#E07800" },
  "forgotten-stories-gates": { date: "January 2024",  color: "#F5A623" },
  "flower-garland-women":    { date: "December 2023", color: "#FF8C00" },
  "breakfast-rajasthan":     { date: "November 2023", color: "#E07800" },
};

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";
const OR = "#FF8C00", GO = "#F5A623";

function JournalCard({ article, featured = false }) {
  const meta = META[article.slug] || { date: "2024", color: OR };

  return (
    <article className={`jcard${featured ? " jcard-featured" : ""}`}>
      {/* ── Thumbnail ── */}
      <div className="jcard-img-wrap">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover object-top jcard-img"
          sizes={featured
            ? "(max-width:1024px) 100vw, 50vw"
            : "(max-width:768px) 100vw, 33vw"}
        />
        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(20,10,0,0.55) 0%, transparent 60%)",
        }} />
        {/* Category badge */}
        <div style={{ position: "absolute", top: "14px", left: "14px" }}>
          <span style={{
            display: "inline-block",
            background: `${meta.color}ee`,
            color: "#FFFFFF",
            fontFamily: IN,
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "5px 12px",
            borderRadius: "9999px",
            backdropFilter: "blur(4px)",
          }}>{article.category}</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="jcard-body">
        {/* Meta row */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          marginBottom: "12px",
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            fontFamily: IN, fontSize: "0.65rem", color: "#9C8550", fontWeight: 400,
          }}>
            <BookOpen size={11} style={{ color: OR }} />
            {meta.date}
          </span>
          <span style={{ color: "#FFD89B", fontSize: "0.7rem" }}>·</span>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            fontFamily: IN, fontSize: "0.65rem", color: "#9C8550",
          }}>
            <Clock size={11} style={{ color: OR }} />
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: PF,
          fontSize: featured ? "clamp(1.3rem,2.5vw,1.7rem)" : "1.12rem",
          fontWeight: 700,
          color: "#1A1209",
          lineHeight: 1.25,
          marginBottom: "10px",
        }}>{article.title}</h3>

        {/* Accent rule */}
        <div style={{
          width: "28px", height: "2px",
          background: `linear-gradient(to right, ${OR}, ${GO})`,
          borderRadius: "2px",
          marginBottom: "12px",
        }} />

        {/* Excerpt */}
        <p style={{
          fontFamily: IN,
          fontSize: "0.875rem",
          color: "#6B5B2E",
          lineHeight: 1.78,
          fontWeight: 300,
          marginBottom: "18px",
          flex: 1,
        }}>{article.excerpt}</p>

        {/* Read CTA */}
        <div style={{ marginTop: "auto" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            fontFamily: IN, fontSize: "0.74rem", fontWeight: 700,
            color: OR, letterSpacing: "0.06em", textTransform: "uppercase",
          }}>
            Coming Soon <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </article>
  );
}

export default function JournalClient() {
  const featured  = journalArticles[0];
  const secondary = journalArticles.slice(1);

  return (
    <>
      <style>{`
        /* ── Card base ── */
        .jcard {
          background: linear-gradient(145deg, #FFFBF0 0%, #FFF7E4 100%);
          border: 1px solid rgba(255,216,155,0.55);
          border-radius: 22px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 14px rgba(255,140,0,0.07), 0 1px 3px rgba(0,0,0,0.04);
          transition: box-shadow 0.38s ease, transform 0.38s ease, border-color 0.38s ease;
          height: 100%;
        }
        .jcard:hover {
          box-shadow: 0 14px 42px rgba(255,140,0,0.16), 0 2px 8px rgba(0,0,0,0.05);
          transform: translateY(-5px);
          border-color: rgba(255,140,0,0.32);
        }

        /* ── Thumbnail wrapper ── */
        .jcard-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .jcard-featured .jcard-img-wrap {
          height: 260px;
        }
        .jcard-img {
          transition: transform 0.65s ease;
        }
        .jcard:hover .jcard-img {
          transform: scale(1.06);
        }

        /* ── Body ── */
        .jcard-body {
          padding: 20px 22px 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* ── Desktop grid ── */
        .jc-secondary-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (min-width: 1024px) {
          .jc-secondary-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 767px) { .jc-secondary-grid { display: none; } }

        /* ── Mobile slider ── */
        .jc-slider-mobile { display: none; }
        @media (max-width: 767px) { .jc-slider-mobile { display: block; } }

        /* ── Featured layout: image left, text right on desktop ── */
        .jc-featured-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(255,216,155,0.55);
          box-shadow: 0 4px 24px rgba(255,140,0,0.10);
          background: linear-gradient(145deg, #FFFBF0 0%, #FFF7E4 100%);
          transition: box-shadow 0.38s ease, transform 0.38s ease;
          margin-bottom: 48px;
        }
        .jc-featured-grid:hover {
          box-shadow: 0 16px 48px rgba(255,140,0,0.18);
          transform: translateY(-3px);
        }
        @media (min-width: 768px) {
          .jc-featured-grid {
            grid-template-columns: 1fr 1fr;
          }
          .jc-featured-img { height: 100% !important; min-height: 320px; }
        }
        .jc-featured-img {
          position: relative;
          height: 260px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .jc-featured-body {
          padding: 32px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .jc-featured-img-inner {
          transition: transform 0.65s ease;
        }
        .jc-featured-grid:hover .jc-featured-img-inner {
          transform: scale(1.04);
        }

        /* ── Subscribe block ── */
        .jc-subscribe {
          background: linear-gradient(135deg, #FFFBF0 0%, #FFF3DC 100%);
          border: 1px solid rgba(255,216,155,0.6);
          border-radius: 22px;
          padding: 48px 32px;
          text-align: center;
          margin-top: 56px;
          box-shadow: 0 2px 14px rgba(255,140,0,0.07);
        }

        /* ── Get in Touch button — pill, gradient, glow-only hover ── */
        .jcta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 32px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          color: #FFFFFF !important;
          border-radius: 9999px;
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 55%, #C45E00 100%);
          box-shadow: 0 4px 16px rgba(255,140,0,0.30);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          border: none;
          cursor: pointer;
        }
        .jcta:hover, .jcta:focus-visible {
          color: #FFFFFF !important;
          transform: translateY(-2px) scale(1.04);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.14),
            0 0 24px rgba(255,140,0,0.50),
            0 10px 28px rgba(255,140,0,0.30) !important;
        }
        .jcta:active { transform: translateY(0) scale(1); }
        .jcta:focus-visible { outline: 2px solid #FF8C00; outline-offset: 3px; }
      `}</style>

      {/* ── Featured article ── */}
      <div className="jc-featured-grid" role="article" aria-label={`Featured: ${featured.title}`}>
        {/* Image */}
        <div className="jc-featured-img">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            className="object-cover object-top jc-featured-img-inner"
            sizes="(max-width:768px) 100vw, 50vw"
            priority
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(20,10,0,0.45) 0%, transparent 60%)",
          }} />
          <div style={{ position: "absolute", top: "16px", left: "16px" }}>
            <span style={{
              background: `${META[featured.slug]?.color ?? OR}ee`,
              color: "#FFFFFF",
              fontFamily: IN, fontSize: "0.6rem", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "5px 14px", borderRadius: "9999px",
              backdropFilter: "blur(4px)",
            }}>{featured.category}</span>
          </div>
        </div>

        {/* Body */}
        <div className="jc-featured-body">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "14px" }}>
            <span style={{
              background: "rgba(255,140,0,0.10)", border: "1px solid rgba(255,140,0,0.22)",
              borderRadius: "9999px", padding: "3px 12px",
              fontFamily: IN, fontSize: "0.6rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase", color: OR,
            }}>Latest Story</span>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: IN, fontSize: "0.66rem", color: "#9C8550" }}>
              <BookOpen size={11} style={{ color: OR }} />
              {META[featured.slug]?.date ?? "2024"}
            </span>
            <span style={{ color: "#FFD89B" }}>·</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: IN, fontSize: "0.66rem", color: "#9C8550" }}>
              <Clock size={11} style={{ color: OR }} />
              {featured.readTime}
            </span>
          </div>

          <h2 style={{
            fontFamily: PF, fontSize: "clamp(1.5rem,2.8vw,2.2rem)",
            fontWeight: 700, color: "#1A1209", lineHeight: 1.2, marginBottom: "12px",
          }}>{featured.title}</h2>

          <div style={{ width: "32px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px", marginBottom: "14px" }} />

          <p style={{
            fontFamily: IN, fontSize: "0.92rem", color: "#6B5B2E",
            lineHeight: 1.82, fontWeight: 300, marginBottom: "22px",
          }}>{featured.excerpt}</p>

          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontFamily: IN, fontSize: "0.76rem", fontWeight: 700,
            color: OR, letterSpacing: "0.06em", textTransform: "uppercase",
          }}>
            Coming Soon <ArrowRight size={13} />
          </span>
        </div>
      </div>

      {/* ── Section label ── */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "6px" }}>
          More Stories
        </p>
        <div style={{ width: "32px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px" }} />
      </div>

      {/* ── Secondary cards — desktop grid ── */}
      <div className="jc-secondary-grid">
        {secondary.map(a => <JournalCard key={a.slug} article={a} />)}
      </div>

      {/* ── Secondary cards — mobile slider ── */}
      <div className="jc-slider-mobile">
        <MobileSlider autoPlay interval={3800} ariaLabel="Journal article cards">
          {secondary.map(a => <JournalCard key={a.slug} article={a} />)}
        </MobileSlider>
      </div>

      {/* ── Subscribe / Get in Touch ── */}
      <div className="jc-subscribe">
        <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "8px" }}>
          Stay Connected
        </p>
        <div style={{ width: "32px", height: "2px", background: OR, borderRadius: "2px", margin: "0 auto 18px" }} />
        <h2 style={{ fontFamily: PF, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2rem)", color: "#1A1209", marginBottom: "10px" }}>
          New stories, when the city gives them.
        </h2>
        <p style={{ fontFamily: IN, color: "#6B5B2E", fontSize: "0.9rem", maxWidth: "400px", margin: "0 auto 28px", lineHeight: 1.78, fontWeight: 300 }}>
          We write when we have something worth sharing — not on a schedule.
        </p>
        <Link href="/contact" className="jcta">
          Get in Touch <ArrowRight size={14} />
        </Link>
      </div>
    </>
  );
}
