import Link from "next/link";

export default function FinalCTA() {
  return (
    <>
      <style>{`
        .fc1 { background:#1E4D3A; color:#F0EDE8; transition:background .2s,transform .2s; box-shadow:0 4px 20px rgba(30,77,58,0.35); }
        .fc1:hover { background:#163529!important; transform:translateY(-1px); }
        .fc2 { border:1.5px solid rgba(240,237,232,0.45); color:rgba(240,237,232,0.9); transition:all .2s; }
        .fc2:hover { background:rgba(240,237,232,0.1)!important; border-color:rgba(240,237,232,0.75)!important; }
      `}</style>
      <section style={{ position: "relative", padding: "110px 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=85')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,25,16,0.86)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(30,77,58,0.3) 0%, transparent 65%)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "720px", margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B07D3E", fontWeight: 700, marginBottom: "18px" }}>Start Your Journey</p>
          <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700, fontSize: "clamp(2.6rem,5.5vw,4.5rem)", lineHeight: 1.05, color: "#F0EDE8", marginBottom: "20px" }}>
            Ready to Experience<br />
            <em style={{ color: "#B07D3E", fontStyle: "italic" }}>Jaipur Differently?</em>
          </h2>
          <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "1rem", color: "rgba(240,237,232,0.58)", lineHeight: 1.8, marginBottom: "40px", fontWeight: 300 }}>
            We don't just show you Jaipur. We help you understand it. Every experience is small, curated, and personally led.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
            <Link href="/contact" className="fc1" style={{ display: "inline-flex", alignItems: "center", padding: "15px 36px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              Book Your Experience
            </Link>
            <Link href="/experiences" className="fc2" style={{ display: "inline-flex", alignItems: "center", padding: "15px 36px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}>
              Browse Experiences
            </Link>
          </div>
          <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1rem", fontStyle: "italic", color: "rgba(240,237,232,0.28)", marginTop: "36px" }}>
            "Because the most meaningful souvenirs are the stories you carry home."
          </p>
        </div>
      </section>
    </>
  );
}
