"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/",            label: "Home" },
  { href: "/experiences", label: "Experiences" },
  { href: "/about",       label: "About" },
  { href: "/journal",     label: "The Journal" },
  { href: "/contact",     label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname                = usePathname();
  const isHome                  = pathname === "/";
  const menuRef                 = useRef(null);
  const toggleRef               = useRef(null);

  /* ── Scroll detection ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Close on route change ── */
  useEffect(() => setOpen(false), [pathname]);

  /* ── Prevent body scroll when menu open ── */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ── ESC to close ── */
  const handleClose = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  /* ── Focus trap inside drawer ── */
  useEffect(() => {
    if (!open || !menuRef.current) return;
    // Focus first focusable element when opened
    const focusable = menuRef.current.querySelectorAll(
      'a[href], button:not([disabled])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [open]);

  const solid = scrolled || !isHome;

  return (
    <>
      <style>{`
        /* ── Desktop nav links ── */
        .nl {
          position: relative;
          text-decoration: none !important;
          font-weight: 700 !important;
          transition: color 0.25s ease;
        }
        .nl::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 2px;
          background: #FF8C00;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .nl:hover { color: #FF8C00 !important; }
        .nl:hover::after { width: 100%; }
        .nl-active::after { width: 100%; }

        /* ── Desktop Book Now button ── */
        .nb {
          background: linear-gradient(135deg, #E07800 0%, #F5A623 50%, #FF8C00 50%, #FF8C00 100%) !important;
          background-size: 200% 100% !important;
          background-position: 100% 0 !important;
          color: #FFFFFF !important;
          border-radius: 10px !important;
          box-shadow: 0 2px 10px rgba(255,140,0,0.20);
          transition: background-position 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease !important;
        }
        .nb:hover, .nb:focus-visible {
          background-position: 0% 0 !important;
          color: #FFFFFF !important;
          box-shadow: 0 8px 24px rgba(255,140,0,0.42) !important;
          transform: translateY(-1px);
        }
        .nb:active { transform: translateY(0); }

        /* ── Hamburger icon lines → X animation ── */
        .hb-btn {
          /* flex centering for the icon — only active when element is displayed */
          align-items: center;
          justify-content: center;
        }
        .hb-wrap {
          width: 22px; height: 16px;
          display: flex; flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .hb-line {
          display: block;
          height: 2px; width: 100%;
          background: currentColor;
          border-radius: 2px;
          transform-origin: center;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1),
                      opacity   0.25s ease,
                      width     0.3s ease;
        }
        /* Open state — top & bottom rotate into X, middle fades out */
        .hb-wrap.is-open .hb-line:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hb-wrap.is-open .hb-line:nth-child(2) {
          opacity: 0; width: 0;
        }
        .hb-wrap.is-open .hb-line:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* ── Mobile overlay backdrop ── */
        .mob-overlay {
          position: fixed; inset: 0; z-index: 9998;
          background: rgba(26,18,9,0.65);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .mob-overlay.is-open {
          opacity: 1; pointer-events: auto;
        }

        /* ── Mobile drawer panel ── */
        .mob-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          z-index: 9999;
          width: min(320px, 85vw);
          /* Fully opaque — no hero bleed-through */
          background: #FFFBF0;
          box-shadow: -8px 0 48px rgba(0,0,0,0.18), -2px 0 0 rgba(255,216,155,0.6);
          display: flex; flex-direction: column;
          padding: 0;
          transform: translateX(100%);
          transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
          will-change: transform;
          /* Safe-area padding for notched phones */
          padding-top: env(safe-area-inset-top, 0px);
        }
        .mob-drawer.is-open {
          transform: translateX(0);
        }

        /* ── Mobile drawer close button ── */
        .mob-close {
          background: rgba(255,140,0,0.08);
          border: 1px solid rgba(255,140,0,0.20);
          cursor: pointer;
          color: #FF8C00;
          padding: 9px;
          border-radius: 8px;
          transition: background 0.2s ease, box-shadow 0.2s ease;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          min-width: 38px; min-height: 38px;    /* guaranteed tap target */
        }
        .mob-close:hover { background: rgba(255,140,0,0.16); box-shadow: 0 0 10px rgba(255,140,0,0.22); }
        .mob-close:focus-visible { outline: 2px solid #FF8C00; outline-offset: 2px; }

        /* ── Mobile nav links ── */
        .mob-link {
          display: flex; align-items: center;
          gap: 0;
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.25rem; font-weight: 600;
          color: #1A1209;
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,216,155,0.5);
          position: relative;
          transition: color 0.2s ease, padding-left 0.2s ease;
          outline: none;
        }
        /* Left accent bar */
        .mob-link::before {
          content: '';
          position: absolute; left: 0; top: 50%;
          transform: translateY(-50%) scaleY(0);
          width: 3px; height: 60%;
          background: linear-gradient(to bottom, #FF8C00, #F5A623);
          border-radius: 0 2px 2px 0;
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .mob-link:hover, .mob-link:focus-visible {
          color: #FF8C00;
          padding-left: 14px;
        }
        .mob-link:hover::before, .mob-link:focus-visible::before {
          transform: translateY(-50%) scaleY(1);
        }
        .mob-link:focus-visible { outline: none; } /* handled by ::before accent */
        .mob-link-active {
          color: #FF8C00 !important;
          padding-left: 14px;
        }
        .mob-link-active::before {
          transform: translateY(-50%) scaleY(1) !important;
        }

        /* ── Mobile Book CTA — pill, glow-only hover ── */
        .mob-book {
          display: block; text-align: center;
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 55%, #C45E00 100%);
          color: #FFFFFF !important;
          padding: 15px 24px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.85rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none;
          border-radius: 9999px;
          box-shadow: 0 4px 16px rgba(255,140,0,0.30);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .mob-book:hover, .mob-book:focus-visible {
          color: #FFFFFF !important;
          transform: translateY(-2px) scale(1.03);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.13),
            0 0 22px rgba(255,140,0,0.50),
            0 8px 24px rgba(255,140,0,0.28) !important;
        }
        .mob-book:active { transform: translateY(0) scale(1); }
        .mob-book:focus-visible { outline: 2px solid #FF8C00; outline-offset: 3px; }
      `}</style>

      {/* ── Fixed header bar ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 10000,
        /* Always solid when drawer is open so navbar logo is crisp above the overlay */
        background: (solid || open) ? "rgba(255,255,255,0.98)" : "transparent",
        backdropFilter: (solid || open) ? "blur(16px)" : "none",
        WebkitBackdropFilter: (solid || open) ? "blur(16px)" : "none",
        borderBottom: "none",
        boxShadow: (solid || open) ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
      }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 20px" }} className="inner-pad">
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: solid ? "68px" : "80px",
            transition: "height 0.4s ease",
          }}>

            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.55rem", fontWeight: 700, color: (solid || open) ? "#1A1209" : "white", lineHeight: 1, transition: "color 0.3s" }}>
                Raah India
              </span>
              <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#FF8C00", fontWeight: 500 }}>
                Curated Experiences · Jaipur
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex" style={{ alignItems: "center", gap: "32px" }}>
              {links.map((l) => (
                <Link key={l.href} href={l.href}
                  className={`nl${pathname === l.href ? " nl-active" : ""}`}
                  style={{
                    fontFamily: "DM Sans, system-ui, sans-serif",
                    fontSize: "0.82rem", fontWeight: 700,
                    color: pathname === l.href ? "#FF8C00" : solid ? "#3D2E0E" : "rgba(255,255,255,0.88)",
                    textDecoration: "none", transition: "color 0.25s ease",
                  }}
                >{l.label}</Link>
              ))}
              <Link href="/contact" className="nb"
                style={{ padding: "10px 24px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", color: "#FFFFFF" }}
              >Book Now</Link>
            </nav>

            {/* Hamburger toggle — mobile only (md:hidden hides it at ≥768px) */}
            <button
              ref={toggleRef}
              onClick={() => setOpen(o => !o)}
              className="md:hidden hb-btn"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
              style={{
                /* No display property here — Tailwind md:hidden owns it.
                   flex centering applied via the hb-btn CSS class below. */
                position: "relative",
                zIndex: 10001,
                background: open
                  ? "rgba(255,140,0,0.15)"
                  : solid ? "rgba(255,140,0,0.08)" : "rgba(255,255,255,0.12)",
                border: `1.5px solid ${open ? "#FF8C00" : solid ? "rgba(255,140,0,0.25)" : "rgba(255,255,255,0.30)"}`,
                color: open ? "#FF8C00" : solid ? "#FF8C00" : "#FFFFFF",
                padding: "10px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                flexShrink: 0,
                transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
                outline: "none",
              }}
            >
              {/* Animated hamburger → X */}
              <span className={`hb-wrap${open ? " is-open" : ""}`} aria-hidden="true">
                <span className="hb-line" />
                <span className="hb-line" />
                <span className="hb-line" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Backdrop overlay ── */}
      <div
        className={`mob-overlay${open ? " is-open" : ""}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ── Slide-in drawer ── */}
      <div
        id="mobile-nav-drawer"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`mob-drawer${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        {/* Drawer header — close button only, no duplicate branding */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: "#FFFFFF",
          borderBottom: "1px solid rgba(255,216,155,0.6)",
          flexShrink: 0,
          minHeight: "64px",
        }}>
          <span style={{
            fontFamily: "DM Sans, system-ui, sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#FF8C00",
          }}>
            Navigation
          </span>
          <button
            className="mob-close"
            onClick={handleClose}
            aria-label="Close navigation menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "8px 24px 0", overflowY: "auto" }}>
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`mob-link${isActive ? " mob-link-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA at bottom */}
        <div style={{ padding: "28px 24px 36px" }}>
          <Link href="/contact" className="mob-book">
            Book an Experience
          </Link>
        </div>
      </div>
    </>
  );
}
