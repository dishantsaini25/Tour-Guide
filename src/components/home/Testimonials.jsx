"use client";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Laurent",
    location: "Paris, France",
    experience: "The Blue Hour — Jaipur",
    text: "The open jeep drive as Jaipur lit up around us was one of the most cinematic travel experiences I've ever had. Our host's stories made the city feel alive in a way no guidebook ever could.",
  },
  {
    name: "Ananya & Rohan",
    location: "Mumbai, India",
    experience: "Jaipur at Dawn",
    text: "We've been to Jaipur four times. This morning walk felt like visiting for the first time. The flower market, the temple, the breakfast — everything was perfectly paced and deeply human.",
  },
  {
    name: "Marcus Chen",
    location: "Singapore",
    experience: "Jaipur Beyond Pink",
    text: "Exactly the kind of travel I crave — slow, curious, and full of nuance. The evening walk showed me a Jaipur I had no idea existed. I came back the next evening just to walk those lanes again.",
  },
];

export default function Testimonials() {
  return (
    <SectionWrapper variant="indigo">
      <SectionHeading label="Guest Stories" title="What Travellers Say" subtitle="Every experience is memorable. Here's how guests describe theirs." dark />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex flex-col p-8 transition-colors duration-300"
            style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(201,148,58,0.25)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, j) => <Star key={j} size={13} style={{ color: "#c9943a", fill: "#c9943a" }} />)}
            </div>
            {/* Quote mark */}
            <div style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "4rem", lineHeight: 0.7, color: "rgba(201,148,58,0.2)", marginBottom: "8px" }}>"</div>
            <p style={{ color: "rgba(255,255,255,0.68)", fontSize: "0.9rem", lineHeight: 1.8, flex: 1, fontStyle: "italic" }}>
              {t.text}
            </p>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px", marginTop: "20px" }}>
              <p style={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>{t.name}</p>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.75rem", marginTop: "2px" }}>{t.location}</p>
              <p style={{ color: "#c9943a", fontSize: "0.72rem", fontWeight: 600, marginTop: "6px", letterSpacing: "0.04em" }}>{t.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
