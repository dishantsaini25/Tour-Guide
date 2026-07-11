import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";

export default function AboutPreview() {
  return (
    <>
      <style>{`
        .ap1 { background:#1E4D3A!important; color:#F0EDE8!important; transition:background .2s; }
        .ap1:hover { background:#163529!important; }
        .ap2 { border:1.5px solid #1E4D3A!important; color:#1E4D3A!important; transition:all .2s; }
        .ap2:hover { background:#1E4D3A!important; color:#F0EDE8!important; }
      `}</style>
      <SectionWrapper variant="soft">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden", border: "1px solid #C8D8D0" }}>
              <Image src="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=900&q=85" alt="Jaipur at dusk" fill className="object-cover object-center" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
            <div style={{ position: "absolute", bottom: "-12px", right: "-12px", width: "90px", height: "90px", border: "2px solid rgba(176,125,62,0.35)" }} className="hidden lg:block" />
            <div style={{ position: "absolute", top: "24px", right: "-20px", background: "#F2F0EC", border: "1px solid #C8D8D0", padding: "14px 18px", textAlign: "center", boxShadow: "0 4px 16px rgba(30,77,58,0.1)" }} className="hidden lg:block">
              <span style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.8rem", fontWeight: 700, color: "#1E4D3A", display: "block", lineHeight: 1 }}>10+</span>
              <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4A5550", fontWeight: 500 }}>Years</span>
            </div>
          </div>

          <div>
            <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: "#B07D3E", marginBottom: "10px" }}>The Curator</p>
            <div style={{ width: "40px", height: "1.5px", background: "linear-gradient(to right, #B07D3E, #C89A5A)", marginBottom: "22px" }} />
            <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 700, color: "#1A1F1C", lineHeight: 1.08, marginBottom: "24px" }}>
              Born in Jaipur.<br />
              <em style={{ color: "#1E4D3A", fontStyle: "italic", fontWeight: 600 }}>Storyteller by calling.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.95rem", color: "#4A5550", lineHeight: 1.85, fontWeight: 300, marginBottom: "32px" }}>
              <p>For years, I watched travellers arrive in Jaipur filled with excitement and leave with photographs of forts and palaces — yet having never experienced the city that locals know and cherish.</p>
              <p>One guest quietly said: <em style={{ color: "#1A1F1C", fontWeight: 500, fontFamily: "Fraunces, Georgia, serif" }}>"The monuments were beautiful, but I wish I had met the people who give this city its soul."</em></p>
              <p>That single sentence became the foundation of Raah India Experiences.</p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/about" className="ap1" style={{ padding: "13px 28px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>Our Philosophy</Link>
              <Link href="/experiences" className="ap2" style={{ padding: "13px 28px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 700, textDecoration: "none" }}>See All Experiences</Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
