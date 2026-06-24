"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/experiences", label: "Experiences" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  /* Transparent on home hero, solid elsewhere */
  const solid = scrolled || !isHome;

  return (
    <header
      style={{
        background: solid ? "rgba(30,27,58,0.97)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        borderBottom: solid ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ─── Logo ─── */}
          <Link href="/" className="flex flex-col leading-none select-none">
            <span
              className="text-white text-xl md:text-2xl font-semibold tracking-wide"
              style={{ fontFamily: "Cormorant Garamond, Georgia, serif", letterSpacing: "0.02em" }}
            >
              Jaipur Walks
            </span>
            <span style={{ fontSize: "0.58rem", letterSpacing: "0.25em", color: "#c9943a", textTransform: "uppercase", fontWeight: 600, marginTop: "2px" }}>
              Curated Local Experiences
            </span>
          </Link>

          {/* ─── Desktop Nav ─── */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: pathname === l.href ? "#c9943a" : "rgba(255,255,255,0.78)",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={e => e.target.style.color = "#c9943a"}
                onMouseLeave={e => e.target.style.color = pathname === l.href ? "#c9943a" : "rgba(255,255,255,0.78)"}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 text-sm font-semibold px-5 py-2.5 transition-all duration-200"
              style={{
                background: "#c9943a",
                color: "#1e1b3a",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#e2b86a"}
              onMouseLeave={e => e.currentTarget.style.background = "#c9943a"}
            >
              Book Now
            </Link>
          </nav>

          {/* ─── Mobile Toggle ─── */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white rounded-sm"
            style={{ background: "rgba(255,255,255,0.06)" }}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ─── Mobile Drawer ─── */}
      <div
        style={{
          background: "rgba(30,27,58,0.98)",
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <nav className="flex flex-col px-6 py-6 gap-5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-base font-medium"
              style={{ color: pathname === l.href ? "#c9943a" : "rgba(255,255,255,0.8)", letterSpacing: "0.02em" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-1 text-center py-3 text-sm font-semibold"
            style={{ background: "#c9943a", color: "#1e1b3a", letterSpacing: "0.04em" }}
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
