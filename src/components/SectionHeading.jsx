export default function SectionHeading({ label, title, subtitle, align = "center", dark = false }) {
  const left = align === "left";
  const wrap = left
    ? { textAlign: "left", marginBottom: "48px" }
    : { textAlign: "center", maxWidth: "680px", margin: "0 auto 56px" };

  return (
    <div style={wrap}>
      {label && (
        <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: "#FF8C00", marginBottom: "10px" }}>
          {label}
        </p>
      )}
      <div style={{ width: "36px", height: "2px", background: "linear-gradient(to right, #FF8C00, #F5A623)", marginBottom: "16px", ...(left ? {} : { margin: "0 auto 16px" }) }} />
      {title && (
        <h2 style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700, fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.1, color: dark ? "#FFFFFF" : "#1A1209", marginBottom: subtitle ? "14px" : 0 }}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "1rem", lineHeight: 1.8, color: dark ? "rgba(255,255,255,0.7)" : "#6B5B2E", fontWeight: 300 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
