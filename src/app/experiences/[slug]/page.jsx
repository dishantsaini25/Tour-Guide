import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users, Gauge, Globe, CheckCircle2, XCircle, ArrowRight, MessageCircle, ArrowLeft } from "lucide-react";
import { experiences, getExperienceBySlug, getRelatedExperiences } from "@/data/experiences";
import FAQAccordion from "@/components/FAQAccordion";
import ExperienceCard from "@/components/ExperienceCard";

export async function generateStaticParams() {
  return experiences.map(e => ({ slug: e.slug }));
}
export async function generateMetadata({ params }) {
  const exp = getExperienceBySlug(params.slug);
  if (!exp) return {};
  return { title: `${exp.title} — ${exp.subtitle}`, description: exp.tagline, openGraph: { images: [exp.heroImage] } };
}

/* ── Design tokens ── */
const PF = "Fraunces,Georgia,serif";
const IN = "DM Sans,system-ui,sans-serif";
const CH = "#1A1209", MU = "#6B5B2E", OR = "#FF8C00", GO = "#F5A623";
const WH = "#FFFFFF", CR = "#FFFDE7", PH = "#FFD89B";

const LABEL = { fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:OR };
const RULE  = { width:"40px", height:"2px", background:`linear-gradient(to right,${OR},${GO})`, margin:"10px 0 22px" };
const H2    = { fontFamily:PF, fontWeight:700, lineHeight:1.1, color:CH, marginBottom:"22px" };

export default async function ExperienceDetailPage({ params }) {
  const exp = getExperienceBySlug(params.slug);
  if (!exp) notFound();
  const related = getRelatedExperiences(exp.slug, 3);
  const waMsg = `Hello! I'd like to enquire about "${exp.title}" by Raah India Experiences.`;
  const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`;

  return (
    <>
      <style>{`
        .sb-book{display:flex;align-items:center;justify-content:center;gap:7px;background:${OR};color:#FFFFFF;padding:14px;font-family:${IN};font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;transition:background .2s;}
        .sb-book:hover{background:#E07800!important;}
        .sb-wa{display:flex;align-items:center;justify-content:center;gap:7px;border:1px solid ${PH};color:${MU};padding:12px;font-family:${IN};font-size:.82rem;font-weight:500;text-decoration:none;transition:all .2s;}
        .sb-wa:hover{border-color:#25D366!important;color:#25D366!important;}
        .back-link{display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,0.75);font-family:${IN};font-size:.8rem;font-weight:500;text-decoration:none;transition:color .2s;}
        .back-link:hover{color:#FFFFFF!important;}
        .mob-book-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:${OR};color:#FFFFFF;height:100%;font-family:${IN};font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;transition:background .2s;padding:0 16px;}
        .mob-book-btn:hover{background:#E07800!important;}
        .mob-wa-btn{display:flex;align-items:center;justify-content:center;gap:6px;border:1.5px solid ${PH};color:${CH};height:44px;padding:0 16px;font-family:${IN};font-size:.82rem;font-weight:600;text-decoration:none;transition:all .2s;white-space:nowrap;}
        .mob-wa-btn:hover{border-color:#25D366!important;color:#25D366!important;}
        .gallery-img{transition:transform .5s ease;}
        .gallery-carousel > div:hover .gallery-img{transform:scale(1.05);}
      `}</style>

      {/* ── Hero ── */}
      <section style={{ position:"relative", minHeight:"65vh", display:"flex", alignItems:"flex-end", overflow:"hidden" }}>
        <Image src={exp.heroImage} alt={exp.title} fill className="object-cover object-top" priority sizes="100vw" />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(20,10,0,0.92) 0%,rgba(20,10,0,0.22) 50%,rgba(20,10,0,0.12) 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 15% 80%,rgba(255,140,0,0.12) 0%,transparent 55%)" }} />

        {/* Back link */}
        <div style={{ position:"absolute", top:"88px", left:0, right:0, zIndex:20, maxWidth:"1320px", margin:"0 auto", padding:"0 20px" }} className="inner-pad">
          <Link href="/experiences" className="back-link"><ArrowLeft size={14} /> Back to Experiences</Link>
        </div>

        <div style={{ position:"relative", zIndex:10, maxWidth:"1320px", margin:"0 auto", padding:"0 20px 48px", width:"100%", paddingTop:"140px" }} className="inner-pad">
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
            <div style={{ width:"28px", height:"1px", background:GO }} />
            <span style={{ ...LABEL }}>{exp.theme}</span>
          </div>
          <h1 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(2.4rem,6.5vw,5.5rem)", color:"#FFFFFF", lineHeight:1.05, marginBottom:"12px" }}>{exp.title}</h1>
          <p style={{ fontFamily:PF, fontSize:"clamp(1rem,2vw,1.5rem)", fontStyle:"italic", color:"rgba(255,255,255,0.72)", marginBottom:"10px" }}>{exp.subtitle}</p>
          <p style={{ fontFamily:IN, fontSize:"0.9rem", color:"rgba(255,255,255,0.45)", fontStyle:"italic", fontWeight:300 }}>{exp.question}</p>
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
              <Icon size={14} style={{ color:OR }} />
              <div>
                <p style={{ fontFamily:IN, fontSize:"0.56rem", textTransform:"uppercase", letterSpacing:"0.18em", color:"#9C8550", marginBottom:"1px" }}>{label}</p>
                <p style={{ fontFamily:IN, color:CH, fontSize:"0.85rem", fontWeight:600 }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="detail-page-content" style={{ background:WH, padding:"48px 0" }}>
        <div style={{ maxWidth:"1320px", margin:"0 auto", padding:"0 20px" }} className="inner-pad">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* ─── Left col ─── */}
            <div className="lg:col-span-2" style={{ display:"flex", flexDirection:"column", gap:"48px" }}>

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
              <div style={{ background:CR, border:`1px solid ${PH}`, borderLeft:`4px solid ${OR}`, padding:"28px" }}>
                <p style={LABEL}>Highlights</p>
                <div style={{ width:"36px", height:"2px", background:OR, margin:"10px 0 20px" }} />
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
                    <span key={item} style={{ background:CR, border:`1px solid ${PH}`, color:CH, fontFamily:IN, fontSize:"0.82rem", fontWeight:500, padding:"8px 16px" }}>{item}</span>
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
                <div style={{ border:`1px solid ${PH}`, overflow:"hidden" }}>
                  {[
                    ["Duration", exp.duration],
                    ["Start Time", exp.startTime],
                    ["Walking Distance", exp.distance],
                    ["Difficulty", exp.difficulty],
                    ["Group Size", exp.groupSize],
                    ["Languages", Array.isArray(exp.languages) ? exp.languages.join(", ") : exp.languages],
                    ["Meeting Point", exp.meetingPoint],
                  ].map(([k, v], i) => (
                    <div key={k} style={{ display:"flex", borderBottom: i < 6 ? `1px solid ${PH}` : "none" }}>
                      <div style={{ width:"38%", padding:"13px 18px", background:CR, fontFamily:IN, fontSize:"0.7rem", textTransform:"uppercase", letterSpacing:"0.12em", color:MU, fontWeight:600, display:"flex", alignItems:"center" }}>{k}</div>
                      <div style={{ padding:"13px 18px", fontFamily:IN, fontSize:"0.875rem", color:CH, fontWeight:500, flex:1, display:"flex", alignItems:"center" }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curator note */}
              <div style={{ borderLeft:`3px solid ${OR}`, padding:"22px 22px 22px 28px", background:"rgba(255,140,0,0.04)" }}>
                <p style={{ ...LABEL, marginBottom:"10px" }}>A Note From the Curator</p>
                <p style={{ fontFamily:PF, fontSize:"1.1rem", fontStyle:"italic", color:CH, lineHeight:1.75 }}>&ldquo;{exp.curatorNote}&rdquo;</p>
              </div>

              {/* Gallery */}
              {exp.gallery && exp.gallery.length > 0 && (
                <div>
                  <p style={LABEL}>Gallery</p>
                  <div style={RULE} />
                  <h2 style={{ ...H2, fontSize:"clamp(1.6rem,3vw,2.5rem)" }}>Moments From This Experience</h2>
                  <div className="gallery-carousel">
                    {exp.gallery.map((img, i) => (
                      <div key={i} style={{ position:"relative", aspectRatio:"4/3", overflow:"hidden", borderRadius:"2px", border:`1px solid ${PH}` }}>
                        <Image src={img.src} alt={img.alt || `${exp.title} — moment ${i + 1}`} fill className="object-cover gallery-img" sizes="(max-width:640px) 80vw,(max-width:1024px) 33vw,22vw" loading="lazy" />
                      </div>
                    ))}
                  </div>
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
              <div style={{ position:"sticky", top:"88px", display:"flex", flexDirection:"column", gap:"14px" }}>
                <div style={{ background:WH, border:`1px solid ${PH}` }}>
                  <div style={{ background:OR, padding:"22px 24px" }}>
                    <h3 style={{ fontFamily:PF, fontSize:"1.5rem", fontWeight:700, color:"#FFFFFF", marginBottom:"4px" }}>Book This Experience</h3>
                    <p style={{ fontFamily:IN, color:"rgba(255,255,255,0.65)", fontSize:"0.78rem", fontWeight:300 }}>We respond personally within 24 hours</p>
                  </div>
                  <div style={{ padding:"22px 24px" }}>
                    {[["Duration",exp.duration],["Start Time",exp.startTime],["Group Size",exp.groupSize]].map(([k, v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", paddingBottom:"10px", marginBottom:"10px", borderBottom:`1px solid ${PH}` }}>
                        <span style={{ fontFamily:IN, color:"#9C8550", fontSize:"0.78rem", fontWeight:300 }}>{k}</span>
                        <span style={{ fontFamily:IN, color:CH, fontSize:"0.82rem", fontWeight:600 }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginTop:"6px" }}>
                      <Link href={`/contact?experience=${encodeURIComponent(exp.title)}`} className="sb-book">
                        Send Booking Inquiry <ArrowRight size={13} />
                      </Link>
                      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="sb-wa">
                        <MessageCircle size={14} /> WhatsApp Enquiry
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ padding:"16px 18px", background:CR, border:`1px solid ${PH}` }}>
                  <p style={{ fontFamily:IN, fontSize:"0.8rem", color:MU, lineHeight:1.7, fontWeight:300 }}>
                    <strong style={{ color:CH, fontWeight:600 }}>Private bookings available.</strong>{" "}
                    All experiences can be arranged privately.{" "}
                    <Link href="/contact" style={{ color:OR, textDecoration:"none" }}>Get in touch.</Link>
                  </p>
                </div>

                <div style={{ padding:"16px 18px 16px 20px", borderLeft:`3px solid ${OR}`, background:WH }}>
                  <p style={{ fontFamily:PF, fontSize:"0.9rem", fontStyle:"italic", color:MU, lineHeight:1.65 }}>
                    &ldquo;We don&apos;t just show you Jaipur. We help you understand it.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ background:CR, padding:"80px 0" }}>
          <div style={{ maxWidth:"1320px", margin:"0 auto", padding:"0 20px" }} className="inner-pad">
            <div style={{ textAlign:"center", marginBottom:"52px" }}>
              <p style={LABEL}>Continue Exploring</p>
              <div style={{ width:"40px", height:"2px", background:`linear-gradient(to right,${OR},${GO})`, margin:"10px auto 18px" }} />
              <h2 style={{ fontFamily:PF, fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:700, color:CH }}>You Might Also Love</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(e => <ExperienceCard key={e.slug} experience={e} />)}
            </div>
          </div>
        </div>
      )}

      {/* Mobile sticky CTA */}
      <div className="mobile-book-bar" role="complementary" aria-label="Book this experience">
        <Link href={`/contact?experience=${encodeURIComponent(exp.title)}`} className="mob-book-btn">Book This Experience</Link>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="mob-wa-btn" aria-label="WhatsApp enquiry">
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </>
  );
}
