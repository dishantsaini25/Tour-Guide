"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";

export default function FAQAccordion({ items = [], dark = false }) {
  const [open, setOpen] = useState(null);

  const cardBg = dark
    ? "rgba(255,255,255,0.04)"
    : "linear-gradient(145deg,#FFFBF0 0%,#FFF7E4 100%)";
  const cardBorder = dark ? "rgba(255,255,255,0.14)" : "rgba(255,216,155,0.55)";
  const cardBorderOpen = dark ? "rgba(255,255,255,0.28)" : "rgba(255,140,0,0.30)";
  const qc = dark ? "#FFFFFF" : "#1A1209";
  const ac = dark ? "rgba(255,255,255,0.65)" : "#6B5B2E";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;

        return (
          <div
            key={i}
            style={{
              background: cardBg,
              border: `1px solid ${isOpen ? cardBorderOpen : cardBorder}`,
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: isOpen ? "0 6px 22px rgba(255,140,0,0.10)" : "0 1px 4px rgba(255,140,0,0.04)",
              transition: "border-color 0.25s ease, box-shadow 0.25s ease",
            }}
          >
            <button
              id={buttonId}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                gap: "16px",
                textAlign: "left",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.03)" : "rgba(255,140,0,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
            >
              <span style={{ fontFamily: PF, fontSize: "1.02rem", fontWeight: 600, color: qc, lineHeight: 1.4 }}>
                {item.q}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1.5px solid #FF8C00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isOpen ? "#FFFFFF" : "#FF8C00",
                  background: isOpen ? "#FF8C00" : "transparent",
                  transition: "all .25s",
                }}
              >
                {isOpen ? <Minus size={11} /> : <Plus size={11} />}
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.32s ease",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p
                  style={{
                    fontFamily: IN,
                    color: ac,
                    fontSize: "0.9rem",
                    lineHeight: 1.85,
                    fontWeight: 300,
                    padding: "0 20px 18px",
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}