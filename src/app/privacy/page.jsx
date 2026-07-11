import Link from "next/link";
export const metadata = { title: "Privacy Policy" };
const PF="Fraunces,Georgia,serif", IN="DM Sans,system-ui,sans-serif";
const CH="#1A1F1C", MU="#4A5550", FR="#1E4D3A", CP="#B07D3E", SF="#E8F0EC", BD="#C8D8D0";
const H2 = { fontFamily:PF, fontSize:"1.35rem", fontWeight:700, color:FR, marginBottom:"10px", marginTop:"32px" };
export default function PrivacyPage() {
  return (
    <>
      <div style={{ background:SF, borderBottom:`1px solid ${BD}`, paddingTop:"100px", paddingBottom:"48px", textAlign:"center" }}>
        <p style={{ fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:CP, marginBottom:"10px" }}>Legal</p>
        <div style={{ width:"36px", height:"1.5px", background:CP, margin:"0 auto 16px" }} />
        <h1 style={{ fontFamily:PF, fontSize:"2.8rem", fontWeight:700, color:CH }}>Privacy Policy</h1>
        <p style={{ fontFamily:IN, color:MU, marginTop:"8px", fontSize:"0.85rem", fontWeight:300 }}>Last updated: 2024</p>
      </div>
      <div style={{ background:"#F2F0EC", padding:"72px 24px" }}>
        <div style={{ maxWidth:"720px", margin:"0 auto", fontFamily:IN, color:MU, lineHeight:1.85, fontSize:"0.95rem", fontWeight:300 }}>
          <h2 style={H2}>1. Information We Collect</h2>
          <p>When you submit a booking enquiry, we collect your name, email, phone, and travel preferences solely to respond to your enquiry.</p>
          <h2 style={H2}>2. How We Use Your Information</h2>
          <p>We use your information solely to respond to booking enquiries. We do not use it for marketing without your consent.</p>
          <h2 style={H2}>3. Data Sharing</h2>
          <p>We do not sell, trade, or transfer your personal information to third parties.</p>
          <h2 style={H2}>4. Cookies</h2>
          <p>This website does not use tracking cookies or analytics platforms that collect personal data beyond standard server logs.</p>
          <h2 style={H2}>5. Contact</h2>
          <p>For privacy questions, email <a href="mailto:hello@raahindia.com" style={{ color:CP, textDecoration:"underline" }}>hello@raahindia.com</a>.</p>
          <div style={{ marginTop:"44px", paddingTop:"32px", borderTop:`1px solid ${BD}` }}>
            <Link href="/" style={{ background:FR, color:"#F0EDE8", padding:"12px 26px", fontFamily:IN, fontSize:"0.8rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", textDecoration:"none" }} className="pp-back">Back to Home</Link>
          </div>
        </div>
      </div>
      <style>{`.pp-back:hover{background:#163529!important;}`}</style>
    </>
  );
}
