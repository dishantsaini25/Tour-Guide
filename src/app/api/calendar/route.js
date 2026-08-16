/**
 * /api/calendar — Google Calendar availability reader
 *
 * READ-ONLY. Never creates, modifies, or deletes any calendar event.
 * Returns a list of booked date strings (YYYY-MM-DD) from the
 * configured Google Calendar so the front-end can disable those dates.
 *
 * ─── Required environment variables (add to .env.local & Vercel) ───
 *
 *  GOOGLE_CLIENT_EMAIL   → Service-account email from the JSON key file
 *                           e.g. raah-calendar@my-project.iam.gserviceaccount.com
 *
 *  GOOGLE_PRIVATE_KEY    → Private key from the JSON key file.
 *                           On Vercel paste the full string (including -----BEGIN…).
 *                           In .env.local wrap in double-quotes and use literal \n:
 *                           GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
 *
 *  GOOGLE_CALENDAR_ID    → Calendar ID from Google Calendar settings.
 *                           For your primary calendar this is usually your
 *                           Gmail address, e.g. kartikmaru2001@gmail.com
 *
 * ─── How to set up ─────────────────────────────────────────────────
 *  1. Go to https://console.cloud.google.com
 *  2. Create (or open) a project → Enable "Google Calendar API"
 *  3. IAM & Admin → Service Accounts → Create service account
 *  4. Generate a JSON key → download it
 *  5. Copy client_email & private_key into .env.local (see above)
 *  6. In Google Calendar → Settings → Share calendar with the
 *     service account email (give "See all event details" permission)
 * ───────────────────────────────────────────────────────────────────
 */

import { google } from "googleapis";

/**
 * Converts a Google Calendar event to a YYYY-MM-DD date string.
 * Handles both all-day events (date only) and timed events (dateTime).
 *
 * @param {object} event - A Google Calendar event resource
 * @returns {string|null} - "YYYY-MM-DD" or null if unparseable
 */
function eventToDateString(event) {
  try {
    const raw = event?.start?.date || event?.start?.dateTime;
    if (!raw) return null;
    // dateTime looks like "2024-12-25T10:00:00+05:30" — take first 10 chars
    return raw.slice(0, 10);
  } catch {
    return null;
  }
}

export async function GET() {
  // ── 1. Check required env vars ──
  const clientEmail  = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
  const calendarId   = process.env.GOOGLE_CALENDAR_ID;

  if (!clientEmail || !privateKeyRaw || !calendarId) {
    console.error("[calendar] Missing env vars:", {
      GOOGLE_CLIENT_EMAIL:  clientEmail  ? "✓" : "MISSING",
      GOOGLE_PRIVATE_KEY:   privateKeyRaw ? "✓" : "MISSING",
      GOOGLE_CALENDAR_ID:   calendarId   ? "✓" : "MISSING",
    });
    // Return empty array — form still works, just no availability blocking
    return Response.json(
      { bookedDates: [], error: "Calendar not configured" },
      { status: 200 }
    );
  }

  // ── 2. Fix escaped newlines in private key (Vercel stores \n literally) ──
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  try {
    // ── 3. Authenticate using service account ──
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key:  privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // ── 4. Fetch events from today up to 6 months ahead ──
    const now      = new Date();
    const sixMonths = new Date();
    sixMonths.setMonth(sixMonths.getMonth() + 6);

    const response = await calendar.events.list({
      calendarId,
      timeMin:      now.toISOString(),
      timeMax:      sixMonths.toISOString(),
      singleEvents: true,              // expand recurring events
      orderBy:      "startTime",
      maxResults:   500,               // safety cap
      fields:       "items(id,summary,start,end,status)", // minimal payload
    });

    const events = response.data.items || [];

    // ── 5. Filter out cancelled events & map to date strings ──
    const bookedDates = [
      ...new Set(
        events
          .filter(e => e.status !== "cancelled")
          .map(eventToDateString)
          .filter(Boolean)
      ),
    ];

    console.log(`[calendar] Fetched ${events.length} events → ${bookedDates.length} booked dates`);

    return Response.json({ bookedDates }, { status: 200 });

  } catch (err) {
    console.error("[calendar] Google Calendar API error:", err?.message);

    // Graceful degradation — form still works without availability data
    return Response.json(
      { bookedDates: [], error: err?.message || "Calendar fetch failed" },
      { status: 200 }   // 200 so the UI doesn't treat it as a hard error
    );
  }
}
