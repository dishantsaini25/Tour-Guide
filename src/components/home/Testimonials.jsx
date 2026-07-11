import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Sophie Laurent", from: "Paris, France", exp: "Jaipur at Dawn", text: "The morning walk was one of the most memorable experiences of my entire India trip. The flower market, the temple, the breakfast — perfectly paced. I felt like I was living inside the city, not visiting it." },
  { name: "Ananya & Rohan Sharma", from: "Mumbai, India", exp: "The Blue Hour", text: "We've been to Jaipur four times. The Blue Hour showed us a city we didn't know existed. Watching the forts light up from Nahargarh in an open jeep — that image will stay with us forever." },
  { name: "Marcus Chen", from: "Singapore", exp: "Beyond the Pink", text: "The evening food walk was extraordinary — not just for the food, but for the stories. Our guide knew every lane, every vendor, every tradition. I came back the next evening just to walk those alleys again." },
];

export default function Testimonials() {
  return (
    <>
      <style>{`
        .tc { background:#FFFFFF; border:1px solid #C8D8D0; transition:box-shadow .35s,transform .35s; }
        .tc:hover { box-shadow:0 10px 36px rgba(30,77,58,0.1); transform:translateY(-3px); }
      `}</style>
      <SectionWrapper variant="main">
        <SectionHeading label="Guest Stories" title="What Our Guests Say" subtitle="The most meaningful souvenirs are the stories you carry home." />
        <div className="tc-slider">
          {testimonials.map((t, i) => (
            <div key={i} className="tc" style={{ padding: "30px 26px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={13} style={{ color: "#B07D3E", fill: "#B07D3E" }} />)}
              </div>
              <div style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "3rem", color: "rgba(30,77,58,0.12)", lineHeight: 0.5, marginBottom: "10px" }}>"</div>
              <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "0.95rem", fontStyle: "italic", color: "#3A4440", lineHeight: 1.85, flex: 1 }}>{t.text}</p>
              <div style={{ borderTop: "1px solid #C8D8D0", paddingTop: "16px", marginTop: "20px" }}>
                <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#1A1F1C" }}>{t.name}</p>
                <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.72rem", color: "#7A8A84", marginTop: "2px", fontWeight: 300 }}>{t.from}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
                  <div style={{ width: "16px", height: "1px", background: "#B07D3E" }} />
                  <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.65rem", fontWeight: 700, color: "#B07D3E", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.exp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
