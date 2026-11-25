import { notFound } from "next/navigation";
import HighlightIcon from "@/components/HighlightIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Image from "next/image";
import Link from "next/link";
import {
  Clock, MapPin, Users, Gauge, Globe,
  CheckCircle2, XCircle, ArrowRight, ArrowLeft,
} from "lucide-react";
import { experiences, getExperienceBySlug, getRelatedExperiences } from "@/data/experiences";
import { cloudImg } from "@/lib/cloudinaryImage";
import FAQAccordion from "@/components/FAQAccordion";
import GallerySlider from "./GallerySlider";
import RelatedSlider from "./RelatedSlider";
import BookBarWatcher from "./BookBarWatcher";

export async function generateStaticParams() {
  return experiences.map(e => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) return {};

  const title = exp.metaTitle || `${exp.title} — ${exp.subtitle}`;
  const description = exp.metaDescription || exp.tagline;
  const url = `https://www.raahexperiences.in/experiences/${exp.slug}`;
  const image = cloudImg(exp.heroImage);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/* ── Design tokens ── */
const PF = "Fraunces,Georgia,serif";
const IN = "DM Sans,system-ui,sans-serif";
const CH = "#1A1209", MU = "#6B5B2E", OR = "#FF8C00", GO = "#F5A623";
const WH = "#FFFFFF", CR = "#FFFDE7", PH = "#FFD89B";

const LABEL = { fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:OR };
const RULE  = { width:"40px", height:"2px", background:`linear-gradient(to right,${OR},${GO})`, margin:"10px 0 22px", borderRadius:"2px" };
const H2    = { fontFamily:PF, fontWeight:700, lineHeight:1.1, color:CH, marginBottom:"22px" };

export default async function ExperienceDetailPage({ params }) {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) notFound();

  const related = getRelatedExperiences(exp.slug, 3);
  const waMsg   = `Hello! I'd like to enquire about "${exp.title}" by Raah India Experiences.`;
  const waUrl   = `https://wa.me/919929992539?text=${encodeURIComponent(waMsg)}`;
  const pageUrl = `https://www.raahexperiences.in/experiences/${exp.slug}`;

  return (
    <>
      {/* ── TouristTrip schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "@id": `${pageUrl}#trip`,
            name: exp.title,
            description: exp.tagline,
                        url: pageUrl,
            image: cloudImg(exp.heroImage),
            touristType: "International tourists, heritage travellers",
            itinerary: {
              "@type": "ItemList",
              itemListElement: (exp.glancePoints || []).map((point, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: point,
              })),
            },
            offers: (exp.priceUSD || exp.priceINR) ? {
              "@type": "Offer",
              price: exp.priceUSD || exp.priceINR,
              priceCurrency: exp.priceUSD ? "USD" : "INR",
              availability: "https://schema.org/InStock",
              url: pageUrl,
            } : undefined,
            provider: { "@id": "https://www.raahexperiences.in/#organization" },
          }),
        }}
      />

      {/* ── FAQPage schema ── */}
      {exp.faqs && exp.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: exp.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}

      {/* ── BreadcrumbList schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.raahexperiences.in" },
              { "@type": "ListItem", position: 2, name: "Experiences", item: "https://www.raahexperiences.in/experiences" },
              { "@type": "ListItem", position: 3, name: exp.title, item: pageUrl },
            ],
          }),
        }}
      />

      <style>{`
        /* ── Back link ── */
        .back-link {
          display: inline-flex; align-items: center; gap: 6px;
          color: rgba(255,255,255,0.78);
          font-family: ${IN}; font-size:.8rem; font-weight:500;
          text-decoration:none; transition:color .2s;
        }
        .back-link:hover { color:#FFFFFF !important; }

        /* ── Hero theme badge — glassmorphism pill over the hero image ── */
        .hero-theme-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 248, 220, 0.14);
          backdrop-filter: blur(10px) saturate(140%);
          -webkit-backdrop-filter: blur(10px) saturate(140%);
          border: 1px solid rgba(245, 166, 35, 0.35);
          border-radius: 9999px;
          padding: 6px 16px 6px 10px;
          margin-bottom: 18px;
          max-width: 100%;
        }
        .hero-theme-badge::before {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${GO};
          flex-shrink: 0;
        }
        .hero-theme-badge span {
          font-family: ${IN};
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 232, 150, 0.95);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        @media (max-width: 767px) {
          .hero-theme-badge { max-width: calc(100vw - 40px); }
          .hero-theme-badge span { white-space: normal; }
        }

        /* ── Sidebar Book button — pill, gradient, glow-only hover ── */
        .sb-book {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 55%, #C45E00 100%);
          color: #FFFFFF !important;
          padding: 14px 20px;
          font-family: ${IN}; font-size:.82rem; font-weight:700;
          letter-spacing:.06em; text-transform:uppercase;
          text-decoration:none; border-radius:9999px;
          box-shadow: 0 4px 16px rgba(255,140,0,0.28);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .sb-book:hover, .sb-book:focus-visible {
          color:#FFFFFF !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow:
            0 0 0 4px rgba(255,140,0,0.13),
            0 0 22px rgba(255,140,0,0.48),
            0 8px 22px rgba(255,140,0,0.28) !important;
        }
        .sb-book:active { transform:translateY(0) scale(1); }

        /* ── Sidebar WhatsApp button ── */
        .sb-wa {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          background: linear-gradient(135deg, #25D366 0%, #1db954 100%);
          color: #FFFFFF !important;
          padding: 12px 20px;
          font-family: ${IN}; font-size:.82rem; font-weight:600;
          text-decoration:none; border-radius:9999px;
          box-shadow: 0 3px 12px rgba(37,211,102,0.25);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .sb-wa:hover, .sb-wa:focus-visible {
          color:#FFFFFF !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow:
            0 0 0 4px rgba(37,211,102,0.14),
            0 0 20px rgba(37,211,102,0.42),
            0 6px 18px rgba(37,211,102,0.26) !important;
        }
        .sb-wa:active { transform:translateY(0) scale(1); }

        /* ── Mobile sticky Book bar — floating pill ── */
        .mob-book-btn {
          flex: 1;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 55%, #C45E00 100%);
          color: #FFFFFF !important;
          font-family: ${IN}; font-size: .82rem; font-weight: 700;
          letter-spacing: .07em; text-transform: uppercase;
          text-decoration: none; white-space: nowrap;
          padding: 0 20px;
          border-radius: 9999px;
          height: 48px;
          transition: box-shadow 0.3s ease, transform 0.25s ease;
          box-shadow: 0 3px 14px rgba(255,140,0,0.28);
        }
        .mob-book-btn:hover, .mob-book-btn:focus-visible {
          color: #FFFFFF !important;
          transform: scale(1.02);
          box-shadow: 0 0 18px rgba(255,140,0,0.45), 0 6px 18px rgba(255,140,0,0.28) !important;
        }
        .mob-book-btn:focus-visible { outline: 2px solid #FF8C00; outline-offset: 3px; }

        .mob-wa-btn {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          background: linear-gradient(135deg, #25D366 0%, #1db954 100%);
          color: #FFFFFF !important;
          height: 48px; padding: 0 20px;
          font-family: ${IN}; font-size: .82rem; font-weight: 700;
          text-decoration: none; white-space: nowrap;
          border-radius: 9999px;
          box-shadow: 0 3px 12px rgba(37,211,102,0.28);
          transition: box-shadow 0.3s ease, transform 0.25s ease;
        }
        .mob-wa-btn:hover, .mob-wa-btn:focus-visible {
          color: #FFFFFF !important;
          transform: scale(1.02);
          box-shadow: 0 0 16px rgba(37,211,102,0.45), 0 6px 16px rgba(37,211,102,0.26) !important;
        }
        .mob-wa-btn:focus-visible { outline: 2px solid #25D366; outline-offset: 3px; }

        /* ── Mobile & tablet booking card ── */
        .snap-card {
          background:#FFFFFF; border:1px solid rgba(255,216,155,0.8);
          border-radius:20px; overflow:hidden;
          box-shadow:0 10px 30px rgba(120,70,0,0.10);
          margin-top:-8px;
        }
        .snap-top {
          padding:18px 18px 16px;
          background:linear-gradient(135deg,#FFF8E6 0%,#FFEFD0 100%);
          border-bottom:1px solid rgba(255,216,155,0.8);
        }
        .snap-badge {
          font-family:${IN}; font-size:.62rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
          color:#9A5200; background:#FFFFFF; border:1px solid rgba(255,180,90,0.6);
          padding:5px 10px; border-radius:9999px; white-space:nowrap;
        }
        .snap-facts {
          list-style:none; margin:0; padding:6px 18px 4px;
          display:grid; grid-template-columns:1fr 1fr; column-gap:14px;
        }
        .snap-facts li { display:flex; align-items:flex-start; gap:10px; padding:12px 0; border-bottom:1px solid #FBEBD0; min-width:0; }
        .snap-facts li.wide { grid-column:1 / -1; }
        .snap-facts li:last-child { border-bottom:none; }
        .snap-ico {
          width:30px; height:30px; border-radius:9px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:#FFF3DC; color:${OR};
        }
        .snap-lbl { display:block; font-family:${IN}; font-size:.6rem; letter-spacing:.14em; text-transform:uppercase; color:#9C8550; margin-bottom:2px; }
        .snap-val { display:block; font-family:${IN}; font-size:.86rem; color:${CH}; font-weight:600; line-height:1.4; overflow-wrap:anywhere; }
        .snap-actions { display:grid; grid-template-columns:1.4fr 1fr; gap:10px; padding:4px 18px 0; }
        .snap-foot { font-family:${IN}; font-size:.72rem; color:${MU}; text-align:center; padding:12px 18px 16px; }

        /* ── Floating bar appears only after the booking card scrolls away ── */
        .mobile-book-bar { transition:opacity .25s ease, visibility .25s ease; }
        html:not(.show-book-bar) .mobile-book-bar { opacity:0; visibility:hidden; pointer-events:none; }

        /* ── Journey timeline ── */
        .journey { list-style:none; margin:0; padding:0; position:relative; }
        .journey li { position:relative; display:flex; gap:16px; padding-bottom:20px; }
        .journey li:last-child { padding-bottom:0; }
        .journey li:not(:last-child)::before {
          content:""; position:absolute; left:15px; top:34px; bottom:2px;
          width:2px; background:linear-gradient(${PH}, rgba(255,216,155,0.25));
        }
        .journey-num {
          width:32px; height:32px; border-radius:50%; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:linear-gradient(135deg,#FF8C00,#E07800); color:#FFFFFF;
          font-family:${IN}; font-size:.8rem; font-weight:700;
          box-shadow:0 3px 10px rgba(255,140,0,0.25);
        }
        .journey-text { font-family:${IN}; color:${MU}; font-size:.92rem; line-height:1.75; font-weight:400; padding-top:5px; min-width:0; }

        /* ── Story read-more ── */
        .story-more summary {
          list-style:none; cursor:pointer; display:inline-flex; align-items:center; gap:6px;
          font-family:${IN}; font-size:.8rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase;
          color:${OR}; padding:10px 18px; border:1px solid ${PH}; border-radius:9999px; background:${CR};
        }
        .story-more summary::-webkit-details-marker { display:none; }
        .story-more summary::after { content:"+"; font-size:1rem; line-height:1; }
        .story-more[open] summary::after { content:"−"; }
        .story-more summary:focus-visible { outline:2px solid ${OR}; outline-offset:3px; }

        /* ── Sticky bar price ── */
        .mob-price { display:flex; flex-direction:column; justify-content:center; line-height:1.1; padding:0 6px 0 10px; flex-shrink:0; }
        .mob-price span { font-family:${IN}; font-size:.62rem; color:${MU}; text-transform:uppercase; letter-spacing:.1em; }
        .mob-price strong { font-family:${PF}; font-size:1.1rem; color:${CH}; }
        @media (max-width: 380px) {
          .mob-wa-label { display:none; }
          .mob-wa-btn { padding:0 16px !important; }
          .mob-book-btn { padding:0 14px !important; }
        }

        /* ── Ideal-for chips ── */
        .ideal-chip {
          background: linear-gradient(145deg,#FFFBF0,#FFF7E4);
          border: 1px solid rgba(255,216,155,0.6);
          border-radius: 9999px;
          color: #1A1209;
          font-family: ${IN}; font-size:.82rem; font-weight:500;
          padding: 7px 16px;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .ideal-chip:hover {
          box-shadow: 0 4px 14px rgba(255,140,0,0.14);
          transform: translateY(-1px);
        }

        /* ── Practical info table ── */
        .info-row { display:flex; border-bottom:1px solid ${PH}; }
        .info-row:last-child { border-bottom:none; }
        .info-key {
          width:38%; padding:13px 18px;
          background:${CR};
          font-family:${IN}; font-size:.7rem;
          text-transform:uppercase; letter-spacing:.12em;
          color:${MU}; font-weight:600;
          display:flex; align-items:center;
        }
        .info-val {
          padding:13px 18px;
          font-family:${IN}; font-size:.875rem; color:${CH};
          font-weight:500; flex:1; display:flex; align-items:center;
        }

        /* ── Sidebar card ── */
        .sidebar-card {
          background:#FFFFFF;
          border:1px solid rgba(255,216,155,0.55);
          border-radius:20px;
          overflow:hidden;
          box-shadow:0 4px 20px rgba(255,140,0,0.08);
        }
        .sidebar-header {
          background:linear-gradient(135deg,#FF8C00 0%,#E07800 100%);
          padding:22px 24px;
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ position:"relative", minHeight:"65vh", display:"flex", alignItems:"flex-end", overflow:"hidden" }}>
                <Image src={cloudImg(exp.heroImage)} alt={exp.heroAlt || exp.title} fill className="object-cover object-center" priority sizes="100vw" />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(20,10,0,0.92) 0%,rgba(20,10,0,0.22) 50%,transparent 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 15% 80%,rgba(255,140,0,0.12) 0%,transparent 55%)" }} />

        {/* Back link */}
        <div style={{ position:"absolute", top:"88px", left:0, right:0, zIndex:20, maxWidth:"1320px", margin:"0 auto", padding:"0 20px" }} className="inner-pad">
          <Link href="/experiences" className="back-link">
            <ArrowLeft size={14} /> Back to Experiences
          </Link>
        </div>

        <div style={{ position:"relative", zIndex:10, maxWidth:"1320px", margin:"0 auto", padding:"0 20px 52px", width:"100%", paddingTop:"140px" }} className="inner-pad">
          {/* Theme badge */}
          <div className="hero-theme-badge">
            <span>{exp.theme}</span>
          </div>

                  <h1 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(2.4rem,6.5vw,5.5rem)", color:"#FFFFFF", lineHeight:1.05, marginBottom:"12px" }}>
            {exp.title}{" "}
            {exp.seoName && (
              <span style={{ display:"block", fontFamily:IN, fontSize:"0.28em", fontWeight:500, fontStyle:"normal", letterSpacing:"0.04em", color:"rgba(255,255,255,0.82)", marginTop:"12px" }}>
                {exp.seoName}
              </span>
            )}
          </h1>
          <p style={{ fontFamily:PF, fontSize:"clamp(1rem,2vw,1.5rem)", fontStyle:"italic", color:"rgba(255,255,255,0.72)", marginBottom:"10px" }}>
            {exp.subtitle}
          </p>
          <p style={{ fontFamily:IN, fontSize:"0.9rem", color:"rgba(255,255,255,0.45)", fontStyle:"italic", fontWeight:300 }}>
            {exp.question}
          </p>
        </div>
      </section>

      {/* ── Quick Info Strip ── */}
      <div className="hidden lg:block" style={{ background:CR, borderBottom:`1px solid ${PH}` }}>
        <div className="quick-info-strip" style={{ maxWidth:"1320px", margin:"0 auto", padding:"18px 20px", display:"flex", flexWrap:"wrap", gap:"24px" }}>
          {[
            { Icon:Clock,  label:"Duration",   value:exp.duration },
            { Icon:MapPin, label:"Location",   value:exp.location },
            { Icon:Users,  label:"Group Size", value:exp.groupSize },
            { Icon:Gauge,  label:"Difficulty", value:exp.difficulty },
            { Icon:Globe,  label:"Languages",  value:Array.isArray(exp.languages) ? exp.languages.join(", ") : exp.languages },
          ].map(({ Icon, label, value }) => (
            <div key={label} style={{ display:"flex", alignItems:"center", gap:"10px", flexShrink:0 }}>
              <div style={{ width:"34px", height:"34px", borderRadius:"10px", background:"linear-gradient(135deg,#FFF3DC,#FFE8B0)", border:"1px solid rgba(255,216,155,0.6)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon size={14} style={{ color:OR }} />
              </div>
              <div>
                <p style={{ fontFamily:IN, fontSize:"0.54rem", textTransform:"uppercase", letterSpacing:"0.18em", color:"#9C8550", marginBottom:"1px" }}>{label}</p>
                <p style={{ fontFamily:IN, color:CH, fontSize:"0.85rem", fontWeight:600 }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="detail-page-content" style={{ background:WH, padding:"52px 0" }}>
        <div style={{ maxWidth:"1320px", margin:"0 auto", padding:"0 20px" }} className="inner-pad">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* ─── Left column ─── */}
            <div className="lg:col-span-2" style={{ display:"flex", flexDirection:"column", gap:"52px" }}>

              {/* Mobile & tablet booking card — key facts, price and booking in one place */}
              <div className="lg:hidden snap-card">
                <div className="snap-top">
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:"10px", flexWrap:"wrap" }}>
                    {exp.priceUSD ? (
                      <p style={{ fontFamily:IN, color:MU, fontSize:"0.78rem", lineHeight:1.2 }}>
                        From{" "}
                        <strong style={{ fontFamily:PF, fontSize:"2rem", color:CH, fontWeight:700, letterSpacing:"-0.01em" }}>${exp.priceUSD}</strong>{" "}
                        {exp.priceUnit || "per person"}
                      </p>
                    ) : (
                      <p style={{ fontFamily:PF, fontSize:"1.4rem", color:CH, fontWeight:700 }}>Book This Experience</p>
                    )}
                    <span className="snap-badge">Local guide</span>
                  </div>
                  {exp.priceNote && <p style={{ fontFamily:IN, fontSize:"0.74rem", color:MU, marginTop:"6px", lineHeight:1.55 }}>{exp.priceNote}</p>}
                </div>

                <ul className="snap-facts">
                  {[
                    { Icon:Clock,  label:"Duration",   value:exp.duration },
                    { Icon:Users,  label:"Group size", value:exp.groupSize },
                    { Icon:Gauge,  label:"Difficulty", value:exp.difficulty },
                    { Icon:Globe,  label:"Languages",  value:Array.isArray(exp.languages) ? exp.languages.join(", ") : exp.languages },
                    { Icon:Clock,  label:"Start time", value:exp.startTime, wide:true },
                    { Icon:MapPin, label:"Meeting point", value:exp.beforeYouCome?.meetingPoint || exp.meetingPoint, wide:true },
                  ].filter(f => f.value).map(({ Icon, label, value, wide }) => (
                    <li key={label} className={wide ? "wide" : ""}>
                      <span className="snap-ico"><Icon size={14} /></span>
                      <span style={{ minWidth:0 }}>
                        <span className="snap-lbl">{label}</span>
                        <span className="snap-val">{value}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="snap-actions">
                  <Link href={`/contact?experience=${encodeURIComponent(exp.title)}`} className="sb-book">
                    Book Now <ArrowRight size={13} />
                  </Link>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="sb-wa">
                    <WhatsAppIcon size={16} /> WhatsApp
                  </a>
                </div>
                <p className="snap-foot">Free to enquire · We reply personally within 24 hours</p>
              </div>

              {/* Gallery — GallerySlider handles desktop grid + mobile MobileSlider */}
              {exp.gallery && exp.gallery.length > 0 && (
                <div>
                  <p style={LABEL}>Gallery</p>
                  <div style={RULE} />
                  <h2 style={{ ...H2, fontSize:"clamp(1.6rem,3vw,2.5rem)" }}>Moments From This Experience</h2>
                 <GallerySlider images={exp.gallery.map((g, i) => ({ ...g, src: cloudImg(g.src), alt: g.alt || `${exp.title} – photo ${i + 1}` }))} title={exp.title} />
                </div>
              )}

              {/* Highlights */}
              <div style={{ background:CR, border:`1px solid ${PH}`, borderLeft:`4px solid ${OR}`, borderRadius:"0 16px 16px 0", padding:"28px 28px 28px 24px" }}>
                <p style={LABEL}>Highlights</p>
                <div style={{ width:"36px", height:"2px", background:OR, borderRadius:"2px", margin:"10px 0 20px" }} />
                <h2 style={{ fontFamily:PF, fontSize:"1.7rem", fontWeight:700, color:CH, marginBottom:"24px" }}>Experience at a Glance</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {exp.highlights.map((h, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                      <span style={{ width:"34px", height:"34px", borderRadius:"10px", background:"linear-gradient(135deg,#FFF3DC,#FFE8B0)", border:"1px solid rgba(255,216,155,0.6)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <HighlightIcon name={h.icon} size={16} style={{ color:OR }} />
                      </span>
                      <span style={{ fontFamily:IN, color:MU, fontSize:"0.875rem", fontWeight:300 }}>{h.text}</span>
                    </div>
                  ))}
                </div>
                
                {/* Additional bulleted highlights if provided */}
                {exp.secondaryHighlights && exp.secondaryHighlights.length > 0 && (
                  <div style={{ marginTop:"28px", paddingTop:"24px", borderTop:`1px solid ${PH}` }}>
                    <ul style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                      {exp.secondaryHighlights.map((item, i) => (
                        <li key={i} style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                          <CheckCircle2 size={14} style={{ color:GO, marginTop:"3px", flexShrink:0 }} />
                          <span style={{ fontFamily:IN, color:MU, fontSize:"0.875rem", lineHeight:1.7, fontWeight:300 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* What you'll experience */}
              <div>
                <p style={LABEL}>The Journey</p>
                <div style={RULE} />
                <h2 style={{ ...H2, fontSize:"clamp(1.6rem,3vw,2.5rem)" }}>What You&apos;ll Experience{exp.seoName ? ` on This ${exp.seoName}` : ""}</h2>
                <ol className="journey">
                  {exp.whatYouExperience.map((item, i) => (
                    <li key={i}>
                      <span className="journey-num" aria-hidden="true">{i + 1}</span>
                      <span className="journey-text">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Story */}
              <div>
                <p style={LABEL}>The Story</p>
                <div style={RULE} />
                <h2 style={{ ...H2, fontSize:"clamp(1.6rem,3vw,2.5rem)" }}>Why This Experience Exists</h2>
                {(() => {
                  const paras = exp.story.split("\n\n");
                  const P = (p, i) => <p key={i} style={{ fontFamily:IN, color:MU, lineHeight:1.9, fontSize:"0.95rem", fontWeight:300 }}>{p}</p>;
                  return (
                    <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                      {paras.slice(0, 1).map(P)}
                      {paras.length > 1 && (
                        <details className="story-more">
                          <summary>Read the full story</summary>
                          <div style={{ display:"flex", flexDirection:"column", gap:"16px", marginTop:"16px" }}>
                            {paras.slice(1).map((p, i) => P(p, i + 1))}
                          </div>
                        </details>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Ideal for */}
              <div>
                <p style={LABEL}>Is This For You?</p>
                <div style={RULE} />
                <h2 style={{ ...H2, fontSize:"clamp(1.6rem,3vw,2.5rem)" }}>This Experience is Ideal For</h2>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
                  {exp.idealFor.map(item => (
                    <span key={item} className="ideal-chip">{item}</span>
                  ))}
                </div>
              </div>

              {/* Inclusions / Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 style={{ fontFamily:PF, fontSize:"1.3rem", fontWeight:700, color:CH, marginBottom:"16px" }}>What&apos;s Included</h3>
                  <ul style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                    {exp.inclusions.map(item => (
                      <li key={item} style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                        <CheckCircle2 size={14} style={{ color:GO, marginTop:"3px", flexShrink:0 }} />
                        <span style={{ fontFamily:IN, color:MU, fontSize:"0.875rem", fontWeight:300 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontFamily:PF, fontSize:"1.3rem", fontWeight:700, color:CH, marginBottom:"16px" }}>Not Included</h3>
                  <ul style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                    {exp.exclusions.map(item => (
                      <li key={item} style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                        <XCircle size={14} style={{ color:"#FFD89B", marginTop:"3px", flexShrink:0 }} />
                        <span style={{ fontFamily:IN, color:MU, fontSize:"0.875rem", fontWeight:300 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Optional Add-Ons — rendered only when the field is present */}
              {exp.optionalAddOns && exp.optionalAddOns.length > 0 && (
                <div style={{ background:`rgba(255,140,0,0.04)`, border:`1px solid ${PH}`, borderLeft:`4px solid ${OR}`, borderRadius:"0 14px 14px 0", padding:"22px 24px" }}>
                  <p style={LABEL}>Optional Add-Ons</p>
                  <div style={{ width:"36px", height:"2px", background:OR, borderRadius:"2px", margin:"8px 0 16px" }} />
                  <ul style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                    {exp.optionalAddOns.map(item => (
                      <li key={item} style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                        <span style={{ fontSize:"0.9rem", marginTop:"1px", flexShrink:0 }}>✦</span>
                        <span style={{ fontFamily:IN, color:MU, fontSize:"0.875rem", fontWeight:300 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Practical Info / Before You Come */}
              <div>
                <p style={LABEL}>Practical Info</p>
                <div style={RULE} />
                <h2 style={{ ...H2, fontSize:"clamp(1.6rem,3vw,2.5rem)" }}>Before You Come</h2>
                <div style={{ border:`1px solid ${PH}`, borderRadius:"16px", overflow:"hidden" }}>
                  {[
                    ["Duration",         exp.beforeYouCome?.duration  || exp.duration],
                    ["Start Time",       exp.beforeYouCome?.startTime || exp.startTime],
                    ["Walking Distance", exp.beforeYouCome?.distance  || exp.distance],
                    ["Difficulty",       exp.beforeYouCome?.difficulty|| exp.difficulty],
                    ["Group Size",       exp.beforeYouCome?.groupSize || exp.groupSize],
                    ["Languages",        exp.beforeYouCome?.languages || (Array.isArray(exp.languages) ? exp.languages.join(", ") : exp.languages)],
                    ["Experience Type",  exp.beforeYouCome?.experienceType || null],
                    ["Meeting Point",    exp.beforeYouCome?.meetingPoint || exp.meetingPoint],
                    ["Host",             exp.beforeYouCome?.host || null],
                    ["Cuisine",          exp.beforeYouCome?.cuisine || null],
                    ["Transport",        exp.beforeYouCome?.transport || null],
                  ].filter(([, v]) => v).map(([k, v], i, arr) => (
                    <div key={k} className="info-row" style={{ borderBottom: i < arr.length - 1 ? `1px solid ${PH}` : "none" }}>
                      <div className="info-key">{k}</div>
                      <div className="info-val">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curator note */}
              <div style={{ borderLeft:`3px solid ${OR}`, padding:"22px 22px 22px 28px", background:"rgba(255,140,0,0.04)", borderRadius:"0 14px 14px 0" }}>
                <p style={{ ...LABEL, marginBottom:"10px" }}>A Note From the Curator</p>
                <p style={{ fontFamily:PF, fontSize:"1.1rem", fontStyle:"italic", color:CH, lineHeight:1.75 }}>
                  &ldquo;{exp.curatorNote}&rdquo;
                </p>
              </div>

              {/* FAQs */}
              <div>
                <p style={LABEL}>FAQs</p>
                <div style={RULE} />
                <h2 style={{ ...H2, fontSize:"clamp(1.6rem,3vw,2.5rem)" }}>Frequently Asked Questions</h2>
                <FAQAccordion items={exp.faqs} />
              </div>
            </div>

            {/* ─── Sticky Sidebar ─── */}
            <div className="lg:col-span-1 detail-sidebar hidden lg:block">
              <div style={{ position:"sticky", top:"88px", display:"flex", flexDirection:"column", gap:"16px" }}>

                {/* Booking card */}
                <div className="sidebar-card">
                  <div className="sidebar-header">
                    <h3 style={{ fontFamily:PF, fontSize:"1.45rem", fontWeight:700, color:"#FFFFFF", marginBottom:"4px" }}>
                      Book This Experience
                    </h3>
                    <p style={{ fontFamily:IN, color:"rgba(255,255,255,0.65)", fontSize:"0.78rem", fontWeight:300 }}>
                      We respond personally within 24 hours
                    </p>
                  </div>
                  <div style={{ padding:"22px 24px" }}>
                    {/* Duration row */}
                    <div style={{ display:"flex", justifyContent:"space-between", paddingBottom:"10px", marginBottom:"10px", borderBottom:`1px solid ${PH}` }}>
                      <span style={{ fontFamily:IN, color:"#9C8550", fontSize:"0.78rem", fontWeight:300 }}>Duration</span>
                      <span style={{ fontFamily:IN, color:CH, fontSize:"0.82rem", fontWeight:600 }}>{exp.duration}</span>
                    </div>

                    {/* Price row — shown only when priceUSD or priceINR exists */}
                    {(exp.priceUSD || exp.priceINR) && (
                      <div style={{ paddingBottom:"10px", marginBottom:"10px", borderBottom:`1px solid ${PH}` }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                          <span style={{ fontFamily:IN, color:"#9C8550", fontSize:"0.78rem", fontWeight:300 }}>Price</span>
                          <div style={{ textAlign:"right" }}>
                            <span style={{ fontFamily:IN, color:OR, fontSize:"0.88rem", fontWeight:700 }}>
                              {exp.priceUSD ? `USD ${exp.priceUSD}` : ""}
                              {exp.priceUSD && exp.priceINR ? " / " : ""}
                              {exp.priceINR ? `INR ${exp.priceINR.toLocaleString("en-IN")}` : ""}
                              {` ${exp.priceUnit || "per person"}`}
                            </span>
                            {exp.priceNote && (
                              <p style={{ fontFamily:IN, color:"#9C8550", fontSize:"0.68rem", fontWeight:500, marginTop:"2px" }}>
                                {exp.priceNote}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Start Time row */}
                    <div style={{ display:"flex", justifyContent:"space-between", paddingBottom:"10px", marginBottom:"10px", borderBottom:`1px solid ${PH}` }}>
                      <span style={{ fontFamily:IN, color:"#9C8550", fontSize:"0.78rem", fontWeight:300 }}>Start Time</span>
                      <span style={{ fontFamily:IN, color:CH, fontSize:"0.82rem", fontWeight:600 }}>{exp.startTime}</span>
                    </div>

                    {/* Group Size row */}
                    <div style={{ display:"flex", justifyContent:"space-between", paddingBottom:"10px", marginBottom:"10px", borderBottom:`1px solid ${PH}` }}>
                      <span style={{ fontFamily:IN, color:"#9C8550", fontSize:"0.78rem", fontWeight:300 }}>Group Size</span>
                      <span style={{ fontFamily:IN, color:CH, fontSize:"0.82rem", fontWeight:600 }}>{exp.groupSize}</span>
                    </div>

                    {/* Meeting Point row */}
                    {(exp.beforeYouCome?.meetingPoint || exp.meetingPoint) && (
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"16px", paddingBottom:"10px", marginBottom:"10px", borderBottom:`1px solid ${PH}` }}>
                        <span style={{ fontFamily:IN, color:"#9C8550", fontSize:"0.78rem", fontWeight:300, flexShrink:0 }}>Meeting Point</span>
                        <span style={{ fontFamily:IN, color:CH, fontSize:"0.82rem", fontWeight:600, textAlign:"right" }}>{exp.beforeYouCome?.meetingPoint || exp.meetingPoint}</span>
                      </div>
                    )}

                    <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginTop:"8px" }}>
                      <Link href={`/contact?experience=${encodeURIComponent(exp.title)}`} className="sb-book">
                        Send Booking Enquiry <ArrowRight size={13} />
                      </Link>
                      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="sb-wa">
                        <WhatsAppIcon size={16} /> WhatsApp Enquiry
                      </a>
                    </div>
                  </div>
                </div>

                {/* Private bookings note */}
                <div style={{ padding:"16px 18px", background:CR, border:`1px solid ${PH}`, borderRadius:"14px" }}>
                  <p style={{ fontFamily:IN, fontSize:"0.8rem", color:MU, lineHeight:1.7, fontWeight:300 }}>
                    <strong style={{ color:CH, fontWeight:600 }}>Private bookings available.</strong>{" "}
                    All experiences can be arranged privately.{" "}
                    <Link href="/contact" style={{ color:OR, textDecoration:"none", fontWeight:600 }}>Get in touch.</Link>
                  </p>
                </div>

                {/* Quote */}
                <div style={{ padding:"16px 18px 16px 20px", borderLeft:`3px solid ${OR}`, background:WH, borderRadius:"0 12px 12px 0" }}>
                  <p style={{ fontFamily:PF, fontSize:"0.9rem", fontStyle:"italic", color:MU, lineHeight:1.65 }}>
                    &ldquo;We don&apos;t just show you Jaipur. We help you understand it.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Experiences ── */}
      {related.length > 0 && (
        <div style={{ background:CR, padding:"80px 0" }}>
          <div style={{ maxWidth:"1320px", margin:"0 auto", padding:"0 20px" }} className="inner-pad">
            <div style={{ textAlign:"center", marginBottom:"52px" }}>
              <p style={LABEL}>Continue Exploring</p>
              <div style={{ width:"40px", height:"2px", background:`linear-gradient(to right,${OR},${GO})`, borderRadius:"2px", margin:"10px auto 18px" }} />
              <h2 style={{ fontFamily:PF, fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:700, color:CH }}>
                You Might Also Love
              </h2>
            </div>
            {/* Desktop grid + mobile auto-slider via RelatedSlider */}
            <RelatedSlider experiences={related} />
          </div>
        </div>
      )}

      {/* ── Mobile sticky CTA bar — floating pill ── */}
      <BookBarWatcher />
      <div className="mobile-book-bar" role="complementary" aria-label="Book this experience">
        {exp.priceUSD && (
          <div className="mob-price">
            <span>From</span>
            <strong>${exp.priceUSD}</strong>
          </div>
        )}
        <Link
          href={`/contact?experience=${encodeURIComponent(exp.title)}`}
          className="mob-book-btn"
          style={{ flex: 1 }}
        >
          Book Now
        </Link>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mob-wa-btn"
          aria-label="WhatsApp enquiry"
          style={{ flexShrink: 0 }}
        >
          <WhatsAppIcon size={18} /> <span className="mob-wa-label">WhatsApp</span>
        </a>
      </div>
    </>
  );
}