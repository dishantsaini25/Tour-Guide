/**
 * AvailabilityDatePicker
 *
 * A calendar date-picker that:
 *  - Shows a month grid (navigable with < / > arrows)
 *  - Marks booked dates as disabled (grey + line-through)
 *  - Marks today as highlighted
 *  - Marks the selected date as active
 *  - Disables past dates
 *  - Calls onChange(dateString) when a valid date is selected
 *
 * Matches the existing orange/amber (#FF8C00) design system.
 *
 * Props:
 *   value        {string}   - Currently selected date "YYYY-MM-DD"
 *   onChange     {Function} - Callback when a date is picked
 *   bookedDates  {string[]} - Array of "YYYY-MM-DD" strings that are booked
 *   loading      {boolean}  - Show skeleton while fetching
 */

"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS   = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];

const IN = "DM Sans, system-ui, sans-serif";
const PF = "Fraunces, Georgia, serif";

/** Zero-pad a number to 2 digits */
const pad = n => String(n).padStart(2, "0");

/** Format a Date as YYYY-MM-DD */
const toDateStr = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export default function AvailabilityDatePicker({ value, onChange, bookedDates = [], loading = false }) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Start the calendar on the current month, or the month of the selected date
  const [viewDate, setViewDate] = useState(() => {
    const d = value ? new Date(value + "T00:00:00") : new Date();
    d.setDate(1);
    return d;
  });

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  /** Navigate months */
  const prevMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  /** Build calendar grid: 6 rows × 7 cols, padded with null */
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    // Pad to complete last row
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [year, month]);

  function handleDayClick(day) {
    if (!day) return;
    const d = new Date(year, month, day);
    const str = toDateStr(d);
    const isPast   = d < today;
    const isBooked = bookedDates.includes(str);
    if (isPast || isBooked) return;
    onChange(str);
  }

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div style={{ padding: "20px", border: "1.5px solid #FFD89B", borderRadius: "16px", background: "#FFFDE7" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ width: "120px", height: "20px", background: "#FFE8A0", borderRadius: "8px", animation: "pulse 1.5s ease infinite" }} />
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", background: "#FFE8A0", borderRadius: "50%" }} />
            <div style={{ width: "28px", height: "28px", background: "#FFE8A0", borderRadius: "50%" }} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "6px" }}>
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} style={{ height: "32px", background: "#FFE8A0", borderRadius: "8px", opacity: 0.4 + Math.random() * 0.4 }} />
          ))}
        </div>
        <p style={{ fontFamily: IN, fontSize: "0.72rem", color: "#9C8550", textAlign: "center", marginTop: "14px", fontWeight: 300 }}>
          Loading availability…
        </p>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
      </div>
    );
  }

  return (
    <div style={{
      border: "1.5px solid #FFD89B",
      borderRadius: "16px",
      background: "linear-gradient(145deg,#FFFBF0,#FFF7E4)",
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(255,140,0,0.08)",
    }}>
      {/* ── Month navigation header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid rgba(255,216,155,0.5)" }}>
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Previous month"
          style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #FFD89B", background: "#FFFFFF", color: "#FF8C00", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background .2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#FFF3DC"}
          onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
        >
          <ChevronLeft size={15} />
        </button>

        <span style={{ fontFamily: PF, fontSize: "1.05rem", fontWeight: 600, color: "#1A1209" }}>
          {MONTHS[month]} {year}
        </span>

        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #FFD89B", background: "#FFFFFF", color: "#FF8C00", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background .2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#FFF3DC"}
          onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
        >
          <ChevronRight size={15} />
        </button>
      </div>

      {/* ── Day-of-week labels ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", padding: "10px 12px 4px" }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: "center", fontFamily: IN, fontSize: "0.6rem", fontWeight: 700, color: "#9C8550", letterSpacing: "0.1em", padding: "4px 0" }}>
            {d}
          </div>
        ))}
      </div>

      {/* ── Date grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "4px", padding: "4px 12px 16px" }}>
        {calendarDays.map((day, idx) => {
          if (!day) return <div key={idx} />;

          const d       = new Date(year, month, day);
          const dateStr = toDateStr(d);
          const isPast  = d < today;
          const booked  = bookedDates.includes(dateStr);
          const isToday = toDateStr(today) === dateStr;
          const selected = value === dateStr;
          const disabled = isPast || booked;

          let bg      = "transparent";
          let color   = "#1A1209";
          let opacity = 1;
          let cursor  = "pointer";
          let border  = "none";
          let textDecoration = "none";
          let title   = "";

          if (selected) {
            bg     = "#FF8C00";
            color  = "#FFFFFF";
          } else if (booked) {
            bg            = "#FFF0F0";
            color         = "#D0A0A0";
            opacity       = 0.65;
            cursor        = "not-allowed";
            textDecoration = "line-through";
            title         = "This date is already booked";
          } else if (isPast) {
            color   = "#C8BAA0";
            opacity = 0.4;
            cursor  = "not-allowed";
          } else if (isToday) {
            border  = "2px solid #FF8C00";
            bg      = "#FFF3DC";
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              title={title}
              onClick={() => handleDayClick(day)}
              aria-label={`${dateStr}${booked ? " (unavailable)" : ""}`}
              aria-pressed={selected}
              style={{
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                fontFamily: IN,
                fontSize: "0.82rem",
                fontWeight: selected ? 700 : 400,
                background: bg,
                color,
                opacity,
                cursor,
                border,
                textDecoration,
                transition: "background .15s, color .15s",
                outline: "none",
              }}
              onMouseEnter={e => {
                if (!disabled && !selected) {
                  e.currentTarget.style.background = "#FFF0DC";
                }
              }}
              onMouseLeave={e => {
                if (!disabled && !selected) {
                  e.currentTarget.style.background = isToday ? "#FFF3DC" : "transparent";
                }
              }}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* ── Legend ── */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", padding: "10px 16px 14px", borderTop: "1px solid rgba(255,216,155,0.4)" }}>
        {[
          { bg: "#FF8C00", color: "#FFF",   label: "Selected" },
          { bg: "#FFF3DC", border: "2px solid #FF8C00", label: "Today" },
          { bg: "#FFF0F0", color: "#D0A0A0", label: "Booked" },
          { bg: "transparent", color: "#C8BAA0", label: "Past" },
        ].map(({ bg: b, color: c, border: br, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "14px", height: "14px", borderRadius: "4px", background: b, border: br || "1px solid rgba(255,140,0,0.2)", color: c, flexShrink: 0 }} />
            <span style={{ fontFamily: IN, fontSize: "0.62rem", color: "#9C8550", fontWeight: 300 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
