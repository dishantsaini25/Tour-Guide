"use client";
import Image from "next/image";
import MobileSlider from "@/components/MobileSlider";

/**
 * GallerySlider
 * – Desktop: CSS grid (3 columns)
 * – Mobile: MobileSlider auto-carousel (1 image at a time, swipe, infinite loop)
 */
export default function GallerySlider({ images, title }) {
  if (!images || images.length === 0) return null;

  return (
    <>
      <style>{`
        .gal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 767px) { .gal-grid { display: none; } }

        .gal-slider-mobile { display: none; }
        @media (max-width: 767px) { .gal-slider-mobile { display: block; } }

        .gal-img-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid rgba(255,216,155,0.5);
          box-shadow: 0 2px 10px rgba(255,140,0,0.07);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .gal-img-wrap:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(255,140,0,0.14);
        }
        .gal-img { transition: transform 0.55s ease; }
        .gal-img-wrap:hover .gal-img { transform: scale(1.05); }
      `}</style>

      {/* Desktop grid */}
      <div className="gal-grid">
        {images.map((img, i) => (
          <div key={i} className="gal-img-wrap">
            <Image
              src={img.src}
              alt={img.alt || `${title} — moment ${i + 1}`}
              fill
              className="object-cover gal-img"
              sizes="(max-width:1024px) 33vw, 22vw"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Mobile auto-slider */}
      <div className="gal-slider-mobile">
        <MobileSlider autoPlay interval={3500} ariaLabel={`${title} gallery`}>
          {images.map((img, i) => (
            <div key={i} className="gal-img-wrap" style={{ margin: "0 2px" }}>
              <Image
                src={img.src}
                alt={img.alt || `${title} — moment ${i + 1}`}
                fill
                className="object-cover"
                sizes="90vw"
                loading="lazy"
              />
            </div>
          ))}
        </MobileSlider>
      </div>
    </>
  );
}
