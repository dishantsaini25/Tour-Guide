import HeroSection from "@/components/home/HeroSection";
import FeaturedExperiences from "@/components/home/FeaturedExperiences";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import SignatureHighlights from "@/components/home/SignatureHighlights";
import AboutPreview from "@/components/home/AboutPreview";
import Testimonials from "@/components/home/Testimonials";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Jaipur Walks — Curated Local Experiences",
  description:
    "Boutique, story-driven experiences of Jaipur — sunset jeep rides, evening heritage walks, and dawn explorations crafted by a local storyteller.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedExperiences />
      <WhyChooseUs />
      <SignatureHighlights />
      <AboutPreview />
      <Testimonials />
      <FAQPreview />
      <FinalCTA />
    </>
  );
}
