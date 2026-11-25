"use client";
import { useEffect } from "react";

/* Shows the floating booking bar only once the booking card has scrolled
   out of view, so price and buttons never appear twice on screen. */
export default function BookBarWatcher() {
  useEffect(() => {
    const root = document.documentElement;
    const card = document.querySelector(".snap-card");
    if (!card || !("IntersectionObserver" in window)) {
      root.classList.add("show-book-bar");
      return () => root.classList.remove("show-book-bar");
    }
    const io = new IntersectionObserver(([entry]) => {
      const passed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      root.classList.toggle("show-book-bar", passed);
    });
    io.observe(card);
    return () => { io.disconnect(); root.classList.remove("show-book-bar"); };
  }, []);
  return null;
}
