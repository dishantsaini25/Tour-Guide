/**
 * /api/contact — Serverless contact form handler
 *
 * Uses Resend to send booking inquiry emails.
 *
 * SETUP:
 * 1. Create a free account at https://resend.com
 * 2. Get your API key from the Resend dashboard
 * 3. Add to .env.local:
 *    RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
 *    CONTACT_TO_EMAIL=your@email.com        ← where you want to receive bookings
 *    CONTACT_FROM_EMAIL=noreply@yourdomain.com  ← must be a verified domain in Resend
 *
 * For testing without a domain: use resend's onboarding address (onboarding@resend.dev)
 * as FROM, and your personal email as TO — this works with the free tier.
 */

import { Resend } from "resend";

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, phone, country, experience, date, guests, message } =
      body;

    // --- Basic server-side validation ---
    if (!name || !email || !experience || !guests) {
      return Response.json(
        { success: false, message: "Required fields missing." },
        { status: 400 }
      );
    }

    // Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: "Invalid email address." },
        { status: 400 }
      );
    }

    // --- Compose the email HTML ---
    const htmlBody = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #faf8f4; border: 1px solid #e8e0d4;">
        <h1 style="color: #0d1b2a; font-size: 24px; margin-bottom: 8px;">New Booking Enquiry</h1>
        <p style="color: #c9a84c; font-size: 13px; margin-bottom: 32px;">Jaipur Walks — from the website contact form</p>
        
        <table style="width: 100%; border-collapse: collapse;">
          ${[
            ["Name", name],
            ["Email", email],
            ["Phone / WhatsApp", phone || "Not provided"],
            ["Country / City", country || "Not provided"],
            ["Preferred Experience", experience],
            ["Preferred Date", date || "Not specified"],
            ["Number of Guests", guests],
          ]
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d4; color: #6b6570; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 40%;">${label}</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e0d4; color: #0d1b2a; font-size: 14px; font-weight: 500;">${value}</td>
            </tr>`
            )
            .join("")}
        </table>

        ${
          message
            ? `<div style="margin-top: 24px; padding: 16px; background: #f5f0e8; border-left: 3px solid #c9a84c;">
              <p style="color: #6b6570; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Message</p>
              <p style="color: #0d1b2a; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
            </div>`
            : ""
        }

        <p style="margin-top: 32px; color: #6b6570; font-size: 12px; border-top: 1px solid #e8e0d4; padding-top: 16px;">
          Reply directly to this email — it will go to the guest at ${email}
        </p>
      </div>
    `;

    // --- Send via Resend ---
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.CONTACT_TO_EMAIL || "your@email.com", // ← add your email in .env.local
      replyTo: email,
      subject: `New Booking Enquiry — ${experience} (${name})`,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { success: false, message: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, message: "Enquiry sent successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
