import Image from "next/image";
import Link from "next/link";
import AboutValuesSlider from "./AboutClient";

export const metadata = {
  title: "About & Philosophy",
  description: "The story behind Raah India Experiences.",
};

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";
const CH = "#1A1209", MU = "#6B5B2E", OR = "#FF8C00", GO = "#F5A623";
const RULE = { width: "36px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, margin: "10px 0 20px" };
const RULE_C = { width: "36px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, margin: "10px auto 20px" };
const LABEL = { fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: OR };

export default function AboutPage() {
  return (
    <>
      <style>{`
        /* ── Primary button — pill, gradient, glow-only hover ── */
        .ab1 {
          background: linear-gradient(135deg,#FF8C00 0%,#E07800 55%,#C45E00 100%);
          color: #FFFFFF !important;
          border-radius: 9999px;
          box-shadow: 0 3px 14px rgba(255,140,0,0.28);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .ab1:hover, .ab1:focus-visible {
          color: #FFFFFF !important;
          transform: translateY(-2px) scale(1.03);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.13),
            0 0 22px rgba(255,140,0,0.48),
            0 8px 24px rgba(255,140,0,0.28);
        }
        .ab1:active { transform: translateY(0) scale(1); }

        /* ── Secondary button — pill, outline, glow-only hover ── */
        .ab2 {
          border: 2px solid #FF8C00 !important;
          color: #FF8C00 !important;
          border-radius: 9999px;
          background: transparent;
          transition: box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease;
        }
        .ab2:hover, .ab2:focus-visible {
          color: #FF8C00 !important;
          background: rgba(255,140,0,0.06) !important;
          transform: translateY(-2px) scale(1.03);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.10),
            0 0 20px rgba(255,140,0,0.35),
            0 6px 20px rgba(255,140,0,0.16);
        }
        .ab2:active { transform: translateY(0) scale(1); }

        /* ── Value cards ── */
        .vc {
          background: linear-gradient(145deg,#FFFBF0 0%,#FFF7E4 100%);
          border: 1px solid rgba(255,216,155,0.55);
          border-radius: 20px;
          padding: 26px 24px 28px;
          box-shadow: 0 2px 12px rgba(255,140,0,0.06);
          transition: box-shadow 0.38s ease, transform 0.38s ease, border-color 0.38s ease;
          height: 100%;
        }
        .vc:hover {
          box-shadow: 0 12px 36px rgba(255,140,0,0.13), 0 2px 8px rgba(0,0,0,0.04);
          transform: translateY(-4px);
          border-color: rgba(255,140,0,0.30);
        }

        /* ── Value cards desktop grid ── */
        .vc-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 20px;
        }
        @media (max-width:1023px) { .vc-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width:767px)  { .vc-grid { display: none; } }

        /* ── Value cards mobile slider ── */
        .vc-slider-mobile { display: none; }
        @media (max-width:767px) { .vc-slider-mobile { display: block; } }

        /* ── About images — responsive sizing ── */
        .ab-img-wrap {
          position: relative;
          overflow: hidden;
          border: 1px solid #FFD89B;
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
        }
        .ab-img-wrap-43 { aspect-ratio: 4/5; }
        .ab-img-wrap-34 { aspect-ratio: 3/4; }
        @media (min-width:640px)  { .ab-img-wrap { max-width: 380px; } }
        @media (min-width:1024px) { .ab-img-wrap { max-width: none; margin: 0; } }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "58vh", display: "flex", alignItems: "flex-end", backgroundImage: "url('/images/8c213b3328e704cdcb7aca874adfe1c1.jpg')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,rgba(20,10,0,0.75) 0%,rgba(20,10,0,0.38) 55%,rgba(20,10,0,0.15) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(20,10,0,0.82) 0%,transparent 55%)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1320px", margin: "0 auto", padding: "160px 20px 64px", width: "100%" }}>
          <p style={{ ...LABEL, marginBottom: "12px" }}>The Story Behind Raah</p>
          <h1 style={{ fontFamily: PF, fontWeight: 700, fontSize: "clamp(2.8rem,6vw,5rem)", color: "#FFFFFF", lineHeight: 1.08 }}>
            We Don't Just Show You Jaipur.<br />
            <em style={{ color: OR, fontStyle: "italic" }}>We Help You Understand It.</em>
          </h1>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top,#FFFFFF,transparent)" }} />
      </section>

      {/* ── Philosophy ── */}
      <section style={{ background: "#FFFFFF", padding: "88px 0" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 20px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image 1 — elephant ride at Amer Fort
                • mobile: renders first → appears ABOVE the text
                • desktop: lg:order-last pushes it to the right column visually */}
            <div style={{ position: "relative" }} className="lg:order-last">
              <div className="ab-img-wrap ab-img-wrap-43">
                <Image
                  src="/images/60ab29a94b1a370d8d8b9c37bd03be6c.jpg"
                  alt="Elephant ride at Amer Fort, Jaipur"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 300px,(max-width:1024px) 380px,50vw"
                />
              </div>
              <div style={{ position: "absolute", bottom: "-12px", right: "-12px", width: "90px", height: "90px", border: "2px solid rgba(255,140,0,0.35)" }} className="hidden lg:block" />
            </div>

            {/* Text column — rendered second in JSX, but first visually on desktop */}
            <div>
              <p style={LABEL}>Our Philosophy</p>
              <div style={RULE} />
              <h2 style={{ fontFamily: PF, fontWeight: 700, fontSize: "clamp(2rem,3.5vw,3rem)", color: CH, lineHeight: 1.1, marginBottom: "22px" }}>
                Travel is Not Measured by Monuments Visited.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontFamily: IN, fontSize: "0.95rem", color: MU, lineHeight: 1.85, fontWeight: 300 }}>
                <p>At Raah India Experiences, we believe the most meaningful journeys aren't defined by the number of places you visit, but by the memories, connections, and stories you carry home.</p>
                <p>In a world where travel is often rushed and destinations become checklists, we choose a slower, more thoughtful way to explore. One that encourages curiosity, genuine conversations, and a deeper understanding of the places and people around you.</p>
                <p>Jaipur is far more than its iconic forts and palaces. Its true spirit lives in the fragrance of fresh flowers at sunrise, the sound of temple bells echoing through old streets, the warmth of local markets, the artistry of skilled craftsmen, and recipes lovingly passed down through generations.</p>
                <p>Every experience we create is designed to uncover these hidden layers of the city. Through immersive walks, authentic local encounters, and carefully curated moments, we invite you to experience India not as a tourist, but as a welcomed guest.</p>
                <blockquote style={{ fontFamily: PF, fontSize: "1.1rem", fontStyle: "italic", color: CH, borderLeft: `3px solid ${OR}`, paddingLeft: "18px", fontWeight: 400 }}>
                  "We don't simply show places. We reveal stories. <br />
                  We don't collect destinations. We create connections."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Curator ── */}
      <section style={{ background: "#FFFDE7", padding: "88px 0" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 20px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image 2 — curator / Jaipur */}
            <div style={{ position: "relative" }}>
              <div className="ab-img-wrap ab-img-wrap-34">
                <Image
                  src="/images/5390f68bd69ae1bc28bae879c2af17d7.jpg"
                  alt="Jaipur — home of the curator"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 300px,(max-width:1024px) 380px,50vw"
                />
              </div>
              <div style={{ position: "absolute", top: "-12px", left: "-12px", width: "80px", height: "80px", border: "2px solid rgba(255,140,0,0.25)" }} className="hidden lg:block" />
            </div>

            <div>
              <p style={LABEL}>About the Curator</p>
              <div style={RULE} />
              <h2 style={{ fontFamily: PF, fontWeight: 700, fontSize: "clamp(2rem,3.5vw,3rem)", color: CH, lineHeight: 1.1, marginBottom: "22px" }}>
                Every Meaningful Journey<br />
                <em style={{ color: OR, fontStyle: "italic" }}>Begins With a Question.</em>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontFamily: IN, fontSize: "0.95rem", color: MU, lineHeight: 1.85, fontWeight: 300, marginBottom: "30px" }}>
                <p style={{fontWeight: "bold"}}>Mine began while guiding travellers through Jaipur.</p>
                <p>For years, I watched visitors leave with stunning photographs of forts and palaces, yet many never experienced the Jaipur that locals truly know and love. One guest summed it up perfectly:</p>
                <blockquote style={{ fontFamily: PF, fontSize: "1.05rem", fontStyle: "italic", color: CH, borderLeft: `3px solid ${OR}`, paddingLeft: "18px", fontWeight: 400 }}>
                  "The monuments were beautiful, but I wish I had met the people who give this city its soul."
                </blockquote>
                <p>That single thought became the inspiration behind Raah India Experience</p>
                <p>Every experience is personally curated to go beyond the landmarks—introducing you to local traditions, hidden streets, authentic flavours, and the stories that bring Jaipur to life.</p>
                <p>As your curator, my goal is simple: to help you experience India not as a tourist, but as a welcomed guest.</p>
                <p style={{ fontWeight: 500, color: CH }}>Welcome to the Jaipur I proudly call home.</p>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/experiences" className="ab1" style={{ padding: "13px 28px", fontFamily: IN, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                  Explore Experiences
                </Link>
                <Link href="/contact" className="ab2" style={{ padding: "13px 28px", fontFamily: IN, fontSize: "0.8rem", fontWeight: 700, textDecoration: "none" }}>
                  Book an Experience
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Walk With Us ── */}
      <section style={{ background: "#FFFFFF", padding: "88px 0" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={LABEL}>Why Choose Raah</p>
            <div style={RULE_C} />
            <h2 style={{ fontFamily: PF, fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: CH, marginBottom: "12px" }}>Why Walk With Us</h2>
            <p style={{ fontFamily: IN, color: MU, fontSize: "1rem", maxWidth: "520px", margin: "0 auto", lineHeight: 1.75, fontWeight: 300 }}>
              Walking is the slowest way to travel — and often the most rewarding.
            </p>
          </div>

          {/* Grid (desktop) + MobileSlider (mobile) — rendered by client component */}
          <AboutValuesSlider />
        </div>
      </section>

      {/* ── Signature quote ── */}
      <section style={{ background: "#FFFDE7", borderTop: "1px solid #FFD89B", borderBottom: "1px solid #FFD89B", padding: "44px 20px", textAlign: "center" }}>
        <p style={{ fontFamily: PF, fontSize: "clamp(1.1rem,2.2vw,1.5rem)", fontStyle: "italic", fontWeight: 400, color: MU }}>
          "Because the most meaningful souvenirs are never things you buy —{" "}
          <em style={{ color: OR, fontStyle: "normal", fontWeight: 600 }}>they are the stories you carry home.</em>"
        </p>
      </section>
    </>
  );
}
