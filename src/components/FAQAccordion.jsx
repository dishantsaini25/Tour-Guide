"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQAccordion({ items = [], dark = false }) {
  const [open, setOpen] = useState(null);
  const bd = dark ? "rgba(255,255,255,0.18)" : "#FFD89B";
  const qc = dark ? "#FFFFFF" : "#1A1209";
  const ac = dark ? "rgba(255,255,255,0.65)" : "#6B5B2E";

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${bd}`, ...(i === 0 ? { borderTop: `1px solid ${bd}` } : {}) }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "19px 0", background: "none", border: "none", cursor: "pointer", gap: "16px", textAlign: "left" }}
            aria-expanded={open === i}
          >
            <span style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.05rem", fontWeight: 600, color: qc, lineHeight: 1.4 }}>{item.q}</span>
            <span style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #FF8C00", display: "flex", alignItems: "center", justifyContent: "center", color: open === i ? "#FFFFFF" : "#FF8C00", background: open === i ? "#FF8C00" : "transparent", transition: "all .25s" }}>
              {open === i ? <Minus size={11} /> : <Plus size={11} />}
            </span>
          </button>
          <div style={{ overflow: "hidden", maxHeight: open === i ? "320px" : 0, opacity: open === i ? 1 : 0, transition: "max-height .38s ease, opacity .3s ease" }}>
            <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: ac, fontSize: "0.9rem", lineHeight: 1.85, paddingBottom: "20px", fontWeight: 300 }}>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
