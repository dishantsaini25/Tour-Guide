import HeroSection from "@/components/home/HeroSection";
import StatsStrip from "@/components/home/StatsStrip";
import FeaturedExperiences from "@/components/home/FeaturedExperiences";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import JaipurInANutshell from "@/components/home/JaipurInANutshell";
import AboutPreview from "@/components/home/AboutPreview";
import Testimonials from "@/components/home/Testimonials";
import JournalPreview from "@/components/home/JournalPreview";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Raah India Experiences — Curated Walking Tours in Jaipur",
  description: "Boutique walking tours & cultural experiences in Jaipur. Sunrise temples, heritage jeep rides, street food trails — led by a local storyteller.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <FeaturedExperiences />
      <WhyChooseUs />
      <JaipurInANutshell />
      <AboutPreview />
      <Testimonials />
      <JournalPreview />
      <FinalCTA />
    </>
  );
}
