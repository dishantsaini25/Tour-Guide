import ContactForm from "./ContactForm";
import { MapPin, Mail, Phone, Clock, MessageCircle } from "lucide-react";

export const metadata = { title: "Book an Experience", description: "Book a curated Raah India Experience in Jaipur. We respond personally within 24 hours." };

const WA = "https://wa.me/919876543210?text=Hello%2C+I%27d+like+to+enquire+about+a+Raah+India+Experience.";
const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";

export default function ContactPage() {
  return (
    <>
      <style>{`.cl:hover{color:#B07D3E!important;} .cwa:hover{background:#1fba5a!important;}`}</style>
      <section style={{ position:"relative", backgroundImage:"url('https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1400&q=85')", backgroundSize:"cover", backgroundPosition:"center", paddingTop:"140px", paddingBottom:"80px", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,rgba(10,25,16,0.78) 0%,rgba(10,25,16,0.45) 55%,rgba(10,25,16,0.2) 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,25,16,0.82) 0%,transparent 55%)" }} />
        <div style={{ position:"relative", zIndex:10, maxWidth:"680px", margin:"0 auto", padding:"0 20px", textAlign:"center" }}>
          <p style={{ fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:"#B07D3E", marginBottom:"14px" }}>Book an Experience</p>
          <h1 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(2.8rem,6vw,4.5rem)", color:"#F0EDE8", lineHeight:1.1, marginBottom:"16px" }}>
            Start Your Jaipur<br /><em style={{ color:"#B07D3E", fontStyle:"italic" }}>Journey Here</em>
          </h1>
          <p style={{ fontFamily:IN, color:"rgba(240,237,232,0.65)", fontSize:"1rem", lineHeight:1.75, fontWeight:300 }}>Fill in the form and we'll get back to you personally within 24 hours.</p>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"70px", background:"linear-gradient(to top,#F2F0EC,transparent)" }} />
      </section>

      <section style={{ background:"#F2F0EC", padding:"88px 0" }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 20px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            <div>
              <h2 style={{ fontFamily:PF, fontWeight:700, fontSize:"1.7rem", color:"#1A1F1C", marginBottom:"28px" }}>Contact Information</h2>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"20px", marginBottom:"28px" }}>
                {[
                  { Icon:MapPin, label:"Location",        value:"Jaipur, Rajasthan, India",  href:null },
                  { Icon:Phone,  label:"Phone / WhatsApp",value:"+91 98765 43210",            href:"tel:+919876543210" },
                  { Icon:Mail,   label:"Email",            value:"hello@raahindia.com",        href:"mailto:hello@raahindia.com" },
                  { Icon:Clock,  label:"Response Time",   value:"Within 24 hours",             href:null },
                ].map(({ Icon, label, value, href }) => (
                  <li key={label} style={{ display:"flex", alignItems:"flex-start", gap:"14px" }}>
                    <div style={{ width:"38px", height:"38px", background:"#E8F0EC", border:"1px solid #C8D8D0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Icon size={15} style={{ color:"#B07D3E" }} />
                    </div>
                    <div>
                      <p style={{ fontFamily:IN, fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:"0.18em", color:"#7A8A84", marginBottom:"2px" }}>{label}</p>
                      {href ? <a href={href} className="cl" style={{ fontFamily:IN, color:"#1A1F1C", fontSize:"0.875rem", fontWeight:500, textDecoration:"none", transition:"color .2s" }}>{value}</a>
                             : <p style={{ fontFamily:IN, color:"#1A1F1C", fontSize:"0.875rem", fontWeight:500 }}>{value}</p>}
                    </div>
                  </li>
                ))}
              </ul>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="cwa"
                style={{ display:"flex", alignItems:"center", gap:"10px", background:"#25D366", color:"white", padding:"13px 18px", fontFamily:IN, fontSize:"0.85rem", fontWeight:700, textDecoration:"none", marginBottom:"16px", transition:"background .2s" }}
              ><MessageCircle size={16} /> Chat on WhatsApp Now</a>
              <div style={{ padding:"16px 18px", background:"#E8F0EC", border:"1px solid #C8D8D0", fontFamily:IN, fontSize:"0.8rem", color:"#4A5550", lineHeight:1.7, marginBottom:"16px", fontWeight:300 }}>
                <strong style={{ color:"#1A1F1C", fontWeight:600, display:"block", marginBottom:"4px" }}>Prefer a quick chat?</strong>
                WhatsApp is the fastest way. Available 9 AM – 9 PM IST, 7 days a week.
              </div>
              <div style={{ padding:"14px 18px 14px 20px", borderLeft:"2px solid #B07D3E", background:"#FFFFFF" }}>
                <p style={{ fontFamily:PF, fontSize:"0.9rem", fontStyle:"italic", color:"#4A5550", lineHeight:1.65 }}>
                  "We respond to every enquiry personally — not with templates."
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 style={{ fontFamily:PF, fontWeight:700, fontSize:"1.7rem", color:"#1A1F1C", marginBottom:"28px" }}>Booking Enquiry Form</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
