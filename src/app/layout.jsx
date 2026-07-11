import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: { default: "Raah India Experiences — Curated Walking Tours in Jaipur", template: "%s | Raah India Experiences" },
  description: "Boutique curated walking tours & cultural experiences in Jaipur. Sunrise temple walks, heritage jeep rides, street food trails — led by a local storyteller.",
  keywords: ["Jaipur walking tour", "Raah India", "heritage walk Jaipur", "Jaipur food tour"],
  openGraph: {
    title: "Raah India Experiences — Curated Walking Tours in Jaipur",
    description: "Walk slowly through Jaipur's stories, rituals, flavours, forts, markets, and hidden corners.",
    images: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
