import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

// Social icon uses CSS hover via className — no JS handlers
function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="footer-social-icon flex items-center justify-center w-9 h-9 rounded-full"
      style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", transition: "border-color 0.2s, color 0.2s" }}
    >
      {children}
    </a>
  );
}

// Server component — no event handlers, use CSS for hover
export default function Footer() {
  return (
    <>
      {/* CSS for hover states */}
      <style>{`
        .footer-social-icon:hover { border-color: #c9943a !important; color: #c9943a !important; }
        .footer-link:hover { color: #c9943a !important; }
        .footer-cta-btn:hover { background: #2d2a52 !important; }
        .footer-book-btn:hover { background: #e2b86a !important; }
      `}</style>

      <footer style={{ background: "#1e1b3a", color: "rgba(255,255,255,0.55)" }}>

        {/* ── Top CTA strip ── */}
        <div style={{ background: "#c9943a" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.25rem", fontWeight: 600, color: "#1e1b3a" }}>
              Ready to experience Jaipur differently?
            </p>
            <Link
              href="/contact"
              className="footer-cta-btn px-6 py-2.5 text-sm font-semibold"
              style={{ background: "#1e1b3a", color: "white", letterSpacing: "0.04em", transition: "background 0.2s" }}
            >
              Book an Experience →
            </Link>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand */}
            <div>
              <div className="mb-5">
                <span className="block" style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.6rem", fontWeight: 600, color: "white", lineHeight: 1.1 }}>
                  Jaipur Walks
                </span>
                <span style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c9943a", fontWeight: 600 }}>
                  Curated Experiences
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.75, maxWidth: "240px", marginBottom: "20px" }}>
                Boutique, story-driven experiences of Jaipur — crafted for curious travellers who want more than monuments.
              </p>
              <div className="flex gap-3">
                <SocialIcon href="https://instagram.com" label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://facebook.com" label="Facebook">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://youtube.com" label="YouTube">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                  </svg>
                </SocialIcon>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={{ color: "white", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "20px" }}>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  ["/", "Home"],
                  ["/experiences", "Experiences"],
                  ["/about", "About"],
                  ["/gallery", "Gallery"],
                  ["/contact", "Contact & Booking"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="footer-link" style={{ fontSize: "0.875rem", transition: "color 0.2s" }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experiences */}
            <div>
              <h3 style={{ color: "white", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "20px" }}>
                Experiences
              </h3>
              <ul className="space-y-3">
                {[
                  ["/experiences/the-blue-hour-jaipur", "The Blue Hour"],
                  ["/experiences/jaipur-beyond-pink", "Jaipur Beyond Pink"],
                  ["/experiences/jaipur-at-dawn", "Jaipur at Dawn"],
                  ["/privacy", "Privacy Policy"],
                  ["/terms", "Terms & Conditions"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="footer-link" style={{ fontSize: "0.875rem", transition: "color 0.2s" }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 style={{ color: "white", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "20px" }}>
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={14} style={{ color: "#c9943a", marginTop: "2px", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.85rem" }}>Jaipur, Rajasthan, India</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={14} style={{ color: "#c9943a", flexShrink: 0 }} />
                  <a href="tel:+919876543210" className="footer-link" style={{ fontSize: "0.85rem", transition: "color 0.2s" }}>+91 98765 43210</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={14} style={{ color: "#c9943a", flexShrink: 0 }} />
                  <a href="mailto:hello@jaipurwalks.com" className="footer-link" style={{ fontSize: "0.85rem", transition: "color 0.2s" }}>hello@jaipurwalks.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} Jaipur Walks. All rights reserved.
            </p>
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.22)" }}>
              Crafted with care · Jaipur, Rajasthan
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
