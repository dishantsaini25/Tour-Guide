/**
 * useCalendarAvailability
 *
 * Fetches booked dates from /api/calendar and exposes helpers
 * to check whether a given YYYY-MM-DD date is booked.
 *
 * Usage:
 *   const { bookedDates, isBooked, loading, error } = useCalendarAvailability();
 */

"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * @typedef {Object} CalendarAvailability
 * @property {string[]} bookedDates  - Array of "YYYY-MM-DD" strings that are booked
 * @property {(date: string) => boolean} isBooked - Returns true if date is booked
 * @property {boolean} loading       - True while fetching
 * @property {string|null} error     - Error message, or null
 */

/** @returns {CalendarAvailability} */
export function useCalendarAvailability() {
  const [bookedDates, setBookedDates] = useState(/** @type {string[]} */ ([]));
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(/** @type {string|null} */ (null));

  useEffect(() => {
    let cancelled = false;

    async function fetchAvailability() {
      setLoading(true);
      setError(null);

      try {
        const res  = await fetch("/api/calendar");
        const data = await res.json();

        if (!cancelled) {
          setBookedDates(data.bookedDates || []);
          // Surface soft errors (calendar not configured) without breaking the form
          if (data.error) {
            console.warn("[useCalendarAvailability]", data.error);
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error("[useCalendarAvailability] fetch failed:", err?.message);
          setError(err?.message || "Could not load availability");
          // Keep bookedDates empty — form remains fully usable
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAvailability();

    return () => { cancelled = true; };
  }, []);

  /**
   * Returns true if the given date string (YYYY-MM-DD) is booked.
   * @param {string} date
   */
  const isBooked = useCallback(
    (date) => bookedDates.includes(date),
    [bookedDates]
  );

  return { bookedDates, isBooked, loading, error };
}
