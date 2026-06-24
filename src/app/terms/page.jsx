import SectionWrapper from "@/components/SectionWrapper";
import CTAButton from "@/components/CTAButton";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Jaipur Walks experiences.",
};

export default function TermsPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[#0d1b2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Legal
          </p>
          <h1
            className="font-serif text-4xl md:text-5xl text-white font-semibold"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            Terms & Conditions
          </h1>
        </div>
      </section>

      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto prose-width space-y-8 text-[#6b6570] leading-relaxed text-sm md:text-base">
          <p className="text-xs text-[#6b6570]">Last updated: 2024</p>

          <div>
            <h2 className="font-serif text-xl text-[#0d1b2a] font-semibold mb-3" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
              1. Bookings
            </h2>
            <p>
              All bookings are confirmed only after written confirmation from Jaipur
              Walks. An experience is not confirmed until you receive a confirmation
              message via email or WhatsApp.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[#0d1b2a] font-semibold mb-3" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
              2. Cancellation Policy
            </h2>
            <p>
              We understand that travel plans change. Our general cancellation terms:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
              <li>
                Cancellation 72+ hours before the experience: Full refund or free
                rescheduling.
              </li>
              <li>
                Cancellation 24–72 hours before: 50% refund or rescheduling at our
                discretion.
              </li>
              <li>
                Cancellation within 24 hours: No refund, but we may offer a
                rescheduling option where possible.
              </li>
              <li>
                Cancellation by us: Full refund or free rescheduling offered.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[#0d1b2a] font-semibold mb-3" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
              3. Health & Safety
            </h2>
            <p>
              Guests participate in all experiences at their own risk. We take all
              reasonable precautions to ensure a safe and comfortable experience.
              Guests with specific medical conditions or mobility concerns should
              inform us in advance.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[#0d1b2a] font-semibold mb-3" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
              4. Weather
            </h2>
            <p>
              Jaipur experiences largely run regardless of weather. In extreme
              weather conditions, we reserve the right to modify or cancel an
              experience for guest safety. A full refund or rescheduling will be
              offered in such cases.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[#0d1b2a] font-semibold mb-3" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
              5. Photography
            </h2>
            <p>
              Guests are welcome to photograph their experiences for personal use.
              Commercial use of images taken during Jaipur Walks experiences requires
              prior written consent.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[#0d1b2a] font-semibold mb-3" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
              6. Contact
            </h2>
            <p>
              For questions about these terms, please contact us at{" "}
              <a href="mailto:hello@jaipurwalks.com" className="text-[#c9a84c]">
                hello@jaipurwalks.com
              </a>
              .
            </p>
          </div>

          <div className="pt-4">
            <CTAButton href="/" variant="outline">
              Back to Home
            </CTAButton>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
