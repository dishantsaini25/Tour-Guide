"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { experiences } from "@/data/experiences";
import { cloudImg } from "@/lib/cloudinaryImage";

// ── Raah India logo (Cloudinary-hosted) ──────────────────────────
const LOGO_URL = cloudImg("/Gemini_Generated_Image_bkyrx3bkyrx3bkyr.png");

// ── Static nav links ─────────────────────────────────────────────
const links = [
  { href: "/",            label: "Home" },
  { href: "/experiences", label: "Experiences", hasDropdown: true },
  { href: "/about",       label: "About" },
  { href: "/journal",     label: "The Journal" },
  { href: "/contact",     label: "Contact" },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [open,           setOpen]           = useState(false);   // mobile drawer
  const [dropdownOpen,   setDropdownOpen]   = useState(false);   // desktop dropdown
  const [expMobileOpen,  setExpMobileOpen]  = useState(false);   // mobile exp accordion
  const pathname  = usePathname();
  const isHome    = pathname === "/";
  const menuRef   = useRef(null);
  const toggleRef = useRef(null);
  const dropRef   = useRef(null);

  /* ── Scroll detection ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Close mobile drawer on route change ── */
  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
    setExpMobileOpen(false);
  }, [pathname]);

  /* ── Prevent body scroll when mobile drawer open ── */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ── ESC closes both mobile drawer and desktop dropdown ── */
  const handleClose = useCallback(() => {
    setOpen(false);
    setDropdownOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open && !dropdownOpen) return;
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, dropdownOpen, handleClose]);

  /* ── Close desktop dropdown when clicking outside ── */
  useEffect(() => {
    if (!dropdownOpen) return;
    const onClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [dropdownOpen]);

  /* ── Focus trap inside mobile drawer ── */
  useEffect(() => {
    if (!open || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll('a[href], button:not([disabled])');
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

        /* ── Experiences desktop dropdown trigger ── */
        .exp-trigger {
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          position: relative;
          transition: color 0.25s ease;
        }
        .exp-trigger::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 2px;
          background: #FF8C00;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .exp-trigger:hover { color: #FF8C00 !important; }
        .exp-trigger:hover::after,
        .exp-trigger.is-open::after { width: 100%; }
        .exp-trigger.nl-active::after { width: 100%; }

        /* ── Desktop dropdown panel ── */
        .exp-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 640px;
          background: rgba(255,255,255,0.99);
          border-radius: 14px;
          box-shadow: 0 8px 40px rgba(26,18,9,0.14), 0 2px 8px rgba(26,18,9,0.06);
          border: 1px solid rgba(255,216,155,0.5);
          padding: 20px 20px 16px;
          z-index: 10100;
          opacity: 0;
          pointer-events: none;
          transform: translateX(-50%) translateY(-8px);
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .exp-dropdown.is-open {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        /* ── Dropdown grid items ── */
        .exp-drop-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 8px;
          text-decoration: none !important;
          transition: background 0.18s ease;
        }
        .exp-drop-item:hover {
          background: rgba(255,140,0,0.07);
        }
        .exp-drop-item:hover .exp-drop-title {
          color: #FF8C00 !important;
        }
        .exp-drop-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FF8C00;
          flex-shrink: 0;
          opacity: 0.5;
          transition: opacity 0.18s ease;
        }
        .exp-drop-item:hover .exp-drop-dot { opacity: 1; }
        .exp-drop-title {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          color: #3D2E0E;
          transition: color 0.18s ease;
          white-space: nowrap;
        }

        /* ── Dropdown "View All" footer link ── */
        .exp-drop-all {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #FF8C00;
          text-decoration: none;
          transition: gap 0.2s ease;
        }
        .exp-drop-all:hover { gap: 10px; color: #E07800; }

        /* ── Hamburger icon lines → X animation ── */
        .hb-btn { align-items: center; justify-content: center; }
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
        .hb-wrap.is-open .hb-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hb-wrap.is-open .hb-line:nth-child(2) { opacity: 0; width: 0; }
        .hb-wrap.is-open .hb-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile overlay backdrop ── */
        .mob-overlay {
          position: fixed; inset: 0; z-index: 9998;
          background: rgba(26,18,9,0.65);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .mob-overlay.is-open { opacity: 1; pointer-events: auto; }

        /* ── Mobile drawer panel ── */
        .mob-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          z-index: 9999;
          width: min(320px, 85vw);
          background: #FFFBF0;
          box-shadow: -8px 0 48px rgba(0,0,0,0.18), -2px 0 0 rgba(255,216,155,0.6);
          display: flex; flex-direction: column;
          padding: 0;
          transform: translateX(100%);
          transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
          will-change: transform;
          padding-top: env(safe-area-inset-top, 0px);
        }
        .mob-drawer.is-open { transform: translateX(0); }

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
          min-width: 38px; min-height: 38px;
        }
        .mob-close:hover { background: rgba(255,140,0,0.16); box-shadow: 0 0 10px rgba(255,140,0,0.22); }
        .mob-close:focus-visible { outline: 2px solid #FF8C00; outline-offset: 2px; }

        /* ── Mobile nav links ── */
        .mob-link {
          display: flex; align-items: center;
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
        .mob-link::before {
          content: '';
          position: absolute; left: 0; top: 50%;
          transform: translateY(-50%) scaleY(0);
          width: 3px; height: 60%;
          background: linear-gradient(to bottom, #FF8C00, #F5A623);
          border-radius: 0 2px 2px 0;
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .mob-link:hover, .mob-link:focus-visible { color: #FF8C00; padding-left: 14px; }
        .mob-link:hover::before, .mob-link:focus-visible::before { transform: translateY(-50%) scaleY(1); }
        .mob-link:focus-visible { outline: none; }
        .mob-link-active { color: #FF8C00 !important; padding-left: 14px; }
        .mob-link-active::before { transform: translateY(-50%) scaleY(1) !important; }

        /* ── Mobile Experiences accordion trigger ── */
        .mob-exp-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: none;
          border: none;
          border-bottom: 1px solid rgba(255,216,155,0.5);
          padding: 14px 0;
          cursor: pointer;
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1A1209;
          position: relative;
          transition: color 0.2s ease, padding-left 0.2s ease;
          outline: none;
        }
        .mob-exp-trigger::before {
          content: '';
          position: absolute; left: 0; top: 50%;
          transform: translateY(-50%) scaleY(0);
          width: 3px; height: 60%;
          background: linear-gradient(to bottom, #FF8C00, #F5A623);
          border-radius: 0 2px 2px 0;
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .mob-exp-trigger.is-active,
        .mob-exp-trigger:hover { color: #FF8C00; padding-left: 14px; }
        .mob-exp-trigger.is-active::before,
        .mob-exp-trigger:hover::before { transform: translateY(-50%) scaleY(1); }
        .mob-exp-trigger:focus-visible { outline: none; }

        /* ── Mobile Experiences chevron ── */
        .mob-exp-chevron {
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
          flex-shrink: 0;
        }
        .mob-exp-chevron.is-open { transform: rotate(180deg); }

        /* ── Mobile Experiences sub-list ── */
        .mob-exp-list {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.32s cubic-bezier(0.4,0,0.2,1);
          background: rgba(255,248,230,0.5);
          border-bottom: 1px solid rgba(255,216,155,0.5);
        }
        .mob-exp-list.is-open { max-height: 600px; }
        .mob-exp-sub-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          text-decoration: none;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: #3D2E0E;
          border-bottom: 1px solid rgba(255,216,155,0.3);
          transition: color 0.18s ease, background 0.18s ease;
        }
        .mob-exp-sub-link:last-child { border-bottom: none; }
        .mob-exp-sub-link:hover { color: #FF8C00; background: rgba(255,140,0,0.05); }
        .mob-exp-sub-link::before {
          content: '';
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #FF8C00;
          opacity: 0.45;
          flex-shrink: 0;
        }
        .mob-exp-sub-link:hover::before { opacity: 1; }

        /* ── Mobile Book CTA ── */
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
          box-shadow: 0 0 0 4px rgba(255,140,0,0.13), 0 0 22px rgba(255,140,0,0.50), 0 8px 24px rgba(255,140,0,0.28) !important;
        }
        .mob-book:active { transform: translateY(0) scale(1); }
        .mob-book:focus-visible { outline: 2px solid #FF8C00; outline-offset: 3px; }
      `}</style>

      {/* ── Fixed header bar ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 10000,
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

            {/* ── Logo ── */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
              <Image
                src={LOGO_URL}
                alt="Raah India"
                width={120}
                height={48}
                style={{
                  height: solid ? "40px" : "48px",
                  width: "auto",
                  objectFit: "contain",
                  transition: "height 0.4s ease",
                }}
                priority
              />
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex" style={{ alignItems: "center", gap: "32px" }}>
              {links.map((l) => {
                const isActive = pathname === l.href || (l.hasDropdown && pathname.startsWith("/experiences"));

                if (l.hasDropdown) {
                  return (
                    <div key={l.href} ref={dropRef} style={{ position: "relative" }}>
                      {/* Trigger: clicking navigates to /experiences; chevron toggles dropdown */}
                      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <Link
                          href={l.href}
                          className={`nl${isActive ? " nl-active" : ""}`}
                          style={{
                            fontFamily: "DM Sans, system-ui, sans-serif",
                            fontSize: "0.82rem", fontWeight: 700,
                            color: isActive ? "#FF8C00" : solid ? "#3D2E0E" : "rgba(255,255,255,0.88)",
                            textDecoration: "none", transition: "color 0.25s ease",
                          }}
                        >
                          {l.label}
                        </Link>
                        <button
                          onClick={() => setDropdownOpen(o => !o)}
                          aria-expanded={dropdownOpen}
                          aria-label="Toggle experiences menu"
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            padding: "2px 2px 0",
                            color: isActive ? "#FF8C00" : solid ? "#3D2E0E" : "rgba(255,255,255,0.88)",
                            display: "flex", alignItems: "center",
                            transition: "color 0.25s ease",
                          }}
                        >
                          <ChevronDown
                            size={14}
                            style={{
                              transition: "transform 0.25s ease",
                              transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          />
                        </button>
                      </div>

                      {/* ── Dropdown panel ── */}
                      <div className={`exp-dropdown${dropdownOpen ? " is-open" : ""}`}>
                        {/* Header row */}
                        <div style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          marginBottom: "12px", paddingBottom: "10px",
                          borderBottom: "1px solid rgba(255,216,155,0.5)",
                        }}>
                          <span style={{
                            fontFamily: "DM Sans, system-ui, sans-serif",
                            fontSize: "0.58rem", letterSpacing: "0.28em",
                            textTransform: "uppercase", fontWeight: 700, color: "#FF8C00",
                          }}>
                            All Experiences
                          </span>
                          <Link href="/experiences" className="exp-drop-all" onClick={() => setDropdownOpen(false)}>
                            View All
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </Link>
                        </div>

                        {/* Experience grid — 2 columns */}
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "2px",
                        }}>
                          {experiences.map((exp) => (
                            <Link
                              key={exp.slug}
                              href={`/experiences/${exp.slug}`}
                              className="exp-drop-item"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <span className="exp-drop-dot" />
                              <span className="exp-drop-title">{exp.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link key={l.href} href={l.href}
                    className={`nl${pathname === l.href ? " nl-active" : ""}`}
                    style={{
                      fontFamily: "DM Sans, system-ui, sans-serif",
                      fontSize: "0.82rem", fontWeight: 700,
                      color: pathname === l.href ? "#FF8C00" : solid ? "#3D2E0E" : "rgba(255,255,255,0.88)",
                      textDecoration: "none", transition: "color 0.25s ease",
                    }}
                  >{l.label}</Link>
                );
              })}

              {/* Book Now */}
              <button
                onClick={() => window.dispatchEvent(new Event("raah:open-enquiry"))}
                className="nb"
                style={{ padding: "10px 24px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#FFFFFF", border: "none", cursor: "pointer" }}
              >Book Now</button>
            </nav>

            {/* ── Hamburger toggle — mobile only ── */}
            <button
              ref={toggleRef}
              onClick={() => setOpen(o => !o)}
              className="md:hidden hb-btn"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
              style={{
                position: "relative", zIndex: 10001,
                background: open ? "rgba(255,140,0,0.15)" : solid ? "rgba(255,140,0,0.08)" : "rgba(255,255,255,0.12)",
                border: `1.5px solid ${open ? "#FF8C00" : solid ? "rgba(255,140,0,0.25)" : "rgba(255,255,255,0.30)"}`,
                color: open ? "#FF8C00" : solid ? "#FF8C00" : "#FFFFFF",
                padding: "10px 12px", borderRadius: "8px",
                cursor: "pointer", flexShrink: 0,
                transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
                outline: "none",
              }}
            >
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

      {/* ── Mobile slide-in drawer ── */}
      <div
        id="mobile-nav-drawer"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`mob-drawer${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        {/* Drawer header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px",
          background: "#FFFFFF",
          borderBottom: "1px solid rgba(255,216,155,0.6)",
          flexShrink: 0, minHeight: "64px",
        }}>
          <span style={{
            fontFamily: "DM Sans, system-ui, sans-serif",
            fontSize: "0.58rem", letterSpacing: "0.28em",
            textTransform: "uppercase", fontWeight: 700, color: "#FF8C00",
          }}>
            Navigation
          </span>
          <button className="mob-close" onClick={handleClose} aria-label="Close navigation menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "8px 24px 0", overflowY: "auto" }}>
          {links.map((l) => {
            const isActive = pathname === l.href || (l.hasDropdown && pathname.startsWith("/experiences"));

            if (l.hasDropdown) {
              return (
                <div key={l.href}>
                  {/* Accordion trigger */}
                  <button
                    className={`mob-exp-trigger${isActive || expMobileOpen ? " is-active" : ""}`}
                    onClick={() => setExpMobileOpen(o => !o)}
                    aria-expanded={expMobileOpen}
                  >
                    <span>{l.label}</span>
                    <ChevronDown
                      size={18}
                      className={`mob-exp-chevron${expMobileOpen ? " is-open" : ""}`}
                    />
                  </button>

                  {/* Experience sub-links */}
                  <div className={`mob-exp-list${expMobileOpen ? " is-open" : ""}`}>
                    {/* "All experiences" shortcut */}
                    <Link
                      href="/experiences"
                      className="mob-exp-sub-link"
                      style={{ fontWeight: 700, color: "#FF8C00", borderBottom: "1px solid rgba(255,216,155,0.4)" }}
                    >
                      View All Experiences →
                    </Link>
                    {experiences.map((exp) => (
                      <Link
                        key={exp.slug}
                        href={`/experiences/${exp.slug}`}
                        className="mob-exp-sub-link"
                      >
                        {exp.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

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
          <button
            className="mob-book"
            onClick={() => {
              handleClose();
              setTimeout(() => window.dispatchEvent(new Event("raah:open-enquiry")), 320);
            }}
          >
            Book an Experience
          </button>
        </div>
      </div>
    </>
  );
}
