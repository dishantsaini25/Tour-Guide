import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

/* Hero image — Pexels serves resized, compressed versions via URL params,
   so mobile downloads ~100–200 KB instead of the multi-MB original. */
const HERO_BASE = "https://images.pexels.com/photos/14247658/pexels-photo-14247658.jpeg?auto=compress&cs=tinysrgb";
const HERO_SRCSET = [640, 960, 1280, 1920, 2560].map((w) => `${HERO_BASE}&w=${w} ${w}w`).join(", ");

/* Entrance animation runs in CSS (no JavaScript wait) and only moves the text —
   it never hides it — so the heading is visible on the first paint. */
const up = (delay) => ({ animationDelay: `${delay}ms` });

export default function HeroSection() {
  return (
    <>
      <style>{`
        @keyframes heroUp { from { transform: translateY(28px); } to { transform: translateY(0); } }
        @keyframes heroFadeSoft { from { opacity: 0; } to { opacity: 0.6; } }
        .hero-up { animation: heroUp 0.9s ease both; }
        .hero-scroll { opacity: 0; animation: heroFadeSoft 1s ease 1.2s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .hero-up { animation: none; }
          .hero-scroll { animation: none; opacity: 0.6; }
        }

        .h-cta1 {
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 60%, #C45E00 100%) !important;
          background-size: 200% 100% !important;
          background-position: 100% 0 !important;
          color: #FFFFFF !important;
          border-radius: 9999px !important;
          box-shadow: 0 4px 20px rgba(255,140,0,0.40);
          transition: background-position 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease !important;
        }
        .h-cta1:hover, .h-cta1:focus-visible {
          background-position: 0% 0 !important;
          color: #FFFFFF !important;
          box-shadow: 0 8px 32px rgba(255,140,0,0.55) !important;
          transform: translateY(-2px) !important;
        }
        .h-cta1:active { transform: translateY(0px) !important; }

        .h-cta2 {
          background: rgba(255,255,255,0.08) !important;
          color: #FFFFFF !important;
          border: 1.5px solid rgba(255,255,255,0.45) !important;
          border-radius: 9999px !important;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
          transition: background 0.35s ease, border-color 0.35s ease,
                      box-shadow 0.35s ease, transform 0.3s ease !important;
        }
        .h-cta2:hover, .h-cta2:focus-visible {
          background: rgba(255,255,255,0.18) !important;
          border-color: rgba(255,255,255,0.85) !important;
          color: #FFFFFF !important;
          box-shadow: 0 8px 28px rgba(0,0,0,0.22) !important;
          transform: translateY(-2px) !important;
        }
        .h-cta2:active { transform: translateY(0px) !important; }

        .h-tags {
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 44px;
        }
        @media (max-width: 480px) {
          .h-tags { gap: 12px; margin-top: 32px; }
          .h-tag-text { font-size: 0.68rem !important; }
        }

        .hero-content-pad {
          padding: clamp(56px,7vh,80px) 20px clamp(100px,12vh,130px);
        }
        @media (max-width: 767px) {
          .hero-content-pad { padding-bottom: clamp(160px, 22vh, 200px); }
        }

        .hero-bottom-overlay {
          background: linear-gradient(to top, rgba(20,10,0,0.62) 0%, transparent 60%);
        }
        @media (min-width: 768px) {
          .hero-bottom-overlay {
            background: linear-gradient(to top, rgba(20,10,0,0.55) 0%, transparent 40%);
          }
        }

        .hero-merge-fade {
          height: 220px;
          background: linear-gradient(to top, #FFFDE7 0%, rgba(255,253,231,0.85) 28%, rgba(255,253,231,0.35) 60%, transparent 100%);
        }
        @media (min-width: 768px) {
          .hero-merge-fade {
            height: 160px;
            background: linear-gradient(to top, #FFFDE7 0%, rgba(255,253,231,0.85) 30%, rgba(255,253,231,0.4) 65%, transparent 100%);
          }
        }
      `}</style>

      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "80px" }}>

        <div style={{ position: "absolute", inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${HERO_BASE}&w=1280`}
            srcSet={HERO_SRCSET}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            decoding="async"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover",
              objectPosition: "center calc(40% - 100px)",
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(20,10,0,0.78) 0%, rgba(20,10,0,0.42) 55%, rgba(20,10,0,0.2) 100%)" }} />
          <div className="hero-bottom-overlay" style={{ position: "absolute", inset: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 15% 60%, rgba(255,140,0,0.12) 0%, transparent 55%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1320px", margin: "0 auto", width: "100%" }} className="inner-pad hero-content-pad">
          <div style={{ maxWidth: "700px" }}>

            <div className="hero-up" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px", ...up(100) }}>
              <div style={{ width: "32px", height: "1px", background: "#F5A623" }} />
              <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#F5A623", fontWeight: 600 }}>
                Jaipur · Rajasthan · Curated Walking Experiences
              </span>
            </div>

            <p className="hero-up" style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700, fontSize: "clamp(2.6rem,8vw,7.5rem)", lineHeight: 1.05, color: "#FFFFFF", marginBottom: "24px", ...up(220) }}>
              Raah India<br />
              <em style={{ color: "#FF8C00", fontStyle: "italic", fontWeight: 600 }}>Experiences</em>
            </p>

            <h1 className="hero-up" style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(1.1rem,2.2vw,1.5rem)", color: "rgba(255,255,255,0.88)", lineHeight: 1.65, marginBottom: "10px", fontStyle: "italic", fontWeight: 400, ...up(360) }}>
              Curated Walking Tours &amp; Cultural Experiences in Jaipur
            </h1>
            <p className="hero-up" style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "40px", maxWidth: "540px", fontWeight: 300, ...up(440) }}>
              Walk slowly through Jaipur&apos;s stories, rituals, flavours, forts, markets, and hidden corners — with someone who calls this city home.
            </p>

            <div className="hero-up" style={{ display: "flex", flexWrap: "wrap", gap: "14px", ...up(560) }}>
              <Link href="/experiences" className="h-cta1"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  padding: "15px 34px",
                  fontFamily: "DM Sans, system-ui, sans-serif",
                  fontSize: "0.82rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Explore Experiences <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="h-cta2"
                style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "15px 34px",
                  fontFamily: "DM Sans, system-ui, sans-serif",
                  fontSize: "0.82rem", fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Book Your Experience
              </Link>
            </div>

            <div className="hidden md:flex h-tags hero-up" style={{ ...up(700) }}>
              {["Small Groups Only", "No Forced Shopping", "Local Storytelling", "Slow Travel"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#F5A623", flexShrink: 0 }} />
                  <span className="h-tag-text" style={{
                    fontFamily: "DM Sans, system-ui, sans-serif",
                    fontSize: "15px",
                    fontWeight: 900,
                    color: "#000000",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="hidden md:flex hero-scroll"
          style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", flexDirection: "column", alignItems: "center", gap: "6px" }}
        >
          <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>Scroll</span>
          <ChevronDown size={16} style={{ color: "#F5A623", animation: "bounce 2s infinite" }} />
        </div>

        <div className="hero-merge-fade" style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          pointerEvents: "none",
        }} />
      </section>
    </>
  );
}