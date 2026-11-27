"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { cloudImgW } from "@/lib/cloudinaryImage";

// Real photos from Raah tours. Guests agreed to appear on the website (confirmed by Raah).
const PHOTOS = [
  { src: "/images/journal/raah-guests-amer-fort-maota-lake.webp", alt: "Raah guests in front of Amber Fort and Maota Lake", place: "Amber Fort", wide: true },
  { src: "/images/journal/raah-guests-khasa-pol-city-palace.webp", alt: "Raah guests with palace staff at Khasa Pol, City Palace", place: "City Palace" },
  { src: "/images/journal/raah-guests-kulhad-chai-old-city.webp", alt: "Raah guests sharing masala chai in kulhad cups in the old city", place: "Chai in the old city" },
  { src: "/images/tours/raah-guest-gaitore-chhatris.webp", alt: "A Raah guest among the domed chhatris of Gaitore", place: "Gaitore ki Chhatriyan" },
  { src: "/images/journal/raah-guests-panna-meena-ka-kund.webp", alt: "Raah guests at Panna Meena ka Kund, framed by a stone arch", place: "Panna Meena ka Kund" },
  { src: "/images/home/raah-guide-with-guest.webp", alt: "Raah's guide with a guest in Jaipur", place: "With your guide" },
  { src: "/images/journal/masala-chai-kulhad-jaipur.webp", alt: "Masala chai in clay kulhad cups on a Raah walk", place: "Masala chai" },
  { src: "/images/journal/panna-meena-ka-kund-morning.webp", alt: "A guest looking over Panna Meena ka Kund in the morning light", place: "Panna Meena ka Kund" },
];

const MOBILE_COUNT = 6;

export default function GuestMoments() {
  const [open, setOpen] = useState(-1);
  const [showAll, setShowAll] = useState(false);

  const close = useCallback(() => setOpen(-1), []);
  const prev = useCallback(() => setOpen((i) => (i - 1 + PHOTOS.length) % PHOTOS.length), []);
  const next = useCallback(() => setOpen((i) => (i + 1) % PHOTOS.length), []);

  useEffect(() => {
    if (open < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  // Simple swipe for phones
  const [touchX, setTouchX] = useState(null);

  return (
    <>
      <style>{`
        .gm-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        @media (min-width: 640px) { .gm-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; } }
        @media (min-width: 1024px) { .gm-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; } }
        .gm-item { position: relative; border: 0; padding: 0; margin: 0; cursor: pointer; border-radius: 14px; overflow: hidden; background: #2C1D07; aspect-ratio: 3 / 4; display: block; width: 100%; }
        .gm-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .gm-item:hover img, .gm-item:focus-visible img { transform: scale(1.04); }
        .gm-item:focus-visible { outline: 3px solid #FF8C00; outline-offset: 2px; }
        .gm-cap { position: absolute; left: 0; right: 0; bottom: 0; padding: 28px 10px 10px; background: linear-gradient(to top, rgba(20,10,0,.72), rgba(20,10,0,0)); color: #fff; font-family: 'DM Sans', system-ui, sans-serif; font-size: .78rem; font-weight: 600; text-align: left; letter-spacing: .02em; }
        .gm-hide-mobile { display: none; }
        @media (min-width: 640px) { .gm-hide-mobile { display: block; } }
        .gm-more { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; min-height: 44px; border-radius: 9999px; border: 1.5px solid #FF8C00; color: #FFD89B; background: transparent; font-family: 'DM Sans', system-ui, sans-serif; font-weight: 700; font-size: .8rem; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; }
        @media (min-width: 640px) { .gm-more { display: none; } }
        .gm-link { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; color: #FFD89B; font-family: 'DM Sans', system-ui, sans-serif; font-weight: 700; font-size: .85rem; text-decoration: none; }
        .gm-box { position: fixed; inset: 0; z-index: 10000; background: rgba(10,6,0,.92); display: flex; align-items: center; justify-content: center; padding: max(16px, env(safe-area-inset-top, 0px)) max(16px, env(safe-area-inset-right, 0px)) max(16px, env(safe-area-inset-bottom, 0px)) max(16px, env(safe-area-inset-left, 0px)); }
        .gm-box figure { margin: 0; max-width: min(1000px, 100%); max-height: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .gm-box img { max-width: 100%; max-height: calc(100vh - 140px); object-fit: contain; border-radius: 10px; }
        .gm-box figcaption { color: #fff; font-family: 'DM Sans', system-ui, sans-serif; font-size: .9rem; text-align: center; }
        .gm-btn { position: absolute; width: 44px; height: 44px; border-radius: 9999px; border: 0; background: rgba(255,255,255,.14); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .gm-btn:hover, .gm-btn:focus-visible { background: rgba(255,140,0,.85); }
        .gm-close { top: max(16px, env(safe-area-inset-top, 0px)); right: max(16px, env(safe-area-inset-right, 0px)); }
        .gm-prev { left: max(10px, env(safe-area-inset-left, 0px)); top: 50%; transform: translateY(-50%); }
        .gm-next { right: max(10px, env(safe-area-inset-right, 0px)); top: 50%; transform: translateY(-50%); }
      `}</style>

      <SectionWrapper variant="dark" id="guest-moments">
        <SectionHeading
          label="Photo Gallery"
          dark
          title="Jaipur, Through Our Guests' Eyes"
          subtitle="Real moments from Raah walks and tours: the forts, the palaces, the stepwells and the chai stops in between."
        />

        <div className="gm-grid">
          {PHOTOS.map((p, i) => (
            <button
              key={p.src}
              type="button"
              className={`gm-item${!showAll && i >= MOBILE_COUNT ? " gm-hide-mobile" : ""}`}
              onClick={() => setOpen(i)}
              aria-label={`Open photo: ${p.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cloudImgW(p.src, 640)} alt={p.alt} loading="lazy" decoding="async" />
              <span className="gm-cap">{p.place}</span>
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "12px 28px", marginTop: "28px" }}>
          {!showAll && (
            <button type="button" className="gm-more" onClick={() => setShowAll(true)}>
              Show more photos
            </button>
          )}
          <Link href="/gallery" className="gm-link">
            See the full gallery <ArrowRight size={15} />
          </Link>
        </div>
      </SectionWrapper>

      {open >= 0 && (
        <div
          className="gm-box"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (dx > 50) prev();
            if (dx < -50) next();
            setTouchX(null);
          }}
        >
          <button type="button" className="gm-btn gm-close" onClick={close} aria-label="Close photo"><X size={20} /></button>
          <button type="button" className="gm-btn gm-prev" onClick={prev} aria-label="Previous photo"><ChevronLeft size={22} /></button>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cloudImgW(PHOTOS[open].src, 1400)} alt={PHOTOS[open].alt} />
            <figcaption>{PHOTOS[open].place} · {open + 1} / {PHOTOS.length}</figcaption>
          </figure>
          <button type="button" className="gm-btn gm-next" onClick={next} aria-label="Next photo"><ChevronRight size={22} /></button>
        </div>
      )}
    </>
  );
}
