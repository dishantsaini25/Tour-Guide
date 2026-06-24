"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Background: Hawa Mahal / Pink City ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1800&q=90')",
        }}
      />

      {/* ── Layered overlays for cinematic depth ── */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(30,27,58,0.62) 0%, rgba(30,27,58,0.45) 40%, rgba(30,27,58,0.82) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(30,27,58,0.55) 0%, transparent 60%)" }} />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-24">
        <div className="max-w-3xl">

          {/* Location badge */}
          <div
            className={`flex items-center gap-2 mb-7 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <MapPin size={13} style={{ color: "#c9943a" }} />
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#c9943a" }}>
              Jaipur, Rajasthan &nbsp;·&nbsp; Pink City
            </span>
          </div>

          {/* Main heading */}
          <h1
            className={`text-white leading-none mb-6 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
              fontWeight: 600,
              transitionDelay: "220ms",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            See Jaipur
            <br />
            <span style={{ color: "#c9943a", fontStyle: "italic" }}>Like a Local</span>
          </h1>

          {/* Subline */}
          <p
            className={`mb-10 max-w-xl transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "1.15rem",
              lineHeight: 1.75,
              transitionDelay: "360ms",
            }}
          >
            Boutique sunset jeep rides, evening bazaar walks, and dawn
            explorations of the Pink City — crafted by a local storyteller for
            travellers who want more than monuments.
          </p>

          {/* CTA row */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            style={{ transitionDelay: "480ms" }}
          >
            <Link
              href="/experiences"
              className="group flex items-center gap-2.5 px-7 py-4 text-sm font-semibold transition-all duration-200"
              style={{ background: "#c9943a", color: "#1e1b3a", letterSpacing: "0.04em" }}
              onMouseEnter={e => e.currentTarget.style.background = "#e2b86a"}
              onMouseLeave={e => e.currentTarget.style.background = "#c9943a"}
            >
              Explore Experiences
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-7 py-4 text-sm font-semibold transition-all duration-200"
              style={{ border: "1.5px solid rgba(255,255,255,0.55)", color: "rgba(255,255,255,0.9)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)"; e.currentTarget.style.background = "transparent"; }}
            >
              Book an Enquiry
            </Link>
          </div>

          {/* Trust row */}
          <div
            className={`flex flex-wrap gap-6 mt-12 transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "640ms" }}
          >
            {["Small Groups Only", "Local Storyteller", "10+ Years Experience"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#c9943a" }} />
                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.75rem", letterSpacing: "0.04em" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom fade to parchment ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to top, #fdf6ed, transparent)" }}
      />
    </section>
  );
}
