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
        /* ── Journal page hero ── */
        .jp-hero {
          background: #FFFDE7;
          padding-top: 110px;
          padding-bottom: 72px;
          text-align: center;
          border-bottom: 1px solid #FFD89B;
          position: relative;
          overflow: hidden;
        }
        /* Soft decorative radial behind the heading */
        .jp-hero::before {
          content: '';
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(255,140,0,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
      `}</style>

      {/* ── Page header ── */}
      <section className="jp-hero">
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1 }}>
          {/* Eyebrow */}
          <p style={{
            fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em",
            textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "10px",
          }}>
            The Raah Journal
          </p>

          {/* Rule */}
          <div style={{
            width: "36px", height: "2px",
            background: `linear-gradient(to right, ${OR}, ${GO})`,
            borderRadius: "2px", margin: "0 auto 20px",
          }} />

          {/* Heading */}
          <h1 style={{
            fontFamily: PF, fontWeight: 700,
            fontSize: "clamp(3rem,7vw,5rem)",
            color: "#1A1209", lineHeight: 1.08, marginBottom: "18px",
          }}>
            Stories From<br />
            <em style={{ color: OR, fontStyle: "italic" }}>the City</em>
          </h1>

          {/* Intro */}
          <p style={{
            fontFamily: IN, color: "#6B5B2E",
            fontSize: "1rem", lineHeight: 1.82, fontWeight: 300,
            maxWidth: "520px", margin: "0 auto",
          }}>
            Our journal is where Jaipur speaks for itself — through conversations
            overheard in narrow lanes, observations from markets before sunrise,
            and stories no guidebook contains.
          </p>
        </div>
      </section>

      {/* ── Articles (client component handles slider + interactivity) ── */}
      <section style={{ background: "#FFFFFF", padding: "72px 0 88px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px" }}>
          <JournalClient />
        </div>
      </section>
    </>
  );
}
