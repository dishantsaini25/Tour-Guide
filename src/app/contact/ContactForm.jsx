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
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please check your connection and try again.");
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
        <div className="flex items-start gap-3 p-4" style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "0.875rem" }}>
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: "2px" }} />
          <p>{errorMsg}</p>
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
