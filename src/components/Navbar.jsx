"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/experiences", label: "Experiences" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "The Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !isHome;

  return (
    <>
      <style>{`
        .nl:hover { color: #B07D3E !important; }
        .nb { background: #1E4D3A !important; color: #F0EDE8 !important; transition: background .2s; }
        .nb:hover { background: #163529 !important; }
      `}</style>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: solid ? "rgba(15,25,20,0.97)" : "transparent",
        backdropFilter: solid ? "blur(16px)" : "none",
        borderBottom: solid ? "1px solid rgba(176,125,62,0.15)" : "none",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 20px" }} className="inner-pad">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: solid ? "68px" : "80px", transition: "height 0.4s ease" }}>

            <Link href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.55rem", fontWeight: 700, color: "white", lineHeight: 1 }}>Raah India</span>
              <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B07D3E", fontWeight: 500, marginTop: "3px" }}>Curated Experiences · Jaipur</span>
            </Link>

            <nav className="hidden md:flex" style={{ alignItems: "center", gap: "32px" }}>
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="nl"
                  style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.82rem", fontWeight: 500, color: pathname === l.href ? "#B07D3E" : "rgba(240,237,232,0.75)", textDecoration: "none", transition: "color 0.2s" }}
                >{l.label}</Link>
              ))}
              <Link href="/contact" className="nb"
                style={{ padding: "10px 24px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}
              >Book Now</Link>
            </nav>

            <button onClick={() => setOpen(!open)} className="md:hidden"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", padding: "8px", cursor: "pointer" }}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div style={{ background: "#F2F0EC", borderTop: "1px solid #C8D8D0", maxHeight: open ? "480px" : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
          <nav style={{ padding: "28px 20px", display: "flex", flexDirection: "column", gap: "18px" }}>
            {links.map((l) => (
              <Link key={l.href} href={l.href}
                style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.2rem", fontWeight: 600, color: pathname === l.href ? "#1E4D3A" : "#1A1F1C", textDecoration: "none", borderBottom: "1px solid #C8D8D0", paddingBottom: "16px" }}
              >{l.label}</Link>
            ))}
            <Link href="/contact"
              style={{ display: "block", textAlign: "center", background: "#1E4D3A", color: "#F0EDE8", padding: "14px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}
            >Book an Experience</Link>
          </nav>

        
        </div>
      </header>
    </>
  );
}
