"use client";
import Link from "next/link";
import Image from "next/image";
import { Clock, Gauge, ArrowUpRight } from "lucide-react";

export default function ExperienceCard({ experience }) {
  const { slug, title, subtitle, question, theme, duration, difficulty, cardImage, heroImage, filters } = experience;
  const img = cardImage || heroImage;

  return (
    <>
      <style>{`
        /* ── Card shell ── */
        .ec-root {
          background: #FFFFFF;
          border: 1px solid rgba(255,216,155,0.55);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: box-shadow 0.38s ease, transform 0.38s ease;
          box-shadow: 0 2px 12px rgba(255,140,0,0.07);
        }
        .ec-root:hover {
          box-shadow: 0 16px 48px rgba(255,140,0,0.18), 0 4px 16px rgba(0,0,0,0.06);
          transform: translateY(-6px);
        }

        /* ── Thumbnail zoom ── */
        .ec-img { transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
        .ec-root:hover .ec-img { transform: scale(1.07); }

        /* ── Category badge (pill chip) ── */
        .ec-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: linear-gradient(135deg, rgba(255,140,0,0.92) 0%, rgba(224,120,0,0.95) 100%);
          color: #FFFFFF;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 9999px;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        /* ── Primary action: View Experience ──
           background-position slide trick — no overlay, text always visible */
        .ec-view {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex: 1;
          padding: 13px 16px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          color: #FFFFFF !important;
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 50%, #C45E00 50%, #E07800 100%);
          background-size: 200% 100%;
          background-position: 100% 0;
          border-radius: 0 0 0 20px;
          transition: background-position 0.4s ease, box-shadow 0.35s ease, transform 0.25s ease;
        }
        .ec-view:hover, .ec-view:focus-visible {
          background-position: 0% 0 !important;
          color: #FFFFFF !important;
          box-shadow: inset 0 0 0 0 transparent;
        }

        /* ── Secondary action: Enquire ── */
        .ec-enq {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          padding: 13px 20px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          text-decoration: none;
          color: #FF8C00 !important;
          background: #FFFDE7;
          border-left: 1px solid rgba(255,216,155,0.7);
          border-radius: 0 0 20px 0;
          transition: background 0.35s ease, color 0.25s ease, box-shadow 0.35s ease;
        }
        .ec-enq:hover, .ec-enq:focus-visible {
          background: linear-gradient(135deg, #FF8C00 0%, #F5A623 100%) !important;
          color: #FFFFFF !important;
        }
      `}</style>

      <article className="ec-root">
        {/* ── Thumbnail ── */}
        <div style={{ position: "relative", height: "224px", overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
          <Image
            src={img} alt={title} fill
            className="object-cover object-top ec-img"
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
          />
          {/* Dark gradient overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,10,0,0.86) 0%, rgba(20,10,0,0.1) 52%, transparent 100%)" }} />

          {/* Category pill badge */}
          <div style={{ position: "absolute", top: "14px", left: "14px" }}>
            <span className="ec-badge">
              {filters?.[0] || theme?.split("·")[0].trim()}
            </span>
          </div>

          {/* Question quote at bottom of image */}
          <div style={{ position: "absolute", bottom: "14px", left: "16px", right: "16px" }}>
            <p style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "0.82rem",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.45,
            }}>
              "{question}"
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "22px 22px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Theme label */}
          <p style={{
            fontFamily: "DM Sans, system-ui, sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#FF8C00",
            fontWeight: 700,
            marginBottom: "8px",
          }}>{theme}</p>

          {/* Title */}
          <h3 style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "1.45rem",
            fontWeight: 700,
            color: "#1A1209",
            lineHeight: 1.12,
            marginBottom: "6px",
          }}>{title}</h3>

          {/* Subtitle */}
          <p style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "0.88rem",
            fontStyle: "italic",
            color: "#6B5B2E",
            marginBottom: "16px",
          }}>{subtitle}</p>

          {/* Accent rule */}
          <div style={{ width: "32px", height: "2px", background: "linear-gradient(to right, #FF8C00, #F5A623)", borderRadius: "2px", marginBottom: "14px" }} />

          {/* Meta row */}
          <div style={{ display: "flex", gap: "18px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.75rem", color: "#6B5B2E" }}>
              <Clock size={12} style={{ color: "#F5A623" }} />{duration}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.75rem", color: "#6B5B2E" }}>
              <Gauge size={12} style={{ color: "#F5A623" }} />{difficulty}
            </span>
          </div>
        </div>

        {/* ── Action bar ── */}
        <div style={{ display: "flex", borderTop: "1px solid rgba(255,216,155,0.5)" }}>
          <Link href={`/experiences/${slug}`} className="ec-view">
            View Experience <ArrowUpRight size={13} />
          </Link>
          <Link href={`/contact?experience=${encodeURIComponent(title)}`} className="ec-enq">
            Enquire
          </Link>
        </div>
      </article>
    </>
  );
}
