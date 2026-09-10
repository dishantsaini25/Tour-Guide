import "./globals.css";
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
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
                "Boutique curated walking tours & cultural experiences in Jaipur, led by a local storyteller.",
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