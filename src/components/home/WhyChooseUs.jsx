"use client";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";

const reasons = [
  {
    num: "01",
    title: "Local Storytelling",
    desc: "Every lane, every monument, every ritual comes alive through stories from someone who grew up here — not a scripted tour script.",
  },
  {
    num: "02",
    title: "Slow Travel Philosophy",
    desc: "We pause. We linger. We watch. There's no checklist — only moments worth remembering.",
  },
  {
    num: "03",
    title: "Small Groups Only",
    desc: "Maximum 6 guests per experience — ensuring an intimate, unhurried atmosphere where every question is welcomed.",
  },
  {
    num: "04",
    title: "Authentic Food & Culture",
    desc: "From predawn street kitchens to family-run chai stalls — food is a lens for understanding Jaipur, not just a tasting detour.",
  },
];

export default function WhyChooseUs() {
  return (
    <SectionWrapper variant="indigo">
      <SectionHeading
        label="Why Travel With Us"
        title="A Different Kind of Jaipur"
        subtitle="Most tours show you Jaipur. We take you into it."
        dark
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r) => (
          <div
            key={r.num}
            className="p-7 group transition-all duration-300"
            style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,148,58,0.3)"; e.currentTarget.style.background = "rgba(201,148,58,0.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
          >
            <div style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "2.5rem", fontWeight: 600, color: "rgba(201,148,58,0.25)", lineHeight: 1, marginBottom: "16px" }}>
              {r.num}
            </div>
            <h3 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.25rem", fontWeight: 600, color: "white", marginBottom: "10px" }}>
              {r.title}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: "0.875rem", lineHeight: 1.75 }}>
              {r.desc}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
