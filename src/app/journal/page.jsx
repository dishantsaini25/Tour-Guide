import JournalClient from "./JournalClient";

export const metadata = {
  title: "The Raah Journal",
  description: "Stories, observations, and conversations from the lanes of Jaipur.",
};

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";
const OR = "#FF8C00", GO = "#F5A623";

export default function JournalPage() {
  return (
    <>
      <style>{`
        /* ── Journal hero ── */
        .jp-hero {
          position: relative;
          min-height: 56vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .jp-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('/experiances/Beyond the pink/thumbnail.jpg');
          background-size: cover;
          background-position: center 35%;
        }
        /* Dark gradient — heavier at bottom for text legibility */
        .jp-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,5,0,0.92) 0%,
            rgba(10,5,0,0.55) 42%,
            rgba(10,5,0,0.20) 70%,
            transparent 100%
          );
        }
        /* Flat dark overlay for overall contrast boost */
        .jp-hero-dark {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.32);
        }
        /* Warm amber radial accent */
        .jp-hero-accent {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 12% 75%, rgba(255,140,0,0.12) 0%, transparent 55%);
        }
        /* Section-merge fade into white content below */
        .jp-hero-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(to top, #FFFFFF, transparent);
          pointer-events: none;
        }
        .jp-hero-content {
          position: relative;
          z-index: 10;
          max-width: 1320px;
          margin: 0 auto;
          padding: 120px 24px 52px;
          width: 100%;
        }
        @media (min-width: 768px) {
          .jp-hero-content { padding: 140px 32px 64px; }
          .jp-hero { min-height: 60vh; }
        }
      `}</style>

      {/* ── Premium hero ── */}
      <section className="jp-hero">
        <div className="jp-hero-bg" />
        <div className="jp-hero-dark" />
        <div className="jp-hero-overlay" />
        <div className="jp-hero-accent" />
        <div className="jp-hero-fade" />

        <div className="jp-hero-content">
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
            <div style={{ width: "32px", height: "1px", background: GO }} />
            <p style={{
              fontFamily: IN, fontSize: "0.58rem", letterSpacing: "0.32em",
              textTransform: "uppercase", fontWeight: 700, color: GO,
            }}>
              Raah India · Jaipur
            </p>
          </div>

          {/* Main heading */}
          <h1 style={{
            fontFamily: PF, fontWeight: 700,
            fontSize: "clamp(2.8rem,7vw,6rem)",
            color: "#FFFFFF", lineHeight: 1.0,
            marginBottom: "20px",
            textShadow: "0 2px 24px rgba(0,0,0,0.4)",
            letterSpacing: "-0.01em",
          }}>
            The Raah<br />
            <em style={{ color: OR, fontStyle: "italic" }}>Journal</em>
          </h1>

          {/* Divider */}
          <div style={{
            width: "44px", height: "2px",
            background: `linear-gradient(to right,${OR},${GO})`,
            borderRadius: "2px", marginBottom: "18px",
          }} />

          {/* Intro */}
          <p style={{
            fontFamily: IN, color: "rgba(255,255,255,0.72)",
            fontSize: "clamp(0.9rem,1.8vw,1.05rem)",
            lineHeight: 1.78, fontWeight: 300,
            maxWidth: "480px",
          }}>
            Stories, observations, and conversations from the lanes of Jaipur —
            written when the city gives them.
          </p>
        </div>
      </section>

      {/* ── Articles ── */}
      <section style={{ background: "#FFFFFF", padding: "60px 0 88px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px" }}>
          <JournalClient />
        </div>
      </section>
    </>
  );
}
