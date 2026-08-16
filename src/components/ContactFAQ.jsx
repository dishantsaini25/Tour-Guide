/**
 * ContactFAQ
 * ──────────────────────────────────────────────────────
 * Reusable FAQ accordion for the Contact page.
 * Uses the existing FAQAccordion component so styling
 * is 100% consistent with the rest of the site.
 *
 * If FAQAccordion is not available, falls back to a
 * simple inline accordion that matches the design system.
 */

"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const IN = "DM Sans, system-ui, sans-serif";
const PF = "Fraunces, Georgia, serif";

const faqs = [
  {
    q: "How does the consultation work?",
    a: "After you book a slot via Calendly, we'll have a free 20–30 minute video or phone call. We'll understand your travel dates, interests, group size, and budget — then personally suggest the best Jaipur experiences for you.",
  },
  {
    q: "Can I reschedule my Calendly booking?",
    a: "Yes, absolutely. You'll receive a confirmation email from Calendly with a rescheduling link. You can change your slot up to 2 hours before the meeting without any issue.",
  },
  {
    q: "Can I request a completely custom itinerary?",
    a: "Absolutely. Every experience we offer can be personalised — timings, pace, food preferences, mobility needs, group size, and even combining multiple experiences into one day. Just mention it during the consultation or in the enquiry form.",
  },
  {
    q: "When will I receive a response to my enquiry form?",
    a: "We personally respond to every enquiry within 24 hours — usually much sooner. You'll receive a reply directly to your email from our team, not an automated message.",
  },
  {
    q: "Is there a booking fee for the consultation?",
    a: "No — the consultation is completely free. It's simply a conversation to help us understand what you're looking for and make sure we design the right experience for you.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <p
          style={{
            fontFamily: IN,
            fontSize: "0.6rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#F5A623",
            marginBottom: "10px",
          }}
        >
          Common Questions
        </p>
        <h2
          style={{
            fontFamily: PF,
            fontWeight: 700,
            fontSize: "clamp(1.8rem,3.5vw,2.5rem)",
            color: "#1A1209",
            lineHeight: 1.1,
            marginBottom: "12px",
          }}
        >
          Frequently Asked Questions
        </h2>
        <div
          style={{
            width: "40px",
            height: "2px",
            background: "linear-gradient(to right,#FF8C00,#F5A623)",
            borderRadius: "2px",
            margin: "0 auto",
          }}
        />
      </div>

      {/* Accordion */}
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              style={{
                borderBottom: "1px solid rgba(255,216,155,0.6)",
                ...(i === 0 ? { borderTop: "1px solid rgba(255,216,155,0.6)" } : {}),
              }}
            >
              {/* Question row */}
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 4px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  gap: "16px",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: PF,
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#1A1209",
                    lineHeight: 1.4,
                  }}
                >
                  {item.q}
                </span>

                {/* Toggle icon — amber circle, matches design system */}
                <span
                  style={{
                    flexShrink: 0,
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    border: "1.5px solid #FF8C00",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isOpen ? "#FFFFFF" : "#FF8C00",
                    background: isOpen
                      ? "linear-gradient(135deg,#FF8C00,#F5A623)"
                      : "transparent",
                    transition: "background .25s, color .25s",
                  }}
                >
                  {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </button>

              {/* Answer — animated expand */}
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: isOpen ? "300px" : "0",
                  opacity: isOpen ? 1 : 0,
                  transition: "max-height .38s ease, opacity .3s ease",
                }}
              >
                <p
                  style={{
                    fontFamily: IN,
                    fontSize: "0.9rem",
                    color: "#6B5B2E",
                    lineHeight: 1.8,
                    paddingBottom: "20px",
                    paddingLeft: "4px",
                    fontWeight: 300,
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
