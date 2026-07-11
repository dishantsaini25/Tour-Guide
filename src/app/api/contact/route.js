/**
 * /api/contact — Contact form email handler using Resend
 *
 * ROOT CAUSE OF 500 ERROR:
 * Resend free tier does NOT allow Gmail/custom addresses as FROM.
 * You MUST use "onboarding@resend.dev" as the FROM address on free tier.
 * Also, CONTACT_TO_EMAIL must be the exact email you signed up with on resend.com.
 *
 * VERCEL ENV VARIABLES (Settings → Environment Variables):
 *   RESEND_API_KEY      →  re_xxxxxxxxxxxx   (from resend.com/api-keys)
 *   CONTACT_TO_EMAIL    →  sainidishu2002@gmail.com  (your email, must match resend account)
 *   CONTACT_FROM_EMAIL  →  onboarding@resend.dev     (MUST be this on free tier)
 */

export async function POST(request) {

  // ── 1. Check env vars ──
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY not set");
    return Response.json(
      { success: false, message: "Email service not configured. Please contact us on WhatsApp." },
      { status: 503 }
    );
  }

  // ── 2. Parse body ──
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const { name, email, phone, country, experience, date, guests, message } = body;

  // ── 3. Validate required fields ──
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

  // ── 4. Build email HTML ──
  const toEmail   = process.env.CONTACT_TO_EMAIL || "sainidishu2002@gmail.com";
  // IMPORTANT: on Resend free tier, FROM must be onboarding@resend.dev
  // Once you verify a domain at resend.com/domains, change this to: noreply@yourdomain.com
  const fromEmail = "Jaipur Walks <onboarding@resend.dev>";

  const rows = [
    ["Name",                name],
    ["Email",               email],
    ["Phone / WhatsApp",    phone    || "—"],
    ["Country / City",      country  || "—"],
    ["Experience",          experience],
    ["Preferred Date",      date     || "—"],
    ["No. of Guests",       guests],
  ];

  const tableRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid #e5d9c8;color:#8a7e9a;font-size:11px;text-transform:uppercase;letter-spacing:.12em;width:36%;vertical-align:top">${label}</td>
      <td style="padding:9px 0;border-bottom:1px solid #e5d9c8;color:#1e1b3a;font-size:14px;font-weight:500">${value}</td>
    </tr>`).join("");

  const msgBlock = message?.trim()
    ? `<div style="margin-top:20px;padding:14px 16px;background:#f5ece0;border-left:3px solid #c9943a">
        <p style="color:#8a7e9a;font-size:11px;text-transform:uppercase;letter-spacing:.12em;margin:0 0 6px">Message</p>
        <p style="color:#1e1b3a;font-size:14px;line-height:1.65;margin:0">${message.replace(/\n/g, "<br>")}</p>
       </div>`
    : "";

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#fdf6ed;border:1px solid #e5d9c8">
      <div style="background:#1e1b3a;padding:24px 28px">
        <h1 style="color:white;font-size:20px;margin:0 0 4px">New Booking Enquiry</h1>
        <p style="color:#c9943a;font-size:11px;margin:0;letter-spacing:.15em;text-transform:uppercase">Jaipur Walks — Website Form</p>
      </div>
      <div style="padding:24px 28px">
        <table style="width:100%;border-collapse:collapse">${tableRows}</table>
        ${msgBlock}
      </div>
      <div style="background:#f5ece0;padding:14px 28px;border-top:1px solid #e5d9c8">
        <p style="color:#8a7e9a;font-size:12px;margin:0">
          Reply to this email to respond to <strong style="color:#1e1b3a">${email}</strong>
        </p>
      </div>
    </div>`;

  // ── 5. Send via Resend REST API directly (avoids SDK version issues) ──
  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:     fromEmail,
        to:       [toEmail],
        reply_to: email,
        subject:  `Booking Enquiry — ${experience} · ${name}`,
        html,
      }),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error("[contact] Resend API error:", JSON.stringify(resendData));
      // Give user a specific message based on Resend error
      const errMsg = resendData?.message || resendData?.name || "Email send failed";
      return Response.json(
        { success: false, message: `Email error: ${errMsg}. Please contact us on WhatsApp.` },
        { status: 500 }
      );
    }

    console.log("[contact] Email sent OK:", resendData?.id);
    return Response.json(
      { success: true, message: "Enquiry sent! We'll reply within 24 hours." },
      { status: 200 }
    );

  } catch (err) {
    console.error("[contact] Fetch error:", err?.message);
    return Response.json(
      { success: false, message: "Network error sending email. Please try WhatsApp." },
      { status: 500 }
    );
  }
}
