"use client";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import MobileSlider from "@/components/MobileSlider";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Laurent",
    from: "Paris, France",
    exp: "Jaipur at Dawn",
    initials: "SL",
    text: "The morning walk was one of the most memorable experiences of my entire India trip. The flower market, the temple, the breakfast — perfectly paced. I felt like I was living inside the city, not visiting it.",
  },
  {
    name: "Ananya & Rohan Sharma",
    from: "Mumbai, India",
    exp: "The Blue Hour",
    initials: "AR",
    text: "We've been to Jaipur four times. The Blue Hour showed us a city we didn't know existed. Watching the forts light up from Nahargarh in an open jeep — that image will stay with us forever.",
  },
  {
    name: "Marcus Chen",
    from: "Singapore",
    exp: "Beyond the Pink",
    initials: "MC",
    text: "The evening food walk was extraordinary — not just for the food, but for the stories. Our guide knew every lane, every vendor, every tradition. I came back the next evening just to walk those alleys again.",
  },
];

function TestimonialCard({ t }) {
  return (
    <div className="tc-card">
      {/* Stars */}
      <div style={{ display: "flex", gap: "3px", marginBottom: "18px" }}>
        {[...Array(5)].map((_, j) => (
          <Star key={j} size={14} style={{ color: "#F5A623", fill: "#F5A623" }} />
        ))}
      </div>

      {/* Large open-quote */}
      <div style={{
        fontFamily: "Fraunces, Georgia, serif",
        fontSize: "4rem",
        color: "rgba(255,140,0,0.18)",
        lineHeight: 0.6,
        marginBottom: "14px",
        userSelect: "none",
      }}>"</div>

      {/* Review text */}
      <p style={{
        fontFamily: "Fraunces, Georgia, serif",
        fontSize: "0.97rem",
        fontStyle: "italic",
        color: "#3D2E0E",
        lineHeight: 1.88,
        flex: 1,
        marginBottom: "24px",
      }}>{t.text}</p>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,216,155,0.6)", marginBottom: "18px" }} />

      {/* Attribution row */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Avatar initials */}
        <div style={{
          width: "40px", height: "40px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #FFE8B0 0%, #FFD47A 100%)",
          border: "1.5px solid rgba(255,216,155,0.8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#C45E00",
          }}>{t.initials}</span>
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.88rem", fontWeight: 600, color: "#1A1209", marginBottom: "1px" }}>{t.name}</p>
          <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.7rem", color: "#9C8550", fontWeight: 300 }}>{t.from}</p>
        </div>

        {/* Experience badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: "5px",
          background: "rgba(255,140,0,0.08)",
          border: "1px solid rgba(255,140,0,0.2)",
          borderRadius: "9999px",
          padding: "4px 10px",
        }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FF8C00", flexShrink: 0 }} />
          <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.6rem", fontWeight: 700, color: "#FF8C00", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{t.exp}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <>
      <style>{`
        /* ── Testimonial card — warm parchment background ── */
        .tc-card {
          background: linear-gradient(145deg, #FFFBF0 0%, #FFF7E4 100%);
          border: 1px solid rgba(255,216,155,0.55);
          border-radius: 22px;
          padding: 30px 28px 28px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 14px rgba(255,140,0,0.07), 0 1px 3px rgba(0,0,0,0.04);
          transition: box-shadow 0.38s ease, transform 0.38s ease;
          height: 100%;
        }
        .tc-card:hover {
          box-shadow: 0 12px 38px rgba(255,140,0,0.14), 0 2px 8px rgba(0,0,0,0.05);
          transform: translateY(-4px);
        }

        /* Desktop 3-col grid */
        .tc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1023px) { .tc-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 767px)  { .tc-grid { display: none; } }

        .tc-slider-mobile { display: none; }
        @media (max-width: 767px) { .tc-slider-mobile { display: block; } }
      `}</style>

      <SectionWrapper variant="soft">
        <SectionHeading
          label="Guest Stories"
          title="What Our Guests Say"
          subtitle="The most meaningful souvenirs are the stories you carry home."
        />

        {/* Desktop grid */}
        <div className="tc-grid">
          {testimonials.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>

        {/* Mobile auto-slider */}
        <div className="tc-slider-mobile">
          <MobileSlider autoPlay interval={4000} ariaLabel="Guest testimonials">
            {testimonials.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </MobileSlider>
        </div>
      </SectionWrapper>
    </>
  );
}
