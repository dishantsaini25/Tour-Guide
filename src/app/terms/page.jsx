import Link from "next/link";
export const metadata = { title: "Terms & Conditions" };
const PF="Fraunces,Georgia,serif", IN="DM Sans,system-ui,sans-serif";
const CH="#1A1209", MU="#6B5B2E", OR="#FF8C00";
const H2 = { fontFamily:PF, fontSize:"1.35rem", fontWeight:700, color:OR, marginBottom:"10px", marginTop:"32px" };
export default function TermsPage() {
  return (
    <>
      <div style={{ background:"#FFFDE7", borderBottom:"1px solid #FFD89B", paddingTop:"100px", paddingBottom:"48px", textAlign:"center" }}>
        <p style={{ fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:OR, marginBottom:"10px" }}>Legal</p>
        <div style={{ width:"36px", height:"2px", background:OR, margin:"0 auto 16px" }} />
        <h1 style={{ fontFamily:PF, fontSize:"2.8rem", fontWeight:700, color:CH }}>Terms & Conditions</h1>
        <p style={{ fontFamily:IN, color:MU, marginTop:"8px", fontSize:"0.85rem", fontWeight:300 }}>Last updated: 2024</p>
      </div>
      <div style={{ background:"#FFFFFF", padding:"72px 24px" }}>
        <div style={{ maxWidth:"720px", margin:"0 auto", fontFamily:IN, color:MU, lineHeight:1.85, fontSize:"0.95rem", fontWeight:300 }}>
          <h2 style={H2}>1. Bookings</h2>
          <p>All bookings are confirmed only after written confirmation from Raah India Experiences via email or WhatsApp.</p>
          <h2 style={H2}>2. Cancellation Policy</h2>
          <ul style={{ paddingLeft:"20px", display:"flex", flexDirection:"column", gap:"8px", marginTop:"8px" }}>
            <li>72+ hours before: Full refund or free rescheduling.</li>
            <li>24–72 hours before: 50% refund or rescheduling at our discretion.</li>
            <li>Within 24 hours: No refund; rescheduling offered where possible.</li>
            <li>Cancellation by us: Full refund or free rescheduling.</li>
          </ul>
          <h2 style={H2}>3. Health & Safety</h2>
          <p>Guests with specific medical conditions or mobility concerns should inform us in advance.</p>
          <h2 style={H2}>4. Weather</h2>
          <p>Most experiences run in light rain. In severe weather, we modify or reschedule with a full refund if cancelled by us.</p>
          <h2 style={H2}>5. Photography</h2>
          <p>Personal photography is welcome. Commercial use requires prior written consent.</p>
          <h2 style={H2}>6. Contact</h2>
          <p>Questions? Email <a href="mailto:hello@raahindia.com" style={{ color:OR, textDecoration:"underline" }}>hello@raahindia.com</a>.</p>
          <div style={{ marginTop:"44px", paddingTop:"32px", borderTop:"1px solid #FFD89B" }}>
            <Link href="/" style={{ background:OR, color:"#FFFFFF", padding:"12px 26px", fontFamily:IN, fontSize:"0.8rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", textDecoration:"none" }} className="tc-back">Back to Home</Link>
          </div>
        </div>
      </div>
      <style>{`.tc-back:hover{background:#E07800!important;}`}</style>
    </>
  );
}
