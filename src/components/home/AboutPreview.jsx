import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import CTAButton from "@/components/CTAButton";

export default function AboutPreview() {
  return (
    <SectionWrapper variant="parchment">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── Image block ── */}
        <div className="relative">
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
            <Image
              src="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80"
              alt="Jaipur — your local storyteller's city"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Accent frame */}
          <div
            className="absolute -bottom-5 -right-5 hidden lg:block"
            style={{ width: 120, height: 120, border: "2px solid rgba(201,148,58,0.35)" }}
          />
          {/* Stat badge */}
          <div
            className="absolute -top-5 -left-5 hidden lg:flex flex-col items-center justify-center"
            style={{ width: 88, height: 88, background: "#1e1b3a" }}
          >
            <span style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "2rem", fontWeight: 700, color: "#c9943a", lineHeight: 1 }}>10+</span>
            <span style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Years</span>
          </div>
        </div>

        {/* ── Text ── */}
        <div>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#c9943a", marginBottom: "10px" }}>
            Your Local Host
          </p>
          <div style={{ width: 40, height: 2, background: "#c9943a", marginBottom: "20px" }} />
          <h2
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, color: "#1e1b3a", lineHeight: 1.15, marginBottom: "24px" }}
          >
            Born in Jaipur.
            <br />
            <span style={{ color: "#c9943a", fontStyle: "italic" }}>Storyteller by nature.</span>
          </h2>
          <div style={{ color: "#4a4458", lineHeight: 1.8, fontSize: "0.95rem" }} className="space-y-4">
            <p>
              These experiences were created because Jaipur deserved better than
              bus tours and rushed monument visits. After years of welcoming
              travellers from around the world, I realised that what they
              remembered most wasn't the forts — it was the conversations, the
              morning chai, the accidental discoveries in narrow lanes.
            </p>
            <p>
              So I built experiences around those moments. Small groups. Slow pace.
              Real stories. The Jaipur I grew up in — now shared with curious
              travellers who want more than a photograph.
            </p>
          </div>
          <div className="mt-8">
            <CTAButton href="/about" variant="dark" size="lg">
              Read the Full Story
            </CTAButton>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
