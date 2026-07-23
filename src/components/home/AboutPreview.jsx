import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";

export default function AboutPreview() {
  return (
    <>
      <style>{`
        /* ── Primary CTA — pill, gradient, glow hover ── */
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

        /* ── Secondary CTA — pill, outline, glow hover ── */
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

        /* ── Shobhit image — responsive sizing ── */
        .ap-img-wrap {
          position: relative;
          overflow: hidden;
          border: 1px solid #FFD89B;
          border-radius: 18px;
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
          aspect-ratio: 4/5;
          box-shadow: 0 8px 32px rgba(255,140,0,0.12);
        }
        @media (min-width: 640px)  { .ap-img-wrap { max-width: 380px; } }
        @media (min-width: 1024px) { .ap-img-wrap { max-width: none; margin: 0; } }

        /* ── Blockquote ── */
        .ap-blockquote {
          border-left: 3px solid #FF8C00;
          padding: 14px 18px 14px 22px;
          background: rgba(255,140,0,0.04);
          border-radius: 0 12px 12px 0;
          margin: 0;
        }
        .ap-blockquote p {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(1rem, 2vw, 1.15rem);
          font-style: italic;
          color: #1A1209;
          line-height: 1.72;
          font-weight: 400;
          margin: 0 0 8px;
        }
        .ap-blockquote cite {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.72rem;
          font-style: normal;
          font-weight: 700;
          color: #FF8C00;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
      `}</style>

      <SectionWrapper variant="soft">
        {/* ── Section heading — centred above the two-column grid ── */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: "#FF8C00", marginBottom: "10px" }}>
            THE RAAH PHILOSOPHY
          </p>
          <div style={{ width: "40px", height: "2px", background: "linear-gradient(to right, #FF8C00, #F5A623)", margin: "0 auto 18px" }} />
          <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: "#1A1209", lineHeight: 1.1 }}>
            Story Behind Raah
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Image column — first in JSX → on top on mobile ── */}
          <div style={{ position: "relative" }} className="lg:order-last">
            <div className="ap-img-wrap">
              <Image
                src="/images/WhatsApp Image 2026-07-23 at 2.47.33 PM.jpeg"
                alt="Shobhit — founder of Raah India Experiences"
                fill
                className="object-cover object-center"
                sizes="(max-width:640px) 300px, (max-width:1024px) 380px, 50vw"
              />
            </div>
            {/* Desktop decorative corner squares */}
            <div style={{ position: "absolute", bottom: "-14px", right: "-14px", width: "80px", height: "80px", border: "2px solid rgba(255,140,0,0.35)", borderRadius: "4px" }} className="hidden lg:block" />
            <div style={{ position: "absolute", top: "-14px", left: "-14px", width: "48px", height: "48px", border: "2px solid rgba(255,216,155,0.5)", borderRadius: "4px" }} className="hidden lg:block" />
          </div>

          {/* ── Text column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>

            {/* Welcome heading */}
            <div>
              <h3 style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: "#1A1209", lineHeight: 1.15, marginBottom: "6px" }}>
                Welcome to{" "}
                <em style={{ color: "#FF8C00", fontStyle: "italic" }}>Raah India</em>
              </h3>
              <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#FF8C00", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Meet Shobhit — Your Local Guide &amp; Storyteller
              </p>
            </div>

            {/* Narrative paragraphs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.95rem", color: "#6B5B2E", lineHeight: 1.85, fontWeight: 300 }}>
              <p>
                Raah India was born from a simple but powerful conviction — that the most meaningful travel happens not between monuments, but between people. That real discovery lives in the fragrance of marigolds before sunrise, in a family recipe shared over a wood fire, in the laughter of a chai-wallah who has known this lane his entire life.
              </p>
              <p>
                Shobhit grew up in Jaipur — not the postcard version, but the living, breathing city of narrow lanes, neighbourhood temples, and generations of artisans who never made it into any guidebook. After years of watching travellers leave with photographs but without stories, he made a decision: to share the city he actually knows.
              </p>
              <p>
                Every Raah experience is personally walked, researched, and refined. Every stop is chosen for its authenticity. Every group is kept small enough for real connection. Because travel, at its best, is not a transaction — it is a conversation.
              </p>
            </div>

            {/* Shobhit's quote */}
            <blockquote className="ap-blockquote">
              <p>
                "I don't want you to see Jaipur. I want you to feel it — in the heat of a temple courtyard at dawn, in the weight of a freshly made bangle, in the silence between the call to prayer and the first street vendor's voice. That is the Jaipur I grew up in. That is the Jaipur I want to share with you."
              </p>
              <cite>— Shobhit, Founder · Raah India Experiences</cite>
            </blockquote>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingTop: "6px" }}>
              <Link
                href="/about"
                className="ap1"
                style={{ padding: "13px 28px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}
              >
                Read Full Philosophy
              </Link>
              <Link
                href="/experiences"
                className="ap2"
                style={{ padding: "13px 28px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 700, textDecoration: "none" }}
              >
                Explore Experiences
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
