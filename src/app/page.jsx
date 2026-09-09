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
  title: "Jaipur City Tour | Heritage Walks by Raah Experiences",
  description:
    "Boutique Jaipur city tours with an English-speaking local guide. Small groups, sunrise heritage walks, food trails & hidden stories of the Pink City.",
  alternates: {
    canonical: "https://www.raahexperiences.in",
  },
  openGraph: {
    title: "Jaipur City Tour | Heritage Walks by Raah Experiences",
    description:
      "Boutique Jaipur city tours with an English-speaking local guide. Small groups, sunrise heritage walks, food trails & hidden stories of the Pink City.",
    url: "https://www.raahexperiences.in",
    type: "website",
    images: ["https://www.raahexperiences.in/images/6591dcb7cdb1baca2de7cbf18d11b820.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaipur City Tour | Heritage Walks by Raah Experiences",
    description:
      "Boutique Jaipur city tours with an English-speaking local guide.",
  },
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