"use client";
import { useState, useEffect } from "react";
import { experiences, combos } from "@/data/experiences";
import ExperienceCard from "@/components/ExperienceCard";
import MobileSlider from "@/components/MobileSlider";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { ArrowRight, SlidersHorizontal, X } from "lucide-react";

const filters = ["All", "Morning", "Evening", "Night"];

/* ── Combo card icons keyed by experience slug ── */
const EXP_ICONS = {
  "jaipur-at-dawn":        "🌅",
  "ridge-and-ramparts":    "🏔️",
  "the-blue-hour":         "🌃",
  "beyond-the-pink":       "🏮",
  "farm-and-fire":         "🔥",
  "cosmic-imperial-triad": "🔭",
  "living-walled-city":    "🏰",
  "the-lost-kingdom":      "🌿",
  "artisans-jaipur":       "🖨️",
};

/* Title label for each combo experience slug */
const EXP_LABELS = {
  "jaipur-at-dawn":        "Jaipur at Dawn",
  "ridge-and-ramparts":    "Ridge & Ramparts",
  "the-blue-hour":         "The Blue Hour",
  "beyond-the-pink":       "Beyond the Pink",
  "farm-and-fire":         "The Farm & Fire",
  "cosmic-imperial-triad": "Cosmic & Imperial Triad",
  "living-walled-city":    "The Living Walled City",
  "the-lost-kingdom":      "The Lost Kingdom",
  "artisans-jaipur":       "The Artisan's Jaipur",
};

/* ── Time-of-day label per slug ── */
const EXP_TIME = {
  "jaipur-at-dawn":        "Morning",
  "the-lost-kingdom":      "Morning",
  "ridge-and-ramparts":    "Afternoon",
  "beyond-the-pink":       "Evening",
  "the-blue-hour":         "Evening",
  "farm-and-fire":         "Evening",
  "cosmic-imperial-triad": "Flexible",
  "living-walled-city":    "Flexible",
  "artisans-jaipur":       "Afternoon",
};

function ComboCard({ combo }) {
  const slugs = combo.experiences;
  return (
    <div className="combo-card">
      {/* Tag pill */}
      <div style={{ marginBottom: "16px" }}>
        <span style={{
          display: "inline-block",
          fontFamily: "DM Sans, system-ui, sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          fontWeight: 700,
          color: "#FF8C00",
          background: "rgba(255,140,0,0.10)",
          border: "1px solid rgba(255,140,0,0.22)",
          borderRadius: "9999px",
          padding: "4px 12px",
        }}>{combo.tag}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "Fraunces, Georgia, serif",
        fontSize: "1.28rem",
        fontWeight: 700,
        color: "#1A1209",
        lineHeight: 1.2,
        marginBottom: "4px",
      }}>{combo.title}</h3>

      {/* Subtitle */}
      {combo.subtitle && (
        <p style={{
          fontFamily: "DM Sans, system-ui, sans-serif",
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "#FF8C00",
          letterSpacing: "0.02em",
          marginBottom: "12px",
        }}>{combo.subtitle}</p>
      )}

      {/* Accent rule */}
      <div style={{ width: "28px", height: "2px", background: "linear-gradient(to right,#FF8C00,#F5A623)", borderRadius: "2px", marginBottom: "14px" }} />

      {/* Description */}
      <p style={{
        fontFamily: "DM Sans, system-ui, sans-serif",
        fontSize: "0.875rem",
        color: "#6B5B2E",
        lineHeight: 1.78,
        fontWeight: 300,
        marginBottom: "20px",
        flex: 1,
      }}>{combo.description}</p>

      {/* Experience chips — flow of the day */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "22px" }}>
        {slugs.map((slug, i) => (
          <span key={slug} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(255,255,255,0.75)",
            border: "1px solid rgba(255,216,155,0.7)",
            borderRadius: "9999px",
            padding: "5px 12px",
            fontFamily: "DM Sans, system-ui, sans-serif",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "#3D2E0E",
          }}>
            <span style={{ fontSize: "0.85em", opacity: 0.7, color: "#9C8550" }}>
              {EXP_TIME[slug] || ""}
            </span>
            <span>{EXP_ICONS[slug] || "✦"}</span>
            {EXP_LABELS[slug] || slug}
            {/* Arrow between chips (not after last) */}
            {i < slugs.length - 1 && (
              <span style={{ marginLeft: "4px", color: "#F5A623", fontSize: "0.75em" }}>→</span>
            )}
          </span>
        ))}
      </div>

      {/* CTA — pinned to bottom via flex layout on parent */}
      <div style={{ marginTop: "auto" }}>
        <Link
          href={`/contact?experience=${encodeURIComponent(combo.title)}`}
          className="combo-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "11px 24px",
            fontFamily: "DM Sans, system-ui, sans-serif",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textDecoration: "none",
            textTransform: "uppercase",
            color: "#FFFFFF",
          }}
        >
          Enquire About This Combo <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

export default function ExperiencesPage() {
  const [active, setActive]         = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const filtered = active === "All" ? experiences : experiences.filter(e => e.filters.includes(active));

  const applyFilter = (f) => { setActive(f); setFilterOpen(false); };

  // ESC closes the bottom sheet
  useEffect(() => {
    if (!filterOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setFilterOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [filterOpen]);

  return (
    <>
      <style>{`
        /* ─── Filter chips ──────────────────────────────── */
        .fc {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 8px 20px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.07em;
          text-transform: uppercase; border-radius: 9999px;
          border: 1.5px solid rgba(255,216,155,0.7);
          background: rgba(255,255,255,0.7); color: #6B5B2E;
          cursor: pointer; white-space: nowrap;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          transition: background 0.3s ease, border-color 0.3s ease,
                      color 0.25s ease, box-shadow 0.3s ease, transform 0.25s ease;
          outline: none;
        }
        .fc:hover {
          background: rgba(255,140,0,0.10); border-color: rgba(255,140,0,0.55);
          color: #C45E00;
          box-shadow: 0 0 10px rgba(255,140,0,0.18), 0 2px 8px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }
        .fc:focus-visible { outline: 2px solid #FF8C00; outline-offset: 2px; }
        .fc-active {
          background: linear-gradient(135deg,#FF8C00 0%,#E07800 55%,#C45E00 100%) !important;
          border-color: transparent !important; color: #FFFFFF !important;
          box-shadow: 0 4px 14px rgba(255,140,0,0.35);
        }
        .fc-active:hover {
          color: #FFFFFF !important;
          box-shadow:
            0 0 0 3px rgba(255,140,0,0.15),
            0 0 16px rgba(255,140,0,0.42),
            0 6px 18px rgba(255,140,0,0.28) !important;
          transform: translateY(-2px);
        }

        /* ─── Mobile filter button & bottom sheet ───── */
        .mob-filter-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 22px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.78rem; font-weight: 700; letter-spacing: 0.07em;
          text-transform: uppercase; border-radius: 9999px;
          border: 2px solid #FF8C00; background: transparent; color: #FF8C00;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(255,140,0,0.12);
          transition: background 0.25s ease, box-shadow 0.3s ease, transform 0.25s ease;
          outline: none;
        }
        .mob-filter-btn:hover, .mob-filter-btn:focus-visible {
          background: rgba(255,140,0,0.07);
          box-shadow: 0 0 0 4px rgba(255,140,0,0.12), 0 0 18px rgba(255,140,0,0.28);
          transform: translateY(-1px);
        }
        .mob-filter-btn:focus-visible { outline: 2px solid #FF8C00; outline-offset: 3px; }
        .mob-filter-badge {
          display: inline-flex; align-items: center; justify-content: center;
          background: #FF8C00; color: #FFFFFF;
          font-size: 0.6rem; font-weight: 700;
          min-width: 18px; height: 18px;
          border-radius: 9999px; padding: 0 5px;
        }
        .filter-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(26,18,9,0.50);
          backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .filter-overlay.is-open { opacity: 1; pointer-events: auto; }
        .filter-sheet {
          position: fixed; left: 0; right: 0; bottom: 0; z-index: 201;
          background: linear-gradient(160deg, #FFFBF0 0%, #FFF7E4 100%);
          border-radius: 24px 24px 0 0;
          border-top: 1px solid rgba(255,216,155,0.6);
          box-shadow: 0 -8px 40px rgba(255,140,0,0.12);
          max-height: 80vh; overflow-y: auto;
          transform: translateY(100%);
          transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
          will-change: transform;
          padding-bottom: env(safe-area-inset-bottom, 16px);
        }
        .filter-sheet.is-open { transform: translateY(0); }
        .filter-sheet-handle {
          width: 40px; height: 4px;
          background: rgba(255,140,0,0.22); border-radius: 2px;
          margin: 12px auto 0;
        }
        .exp-page-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 28px;
        }
        @media (max-width:1023px) { .exp-page-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width:767px)  { .exp-page-grid { display: none; } }
        .exp-page-slider { display: none; }
        @media (max-width:767px) { .exp-page-slider { display: block; } }

        /* ─── Combo card ────────────────────────────────── */
        .combo-card {
          background: linear-gradient(145deg, #FFFBF0 0%, #FFF7E4 100%);
          border: 1px solid rgba(255,216,155,0.55);
          border-radius: 22px;
          padding: 26px 24px 24px;
          box-shadow: 0 2px 14px rgba(255,140,0,0.07), 0 1px 3px rgba(0,0,0,0.04);
          display: flex; flex-direction: column;
          height: 100%;
          transition: box-shadow 0.38s ease, transform 0.38s ease, border-color 0.38s ease;
        }
        .combo-card:hover {
          box-shadow: 0 14px 40px rgba(255,140,0,0.15), 0 2px 8px rgba(0,0,0,0.05);
          transform: translateY(-5px);
          border-color: rgba(255,140,0,0.32);
        }

        /* ─── Combo CTA button ────────────────────────── */
        .combo-btn {
          border-radius: 9999px;
          background: linear-gradient(135deg,#FF8C00 0%,#E07800 55%,#C45E00 100%);
          box-shadow: 0 3px 14px rgba(255,140,0,0.28);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .combo-btn:hover, .combo-btn:focus-visible {
          color: #FFFFFF !important;
          transform: translateY(-2px) scale(1.03);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.13),
            0 0 22px rgba(255,140,0,0.48),
            0 8px 24px rgba(255,140,0,0.28) !important;
        }
        .combo-btn:active { transform: translateY(0) scale(1); }
        .combo-btn:focus-visible { outline: 2px solid #FF8C00; outline-offset: 3px; }

        /* ─── Combo desktop grid / mobile hidden ──────── */
        .combo-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 24px;
        }
        @media (max-width:1023px) { .combo-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width:767px)  { .combo-grid { display: none; } }
        .combo-slider { display: none; }
        @media (max-width:767px) { .combo-slider { display: block; } }

        /* ─── Bespoke CTA ────────────────────────────── */
        .bespoke-btn {
          display: inline-flex; align-items: center;
          padding: 14px 36px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.85rem; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; text-decoration: none;
          color: #FFFFFF !important; border-radius: 9999px;
          background: linear-gradient(135deg,#FF8C00 0%,#E07800 55%,#C45E00 100%);
          box-shadow: 0 4px 18px rgba(255,140,0,0.30);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .bespoke-btn:hover, .bespoke-btn:focus-visible {
          color: #FFFFFF !important;
          transform: translateY(-2px) scale(1.03);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.13),
            0 0 24px rgba(255,140,0,0.50),
            0 10px 28px rgba(255,140,0,0.30) !important;
        }
        .bespoke-btn:active { transform: translateY(0) scale(1); }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "55vh", display: "flex", alignItems: "flex-end", backgroundImage: "url('https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1600&q=85')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,10,0,0.78)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "160px 20px 64px", width: "100%" }}>
          <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#F5A623", fontWeight: 700, marginBottom: "12px" }}>All Experiences</p>
          <h1 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(2.8rem,6vw,5.5rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.08, marginBottom: "14px" }}>
            Every Walk Answers<br /><em style={{ color: "#FF8C00", fontStyle: "italic" }}>a Question</em>
          </h1>
          <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", maxWidth: "520px", lineHeight: 1.7, fontWeight: 300 }}>
            Seven curated experiences — each one designed to reveal a different layer of Jaipur.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top, #FFFDE7, transparent)" }} />
      </section>

      {/* ── Filters + Experience cards ── */}
      <SectionWrapper variant="soft">
        {/* ── Mobile: Filter button (md+ hidden) ── */}
        <div className="flex md:hidden" style={{ justifyContent: "center", marginBottom: "32px" }}>
          <button
            className="mob-filter-btn"
            onClick={() => setFilterOpen(true)}
            aria-haspopup="dialog"
            aria-label={`Filter experiences. Current filter: ${active}`}
          >
            <SlidersHorizontal size={14} />
            Filter
            {active !== "All" && <span className="mob-filter-badge">{active}</span>}
          </button>
        </div>

        {/* ── Desktop: static chip row (hidden on mobile) ── */}
        <div className="hidden md:flex" style={{ flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "52px" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`fc${active === f ? " fc-active" : ""}`}
              aria-pressed={active === f}
            >{f}</button>
          ))}
        </div>

        {/* ── Backdrop ── */}
        <div
          className={`filter-overlay${filterOpen ? " is-open" : ""}`}
          onClick={() => setFilterOpen(false)}
          aria-hidden="true"
        />

        {/* ── Bottom sheet ── */}
        <div
          className={`filter-sheet${filterOpen ? " is-open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Filter experiences by category"
          aria-hidden={!filterOpen}
        >
          <div className="filter-sheet-handle" aria-hidden="true" />

          {/* Sheet header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 22px 12px", borderBottom: "1px solid rgba(255,216,155,0.4)" }}>
            <div>
              <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.1rem", fontWeight: 700, color: "#1A1209", marginBottom: "1px" }}>Filter by Category</p>
              <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.68rem", color: "#9C8550", fontWeight: 300 }}>Tap a category to filter experiences</p>
            </div>
            <button
              onClick={() => setFilterOpen(false)}
              aria-label="Close filter panel"
              style={{ background: "rgba(255,140,0,0.08)", border: "none", borderRadius: "8px", padding: "8px", cursor: "pointer", color: "#FF8C00", display: "flex", alignItems: "center", transition: "background 0.2s" }}
            >
              <X size={18} strokeWidth={2.2} />
            </button>
          </div>

          {/* Chips */}
          <div style={{ padding: "18px 22px 24px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {filters.map(f => (
              <button key={f} onClick={() => applyFilter(f)}
                className={`fc${active === f ? " fc-active" : ""}`}
                aria-pressed={active === f}
              >{f}</button>
            ))}
          </div>

          {/* Active indicator + clear */}
          {active !== "All" && (
            <div style={{ padding: "0 22px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.72rem", color: "#9C8550" }}>Showing:</span>
              <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#FF8C00", background: "rgba(255,140,0,0.08)", borderRadius: "9999px", padding: "3px 10px" }}>{active}</span>
              <button onClick={() => applyFilter("All")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.72rem", color: "#9C8550", textDecoration: "underline" }}>Clear</button>
            </div>
          )}
        </div>

        {filtered.length > 0 ? (
          <>
            {/* Desktop grid */}
            <div className="exp-page-grid">
              {filtered.map(exp => <ExperienceCard key={exp.slug} experience={exp} />)}
            </div>
            {/* Mobile auto-slider */}
            <div className="exp-page-slider">
              <MobileSlider autoPlay interval={3800} ariaLabel="Experience cards">
                {filtered.map(exp => <ExperienceCard key={exp.slug} experience={exp} />)}
              </MobileSlider>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: "#6B5B2E", fontSize: "1.1rem" }}>
              No experiences match this filter.
            </p>
            <button
              onClick={() => setActive("All")}
              style={{ marginTop: "12px", color: "#FF8C00", background: "none", border: "none", cursor: "pointer", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.875rem", textDecoration: "underline" }}
            >
              Show all
            </button>
          </div>
        )}
      </SectionWrapper>

      {/* ── Combo cards ── */}
      <SectionWrapper variant="main">
        <SectionHeading
          label="Curated Combinations"
          title="Deeper Jaipur, One Perfect Day"
          subtitle="Three handcrafted itineraries — each pairing experiences for a seamless journey through the city's layers."
        />

        {/* Desktop grid */}
        <div className="combo-grid">
          {combos.map((c, i) => <ComboCard key={i} combo={c} />)}
        </div>

        {/* Mobile auto-slider */}
        <div className="combo-slider">
          <MobileSlider autoPlay interval={4200} ariaLabel="Combo experience cards">
            {combos.map((c, i) => <ComboCard key={i} combo={c} />)}
          </MobileSlider>
        </div>
      </SectionWrapper>

      {/* ── Bespoke CTA ── */}
      <div style={{ background: "#1A1209", padding: "72px 20px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(1.8rem,3.5vw,2.4rem)", fontWeight: 700, color: "#FFFFFF", marginBottom: "14px" }}>
          Looking for something bespoke?
        </h2>
        <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: "rgba(255,255,255,0.52)", maxWidth: "480px", margin: "0 auto 32px", lineHeight: 1.75, fontSize: "0.95rem", fontWeight: 300 }}>
          We craft private and fully customised experiences for individual travellers, families, and boutique groups.
        </p>
        <Link href="/contact" className="bespoke-btn">
          Get in Touch <ArrowRight size={14} />
        </Link>
      </div>
    </>
  );
}
