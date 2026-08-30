"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/**
 * ContinuousCounter — continuously loops from 0 → 100 → 0 → 100 → ...
 * Uses requestAnimationFrame for smooth performance.
 * Pauses when not visible (IntersectionObserver) to save resources.
 * Cleans up all animations on unmount.
 *
 * Props:
 *   cycleDuration {number} — ms for one full 0→100 cycle (default 5000)
 *   padded        {boolean} — whether to pad with leading zeros (00→99→100)
 */
export default function ContinuousCounter({ cycleDuration = 5000, padded = true }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const isVisibleRef = useRef(false);
  const containerRef = useRef(null);

  const animate = useCallback((timestamp) => {
    if (!isVisibleRef.current) {
      // Paused — re-queue but don't advance
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    // elapsed mod cycleDuration gives position within current cycle
    const cyclePos = elapsed % cycleDuration;
    // linear 0→100 over cycleDuration
    const raw = (cyclePos / cycleDuration) * 101; // 0 to just past 100
    const current = Math.floor(raw) % 101; // clamp 0–100, then wrap
    setValue(current);

    rafRef.current = requestAnimationFrame(animate);
  }, [cycleDuration]);

  // Start the animation loop
  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // IntersectionObserver — pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        // Reset startTime so the cycle feels seamless on re-entry
        if (entry.isIntersecting) {
          startTimeRef.current = null;
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Format display value
  const display = padded
    ? value < 10
      ? `0${value}`
      : `${value}`
    : `${value}`;

  return (
    <span ref={containerRef} aria-live="off" aria-label={`Counter: ${value}`}>
      {display}
    </span>
  );
}
