"use client";
import { experiences } from "@/data/experiences";
import ExperienceCard from "@/components/ExperienceCard";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

const featured = experiences.slice(0, 3);

export default function FeaturedExperiences() {
  return (
    <>
      <style>{`
        .fe-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        @media(max-width:1023px) { .fe-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:767px) {
          .fe-grid { display:flex; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; gap:16px; padding:4px 20px 20px; margin:0 -20px; scrollbar-width:none; }
          .fe-grid::-webkit-scrollbar { display:none; }
          .fe-grid > * { flex:0 0 88%; scroll-snap-align:start; min-width:0; }
        }
        .fe-all { border:1.5px solid #1E4D3A; color:#1E4D3A; font-family:'DM Sans',system-ui,sans-serif; transition:all .2s; }
        .fe-all:hover { background:#1E4D3A!important; color:#F0EDE8!important; }
      `}</style>
      <SectionWrapper variant="main" id="experiences">
        <SectionHeading
          label="Curated Experiences"
          title="Every Walk Answers a Question"
          subtitle="Each Raah experience was designed around one profound question about Jaipur. Choose the question that speaks to you."
        />
        <div className="fe-grid">
          {featured.map(exp => <ExperienceCard key={exp.slug} experience={exp} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link href="/experiences" className="fe-all"
            style={{ display: "inline-block", padding: "13px 34px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}
          >View All Experiences</Link>
        </div>
      </SectionWrapper>
    </>
  );
}
