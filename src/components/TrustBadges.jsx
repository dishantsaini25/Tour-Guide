/**
 * TrustBadges
 * ──────────────────────────────────────────────────────
 * Reusable trust/social-proof strip shown below the
 * Calendly + Form section. Uses the existing orange/amber
 * design system — no new colors introduced.
 */

const IN = "DM Sans, system-ui, sans-serif";
const PF = "Fraunces, Georgia, serif";

const badges = [
  {
    icon: "⚡",
    title: "Response within 24 hours",
    desc: "Every enquiry is answered personally — never by a bot.",
  },
  {
    icon: "🗺️",
    title: "Personalized travel planning",
    desc: "Each experience is crafted around your interests and pace.",
  },
  {
    icon: "🏮",
    title: "Local Rajasthan expert",
    desc: "Born and based in Jaipur. These are stories only a local can tell.",
  },
  {
    icon: "🔒",
    title: "Secure enquiry",
    desc: "Your details are never shared with third parties. Ever.",
  },
];

export default function TrustBadges() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      {/* Section divider */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, #FFD89B, transparent)",
          marginBottom: "44px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {badges.map(({ icon, title, desc }) => (
          <div
            key={title}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              padding: "20px 18px",
              background: "#FFFDE7",
              border: "1px solid rgba(255,216,155,0.6)",
              borderRadius: "16px",
            }}
          >
            {/* Icon badge */}
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg,#FFF3DC,#FFE8B0)",
                border: "1px solid rgba(255,216,155,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                flexShrink: 0,
              }}
            >
              {icon}
            </div>

            <div>
              <p
                style={{
                  fontFamily: PF,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#1A1209",
                  marginBottom: "4px",
                  lineHeight: 1.3,
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontFamily: IN,
                  fontSize: "0.78rem",
                  color: "#6B5B2E",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
