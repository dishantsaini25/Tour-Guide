"use client";
import ExperienceCard from "@/components/ExperienceCard";
import MobileSlider from "@/components/MobileSlider";

/**
 * RelatedSlider
 * – Mobile (<768px): MobileSlider — 1 card at a time, auto-advance, swipe, infinite loop
 * – Desktop (≥768px): 3-column grid
 */
export default function RelatedSlider({ experiences }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <>
      <style>{`
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1023px) { .related-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 767px)  { .related-grid { display: none; } }

        .related-slider-mobile { display: none; }
        @media (max-width: 767px) { .related-slider-mobile { display: block; } }
      `}</style>

      {/* Desktop grid */}
      <div className="related-grid">
        {experiences.map(e => (
          <ExperienceCard key={e.slug} experience={e} />
        ))}
      </div>

      {/* Mobile auto-slider */}
      <div className="related-slider-mobile">
        <MobileSlider autoPlay interval={3800} ariaLabel="Related experiences">
          {experiences.map(e => (
            <ExperienceCard key={e.slug} experience={e} />
          ))}
        </MobileSlider>
      </div>
    </>
  );
}
