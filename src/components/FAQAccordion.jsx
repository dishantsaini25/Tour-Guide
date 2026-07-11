"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQAccordion({ items = [], dark = false }) {
  const [open, setOpen] = useState(null);
  const bd = dark ? "rgba(176,125,62,0.15)" : "#C8D8D0";
  const qc = dark ? "#F0EDE8" : "#1E4D3A";
  const ac = dark ? "rgba(240,237,232,0.6)" : "#4A5550";

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
            <span style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #B07D3E", display: "flex", alignItems: "center", justifyContent: "center", color: open === i ? "#1A1F1C" : "#B07D3E", background: open === i ? "#B07D3E" : "transparent", transition: "all .25s" }}>
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
