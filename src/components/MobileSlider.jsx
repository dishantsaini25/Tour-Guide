"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/**
 * MobileSlider
 * – Auto-slides every `interval` ms, infinite loop
 * – Touch/swipe to navigate (pauses auto-slide while swiping)
 * – Pagination dots: clickable, synced with current slide
 * – On desktop (≥768px) renders children as-is; parent grid takes over
 */
export default function MobileSlider({
  children,
  autoPlay    = true,
  interval    = 3500,
  ariaLabel   = "Card slider",
  accentColor = "#FF8C00",
}) {
  const items = Array.isArray(children) ? children : [children];
  const total = items.length;

  const [idx, setIdx]           = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused]     = useState(false);
  const timerRef                = useRef(null);
  const touchStartX             = useRef(null);
  const isSwiping               = useRef(false);

  /* ── Responsive detection ── */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goTo = useCallback((i) => {
    setIdx(((i % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(idx + 1), [idx, goTo]);
  const prev = useCallback(() => goTo(idx - 1), [idx, goTo]);

  /* ── Auto-advance ── */
  useEffect(() => {
    if (!isMobile || !autoPlay || paused) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [isMobile, autoPlay, paused, interval, next]);

  /* ── Touch swipe ── */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current   = true;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    isSwiping.current = false;
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
    setTimeout(() => setPaused(false), 800);
  };
  const onTouchCancel = () => {
    isSwiping.current   = false;
    touchStartX.current = null;
    setTimeout(() => setPaused(false), 800);
  };

  /* ── Keyboard ── */
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  /* Desktop: pass-through */
  if (!isMobile) return <>{children}</>;

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      style={{ outline: "none", userSelect: "none", WebkitUserSelect: "none" }}
    >
      {/* ── Slide viewport ── */}
      <div style={{ overflow: "hidden", borderRadius: "20px" }}>
        <div
          aria-live="polite"
          style={{
            display: "flex",
            transform: `translateX(-${idx * 100}%)`,
            transition: "transform 0.48s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "transform",
          }}
        >
          {items.map((child, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${total}`}
              aria-hidden={i !== idx}
              style={{ flex: "0 0 100%", minWidth: 0 }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* ── Pagination dots ── */}
      {total > 1 && (
        <div
          role="tablist"
          aria-label="Slide navigation"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "7px",
            marginTop: "16px",
            paddingBottom: "4px",
          }}
        >
          {items.map((_, i) => {
            const isActive = i === idx;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  setPaused(true);
                  goTo(i);
                  setTimeout(() => setPaused(false), 1200);
                }}
                style={{
                  /* Active dot: wider pill; inactive: small circle */
                  width:        isActive ? "22px" : "7px",
                  height:       "7px",
                  borderRadius: "9999px",
                  background:   isActive
                    ? accentColor
                    : `rgba(${hexToRgb(accentColor)}, 0.28)`,
                  border:  "none",
                  padding: 0,
                  cursor:  "pointer",
                  flexShrink: 0,
                  transition: "width 0.3s ease, background 0.3s ease",
                  /* Remove default button outline — we use focus-visible instead */
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `2px solid ${accentColor}`;
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = "none";
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Utility: convert hex color to "r, g, b" string for rgba() ── */
function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const full  = clean.length === 3
    ? clean.split("").map(c => c + c).join("")
    : clean;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}
