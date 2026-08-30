"use client";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   HIGHLIGHT DATA — 12 client-provided facts
───────────────────────────────────────────────────────────────── */
const HIGHLIGHTS = [
  {
    id:    "01",
    icon:  "🌸",
    title: "A Colour Born of Welcome & Hospitality",
    desc:  "The terracotta Pink-hued City",
  },
  {
    id:    "02",
    icon:  "🗺️",
    title: "A City Drawn in a Grid Pattern",
    desc:  "India's first planned city",
  },
  {
    id:    "03",
    icon:  "🪐",
    title: "Where the Cosmos Became Architecture",
    desc:  "Jantar Mantar, astronomical observatory",
  },
  {
    id:    "04",
    icon:  "⏱️",
    title: "Time Measured in Seconds",
    desc:  "The world's largest stone sundial — Samrat Yantra",
  },
  {
    id:    "05",
    icon:  "🔢",
    title: "A City Built Around Nine",
    desc:  "The cosmic geometry of Jaipur",
  },
  {
    id:    "06",
    icon:  "💎",
    title: "India's Gem Capital",
    desc:  "A world of gems & jewellery",
  },
  {
    id:    "07",
    icon:  "🧵",
    title: "A City That Still Makes",
    desc:  "Centuries-old crafts & living traditions",
  },
  {
    id:    "08",
    icon:  "🌬️",
    title: "A Symphony of Wind",
    desc:  "The iconic Hawa Mahal",
  },
  {
    id:    "09",
    icon:  "🏰",
    title: "A Fort That Guards a Giant",
    desc:  "Jaivana, the legendary cannon & the impregnable Jaigarh Fort",
  },
  {
    id:    "10",
    icon:  "🎤",
    title: "Where the World Comes to Talk",
    desc:  "Jaipur Literature Festival",
  },
  {
    id:    "11",
    icon:  "📸",
    title: "A Photographer's Paradise",
    desc:  "Colours, geometry, people & light",
  },
  {
    id:    "12",
    icon:  "🌈",
    title: "The Vibrant Colors of the City",
    desc:  "People, festivals, culture & cuisine",
  },
];

/* ─────────────────────────────────────────────────────────────────
   SINGLE HIGHLIGHT CARD — column layout for equal height
───────────────────────────────────────────────────────────────── */
function HighlightCard({ icon, title, desc }) {
  return (
    <div className="jin-card" aria-label={`${title} — ${desc}`}>
      {/* Icon badge */}
      <span className="jin-icon" aria-hidden="true">{icon}</span>
      {/* Title — flex: 1 fills the middle, absorbs any line-count variation */}
      <p className="jin-title">{title}</p>
      {/* Description — always anchored at bottom by flex column layout */}
      <p className="jin-desc">{desc}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────────────── */
export default function JaipurInANutshell() {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const [visible, setVisible]   = useState(false); // section entered viewport
  const [paused,  setPaused]    = useState(false); // hover pause
  const [reduced, setReduced]   = useState(false); // prefers-reduced-motion

  /* ── Detect prefers-reduced-motion ── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── IntersectionObserver — reveal heading + start marquee ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Pause CSS animation on hover (desktop) ── */
  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

  /* ──────────────────────────────────────────────────────────────
     Seamless duplicate: render original + copy so the loop is
     invisible. CSS @keyframes moves the track by exactly 50%
     (= one full set of cards), at which point the animation resets
     to 0% — and the copy looks identical to the original start.
  ────────────────────────────────────────────────────────────── */
  const cards = [...HIGHLIGHTS, ...HIGHLIGHTS]; // original + duplicate

  return (
    <>
      <style>{`
        /* ── Section entrance ── */
        .jin-heading-wrap {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.65s ease 0.05s, transform 0.65s ease 0.05s;
        }
        .jin-heading-wrap.jin-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .jin-slider-wrap {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.65s ease 0.20s, transform 0.65s ease 0.20s;
        }
        .jin-slider-wrap.jin-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Slider viewport ── */
        .jin-viewport {
          position: relative;
          overflow: hidden;
          width: 100%;
          touch-action: pan-x;
          /* Edge fades — must match section bg: #1A1209 dark */
          -webkit-mask-image:
            linear-gradient(
              to right,
              transparent 0%,
              rgba(0,0,0,0.55) 5%,
              rgba(0,0,0,1) 13%,
              rgba(0,0,0,1) 87%,
              rgba(0,0,0,0.55) 95%,
              transparent 100%
            );
          mask-image:
            linear-gradient(
              to right,
              transparent 0%,
              rgba(0,0,0,0.55) 5%,
              rgba(0,0,0,1) 13%,
              rgba(0,0,0,1) 87%,
              rgba(0,0,0,0.55) 95%,
              transparent 100%
            );
        }

        /* ── Track — the duplicated list ── */
        .jin-track {
          display: flex;
          align-items: stretch;   /* cards stretch to tallest — prevented by fixed height */
          gap: 18px;
          width: max-content;
          will-change: transform;
          animation: jin-scroll 45s linear infinite;
          padding: 4px 0 6px;     /* breathing room so hover shadow isn't clipped */
        }
        .jin-track.jin-paused  { animation-play-state: paused; }
        .jin-track.jin-reduced { animation: none; }

        @keyframes jin-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Card — FIXED EQUAL HEIGHT, column layout ── */
        .jin-card {
          flex: 0 0 auto;
          /* Fixed width — wide horizontal rectangle */
          width: clamp(240px, 26vw, 310px);
          /* FIXED HEIGHT — every card identical regardless of text length */
          height: 178px;
          /* Column layout so icon sits top, title in flex-grow middle, desc at bottom */
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 0;
          padding: 20px 20px 18px 22px;
          border-radius: 18px;
          /* Light warm card on the dark section background */
          background: linear-gradient(145deg, rgba(255,251,240,0.10) 0%, rgba(255,247,228,0.07) 100%);
          border: 1px solid rgba(245,166,35,0.28);
          position: relative;
          overflow: hidden;
          transition:
            transform 0.32s ease,
            box-shadow 0.32s ease,
            border-color 0.32s ease,
            background 0.32s ease;
          cursor: default;
          user-select: none;
        }
        /* Warm radial glow top-right — same decorative language as StatsStrip */
        .jin-card::before {
          content: '';
          position: absolute;
          top: -20px; right: -20px;
          width: 80px; height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,140,0,0.10) 0%, transparent 70%);
          pointer-events: none;
        }
        /* Left accent bar — same gold gradient as StatsStrip dividers */
        .jin-card::after {
          content: '';
          position: absolute;
          top: 16px; bottom: 16px; left: 0;
          width: 2px;
          border-radius: 0 2px 2px 0;
          background: linear-gradient(to bottom, transparent, rgba(245,166,35,0.55), transparent);
        }
        .jin-card:hover {
          transform: translateY(-5px) scale(1.022);
          background: linear-gradient(145deg, rgba(255,251,240,0.16) 0%, rgba(255,247,228,0.11) 100%);
          border-color: rgba(255,140,0,0.55);
          box-shadow: 0 12px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(245,166,35,0.20);
        }

        /* ── Icon badge ── */
        .jin-icon {
          font-size: 1.35rem;
          line-height: 1;
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          /* Same gold badge as StatsStrip icon halos elsewhere in the design system */
          background: linear-gradient(135deg, rgba(255,232,176,0.18) 0%, rgba(255,212,122,0.12) 100%);
          border: 1px solid rgba(245,166,35,0.30);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        /* ── Title — flex-grow so it pushes desc to the bottom ── */
        .jin-title {
          font-family: Fraunces, Georgia, serif;
          font-size: 0.88rem;
          font-weight: 700;
          /* On-dark text: bright cream */
          color: rgba(255, 253, 231, 0.95);
          line-height: 1.3;
          margin: 0 0 0 0;
          /* Grow to fill available middle space so desc is always at bottom */
          flex: 1;
        }

        /* ── Description — fixed at bottom ── */
        .jin-desc {
          font-family: DM Sans, system-ui, sans-serif;
          font-size: 0.70rem;
          font-weight: 300;
          /* Muted cream — same tone as ss-label in StatsStrip */
          color: rgba(255, 253, 231, 0.52);
          line-height: 1.45;
          margin: 0;
          /* Anchor to bottom — do NOT let it push card height */
          flex-shrink: 0;
        }

        /* ── Reduced motion fallback ── */
        @media (prefers-reduced-motion: reduce) {
          .jin-track {
            animation: none !important;
            overflow-x: auto;
            width: 100%;
            scrollbar-width: thin;
            scrollbar-color: rgba(255,140,0,0.25) transparent;
          }
          .jin-track::-webkit-scrollbar { height: 4px; }
          .jin-track::-webkit-scrollbar-thumb {
            background: rgba(255,140,0,0.25); border-radius: 4px;
          }
          .jin-viewport {
            overflow-x: auto;
            -webkit-mask-image: none;
            mask-image: none;
          }
        }

        /* ── Tablet ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .jin-card { width: clamp(220px, 38vw, 280px); height: 170px; }
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .jin-card {
            width: clamp(200px, 72vw, 260px);
            height: 160px;
            padding: 16px 16px 14px 18px;
            border-radius: 14px;
          }
          .jin-icon {
            width: 34px; height: 34px;
            border-radius: 8px;
            font-size: 1.1rem;
            margin-bottom: 9px;
          }
          .jin-title { font-size: 0.80rem; }
          .jin-desc  { font-size: 0.64rem; }
          .jin-track { gap: 12px; }
        }

        /* ── Top/bottom gold border lines (same as StatsStrip) ── */
        .jin-top-line,
        .jin-bottom-line {
          height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(245,166,35,0.45) 30%,
            rgba(255,140,0,0.65) 50%,
            rgba(245,166,35,0.45) 70%,
            transparent 100%
          );
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          /* Same dark background as StatsStrip */
          background: "linear-gradient(135deg, #1A1209 0%, #2C1D07 50%, #1A1209 100%)",
          position: "relative",
          overflow: "hidden",
          padding: "64px 0 60px",
        }}
        aria-label="Jaipur In A Nutshell"
      >
        {/* Warm radial glow — matches StatsStrip::before */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 50%, rgba(255,140,0,0.09) 0%, transparent 70%)",
        }} aria-hidden="true" />

        {/* Top gold border line */}
        <div className="jin-top-line" style={{ position: "absolute", top: 0, left: 0, right: 0 }} aria-hidden="true" />
        {/* Bottom gold border line */}
        <div className="jin-bottom-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} aria-hidden="true" />

        {/* ── Heading ── */}
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1 }}
          className="inner-pad"
        >
          <div className={`jin-heading-wrap${visible ? " jin-visible" : ""}`}>
            {/* Replicate SectionHeading pattern manually so we can use dark=true colours */}
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 44px" }}>
              <p style={{
                fontFamily: "DM Sans, system-ui, sans-serif",
                fontSize: "0.6rem", letterSpacing: "0.28em",
                textTransform: "uppercase", fontWeight: 700,
                color: "#FF8C00", marginBottom: "10px",
              }}>
                Jaipur In A Nutshell
              </p>
              <div style={{
                width: "36px", height: "2px",
                background: "linear-gradient(to right, #FF8C00, #F5A623)",
                borderRadius: "2px", margin: "0 auto 16px",
              }} />
              <h2 style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                lineHeight: 1.1,
                color: "#FFFFFF",
                marginBottom: "14px",
              }}>
                A Few Remarkable Things
              </h2>
              <p style={{
                fontFamily: "DM Sans, system-ui, sans-serif",
                fontSize: "1rem", lineHeight: 1.8,
                color: "rgba(255,253,231,0.60)",
                fontWeight: 300,
              }}>
                That would make your visit to Jaipur so special.
              </p>
            </div>
          </div>
        </div>

        {/* ── Slider — full bleed ── */}
        <div
          className={`jin-slider-wrap${visible ? " jin-visible" : ""}`}
          style={{ position: "relative", zIndex: 1 }}
        >
          <div
            className="jin-viewport"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ padding: "8px 0 10px" }}
          >
            <div
              ref={trackRef}
              className={[
                "jin-track",
                paused  ? "jin-paused"  : "",
                reduced ? "jin-reduced" : "",
              ].filter(Boolean).join(" ")}
              role="list"
              aria-label="Jaipur highlights — continuous marquee"
            >
              {cards.map((h, idx) => (
                <div key={`${h.id}-${idx}`} role="listitem">
                  <HighlightCard icon={h.icon} title={h.title} desc={h.desc} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
