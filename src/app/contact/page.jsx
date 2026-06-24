import ContactForm from "./ContactForm";
import { MapPin, Mail, Phone, Clock, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact & Booking",
  description: "Send a booking inquiry for your curated Jaipur experience. We respond within 24 hours.",
};

const WA_URL = "https://wa.me/919876543210?text=Hello%2C%20I%27d%20like%20to%20book%20a%20Jaipur%20experience.";
const S = { fontFamily: "Cormorant Garamond, Georgia, serif" };

export default function ContactPage() {
  return (
    <>
      <style>{`
        .contact-wa:hover { background: #1fba5a !important; }
        .contact-link:hover { color: #c9943a !important; }
      `}</style>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1400&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "140px",
          paddingBottom: "80px",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(30,27,58,0.85)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#c9943a", marginBottom: "14px" }}>
            Get in Touch
          </p>
          <h1 style={{ ...S, fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 600, color: "white", lineHeight: 1.1, marginBottom: "16px" }}>
            Book Your{" "}
            <span style={{ color: "#c9943a", fontStyle: "italic" }}>Jaipur Experience</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.75 }}>
            Fill in the form and we'll get back to you within 24 hours with availability and details.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-14" style={{ background: "linear-gradient(to top, #fdf6ed, transparent)" }} />
      </section>

      {/* ── Form + Info ── */}
      <section style={{ background: "#fdf6ed", padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

            {/* ─── Contact Info ─── */}
            <div>
              <h2 style={{ ...S, fontSize: "1.7rem", fontWeight: 600, color: "#1e1b3a", marginBottom: "28px" }}>
                Contact Information
              </h2>

              <ul className="space-y-6 mb-8">
                {[
                  { Icon: MapPin, label: "Location", value: "Jaipur, Rajasthan, India", href: null },
                  { Icon: Phone, label: "Phone / WhatsApp", value: "+91 98765 43210", href: "tel:+919876543210" },
                  { Icon: Mail, label: "Email", value: "hello@jaipurwalks.com", href: "mailto:hello@jaipurwalks.com" },
                  { Icon: Clock, label: "Response Time", value: "Within 24 hours", href: null },
                ].map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 shrink-0" style={{ background: "rgba(201,148,58,0.12)" }}>
                      <Icon size={16} style={{ color: "#c9943a" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#8a7e9a", marginBottom: "2px" }}>{label}</p>
                      {href ? (
                        <a href={href} className="contact-link" style={{ color: "#1e1b3a", fontSize: "0.875rem", fontWeight: 500, transition: "color 0.2s" }}>{value}</a>
                      ) : (
                        <p style={{ color: "#1e1b3a", fontSize: "0.875rem", fontWeight: 500 }}>{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* WhatsApp */}
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-wa flex items-center gap-3 w-full px-5 py-4 text-sm font-semibold mb-5"
                style={{ background: "#25D366", color: "white", transition: "background 0.2s" }}
              >
                <MessageCircle size={18} />
                Chat on WhatsApp Now
              </a>

              <div style={{ padding: "16px", background: "#f5ece0", border: "1px solid #e5d9c8", fontSize: "0.8rem", color: "#4a4458", lineHeight: 1.7 }}>
                <strong style={{ color: "#1e1b3a", display: "block", marginBottom: "4px" }}>Prefer a quick chat?</strong>
                WhatsApp is the fastest way to reach us. Available 9 AM – 9 PM IST.
              </div>
            </div>

            {/* ─── Form ─── */}
            <div className="lg:col-span-2">
              <h2 style={{ ...S, fontSize: "1.7rem", fontWeight: 600, color: "#1e1b3a", marginBottom: "28px" }}>
                Booking Inquiry Form
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
