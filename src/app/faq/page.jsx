import FAQPageClient from "./FAQPageClient";
import { faqs } from "@/data/faqs";

export const metadata = {
  title: "Jaipur Walking Tour FAQs",
  description:
    "Answers to common questions about Raah's Jaipur walking tours: booking, prices, what's included, meeting points, languages and group sizes.",
  alternates: {
    canonical: "https://www.raahexperiences.in/faq",
  },
  openGraph: {
    title: "Jaipur Walking Tour FAQs | Raah Experiences",
    description:
      "Answers to common questions about Raah's Jaipur walking tours: booking, prices, what's included, meeting points, languages and group sizes.",
    url: "https://www.raahexperiences.in/faq",
    images: ["https://www.raahexperiences.in/images/6591dcb7cdb1baca2de7cbf18d11b820.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaipur Walking Tour FAQs | Raah Experiences",
    description:
      "Answers to common questions about Raah's Jaipur walking tours.",
  },
};

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQPageClient />
    </>
  );
}