import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";

export default function AboutPreview() {
  return (
    <>
      <style>{`
        /* ── Primary button — pill, solid orange, glow on hover ── */
        .ap1 {
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 55%, #C45E00 100%);
          color: #FFFFFF !important;
          border-radius: 9999px;
          box-shadow: 0 3px 14px rgba(255,140,0,0.28);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .ap1:hover, .ap1:focus-visible {
          color: #FFFFFF !important;
          transform: translateY(-2px) scale(1.03);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.14),
            0 0 22px rgba(255,140,0,0.48),
            0 8px 24px rgba(255,140,0,0.30);
        }
        .ap1:active { transform: translateY(0) scale(1); }

        /* ── Secondary button — pill, outline, glow on hover ── */
        .ap2 {
          border: 2px solid #FF8C00 !important;
          color: #FF8C00 !important;
          border-radius: 9999px;
          background: transparent;
          transition: box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease;
        }
        .ap2:hover, .ap2:focus-visible {
          color: #FF8C00 !important;
          background: rgba(255,140,0,0.06) !important;
          transform: translateY(-2px) scale(1.03);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.10),
            0 0 20px rgba(255,140,0,0.35),
            0 6px 20px rgba(255,140,0,0.18);
        }
        .ap2:active { transform: translateY(0) scale(1); }

        /* ── About image — responsive size ── */
        .ap-img-wrap {
          position: relative;
          overflow: hidden;
          border: 1px solid #FFD89B;
          /* default (mobile): constrained width, centred */
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
          aspect-ratio: 4/5;
        }
        @media (min-width: 640px) { .ap-img-wrap { max-width: 400px; } }
        @media (min-width: 1024px) {
          /* desktop: full-width column, no max-width cap */
          .ap-img-wrap { max-width: none; margin: 0; }
        }
      `}</style>

      <SectionWrapper variant="soft">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Image column ── */}
          <div style={{ position: "relative" }}>
            <div className="ap-img-wrap">
              <Image
                src="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=900&q=85"
                alt="Jaipur at dusk"
                fill
                className="object-cover object-center"
                sizes="(max-width:640px) 320px, (max-width:1024px) 400px, 50vw"
              />
            </div>
            {/* Desktop-only decorative elements */}
            <div style={{ position: "absolute", bottom: "-12px", right: "-12px", width: "90px", height: "90px", border: "2px solid rgba(255,140,0,0.4)" }} className="hidden lg:block" />
            <div style={{ position: "absolute", top: "24px", right: "-20px", background: "#FFFFFF", border: "1px solid #FFD89B", padding: "14px 18px", textAlign: "center", boxShadow: "0 4px 20px rgba(255,140,0,0.15)" }} className="hidden lg:block">
              <span style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.8rem", fontWeight: 700, color: "#FF8C00", display: "block", lineHeight: 1 }}>10+</span>
              <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B5B2E", fontWeight: 500 }}>Years</span>
            </div>
          </div>

          {/* ── Text column ── */}
          <div>
            <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: "#FF8C00", marginBottom: "10px" }}>The Curator</p>
            <div style={{ width: "40px", height: "2px", background: "linear-gradient(to right, #FF8C00, #F5A623)", marginBottom: "22px" }} />
            <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 700, color: "#1A1209", lineHeight: 1.08, marginBottom: "24px" }}>
              Born in Jaipur.<br />
              <em style={{ color: "#FF8C00", fontStyle: "italic", fontWeight: 600 }}>Storyteller by calling.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.95rem", color: "#6B5B2E", lineHeight: 1.85, fontWeight: 300, marginBottom: "32px" }}>
              <p>For years, I watched travellers arrive in Jaipur filled with excitement and leave with photographs of forts and palaces — yet having never experienced the city that locals know and cherish.</p>
              <p>One guest quietly said: <em style={{ color: "#1A1209", fontWeight: 500, fontFamily: "Fraunces, Georgia, serif" }}>"The monuments were beautiful, but I wish I had met the people who give this city its soul."</em></p>
              <p>That single sentence became the foundation of Raah India Experiences.</p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/about" className="ap1" style={{ padding: "13px 28px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                Our Philosophy
              </Link>
              <Link href="/experiences" className="ap2" style={{ padding: "13px 28px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 700, textDecoration: "none" }}>
                See All Experiences
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
