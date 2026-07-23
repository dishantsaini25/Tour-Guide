"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, Plus, Minus } from "lucide-react";

/* ── Light footer palette ── */
const FG  = "#1A1209";               /* footer bg — warm near-black */
const FT  = "rgba(255,253,231,0.58)";/* muted text */
const FTH = "#FFFDE7";               /* headings / bright text */
const FBD = "rgba(255,253,231,0.12)";/* divider */
const ACC = "#F5A623";               /* accent — golden yellow */
const PF  = "Fraunces, Georgia, serif";
const IN  = "DM Sans, system-ui, sans-serif";

const expLinks = [
  ["/experiences/jaipur-at-dawn",        "Jaipur at Dawn"],
  ["/experiences/ridge-and-ramparts",    "The Ridge & Ramparts"],
  ["/experiences/the-blue-hour",         "The Blue Hour"],
  ["/experiences/beyond-the-pink",       "Beyond the Pink"],
  ["/experiences/farm-and-fire",         "The Farm & Fire"],
  ["/experiences/cosmic-imperial-triad", "The Cosmic & Imperial Triad"],
  ["/experiences/living-walled-city",    "The Living Walled City"],
];

const navLinks = [
  ["/",            "Home"],
  ["/experiences", "All Experiences"],
  ["/about",       "About & Philosophy"],
  ["/journal",     "The Raah Journal"],
  ["/gallery",     "Gallery"],
  ["/contact",     "Book an Experience"],
  ["/privacy",     "Privacy Policy"],
  ["/terms",       "Terms & Conditions"],
];

const socialIcons = [
  { href: "https://instagram.com", label: "Instagram",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg> },
  { href: "https://facebook.com", label: "Facebook",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
];

export default function Footer() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        /* Nav link hover */
        .fl { transition: color .2s ease; }
        .fl:hover { color: ${ACC} !important; }

        /* Social icon hover */
        .fs { transition: border-color .2s ease, color .2s ease; }
        .fs:hover { border-color: ${ACC} !important; color: ${ACC} !important; }

        /* Footer CTA — pill, gradient, glow hover (matches hero primary) */
        .fbook {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-radius: 9999px !important;
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 55%, #C45E00 100%);
          color: #FFFFFF !important;
          box-shadow: 0 3px 14px rgba(255,140,0,0.30);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          text-decoration: none;
        }
        .fbook:hover, .fbook:focus-visible {
          color: #FFFFFF !important;
          transform: translateY(-2px) scale(1.03);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.14),
            0 0 22px rgba(255,140,0,0.48),
            0 8px 24px rgba(255,140,0,0.30) !important;
        }
        .fbook:active { transform: translateY(0) scale(1); }
      `}</style>

      <footer style={{ fontFamily: IN }}>

        {/* ── Signature strip ── */}
        <div style={{ background: "#FFFDE7", borderTop: "2px solid #FF8C00", borderBottom: "1px solid #FFD89B", padding: "20px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: PF, fontSize: "1rem", fontStyle: "italic", color: "#3D2E0E", fontWeight: 500 }}>
            "Walk Slowly. Listen Deeply.{" "}
            <em style={{ color: "#FF8C00", fontStyle: "normal", fontWeight: 600 }}>Experience Authentically.</em>"
          </p>
        </div>

        {/* ── MOBILE FOOTER ── */}
        <div className="f-mobile" style={{ background: FG, color: FT }} aria-label="Site footer">

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: mobileOpen ? `1px solid ${FBD}` : "none" }}>
            <div>
              <div style={{ fontFamily: PF, fontSize: "1.25rem", fontWeight: 700, color: FTH, lineHeight: 1 }}>Raah India</div>
              <div style={{ fontFamily: IN, fontSize: "0.48rem", letterSpacing: "0.24em", textTransform: "uppercase", color: ACC, fontWeight: 600, marginTop: "3px" }}>Curated Experiences · Jaipur</div>
            </div>
            <button
              onClick={() => setMobileOpen(p => !p)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-footer-body"
              aria-label={mobileOpen ? "Collapse footer" : "Expand footer"}
              style={{ width: "44px", height: "44px", borderRadius: "50%", border: `1.5px solid rgba(245,166,35,0.35)`, background: "transparent", color: ACC, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              {mobileOpen ? <Minus size={16} /> : <Plus size={16} />}
            </button>
          </div>

          <div id="mobile-footer-body" style={{ overflow: "hidden", maxHeight: mobileOpen ? "1400px" : "0px", opacity: mobileOpen ? 1 : 0, transition: "max-height .45s ease, opacity .35s ease" }}>
            <div style={{ padding: "28px 20px 0" }}>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <div style={{ fontFamily: PF, fontSize: "1.5rem", fontWeight: 700, color: FTH, marginBottom: "4px" }}>Raah India</div>
                <div style={{ fontFamily: IN, fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: ACC, fontWeight: 600, marginBottom: "12px" }}>Curated Experiences · Jaipur</div>
                <p style={{ fontFamily: IN, fontSize: "0.82rem", lineHeight: 1.75, color: FT, fontWeight: 300, maxWidth: "280px", margin: "0 auto 16px" }}>
                  Boutique walking tours & cultural experiences in Jaipur — for travellers who want depth, not destinations.
                </p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                  {socialIcons.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="fs"
                      style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(245,166,35,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(245,166,35,0.55)", textDecoration: "none" }}
                    >{s.icon}</a>
                  ))}
                </div>
              </div>

              <div style={{ height: "1px", background: FBD, marginBottom: "28px" }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", marginBottom: "28px" }}>
                <div>
                  <h3 style={{ fontFamily: IN, color: FTH, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "14px" }}>Experiences</h3>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "11px" }}>
                    {expLinks.map(([href, label]) => (
                      <li key={href}><Link href={href} className="fl" style={{ fontFamily: IN, fontSize: "0.82rem", textDecoration: "none", color: FT, fontWeight: 300, display: "block", lineHeight: 1.4 }}>{label}</Link></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontFamily: IN, color: FTH, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "14px" }}>Navigate</h3>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "11px" }}>
                    {navLinks.map(([href, label]) => (
                      <li key={href}><Link href={href} className="fl" style={{ fontFamily: IN, fontSize: "0.82rem", textDecoration: "none", color: FT, fontWeight: 300, display: "block", lineHeight: 1.4 }}>{label}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ height: "1px", background: FBD, marginBottom: "28px" }} />

              <div style={{ marginBottom: "28px" }}>
                <h3 style={{ fontFamily: IN, color: FTH, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "16px" }}>Get in Touch</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "13px", marginBottom: "20px" }}>
                  {[
                    { Icon: MapPin, text: "Jaipur, Rajasthan, India", href: null },
                    { Icon: Phone,  text: "+91 98765 43210",          href: "tel:+919876543210" },
                    { Icon: Mail,   text: "raahindiaexperiences@gmail.com",      href: "mailto:raahindiaexperiences@gmail.com" },
                  ].map(({ Icon, text, href }) => (
                    <li key={text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <Icon size={13} style={{ color: ACC, marginTop: "3px", flexShrink: 0 }} />
                      {href
                        ? <a href={href} className="fl" style={{ fontFamily: IN, fontSize: "0.85rem", textDecoration: "none", fontWeight: 300, color: FT }}>{text}</a>
                        : <span style={{ fontFamily: IN, fontSize: "0.85rem", fontWeight: 300, color: FT }}>{text}</span>}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="fbook" style={{ padding: "10px 22px", fontFamily: IN, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Book Experience
                </Link>
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${FBD}`, padding: "16px 20px", textAlign: "center" }}>
              <p style={{ fontFamily: IN, fontSize: "0.7rem", color: "rgba(255,253,231,0.3)", fontWeight: 300, marginBottom: "3px" }}>
                © {new Date().getFullYear()} Raah India Experiences. All rights reserved.
              </p>
              <p style={{ fontFamily: IN, fontSize: "0.65rem", color: "rgba(255,253,231,0.18)", fontStyle: "italic" }}>
                Crafted with care · Jaipur, Rajasthan
              </p>
            </div>
          </div>
        </div>

        {/* ── DESKTOP FOOTER ── */}
        <div className="f-desktop" style={{ background: FG, color: FT }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "64px 32px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

              {/* Brand col */}
              <div>
                <div style={{ fontFamily: PF, fontSize: "1.65rem", fontWeight: 700, color: FTH, lineHeight: 1, marginBottom: "4px" }}>Raah India</div>
                <div style={{ fontFamily: IN, fontSize: "0.52rem", letterSpacing: "0.28em", textTransform: "uppercase", color: ACC, fontWeight: 600, marginBottom: "16px" }}>Curated Experiences · Jaipur</div>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.8, maxWidth: "220px", marginBottom: "22px", fontWeight: 300, color: FT }}>
                  Boutique walking tours & cultural experiences in Jaipur — for travellers who want depth, not destinations.
                </p>
                <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
                  {socialIcons.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="fs"
                      style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(245,166,35,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(245,166,35,0.55)", textDecoration: "none" }}
                    >{s.icon}</a>
                  ))}
                </div>
                {/* CTA in brand column */}
                <Link href="/contact" className="fbook" style={{ padding: "11px 24px", fontFamily: IN, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Book an Experience
                </Link>
              </div>

              {/* Experiences */}
              <div>
                <h3 style={{ color: FTH, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "18px" }}>Experiences</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {expLinks.map(([href, label]) => (
                    <li key={href}><Link href={href} className="fl" style={{ fontSize: "0.85rem", textDecoration: "none", fontWeight: 300, color: FT }}>{label}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Navigate */}
              <div>
                <h3 style={{ color: FTH, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "18px" }}>Navigate</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {navLinks.map(([href, label]) => (
                    <li key={href}><Link href={href} className="fl" style={{ fontSize: "0.85rem", textDecoration: "none", fontWeight: 300, color: FT }}>{label}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 style={{ color: FTH, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "18px" }}>Get in Touch</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
                  {[
                    { Icon: MapPin, text: "Jaipur, Rajasthan, India", href: null },
                    { Icon: Phone,  text: "+91  99280 26539",         href: "tel:+91 99280 26539" },
                    { Icon: Mail,   text: "raahindiaexperiences@gmail.com", href: "mailto:raahindiaexperiences@gmail.com" },
                  ].map(({ Icon, text, href }) => (
                    <li key={text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <Icon size={13} style={{ color: ACC, marginTop: "3px", flexShrink: 0 }} />
                      {href
                        ? <a href={href} className="fl" style={{ fontSize: "0.875rem", textDecoration: "none", fontWeight: 300, color: FT }}>{text}</a>
                        : <span style={{ fontSize: "0.875rem", fontWeight: 300, color: FT }}>{text}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: `1px solid ${FBD}` }}>
            <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "18px 32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
              <p style={{ fontSize: "0.72rem", color: "rgba(255,253,231,0.28)", fontWeight: 300 }}>
                © {new Date().getFullYear()} Raah India Experiences. All rights reserved.
              </p>
              <p style={{ fontSize: "0.68rem", color: "rgba(255,253,231,0.16)", fontStyle: "italic" }}>
                Crafted with care · Jaipur, Rajasthan
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .f-mobile  { display: block; }
        .f-desktop { display: none; }
        @media (min-width: 768px) {
          .f-mobile  { display: none !important; }
          .f-desktop { display: block !important; }
        }
      `}</style>
    </>
  );
}
