"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/**
 * MobileSlider
 * – Auto-slides every `interval` ms, infinite loop
 * – Touch/swipe to navigate (pauses auto-slide while swiping)
 * – No arrows, no dots — clean, distraction-free
 * – On desktop (≥768px) renders children as-is; parent grid takes over
 */
export default function MobileSlider({
  children,
  autoPlay = true,
  interval = 3500,
  ariaLabel = "Card slider",
}) {
  const items = Array.isArray(children) ? children : [children];
  const total = items.length;

  const [idx, setIdx]         = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused]   = useState(false);
  const timerRef              = useRef(null);
  const touchStartX           = useRef(null);
  const isSwiping             = useRef(false);

  /* ── Responsive detection (post-mount, avoids SSR mismatch) ── */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);

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
    setPaused(true); // pause while user is touching
  };
  const onTouchEnd = (e) => {
    isSwiping.current = false;
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
    // resume after a short grace period
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

  /* Desktop: pass through, let parent grid handle */
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
      {/* Viewport — clips overflowing slides */}
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
    </div>
  );
}
