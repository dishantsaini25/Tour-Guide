"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { cloudImgW } from "@/lib/cloudinaryImage";
import { galleryImages, galleryCategories } from "@/data/gallery";

const PF="Fraunces,Georgia,serif", IN="DM Sans,system-ui,sans-serif";
const CH="#1A1209", MU="#6B5B2E", OR="#FF8C00", GO="#F5A623";

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [limit, setLimit] = useState(24);
  const filtered = active === "All" ? galleryImages : galleryImages.filter(i => i.category === active);
  const shown = filtered.slice(0, limit);
  const idx = lightbox ? filtered.findIndex(i => i.id === lightbox.id) : -1;
  const go = (d) => setLightbox(filtered[(idx + d + filtered.length) % filtered.length]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  });

  return (
    <>
      <style>{`
        .gi:hover .govl{opacity:1!important;}
        .gi img{transition:transform .5s ease;}
        .gi:hover img{transform:scale(1.05);}
      `}</style>

      {/* Hero */}
      <section style={{ background:"#FFFDE7", paddingTop:"110px", paddingBottom:"64px", textAlign:"center", borderBottom:"1px solid #FFD89B" }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto", padding:"0 20px" }}>
          <p style={{ fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:OR, marginBottom:"10px" }}>Visual Stories</p>
          <div style={{ width:"36px", height:"2px", background:OR, margin:"0 auto 18px" }} />
          <h1 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(2.2rem,5vw,4rem)", color:CH, lineHeight:1.12, marginBottom:"16px", textWrap:"balance" }}>
            Jaipur Through <em style={{ color:OR, fontStyle:"italic" }}>Our Lens</em>
          </h1>
          <p style={{ fontFamily:IN, color:MU, fontSize:"1rem", lineHeight:1.75, fontWeight:300, maxWidth:"600px", margin:"0 auto" }}>Moments from our walks — real people, real mornings, real Jaipur.</p>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ background:"#FFFFFF", padding:"72px 0" }}>
        <div style={{ maxWidth:"1320px", margin:"0 auto", padding:"0 20px" }}>
          <h2 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(1.5rem,3vw,2.1rem)", color:CH, textAlign:"center", marginBottom:"24px", textWrap:"balance" }}>
            Photos from our walks in Jaipur
          </h2>
          {/* Filters */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", justifyContent:"center", marginBottom:"48px" }}>
            {galleryCategories.map(cat => (
              <button key={cat} onClick={() => { setActive(cat); setLimit(24); }}
                style={{ padding:"8px 20px", minHeight:"44px", fontFamily:IN, fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", border:"2px solid", cursor:"pointer", transition:"all .2s",
                  borderColor: active === cat ? OR : "#FFD89B",
                  background:  active === cat ? OR  : "transparent",
                  color:       active === cat ? "#FFFFFF" : MU }}
              >{cat}</button>
            ))}
          </div>

          {/* Masonry */}
          {filtered.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3" style={{ columnGap:"12px" }}>
              {shown.map(img => (
                <div key={img.id} className="gi break-inside-avoid" onClick={() => setLightbox(img)}
                  style={{ marginBottom:"12px", position:"relative", overflow:"hidden", cursor:"pointer", border:"1px solid #FFD89B" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cloudImgW(img.src, 640)} alt={img.alt} className="w-full h-auto block" loading="lazy" decoding="async" />
                  <div className="govl"
                    style={{ position:"absolute", inset:0, background:"rgba(255,140,0,0.72)", opacity:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"8px", transition:"opacity .3s" }}
                  >
                    <ZoomIn size={26} style={{ color:"#FFFFFF" }} />
                    <p style={{ fontFamily:PF, color:"rgba(255,255,255,0.95)", fontSize:"0.88rem", fontStyle:"italic", textAlign:"center", padding:"0 16px" }}>{img.alt}</p>
                    <span style={{ fontFamily:IN, fontSize:"0.58rem", letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700, color:"#FFFDE7" }}>{img.category}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign:"center", fontFamily:IN, color:MU, padding:"60px 0" }}>No images in this category yet.</p>
          )}
          {filtered.length > limit && (
            <div style={{ textAlign:"center", marginTop:"32px" }}>
              <button onClick={() => setLimit(l => l + 24)}
                style={{ minHeight:"44px", padding:"12px 32px", fontFamily:IN, fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", border:"2px solid "+OR, background:"transparent", color:OR, cursor:"pointer", borderRadius:"9999px" }}
              >Load more photos ({filtered.length - limit})</button>
            </div>
          )}
        </div>
      </section>

      {/* Walk with us */}
      <section style={{ background:"#FFFDE7", padding:"64px 0", textAlign:"center", borderTop:"1px solid #FFD89B" }}>
        <div style={{ maxWidth:"760px", margin:"0 auto", padding:"0 20px" }}>
          <h2 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(1.5rem,3vw,2.1rem)", color:CH, marginBottom:"12px", textWrap:"balance" }}>
            Walk these streets with us
          </h2>
          <p style={{ fontFamily:IN, color:MU, fontSize:"1rem", lineHeight:1.75, fontWeight:300, marginBottom:"28px" }}>
            Every photo here was taken on a Raah walk. Choose a walk through the old city, or see all our experiences in Jaipur.
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"12px", justifyContent:"center" }}>
            <Link href="/jaipur-walking-tours" style={{ minHeight:"44px", display:"inline-flex", alignItems:"center", padding:"12px 28px", fontFamily:IN, fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", background:OR, color:"#FFFFFF", textDecoration:"none", borderRadius:"9999px" }}>
              Walking tours in Jaipur
            </Link>
            <Link href="/experiences" style={{ minHeight:"44px", display:"inline-flex", alignItems:"center", padding:"12px 28px", fontFamily:IN, fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", border:"2px solid "+OR, color:OR, textDecoration:"none", borderRadius:"9999px" }}>
              All experiences
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" style={{ position:"fixed", inset:0, zIndex:10000, background:"rgba(20,10,0,0.96)", display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }} onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} aria-label="Close"
            style={{ position:"absolute", top:"20px", right:"20px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.2)", color:"#FFFFFF", padding:"10px", cursor:"pointer", borderRadius:"50%" }}
          ><X size={20} /></button>
          <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous photo"
            style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", width:"44px", height:"44px", background:"rgba(255,255,255,0.12)", border:0, color:"#FFFFFF", cursor:"pointer", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}
          ><ChevronLeft size={22} /></button>
          <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next photo"
            style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", width:"44px", height:"44px", background:"rgba(255,255,255,0.12)", border:0, color:"#FFFFFF", cursor:"pointer", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}
          ><ChevronRight size={22} /></button>
          <div style={{ maxWidth:"1100px", width:"100%" }} onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cloudImgW(lightbox.src, 1600)} alt={lightbox.alt} className="w-full h-auto object-contain" style={{ maxHeight:"78vh", border:"1px solid rgba(255,255,255,0.08)" }} />
            <div style={{ background:"rgba(20,10,0,0.88)", padding:"14px 20px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontFamily:PF, color:"#FFFFFF", fontWeight:500, fontSize:"0.95rem", fontStyle:"italic" }}>{lightbox.alt}</p>
              <p style={{ fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.18em", textTransform:"uppercase", color:GO, fontWeight:700, marginTop:"4px" }}>{lightbox.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
