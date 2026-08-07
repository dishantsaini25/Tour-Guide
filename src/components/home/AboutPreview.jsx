import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";
const OR = "#FF8C00", GO = "#F5A623", CH = "#1A1209", MU = "#6B5B2E";

export default function AboutPreview() {
  return (
    <>
      <style>{`
        .ap1 {
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 55%, #C45E00 100%);
          color: #FFFFFF !important; border-radius: 9999px;
          box-shadow: 0 3px 14px rgba(255,140,0,0.28);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .ap1:hover, .ap1:focus-visible {
          color: #FFFFFF !important; transform: translateY(-2px) scale(1.03);
          box-shadow: 0 0 0 4px rgba(255,140,0,0.14), 0 0 22px rgba(255,140,0,0.48), 0 8px 24px rgba(255,140,0,0.30);
        }
        .ap1:active { transform: translateY(0) scale(1); }

        .ap2 {
          border: 2px solid #FF8C00 !important; color: #FF8C00 !important;
          border-radius: 9999px; background: transparent;
          transition: box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease;
        }
        .ap2:hover, .ap2:focus-visible {
          color: #FF8C00 !important; background: rgba(255,140,0,0.06) !important;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 0 0 4px rgba(255,140,0,0.10), 0 0 20px rgba(255,140,0,0.35), 0 6px 20px rgba(255,140,0,0.18);
        }
        .ap2:active { transform: translateY(0) scale(1); }

        .ap-img-wrap {
          position: relative; overflow: hidden;
          border: 1px solid #FFD89B; border-radius: 18px;
          width: 100%; max-width: 300px; margin: 0 auto;
          aspect-ratio: 4/5;
          box-shadow: 0 8px 32px rgba(255,140,0,0.12);
        }
        @media (min-width: 640px)  { .ap-img-wrap { max-width: 380px; } }
        @media (min-width: 1024px) { .ap-img-wrap { max-width: none; margin: 0; } }

        .ap-blockquote {
          border-left: 3px solid #FF8C00;
          padding: 16px 18px 16px 22px;
          background: rgba(255,140,0,0.04);
          border-radius: 0 12px 12px 0; margin: 0;
        }
        .ap-blockquote p {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
          font-style: italic; color: #1A1209;
          line-height: 1.78; font-weight: 400; margin: 0 0 8px;
        }
        .ap-blockquote cite {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.7rem; font-style: normal; font-weight: 700;
          color: #FF8C00; letter-spacing: 0.06em; text-transform: uppercase;
        }

        /* ── Credentials block ── */
        .ap-cred {
          background: linear-gradient(135deg, #FFFBF0 0%, #FFF7E4 100%);
          border: 1px solid rgba(255,216,155,0.65);
          border-left: 4px solid #FF8C00;
          border-radius: 0 16px 16px 0;
          padding: 20px 22px;
        }
        .ap-cred-item {
          display: flex; align-items: flex-start; gap: 10px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.85rem; color: #6B5B2E;
          line-height: 1.65; font-weight: 300;
        }
        .ap-cred-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #FF8C00; flex-shrink: 0; margin-top: 7px;
        }
      `}</style>

      <SectionWrapper variant="soft">
        {/* ── Section heading ── */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "10px" }}>
            The Raah Philosophy
          </p>
          <div style={{ width: "40px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, margin: "0 auto 18px", borderRadius: "2px" }} />
          <h2 style={{ fontFamily: PF, fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: CH, lineHeight: 1.1 }}>
            Welcome to{" "}
            <em style={{ color: OR, fontStyle: "italic" }}>Raah India</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Image column ── */}
          <div style={{ position: "relative" }} className="lg:order-last">
            <div className="ap-img-wrap">
              <Image
                src="/images/WhatsApp Image 2026-07-23 at 2.47.33 PM.jpeg"
                alt="Shobhit — Founder of Raah India Experiences"
                fill className="object-cover object-center"
                sizes="(max-width:640px) 300px, (max-width:1024px) 380px, 50vw"
              />
            </div>
            <div style={{ position:"absolute", bottom:"-14px", right:"-14px", width:"80px", height:"80px", border:"2px solid rgba(255,140,0,0.35)", borderRadius:"4px" }} className="hidden lg:block" />
            <div style={{ position:"absolute", top:"-14px", left:"-14px", width:"48px", height:"48px", border:"2px solid rgba(255,216,155,0.5)", borderRadius:"4px" }} className="hidden lg:block" />
          </div>

          {/* ── Text column ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:"22px" }}>

            {/* Founder intro */}
            <div>
              <h3 style={{ fontFamily: PF, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.2rem)", color: CH, lineHeight: 1.15, marginBottom: "6px" }}>
                Meet Shobhit
              </h3>
              <p style={{ fontFamily: IN, fontSize: "0.72rem", fontWeight: 600, color: OR, letterSpacing: "0.10em", textTransform: "uppercase" }}>
                Certified Cultural Host · Storyteller · Licensed Tour Expert
              </p>
            </div>

            {/* Narrative */}
            <div style={{ display:"flex", flexDirection:"column", gap:"14px", fontFamily: IN, fontSize:"0.95rem", color: MU, lineHeight: 1.85, fontWeight: 300 }}>
              <p>
                Shobhit grew up in Jaipur — not the postcard version, but the living, breathing city of narrow lanes, neighbourhood temples, and generations of artisans who never made it into any guidebook. He grew up walking the same streets that most visitors only photograph on their way to the next monument.
              </p>
              <p>
                After years of guiding travellers through Jaipur's celebrated forts and palaces, a quiet realisation stayed with him: people were leaving with beautiful photographs, but missing the city's soul. They were visiting Jaipur without feeling it — without hearing the temple bells at dawn, tasting chai made on a wood fire, or discovering the hidden lane where a family has made lac bangles for five generations.
              </p>
              <p>
                That realisation became Raah. Every experience is personally walked, researched, and refined. Every group is kept deliberately small — small enough for genuine conversation, not commentary. Because travel, at its best, is not a transaction. It is a connection. And Raah exists to make that connection real.
              </p>
              <p style={{ fontStyle: "italic", color: CH, fontWeight: 400 }}>
                "Travel is measured not by the monuments you visit, but by the memories and connections you take home."
              </p>
            </div>

            {/* Credentials block */}
            <div className="ap-cred">
              <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "14px" }}>
                Our Credentials &amp; Trust
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                {[
                  "Incredible India Tourist Guide (IITG) — National recognition by the Ministry of Tourism, Government of India",
                  "Incredible India Tourist Facilitator — State-level recognition by the Ministry of Tourism, Government of India",
                  "Regional Tourist Guide License for Jaipur — Issued by the State Government of Rajasthan",
                  "Spanish Language — Advanced Certified Programme, University of Salamanca, Spain",
                ].map((item, i) => (
                  <div key={i} className="ap-cred-item">
                    <div className="ap-cred-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Founder quote */}
            <blockquote className="ap-blockquote">
              <p>
                "I don't simply want you to see Jaipur — I want you to feel it. In the quiet devotion of a temple at dawn, in the warmth of a family kitchen, in the rhythm of its markets, and in the conversations that rarely appear on any itinerary. That is the Jaipur I grew up in. That is the Jaipur I invite you to discover."
              </p>
              <cite>— Shobhit, Founder · Raah India Experiences</cite>
            </blockquote>

            {/* CTAs */}
            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", paddingTop:"6px" }}>
              <Link href="/about" className="ap1"
                style={{ padding:"13px 28px", fontFamily: IN, fontSize:"0.8rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", textDecoration:"none" }}
              >
                Read Full Story
              </Link>
              <Link href="/experiences" className="ap2"
                style={{ padding:"13px 28px", fontFamily: IN, fontSize:"0.8rem", fontWeight:700, textDecoration:"none" }}
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
