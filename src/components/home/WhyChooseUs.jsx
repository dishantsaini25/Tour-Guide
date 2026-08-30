"use client";
import { useEffect, useRef, useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import MobileSlider from "@/components/MobileSlider";

const reasons = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Curated, Not Scripted",
    desc: "Every route is personally researched, walked, and refined. No two walks feel the same because no two groups of guests are the same.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Small Groups Only",
    desc: "Maximum 8 guests. Meaningful travel requires space for conversation, curiosity, and genuine human connection.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Local Stories, Not History Books",
    desc: "We share stories that live in lanes, kitchens, and communities — not the dates and dynasties you already read online.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: "Authentic Food Discoveries",
    desc: "From predawn street kitchens to countryside farmhouses — food is how we understand Jaipur, not just a tasting detour.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Responsible Tourism",
    desc: "We support local artisans, small food vendors, and community spaces. Your journey creates genuine value for Jaipur's people.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    title: "No Forced Shopping. Ever.",
    desc: "Not one stop on any Raah experience is commission-based. We guide with complete independence and honesty.",
  },
];

function WCUCard({ icon, title, desc }) {
  return (
    <div className="wcu-card">
      {/* Icon with circular halo badge */}
      <div className="wcu-icon-wrap">
        <div className="wcu-icon-halo">
          {icon}
        </div>
      </div>
      {/* Accent rule */}
      <div style={{
        width: "32px", height: "2px",
        background: "linear-gradient(to right, #FF8C00, #F5A623)",
        borderRadius: "2px",
        margin: "20px 0 14px",
      }} />
      <h3 style={{
        fontFamily: "Fraunces, Georgia, serif",
        fontSize: "1.12rem",
        fontWeight: 700,
        color: "#1A1209",
        marginBottom: "10px",
        lineHeight: 1.28,
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: "DM Sans, system-ui, sans-serif",
        fontSize: "0.875rem",
        color: "#6B5B2E",
        lineHeight: 1.82,
        fontWeight: 300,
      }}>
        {desc}
      </p>
    </div>
  );
}

function PhilosophyBanner() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVis(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="wcu-philosophy" ref={ref}>
      <div className={`wcu-philosophy-num${vis ? " wcu-ph-vis" : ""}`}>1</div>
      <div className="wcu-philosophy-divider" />
      <div className={`wcu-philosophy-text${vis ? " wcu-ph-vis" : ""}`}>
        <span className="wcu-philosophy-eyebrow">Guiding Philosophy</span>
        <h3 className="wcu-philosophy-headline">
          Travel Beyond the{" "}
          <em>Ordinary</em>
        </h3>
        <p className="wcu-philosophy-sub">
          One clear purpose — to help you experience Jaipur not as a tourist, but as someone who truly belongs here, even for a day.
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <>
      <style>{`
        /* ── Card — warm sand background, not plain white ── */
        .wcu-card {
          background: linear-gradient(145deg, #FFFBF0 0%, #FFF7E6 100%);
          border: 1px solid rgba(255,216,155,0.55);
          border-radius: 22px;
          padding: 30px 26px 32px;
          box-shadow: 0 2px 14px rgba(255,140,0,0.07), 0 1px 3px rgba(0,0,0,0.04);
          transition: box-shadow 0.38s ease, transform 0.38s ease, border-color 0.38s ease;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        /* Subtle top-left accent arc — decorative only */
        .wcu-card::before {
          content: '';
          position: absolute;
          top: -28px;
          right: -28px;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,216,155,0.35) 0%, transparent 70%);
          pointer-events: none;
        }
        .wcu-card:hover {
          box-shadow: 0 14px 40px rgba(255,140,0,0.16), 0 2px 8px rgba(0,0,0,0.05);
          transform: translateY(-6px);
          border-color: rgba(255,140,0,0.35);
        }

        /* ── Icon badge — circle with gradient backing ── */
        .wcu-icon-wrap {
          position: relative;
          display: inline-flex;
          margin-bottom: 4px;
        }
        /* Soft halo circle behind the icon */
        .wcu-icon-halo {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFE8B0 0%, #FFD47A 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C45E00;
          box-shadow: 0 3px 12px rgba(255,140,0,0.22);
        }

        /* ── Desktop grid ── */
        .wcu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1023px) { .wcu-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 767px)  { .wcu-grid { display: none; } }

        /* ── Mobile slider wrapper ── */
        .wcu-slider-mobile { display: none; }
        @media (max-width: 767px) { .wcu-slider-mobile { display: block; } }

        /* ── Guiding Philosophy Banner ── */
        .wcu-philosophy {
          display: flex;
          align-items: center;
          gap: 32px;
          padding: 32px 36px;
          margin-bottom: 52px;
          background: linear-gradient(135deg, #1A1209 0%, #2C1D07 60%, #1A1209 100%);
          border-radius: 20px;
          border: 1px solid rgba(245,166,35,0.25);
          box-shadow: 0 8px 32px rgba(0,0,0,0.14), inset 0 1px 0 rgba(245,166,35,0.12);
          position: relative;
          overflow: hidden;
        }
        .wcu-philosophy::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,140,0,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .wcu-philosophy-num {
          font-family: Fraunces, Georgia, serif;
          font-size: clamp(3.5rem, 7vw, 5.5rem);
          font-weight: 700;
          color: #FF8C00;
          line-height: 1;
          letter-spacing: -0.04em;
          flex-shrink: 0;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .wcu-philosophy-num.wcu-ph-vis {
          opacity: 1;
          transform: translateY(0);
        }
        .wcu-philosophy-divider {
          width: 1px;
          height: 64px;
          background: linear-gradient(to bottom, transparent, rgba(245,166,35,0.40), transparent);
          flex-shrink: 0;
        }
        .wcu-philosophy-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease 0.22s, transform 0.7s ease 0.22s;
        }
        .wcu-philosophy-text.wcu-ph-vis {
          opacity: 1;
          transform: translateY(0);
        }
        .wcu-philosophy-eyebrow {
          font-family: DM Sans, system-ui, sans-serif;
          font-size: 0.58rem;
          font-weight: 700;
          color: rgba(245,166,35,0.75);
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }
        .wcu-philosophy-headline {
          font-family: Fraunces, Georgia, serif;
          font-size: clamp(1.3rem, 2.8vw, 2rem);
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.15;
        }
        .wcu-philosophy-headline em {
          color: #FF8C00;
          font-style: italic;
        }
        .wcu-philosophy-sub {
          font-family: DM Sans, system-ui, sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          color: rgba(255,253,231,0.55);
          line-height: 1.6;
          margin-top: 6px;
        }
        @media (max-width: 640px) {
          .wcu-philosophy {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 24px 22px;
          }
          .wcu-philosophy-divider { display: none; }
          .wcu-philosophy-num { font-size: 3.2rem; }
        }
      `}</style>

      <SectionWrapper variant="main">
        <SectionHeading
          label="Why Walk With Raah"
          title="A Different Way to Travel"
          subtitle="We don't collect destinations. We create connections."
        />

        {/* Guiding Philosophy Banner */}
        <PhilosophyBanner />

        {/* Desktop grid */}
        <div className="wcu-grid">
          {reasons.map((r) => (
            <WCUCard key={r.title} {...r} />
          ))}
        </div>

        {/* Mobile slider */}
        <div className="wcu-slider-mobile">
          <MobileSlider autoPlay interval={4000} ariaLabel="Why walk with Raah cards">
            {reasons.map((r) => (
              <WCUCard key={r.title} {...r} />
            ))}
          </MobileSlider>
        </div>

        {/* Quote */}
        <div style={{ textAlign: "center", marginTop: "56px", paddingTop: "36px", borderTop: "1px solid #FFD89B" }}>
          <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(1.1rem,2.2vw,1.5rem)", fontStyle: "italic", fontWeight: 400, color: "#6B5B2E" }}>
            "We don't just show you Jaipur.{" "}
            <em style={{ color: "#FF8C00", fontStyle: "normal", fontWeight: 600 }}>We help you understand it.</em>"
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
