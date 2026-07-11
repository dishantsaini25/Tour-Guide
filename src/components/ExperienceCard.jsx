"use client";
import Link from "next/link";
import Image from "next/image";
import { Clock, Gauge, ArrowUpRight } from "lucide-react";

export default function ExperienceCard({ experience }) {
  const { slug, title, subtitle, question, theme, duration, difficulty, cardImage, heroImage, filters } = experience;
  const img = cardImage || heroImage;

  return (
    <>
      <style>{`
        .ec-root { background:#FFFFFF; border:1px solid #C8D8D0; display:flex; flex-direction:column; transition:box-shadow .35s ease,transform .35s ease; overflow:hidden; }
        .ec-root:hover { box-shadow:0 12px 44px rgba(30,77,58,0.12); transform:translateY(-4px); }
        .ec-img { transition:transform .7s cubic-bezier(.25,.46,.45,.94); }
        .ec-root:hover .ec-img { transform:scale(1.06); }
        .ec-view { display:flex;align-items:center;justify-content:center;gap:6px;background:#1E4D3A;color:#F0EDE8;padding:13px;font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;flex:1;font-family:'DM Sans',system-ui,sans-serif;transition:background .2s; }
        .ec-view:hover { background:#163529!important; }
        .ec-enq { display:flex;align-items:center;justify-content:center;flex:1;border:none;border-left:1px solid #C8D8D0;color:#1E4D3A;background:#F2F0EC;font-size:.78rem;font-weight:600;text-decoration:none;font-family:'DM Sans',system-ui,sans-serif;transition:all .2s;padding:13px; }
        .ec-enq:hover { background:#1E4D3A!important;color:#F0EDE8!important; }
      `}</style>

      <article className="ec-root raah-card">
        <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
          <Image src={img} alt={title} fill className="object-cover object-top ec-img"
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,25,16,0.92) 0%, rgba(10,25,16,0.15) 55%, transparent 100%)" }} />
          <div style={{ position: "absolute", top: "14px", left: "14px" }}>
            <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "#F0EDE8", background: "rgba(30,77,58,0.85)", padding: "4px 10px", backdropFilter: "blur(4px)" }}>
              {filters?.[0] || theme?.split("·")[0].trim()}
            </span>
          </div>
          <div style={{ position: "absolute", bottom: "14px", left: "16px", right: "16px" }}>
            <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "0.82rem", fontStyle: "italic", color: "rgba(240,237,232,0.88)", lineHeight: 1.4 }}>
              "{question}"
            </p>
          </div>
        </div>

        <div style={{ padding: "22px 22px 0", display: "flex", flexDirection: "column", flex: 1 }}>
          <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#B07D3E", fontWeight: 700, marginBottom: "8px" }}>{theme}</p>
          <h3 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "#1A1F1C", lineHeight: 1.1, marginBottom: "6px" }}>{title}</h3>
          <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "0.9rem", fontStyle: "italic", color: "#4A5550", marginBottom: "16px" }}>{subtitle}</p>
          <div style={{ width: "32px", height: "1.5px", background: "linear-gradient(to right, #B07D3E, #C89A5A)", marginBottom: "16px" }} />
          <div style={{ display: "flex", gap: "18px", marginBottom: "18px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.75rem", color: "#4A5550" }}>
              <Clock size={12} style={{ color: "#B07D3E" }} />{duration}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.75rem", color: "#4A5550" }}>
              <Gauge size={12} style={{ color: "#B07D3E" }} />{difficulty}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", borderTop: "1px solid #C8D8D0" }}>
          <Link href={`/experiences/${slug}`} className="ec-view">
            View Experience <ArrowUpRight size={13} />
          </Link>
          <Link href={`/contact?experience=${encodeURIComponent(title)}`} className="ec-enq">
            Enquire
          </Link>
        </div>
      </article>
    </>
  );
}
