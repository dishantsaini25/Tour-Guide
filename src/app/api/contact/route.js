/**
 * /api/contact — Serverless contact form handler (Resend)
 *
 * ─── VERCEL SETUP (Required) ───────────────────────────────────────────
 * Go to: Vercel Dashboard → Your Project → Settings → Environment Variables
 * Add these three variables:
 *
 *   RESEND_API_KEY      = re_xxxxxxxxxxxxxxxxxxxx
 *   CONTACT_TO_EMAIL    = your@email.com          ← receives bookings
 *   CONTACT_FROM_EMAIL  = onboarding@resend.dev   ← use this for free tier (no domain needed)
 *
 * FREE TIER NOTE:
 *   With Resend free tier, you MUST use "onboarding@resend.dev" as the FROM address
 *   AND you can only send to the email address you signed up with on resend.com.
 *   To send to any email, verify a domain at resend.com/domains.
 *
 * GET YOUR API KEY: https://resend.com → Dashboard → API Keys → Create API Key
 * ───────────────────────────────────────────────────────────────────────
 */

import { Resend } from "resend";

export async function POST(request) {
  // ── Guard: check env vars are set ──
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set in environment variables.");
    return Response.json(
      {
        success: false,
        message:
          "Email service not configured. Please contact us directly on WhatsApp or email.",
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, country, experience, date, guests, message } = body;

    // ── Validation ──
    if (!name?.trim() || !email?.trim() || !experience?.trim() || !guests?.trim()) {
      return Response.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // ── Email HTML ──
    const rows = [
      ["Name", name],
      ["Email", email],
      ["Phone / WhatsApp", phone || "—"],
      ["Country / City", country || "—"],
      ["Preferred Experience", experience],
      ["Preferred Date", date || "—"],
      ["Number of Guests", guests],
    ];

    const htmlBody = `
      <div style="font-family: Georgia, serif; max-width: 580px; margin: 0 auto; background: #fdf6ed; border: 1px solid #e5d9c8; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: #1e1b3a; padding: 28px 32px;">
          <h1 style="color: white; font-size: 22px; margin: 0 0 4px;">New Booking Enquiry</h1>
          <p style="color: #c9943a; font-size: 12px; margin: 0; letter-spacing: 0.15em; text-transform: uppercase;">Jaipur Walks — Website Contact Form</p>
        </div>

        <!-- Details table -->
        <div style="padding: 28px 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            ${rows.map(([label, value]) => `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5d9c8; color: #8a7e9a; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; width: 38%; vertical-align: top;">${label}</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5d9c8; color: #1e1b3a; font-size: 14px; font-weight: 500;">${value}</td>
              </tr>`).join("")}
          </table>

          ${message ? `
          <div style="margin-top: 24px; padding: 16px 18px; background: #f5ece0; border-left: 3px solid #c9943a;">
            <p style="color: #8a7e9a; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 8px;">Message / Special Requests</p>
            <p style="color: #1e1b3a; font-size: 14px; line-height: 1.65; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
          </div>` : ""}
        </div>

        <!-- Footer -->
        <div style="background: #f5ece0; padding: 16px 32px; border-top: 1px solid #e5d9c8;">
          <p style="color: #8a7e9a; font-size: 12px; margin: 0;">
            Reply to this email to respond directly to <strong style="color: #1e1b3a;">${email}</strong>
          </p>
        </div>
      </div>
    `;

    // ── Send via Resend ──
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to:   process.env.CONTACT_TO_EMAIL   || "delivered@resend.dev",
      replyTo: email,
      subject: `Booking Enquiry — ${experience} · ${name}`,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend send error:", JSON.stringify(error));
      return Response.json(
        {
          success: false,
          message: "Failed to send your enquiry. Please WhatsApp us directly.",
        },
        { status: 500 }
      );
    }

    console.log("Email sent:", data?.id);
    return Response.json(
      { success: true, message: "Enquiry sent! We'll reply within 24 hours." },
      { status: 200 }
    );

  } catch (err) {
    console.error("Contact route error:", err?.message || err);
    return Response.json(
      {
        success: false,
        message: "Something went wrong. Please try again or contact us on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
