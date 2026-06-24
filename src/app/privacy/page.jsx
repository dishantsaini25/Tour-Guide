import SectionWrapper from "@/components/SectionWrapper";
import CTAButton from "@/components/CTAButton";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Jaipur Walks.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#faf8f4] to-transparent" />
      </section>

      <SectionWrapper variant="light">
        <div className="max-w-3xl mx-auto prose-width space-y-8 text-[#6b6570] leading-relaxed text-sm md:text-base">
          <p className="text-xs text-[#6b6570]">Last updated: 2024</p>

          <div>
            <h2 className="font-serif text-xl text-[#0d1b2a] font-semibold mb-3" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
              1. Information We Collect
            </h2>
            <p>
              When you submit a booking enquiry through our contact form, we collect
              your name, email address, phone number, and the details you provide
              about your travel preferences. This information is used solely to respond
              to your enquiry and arrange your experience.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[#0d1b2a] font-semibold mb-3" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
              2. How We Use Your Information
            </h2>
            <p>
              We use your contact information to respond to your booking enquiries,
              communicate about your experience, and send relevant information about
              your booked tour. We do not use your information for marketing without
              your explicit consent.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[#0d1b2a] font-semibold mb-3" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
              3. Data Sharing
            </h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information
              to third parties. Your data is kept strictly confidential and is only
              accessible to the Jaipur Walks team.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[#0d1b2a] font-semibold mb-3" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
              4. Cookies
            </h2>
            <p>
              This website does not currently use tracking cookies or analytics
              platforms that collect personal data beyond standard server logs.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[#0d1b2a] font-semibold mb-3" style={{ fontFamily: "Playfair Display, Georgia, serif" }}>
              5. Contact
            </h2>
            <p>
              For any privacy-related questions, please email us at{" "}
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
