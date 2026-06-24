import { experiences } from "@/data/experiences";
import ExperienceCard from "@/components/ExperienceCard";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";

export default function FeaturedExperiences() {
  return (
    <SectionWrapper variant="parchment" id="experiences">
      <SectionHeading
        label="Curated Experiences"
        title="Three Ways to See Jaipur"
        subtitle="Morning, evening, or night — each experience reveals a different Jaipur, led by someone who grew up in its lanes."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.slug} experience={exp} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <CTAButton href="/experiences" variant="outline" size="lg">
          View All Experiences
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}
