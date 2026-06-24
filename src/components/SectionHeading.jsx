/**
 * SectionHeading — reusable heading block
 */
export default function SectionHeading({ label, title, subtitle, align = "center", dark = false }) {
  const isLeft = align === "left";
  return (
    <div className={`mb-14 ${isLeft ? "text-left" : "text-center mx-auto"} max-w-2xl ${isLeft ? "" : "mx-auto"}`}>
      {label && (
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#c9943a", marginBottom: "12px" }}>
          {label}
        </p>
      )}
      {/* Gold line */}
      {label && (
        <div
          className={isLeft ? "" : "mx-auto"}
          style={{ width: 40, height: 2, background: "#c9943a", marginBottom: "16px", ...(isLeft ? {} : { marginLeft: "auto", marginRight: "auto" }) }}
        />
      )}
      {title && (
        <h2
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 600,
            lineHeight: 1.15,
            color: dark ? "#fff" : "#1e1b3a",
            marginBottom: subtitle ? "16px" : 0,
          }}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p style={{ color: dark ? "rgba(255,255,255,0.6)" : "#4a4458", lineHeight: 1.7, fontSize: "1.05rem" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
