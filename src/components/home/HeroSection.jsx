"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 120); return () => clearTimeout(t); }, []);

  const anim = (d) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.9s ease ${d}ms, transform 0.9s ease ${d}ms`,
  });

  return (
    <>
      <style>{`
        .h-cta1 { transition: background 0.25s, transform 0.2s; }
        .h-cta1:hover { background: #163529 !important; transform: translateY(-1px); }
        .h-cta2 { transition: all 0.25s; }
        .h-cta2:hover { background: rgba(240,237,232,0.1) !important; border-color: rgba(240,237,232,0.8) !important; }
      `}</style>
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1920&q=90')", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(10,25,16,0.82) 0%, rgba(10,25,16,0.45) 55%, rgba(10,25,16,0.22) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,25,16,0.85) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 15% 60%, rgba(30,77,58,0.2) 0%, transparent 55%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1320px", margin: "0 auto", padding: "clamp(100px,14vh,140px) 20px clamp(60px,8vh,90px)", width: "100%" }} className="inner-pad">
          <div style={{ maxWidth: "700px" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px", ...anim(100) }}>
              <div style={{ width: "32px", height: "1px", background: "#B07D3E" }} />
              <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B07D3E", fontWeight: 600 }}>
                Jaipur · Rajasthan · Curated Walking Experiences
              </span>
            </div>

            <h1 style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700, fontSize: "clamp(3.6rem,8vw,7.5rem)", lineHeight: 1.0, color: "#F0EDE8", marginBottom: "24px", ...anim(220) }}>
              Raah India<br />
              <em style={{ color: "#B07D3E", fontStyle: "italic", fontWeight: 600 }}>Experiences</em>
            </h1>

            <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(1.1rem,2.2vw,1.5rem)", color: "rgba(240,237,232,0.8)", lineHeight: 1.65, marginBottom: "10px", fontStyle: "italic", fontWeight: 400, ...anim(360) }}>
              Curated Walking Tours & Cultural Experiences in Jaipur
            </p>
            <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "1rem", color: "rgba(240,237,232,0.55)", lineHeight: 1.75, marginBottom: "40px", maxWidth: "540px", fontWeight: 300, ...anim(440) }}>
              Walk slowly through Jaipur's stories, rituals, flavours, forts, markets, and hidden corners — with someone who calls this city home.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", ...anim(560) }}>
              <Link href="/experiences" className="h-cta1"
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#1E4D3A", color: "#F0EDE8", padding: "15px 32px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", boxShadow: "0 4px 20px rgba(30,77,58,0.4)" }}
              >Explore Experiences <ArrowRight size={15} /></Link>
              <Link href="/contact" className="h-cta2"
                style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid rgba(240,237,232,0.45)", color: "rgba(240,237,232,0.9)", padding: "15px 32px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}
              >Book Your Experience</Link>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginTop: "52px", ...anim(700) }}>
              {["Small Groups Only", "No Forced Shopping", "Local Storytelling", "Slow Travel"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#B07D3E" }} />
                  <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.72rem", color: "rgba(240,237,232,0.48)", letterSpacing: "0.06em" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", opacity: vis ? 0.5 : 0, transition: "opacity 1s ease 1.2s" }}>
          <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(240,237,232,0.6)" }}>Scroll</span>
          <ChevronDown size={16} style={{ color: "#B07D3E", animation: "bounce 2s infinite" }} />
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, #F2F0EC, transparent)", pointerEvents: "none" }} />
      </section>
    </>
  );
}
