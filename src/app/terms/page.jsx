import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Raah India Experiences",
  description: "Terms and Conditions for Raah India Experiences — the rules and policies governing our curated walking tours in Jaipur.",
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

export default function TermsPage() {
  return (
    <>
      {/* ── Page header ── */}
      <div style={{ background: "#FFFDE7", borderBottom: `1px solid ${BD}`, paddingTop: "110px", paddingBottom: "48px", textAlign: "center" }}>
        <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "10px" }}>Legal</p>
        <div style={{ width: "36px", height: "2px", background: OR, margin: "0 auto 16px" }} />
        <h1 style={{ fontFamily: PF, fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 700, color: CH }}>Terms &amp; Conditions</h1>
        <p style={{ fontFamily: IN, color: MU, marginTop: "10px", fontSize: "0.85rem", fontWeight: 300 }}>Last Updated: August 11, 2026</p>
      </div>

      {/* ── Content ── */}
      <div style={{ background: "#FFFFFF", padding: "64px 24px 96px" }}>
        <div style={{ maxWidth: "740px", margin: "0 auto" }}>

          {/* Intro */}
          <p style={para}>
            Please read these Terms &amp; Conditions carefully before booking or participating in any experience offered by Raah India Experiences. By making an enquiry or booking an experience with us, you agree to be bound by these Terms &amp; Conditions.
          </p>

          {/* 1 */}
          <h2 style={H2}>1. About Raah India Experiences</h2>
          <p style={para}>
            Raah India Experiences (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is a curated walking tour and cultural experience company based in Jaipur, Rajasthan, India. We offer a range of walking tours, heritage experiences, culinary journeys, and cultural immersion activities for travellers visiting Jaipur and the surrounding region.
          </p>

          {/* 2 */}
          <h2 style={H2}>2. Enquiries &amp; Arrangements</h2>
          <p style={para}>All bookings are made by direct communication through our website contact form, WhatsApp, email, or phone. A booking is confirmed only when you receive a written confirmation from us via email or WhatsApp. Until confirmation is received, no booking is considered secured.</p>
          <p style={para}>We reserve the right to decline any enquiry or booking at our sole discretion.</p>

          {/* 3 */}
          <h2 style={H2}>3. Group Size</h2>
          <p style={para}>Our experiences are designed for small groups to maintain quality, intimacy, and a personalised experience. Maximum group sizes vary by experience type and are communicated at the time of booking.</p>
          <p style={para}>For private bookings, the group size is agreed upon in advance and confirmed in writing.</p>

          {/* 4 */}
          <h2 style={H2}>4. Experience Details</h2>
          <p style={para}>All experience descriptions, routes, timings, and inclusions provided on our website and in our communications are for informational purposes. While we make every effort to deliver experiences as described, we reserve the right to modify routes, timings, or content based on:</p>
          <ul style={listStyle}>
            <li>Weather conditions</li>
            <li>Safety considerations</li>
            <li>Access restrictions or local events</li>
            <li>Guest requirements or physical ability</li>
          </ul>
          <p style={para}>Any changes will be communicated to guests in advance wherever possible.</p>

          {/* 5 */}
          <h2 style={H2}>5. Walking, Trekking &amp; Physical Activity</h2>
          <p style={para}>Many of our experiences involve walking on uneven terrain, climbing steps, navigating narrow lanes, and spending time outdoors in varying weather conditions. By booking an experience, you confirm that:</p>
          <ul style={listStyle}>
            <li>You are physically capable of participating in the experience as described</li>
            <li>You have disclosed any medical conditions, mobility limitations, or physical restrictions that may affect your participation</li>
            <li>You accept responsibility for assessing your own fitness and suitability for the experience</li>
          </ul>
          <p style={para}>We are not liable for injuries or health issues arising from failure to disclose relevant medical information.</p>

          {/* 6 */}
          <h2 style={H2}>6. Guest Responsibilities</h2>
          <p style={para}>Guests are expected to:</p>
          <ul style={listStyle}>
            <li>Behave respectfully towards local communities, artisans, vendors, religious sites, and other guests</li>
            <li>Follow the guidance of their experience host at all times</li>
            <li>Dress modestly when visiting temples, mosques, or other religious and cultural spaces</li>
            <li>Refrain from behaviour that is disruptive, offensive, or harmful to others</li>
            <li>Not be under the influence of alcohol or substances during an experience</li>
          </ul>
          <p style={para}>We reserve the right to remove a guest from an experience without refund if their behaviour is deemed unsafe, disrespectful, or disruptive.</p>

          {/* 7 */}
          <h2 style={H2}>7. Meeting Point &amp; Punctuality</h2>
          <p style={para}>Meeting point details are confirmed in advance. Guests are requested to arrive at least 10 minutes before the scheduled start time. If a guest arrives late, we will attempt to accommodate them, but we are not obligated to wait beyond a reasonable period or to extend the experience duration.</p>
          <p style={para}>If a guest fails to appear at the meeting point without prior notice, the booking will be treated as a no-show, and no refund will be provided.</p>

          {/* 8 */}
          <h2 style={H2}>8. Cancellation &amp; Rescheduling</h2>
          <p style={{ ...para, fontWeight: 600, color: CH, marginBottom: "6px" }}>By the guest:</p>
          <ul style={listStyle}>
            <li><strong>More than 48 hours before the experience:</strong> Full refund or free rescheduling.</li>
            <li><strong>24–48 hours before the experience:</strong> 50% refund or rescheduling at our discretion.</li>
            <li><strong>Less than 24 hours before the experience:</strong> No refund. Rescheduling may be offered at our discretion.</li>
            <li><strong>No-show:</strong> No refund.</li>
          </ul>
          <p style={{ ...para, fontWeight: 600, color: CH, marginBottom: "6px" }}>By Raah India Experiences:</p>
          <p style={para}>In the unlikely event that we must cancel an experience due to unforeseen circumstances, we will offer a full refund or reschedule the experience at no additional cost.</p>
          <p style={para}>All cancellation and rescheduling requests must be made in writing via WhatsApp or email.</p>

          {/* 9 */}
          <h2 style={H2}>9. Payment</h2>
          <p style={para}>Payment terms are communicated and agreed upon at the time of booking. Currently, online payment is not processed directly through our website. Payment arrangements (such as bank transfer, UPI, or cash on the day) are agreed upon individually with each guest at the time of booking confirmation.</p>
          <p style={para}>Prices are subject to change without notice. The price confirmed at the time of booking will be honoured.</p>

          {/* 10 */}
          <h2 style={H2}>10. Weather &amp; Unforeseen Conditions</h2>
          <p style={para}>Our experiences operate in all reasonable weather conditions. In the event of severe weather (e.g., heavy monsoon rain, extreme heat warnings, or local emergencies), we reserve the right to modify or cancel the experience for guest safety.</p>
          <p style={para}>In such cases, we will offer a full reschedule or refund. We are not liable for any travel, accommodation, or other costs incurred by guests as a result of experience cancellation due to weather or unforeseen circumstances.</p>

          {/* 11 */}
          <h2 style={H2}>11. Food &amp; Dietary Requirements</h2>
          <p style={para}>Some experiences include food tastings or meals. Guests with dietary restrictions, allergies, or food preferences must inform us at the time of booking. While we make every effort to accommodate requirements, we cannot guarantee the absence of allergens in all foods encountered during the experience.</p>
          <p style={para}>Guests with severe allergies participate at their own risk and should carry appropriate medication at all times.</p>

          {/* 12 */}
          <h2 style={H2}>12. Third-Party Providers</h2>
          <p style={para}>Some experiences involve third-party services, including but not limited to transport providers, heritage sites, and local vendors. While we carefully select our partners, we are not responsible for the acts, omissions, or failures of third-party service providers.</p>
          <p style={para}>Entry fees to monuments, heritage sites, or museums are not included unless explicitly stated. Guests are responsible for purchasing their own entry tickets where required.</p>

          {/* 13 */}
          <h2 style={H2}>13. No Forced Shopping</h2>
          <p style={para}>Raah India Experiences does not receive any commission, kickback, or payment from any shop, market, or vendor. We never take guests to shopping stops unless explicitly requested by the guest. Any purchases made by guests during an experience are entirely voluntary and at the guest&apos;s own discretion.</p>

          {/* 14 */}
          <h2 style={H2}>14. Personal Belongings</h2>
          <p style={para}>Guests are responsible for their personal belongings at all times during an experience. Raah India Experiences is not liable for the loss, theft, or damage of any personal property during an experience.</p>

          {/* 15 */}
          <h2 style={H2}>15. Photography &amp; Content</h2>
          <p style={para}>Guests are welcome to take personal photographs and videos during experiences for non-commercial use. Commercial use of photographs or videos taken during a Raah India Experiences experience requires prior written consent from us.</p>
          <p style={para}>By participating in an experience, guests grant Raah India Experiences the right to use photographs and videos taken during the experience for marketing, website, and social media purposes. Guests who do not wish to be photographed or filmed must inform the host before the experience begins.</p>

          {/* 16 */}
          <h2 style={H2}>16. Website Content</h2>
          <p style={para}>All content on the Raah India Experiences website, including text, photographs, videos, and itinerary descriptions, is provided for informational purposes only. We make every effort to ensure the accuracy of this content but do not guarantee that all information is complete, accurate, or up to date at all times.</p>

          {/* 17 */}
          <h2 style={H2}>17. Intellectual Property</h2>
          <p style={para}>All content on the Raah India Experiences website and all materials provided to guests (including itineraries, descriptions, and original photographs) are the intellectual property of Raah India Experiences. This content may not be reproduced, copied, distributed, or used commercially without prior written permission.</p>

          {/* 18 */}
          <h2 style={H2}>18. Responsible Tourism</h2>
          <p style={para}>Raah India Experiences is committed to responsible tourism that respects local communities, cultures, and the environment. We ask all guests to:</p>
          <ul style={listStyle}>
            <li>Treat local communities with respect and dignity</li>
            <li>Avoid littering or causing damage to natural or heritage environments</li>
            <li>Follow any cultural sensitivities highlighted by the host</li>
            <li>Engage authentically and considerately with local people and places</li>
          </ul>

          {/* 19 */}
          <h2 style={H2}>19. Safety &amp; Conduct</h2>
          <p style={para}>The safety of our guests is our highest priority. Guests must follow all safety instructions provided by their experience host. In the event of a safety concern, guests must inform the host immediately.</p>
          <p style={para}>Raah India Experiences cannot be held liable for accidents, injuries, or illnesses arising from the guest&apos;s failure to follow safety guidance or from pre-existing health conditions not disclosed to us.</p>

          {/* 20 */}
          <h2 style={H2}>20. Limitation of Liability</h2>
          <p style={para}>To the fullest extent permitted by law, Raah India Experiences shall not be liable for:</p>
          <ul style={listStyle}>
            <li>Any injury, illness, loss, or damage sustained during an experience</li>
            <li>Any loss or damage arising from third-party services</li>
            <li>Any indirect, incidental, or consequential losses</li>
            <li>Costs incurred due to experience modification, cancellation, or delay</li>
          </ul>
          <p style={para}>Our total liability to any guest shall not exceed the amount paid by that guest for the specific experience in question.</p>

          {/* 21 */}
          <h2 style={H2}>21. Force Majeure</h2>
          <p style={para}>Raah India Experiences shall not be liable for any failure or delay in performing our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, civil unrest, government restrictions, pandemics, or extreme weather events.</p>
          <p style={para}>In such cases, we will make every reasonable effort to reschedule the experience or provide a refund.</p>

          {/* 22 */}
          <h2 style={H2}>22. Travel Insurance</h2>
          <p style={para}>We strongly recommend that all guests obtain comprehensive travel insurance before booking an experience. This should include coverage for trip cancellation, medical emergencies, personal liability, and loss of personal belongings. Raah India Experiences is not responsible for any losses that could have been covered by appropriate travel insurance.</p>

          {/* 23 */}
          <h2 style={H2}>23. Changes to These Terms</h2>
          <p style={para}>We reserve the right to update or modify these Terms &amp; Conditions at any time. Changes will be published on this page with an updated &ldquo;Last Updated&rdquo; date. Continued use of our website or services after any changes constitutes your acceptance of the updated Terms &amp; Conditions.</p>

          {/* 24 */}
          <h2 style={H2}>24. Governing Law</h2>
          <p style={para}>These Terms &amp; Conditions are governed by the laws of India. Any disputes arising from or related to these Terms shall be subject to the exclusive jurisdiction of the courts of Jaipur, Rajasthan, India.</p>

          {/* 25 */}
          <h2 style={H2}>25. Contact Us</h2>
          <p style={para}>If you have any questions about these Terms &amp; Conditions, please contact us:</p>
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
              <a href="tel:+919928026539" style={{ color: OR, textDecoration: "underline" }}>
                +91 99280 26539
              </a>
            </p>
          </div>

          {/* Back links */}
          <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: `1px solid ${BD}`, display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/"
              className="tc-back"
              style={{ background: OR, color: "#FFFFFF", padding: "12px 26px", fontFamily: IN, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRadius: "9999px" }}
            >
              Back to Home
            </Link>
            <Link href="/privacy"
              style={{ border: `1.5px solid ${OR}`, color: OR, padding: "12px 26px", fontFamily: IN, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRadius: "9999px" }}
              className="tc-privacy"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .tc-back:hover { background: #E07800 !important; }
        .tc-privacy:hover { background: rgba(255,140,0,0.08) !important; }
        @media (max-width: 640px) {
          .tc-back, .tc-privacy { width: 100%; text-align: center; display: block; }
        }
      `}</style>
    </>
  );
}
