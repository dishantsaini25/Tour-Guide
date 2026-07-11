/**
 * /api/contact — Nodemailer email handler
 *
 * Required .env.local variables (restart dev server after editing):
 *   EMAIL_USER      → kartikmaru2001@gmail.com
 *   EMAIL_PASS      → 16-char Gmail App Password (no spaces)
 *   RECEIVER_EMAIL  → kartikmaru2001@gmail.com
 */

import nodemailer from "nodemailer";

export async function POST(request) {

  // ── 1. Parse body ──
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, country, city, experience, date, guests, message } = body;

  // ── 2. Validate required fields ──
  if (!name?.trim() || !email?.trim() || !experience?.trim() || !guests?.trim()) {
    return Response.json(
      { success: false, message: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // ── 3. Read env vars ──
  const EMAIL_USER     = process.env.EMAIL_USER;
  const EMAIL_PASS     = process.env.EMAIL_PASS;
  const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || EMAIL_USER;

  // Log env state on every call (helps debug missing .env.local)
  console.log("[contact] ENV check →",
    "EMAIL_USER:", EMAIL_USER ? `${EMAIL_USER.slice(0,4)}***` : "MISSING",
    "EMAIL_PASS:", EMAIL_PASS ? `[${EMAIL_PASS.length} chars]` : "MISSING",
    "RECEIVER:", RECEIVER_EMAIL ? `${RECEIVER_EMAIL.slice(0,4)}***` : "MISSING"
  );

  if (!EMAIL_USER || !EMAIL_PASS) {
    console.error("[contact] ✗ Missing EMAIL_USER or EMAIL_PASS — restart server after editing .env.local");
    return Response.json(
      { success: false, message: "Email service not configured. Please contact us on WhatsApp." },
      { status: 500 }
    );
  }

  // ── 4. Create transporter — explicit Gmail SMTP (most reliable) ──
  const transporter = nodemailer.createTransport({
    host:   "smtp.gmail.com",
    port:   465,
    secure: true,                         // SSL on port 465
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  // ── 5. Build HTML email ──
  const rows = [
    ["Name",            name],
    ["Email",           email],
    ["Phone/WhatsApp",  phone      || "—"],
    ["Country",         country    || "—"],
    ["City",            city       || "—"],
    ["Experience",      experience],
    ["Preferred Date",  date       || "—"],
    ["No. of Guests",   guests],
  ];

  const tableRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #FFD89B;color:#9C8550;font-size:11px;
                 text-transform:uppercase;letter-spacing:.1em;width:36%;vertical-align:top;
                 font-family:Arial,sans-serif;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #FFD89B;color:#1A1209;font-size:14px;
                 font-weight:600;font-family:Arial,sans-serif;">${value}</td>
    </tr>`).join("");

  const msgBlock = message?.trim()
    ? `<div style="margin-top:24px;padding:16px 18px;background:#FFF8E7;
                   border-left:4px solid #FF8C00;border-radius:0 8px 8px 0;">
        <p style="color:#9C8550;font-size:11px;text-transform:uppercase;letter-spacing:.1em;
                  margin:0 0 8px;font-family:Arial,sans-serif;">Message / Special Requests</p>
        <p style="color:#1A1209;font-size:14px;line-height:1.7;margin:0;
                  font-family:Arial,sans-serif;">${message.replace(/\n/g, "<br>")}</p>
       </div>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:20px;background:#F5F0E8;font-family:Arial,sans-serif;">
  <div style="max-width:580px;margin:0 auto;background:#FFFFFF;border-radius:12px;
              overflow:hidden;box-shadow:0 4px 24px rgba(255,140,0,0.14);">
    <div style="background:linear-gradient(135deg,#FF8C00 0%,#E07800 100%);padding:28px 32px;">
      <h1 style="color:#FFFFFF;font-size:22px;margin:0 0 6px;font-family:Georgia,serif;">
        New Booking Enquiry
      </h1>
      <p style="color:rgba(255,255,255,0.8);font-size:11px;margin:0;
                letter-spacing:.15em;text-transform:uppercase;">
        Raah India Experiences — Website Form
      </p>
    </div>
    <div style="padding:28px 32px;">
      <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
      ${msgBlock}
    </div>
    <div style="background:#FFFDE7;padding:16px 32px;border-top:1px solid #FFD89B;">
      <p style="color:#9C8550;font-size:12px;margin:0;font-family:Arial,sans-serif;">
        Hit Reply to respond directly to
        <strong style="color:#1A1209;">${email}</strong>
      </p>
    </div>
    <div style="background:#1A1209;padding:14px 32px;text-align:center;">
      <p style="color:rgba(255,255,255,0.35);font-size:11px;margin:0;
                font-family:Arial,sans-serif;letter-spacing:.08em;">
        RAAH INDIA EXPERIENCES · JAIPUR, RAJASTHAN
      </p>
    </div>
  </div>
</body>
</html>`;

  // ── 6. Verify SMTP connection, then send ──
  try {
    // verify() checks authentication before attempting delivery
    console.log("[contact] Verifying SMTP connection...");
    await transporter.verify();
    console.log("[contact] SMTP connection verified ✓");

    const info = await transporter.sendMail({
      from:    `"Raah India Experiences" <${EMAIL_USER}>`,
      to:      RECEIVER_EMAIL,
      replyTo: email,
      subject: `Booking Enquiry — ${experience} · ${name}`,
      html,
    });

    // Log delivery details — these confirm Gmail accepted the message
    console.log("[contact] ✓ Email accepted by Gmail SMTP");
    console.log("[contact]   messageId :", info.messageId);
    console.log("[contact]   response  :", info.response);
    console.log("[contact]   accepted  :", info.accepted);
    console.log("[contact]   rejected  :", info.rejected);

    return Response.json(
      { success: true, message: "Enquiry sent! We'll reply personally within 24 hours." },
      { status: 200 }
    );

  } catch (err) {
    // Log the full error for debugging
    console.error("[contact] ✗ SMTP error code    :", err?.code);
    console.error("[contact] ✗ SMTP error message :", err?.message);
    console.error("[contact] ✗ SMTP response      :", err?.response);
    console.error("[contact] ✗ Full error         :", err);

    let userMessage = "Failed to send your message. Please contact us on WhatsApp instead.";
    const msg       = (err?.message || "").toLowerCase();
    const resp      = (err?.response || "").toLowerCase();

    if (msg.includes("535") || resp.includes("535") ||
        msg.includes("invalid login") || msg.includes("username and password")) {
      userMessage = "Email authentication failed. Please contact us on WhatsApp.";
      console.error("[contact] → ACTION: verify EMAIL_PASS is a Gmail App Password (not your account password)");
      console.error("[contact] → Generate at: myaccount.google.com → Security → App Passwords");
    } else if (msg.includes("enotfound") || msg.includes("econnrefused") || msg.includes("etimedout")) {
      userMessage = "Could not reach the email server. Please try WhatsApp instead.";
    } else if (msg.includes("certificate") || msg.includes("self signed")) {
      userMessage = "Email server SSL error. Please contact us on WhatsApp.";
    }

    return Response.json({ success: false, message: userMessage }, { status: 500 });
  }
}
