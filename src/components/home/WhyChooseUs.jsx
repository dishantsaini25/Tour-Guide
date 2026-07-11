import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";

const reasons = [
  { icon: "✦", title: "Curated, Not Scripted", desc: "Every route is personally researched, walked, and refined. No two walks feel the same because no two groups of guests are the same." },
  { icon: "◈", title: "Small Groups Only", desc: "Maximum 8 guests. Meaningful travel requires space for conversation, curiosity, and genuine human connection." },
  { icon: "⟡", title: "Local Stories, Not History Books", desc: "We share the stories that live in the lanes, kitchens, and communities — not the dates and dynasties you already read online." },
  { icon: "◇", title: "Authentic Food Discoveries", desc: "From predawn street kitchens to countryside farmhouses — food is how we understand Jaipur, not just a tasting detour." },
  { icon: "◈", title: "Responsible Tourism", desc: "We support local artisans, small food vendors, and community spaces. Your journey creates genuine value for Jaipur's people." },
  { icon: "✦", title: "No Forced Shopping. Ever.", desc: "Not one stop on any Raah experience is commission-based. We guide with complete independence and honesty." },
];

export default function WhyChooseUs() {
  return (
    <>
      <style>{`
        .wcu-card { background:#FFFFFF; border:1px solid #C8D8D0; border-top:2px solid #B07D3E; padding:28px 24px; transition:box-shadow .35s,transform .35s; }
        .wcu-card:hover { box-shadow:0 8px 32px rgba(30,77,58,0.1); transform:translateY(-3px); }
      `}</style>
      <SectionWrapper variant="soft">
        <SectionHeading label="Why Walk With Raah" title="A Different Way to Travel" subtitle="We don't collect destinations. We create connections." />
        <div className="wcu-slider">
          {reasons.map((r) => (
            <div key={r.title} className="wcu-card">
              <div style={{ width: "40px", height: "40px", background: "#E8F0EC", border: "1px solid #C8D8D0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <span style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.1rem", color: "#B07D3E" }}>{r.icon}</span>
              </div>
              <div style={{ width: "28px", height: "1.5px", background: "#B07D3E", marginBottom: "14px" }} />
              <h3 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.1rem", fontWeight: 700, color: "#1A1F1C", marginBottom: "10px", lineHeight: 1.25 }}>{r.title}</h3>
              <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.875rem", color: "#4A5550", lineHeight: 1.8, fontWeight: 300 }}>{r.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "56px", paddingTop: "36px", borderTop: "1px solid #C8D8D0" }}>
          <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(1.1rem,2.2vw,1.5rem)", fontStyle: "italic", fontWeight: 400, color: "#4A5550" }}>
            "We don't just show you Jaipur.{" "}
            <em style={{ color: "#1E4D3A", fontStyle: "normal", fontWeight: 600 }}>We help you understand it.</em>"
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
