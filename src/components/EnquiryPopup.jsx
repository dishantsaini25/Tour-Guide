"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, Loader2, CheckCircle2 } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────── */
const WA_URL =
  "https://wa.me/919929992539?text=Hi+Raah+Experiences%2C+I%27m+interested+in+planning+a+Jaipur+experience.+I%27d+like+to+know+more.";

const POPUP_SUBMITTED_KEY = "raah_popup_submitted";
const POPUP_CLOSED_KEY    = "raah_popup_closed_at";

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";

const expOptions = [
  "Jaipur at Dawn (Morning Walk & Breakfast)",
  "The Ridge & Ramparts (Amber Heritage Trek)",
  "The Blue Hour (Evening Jeep Experience)",
  "Beyond the Pink (Evening Heritage & Food Walk)",
  "The Farm & Fire (Countryside Cooking Masterclass)",
  "The Cosmic & Imperial Triad (Hawa Mahal, Jantar Mantar & City Palace)",
  "The Living Walled City",
  "The Lost Kingdom (Weekend Wilderness Trail)",
  "The Artisan's Jaipur (Craft Lanes Walk)",
  "Combo: Soul of Jaipur — Jaipur at Dawn + Beyond the Pink",
  "Combo: Nature & Kingdom — Lost Kingdom + Ridge & Ramparts",
  "Combo: Jaipur Through Time — Dawn + Amber + Blue Hour",
  "Custom / Not Sure Yet",
];

/* ─────────────────────────────────────────────────────────────────
   VALIDATION HELPERS
───────────────────────────────────────────────────────────────── */
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone = (v) => /^[\+]?[\d\s\-\(\)]{7,20}$/.test(v.trim());

/* ─────────────────────────────────────────────────────────────────
   FIELD + INPUT STYLES
───────────────────────────────────────────────────────────────── */
const fldBase = {
  width: "100%",
  padding: "11px 14px",
  fontFamily: IN,
  fontSize: "0.88rem",
  color: "#1A1209",
  background: "#FFFFFF",
  border: "1.5px solid #FFD89B",
  borderRadius: "12px",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  appearance: "none",
  WebkitAppearance: "none",
  boxSizing: "border-box",
};
const fldErr = {
  ...fldBase,
  borderColor: "#E07800",
  boxShadow: "0 0 0 3px rgba(255,140,0,0.12)",
};
const lblStyle = {
  display: "block",
  fontFamily: IN,
  fontSize: "0.6rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontWeight: 700,
  color: "#6B5B2E",
  marginBottom: "5px",
};

function onFocus(e) {
  e.target.style.borderColor = "#FF8C00";
  e.target.style.boxShadow   = "0 0 0 3px rgba(255,140,0,0.14)";
}
function onBlurReset(e) {
  e.target.style.borderColor = "#FFD89B";
  e.target.style.boxShadow   = "none";
}

/* ─────────────────────────────────────────────────────────────────
   WA ICON SVG
───────────────────────────────────────────────────────────────── */
const WaIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────
   MAIN POPUP COMPONENT
───────────────────────────────────────────────────────────────── */
export default function EnquiryPopup() {
  const [open, setOpen]     = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [form, setForm]     = useState({
    name: "", email: "", phone: "", experience: "",
    date: "", guests: "", message: "",
  });

  // Refs for trigger management
  const triggeredRef      = useRef(false); // was popup ever shown this session?
  const closedAtRef       = useRef(null);  // timestamp when user closed it
  const scrollListenerRef = useRef(null);
  const timerRef          = useRef(null);
  const exitListenerRef   = useRef(null);
  const popupRef          = useRef(null);
  const firstFocusRef     = useRef(null);

  /* ── shouldShow: guard against showing after submission ── */
  const shouldShow = useCallback(() => {
    if (typeof sessionStorage === "undefined") return false;
    return !sessionStorage.getItem(POPUP_SUBMITTED_KEY);
  }, []);

  /* ── openPopup: only once unless conditions met ── */
  const openPopup = useCallback(() => {
    if (!shouldShow()) return;
    if (open) return;
    triggeredRef.current = true;
    setOpen(true);
  }, [open, shouldShow]);

  /* ── closePopup ── */
  const closePopup = useCallback(() => {
    setOpen(false);
    closedAtRef.current = Date.now();
  }, []);

  /* ─────────────────────────────────────────────────────
     TRIGGER LOGIC
  ───────────────────────────────────────────────────── */
  useEffect(() => {
    if (!shouldShow()) return;

    const isMobile = window.innerWidth < 768;

    /* Cleanup helpers */
    const clearAllListeners = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (scrollListenerRef.current) {
        window.removeEventListener("scroll", scrollListenerRef.current);
        scrollListenerRef.current = null;
      }
      if (exitListenerRef.current) {
        document.removeEventListener("mouseleave", exitListenerRef.current);
        exitListenerRef.current = null;
      }
    };

    /* ── PRIMARY: Time-based (8–10s) ── */
    const INITIAL_DELAY = isMobile ? 10000 : 9000;
    timerRef.current = setTimeout(() => {
      if (!triggeredRef.current && shouldShow()) {
        openPopup();
        clearAllListeners();
      }
    }, INITIAL_DELAY);

    /* ── SECONDARY: Scroll (50% page) — fires first on mobile, 40% on desktop ── */
    const SCROLL_THRESHOLD = isMobile ? 0.50 : 0.42;
    const scrollHandler = () => {
      if (triggeredRef.current) return;

      // Respect re-show cooldown (closed + 30s must have passed)
      if (closedAtRef.current && Date.now() - closedAtRef.current < 30000) return;

      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= SCROLL_THRESHOLD && shouldShow()) {
        openPopup();
        clearAllListeners();
      }
    };
    scrollListenerRef.current = scrollHandler;
    window.addEventListener("scroll", scrollHandler, { passive: true });

    /* ── EXIT INTENT: Desktop only — mouse leaving top of viewport ── */
    if (!isMobile) {
      let exitFired = false;
      const exitHandler = (e) => {
        if (exitFired) return;
        if (triggeredRef.current) return;
        if (e.clientY <= 10) {
          exitFired = true;
          if (shouldShow()) {
            openPopup();
            clearAllListeners();
          }
        }
      };
      exitListenerRef.current = exitHandler;
      document.addEventListener("mouseleave", exitHandler);
    }

    return () => clearAllListeners();
  }, []); // intentionally empty dep array — runs once on mount

  /* ── Re-show after user has closed: scroll 40–50% + 30s elapsed ── */
  useEffect(() => {
    if (open || !closedAtRef.current) return;

    const scrollReShowHandler = () => {
      if (open || !shouldShow()) return;
      const elapsed = Date.now() - closedAtRef.current;
      if (elapsed < 30000) return;

      const isMobile = window.innerWidth < 768;
      const threshold = isMobile ? 0.50 : 0.42;
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= threshold) {
        triggeredRef.current = false; // allow re-trigger once
        closedAtRef.current  = null;
        openPopup();
      }
    };

    window.addEventListener("scroll", scrollReShowHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollReShowHandler);
  }, [open, openPopup, shouldShow]);

  /* ── Focus trap + ESC ── */
  useEffect(() => {
    if (!open) return;

    // Move focus into popup
    const timeout = setTimeout(() => {
      firstFocusRef.current?.focus();
    }, 320);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closePopup();
        return;
      }
      // Focus trap
      if (e.key === "Tab" && popupRef.current) {
        const focusable = popupRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll while popup is open
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, closePopup]);

  /* ─────────────────────────────────────────────────────
     FORM HANDLERS
  ───────────────────────────────────────────────────── */
  const change = useCallback((e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name       = "Full name is required.";
    if (!form.email.trim())       e.email      = "Email address is required.";
    else if (!isValidEmail(form.email)) e.email = "Please enter a valid email.";
    if (!form.phone.trim())       e.phone      = "Phone / WhatsApp is required.";
    else if (!isValidPhone(form.phone)) e.phone = "Please enter a valid phone number.";
    if (!form.experience)         e.experience = "Please select a preferred experience.";
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus("loading");

    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          name:       form.name,
          email:      form.email,
          phone:      form.phone,
          experience: form.experience,
          date:       form.date,
          guests:     form.guests,
          message:    form.message,
          source:     "Enquiry Popup",
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        sessionStorage.setItem(POPUP_SUBMITTED_KEY, "1");
      } else {
        setStatus("error");
        setErrMsg(data.message || "Something went wrong. Please try WhatsApp.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try WhatsApp below.");
    }
  };

  /* ─────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────── */
  if (!open) return null;

  return (
    <>
      <style>{`
        /* ── Overlay ── */
        @keyframes ep-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ep-overlay-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        /* ── Popup card ── */
        @keyframes ep-card-in {
          from { opacity: 0; transform: scale(0.94) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }

        .ep-overlay {
          position: fixed;
          /* Clip the overlay so it starts BELOW the sticky navbar.
             Navbar height: 80px (transparent/top) → 68px (scrolled/solid).
             We use the larger value (80px) + a 20px gap = 100px as a safe
             top offset that works in both states.
             left / right / bottom stay at 0 so the rest of the screen dims. */
          top: 100px;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          background: rgba(15, 8, 0, 0.72);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          /* 20px top padding so the card has a visible gap from the overlay edge */
          padding: 20px 16px 24px;
          animation: ep-overlay-in 0.32s ease forwards;
          overflow-y: auto;
        }

        @media (max-width: 767px) {
          .ep-overlay {
            /* Mobile navbar is always solid ~68px; 20px gap = 88px */
            top: 88px;
            padding: 16px 12px 24px;
          }
        }

        .ep-card {
          position: relative;
          display: flex;
          width: 100%;
          max-width: 920px;
          /* Card can use the full remaining height below the overlay's top edge.
             20px padding-top is already subtracted from the overlay, so use
             calc(100vh - overlay-top - top-padding - bottom-padding) */
          max-height: calc(100vh - 140px);
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 24px 80px rgba(0,0,0,0.45),
            0 0 0 1px rgba(255,216,155,0.25);
          animation: ep-card-in 0.36s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          background: #FFFFFF;
          flex-shrink: 0;
        }

        @media (max-width: 767px) {
          .ep-card {
            max-height: calc(100vh - 120px);
            border-radius: 20px;
          }
        }

        /* ── Info panel (left — desktop only) ── */
        .ep-info-panel {
          flex: 0 0 42%;
          position: relative;
          overflow-y: auto;
          display: none;
          flex-direction: column;
          /* Rich dark background matching hero overlay style */
          background: linear-gradient(160deg, #1A1209 0%, #2C1D07 55%, #1A1209 100%);
          padding: 36px 28px 32px;
          scrollbar-width: none;
        }
        .ep-info-panel::-webkit-scrollbar { display: none; }
        @media (min-width: 768px) {
          .ep-info-panel { display: flex; }
        }

        /* Decorative radial glow — warm orange, top-right */
        .ep-info-panel::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 260px; height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,140,0,0.13) 0%, transparent 70%);
          pointer-events: none;
        }
        /* Decorative arc — bottom-left */
        .ep-info-panel::after {
          content: '';
          position: absolute;
          bottom: -40px; left: -40px;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Experience highlight item ── */
        .ep-exp-item {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 9px 12px;
          border-radius: 12px;
          transition: background 0.2s ease;
        }
        .ep-exp-item:hover {
          background: rgba(255,140,0,0.07);
        }
        .ep-exp-icon {
          font-size: 1.1rem;
          line-height: 1;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* ── Trust stat pill ── */
        .ep-stat-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 12px;
          border-radius: 9999px;
          background: rgba(255,140,0,0.10);
          border: 1px solid rgba(245,166,35,0.22);
        }

        /* ── Form panel (right) ── */
        .ep-form-panel {
          flex: 1;
          overflow-y: auto;
          padding: 36px 32px 36px;
          background: linear-gradient(160deg, #FFFBF0 0%, #FFF7E4 100%);
          scrollbar-width: thin;
          scrollbar-color: rgba(255,140,0,0.2) transparent;
        }
        .ep-form-panel::-webkit-scrollbar { width: 4px; }
        .ep-form-panel::-webkit-scrollbar-thumb { background: rgba(255,140,0,0.25); border-radius: 4px; }

        @media (max-width: 767px) {
          .ep-form-panel {
            padding: 28px 20px 28px;
          }
          /* Show compact info banner on mobile; info panel is hidden */
          .ep-mobile-banner {
            display: block !important;
          }
        }

        /* ── Close button ── */
        .ep-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 100;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,216,155,0.65);
          background: rgba(255,253,231,0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #6B5B2E;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
        }
        .ep-close:hover {
          background: #FF8C00;
          color: #FFFFFF;
          border-color: #FF8C00;
          transform: scale(1.08);
        }
        .ep-close:focus-visible {
          outline: 2px solid #FF8C00;
          outline-offset: 3px;
        }

        /* ── Form input focus ring ── */
        .ep-input:focus {
          border-color: #FF8C00 !important;
          box-shadow: 0 0 0 3px rgba(255,140,0,0.14) !important;
          outline: none;
        }

        /* ── Submit CTA ── */
        .ep-sub {
          width: 100%;
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 55%, #C45E00 100%);
          color: #FFFFFF;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: none;
          border-radius: 9999px;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(255,140,0,0.32);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .ep-sub:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.02);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.14),
            0 0 22px rgba(255,140,0,0.50),
            0 8px 24px rgba(255,140,0,0.30);
        }
        .ep-sub:active { transform: translateY(0) scale(1); }
        .ep-sub:disabled { opacity: 0.65; cursor: not-allowed; }
        .ep-sub:focus-visible { outline: 2px solid #FF8C00; outline-offset: 3px; }

        /* ── WhatsApp button ── */
        .ep-wa {
          width: 100%;
          background: linear-gradient(135deg, #25D366 0%, #1db954 100%);
          color: #FFFFFF;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          border-radius: 9999px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(37,211,102,0.25);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .ep-wa:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 0 0 4px rgba(37,211,102,0.14), 0 8px 20px rgba(37,211,102,0.30);
        }
        .ep-wa:focus-visible { outline: 2px solid #25D366; outline-offset: 3px; }

        /* ── Select arrow ── */
        .ep-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%23FF8C00' stroke-width='1.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px !important;
          cursor: pointer;
        }

        /* ── Inline validation message ── */
        .ep-err-msg {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.68rem;
          color: #E07800;
          margin-top: 4px;
          font-weight: 500;
        }

        /* ── Two-column form grid on wider panels ── */
        .ep-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 480px) {
          .ep-row { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Overlay — click outside closes ── */}
      <div
        className="ep-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Plan Your Jaipur Experience — Enquiry Form"
        onClick={(e) => {
          // only close if click is directly on overlay, not card
          if (e.target === e.currentTarget) closePopup();
        }}
      >
        <div className="ep-card" ref={popupRef}>

          {/* ── Close button ── */}
          <button
            className="ep-close"
            onClick={closePopup}
            aria-label="Close enquiry popup"
          >
            <X size={16} strokeWidth={2.5} />
          </button>

          {/* ── Left: Brand info panel ── */}
          <div className="ep-info-panel" aria-hidden="true">

            {/* Brand eyebrow */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                fontFamily: IN, fontSize: "0.52rem", letterSpacing: "0.28em",
                textTransform: "uppercase", fontWeight: 700,
                color: "rgba(245,166,35,0.75)", marginBottom: "12px",
              }}>
                Raah India Experiences · Jaipur
              </p>

              {/* Main heading */}
              <h3 style={{
                fontFamily: PF, fontWeight: 700,
                fontSize: "clamp(1.35rem, 2.4vw, 1.7rem)",
                color: "#FFFFFF", lineHeight: 1.2, marginBottom: "4px",
              }}>
                Discover Jaipur
              </h3>
              <h3 style={{
                fontFamily: PF, fontWeight: 700,
                fontSize: "clamp(1.35rem, 2.4vw, 1.7rem)",
                color: "#FF8C00", fontStyle: "italic", lineHeight: 1.2, marginBottom: "14px",
              }}>
                Beyond the Ordinary
              </h3>

              {/* Accent rule */}
              <div style={{
                width: "36px", height: "2px",
                background: "linear-gradient(to right, #FF8C00, #F5A623)",
                borderRadius: "2px", marginBottom: "14px",
              }} />

              {/* Short description */}
              <p style={{
                fontFamily: IN, fontSize: "0.82rem", fontWeight: 300,
                color: "rgba(255,253,231,0.62)", lineHeight: 1.72,
                marginBottom: "22px",
              }}>
                Authentic local stories, culture, food, heritage and unforgettable walks — beyond the usual tourist routes.
              </p>

              {/* Section label */}
              <p style={{
                fontFamily: IN, fontSize: "0.54rem", letterSpacing: "0.22em",
                textTransform: "uppercase", fontWeight: 700,
                color: "rgba(245,166,35,0.60)", marginBottom: "10px",
              }}>
                What Can You Experience?
              </p>

              {/* Experience highlights */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "22px" }}>
                {[
                  { icon: "🏰", title: "Heritage & History",      desc: "Royal forts, architecture and local stories" },
                  { icon: "🍽️", title: "Food & Local Flavours",   desc: "Hidden spots and authentic Jaipur tastes"   },
                  { icon: "🎨", title: "Culture & Traditions",    desc: "Art, crafts, markets and everyday life"      },
                  { icon: "🚶", title: "Local Experiences",       desc: "Curated walks through real neighbourhoods"   },
                  { icon: "✨", title: "Custom Experiences",      desc: "Tell us what you want — we'll design it"     },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="ep-exp-item">
                    <span className="ep-exp-icon">{icon}</span>
                    <div>
                      <p style={{
                        fontFamily: IN, fontSize: "0.8rem", fontWeight: 600,
                        color: "rgba(255,253,231,0.90)", lineHeight: 1.3, marginBottom: "2px",
                      }}>
                        {title}
                      </p>
                      <p style={{
                        fontFamily: IN, fontSize: "0.7rem", fontWeight: 300,
                        color: "rgba(255,253,231,0.48)", lineHeight: 1.4,
                      }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{
                height: "1px", marginBottom: "16px",
                background: "linear-gradient(to right, rgba(245,166,35,0.25), rgba(245,166,35,0.10))",
              }} />

              {/* Trust stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {[
                  { num: "4+", label: "Years of Local Expertise"     },
                  { num: "9+", label: "Curated Experiences"          },
                  { num: "2",  label: "Languages — English & Spanish"},
                ].map(({ num, label }) => (
                  <div key={label} className="ep-stat-pill">
                    <span style={{
                      fontFamily: PF, fontSize: "0.95rem", fontWeight: 700,
                      color: "#FF8C00", lineHeight: 1, minWidth: "26px",
                    }}>
                      {num}
                    </span>
                    <span style={{
                      fontFamily: IN, fontSize: "0.72rem", fontWeight: 400,
                      color: "rgba(255,253,231,0.60)", lineHeight: 1.3,
                    }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Form panel ── */}
          <div className="ep-form-panel">

            {/* Mobile-only compact info banner — hidden on desktop (info panel handles it) */}
            <div style={{
              display: "none",  /* overridden to 'block' via CSS below */
            }} className="ep-mobile-banner">
              <div style={{
                background: "linear-gradient(135deg, #1A1209 0%, #2C1D07 100%)",
                borderRadius: "14px",
                padding: "14px 16px",
                marginBottom: "18px",
                border: "1px solid rgba(245,166,35,0.20)",
              }}>
                <p style={{ fontFamily: PF, fontSize: "1rem", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "4px" }}>
                  Discover Jaipur{" "}
                  <em style={{ color: "#FF8C00", fontStyle: "italic" }}>Beyond the Ordinary</em>
                </p>
                <p style={{ fontFamily: IN, fontSize: "0.72rem", fontWeight: 300, color: "rgba(255,253,231,0.55)", lineHeight: 1.55, marginBottom: "10px" }}>
                  Heritage · Food · Culture · Custom Experiences
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {["4+ Years Expertise", "9+ Experiences", "English & Spanish"].map((s) => (
                    <span key={s} style={{
                      fontFamily: IN, fontSize: "0.6rem", fontWeight: 600,
                      color: "#FF8C00", background: "rgba(255,140,0,0.12)",
                      border: "1px solid rgba(255,140,0,0.22)",
                      borderRadius: "9999px", padding: "3px 9px",
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Success state */}
            {status === "success" ? (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "320px",
                textAlign: "center",
                padding: "20px 16px",
              }}>
                <div style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "linear-gradient(135deg,#FF8C00,#F5A623)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 6px 22px rgba(255,140,0,0.30)",
                }}>
                  <CheckCircle2 size={30} style={{ color: "#FFFFFF" }} />
                </div>
                <h3 style={{ fontFamily: PF, fontSize: "1.75rem", fontWeight: 700, color: "#1A1209", marginBottom: "10px" }}>
                  Thank you!
                </h3>
                <p style={{ fontFamily: IN, fontSize: "0.9rem", color: "#6B5B2E", lineHeight: 1.75, maxWidth: "300px", margin: "0 auto 8px", fontWeight: 300 }}>
                  We've received your enquiry. Our team will get in touch with you shortly.
                </p>
                <p style={{ fontFamily: PF, fontStyle: "italic", color: "#FF8C00", fontSize: "0.9rem", marginTop: "8px" }}>
                  — Raah India Experiences
                </p>
              </div>
            ) : (
              <>
                {/* Heading */}
                <div style={{ marginBottom: "22px" }}>
                  <p style={{
                    fontFamily: IN, fontSize: "0.55rem", letterSpacing: "0.25em",
                    textTransform: "uppercase", fontWeight: 700, color: "#FF8C00", marginBottom: "6px",
                  }}>
                    Raah India Experiences
                  </p>
                  <h2 style={{ fontFamily: PF, fontSize: "clamp(1.4rem,3vw,1.8rem)", fontWeight: 700, color: "#1A1209", lineHeight: 1.15, marginBottom: "8px" }}>
                    Plan Your Jaipur{" "}
                    <em style={{ color: "#FF8C00", fontStyle: "italic" }}>Experience</em>
                  </h2>
                  <div style={{ width: "32px", height: "2px", background: "linear-gradient(to right,#FF8C00,#F5A623)", borderRadius: "2px", marginBottom: "8px" }} />
                  <p style={{ fontFamily: IN, fontSize: "0.82rem", color: "#6B5B2E", lineHeight: 1.65, fontWeight: 300 }}>
                    Tell us what you're looking for and we'll help you discover Jaipur beyond the ordinary.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: "13px" }}>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="ep-name" style={lblStyle}>
                      Full Name <span style={{ color: "#FF8C00" }}>*</span>
                    </label>
                    <input
                      ref={firstFocusRef}
                      id="ep-name" name="name" type="text"
                      placeholder="Your full name"
                      required
                      value={form.name}
                      onChange={change}
                      style={errors.name ? fldErr : fldBase}
                      className="ep-input"
                    />
                    {errors.name && <p className="ep-err-msg">{errors.name}</p>}
                  </div>

                  {/* Email + Phone row */}
                  <div className="ep-row">
                    <div>
                      <label htmlFor="ep-email" style={lblStyle}>
                        Email Address <span style={{ color: "#FF8C00" }}>*</span>
                      </label>
                      <input
                        id="ep-email" name="email" type="email"
                        placeholder="your@email.com"
                        required
                        value={form.email}
                        onChange={change}
                        style={errors.email ? fldErr : fldBase}
                        className="ep-input"
                      />
                      {errors.email && <p className="ep-err-msg">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="ep-phone" style={lblStyle}>
                        Phone / WhatsApp <span style={{ color: "#FF8C00" }}>*</span>
                      </label>
                      <input
                        id="ep-phone" name="phone" type="tel"
                        placeholder="+91 or international"
                        required
                        value={form.phone}
                        onChange={change}
                        style={errors.phone ? fldErr : fldBase}
                        className="ep-input"
                      />
                      {errors.phone && <p className="ep-err-msg">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Preferred Experience */}
                  <div>
                    <label htmlFor="ep-experience" style={lblStyle}>
                      Preferred Experience <span style={{ color: "#FF8C00" }}>*</span>
                    </label>
                    <select
                      id="ep-experience" name="experience"
                      required
                      value={form.experience}
                      onChange={change}
                      style={errors.experience ? { ...fldErr, paddingRight: "36px" } : { ...fldBase, paddingRight: "36px" }}
                      className="ep-input ep-select"
                    >
                      <option value="">Select an experience…</option>
                      {expOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {errors.experience && <p className="ep-err-msg">{errors.experience}</p>}
                  </div>

                  {/* Date + Guests row */}
                  <div className="ep-row">
                    <div>
                      <label htmlFor="ep-date" style={lblStyle}>Preferred Date</label>
                      <input
                        id="ep-date" name="date" type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={form.date}
                        onChange={change}
                        style={fldBase}
                        className="ep-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="ep-guests" style={lblStyle}>Number of Guests</label>
                      <select
                        id="ep-guests" name="guests"
                        value={form.guests}
                        onChange={change}
                        style={{ ...fldBase, paddingRight: "36px" }}
                        className="ep-input ep-select"
                      >
                        <option value="">Select…</option>
                        {["1 guest","2 guests","3 guests","4 guests","5 guests","6 guests","7+ guests"].map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="ep-message" style={lblStyle}>Message / Requirements</label>
                    <textarea
                      id="ep-message" name="message" rows={3}
                      placeholder="Tell us what kind of Jaipur experience you're looking for…"
                      value={form.message}
                      onChange={change}
                      style={{ ...fldBase, resize: "vertical", minHeight: "76px" }}
                      className="ep-input"
                    />
                  </div>

                  {/* Global error */}
                  {status === "error" && errMsg && (
                    <p style={{ fontFamily: IN, fontSize: "0.78rem", color: "#E07800", background: "rgba(255,140,0,0.07)", border: "1px solid rgba(255,140,0,0.22)", borderRadius: "10px", padding: "10px 14px" }}>
                      {errMsg}
                    </p>
                  )}

                  {/* Submit */}
                  <button type="submit" disabled={status === "loading"} className="ep-sub">
                    {status === "loading"
                      ? <><Loader2 size={15} className="animate-spin" /> Sending…</>
                      : <><Send size={14} /> Send Enquiry</>}
                  </button>

                  {/* Divider */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ flex: 1, height: "1px", background: "rgba(255,216,155,0.55)" }} />
                    <span style={{ fontFamily: IN, fontSize: "0.6rem", color: "#9C8550", letterSpacing: "0.1em", textTransform: "uppercase" }}>or</span>
                    <div style={{ flex: 1, height: "1px", background: "rgba(255,216,155,0.55)" }} />
                  </div>

                  {/* WhatsApp CTA */}
                  <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="ep-wa">
                    <WaIcon /> Enquire on WhatsApp
                  </a>

                  <p style={{ fontFamily: IN, fontSize: "0.65rem", color: "#9C8550", textAlign: "center", fontWeight: 300 }}>
                    We respond personally within 24 hours. Your details are never shared.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
