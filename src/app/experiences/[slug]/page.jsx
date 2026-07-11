import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Clock, MapPin, Users, Gauge, Globe,
  CheckCircle2, XCircle, ArrowRight, MessageCircle, ArrowLeft,
} from "lucide-react";
import { experiences, getExperienceBySlug, getRelatedExperiences } from "@/data/experiences";
import FAQAccordion from "@/components/FAQAccordion";
import GallerySlider from "./GallerySlider";
import RelatedSlider from "./RelatedSlider";

export async function generateStaticParams() {
  return experiences.map(e => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) return {};
  return {
    title: `${exp.title} — ${exp.subtitle}`,
    description: exp.tagline,
    openGraph: { images: [exp.heroImage] },
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
  const waUrl   = `https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`;

  return (
    <>
      <style>{`
        /* ── Back link ── */
        .back-link {
          display: inline-flex; align-items: center; gap: 6px;
          color: rgba(255,255,255,0.78);
          font-family: ${IN}; font-size:.8rem; font-weight:500;
          text-decoration:none; transition:color .2s;
        }
        .back-link:hover { color:#FFFFFF !important; }

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
          text-decoration: none;
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
        <Image src={exp.heroImage} alt={exp.title} fill className="object-cover object-center" priority sizes="100vw" />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(20,10,0,0.92) 0%,rgba(20,10,0,0.22) 50%,transparent 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 15% 80%,rgba(255,140,0,0.12) 0%,transparent 55%)" }} />

        {/* Back link */}
        <div style={{ position:"absolute", top:"88px", left:0, right:0, zIndex:20, maxWidth:"1320px", margin:"0 auto", padding:"0 20px" }} className="inner-pad">
          <Link href="/experiences" className="back-link">
            <ArrowLeft size={14} /> Back to Experiences
          </Link>
        </div>

        <div style={{ position:"relative", zIndex:10, maxWidth:"1320px", margin:"0 auto", padding:"0 20px 52px", width:"100%", paddingTop:"140px" }} className="inner-pad">
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
            <div style={{ width:"28px", height:"1px", background:GO }} />
            <span style={LABEL}>{exp.theme}</span>
          </div>
          <h1 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(2.4rem,6.5vw,5.5rem)", color:"#FFFFFF", lineHeight:1.05, marginBottom:"12px" }}>
            {exp.title}
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
      <div style={{ background:CR, borderBottom:`1px solid ${PH}` }}>
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

              {/* Story */}
              <div>
                <p style={LABEL}>The Story</p>
                <div style={RULE} />
                <h2 style={{ ...H2, fontSize:"clamp(1.6rem,3vw,2.5rem)" }}>Why This Experience Exists</h2>
                <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                  {exp.story.split("\n\n").map((p, i) => (
                    <p key={i} style={{ fontFamily:IN, color:MU, lineHeight:1.9, fontSize:"0.95rem", fontWeight:300 }}>{p}</p>
                  ))}
                </div>
              </div>

              {/* What you'll experience */}
              <div>
                <p style={LABEL}>The Journey</p>
                <div style={RULE} />
                <h2 style={{ ...H2, fontSize:"clamp(1.6rem,3vw,2.5rem)" }}>What You&apos;ll Experience</h2>
                <ul style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
                  {exp.whatYouExperience.map((item, i) => (
                    <li key={i} style={{ display:"flex", alignItems:"flex-start", gap:"12px" }}>
                      <CheckCircle2 size={16} style={{ color:GO, marginTop:"3px", flexShrink:0 }} />
                      <span style={{ fontFamily:IN, color:MU, fontSize:"0.9rem", lineHeight:1.8, fontWeight:300 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              <div style={{ background:CR, border:`1px solid ${PH}`, borderLeft:`4px solid ${OR}`, borderRadius:"0 16px 16px 0", padding:"28px 28px 28px 24px" }}>
                <p style={LABEL}>Highlights</p>
                <div style={{ width:"36px", height:"2px", background:OR, borderRadius:"2px", margin:"10px 0 20px" }} />
                <h2 style={{ fontFamily:PF, fontSize:"1.7rem", fontWeight:700, color:CH, marginBottom:"24px" }}>Experience at a Glance</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {exp.highlights.map((h, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                      <span style={{ fontSize:"1.3rem" }}>{h.icon}</span>
                      <span style={{ fontFamily:IN, color:MU, fontSize:"0.875rem", fontWeight:300 }}>{h.text}</span>
                    </div>
                  ))}
                </div>
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

              {/* Practical Info */}
              <div>
                <p style={LABEL}>Practical Info</p>
                <div style={RULE} />
                <h2 style={{ ...H2, fontSize:"clamp(1.6rem,3vw,2.5rem)" }}>Before You Come</h2>
                <div style={{ border:`1px solid ${PH}`, borderRadius:"16px", overflow:"hidden" }}>
                  {[
                    ["Duration",         exp.duration],
                    ["Start Time",       exp.startTime],
                    ["Walking Distance", exp.distance],
                    ["Difficulty",       exp.difficulty],
                    ["Group Size",       exp.groupSize],
                    ["Languages",        Array.isArray(exp.languages) ? exp.languages.join(", ") : exp.languages],
                    ["Meeting Point",    exp.meetingPoint],
                  ].map(([k, v], i, arr) => (
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

              {/* Gallery — GallerySlider handles desktop grid + mobile MobileSlider */}
              {exp.gallery && exp.gallery.length > 0 && (
                <div>
                  <p style={LABEL}>Gallery</p>
                  <div style={RULE} />
                  <h2 style={{ ...H2, fontSize:"clamp(1.6rem,3vw,2.5rem)" }}>Moments From This Experience</h2>
                  <GallerySlider images={exp.gallery} title={exp.title} />
                </div>
              )}

              {/* FAQs */}
              <div>
                <p style={LABEL}>FAQs</p>
                <div style={RULE} />
                <h2 style={{ ...H2, fontSize:"clamp(1.6rem,3vw,2.5rem)" }}>Frequently Asked Questions</h2>
                <FAQAccordion items={exp.faqs} />
              </div>
            </div>

            {/* ─── Sticky Sidebar ─── */}
            <div className="lg:col-span-1 detail-sidebar">
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
                    {[["Duration",exp.duration],["Start Time",exp.startTime],["Group Size",exp.groupSize]].map(([k, v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", paddingBottom:"10px", marginBottom:"10px", borderBottom:`1px solid ${PH}` }}>
                        <span style={{ fontFamily:IN, color:"#9C8550", fontSize:"0.78rem", fontWeight:300 }}>{k}</span>
                        <span style={{ fontFamily:IN, color:CH, fontSize:"0.82rem", fontWeight:600 }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginTop:"8px" }}>
                      <Link href={`/contact?experience=${encodeURIComponent(exp.title)}`} className="sb-book">
                        Send Booking Enquiry <ArrowRight size={13} />
                      </Link>
                      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="sb-wa">
                        <MessageCircle size={14} /> WhatsApp Enquiry
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
      <div className="mobile-book-bar" role="complementary" aria-label="Book this experience">
        <Link
          href={`/contact?experience=${encodeURIComponent(exp.title)}`}
          className="mob-book-btn"
          style={{ flex: 1 }}
        >
          Book This Experience
        </Link>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mob-wa-btn"
          aria-label="WhatsApp enquiry"
          style={{ flexShrink: 0 }}
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </>
  );
}
