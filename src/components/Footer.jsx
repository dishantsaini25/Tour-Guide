"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, Plus, Minus } from "lucide-react";

const FG  = "#0A1F15";
const FT  = "rgba(240,237,232,0.55)";
const FTH = "#F0EDE8";
const FBD = "rgba(176,125,62,0.14)";
const GO  = "#B07D3E";
const IV  = "#E8F0EC";
const MR  = "#1E4D3A";
const BD  = "#C8D8D0";
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
        .fl:hover { color:${GO}!important; }
        .fs:hover { border-color:${GO}!important; color:${GO}!important; }
        .fbook:hover { background:${GO}!important; color:${FG}!important; border-color:${GO}!important; }
      `}</style>
      <footer style={{ fontFamily: IN }}>

        {/* Signature strip */}
        <div style={{ background: IV, borderTop: `2px solid ${MR}`, borderBottom: `1px solid ${BD}`, padding: "20px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: PF, fontSize: "1rem", fontStyle: "italic", color: MR, fontWeight: 500 }}>
            "Walk Slowly. Listen Deeply.{" "}
            <em style={{ color: GO, fontStyle: "normal", fontWeight: 600 }}>Experience Authentically.</em>"
          </p>
        </div>

        {/* ── MOBILE FOOTER ── */}
        <div className="f-mobile" style={{ background: FG, color: FT }} aria-label="Site footer">

          {/* Collapsed header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: mobileOpen ? `1px solid ${FBD}` : "none" }}>
            <div>
              <div style={{ fontFamily: PF, fontSize: "1.25rem", fontWeight: 700, color: FTH, lineHeight: 1 }}>Raah India</div>
              <div style={{ fontFamily: IN, fontSize: "0.48rem", letterSpacing: "0.24em", textTransform: "uppercase", color: GO, fontWeight: 600, marginTop: "3px" }}>Curated Experiences · Jaipur</div>
            </div>
            <button onClick={() => setMobileOpen(p => !p)}
              aria-expanded={mobileOpen} aria-controls="mobile-footer-body"
              aria-label={mobileOpen ? "Collapse footer" : "Expand footer"}
              style={{ width: "44px", height: "44px", borderRadius: "50%", border: `1.5px solid rgba(176,125,62,0.35)`, background: "transparent", color: GO, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              {mobileOpen ? <Minus size={16} /> : <Plus size={16} />}
            </button>
          </div>

          {/* Expandable body */}
          <div id="mobile-footer-body" style={{ overflow: "hidden", maxHeight: mobileOpen ? "1200px" : "0px", opacity: mobileOpen ? 1 : 0, transition: "max-height .45s ease, opacity .35s ease" }}>
            <div style={{ padding: "28px 20px 0" }}>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <div style={{ fontFamily: PF, fontSize: "1.5rem", fontWeight: 700, color: FTH, marginBottom: "4px" }}>Raah India</div>
                <div style={{ fontFamily: IN, fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: GO, fontWeight: 600, marginBottom: "12px" }}>Curated Experiences · Jaipur</div>
                <p style={{ fontFamily: IN, fontSize: "0.82rem", lineHeight: 1.75, color: FT, fontWeight: 300, maxWidth: "280px", margin: "0 auto 16px" }}>
                  Boutique walking tours & cultural experiences in Jaipur — for travellers who want depth, not destinations.
                </p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                  {socialIcons.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="fs"
                      style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(240,237,232,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(240,237,232,0.45)", textDecoration: "none", transition: "all .2s" }}
                    >{s.icon}</a>
                  ))}
                </div>
              </div>

              <div style={{ height: "1px", background: FBD, marginBottom: "28px" }} />

              {/* Two-col links */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", marginBottom: "28px" }}>
                <div>
                  <h3 style={{ fontFamily: IN, color: FTH, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "14px" }}>Experiences</h3>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "11px" }}>
                    {expLinks.map(([href, label]) => (
                      <li key={href}><Link href={href} className="fl" style={{ fontFamily: IN, fontSize: "0.82rem", textDecoration: "none", color: FT, transition: "color .2s", fontWeight: 300, display: "block", lineHeight: 1.4 }}>{label}</Link></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontFamily: IN, color: FTH, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "14px" }}>Navigate</h3>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "11px" }}>
                    {navLinks.map(([href, label]) => (
                      <li key={href}><Link href={href} className="fl" style={{ fontFamily: IN, fontSize: "0.82rem", textDecoration: "none", color: FT, transition: "color .2s", fontWeight: 300, display: "block", lineHeight: 1.4 }}>{label}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ height: "1px", background: FBD, marginBottom: "28px" }} />

              {/* Get in Touch */}
              <div style={{ marginBottom: "28px" }}>
                <h3 style={{ fontFamily: IN, color: FTH, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "16px" }}>Get in Touch</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "13px", marginBottom: "18px" }}>
                  {[
                    { Icon: MapPin, text: "Jaipur, Rajasthan, India", href: null },
                    { Icon: Phone,  text: "+91 98765 43210",          href: "tel:+919876543210" },
                    { Icon: Mail,   text: "hello@raahindia.com",      href: "mailto:hello@raahindia.com" },
                  ].map(({ Icon, text, href }) => (
                    <li key={text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <Icon size={13} style={{ color: GO, marginTop: "3px", flexShrink: 0 }} />
                      {href ? <a href={href} className="fl" style={{ fontFamily: IN, fontSize: "0.85rem", textDecoration: "none", transition: "color .2s", fontWeight: 300 }}>{text}</a>
                             : <span style={{ fontFamily: IN, fontSize: "0.85rem", fontWeight: 300 }}>{text}</span>}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="fbook"
                  style={{ display: "inline-block", border: `1px solid rgba(176,125,62,0.4)`, color: GO, padding: "10px 20px", fontFamily: IN, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", transition: "all .2s" }}
                >Book Experience</Link>
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${FBD}`, padding: "16px 20px", textAlign: "center" }}>
              <p style={{ fontFamily: IN, fontSize: "0.7rem", color: "rgba(240,237,232,0.25)", fontWeight: 300, marginBottom: "3px" }}>
                © {new Date().getFullYear()} Raah India Experiences. All rights reserved.
              </p>
              <p style={{ fontFamily: IN, fontSize: "0.65rem", color: "rgba(240,237,232,0.15)", fontStyle: "italic" }}>
                Crafted with care · Jaipur, Rajasthan
              </p>
            </div>
          </div>
        </div>

        {/* ── DESKTOP FOOTER ── */}
        <div className="f-desktop" style={{ background: FG, color: FT }}>
          <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "60px 32px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div>
                <div style={{ fontFamily: PF, fontSize: "1.65rem", fontWeight: 700, color: FTH, lineHeight: 1, marginBottom: "4px" }}>Raah India</div>
                <div style={{ fontFamily: IN, fontSize: "0.52rem", letterSpacing: "0.28em", textTransform: "uppercase", color: GO, fontWeight: 600, marginBottom: "16px" }}>Curated Experiences · Jaipur</div>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.8, maxWidth: "220px", marginBottom: "20px", fontWeight: 300 }}>Boutique walking tours & cultural experiences in Jaipur — for travellers who want depth, not destinations.</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  {socialIcons.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="fs"
                      style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(240,237,232,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(240,237,232,0.45)", textDecoration: "none", transition: "all .2s" }}
                    >{s.icon}</a>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ color: FTH, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "18px" }}>Experiences</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {expLinks.map(([href, label]) => (
                    <li key={href}><Link href={href} className="fl" style={{ fontSize: "0.85rem", textDecoration: "none", transition: "color .2s", fontWeight: 300 }}>{label}</Link></li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ color: FTH, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "18px" }}>Navigate</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {navLinks.map(([href, label]) => (
                    <li key={href}><Link href={href} className="fl" style={{ fontSize: "0.85rem", textDecoration: "none", transition: "color .2s", fontWeight: 300 }}>{label}</Link></li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ color: FTH, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: "18px" }}>Get in Touch</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
                  {[
                    { Icon: MapPin, text: "Jaipur, Rajasthan, India", href: null },
                    { Icon: Phone,  text: "+91 98765 43210",          href: "tel:+919876543210" },
                    { Icon: Mail,   text: "hello@raahindia.com",      href: "mailto:hello@raahindia.com" },
                  ].map(({ Icon, text, href }) => (
                    <li key={text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <Icon size={13} style={{ color: GO, marginTop: "3px", flexShrink: 0 }} />
                      {href ? <a href={href} className="fl" style={{ fontSize: "0.875rem", textDecoration: "none", transition: "color .2s", fontWeight: 300 }}>{text}</a>
                             : <span style={{ fontSize: "0.875rem", fontWeight: 300 }}>{text}</span>}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="fbook"
                  style={{ display: "inline-block", border: `1px solid rgba(176,125,62,0.4)`, color: GO, padding: "9px 18px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", transition: "all .2s" }}
                >Book Experience</Link>
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${FBD}` }}>
            <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "18px 32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
              <p style={{ fontSize: "0.72rem", color: "rgba(240,237,232,0.25)", fontWeight: 300 }}>© {new Date().getFullYear()} Raah India Experiences. All rights reserved.</p>
              <p style={{ fontSize: "0.68rem", color: "rgba(240,237,232,0.15)", fontStyle: "italic" }}>Crafted with care · Jaipur, Rajasthan</p>
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
