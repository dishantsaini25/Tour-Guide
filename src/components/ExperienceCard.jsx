"use client";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Sunrise, ArrowRight } from "lucide-react";

export default function ExperienceCard({ experience }) {
  const { slug, title, tagline, location, duration, startTime, shortDescription, heroImage } = experience;

  return (
    <article className="card-hover group flex flex-col overflow-hidden" style={{ background: "white", border: "1px solid #e5d9c8" }}>

      {/* ── Image — natural height, no cropping ── */}
      <div className="overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          width={800}
          height={520}
          className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
          style={{ display: "block", objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-6">

        {/* Title */}
        <h3
          className="mb-1 group-hover:text-[#c9943a] transition-colors duration-200"
          style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.45rem", fontWeight: 600, color: "#1e1b3a", lineHeight: 1.2 }}
        >
          {title}
        </h3>
        <p style={{ color: "#c9943a", fontStyle: "italic", fontSize: "0.9rem", marginBottom: "14px" }}>{tagline}</p>

        {/* Meta pills */}
        <div className="flex flex-wrap gap-3 mb-4">
          {[
            { icon: <Clock size={12} />, text: duration },
            { icon: <MapPin size={12} />, text: location },
            { icon: <Sunrise size={12} />, text: startTime },
          ].map((m) => (
            <span key={m.text} className="flex items-center gap-1.5" style={{ color: "#8a7e9a", fontSize: "0.75rem" }}>
              <span style={{ color: "#c9943a" }}>{m.icon}</span>
              {m.text}
            </span>
          ))}
        </div>

        {/* Description */}
        <p style={{ color: "#4a4458", fontSize: "0.875rem", lineHeight: 1.7, flex: 1, marginBottom: "20px" }}>
          {shortDescription}
        </p>

        {/* CTA row */}
        <div className="flex gap-3 pt-4" style={{ borderTop: "1px solid #e5d9c8" }}>
          <Link
            href={`/experiences/${slug}`}
            className="exp-card-view flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold"
            style={{ background: "#1e1b3a", color: "white", transition: "background 0.2s" }}
          >
            View Details <ArrowRight size={13} />
          </Link>
          <Link
            href={`/contact?experience=${encodeURIComponent(title)}`}
            className="exp-card-enq flex-1 flex items-center justify-center py-2.5 px-3 text-sm font-semibold"
            style={{ border: "1.5px solid #c9943a", color: "#c9943a", transition: "background 0.2s, color 0.2s" }}
          >
            Enquire
          </Link>
        </div>
      </div>

      {/* hover styles via CSS — no JS handlers needed on links */}
      <style>{`
        .exp-card-view:hover { background: #2d2a52 !important; }
        .exp-card-enq:hover  { background: #c9943a !important; color: #1e1b3a !important; }
      `}</style>
    </article>
  );
}
