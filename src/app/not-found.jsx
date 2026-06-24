import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#1e1b3a" }}
    >
      <div className="text-center">
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600, color: "#c9943a", marginBottom: "16px" }}>
          Page Not Found
        </p>
        <h1
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "clamp(5rem, 15vw, 10rem)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.08)",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "2rem",
            fontWeight: 600,
            color: "white",
            marginBottom: "12px",
          }}
        >
          Lost in Jaipur?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: "360px", margin: "0 auto 36px", lineHeight: 1.7, fontSize: "0.95rem" }}>
          This page doesn't exist — but a perfect Jaipur experience does. Let's take you somewhere beautiful.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            style={{ background: "#c9943a", color: "#1e1b3a", padding: "14px 32px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.04em", display: "inline-block" }}
          >
            Back to Home
          </Link>
          <Link
            href="/experiences"
            style={{ border: "1.5px solid rgba(255,255,255,0.4)", color: "white", padding: "14px 32px", fontWeight: 600, fontSize: "0.85rem", display: "inline-block" }}
          >
            See Experiences
          </Link>
        </div>
      </div>
    </div>
  );
}
