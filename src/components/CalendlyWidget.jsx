/**
 * CalendlyWidget
 * ──────────────────────────────────────────────────────
 * Renders the official react-calendly InlineWidget.
 * Styled to match the existing orange/amber design system.
 *
 * Uses "use client" because react-calendly requires browser APIs.
 * Safe to import from any Server or Client component.
 */

"use client";

import { InlineWidget } from "react-calendly";
import {
  CALENDLY_URL,
  CALENDLY_STYLES,
  CALENDLY_PAGE_SETTINGS,
} from "@/config/calendly";

const IN = "DM Sans, system-ui, sans-serif";
const PF = "Fraunces, Georgia, serif";

export default function CalendlyWidget() {
  return (
    <div>
      {/* ── Section heading — matches existing card heading style ── */}
      <h2
        style={{
          fontFamily: PF,
          fontWeight: 700,
          fontSize: "1.6rem",
          color: "#1A1209",
          marginBottom: "8px",
        }}
      >
        Book a Free Consultation
      </h2>

      {/* ── Gold rule — exactly matches the form card gold rule ── */}
      <div
        style={{
          width: "32px",
          height: "2px",
          background: "linear-gradient(to right, #FF8C00, #F5A623)",
          borderRadius: "2px",
          marginBottom: "12px",
        }}
      />

      <p
        style={{
          fontFamily: IN,
          fontSize: "0.875rem",
          color: "#6B5B2E",
          lineHeight: 1.65,
          marginBottom: "22px",
          fontWeight: 300,
        }}
      >
        Pick a time that works for you. We&apos;ll walk you through your
        perfect Jaipur experience — live, personally, and free.
      </p>

      {/* ── Calendly InlineWidget — card wrapper matches form card ── */}
      <div
        style={{
          background: "linear-gradient(145deg, #FFFBF0 0%, #FFF7E4 100%)",
          border: "1px solid rgba(255,216,155,0.55)",
          borderRadius: "24px",
          boxShadow:
            "0 4px 24px rgba(255,140,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        <InlineWidget
          url={CALENDLY_URL}
          styles={CALENDLY_STYLES}
          pageSettings={CALENDLY_PAGE_SETTINGS}
        />
      </div>
    </div>
  );
}
