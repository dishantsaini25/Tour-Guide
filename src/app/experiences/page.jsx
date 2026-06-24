"use client";

import { useState } from "react";
import { experiences } from "@/data/experiences";
import ExperienceCard from "@/components/ExperienceCard";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";

const allFilters = ["All", "Morning", "Evening", "Night", "Heritage", "Food", "Scenic"];

export default function ExperiencesPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? experiences
    : experiences.filter((e) => e.filters.includes(active));

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{
          minHeight: "60vh",
          backgroundImage: "url('https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1600&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(30,27,58,0.78)" }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-16 pt-36">
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#c9943a", marginBottom: "12px" }}>
            All Experiences
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 600,
              color: "white",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Curated Jaipur{" "}
            <span style={{ color: "#c9943a", fontStyle: "italic" }}>Experiences</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", maxWidth: "540px", lineHeight: 1.7 }}>
            Three distinct ways to experience the Pink City — morning, evening, or night.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top, #fdf6ed, transparent)" }} />
      </section>

      <SectionWrapper variant="parchment">
        {/* ── Filters ── */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-14">
          {allFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="px-5 py-2 text-xs font-semibold transition-all duration-200"
              style={{
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "1.5px solid",
                borderColor: active === f ? "#1e1b3a" : "#c8a882",
                background: active === f ? "#1e1b3a" : "transparent",
                color: active === f ? "white" : "#4a4458",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Cards ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((exp) => <ExperienceCard key={exp.slug} experience={exp} />)}
          </div>
        ) : (
          <div className="text-center py-16">
            <p style={{ color: "#4a4458", fontSize: "1.1rem" }}>No experiences match this filter.</p>
            <button onClick={() => setActive("All")} style={{ color: "#c9943a", marginTop: "12px", fontSize: "0.875rem", textDecoration: "underline" }}>
              Show all
            </button>
          </div>
        )}
      </SectionWrapper>

      {/* ── Custom CTA ── */}
      <div style={{ background: "#1e1b3a" }}>
        <div className="max-w-3xl mx-auto px-5 py-16 text-center">
          <h2 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "2.2rem", fontWeight: 600, color: "white", marginBottom: "12px" }}>
            Want a custom experience?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: "28px" }}>
            Have something specific in mind? Get in touch and we'll craft a personalised Jaipur experience.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 text-sm font-semibold transition-all duration-200"
            style={{ background: "#c9943a", color: "#1e1b3a", letterSpacing: "0.04em" }}
            onMouseEnter={e => e.currentTarget.style.background = "#e2b86a"}
            onMouseLeave={e => e.currentTarget.style.background = "#c9943a"}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </>
  );
}
