import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Raah India Experiences",
  description: "Privacy Policy for Raah India Experiences — how we collect, use, and protect your personal information.",
};

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";
const CH = "#1A1209";
const MU = "#6B5B2E";
const OR = "#FF8C00";
const BD = "#FFD89B";

const H2 = {
  fontFamily: PF,
  fontSize: "1.2rem",
  fontWeight: 700,
  color: CH,
  marginBottom: "10px",
  marginTop: "36px",
  lineHeight: 1.3,
};

const para = {
  fontFamily: IN,
  color: MU,
  lineHeight: 1.85,
  fontSize: "0.95rem",
  fontWeight: 300,
  marginBottom: "12px",
};

const listStyle = {
  paddingLeft: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginTop: "8px",
  marginBottom: "12px",
  fontFamily: IN,
  color: MU,
  lineHeight: 1.85,
  fontSize: "0.95rem",
  fontWeight: 300,
};

export default function PrivacyPage() {
  return (
    <>
      <style>{`.pp-back:hover { background: #E07800 !important; }`}</style>

      {/* ── Page header ── */}
      <div style={{ background: "#FFFDE7", borderBottom: `1px solid ${BD}`, paddingTop: "110px", paddingBottom: "48px", textAlign: "center" }}>
        <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "10px" }}>Legal</p>
        <div style={{ width: "36px", height: "2px", background: OR, margin: "0 auto 16px" }} />
        <h1 style={{ fontFamily: PF, fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 700, color: CH }}>Privacy Policy</h1>
        <p style={{ fontFamily: IN, color: MU, marginTop: "10px", fontSize: "0.85rem", fontWeight: 300 }}>Last Updated: August 11, 2026</p>
      </div>

      {/* ── Content ── */}
      <div style={{ background: "#FFFFFF", padding: "64px 24px 96px" }}>
        <div style={{ maxWidth: "740px", margin: "0 auto" }}>

          {/* Intro */}
          <p style={para}>
            Raah India Experiences (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our website, make an enquiry, or book an experience with us.
          </p>
          <p style={para}>
            By using our website or submitting an enquiry, you agree to the practices described in this Privacy Policy.
          </p>

          {/* 1 */}
          <h2 style={H2}>1. Information We Collect</h2>
          <p style={para}>We may collect the following types of personal information:</p>
          <p style={{ ...para, fontWeight: 600, color: CH, marginBottom: "6px" }}>Information you provide directly:</p>
          <ul style={listStyle}>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number (including WhatsApp number)</li>
            <li>Country and city of residence</li>
            <li>Preferred experience and travel dates</li>
            <li>Number of guests</li>
            <li>Dietary preferences, mobility requirements, or other special requests</li>
            <li>Any additional information you provide in your message or enquiry</li>
          </ul>
          <p style={{ ...para, fontWeight: 600, color: CH, marginBottom: "6px" }}>Information collected automatically:</p>
          <ul style={listStyle}>
            <li>Basic website usage data (e.g., pages visited, device type, browser type)</li>
            <li>IP address</li>
            <li>Referral source (how you found our website)</li>
          </ul>
          <p style={para}>We do not collect sensitive personal data such as financial information, government ID numbers, or health records unless directly relevant to your experience and provided voluntarily by you.</p>

          {/* 2 */}
          <h2 style={H2}>2. How We Use Your Information</h2>
          <p style={para}>We use the information we collect to:</p>
          <ul style={listStyle}>
            <li>Respond to your enquiries and provide information about our experiences</li>
            <li>Confirm and manage your bookings</li>
            <li>Personalise your experience based on your preferences and requirements</li>
            <li>Send booking confirmations, itinerary details, and pre-experience guidance</li>
            <li>Follow up after your experience to gather feedback</li>
            <li>Improve our website, services, and experiences</li>
            <li>Comply with legal obligations where applicable</li>
          </ul>
          <p style={para}>We will not use your information for automated decision-making or profiling.</p>

          {/* 3 */}
          <h2 style={H2}>3. Enquiry &amp; Guest Information</h2>
          <p style={para}>When you submit an enquiry through our website or contact us via WhatsApp, email, or phone, your information is used exclusively to arrange and manage your experience with us. We keep records of guest communications to ensure continuity of service and to provide a personalised experience.</p>
          <p style={para}>If you book an experience, we may retain relevant details (such as dietary preferences or mobility requirements) to ensure your safety and comfort during the experience.</p>

          {/* 4 */}
          <h2 style={H2}>4. How We Share Your Information</h2>
          <p style={para}>We do not sell, rent, or trade your personal information to third parties.</p>
          <p style={para}>We may share your information only in the following limited circumstances:</p>
          <ul style={listStyle}>
            <li><strong>Service providers:</strong> We may share necessary information with trusted third-party partners who assist us in delivering our experiences (e.g., local transport providers, accommodation partners). These parties are required to handle your information responsibly and only for the purpose of providing the agreed service.</li>
            <li><strong>Legal requirements:</strong> We may disclose your information if required by law or to protect the rights, property, or safety of Raah India Experiences, our guests, or others.</li>
          </ul>
          <p style={para}>We will always take reasonable steps to protect your personal information when sharing it with third parties.</p>

          {/* 5 */}
          <h2 style={H2}>5. Cookies &amp; Website Technology</h2>
          <p style={para}>Our website may use cookies and similar technologies to improve your browsing experience. Cookies are small files stored on your device that help us understand how visitors use our website.</p>
          <p style={para}>We may use:</p>
          <ul style={listStyle}>
            <li><strong>Essential cookies:</strong> Necessary for the website to function correctly.</li>
            <li><strong>Analytics cookies:</strong> To understand how visitors interact with our website (e.g., Google Analytics). This data is aggregated and anonymised.</li>
          </ul>
          <p style={para}>You can manage or disable cookies through your browser settings. Please note that disabling cookies may affect the functionality of our website.</p>

          {/* 6 */}
          <h2 style={H2}>6. WhatsApp, Email &amp; Other Communication</h2>
          <p style={para}>When you communicate with us via WhatsApp, email, or any other messaging platform, your messages and contact details are stored by those platforms in accordance with their own privacy policies. We recommend reviewing the privacy policies of WhatsApp (Meta), Gmail (Google), or any other platform you use to contact us.</p>
          <p style={para}>We use these communication channels solely to respond to your enquiries and to provide booking-related information.</p>

          {/* 7 */}
          <h2 style={H2}>7. Data Security</h2>
          <p style={para}>We take reasonable precautions to protect your personal information from unauthorised access, disclosure, or misuse. These measures include:</p>
          <ul style={listStyle}>
            <li>Using secure platforms for storing enquiry and booking information</li>
            <li>Limiting access to your personal information to authorised personnel only</li>
            <li>Using encrypted email communications where possible</li>
          </ul>
          <p style={para}>However, no method of electronic storage or transmission is completely secure. While we strive to protect your personal information, we cannot guarantee absolute security.</p>

          {/* 8 */}
          <h2 style={H2}>8. Data Retention</h2>
          <p style={para}>We retain your personal information for as long as necessary to fulfil the purposes described in this Privacy Policy, including:</p>
          <ul style={listStyle}>
            <li>To manage and complete your experience booking</li>
            <li>To comply with legal and tax obligations</li>
            <li>To resolve disputes or address feedback</li>
          </ul>
          <p style={para}>After this period, your personal information will be securely deleted or anonymised.</p>

          {/* 9 */}
          <h2 style={H2}>9. Third-Party Websites</h2>
          <p style={para}>Our website may contain links to third-party websites (e.g., Google Maps, social media platforms). We are not responsible for the privacy practices or content of these external websites. We encourage you to review their privacy policies before providing any personal information.</p>

          {/* 10 */}
          <h2 style={H2}>10. Photography &amp; Guest Images</h2>
          <p style={para}>During our experiences, photographs and videos may be taken. By participating in our experiences, you consent to being photographed or filmed for the purpose of:</p>
          <ul style={listStyle}>
            <li>Internal records and experience documentation</li>
            <li>Use on our website, social media, or promotional materials</li>
          </ul>
          <p style={para}>If you do not wish to be photographed or filmed, please inform your guide before the experience begins. We will respect your preference.</p>

          {/* 11 */}
          <h2 style={H2}>11. Your Privacy Rights</h2>
          <p style={para}>Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul style={listStyle}>
            <li><strong>Right to access:</strong> Request a copy of the personal information we hold about you.</li>
            <li><strong>Right to correction:</strong> Request that we correct any inaccurate or incomplete information.</li>
            <li><strong>Right to deletion:</strong> Request that we delete your personal information, subject to legal obligations.</li>
            <li><strong>Right to withdraw consent:</strong> Where processing is based on consent, you may withdraw your consent at any time.</li>
            <li><strong>Right to object:</strong> Object to certain types of processing, including direct marketing.</li>
          </ul>
          <p style={para}>To exercise any of these rights, please contact us at the details provided below.</p>

          {/* 12 */}
          <h2 style={H2}>12. Children&rsquo;s Privacy</h2>
          <p style={para}>Our website and experiences are not directed at children under the age of 13. We do not knowingly collect personal information from children under 13 without parental consent. If you believe we have collected information from a child without appropriate consent, please contact us immediately so we can take appropriate action.</p>

          {/* 13 */}
          <h2 style={H2}>13. Changes to This Privacy Policy</h2>
          <p style={para}>We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or website functionality. When we make changes, we will update the &ldquo;Last Updated&rdquo; date at the top of this page.</p>
          <p style={para}>We encourage you to review this Privacy Policy periodically. Continued use of our website after changes have been posted constitutes your acceptance of the updated Privacy Policy.</p>

          {/* 14 */}
          <h2 style={H2}>14. Contact Us</h2>
          <p style={para}>If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please contact us:</p>
          <div style={{ background: "#FFFDE7", border: `1px solid ${BD}`, borderRadius: "14px", padding: "20px 24px", marginTop: "12px", marginBottom: "16px" }}>
            <p style={{ fontFamily: PF, fontSize: "1rem", fontWeight: 700, color: CH, marginBottom: "10px" }}>Raah India Experiences</p>
            <p style={{ ...para, marginBottom: "6px" }}>Jaipur, Rajasthan, India</p>
            <p style={{ ...para, marginBottom: "6px" }}>
              Email:{" "}
              <a href="mailto:raahindiaexperiences@gmail.com" style={{ color: OR, textDecoration: "underline" }}>
                raahindiaexperiences@gmail.com
              </a>
            </p>
            <p style={{ ...para, marginBottom: 0 }}>
              Phone:{" "}
              <a href="tel:+919929992539" style={{ color: OR, textDecoration: "underline" }}>
                +91 99299 92539
              </a>
            </p>
          </div>
          <p style={para}>We will respond to all privacy-related requests within a reasonable timeframe.</p>

          {/* Back link */}
          <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: `1px solid ${BD}`, display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/"
              className="pp-back"
              style={{ background: OR, color: "#FFFFFF", padding: "12px 26px", fontFamily: IN, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRadius: "9999px" }}
            >
              Back to Home
            </Link>
            <Link href="/terms"
              style={{ border: `1.5px solid ${OR}`, color: OR, padding: "12px 26px", fontFamily: IN, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRadius: "9999px" }}
              className="pp-terms"
            >
              View Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .pp-back:hover { background: #E07800 !important; }
        .pp-terms:hover { background: rgba(255,140,0,0.08) !important; }
        @media (max-width: 640px) {
          .pp-back, .pp-terms { width: 100%; text-align: center; justify-content: center; display: block; }
        }
      `}</style>
    </>
  );
}
