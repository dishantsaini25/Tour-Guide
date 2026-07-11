"use client";
import { experiences } from "@/data/experiences";
import ExperienceCard from "@/components/ExperienceCard";
import MobileSlider from "@/components/MobileSlider";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featured = experiences.slice(0, 3);

export default function FeaturedExperiences() {
  return (
    <>
      <style>{`
        /* Desktop grid — hidden below 768px; MobileSlider takes over */
        .fe-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 1023px) {
          .fe-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 767px) {
          .fe-grid { display: none; }
        }

        /* Mobile slider wrapper — only shown below 768px */
        .fe-slider-mobile { display: none; }
        @media (max-width: 767px) {
          .fe-slider-mobile { display: block; }
        }

        /* View All — pill CTA, static gradient + glow-only hover */
        .fe-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 40px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          color: #FFFFFF !important;
          border-radius: 9999px;
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 55%, #C45E00 100%);
          box-shadow: 0 4px 16px rgba(255,140,0,0.28);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .fe-all:hover, .fe-all:focus-visible {
          color: #FFFFFF !important;
          transform: translateY(-2px) scale(1.04);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.14),
            0 0 24px rgba(255,140,0,0.50),
            0 10px 28px rgba(255,140,0,0.32) !important;
        }
        .fe-all:active {
          transform: translateY(0) scale(1);
          box-shadow: 0 4px 16px rgba(255,140,0,0.28) !important;
        }
        .fe-all svg { transition: transform 0.25s ease; }
        .fe-all:hover svg { transform: translateX(4px); }
      `}</style>

      <SectionWrapper variant="soft" id="experiences">
        <SectionHeading
          label="Curated Experiences"
          title="Every Walk Answers a Question"
          subtitle="Each Raah experience was designed around one profound question about Jaipur. Choose the question that speaks to you."
        />

        {/* Desktop grid */}
        <div className="fe-grid">
          {featured.map(exp => <ExperienceCard key={exp.slug} experience={exp} />)}
        </div>

        {/* Mobile slider */}
        <div className="fe-slider-mobile">
          <MobileSlider autoPlay interval={4500} ariaLabel="Featured experience cards">
            {featured.map(exp => <ExperienceCard key={exp.slug} experience={exp} />)}
          </MobileSlider>
        </div>

        <div style={{ textAlign: "center", marginTop: "52px" }}>
          <Link href="/experiences" className="fe-all">
            View All Experiences <ArrowRight size={15} />
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
