"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

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

const fld = { width:"100%", padding:"11px 15px", fontFamily:"DM Sans,system-ui,sans-serif", fontSize:"0.875rem", border:"1.5px solid #C8D8D0", background:"#FFFFFF", color:"#1A1F1C", outline:"none", transition:"border-color .2s" };
const lbl = { display:"block", fontFamily:"DM Sans,system-ui,sans-serif", fontSize:"0.58rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color:"#1A1F1C", marginBottom:"7px" };
const onF = e => { e.target.style.borderColor = "#1E4D3A"; };
const onB = e => { e.target.style.borderColor = "#C8D8D0"; };

function FormInner() {
  const params = useSearchParams();
  const [form, setForm] = useState({ name:"", email:"", phone:"", country:"", experience: params.get("experience")||"", date:"", guests:"", message:"" });
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");

  const change = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault(); setStatus("loading"); setErrMsg("");
    try {
      const res = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      const data = await res.json();
      if (res.ok && data.success) { setStatus("success"); setForm({ name:"", email:"", phone:"", country:"", experience:"", date:"", guests:"", message:"" }); }
      else { setStatus("error"); setErrMsg(data.message || "Something went wrong. Please try WhatsApp."); }
    } catch { setStatus("error"); setErrMsg("Network error. Please try WhatsApp."); }
  };

  if (status === "success") return (
    <div style={{ textAlign:"center", padding:"60px 24px", background:"#E8F0EC", border:"1px solid #C8D8D0" }}>
      <CheckCircle2 size={44} style={{ color:"#1E4D3A", margin:"0 auto 16px", display:"block" }} />
      <h3 style={{ fontFamily:"Fraunces,Georgia,serif", fontSize:"1.9rem", fontWeight:700, color:"#1A1F1C", marginBottom:"12px" }}>Enquiry Received!</h3>
      <p style={{ fontFamily:"DM Sans,system-ui,sans-serif", color:"#4A5550", lineHeight:1.75, maxWidth:"380px", margin:"0 auto", fontSize:"0.9rem", fontWeight:300 }}>We'll personally review your message and respond within 24 hours.</p>
      <p style={{ fontFamily:"Fraunces,Georgia,serif", color:"#B07D3E", fontStyle:"italic", marginTop:"14px", fontSize:"0.9rem" }}>— Raah India Experiences</p>
      <button onClick={() => setStatus("idle")} style={{ marginTop:"22px", color:"#4A5550", background:"none", border:"none", cursor:"pointer", fontFamily:"DM Sans,system-ui,sans-serif", fontSize:"0.8rem", textDecoration:"underline" }}>Send another enquiry</button>
    </div>
  );

  return (
    <>
      <style>{`.cf-sub{background:#1E4D3A;color:#F0EDE8;font-family:'DM Sans',system-ui,sans-serif;} .cf-sub:hover:not(:disabled){background:#163529!important;}`}</style>
      <form onSubmit={submit} noValidate style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { id:"name",    lbl:"Full Name *",      type:"text",  ph:"Your full name",       req:true },
            { id:"email",   lbl:"Email Address *",  type:"email", ph:"your@email.com",       req:true },
            { id:"phone",   lbl:"Phone / WhatsApp", type:"tel",   ph:"+91 or international", req:false },
            { id:"country", lbl:"Country / City",   type:"text",  ph:"Where are you from?",  req:false },
          ].map(({ id, lbl:lb, type, ph, req }) => (
            <div key={id}>
              <label style={lbl}>{lb}</label>
              <input name={id} id={id} type={type} placeholder={ph} required={req} value={form[id]} onChange={change} style={fld} onFocus={onF} onBlur={onB} />
            </div>
          ))}
          <div>
            <label style={lbl}>Preferred Experience *</label>
            <select name="experience" required value={form.experience} onChange={change} style={{ ...fld, background:"#FFFFFF" }} onFocus={onF} onBlur={onB}>
              <option value="">Select an experience</option>
              {expOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Number of Guests *</label>
            <select name="guests" required value={form.guests} onChange={change} style={{ ...fld, background:"#FFFFFF" }} onFocus={onF} onBlur={onB}>
              <option value="">Select group size</option>
              {["1 guest","2 guests","3 guests","4 guests","5 guests","6 guests","7+ guests (private group)"].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label style={lbl}>Preferred Date</label>
            <input name="date" type="date" value={form.date} onChange={change} style={{ ...fld, maxWidth:"260px" }} onFocus={onF} onBlur={onB} />
          </div>
        </div>
        <div>
          <label style={lbl}>Message / Special Requests</label>
          <textarea name="message" rows={5} value={form.message} onChange={change} placeholder="Any specific interests, dietary preferences, or questions?" style={{ ...fld, resize:"none" }} onFocus={onF} onBlur={onB} />
        </div>
        {status === "error" && (
          <div style={{ background:"#F0F7F4", border:"1px solid #C8D8D0", padding:"14px 16px" }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"10px" }}>
              <AlertCircle size={15} style={{ color:"#B07D3E", flexShrink:0, marginTop:"2px" }} />
              <p style={{ fontFamily:"DM Sans,system-ui,sans-serif", color:"#4A5550", fontSize:"0.875rem" }}>{errMsg}</p>
            </div>
            <a href="https://wa.me/919876543210?text=Hello%2C+I%27d+like+to+book+a+Raah+India+Experience." target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"#25D366", color:"white", padding:"8px 14px", fontFamily:"DM Sans,system-ui,sans-serif", fontSize:"0.78rem", fontWeight:700, textDecoration:"none" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us Instead
            </a>
          </div>
        )}
        <button type="submit" disabled={status === "loading"} className="cf-sub"
          style={{ padding:"15px", fontSize:"0.85rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", border:"none", cursor:status === "loading" ? "not-allowed" : "pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", transition:"background .2s", opacity:status === "loading" ? 0.6 : 1 }}
        >
          {status === "loading" ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : "Send Booking Enquiry"}
        </button>
        <p style={{ fontFamily:"DM Sans,system-ui,sans-serif", fontSize:"0.72rem", color:"#7A8A84", textAlign:"center", fontWeight:300 }}>
          We respond personally within 24 hours. Your information is never shared.
        </p>
      </form>
    </>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div style={{ padding:"40px", textAlign:"center", fontFamily:"DM Sans,system-ui,sans-serif", color:"#4A5550" }}>Loading form...</div>}>
      <FormInner />
    </Suspense>
  );
}
