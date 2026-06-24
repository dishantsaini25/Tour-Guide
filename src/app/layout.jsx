import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: {
    default: "Jaipur Walks — Curated Local Experiences",
    template: "%s | Jaipur Walks",
  },
  description:
    "Boutique, story-driven experiences of Jaipur — sunset jeep rides, evening heritage walks, and dawn explorations crafted by a local storyteller.",
  keywords: ["Jaipur tour", "Jaipur local guide", "heritage walk Jaipur", "Hawa Mahal", "Nahargarh Fort sunset", "Jaipur food tour"],
  openGraph: {
    title: "Jaipur Walks — Curated Local Experiences",
    description: "Boutique, story-driven experiences of Jaipur crafted by a local storyteller.",
    images: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
