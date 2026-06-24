import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";

// All verified Jaipur / Rajasthan images
const highlights = [
  {
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=700&q=80",
    label: "Hawa Mahal at Dusk",
    title: "Sunset Views",
    desc: "Watch the Pink City glow as the sun dips behind the Aravallis.",
  },
  {
    image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/17/03/1c/b5.jpg",
    label: "Open Jeep Ride",
    title: "Night Drive",
    desc: "Cruise illuminated heritage lanes in an open jeep after dark.",
  },
  {
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=700&q=80",
    label: "Walled City Lanes",
    title: "Heritage Walk",
    desc: "The bazaars of the old city come alive as evening falls.",
  },
  {
    image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/81/76/c7/early-morning-breakfast.jpg",
    label: "Morning Rituals",
    title: "Dawn & Breakfast",
    desc: "Temples, flower markets, and a traditional Rajasthani breakfast at dawn.",
  },
];

export default function SignatureHighlights() {
  return (
    <SectionWrapper variant="cream">
      <SectionHeading
        label="Signature Moments"
        title="Moments You'll Remember"
        subtitle="These aren't activities. These are the kind of moments that change how you travel."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((h, i) => (
          <div key={i} className="group relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <Image
              src={h.image}
              alt={h.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-108"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            {/* Gradient */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,27,58,0.92) 0%, rgba(30,27,58,0.2) 50%, transparent 100%)" }} />
            {/* Text */}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p style={{ color: "#c9943a", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>{h.label}</p>
              <h3 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.3rem", fontWeight: 600, color: "white", marginBottom: "6px" }}>{h.title}</h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.78rem",
                  lineHeight: 1.55,
                  maxHeight: 0,
                  overflow: "hidden",
                  opacity: 0,
                  transition: "max-height 0.3s ease, opacity 0.3s ease",
                }}
                className="group-hover:!max-h-20 group-hover:!opacity-100"
              >
                {h.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
