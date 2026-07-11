"use client";
import MobileSlider from "@/components/MobileSlider";

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";
const CH = "#1A1209", MU = "#6B5B2E", OR = "#FF8C00";

const values = [
  { title:"Curated, Not Scripted",      desc:"Every experience is personally researched, walked, and refined. Our routes evolve based on the city's rhythm, not a fixed script." },
  { title:"Small Groups Only",          desc:"Maximum 8 guests. Meaningful travel requires space for conversation, curiosity, and genuine human connection." },
  { title:"No Forced Shopping. Ever.",  desc:"Not one stop on any Raah experience is commission-based. We guide with complete independence and complete honesty." },
  { title:"Responsible Tourism",        desc:"We support local artisans, small food vendors, and community spaces. Your journey creates genuine value for Jaipur's people." },
  { title:"Food as a Cultural Lens",    desc:"From predawn street kitchens to countryside farmhouses — food is how we understand Jaipur, not just a tasting detour." },
  { title:"Slow Travel Philosophy",     desc:"We move at a pace that lets you notice things — a texture, a smell, a conversation. Unhurried, observant, present." },
];

function ValueCard({ title, desc }) {
  return (
    <div className="vc">
      <div style={{ width:"28px", height:"2px", background:OR, borderRadius:"2px", marginBottom:"14px" }} />
      <h3 style={{ fontFamily:PF, fontSize:"1.15rem", fontWeight:700, color:CH, marginBottom:"10px", lineHeight:1.25 }}>{title}</h3>
      <p  style={{ fontFamily:IN, fontSize:"0.875rem", color:MU, lineHeight:1.82, fontWeight:300 }}>{desc}</p>
    </div>
  );
}

/**
 * AboutValuesSlider
 * Renders the "Why Walk With Us" grid on desktop and a MobileSlider on mobile.
 * Extracted into a client component so the parent page.jsx can stay a Server
 * Component and safely export `metadata`.
 */
export default function AboutValuesSlider() {
  return (
    <>
      {/* Desktop grid */}
      <div className="vc-grid">
        {values.map(v => <ValueCard key={v.title} {...v} />)}
      </div>

      {/* Mobile auto-slider */}
      <div className="vc-slider-mobile">
        <MobileSlider autoPlay interval={3800} ariaLabel="Why walk with Raah — values">
          {values.map(v => <ValueCard key={v.title} {...v} />)}
        </MobileSlider>
      </div>
    </>
  );
}
