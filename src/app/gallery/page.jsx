"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { galleryImages, galleryCategories } from "@/data/gallery";
import SectionWrapper from "@/components/SectionWrapper";

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === "All" ? galleryImages : galleryImages.filter((i) => i.category === active);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{
          minHeight: "55vh",
          backgroundImage: "url('https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(30,27,58,0.78)" }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-14 pt-36">
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#c9943a", marginBottom: "12px" }}>
            Visual Stories
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 600,
              color: "white",
              lineHeight: 1.1,
            }}
          >
            Jaipur Through{" "}
            <span style={{ color: "#c9943a", fontStyle: "italic" }}>Our Lens</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-14" style={{ background: "linear-gradient(to top, #fdf6ed, transparent)" }} />
      </section>

      <SectionWrapper variant="parchment">
        {/* ── Filters ── */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 text-xs font-semibold transition-all duration-200"
              style={{
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "1.5px solid",
                borderColor: active === cat ? "#1e1b3a" : "#c8a882",
                background: active === cat ? "#1e1b3a" : "transparent",
                color: active === cat ? "white" : "#4a4458",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Masonry grid ── */}
        {filtered.length > 0 ? (
          <>
            <style>{`.gallery-item:hover .gallery-overlay { background: rgba(30,27,58,0.65) !important; opacity: 1 !important; }`}</style>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img) => (
              <div
                key={img.id}
                className="gallery-item break-inside-avoid group relative overflow-hidden cursor-pointer"
                onClick={() => setLightbox(img)}
                style={{ borderRadius: "2px" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={900}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div
                  className="gallery-overlay absolute inset-0 flex flex-col items-center justify-center gap-2"
                  style={{ background: "rgba(30,27,58,0)", opacity: 0, transition: "background 0.3s, opacity 0.3s" }}
                >
                  <ZoomIn size={26} style={{ color: "white" }} />
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.8rem", fontWeight: 500, textAlign: "center", padding: "0 16px" }}>{img.caption}</p>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9943a", fontWeight: 600 }}>{img.category}</span>
                </div>
              </div>
            ))}
          </div>
          </>
        ) : (
          <p style={{ textAlign: "center", color: "#4a4458", padding: "60px 0" }}>No images in this category yet.</p>
        )}
      </SectionWrapper>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(10,8,20,0.96)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 p-2.5 rounded-full transition-colors"
            style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <div
            className="relative w-full max-h-[88vh]"
            style={{ maxWidth: "1100px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src.replace("w=900", "w=1400")}
              alt={lightbox.alt}
              width={1400}
              height={900}
              className="w-full h-auto object-contain"
              priority
              style={{ maxHeight: "80vh" }}
            />
            <div style={{ background: "rgba(10,8,20,0.7)", padding: "14px 20px", marginTop: "2px" }}>
              <p style={{ color: "white", fontWeight: 500, fontSize: "0.9rem" }}>{lightbox.caption}</p>
              <p style={{ color: "#c9943a", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginTop: "4px" }}>{lightbox.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
