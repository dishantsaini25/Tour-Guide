"use client";
import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { galleryImages, galleryCategories } from "@/data/gallery";

const PF="Fraunces,Georgia,serif", IN="DM Sans,system-ui,sans-serif";
const CH="#1A1F1C", MU="#4A5550", FR="#1E4D3A", CP="#B07D3E";
const IV="#F2F0EC", SF="#E8F0EC", BD="#C8D8D0";

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const filtered = active === "All" ? galleryImages : galleryImages.filter(i => i.category === active);

  return (
    <>
      <style>{`
        .gi:hover .govl{opacity:1!important;}
        .gi img{transition:transform .5s ease;}
        .gi:hover img{transform:scale(1.05);}
      `}</style>

      {/* Hero — sage bg */}
      <section style={{ background:SF, paddingTop:"110px", paddingBottom:"64px", textAlign:"center", borderBottom:`1px solid ${BD}` }}>
        <div style={{ maxWidth:"600px", margin:"0 auto", padding:"0 20px" }}>
          <p style={{ fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:CP, marginBottom:"10px" }}>Visual Stories</p>
          <div style={{ width:"36px", height:"1.5px", background:CP, margin:"0 auto 18px" }} />
          <h1 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(2.8rem,7vw,4.8rem)", color:CH, lineHeight:1.08, marginBottom:"16px" }}>
            Jaipur Through<br /><em style={{ color:FR, fontStyle:"italic" }}>Our Lens</em>
          </h1>
          <p style={{ fontFamily:IN, color:MU, fontSize:"1rem", lineHeight:1.75, fontWeight:300 }}>Moments from our walks — real people, real mornings, real Jaipur.</p>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ background:IV, padding:"72px 0" }}>
        <div style={{ maxWidth:"1320px", margin:"0 auto", padding:"0 20px" }}>
          {/* Filters */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", justifyContent:"center", marginBottom:"48px" }}>
            {galleryCategories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                style={{ padding:"8px 20px", fontFamily:IN, fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", border:"1.5px solid", cursor:"pointer", transition:"all .2s",
                  borderColor: active === cat ? FR : BD,
                  background:  active === cat ? FR  : "transparent",
                  color:       active === cat ? "#F0EDE8" : MU }}
              >{cat}</button>
            ))}
          </div>

          {/* Masonry */}
          {filtered.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3" style={{ columnGap:"12px" }}>
              {filtered.map(img => (
                <div key={img.id} className="gi break-inside-avoid" onClick={() => setLightbox(img)}
                  style={{ marginBottom:"12px", position:"relative", overflow:"hidden", cursor:"pointer", border:`1px solid ${BD}` }}
                >
                  <Image src={img.src} alt={img.alt} width={900} height={600} className="w-full h-auto block" loading="lazy" />
                  <div className="govl"
                    style={{ position:"absolute", inset:0, background:"rgba(30,77,58,0.65)", opacity:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"8px", transition:"opacity .3s" }}
                  >
                    <ZoomIn size={26} style={{ color:"#F0EDE8" }} />
                    <p style={{ fontFamily:PF, color:"rgba(240,237,232,0.9)", fontSize:"0.88rem", fontStyle:"italic", textAlign:"center", padding:"0 16px" }}>{img.caption}</p>
                    <span style={{ fontFamily:IN, fontSize:"0.58rem", letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700, color:CP }}>{img.category}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign:"center", fontFamily:IN, color:MU, padding:"60px 0" }}>No images in this category yet.</p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(10,25,16,0.96)", display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }} onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} aria-label="Close"
            style={{ position:"absolute", top:"20px", right:"20px", background:"rgba(240,237,232,0.08)", border:"1px solid rgba(240,237,232,0.15)", color:"#F0EDE8", padding:"10px", cursor:"pointer", borderRadius:"50%" }}
          ><X size={20} /></button>
          <div style={{ maxWidth:"1100px", width:"100%" }} onClick={e => e.stopPropagation()}>
            <Image src={lightbox.src.replace("w=900","w=1400")} alt={lightbox.alt} width={1400} height={900} className="w-full h-auto object-contain" style={{ maxHeight:"78vh", border:"1px solid rgba(240,237,232,0.08)" }} priority />
            <div style={{ background:"rgba(10,25,16,0.85)", padding:"14px 20px", borderTop:"1px solid rgba(240,237,232,0.06)" }}>
              <p style={{ fontFamily:PF, color:"#F0EDE8", fontWeight:500, fontSize:"0.95rem", fontStyle:"italic" }}>{lightbox.caption}</p>
              <p style={{ fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.18em", textTransform:"uppercase", color:CP, fontWeight:700, marginTop:"4px" }}>{lightbox.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
