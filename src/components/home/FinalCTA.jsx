import CTAButton from "@/components/CTAButton";

export default function FinalCTA() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=85')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(30,27,58,0.88)" }} />
      <div className="relative z-10 max-w-2xl mx-auto px-5 text-center">
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600, color: "#c9943a", marginBottom: "16px" }}>
          Start Planning
        </p>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 600,
            color: "white",
            lineHeight: 1.15,
            marginBottom: "20px",
          }}
        >
          Your Jaipur Story
          <br />
          <span style={{ color: "#c9943a", fontStyle: "italic" }}>Starts Here</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "36px" }}>
          Every experience is limited to a small group. Spots fill quickly during
          the season. Get in touch and we'll plan your perfect Jaipur experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href="/contact" variant="primary" size="lg">Book Your Experience</CTAButton>
          <CTAButton href="/experiences" variant="outline-white" size="lg">Browse Experiences</CTAButton>
        </div>
      </div>
    </section>
  );
}
