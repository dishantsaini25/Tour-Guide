"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cloudImg } from "@/lib/cloudinaryImage";

export default function JournalImageGrid({ images }) {
  const [openIdx, setOpenIdx] = useState(null);

  const close = () => setOpenIdx(null);
  const prev = () => setOpenIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setOpenIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setOpenIdx(i)}
            aria-label={`Open image ${i + 1} of ${images.length}`}
            style={{
              position: "relative",
              height: "150px",
              borderRadius: "14px",
              overflow: "hidden",
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: "none",
            }}
          >
            <Image
              src={cloudImg(img.src)}
              alt={img.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width:768px) 50vw, 240px"
            />
          </button>
        ))}
      </div>

      {openIdx !== null && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,5,0,0.92)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
            style={{
              position: "absolute", top: "20px", right: "20px",
              width: "40px", height: "40px", borderRadius: "50%",
              background: "rgba(255,255,255,0.12)", border: "none",
              color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              style={{
                position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                width: "44px", height: "44px", borderRadius: "50%",
                background: "rgba(255,255,255,0.12)", border: "none",
                color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={22} />
            </button>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", width: "min(90vw, 900px)", height: "min(80vh, 700px)" }}
          >
            <Image
              src={cloudImg(images[openIdx].src)}
              alt={images[openIdx].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              style={{
                position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)",
                width: "44px", height: "44px", borderRadius: "50%",
                background: "rgba(255,255,255,0.12)", border: "none",
                color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>
      )}
    </>
  );
}