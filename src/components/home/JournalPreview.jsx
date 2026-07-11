"use client";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import MobileSlider from "@/components/MobileSlider";
import { journalArticles } from "@/data/experiences";
import { ArrowUpRight } from "lucide-react";

function JournalCard({ a }) {
  return (
    <article className="jc-card">
      {/* Thumbnail */}
      <div style={{ position: "relative", height: "196px", overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
        <Image
          src={a.image}
          alt={a.title}
          fill
          className="object-cover object-top jc-img"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,10,0,0.55) 0%, transparent 55%)" }} />
        {/* Category pill on image */}
        <div style={{ position: "absolute", bottom: "12px", left: "14px" }}>
          <span style={{
            background: "rgba(255,140,0,0.92)",
            color: "#FFFFFF",
            fontFamily: "DM Sans, system-ui, sans-serif",
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "4px 11px",
            borderRadius: "9999px",
            backdropFilter: "blur(4px)",
          }}>{a.category}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 22px 22px" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.62rem", color: "#FF8C00", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>{a.category}</span>
          <span style={{ color: "#FFD89B", fontSize: "0.8rem" }}>·</span>
          <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.62rem", color: "#9C8550" }}>{a.readTime}</span>
        </div>

        <h3 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.12rem", fontWeight: 700, color: "#1A1209", lineHeight: 1.28, marginBottom: "9px" }}>{a.title}</h3>
        <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.85rem", color: "#6B5B2E", lineHeight: 1.78, marginBottom: "16px", fontWeight: 300 }}>{a.excerpt}</p>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "24px", height: "2px", background: "#F5A623", borderRadius: "2px" }} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.74rem", fontWeight: 600, color: "#FF8C00", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Read Article <ArrowUpRight size={12} />
          </span>
        </div>
      </div>
    </article>
  );
}

export default function JournalPreview() {
  const articles = journalArticles.slice(0, 3);

  return (
    <>
      <style>{`
        /* ── Journal card ── */
        .jc-card {
          background: linear-gradient(145deg, #FFFBF0 0%, #FFF7E4 100%);
          border: 1px solid rgba(255,216,155,0.55);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 14px rgba(255,140,0,0.07), 0 1px 3px rgba(0,0,0,0.04);
          transition: box-shadow 0.38s ease, transform 0.38s ease;
          height: 100%;
        }
        .jc-card:hover {
          box-shadow: 0 14px 40px rgba(255,140,0,0.15), 0 2px 8px rgba(0,0,0,0.05);
          transform: translateY(-5px);
        }
        .jc-img { transition: transform 0.65s ease; }
        .jc-card:hover .jc-img { transform: scale(1.06); }

        /* View all button */
        .jall {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 34px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          color: #FFFFFF !important;
          border-radius: 9999px;
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 55%, #C45E00 100%);
          box-shadow: 0 4px 16px rgba(255,140,0,0.28);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .jall:hover, .jall:focus-visible {
          color: #FFFFFF !important;
          transform: translateY(-2px) scale(1.03);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.13),
            0 0 22px rgba(255,140,0,0.48),
            0 10px 28px rgba(255,140,0,0.30) !important;
        }
        .jall:active { transform: translateY(0) scale(1); }

        /* Desktop grid */
        .jc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1023px) { .jc-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 767px)  { .jc-grid { display: none; } }

        .jc-slider-mobile { display: none; }
        @media (max-width: 767px) { .jc-slider-mobile { display: block; } }
      `}</style>

      <SectionWrapper variant="main">
        <SectionHeading
          label="The Raah Journal"
          title="Stories From the City"
          subtitle="Our journal is where Jaipur speaks for itself — through conversations overheard in narrow lanes, observations from markets before sunrise, and stories no guidebook contains."
        />

        {/* Desktop grid */}
        <div className="jc-grid">
          {articles.map((a) => <JournalCard key={a.slug} a={a} />)}
        </div>

        {/* Mobile auto-slider */}
        <div className="jc-slider-mobile">
          <MobileSlider autoPlay interval={3800} ariaLabel="Journal article cards">
            {articles.map((a) => <JournalCard key={a.slug} a={a} />)}
          </MobileSlider>
        </div>

        <div style={{ textAlign: "center", marginTop: "44px" }}>
          <Link href="/journal" className="jall">
            Visit The Raah Journal <ArrowUpRight size={14} />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
