import "./globals.css";

/* Self-hosted fonts (same family names: "Fraunces" and "DM Sans"), so every
   existing fontFamily style keeps working — but there is no request to
   Google Fonts blocking the first paint anymore. */
import "@fontsource/fraunces/300.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/600-italic.css";
import "@fontsource/dm-sans/300.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import EnquiryPopup from "@/components/EnquiryPopup";

export const metadata = {
  metadataBase: new URL("https://www.raahexperiences.in"),
  title: {
    default: "Jaipur City Tour | Heritage Walks by Raah Experiences",
    template: "%s | Raah Experiences",
  },
  description:
    "Boutique Jaipur city tours with an English-speaking local guide. Sunrise heritage walks, food trails & hidden stories of the Pink City.",
  icons: {
    // favicon.ico handles legacy browsers; logo.png gives modern browsers a sharp icon
    icon:  [
      { url: "/favicon.ico",  sizes: "any" },
      { url: "/logo.png",     type: "image/png", sizes: "192x192" },
    ],
    apple: { url: "/logo.png", type: "image/png", sizes: "180x180" },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Jaipur City Tour | Heritage Walks by Raah Experiences",
    description:
      "Boutique Jaipur city tours with an English-speaking local guide. Sunrise heritage walks, food trails & hidden stories of the Pink City.",
    url: "https://www.raahexperiences.in",
    siteName: "Raah Experiences",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="0xOYCIdIz9rmJGreskRMlRuZrrxMIkkbt7RYOEkoSls" />
        {/* Opens the connection to the homepage hero image host early */}
        <link rel="preconnect" href="https://images.pexels.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "@id": "https://www.raahexperiences.in/#organization",
              name: "Raah Experiences",
              url: "https://www.raahexperiences.in",
              description:
                "Boutique curated walking tours & cultural experiences in Jaipur, led by an English & Spanish-speaking, government-certified local guide.",
              image: "https://www.raahexperiences.in/images/6591dcb7cdb1baca2de7cbf18d11b820.jpg",
              telephone: "+91-9929992539",
              email: "raahindiaexperiences@gmail.com",
              priceRange: "₹₹",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Jaipur",
                addressRegion: "Rajasthan",
                addressCountry: "IN",
              },
              areaServed: {
                "@type": "City",
                name: "Jaipur",
              },
              knowsLanguage: ["en", "es"],
              sameAs: [
                "https://www.instagram.com/raah.experiences",
                "https://www.facebook.com/profile.php?id=61586556497302",
              ],
              /* Still missing — fill in once you have real numbers, never fabricate:
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "REAL_VALUE",
                reviewCount: "REAL_COUNT"
              },
              */
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <EnquiryPopup />
      </body>
    </html>
  );
}