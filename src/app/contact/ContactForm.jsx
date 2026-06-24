"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const experienceOptions = [
  "The Blue Hour — Jaipur (Evening Jeep)",
  "Jaipur Beyond Pink (Evening Heritage Walk)",
  "Jaipur at Dawn (Morning Walk & Breakfast)",
  "Custom / Not Sure Yet",
];

function ContactFormInner() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("experience") || "";

  const [form, setForm] = useState({
    name: "", email: "", phone: "", country: "",
    experience: preselected, date: "", guests: "", message: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", country: "", experience: "", date: "", guests: "", message: "" });
      } else {
        setStatus("error");
        // Friendly message — include WhatsApp fallback
        setErrorMsg(data.message || "Something went wrong. Please try WhatsApp below.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please check your connection or reach us on WhatsApp.");
    }
  };

  const field = "w-full px-4 py-3 text-sm bg-white outline-none transition-colors duration-200";
  const fieldStyle = { border: "1.5px solid #e5d9c8", color: "#1e1b3a" };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-8" style={{ background: "#f5ece0", border: "1px solid #e5d9c8" }}>
        <CheckCircle2 size={44} style={{ color: "#c9943a", marginBottom: "16px" }} />
        <h3 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.8rem", fontWeight: 600, color: "#1e1b3a", marginBottom: "10px" }}>
          Enquiry Received!
        </h3>
        <p style={{ color: "#4a4458", lineHeight: 1.75, maxWidth: "380px", fontSize: "0.9rem" }}>
          Thank you for reaching out. I'll personally review your message and get back to you within 24 hours.
        </p>
        <p style={{ color: "#c9943a", fontWeight: 600, fontSize: "0.85rem", marginTop: "12px" }}>— Jaipur Walks Team</p>
        <button onClick={() => setStatus("idle")} style={{ marginTop: "24px", color: "#8a7e9a", fontSize: "0.8rem", textDecoration: "underline" }}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "#1e1b3a", marginBottom: "8px" }}>
            Full Name <span style={{ color: "#c9943a" }}>*</span>
          </label>
          <input name="name" type="text" required value={form.name} onChange={change} placeholder="Your full name"
            className={field} style={fieldStyle}
            onFocus={e => e.target.style.borderColor = "#c9943a"} onBlur={e => e.target.style.borderColor = "#e5d9c8"} />
        </div>
        {/* Email */}
        <div>
          <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "#1e1b3a", marginBottom: "8px" }}>
            Email Address <span style={{ color: "#c9943a" }}>*</span>
          </label>
          <input name="email" type="email" required value={form.email} onChange={change} placeholder="your@email.com"
            className={field} style={fieldStyle}
            onFocus={e => e.target.style.borderColor = "#c9943a"} onBlur={e => e.target.style.borderColor = "#e5d9c8"} />
        </div>
        {/* Phone */}
        <div>
          <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "#1e1b3a", marginBottom: "8px" }}>
            Phone / WhatsApp
          </label>
          <input name="phone" type="tel" value={form.phone} onChange={change} placeholder="+91 or international"
            className={field} style={fieldStyle}
            onFocus={e => e.target.style.borderColor = "#c9943a"} onBlur={e => e.target.style.borderColor = "#e5d9c8"} />
        </div>
        {/* Country */}
        <div>
          <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "#1e1b3a", marginBottom: "8px" }}>
            Country / City
          </label>
          <input name="country" type="text" value={form.country} onChange={change} placeholder="Where are you from?"
            className={field} style={fieldStyle}
            onFocus={e => e.target.style.borderColor = "#c9943a"} onBlur={e => e.target.style.borderColor = "#e5d9c8"} />
        </div>
        {/* Experience */}
        <div>
          <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "#1e1b3a", marginBottom: "8px" }}>
            Preferred Experience <span style={{ color: "#c9943a" }}>*</span>
          </label>
          <select name="experience" required value={form.experience} onChange={change}
            className={field} style={{ ...fieldStyle, background: "white" }}
            onFocus={e => e.target.style.borderColor = "#c9943a"} onBlur={e => e.target.style.borderColor = "#e5d9c8"}>
            <option value="">Select an experience</option>
            {experienceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        {/* Guests */}
        <div>
          <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "#1e1b3a", marginBottom: "8px" }}>
            Number of Guests <span style={{ color: "#c9943a" }}>*</span>
          </label>
          <select name="guests" required value={form.guests} onChange={change}
            className={field} style={{ ...fieldStyle, background: "white" }}
            onFocus={e => e.target.style.borderColor = "#c9943a"} onBlur={e => e.target.style.borderColor = "#e5d9c8"}>
            <option value="">Select group size</option>
            {["1", "2", "3", "4", "5", "6", "7+ (custom)"].map((n) => (
              <option key={n} value={n}>{n} {n === "1" ? "guest" : "guests"}</option>
            ))}
          </select>
        </div>
        {/* Date */}
        <div className="sm:col-span-2">
          <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "#1e1b3a", marginBottom: "8px" }}>
            Preferred Date
          </label>
          <input name="date" type="date" value={form.date} onChange={change}
            className={field} style={{ ...fieldStyle, maxWidth: "280px" }}
            onFocus={e => e.target.style.borderColor = "#c9943a"} onBlur={e => e.target.style.borderColor = "#e5d9c8"} />
        </div>
      </div>

      {/* Message */}
      <div>
        <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "#1e1b3a", marginBottom: "8px" }}>
          Message / Special Requests
        </label>
        <textarea name="message" rows={5} value={form.message} onChange={change}
          placeholder="Any specific interests, dietary preferences, mobility considerations, or questions?"
          className={`${field} resize-none`} style={fieldStyle}
          onFocus={e => e.target.style.borderColor = "#c9943a"} onBlur={e => e.target.style.borderColor = "#e5d9c8"} />
      </div>

      {/* Error */}
      {status === "error" && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "14px 16px" }}>
          <div className="flex items-start gap-3 mb-3">
            <AlertCircle size={15} style={{ color: "#dc2626", flexShrink: 0, marginTop: "2px" }} />
            <p style={{ color: "#dc2626", fontSize: "0.875rem" }}>{errorMsg}</p>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hello%2C%20I'd%20like%20to%20book%20a%20Jaipur%20experience."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold"
            style={{ background: "#25D366", color: "white" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us Instead
          </a>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-3 py-4 text-sm font-semibold transition-all duration-200"
        style={{ background: status === "loading" ? "#4a4458" : "#1e1b3a", color: "white", letterSpacing: "0.04em", cursor: status === "loading" ? "not-allowed" : "pointer" }}
        onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.background = "#2d2a52"; }}
        onMouseLeave={e => { if (status !== "loading") e.currentTarget.style.background = "#1e1b3a"; }}
      >
        {status === "loading" ? (
          <><Loader2 size={16} className="animate-spin" /> Sending Enquiry...</>
        ) : "Send Booking Enquiry"}
      </button>

      <p style={{ fontSize: "0.75rem", color: "#8a7e9a", textAlign: "center" }}>
        We respond personally to every enquiry within 24 hours. Your information is kept private.
      </p>
    </form>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div style={{ padding: "40px 0", textAlign: "center", color: "#4a4458" }}>Loading form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
