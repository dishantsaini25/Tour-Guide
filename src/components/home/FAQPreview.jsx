import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/FAQAccordion";
import CTAButton from "@/components/CTAButton";

const faqs = [
  { q: "Are these experiences private or small group?", a: "All experiences are offered as small private groups — typically 2–6 guests. This ensures an intimate, personalised atmosphere where you can ask questions, set the pace, and connect genuinely." },
  { q: "Is transportation included in the experiences?", a: "The Blue Hour includes an open jeep for the entire duration. The walking experiences are on foot — transportation to the meeting point is not included, but we help arrange it on request." },
  { q: "Can food preferences and dietary restrictions be accommodated?", a: "Yes, absolutely. Please mention your preferences when booking. All food tastings on the morning and evening walks are vegetarian by default." },
  { q: "Can I request a custom Jaipur experience?", a: "Yes — if you have something specific in mind, get in touch via the contact form or WhatsApp and we'll craft something around your interests and schedule." },
];

export default function FAQPreview() {
  return (
    <SectionWrapper variant="cream">
      <div className="max-w-2xl mx-auto">
        <SectionHeading label="Common Questions" title="Before You Book" subtitle="Quick answers to the questions guests ask most often." />
        <FAQAccordion items={faqs} />
        <div className="mt-10 text-center">
          <CTAButton href="/contact" variant="primary" size="lg">Ask Us Anything</CTAButton>
        </div>
      </div>
    </SectionWrapper>
  );
}
