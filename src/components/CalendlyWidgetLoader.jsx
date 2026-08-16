/**
 * CalendlyWidgetLoader
 * ──────────────────────────────────────────────────────
 * Client Component wrapper that dynamically imports
 * CalendlyWidget with ssr:false (react-calendly requires
 * browser APIs, so it cannot run on the server).
 *
 * Renders a styled loading skeleton that matches the
 * existing amber/orange design system while the widget loads.
 */

"use client";

import dynamic from "next/dynamic";

/* Loading skeleton — matches the CalendlyWidget card style */
function CalendlySkeleton() {
  return (
    <div
      style={{
        minHeight: "600px",
        background: "linear-gradient(145deg,#FFFBF0,#FFF7E4)",
        border: "1px solid rgba(255,216,155,0.55)",
        borderRadius: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      {/* Animated pulse bar */}
      <div
        style={{
          width: "120px",
          height: "8px",
          borderRadius: "4px",
          background: "linear-gradient(90deg,#FFD89B 0%,#FFE8B0 50%,#FFD89B 100%)",
          backgroundSize: "200% 100%",
          animation: "calSkeletonPulse 1.5s ease infinite",
        }}
      />
      <p
        style={{
          fontFamily: "DM Sans,system-ui,sans-serif",
          fontSize: "0.82rem",
          color: "#9C8550",
          fontWeight: 300,
        }}
      >
        Loading calendar…
      </p>
      <style>{`
        @keyframes calSkeletonPulse {
          0%,100% { background-position: 0% 50%; opacity:1; }
          50%      { background-position: 100% 50%; opacity:0.6; }
        }
      `}</style>
    </div>
  );
}

/* Dynamic import with ssr:false — must live in a "use client" file */
const CalendlyWidgetDynamic = dynamic(
  () => import("@/components/CalendlyWidget"),
  { ssr: false, loading: CalendlySkeleton }
);

export default function CalendlyWidgetLoader() {
  return <CalendlyWidgetDynamic />;
}
