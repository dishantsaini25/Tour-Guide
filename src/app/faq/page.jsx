import FAQPageClient from "./FAQPageClient";

export const metadata = {
  title: "FAQs",
  description:
    "Answers to common questions about Raah India's curated Jaipur experiences — from how to book and what's included, to practical details about meeting points, languages, and group sizes.",
  alternates: {
    canonical: "https://www.raahexperiences.in/faq",
  },
  openGraph: {
    title: "FAQs | Raah Experiences",
    description:
      "Answers to common questions about Raah India's curated Jaipur experiences — from how to book and what's included, to practical details about meeting points, languages, and group sizes.",
    url: "https://www.raahexperiences.in/faq",
    images: ["https://www.raahexperiences.in/images/6591dcb7cdb1baca2de7cbf18d11b820.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs | Raah Experiences",
    description:
      "Answers to common questions about Raah India's curated Jaipur experiences.",
  },
};

export default function FAQPage() {
  return <FAQPageClient />;
}
