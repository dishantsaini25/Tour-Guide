import { experiences } from "@/data/experiences";
import { cloudImg } from "@/lib/cloudinaryImage";
import ExperiencesPageClient from "./ExperiencesPageClient";

export const metadata = {
  title: "Jaipur City Sightseeing Tours — Raah Experiences",
  description:
    "Unique things to do in Jaipur — curated heritage walks, food trails, and hidden-gem tours with expert local guides.",
  alternates: {
    canonical: "https://www.raahexperiences.in/experiences",
  },
  openGraph: {
    title: "Jaipur City Sightseeing Tours — Raah Experiences",
    description:
      "Unique things to do in Jaipur — curated heritage walks, food trails, and hidden-gem tours with expert local guides.",
    url: "https://www.raahexperiences.in/experiences",
    type: "website",
    images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1600&q=85"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaipur City Sightseeing Tours — Raah Experiences",
    description:
      "Unique things to do in Jaipur — curated heritage walks, food trails, and hidden-gem tours with expert local guides.",
    images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1600&q=85"],
  },
};

export default function ExperiencesPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://www.raahexperiences.in/experiences#itemlist",
    name: "Jaipur Experiences by Raah",
    description: "Curated walking experiences and heritage tours across Jaipur.",
    numberOfItems: experiences.length,
    itemListElement: experiences.map((exp, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.raahexperiences.in/experiences/${exp.slug}`,
      name: exp.title,
      item: {
        "@type": "TouristTrip",
        name: exp.title,
        description: exp.tagline,
        url: `https://www.raahexperiences.in/experiences/${exp.slug}`,
        image: cloudImg(exp.heroImage),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ExperiencesPageClient />
    </>
  );
}