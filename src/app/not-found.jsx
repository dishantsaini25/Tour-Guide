import Link from "next/link";
export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#E8F0EC", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
      <div>
        <div style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(8rem,20vw,14rem)", fontWeight: 700, color: "rgba(30,77,58,0.07)", lineHeight: 1, marginBottom: "8px" }}>404</div>
        <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: "#B07D3E", marginBottom: "16px" }}>Page Not Found</p>
        <div style={{ width: "36px", height: "1.5px", background: "#B07D3E", margin: "0 auto 20px" }} />
        <h1 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#1A1F1C", marginBottom: "14px", lineHeight: 1.15 }}>Lost in the Lanes?</h1>
        <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: "#4A5550", maxWidth: "360px", margin: "0 auto 36px", lineHeight: 1.75, fontSize: "0.95rem", fontWeight: 300 }}>
          This page doesn't exist — but the perfect Jaipur experience does.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
          <Link href="/" style={{ background: "#1E4D3A", color: "#F0EDE8", padding: "13px 30px", fontFamily: "DM Sans, system-ui, sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }} className="nf1">Back to Home</Link>
          <Link href="/experiences" style={{ border: "1.5px solid #1E4D3A", color: "#1E4D3A", padding: "13px 30px", fontFamily: "DM Sans, system-ui, sans-serif", fontWeight: 700, fontSize: "0.82rem", textDecoration: "none" }} className="nf2">See Experiences</Link>
        </div>
        <style>{`.nf1:hover{background:#163529!important;} .nf2:hover{background:#1E4D3A!important;color:#F0EDE8!important;}`}</style>
      </div>
    </div>
  );
}
