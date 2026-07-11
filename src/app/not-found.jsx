import Link from "next/link";
export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#FFFDE7", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
      <div>
        <div style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(8rem,20vw,14rem)", fontWeight: 700, color: "rgba(255,140,0,0.1)", lineHeight: 1, marginBottom: "8px" }}>404</div>
        <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: "#FF8C00", marginBottom: "16px" }}>Page Not Found</p>
        <div style={{ width: "36px", height: "2px", background: "#FF8C00", margin: "0 auto 20px" }} />
        <h1 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#1A1209", marginBottom: "14px", lineHeight: 1.15 }}>Lost in the Lanes?</h1>
        <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: "#6B5B2E", maxWidth: "360px", margin: "0 auto 36px", lineHeight: 1.75, fontSize: "0.95rem", fontWeight: 300 }}>
          This page doesn't exist — but the perfect Jaipur experience does.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
          <Link href="/" style={{ background: "#FF8C00", color: "#FFFFFF", padding: "13px 30px", fontFamily: "DM Sans, system-ui, sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }} className="nf1">Back to Home</Link>
          <Link href="/experiences" style={{ border: "2px solid #FF8C00", color: "#FF8C00", padding: "13px 30px", fontFamily: "DM Sans, system-ui, sans-serif", fontWeight: 700, fontSize: "0.82rem", textDecoration: "none" }} className="nf2">See Experiences</Link>
        </div>
        <style>{`.nf1:hover{background:#E07800!important;} .nf2:hover{background:#FF8C00!important;color:#FFFFFF!important;}`}</style>
      </div>
    </div>
  );
}
