export default function SectionHeading({ label, title, subtitle, align = "center", dark = false }) {
  const left = align === "left";
  const wrap = left
    ? { textAlign: "left", marginBottom: "48px" }
    : { textAlign: "center", maxWidth: "680px", margin: "0 auto 56px" };

  return (
    <div style={wrap}>
      {label && (
        <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: "#B07D3E", marginBottom: "10px" }}>
          {label}
        </p>
      )}
      <div style={{ width: "36px", height: "1.5px", background: "linear-gradient(to right, #B07D3E, #C89A5A)", marginBottom: "16px", ...(left ? {} : { margin: "0 auto 16px" }) }} />
      {title && (
        <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700, fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.1, color: dark ? "#F0EDE8" : "#1A1F1C", marginBottom: subtitle ? "14px" : 0 }}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "1rem", lineHeight: 1.8, color: dark ? "rgba(240,237,232,0.6)" : "#4A5550", fontWeight: 300 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
