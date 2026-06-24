"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQAccordion({ items = [], dark = false }) {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          style={{ borderBottom: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5d9c8", ...(i === 0 ? { borderTop: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5d9c8" } : {}) }}
        >
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between py-5 text-left gap-4"
            aria-expanded={open === i}
          >
            <span
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: "1.1rem",
                fontWeight: 500,
                color: dark ? "white" : "#1e1b3a",
                lineHeight: 1.4,
              }}
            >
              {item.q}
            </span>
            <span
              className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-200"
              style={{ background: open === i ? "#c9943a" : "transparent", border: "1.5px solid #c9943a", color: open === i ? "#1e1b3a" : "#c9943a" }}
            >
              {open === i ? <Minus size={13} /> : <Plus size={13} />}
            </span>
          </button>
          <div
            style={{
              overflow: "hidden",
              maxHeight: open === i ? "300px" : "0",
              opacity: open === i ? 1 : 0,
              transition: "max-height 0.35s ease, opacity 0.3s ease",
            }}
          >
            <p style={{ color: dark ? "rgba(255,255,255,0.6)" : "#4a4458", fontSize: "0.9rem", lineHeight: 1.75, paddingBottom: "20px" }}>
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
