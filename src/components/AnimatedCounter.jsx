"use client";
import { useEffect, useRef, useState } from "react";

/**
 * AnimatedCounter — counts from 0 to `target` once when element enters viewport.
 * Props:
 *   target   {number}  — the final number to count to
 *   suffix   {string}  — e.g. "+" or ""
 *   duration {number}  — ms for the full count-up (default 1800)
 */
export default function AnimatedCounter({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  // Intersection Observer — trigger once when element is ≥30% visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  // Count-up with requestAnimationFrame
  useEffect(() => {
    if (!started) return;

    let startTime = null;
    let rafId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}
