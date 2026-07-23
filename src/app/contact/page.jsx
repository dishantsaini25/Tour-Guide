import ContactForm from "./ContactForm";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export const metadata = {
  title: "Book an Experience",
  description: "Book a curated Raah India Experience in Jaipur. We respond personally within 24 hours.",
};

const WA  = "https://wa.me/919876543210?text=Hello%2C+I%27d+like+to+enquire+about+a+Raah+India+Experience.";
const PF  = "Fraunces, Georgia, serif";
const IN  = "DM Sans, system-ui, sans-serif";

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ContactPage() {
  return (
    <>
      <style>{`
        /* contact info link hover */
        .cl { transition: color 0.2s ease; }
        .cl:hover { color: #FF8C00 !important; }

        /* WhatsApp button */
        .cwa {
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #25D366 0%, #1db954 100%);
          color: #FFFFFF !important;
          padding: 14px 22px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          border-radius: 9999px;
          box-shadow: 0 4px 16px rgba(37,211,102,0.28);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          width: 100%;
          justify-content: center;
        }
        .cwa:hover, .cwa:focus-visible {
          color: #FFFFFF !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow:
            0 0 0 4px rgba(37,211,102,0.14),
            0 0 22px rgba(37,211,102,0.45),
            0 8px 22px rgba(37,211,102,0.28) !important;
        }
        .cwa:active { transform: translateY(0) scale(1); }
        .cwa:focus-visible { outline: 2px solid #25D366; outline-offset: 3px; }

        /* Contact info icon badge */
        .ci-badge {
          width: 42px; height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #FFF3DC 0%, #FFE8B0 100%);
          border: 1px solid rgba(255,216,155,0.7);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(255,140,0,0.10);
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ position:"relative", backgroundImage:"url('https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1400&q=85')", backgroundSize:"cover", backgroundPosition:"center", paddingTop:"140px", paddingBottom:"80px", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,rgba(20,10,0,0.78) 0%,rgba(20,10,0,0.45) 55%,rgba(20,10,0,0.2) 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(20,10,0,0.82) 0%,transparent 55%)" }} />
        <div style={{ position:"relative", zIndex:10, maxWidth:"680px", margin:"0 auto", padding:"0 20px", textAlign:"center" }}>
          <p style={{ fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:"#F5A623", marginBottom:"14px" }}>
            Book an Experience
          </p>
          <h1 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(2.8rem,6vw,4.5rem)", color:"#FFFFFF", lineHeight:1.1, marginBottom:"16px" }}>
            Start Your Jaipur<br />
            <em style={{ color:"#FF8C00", fontStyle:"italic" }}>Journey Here</em>
          </h1>
          <p style={{ fontFamily:IN, color:"rgba(255,255,255,0.65)", fontSize:"1rem", lineHeight:1.75, fontWeight:300 }}>
            Fill in the form and we'll get back to you personally within 24 hours.
          </p>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"70px", background:"linear-gradient(to top,#FFFFFF,transparent)" }} />
      </section>

      {/* ── Main content ── */}
      <section style={{ background:"#FFFFFF", padding:"72px 0 96px" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 20px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

            {/* ── Left: contact info ── */}
            <div>
              <h2 style={{ fontFamily:PF, fontWeight:700, fontSize:"1.6rem", color:"#1A1209", marginBottom:"8px" }}>
                Contact Information
              </h2>
              <div style={{ width:"32px", height:"2px", background:"linear-gradient(to right,#FF8C00,#F5A623)", borderRadius:"2px", marginBottom:"28px" }} />

              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"18px", marginBottom:"30px" }}>
                {[
                  { Icon:MapPin, label:"Location",         value:"Jaipur, Rajasthan, India", href:null },
                  { Icon:Phone,  label:"Phone / WhatsApp", value:"+91 98765 43210",           href:"tel:+919876543210" },
                  { Icon:Mail,   label:"Email",             value:"raahindiaexperiences@gmail.com", href:"mailto:raahindiaexperiences@gmail.com" },
                  { Icon:Clock,  label:"Response Time",    value:"Within 24 hours",            href:null },
                ].map(({ Icon, label, value, href }) => (
                  <li key={label} style={{ display:"flex", alignItems:"flex-start", gap:"14px" }}>
                    <div className="ci-badge">
                      <Icon size={15} style={{ color:"#FF8C00" }} />
                    </div>
                    <div>
                      <p style={{ fontFamily:IN, fontSize:"0.58rem", textTransform:"uppercase", letterSpacing:"0.18em", color:"#9C8550", marginBottom:"2px" }}>
                        {label}
                      </p>
                      {href
                        ? <a href={href} className="cl" style={{ fontFamily:IN, color:"#1A1209", fontSize:"0.875rem", fontWeight:500, textDecoration:"none" }}>{value}</a>
                        : <p style={{ fontFamily:IN, color:"#1A1209", fontSize:"0.875rem", fontWeight:500 }}>{value}</p>}
                    </div>
                  </li>
                ))}
              </ul>

              {/* WhatsApp CTA */}
              <a href={WA} target="_blank" rel="noopener noreferrer" className="cwa" aria-label="Chat on WhatsApp">
                {WA_ICON} Chat on WhatsApp Now
              </a>

              {/* Availability note */}
              <div style={{ marginTop:"16px", padding:"14px 16px", background:"#FFFDE7", border:"1px solid #FFD89B", borderRadius:"14px", fontFamily:IN, fontSize:"0.8rem", color:"#6B5B2E", lineHeight:1.7, fontWeight:300 }}>
                <strong style={{ color:"#1A1209", fontWeight:600, display:"block", marginBottom:"3px" }}>Prefer a quick chat?</strong>
                WhatsApp is the fastest way. Available 9 AM – 9 PM IST, 7 days a week.
              </div>

              {/* Quote */}
              <div style={{ marginTop:"16px", padding:"14px 18px 14px 20px", borderLeft:"3px solid #FF8C00", background:"#FFFDE7", borderRadius:"0 12px 12px 0" }}>
                <p style={{ fontFamily:PF, fontSize:"0.9rem", fontStyle:"italic", color:"#6B5B2E", lineHeight:1.65 }}>
                  "We respond to every enquiry personally — not with templates."
                </p>
              </div>
            </div>

            {/* ── Right: form card ── */}
            <div className="lg:col-span-2">
              {/* Card container */}
              <div style={{
                background: "linear-gradient(145deg, #FFFBF0 0%, #FFF7E4 100%)",
                border: "1px solid rgba(255,216,155,0.55)",
                borderRadius: "24px",
                boxShadow: "0 4px 24px rgba(255,140,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
              }} className="cf-card-pad">
                <style>{`
                  .cf-card-pad { padding: 36px 32px 40px; }
                  @media (max-width: 767px) { .cf-card-pad { padding: 20px 16px 24px !important; } }
                `}</style>
                <h2 style={{ fontFamily:PF, fontWeight:700, fontSize:"1.6rem", color:"#1A1209", marginBottom:"8px" }}>
                  Booking Enquiry Form
                </h2>
                <div style={{ width:"32px", height:"2px", background:"linear-gradient(to right,#FF8C00,#F5A623)", borderRadius:"2px", marginBottom:"28px" }} />
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
