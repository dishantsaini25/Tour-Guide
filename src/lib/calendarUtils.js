/**
 * calendarUtils.js
 *
 * Reusable utilities for Google Calendar time-slot overlap checking
 * and available-slot generation.
 * All comparisons use JavaScript Date objects — no string comparison.
 */

/**
 * checkOverlap — half-open interval overlap test.
 * Returns true if [selStart, selEnd) overlaps with [evStart, evEnd).
 * Boundary touches (e.g. 11:00 booking after 11:00 event end) are NOT overlaps.
 */
export function checkOverlap(selStart, selEnd, evStart, evEnd) {
  return selStart < evEnd && selEnd > evStart;
}

/**
 * getEventsForDate — filter events to those touching a local date.
 * @param {Array}  events  — [{ id, title, start, end, allDay }]
 * @param {string} dateStr — "YYYY-MM-DD"
 */
export function getEventsForDate(events, dateStr) {
  if (!dateStr || !events.length) return [];
  const dayStart = new Date(dateStr + "T00:00:00");
  const dayEnd   = new Date(dateStr + "T23:59:59.999");
  return events.filter(ev => {
    const evStart = new Date(ev.start);
    const evEnd   = new Date(ev.end);
    return checkOverlap(dayStart, dayEnd, evStart, evEnd);
  });
}

/**
 * validateTimeSlot — definitive overlap check for a proposed booking.
 * @param {string} dateStr
 * @param {string} startTime "HH:MM" 24-hour
 * @param {string} endTime   "HH:MM" 24-hour
 * @param {Array}  events    all calendar events
 * @returns {{ valid: boolean, reason?: string }}
 */
export function validateTimeSlot(dateStr, startTime, endTime, events) {
  if (!dateStr || !startTime || !endTime) {
    return { valid: false, reason: "Please select a date, start time, and end time." };
  }
  const selStart = new Date(`${dateStr}T${startTime}:00`);
  const selEnd   = new Date(`${dateStr}T${endTime}:00`);

  if (selEnd <= selStart) {
    return { valid: false, reason: "End time must be later than start time." };
  }

  const dayEvents = getEventsForDate(events, dateStr);
  for (const ev of dayEvents) {
    const evStart = new Date(ev.start);
    const evEnd   = new Date(ev.end);
    if (checkOverlap(selStart, selEnd, evStart, evEnd)) {
      return {
        valid:  false,
        reason: `This time slot is already booked. Please select another available time.`,
      };
    }
  }
  return { valid: true };
}

/**
 * generateTimeSlots
 *
 * Produces every clock time in a day at `intervalMins` spacing.
 * Returns an array of objects: { value: "HH:MM", label: "h:mm AM/PM" }
 *
 * @param {number} intervalMins — slot spacing in minutes (default 30)
 * @param {number} dayStartHour — first slot hour, 0-based (default 6 = 6 AM)
 * @param {number} dayEndHour   — last slot hour, exclusive (default 22 = 10 PM)
 */
export function generateTimeSlots(intervalMins = 30, dayStartHour = 6, dayEndHour = 22) {
  const slots = [];
  let mins = dayStartHour * 60;
  const endMins = dayEndHour * 60;

  while (mins <= endMins) {
    const h   = Math.floor(mins / 60);
    const m   = mins % 60;
    const hh  = String(h).padStart(2, "0");
    const mm  = String(m).padStart(2, "0");
    const value = `${hh}:${mm}`;

    // Human-readable label: 12-hour with AM/PM
    const period = h < 12 ? "AM" : "PM";
    const h12    = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const label  = `${h12}:${mm} ${period}`;

    slots.push({ value, label });
    mins += intervalMins;
  }
  return slots;
}

/**
 * isSlotBlocked
 *
 * Returns true if the given "HH:MM" time falls inside any event on `dateStr`.
 * A slot is blocked if [slotStart, slotStart + intervalMins) overlaps any event.
 *
 * @param {string} dateStr
 * @param {string} slotValue    "HH:MM"
 * @param {Array}  dayEvents    already-filtered events for this date
 * @param {number} intervalMins slot size in minutes
 */
export function isSlotBlocked(dateStr, slotValue, dayEvents, intervalMins = 30) {
  const slotStart = new Date(`${dateStr}T${slotValue}:00`);
  const slotEnd   = new Date(slotStart.getTime() + intervalMins * 60 * 1000);
  return dayEvents.some(ev => checkOverlap(slotStart, slotEnd, new Date(ev.start), new Date(ev.end)));
}

/**
 * getAvailableStartSlots
 *
 * Returns all generated time slots that are NOT blocked by any event.
 * Used to populate the Start Time dropdown.
 *
 * @param {string} dateStr
 * @param {Array}  dayEvents
 * @param {number} intervalMins
 */
export function getAvailableStartSlots(dateStr, dayEvents, intervalMins = 30) {
  const all = generateTimeSlots(intervalMins);
  return all.filter(slot => !isSlotBlocked(dateStr, slot.value, dayEvents, intervalMins));
}

/**
 * getAvailableEndSlots
 *
 * Returns end-time slots that:
 *   1. Are strictly after `selectedStart`
 *   2. Do NOT create an overlap when combined with `selectedStart`
 *
 * @param {string} dateStr
 * @param {string} selectedStart  "HH:MM"
 * @param {Array}  dayEvents
 * @param {number} intervalMins
 */
export function getAvailableEndSlots(dateStr, selectedStart, dayEvents, intervalMins = 30) {
  if (!selectedStart) return [];
  const all = generateTimeSlots(intervalMins);
  const selStartDate = new Date(`${dateStr}T${selectedStart}:00`);

  return all.filter(slot => {
    const slotEnd = new Date(`${dateStr}T${slot.value}:00`);
    // Must be strictly after selected start
    if (slotEnd <= selStartDate) return false;
    // The range [selStart, slotEnd) must not overlap any event
    return !dayEvents.some(ev =>
      checkOverlap(selStartDate, slotEnd, new Date(ev.start), new Date(ev.end))
    );
  });
}
