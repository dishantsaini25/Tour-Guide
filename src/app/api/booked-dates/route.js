// GOOGLE CALENDAR START
// This route fetches events from Google Calendar and returns them so the
// ContactForm can filter available time slots.
// Commented out temporarily — the form now works as a plain enquiry form.
// To re-enable: remove the stub below and uncomment the full implementation.
// GOOGLE CALENDAR END

// GOOGLE CALENDAR START — full implementation (re-enable by removing the stub below)
/*
const CACHE_SECONDS = 300;

export async function GET() {
  const apiKey     = process.env.GOOGLE_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!apiKey || !calendarId) {
    console.error("[booked-dates] Missing GOOGLE_API_KEY or GOOGLE_CALENDAR_ID");
    return Response.json({ error: "Calendar not configured.", events: [] }, { status: 503 });
  }

  const now    = new Date();
  const future = new Date(now);
  future.setMonth(future.getMonth() + 12);

  const params = new URLSearchParams({
    key:          apiKey,
    timeMin:      now.toISOString(),
    timeMax:      future.toISOString(),
    singleEvents: "true",
    orderBy:      "startTime",
    maxResults:   "2500",
  });

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;

  try {
    const res = await fetch(url, { next: { revalidate: CACHE_SECONDS } });

    if (!res.ok) {
      console.error(`[booked-dates] Google API ${res.status}:`, await res.text());
      return Response.json({ error: "Failed to fetch calendar.", events: [] }, { status: 502 });
    }

    const data  = await res.json();
    const items = data.items || [];

    const events = items.map(event => {
      const s = event.start;
      const e = event.end;

      if (s.dateTime) {
        return {
          id:     event.id,
          title:  event.summary || "Booked",
          start:  s.dateTime,
          end:    e.dateTime,
          allDay: false,
        };
      }

      // All-day event — s.date / e.date are "YYYY-MM-DD"
      return {
        id:     event.id,
        title:  event.summary || "Booked",
        start:  s.date + "T00:00:00Z",
        end:    e.date + "T00:00:00Z",
        allDay: true,
      };
    });

    console.log(`[booked-dates] Returning ${events.length} events`);

    return Response.json(
      { events },
      {
        status: 200,
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=60`,
        },
      }
    );

  } catch (err) {
    console.error("[booked-dates] Fetch error:", err?.message);
    return Response.json({ error: "Network error.", events: [] }, { status: 500 });
  }
}
*/
// GOOGLE CALENDAR END

// ── STUB: returns empty events so the form behaves as a plain enquiry form ──
// Remove this stub and uncomment the implementation above to re-enable Google Calendar sync.
export async function GET() {
  return Response.json({ events: [] }, { status: 200 });
}
