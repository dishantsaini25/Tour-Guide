"use client";
import { useState, useRef, useCallback, useEffect } from "react";

/**
 * FilterChipSlider
 *
 * Shows ONE chip at a time, centered on screen.
 * User swipes left/right (touch or pointer drag) to navigate.
 * Tapping/clicking the visible chip applies that filter.
 * Arrow-key navigation for keyboard users.
 * No auto-advance. No arrows. No dots. Infinite loop.
 *
 * Works consistently on mobile, tablet, and desktop.
 */
export default function FilterChipSlider({ filters, active, onSelect }) {
  const total = filters.length;

  // Find which index is currently active so we start there
  const activeIdx = filters.indexOf(active);
  const [idx, setIdx] = useState(activeIdx >= 0 ? activeIdx : 0);

  // Keep idx in sync if parent changes active externally
  useEffect(() => {
    const i = filters.indexOf(active);
    if (i >= 0 && i !== idx) setIdx(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // ── Drag state ──
  const dragStartX   = useRef(null);
  const dragging     = useRef(false);
  const [dragDelta, setDragDelta] = useState(0); // live px offset during drag

  const goTo = useCallback((i) => {
    const clamped = ((i % total) + total) % total;
    setIdx(clamped);
  }, [total]);

  const prev = useCallback(() => goTo(idx - 1), [idx, goTo]);
  const next = useCallback(() => goTo(idx + 1), [idx, goTo]);

  // ── Touch handlers ──
  const onTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX;
    dragging.current   = true;
    setDragDelta(0);
  };
  const onTouchMove = (e) => {
    if (!dragging.current || dragStartX.current === null) return;
    setDragDelta(e.touches[0].clientX - dragStartX.current);
  };
  const onTouchEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (dragDelta < -40) next();
    else if (dragDelta > 40) prev();
    setDragDelta(0);
    dragStartX.current = null;
  };

  // ── Pointer (mouse / stylus) drag handlers ──
  const onPointerDown = (e) => {
    // only primary button
    if (e.button !== 0) return;
    dragStartX.current = e.clientX;
    dragging.current   = true;
    setDragDelta(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging.current || dragStartX.current === null) return;
    setDragDelta(e.clientX - dragStartX.current);
  };
  const onPointerUp = (e) => {
    if (!dragging.current) return;
    const delta = e.clientX - (dragStartX.current ?? e.clientX);
    dragging.current = false;
    if (delta < -40) next();
    else if (delta > 40) prev();
    setDragDelta(0);
    dragStartX.current = null;
  };

  // ── Keyboard ──
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(filters[idx]);
    }
  };

  // The translate offset: each chip occupies 100% of the viewport width,
  // so slide i is at -i*100%. The live drag adds a fractional px nudge.
  const translateBase = -idx * 100; // percent
  const isDragging    = dragging.current;

  return (
    <div
      role="group"
      aria-label="Category filter — swipe to browse"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      tabIndex={0}
      style={{
        position: "relative",
        overflow: "hidden",
        outline: "none",
        touchAction: "pan-y",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      {/* ── Track: all chips in a single flex row ── */}
      <div
        aria-live="polite"
        style={{
          display: "flex",
          // base translate + live drag offset (capped to ±60% so it doesn't over-stretch)
          transform: `translateX(calc(${translateBase}% + ${
            Math.max(-80, Math.min(80, dragDelta))
          }px))`,
          transition: isDragging
            ? "none"                                          // no transition while dragging
            : "transform 0.42s cubic-bezier(0.4,0,0.2,1)",   // snap on release
          willChange: "transform",
        }}
      >
        {filters.map((f, i) => {
          const isActive  = f === active;
          const isCurrent = i === idx;
          return (
            <div
              key={f}
              role="group"
              aria-roledescription="filter option"
              aria-label={`${f}${isActive ? " (currently selected)" : ""}`}
              aria-hidden={!isCurrent}
              style={{
                // Each slide occupies exactly 100% of the container width
                flex: "0 0 100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "4px 0 8px",
              }}
            >
              <button
                onClick={() => onSelect(f)}
                aria-pressed={isActive}
                tabIndex={isCurrent ? 0 : -1}   // only current chip is tab-reachable
                className={`fc${isActive ? " fc-active" : ""}`}
                style={{ flexShrink: 0, pointerEvents: isDragging ? "none" : "auto" }}
              >
                {f}
              </button>
            </div>
          );
        })}
      </div>

      {/* Subtle swipe-hint label below */}
      <p style={{
        textAlign: "center",
        fontFamily: "DM Sans, system-ui, sans-serif",
        fontSize: "0.58rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(107,91,46,0.45)",
        marginTop: "2px",
        userSelect: "none",
        pointerEvents: "none",
      }}>
        {idx + 1} / {total} · swipe to browse
      </p>
    </div>
  );
}
