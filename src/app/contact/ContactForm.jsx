"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";

/* ── Experience options ── */
const expOptions = [
  "Jaipur at Dawn (Morning Walk & Breakfast)",
  "The Ridge & Ramparts (Amber Heritage Trek)",
  "The Blue Hour (Evening Jeep Experience)",
  "Beyond the Pink (Evening Heritage & Food Walk)",
  "The Farm & Fire (Countryside Cooking Masterclass)",
  "The Cosmic & Imperial Triad (Hawa Mahal, Jantar Mantar & City Palace)",
  "The Living Walled City",
  "Combo: Jaipur at Dawn + The Ridge & Ramparts",
  "Combo: Beyond the Pink + The Blue Hour",
  "Combo: The Cosmic & Imperial Triad + The Farm & Fire",
  "Custom / Not Sure Yet",
];

/* ── Country list (common travel origins) ── */
const countries = [
  "India","United States","United Kingdom","Australia","Canada","Germany",
  "France","Italy","Spain","Netherlands","Switzerland","Austria","Belgium",
  "Sweden","Norway","Denmark","Finland","Japan","South Korea","China",
  "Singapore","Malaysia","Thailand","Indonesia","UAE","Saudi Arabia",
  "Israel","South Africa","Brazil","Mexico","Argentina","New Zealand",
  "Ireland","Portugal","Poland","Czech Republic","Hungary","Russia",
  "Turkey","Egypt","Kenya","Other",
];

const IN = "DM Sans, system-ui, sans-serif";
const PF = "Fraunces, Georgia, serif";

/* ── Shared field styles ── */
const fldBase = {
  width: "100%",
  padding: "12px 16px",
  fontFamily: IN,
  fontSize: "0.9rem",
  color: "#1A1209",
  background: "#FFFFFF",
  border: "1.5px solid #FFD89B",
  borderRadius: "12px",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  appearance: "none",
  WebkitAppearance: "none",
};

const lbl = {
  display: "block",
  fontFamily: IN,
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 700,
  color: "#6B5B2E",
  marginBottom: "7px",
};

const onFocus = (e) => {
  e.target.style.borderColor = "#FF8C00";
  e.target.style.boxShadow   = "0 0 0 3px rgba(255,140,0,0.14)";
};
const onBlur  = (e) => {
  e.target.style.borderColor = "#FFD89B";
  e.target.style.boxShadow   = "none";
};

/* ── Field wrapper ── */
function Field({ id, label, required, children }) {
  return (
    <div>
      <label htmlFor={id} style={lbl}>
        {label}{required && <span style={{ color:"#FF8C00", marginLeft:"3px" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function FormInner() {
  const params = useSearchParams();
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    country: "", city: "",
    experience: params.get("experience") || "",
    date: "", guests: "", message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name:"", email:"", phone:"", country:"", city:"", experience:"", date:"", guests:"", message:"" });
      } else {
        setStatus("error");
        setErrMsg(data.message || "Something went wrong. Please try WhatsApp.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try WhatsApp.");
    }
  };

  /* ── Success state ── */
  if (status === "success") return (
    <div style={{ textAlign:"center", padding:"64px 24px", background:"linear-gradient(145deg,#FFFBF0,#FFF7E4)", border:"1px solid #FFD89B", borderRadius:"24px" }}>
      <div style={{ width:"64px", height:"64px", borderRadius:"50%", background:"linear-gradient(135deg,#FF8C00,#F5A623)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
        <CheckCircle2 size={32} style={{ color:"#FFFFFF" }} />
      </div>
      <h3 style={{ fontFamily:PF, fontSize:"2rem", fontWeight:700, color:"#1A1209", marginBottom:"12px" }}>Enquiry Received!</h3>
      <p style={{ fontFamily:IN, color:"#6B5B2E", lineHeight:1.75, maxWidth:"360px", margin:"0 auto", fontSize:"0.9rem", fontWeight:300 }}>
        We'll personally review your message and respond within 24 hours.
      </p>
      <p style={{ fontFamily:PF, color:"#FF8C00", fontStyle:"italic", marginTop:"14px", fontSize:"0.9rem" }}>
        — Raah India Experiences
      </p>
      <button
        onClick={() => setStatus("idle")}
        style={{ marginTop:"24px", color:"#FF8C00", background:"none", border:"1px solid rgba(255,140,0,0.3)", borderRadius:"9999px", cursor:"pointer", fontFamily:IN, fontSize:"0.78rem", fontWeight:600, padding:"8px 20px", transition:"all .2s" }}
      >
        Send another enquiry
      </button>
    </div>
  );

  return (
    <>
      <style>{`
        /* ── Submit button ── */
        .cf-sub {
          width: 100%;
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 55%, #C45E00 100%);
          color: #FFFFFF;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: none;
          border-radius: 9999px;
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(255,140,0,0.30);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .cf-sub:hover:not(:disabled), .cf-sub:focus-visible:not(:disabled) {
          color: #FFFFFF;
          transform: translateY(-2px) scale(1.02);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.14),
            0 0 24px rgba(255,140,0,0.50),
            0 10px 28px rgba(255,140,0,0.28);
        }
        .cf-sub:active { transform: translateY(0) scale(1); }
        .cf-sub:focus-visible { outline: 2px solid #FF8C00; outline-offset: 3px; }
        .cf-sub:disabled { opacity: 0.6; cursor: not-allowed; }

        /* ── Select arrow ── */
        .cf-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23FF8C00' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 40px !important;
          cursor: pointer;
        }
      `}</style>

      <form onSubmit={submit} noValidate style={{ display:"flex", flexDirection:"column", gap:"20px" }}>

        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="name" label="Full Name" required>
            <input id="name" name="name" type="text" placeholder="Your full name"
              required value={form.name} onChange={change}
              style={fldBase} onFocus={onFocus} onBlur={onBlur} />
          </Field>
          <Field id="email" label="Email Address" required>
            <input id="email" name="email" type="email" placeholder="your@email.com"
              required value={form.email} onChange={change}
              style={fldBase} onFocus={onFocus} onBlur={onBlur} />
          </Field>
        </div>

        {/* Row 2: Phone + Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="phone" label="Phone / WhatsApp">
            <input id="phone" name="phone" type="tel" placeholder="+91 or international"
              value={form.phone} onChange={change}
              style={fldBase} onFocus={onFocus} onBlur={onBlur} />
          </Field>
          <Field id="date" label="Preferred Date">
            <input id="date" name="date" type="date"
              value={form.date} onChange={change}
              style={fldBase} onFocus={onFocus} onBlur={onBlur} />
          </Field>
        </div>

        {/* Row 3: Country (select) + City (text) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="country" label="Country">
            <select id="country" name="country"
              value={form.country} onChange={change}
              style={fldBase} className="cf-select"
              onFocus={onFocus} onBlur={onBlur}
            >
              <option value="">Select your country</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field id="city" label="City">
            <input id="city" name="city" type="text" placeholder="Your city"
              value={form.city} onChange={change}
              style={fldBase} onFocus={onFocus} onBlur={onBlur} />
          </Field>
        </div>

        {/* Row 4: Experience + Group size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="experience" label="Preferred Experience" required>
            <select id="experience" name="experience" required
              value={form.experience} onChange={change}
              style={fldBase} className="cf-select"
              onFocus={onFocus} onBlur={onBlur}
            >
              <option value="">Select an experience</option>
              {expOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
          <Field id="guests" label="Number of Guests" required>
            <select id="guests" name="guests" required
              value={form.guests} onChange={change}
              style={fldBase} className="cf-select"
              onFocus={onFocus} onBlur={onBlur}
            >
              <option value="">Select group size</option>
              {["1 guest","2 guests","3 guests","4 guests","5 guests","6 guests","7+ guests (private group)"].map(n =>
                <option key={n} value={n}>{n}</option>
              )}
            </select>
          </Field>
        </div>

        {/* Row 5: Message */}
        <Field id="message" label="Message / Special Requests">
          <textarea id="message" name="message" rows={5}
            value={form.message} onChange={change}
            placeholder="Any specific interests, dietary preferences, or questions?"
            style={{ ...fldBase, resize:"vertical", minHeight:"120px" }}
            onFocus={onFocus} onBlur={onBlur}
          />
        </Field>

        {/* Error block */}
        {status === "error" && (
          <div style={{ background:"#FFFDE7", border:"1px solid #FFD89B", borderRadius:"14px", padding:"16px 18px" }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"12px" }}>
              <AlertCircle size={15} style={{ color:"#FF8C00", flexShrink:0, marginTop:"2px" }} />
              <p style={{ fontFamily:IN, color:"#6B5B2E", fontSize:"0.875rem" }}>{errMsg}</p>
            </div>
            <a
              href="https://wa.me/919876543210?text=Hello%2C+I%27d+like+to+book+a+Raah+India+Experience."
              target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"#25D366", color:"white", padding:"9px 18px", fontFamily:IN, fontSize:"0.78rem", fontWeight:700, textDecoration:"none", borderRadius:"9999px" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us Instead
            </a>
          </div>
        )}

        {/* Submit */}
        <button type="submit" disabled={status === "loading"} className="cf-sub">
          {status === "loading"
            ? <><Loader2 size={16} className="animate-spin" /> Sending…</>
            : <><Send size={15} /> Send Booking Enquiry</>}
        </button>

        <p style={{ fontFamily:IN, fontSize:"0.72rem", color:"#9C8550", textAlign:"center", fontWeight:300 }}>
          We respond personally within 24 hours. Your information is never shared.
        </p>
      </form>
    </>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={
      <div style={{ padding:"40px", textAlign:"center", fontFamily:"DM Sans,system-ui,sans-serif", color:"#6B5B2E" }}>
        Loading form…
      </div>
    }>
      <FormInner />
    </Suspense>
  );
}
