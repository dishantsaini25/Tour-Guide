"use client";
import { useEffect, useRef, useState } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";

const stats = [
  { value: 4,  suffix: "+", label: "Years of Local Expertise" },
  { value: 9,  suffix: "+", label: "Curated Experiences"      },
  { value: 2,  suffix: "",  label: "Languages Offered"        },
  { value: 1,  suffix: "",  label: "City, Endless Stories"    },
];

export default function StatsStrip() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Strip container ── */
        .ss-strip {
          position: relative;
          background: linear-gradient(135deg, #1A1209 0%, #2C1D07 50%, #1A1209 100%);
          overflow: hidden;
          padding: 0;
        }

        /* Warm radial glow — decorative */
        .ss-strip::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 50%, rgba(255,140,0,0.10) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Subtle top/bottom gold borders */
        .ss-strip::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent 0%, rgba(245,166,35,0.45) 30%, rgba(255,140,0,0.65) 50%, rgba(245,166,35,0.45) 70%, transparent 100%);
        }

        /* Bottom border line */
        .ss-bottom-line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent 0%, rgba(245,166,35,0.45) 30%, rgba(255,140,0,0.65) 50%, rgba(245,166,35,0.45) 70%, transparent 100%);
        }

        /* ── Inner row ── */
        .ss-inner {
          position: relative;
          z-index: 2;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        /* ── Single stat cell ── */
        .ss-cell {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 36px 24px;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .ss-cell.ss-visible {
          opacity: 1;
          transform: translateY(0);
        }
        /* Staggered delay per cell */
        .ss-cell:nth-child(1) { transition-delay: 0.05s; }
        .ss-cell:nth-child(2) { transition-delay: 0.15s; }
        .ss-cell:nth-child(3) { transition-delay: 0.25s; }
        .ss-cell:nth-child(4) { transition-delay: 0.35s; }

        /* Vertical dividers between cells */
        .ss-cell:not(:first-child)::before {
          content: '';
          position: absolute;
          left: 0; top: 20%; bottom: 20%;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(245,166,35,0.30), transparent);
        }

        /* ── Number ── */
        .ss-num {
          font-family: ${PF};
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          font-weight: 700;
          line-height: 1;
          color: #FF8C00;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        /* ── Label ── */
        .ss-label {
          font-family: ${IN};
          font-size: clamp(0.72rem, 1.1vw, 0.82rem);
          font-weight: 400;
          color: rgba(255, 253, 231, 0.65);
          letter-spacing: 0.06em;
          line-height: 1.4;
          text-transform: uppercase;
          max-width: 110px;
        }

        /* ── Mobile: 2×2 grid ── */
        @media (max-width: 767px) {
          .ss-inner {
            grid-template-columns: repeat(2, 1fr);
          }
          .ss-cell {
            padding: 28px 16px;
          }
          /* Remove left divider on first column cells in 2×2 */
          .ss-cell:nth-child(1)::before,
          .ss-cell:nth-child(3)::before {
            display: none;
          }
          /* Add horizontal divider between rows */
          .ss-cell:nth-child(3),
          .ss-cell:nth-child(4) {
            border-top: 1px solid rgba(245,166,35,0.15);
          }
          .ss-num {
            font-size: clamp(2rem, 9vw, 2.8rem);
          }
          .ss-label {
            font-size: 0.68rem;
          }
        }
      `}</style>

      <div className="ss-strip" role="region" aria-label="Raah India at a glance">
        <div className="ss-bottom-line" />
        <div className="ss-inner" ref={ref}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`ss-cell${visible ? " ss-visible" : ""}`}
            >
              <div className="ss-num" aria-label={`${s.value}${s.suffix} ${s.label}`}>
                <AnimatedCounter
                  target={s.value}
                  suffix={s.suffix}
                  duration={1400 + i * 150}
                />
              </div>
              <div className="ss-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
