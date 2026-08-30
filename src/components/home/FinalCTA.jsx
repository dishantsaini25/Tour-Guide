"use client";
import Link from "next/link";
import ContinuousCounter from "@/components/ContinuousCounter";

export default function FinalCTA() {
  return (
    <>
      <style>{`
        /* Primary pill — solid gradient, glow on hover */
        .fc1 {
          color: #FFFFFF !important;
          border-radius: 9999px;
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 55%, #C45E00 100%);
          box-shadow: 0 4px 20px rgba(255,140,0,0.38);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .fc1:hover, .fc1:focus-visible {
          color: #FFFFFF !important;
          transform: translateY(-2px) scale(1.04);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.15),
            0 0 24px rgba(255,140,0,0.52),
            0 10px 28px rgba(255,140,0,0.34);
        }
        .fc1:active { transform: translateY(0) scale(1); }

        /* Secondary pill — frosted glass outline */
        .fc2 {
          color: #FFFFFF !important;
          border-radius: 9999px;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.45);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
          transition: background 0.3s ease, border-color 0.3s ease,
                      box-shadow 0.3s ease, transform 0.3s ease;
        }
        .fc2:hover, .fc2:focus-visible {
          color: #FFFFFF !important;
          background: rgba(255,255,255,0.16) !important;
          border-color: rgba(255,255,255,0.82) !important;
          box-shadow: 0 8px 26px rgba(0,0,0,0.22) !important;
          transform: translateY(-2px);
        }
        .fc2:active { transform: translateY(0); }

        /* ── Endless Counter Block ── */
        .fc-endless-wrap {
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* The big number */
        .fc-endless-num {
          font-family: Fraunces, Georgia, serif;
          font-size: clamp(5rem, 14vw, 10rem);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.04em;
          /* Gradient text — orange to gold */
          background: linear-gradient(135deg, #FF8C00 0%, #F5A623 60%, #FFD47A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          /* Subtle glow */
          filter: drop-shadow(0 0 24px rgba(255,140,0,0.35));
          user-select: none;
        }

        /* The thin separator line */
        .fc-endless-rule {
          width: 60px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(245,166,35,0.55), transparent);
          margin: 14px auto;
        }

        /* "Endless Ways to Discover Jaipur" label */
        .fc-endless-label {
          font-family: DM Sans, system-ui, sans-serif;
          font-size: clamp(0.7rem, 1.4vw, 0.82rem);
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,253,231,0.55);
        }
      `}</style>

      <section style={{ position: "relative", padding: "110px 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=85')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,10,0,0.82)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(255,140,0,0.18) 0%, transparent 65%)" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: "720px", margin: "0 auto", padding: "0 20px", textAlign: "center" }}>

          {/* ── Continuous Counter ── */}
          <div className="fc-endless-wrap">
            <div className="fc-endless-num">
              <ContinuousCounter cycleDuration={5000} padded={true} />
            </div>
            <div className="fc-endless-rule" />
            <p className="fc-endless-label">Endless Ways to Discover Jaipur</p>
          </div>

          <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#F5A623", fontWeight: 700, marginBottom: "18px" }}>
            Start Your Journey
          </p>
          <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700, fontSize: "clamp(2.6rem,5.5vw,4.5rem)", lineHeight: 1.05, color: "#FFFFFF", marginBottom: "20px" }}>
            Ready to Experience<br />
            <em style={{ color: "#FF8C00", fontStyle: "italic" }}>Jaipur Differently?</em>
          </h2>
          <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "40px", fontWeight: 300 }}>
            We don't just show you Jaipur. We help you understand it. Every experience is small, curated, and personally led.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
            <Link href="/contact" className="fc1" style={{ display: "inline-flex", alignItems: "center", padding: "15px 36px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              Book Your Experience
            </Link>
            <Link href="/experiences" className="fc2" style={{ display: "inline-flex", alignItems: "center", padding: "15px 36px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}>
              Browse Experiences
            </Link>
          </div>
          <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1rem", fontStyle: "italic", color: "rgba(255,255,255,0.3)", marginTop: "36px" }}>
            "Because the most meaningful souvenirs are the stories you carry home."
          </p>
        </div>
      </section>
    </>
  );
}
