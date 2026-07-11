"use client";
import { useState } from "react";
import { experiences, combos } from "@/data/experiences";
import ExperienceCard from "@/components/ExperienceCard";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

const filters = ["All","Morning","Evening","Night","Heritage","Food","Rural","Culture","Hiking"];

export default function ExperiencesPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? experiences : experiences.filter(e => e.filters.includes(active));

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "55vh", display: "flex", alignItems: "flex-end", backgroundImage: "url('https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1600&q=85')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,25,16,0.8)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "160px 20px 64px", width: "100%" }}>
          <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#B07D3E", fontWeight: 700, marginBottom: "12px" }}>All Experiences</p>
          <h1 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(2.8rem,6vw,5.5rem)", fontWeight: 700, color: "#F0EDE8", lineHeight: 1.08, marginBottom: "14px" }}>
            Every Walk Answers<br /><em style={{ color: "#B07D3E", fontStyle: "italic" }}>a Question</em>
          </h1>
          <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: "rgba(240,237,232,0.6)", fontSize: "1.05rem", maxWidth: "520px", lineHeight: 1.7, fontWeight: 300 }}>
            Seven curated experiences — each one designed to reveal a different layer of Jaipur.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top, #F2F0EC, transparent)" }} />
      </section>

      <SectionWrapper variant="main">
        <div className="filters-bar" style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "52px" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)}
              style={{ padding: "8px 20px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", border: "1.5px solid", borderColor: active === f ? "#1E4D3A" : "#C8D8D0", background: active === f ? "#1E4D3A" : "transparent", color: active === f ? "#F0EDE8" : "#4A5550", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}
            >{f}</button>
          ))}
        </div>
        {filtered.length > 0 ? (
          <div className="exp-cards-slider">
            {filtered.map(exp => <ExperienceCard key={exp.slug} experience={exp} />)}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: "#4A5550", fontSize: "1.1rem" }}>No experiences match this filter.</p>
            <button onClick={() => setActive("All")} style={{ marginTop: "12px", color: "#B07D3E", background: "none", border: "none", cursor: "pointer", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.875rem", textDecoration: "underline" }}>Show all</button>
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper variant="soft">
        <SectionHeading label="Curated Combinations" title="Two Experiences, One Extraordinary Day" subtitle="Our most popular pairings — crafted for travellers who want to go deeper." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {combos.map((c, i) => (
            <div key={i} style={{ padding: "28px", border: "1px solid #C8D8D0", background: "#FFFFFF" }}>
              <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#B07D3E", fontWeight: 700 }}>{c.tag}</span>
              <h3 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#1A1F1C", lineHeight: 1.2, margin: "10px 0" }}>{c.title}</h3>
              <div style={{ width: "28px", height: "1.5px", background: "#B07D3E", marginBottom: "12px" }} />
              <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.875rem", color: "#4A5550", lineHeight: 1.75, marginBottom: "20px", fontWeight: 300 }}>{c.description}</p>
              <Link href="/contact" style={{ display: "inline-block", background: "#1E4D3A", color: "#F0EDE8", padding: "10px 20px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", textDecoration: "none" }} className="combo-btn">Enquire About This Combo</Link>
            </div>
          ))}
        </div>
        <style>{`.combo-btn:hover{background:#163529!important;}`}</style>
      </SectionWrapper>

      <div style={{ background: "#1A1F1C", padding: "64px 20px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "2.2rem", fontWeight: 700, color: "#F0EDE8", marginBottom: "12px" }}>Looking for something bespoke?</h2>
        <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: "rgba(240,237,232,0.5)", marginBottom: "28px", maxWidth: "480px", margin: "0 auto 28px", lineHeight: 1.7, fontSize: "0.95rem", fontWeight: 300 }}>
          We craft private and fully customised experiences for individual travellers, families, and boutique groups.
        </p>
        <Link href="/contact" style={{ display: "inline-block", background: "#1E4D3A", color: "#F0EDE8", padding: "14px 32px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }} className="bespoke-btn">Get in Touch</Link>
        <style>{`.bespoke-btn:hover{background:#163529!important;}`}</style>
      </div>
    </>
  );
}
