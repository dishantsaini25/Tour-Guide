"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cloudImg } from "@/lib/cloudinaryImage";

/* ── Review images — each mapped to a guest ─────────────────── */
const reviewImages = [
  { src: "/review_images/01-viktorija-lithuania.jpg", alt: "Viktorija from Lithuania on tour in Jaipur", name: "Viktorija", from: "Lithuania" },
  { src: "/review_images/02-monica.jpg", alt: "Mónica from Perú exploring Jaipur", name: "Mónica", from: "Perú" },
  { src: "/review_images/03-ieva-kuode.jpg", alt: "Ieva Kuode visiting Jaipur", name: "Ieva Kuode", from: "Lithuania" },
  { src: "/review_images/04-anne-amber.jpg", alt: "Anne at Amber Palace, Jaipur", name: "Anne", from: "Amber Palace" },
  { src: "/review_images/04b-anne-group-photo.jpg", alt: "Anne and friends at Amber Palace, Jaipur", name: "Anne & Friends", from: "Amber Palace" },
  { src: "/review_images/05-jason-lehto.jpg", alt: "Jason Lehto on a Jaipur tour", name: "Jason Lehto", from: "Jaipur Tour" },
  { src: "/review_images/06-john-collins.jpg", alt: "John Collins on a guided tour in Jaipur", name: "John Collins", from: "United Kingdom" },
  { src: "/review_images/07-kate-laufert.jpg", alt: "Kate Laufert on a Jaipur experience", name: "Kate Laufert", from: "Jaipur Experience" },
  { src: "/review_images/08-florian-ivonne.jpg", alt: "Florian and Ivonne exploring Jaipur", name: "Florian & Ivonne", from: "Jaipur" },
];

/* ── Lightbox context (lifted state so both sliders share it) ─ */
function useLightbox() {
  const [lightboxIdx, setLightboxIdx] = useState(-1);
  const isOpen = lightboxIdx >= 0;
  const openLightbox = useCallback((i) => setLightboxIdx(i), []);
  const closeLightbox = useCallback(() => setLightboxIdx(-1), []);
  const nextImage = useCallback(
    () => setLightboxIdx((i) => (i + 1) % reviewImages.length),
    []
  );
  const prevImage = useCallback(
    () => setLightboxIdx((i) => (i - 1 + reviewImages.length) % reviewImages.length),
    []
  );
  return { lightboxIdx, isOpen, openLightbox, closeLightbox, nextImage, prevImage };
}

/* ── Lightbox modal ─────────────────────────────────────────── */
function Lightbox({ idx, onClose, onNext, onPrev }) {
  // Esc to close, arrow keys to navigate
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    // Lock body scroll while lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  const img = reviewImages[idx];
  if (!img) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="ri-lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        {/* Close button */}
        <button
          className="ri-lightbox-close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
        >
          <X size={24} strokeWidth={2} />
        </button>

        {/* Prev */}
        <button
          className="ri-lightbox-arrow ri-lightbox-prev"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={32} strokeWidth={2} />
        </button>

        {/* Image */}
        <motion.div
          key={idx}
          className="ri-lightbox-image-wrap"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cloudImg(img.src)}
            alt={img.alt}
            className="ri-lightbox-img"
          />
          <div className="ri-lightbox-info">
            <span className="ri-lightbox-name">{img.name}</span>
            {img.from && <span className="ri-lightbox-from">{img.from}</span>}
          </div>
        </motion.div>

        {/* Next */}
        <button
          className="ri-lightbox-arrow ri-lightbox-next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          <ChevronRight size={32} strokeWidth={2} />
        </button>

        {/* Counter */}
        <div className="ri-lightbox-counter">
          {idx + 1} / {reviewImages.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Desktop: 3 visible, 1 per click ─────────────────────────── */
const SHOW = 3;
const MAX_IDX = Math.max(0, reviewImages.length - SHOW);

function DesktopImageSlider({ onImageClick }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(MAX_IDX, i + 1));
  const goTo = (i) => setIdx(i);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  const translateX = -(idx * (100 / SHOW));

  return (
    <div>
      <div style={{ position: "relative" }}>
        {/* Prev */}
        <button
          onClick={prev}
          disabled={idx === 0}
          aria-label="Previous review photo"
          className="ri-arrow ri-arrow-left"
          style={{ opacity: idx === 0 ? 0.35 : 1 }}
        >
          <ChevronLeft size={20} strokeWidth={2.2} />
        </button>

        {/* Viewport */}
        <div style={{ overflow: "hidden", padding: "0 52px" }}>
          <motion.div
            animate={{ x: `${translateX}%` }}
            transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.9 }}
            style={{ display: "flex", gap: "20px", alignItems: "stretch" }}
          >
            {reviewImages.map((img, i) => (
              <div
                key={i}
                style={{
                  flex: `0 0 calc(${100 / SHOW}% - ${20 * (SHOW - 1) / SHOW}px)`,
                  minWidth: 0,
                }}
              >
                <ReviewImageCard img={img} onClick={() => onImageClick(i)} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Next */}
        <button
          onClick={next}
          disabled={idx === MAX_IDX}
          aria-label="Next review photo"
          className="ri-arrow ri-arrow-right"
          style={{ opacity: idx === MAX_IDX ? 0.35 : 1 }}
        >
          <ChevronRight size={20} strokeWidth={2.2} />
        </button>
      </div>

      {/* Dots */}
      <div role="tablist" aria-label="Review photo navigation" className="ri-dots">
        {Array.from({ length: MAX_IDX + 1 }).map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === idx}
            aria-label={`Position ${i + 1}`}
            onClick={() => goTo(i)}
            className={`ri-dot${i === idx ? " ri-dot-active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Mobile: single-slide auto slider ──────────────────────── */
function MobileImageSlider({ onImageClick }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const total = reviewImages.length;

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);
  const goTo = (i) => setIdx(i);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, [next, paused]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
    setTimeout(() => setPaused(false), 1000);
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >
      <div style={{ overflow: "hidden", borderRadius: "18px" }}>
        <div
          style={{
            display: "flex",
            transform: `translateX(-${idx * 100}%)`,
            transition: "transform 0.48s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {reviewImages.map((img, i) => (
            <div
              key={i}
              style={{ flex: "0 0 100%", minWidth: 0 }}
              aria-hidden={i !== idx}
            >
              <ReviewImageCard img={img} onClick={() => onImageClick(i)} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div role="tablist" aria-label="Review photo navigation" className="ri-dots">
        {reviewImages.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === idx}
            aria-label={`Go to photo ${i + 1}`}
            onClick={() => {
              setPaused(true);
              goTo(i);
              setTimeout(() => setPaused(false), 1200);
            }}
            className={`ri-dot${i === idx ? " ri-dot-active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Single image card ──────────────────────────────────────── */
function ReviewImageCard({ img, onClick }) {
  return (
    <div
      className="ri-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="ri-card-image-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cloudImg(img.src)}
          alt={img.alt}
          className="ri-card-img"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="ri-card-overlay" />
        {/* Zoom hint icon on hover */}
        <div className="ri-card-zoom-hint">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        {/* Attribution */}
        <div className="ri-card-info">
          <span className="ri-card-name">{img.name}</span>
          {img.from && <span className="ri-card-from">{img.from}</span>}
        </div>
      </div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────── */
export default function ReviewImageSlider() {
  const lb = useLightbox();

  return (
    <>
      <style>{`
        /* ── Card ── */
        .ri-card {
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 2px 14px rgba(255,140,0,0.08), 0 1px 3px rgba(0,0,0,0.04);
          transition: box-shadow 0.38s ease, transform 0.38s ease;
          height: 100%;
          background: #FFFBF0;
          cursor: pointer;
        }
        .ri-card:hover {
          box-shadow: 0 12px 38px rgba(255,140,0,0.18), 0 2px 8px rgba(0,0,0,0.06);
          transform: translateY(-4px);
        }
        .ri-card:focus-visible {
          outline: 2px solid #FF8C00;
          outline-offset: 3px;
        }

        .ri-card-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 18px;
        }
        .ri-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .ri-card:hover .ri-card-img {
          transform: scale(1.05);
        }

        /* Gradient overlay at bottom */
        .ri-card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(
            to top,
            rgba(26,18,9,0.78) 0%,
            rgba(26,18,9,0.35) 60%,
            transparent 100%
          );
          border-radius: 0 0 18px 18px;
        }

        /* Zoom hint */
        .ri-card-zoom-hint {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(0,0,0,0.45);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.3s ease, transform 0.3s ease;
          backdrop-filter: blur(4px);
        }
        .ri-card:hover .ri-card-zoom-hint {
          opacity: 1;
          transform: scale(1);
        }

        /* Attribution text on image */
        .ri-card-info {
          position: absolute;
          bottom: 14px;
          left: 16px;
          right: 16px;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .ri-card-name {
          font-family: "DM Sans", system-ui, sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          color: #FFFFFF;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ri-card-from {
          font-family: "DM Sans", system-ui, sans-serif;
          font-weight: 300;
          font-size: 0.68rem;
          color: rgba(255,255,255,0.8);
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }

        /* ── Arrow buttons ── */
        .ri-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,140,0,0.35);
          background: #FFFFFF;
          color: #FF8C00;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(255,140,0,0.15);
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .ri-arrow:hover {
          background: #FF8C00;
          color: #FFFFFF;
          box-shadow: 0 4px 18px rgba(255,140,0,0.35);
          transform: translateY(-50%) scale(1.08);
        }
        .ri-arrow:disabled { cursor: not-allowed; }
        .ri-arrow:focus-visible { outline: 2px solid #FF8C00; outline-offset: 3px; }
        .ri-arrow-left  { left: 4px; }
        .ri-arrow-right { right: 4px; }

        /* ── Dots ── */
        .ri-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          margin-top: 24px;
          flex-wrap: wrap;
          max-width: 100%;
          padding: 0 8px;
        }
        .ri-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: rgba(255,140,0,0.25);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: width 0.3s ease, background 0.3s ease;
          flex-shrink: 0;
        }
        .ri-dot-active { width: 18px; background: #FF8C00; }
        .ri-dot:focus-visible { outline: 2px solid #FF8C00; outline-offset: 2px; }

        /* ── Lightbox ── */
        .ri-lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          background: rgba(0,0,0,0.82);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: zoom-out;
        }
        .ri-lightbox-image-wrap {
          position: relative;
          max-width: 88vw;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: default;
        }
        .ri-lightbox-img {
          max-width: 88vw;
          max-height: 72vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 8px 48px rgba(0,0,0,0.5);
        }
        .ri-lightbox-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          margin-top: 12px;
        }
        .ri-lightbox-name {
          font-family: "DM Sans", system-ui, sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          color: rgba(255,255,255,0.95);
        }
        .ri-lightbox-from {
          font-family: "DM Sans", system-ui, sans-serif;
          font-weight: 300;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.6);
        }

        /* Lightbox arrows */
        .ri-lightbox-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10000;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.12);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
          backdrop-filter: blur(6px);
        }
        .ri-lightbox-arrow:hover {
          background: rgba(255,255,255,0.25);
          transform: translateY(-50%) scale(1.1);
        }
        .ri-lightbox-prev { left: 24px; }
        .ri-lightbox-next { right: 24px; }

        /* Close button */
        .ri-lightbox-close {
          position: absolute;
          top: 20px;
          right: 24px;
          z-index: 10000;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.12);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
          backdrop-filter: blur(6px);
        }
        .ri-lightbox-close:hover {
          background: rgba(255,255,255,0.25);
          transform: scale(1.1);
        }

        /* Counter */
        .ri-lightbox-counter {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10000;
          font-family: "DM Sans", system-ui, sans-serif;
          font-size: 0.8rem;
          font-weight: 300;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.1em;
        }

        /* ── Responsive ── */
        .ri-desktop { display: block; }
        .ri-mobile  { display: none; }
        @media (max-width: 767px) {
          .ri-desktop { display: none; }
          .ri-mobile  { display: block; }
          .ri-card-image-wrap { aspect-ratio: 16 / 10; }

          .ri-lightbox-prev { left: 8px; }
          .ri-lightbox-next { right: 8px; }
          .ri-lightbox-arrow { width: 40px; height: 40px; }
          .ri-lightbox-close { top: 12px; right: 12px; width: 38px; height: 38px; }
          .ri-lightbox-img { max-width: 94vw; max-height: 68vh; border-radius: 8px; }
        }
      `}</style>

      <div className="ri-desktop">
        <DesktopImageSlider onImageClick={lb.openLightbox} />
      </div>
      <div className="ri-mobile">
        <MobileImageSlider onImageClick={lb.openLightbox} />
      </div>

      {lb.isOpen && (
        <Lightbox
          idx={lb.lightboxIdx}
          onClose={lb.closeLightbox}
          onNext={lb.nextImage}
          onPrev={lb.prevImage}
        />
      )}
    </>
  );
}
