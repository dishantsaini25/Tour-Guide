import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Sunrise, CheckCircle2, XCircle, ArrowRight, MessageCircle } from "lucide-react";
import { experiences, getExperienceBySlug, getRelatedExperiences } from "@/data/experiences";
import FAQAccordion from "@/components/FAQAccordion";
import SectionWrapper from "@/components/SectionWrapper";
import ExperienceCard from "@/components/ExperienceCard";

export async function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const exp = getExperienceBySlug(params.slug);
  if (!exp) return {};
  return { title: `${exp.title} | Jaipur Walks`, description: exp.shortDescription, openGraph: { images: [exp.heroImage] } };
}

export default async function ExperienceDetailPage({ params }) {
  const exp = getExperienceBySlug(params.slug);
  if (!exp) notFound();

  const related = getRelatedExperiences(exp.slug);
  const waMsg = `Hello! I'd like to know more about "${exp.title}". Please share details.`;
  const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`;

  const S = { fontFamily: "Cormorant Garamond, Georgia, serif" }; // shorthand

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "70vh" }}>
        <Image src={exp.heroImage} alt={exp.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,27,58,0.95) 0%, rgba(30,27,58,0.35) 60%, rgba(30,27,58,0.5) 100%)" }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-14 pt-32">
          <h1 style={{ ...S, fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 600, color: "white", lineHeight: 1.1, marginBottom: "10px" }}>{exp.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.15rem", fontStyle: "italic" }}>{exp.tagline}</p>
        </div>
      </section>

      {/* ── Quick Info Strip ── */}
      <div style={{ background: "#1e1b3a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-wrap gap-8">
          {[
            { Icon: Clock,   label: "Duration",   value: exp.duration },
            { Icon: MapPin,  label: "Location",   value: exp.location },
            { Icon: Sunrise, label: "Start Time", value: exp.startTime },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={15} style={{ color: "#c9943a" }} />
              <div>
                <p style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginBottom: "2px" }}>{label}</p>
                <p style={{ color: "white", fontSize: "0.875rem", fontWeight: 500 }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content + sidebar ── */}
      <SectionWrapper variant="parchment">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* ─── Left: content ─── */}
            <div className="lg:col-span-2 space-y-14">

              {/* Overview */}
              <div>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#c9943a", marginBottom: "8px" }}>Overview</p>
                <div style={{ width: 36, height: 2, background: "#c9943a", marginBottom: "20px" }} />
                <h2 style={{ ...S, fontSize: "1.9rem", fontWeight: 600, color: "#1e1b3a", marginBottom: "20px" }}>About this Experience</h2>
                <div className="space-y-4">
                  {exp.fullOverview.split("\n\n").map((p, i) => (
                    <p key={i} style={{ color: "#4a4458", lineHeight: 1.8, fontSize: "0.95rem" }}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 style={{ ...S, fontSize: "1.9rem", fontWeight: 600, color: "#1e1b3a", marginBottom: "20px" }}>Key Highlights</h2>
                <ul className="space-y-3">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={17} style={{ color: "#c9943a", marginTop: "2px", flexShrink: 0 }} />
                      <span style={{ color: "#4a4458", fontSize: "0.9rem", lineHeight: 1.7 }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What makes it different */}
              <div style={{ background: "#1e1b3a", padding: "36px 40px" }}>
                <h2 style={{ ...S, fontSize: "1.9rem", fontWeight: 600, color: "white", marginBottom: "20px" }}>What Makes This Different</h2>
                <ul className="space-y-3">
                  {exp.differencePoints.map((d, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span style={{ color: "#c9943a", fontSize: "1.1rem", lineHeight: 1, marginTop: "3px" }}>→</span>
                      <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", lineHeight: 1.7 }}>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal for */}
              <div>
                <h2 style={{ ...S, fontSize: "1.9rem", fontWeight: 600, color: "#1e1b3a", marginBottom: "16px" }}>Ideal For</h2>
                <div className="flex flex-wrap gap-3">
                  {exp.idealFor.map((item) => (
                    <span key={item} style={{ background: "#f5ece0", border: "1px solid #e5d9c8", color: "#1e1b3a", fontSize: "0.825rem", fontWeight: 500, padding: "7px 14px" }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Journey Flow */}
              <div>
                <h2 style={{ ...S, fontSize: "1.9rem", fontWeight: 600, color: "#1e1b3a", marginBottom: "28px" }}>How the Experience Unfolds</h2>
                <div className="relative pl-2">
                  <div className="absolute left-[19px] top-0 bottom-0" style={{ width: "1px", background: "#e5d9c8" }} />
                  <div className="space-y-8">
                    {exp.journeyFlow.map((step, i) => (
                      <div key={i} className="flex gap-5">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full z-10 shrink-0 text-xs font-bold" style={{ background: "#c9943a", color: "#1e1b3a" }}>
                          {i + 1}
                        </div>
                        <div className="pt-1">
                          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9943a", fontWeight: 600, marginBottom: "3px" }}>{step.time}</p>
                          <h4 style={{ ...S, fontSize: "1.05rem", fontWeight: 600, color: "#1e1b3a", marginBottom: "4px" }}>{step.label}</h4>
                          <p style={{ color: "#4a4458", fontSize: "0.875rem", lineHeight: 1.65 }}>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inclusions / Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 style={{ ...S, fontSize: "1.3rem", fontWeight: 600, color: "#1e1b3a", marginBottom: "14px" }}>What's Included</h3>
                  <ul className="space-y-2.5">
                    {exp.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} style={{ color: "#22c55e", marginTop: "2px", flexShrink: 0 }} />
                        <span style={{ color: "#4a4458", fontSize: "0.875rem" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 style={{ ...S, fontSize: "1.3rem", fontWeight: 600, color: "#1e1b3a", marginBottom: "14px" }}>Not Included</h3>
                  <ul className="space-y-2.5">
                    {exp.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <XCircle size={15} style={{ color: "#f87171", marginTop: "2px", flexShrink: 0 }} />
                        <span style={{ color: "#4a4458", fontSize: "0.875rem" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2 style={{ ...S, fontSize: "1.9rem", fontWeight: 600, color: "#1e1b3a", marginBottom: "18px" }}>Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {exp.gallery.map((img, i) => (
                    <div key={i} className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                      <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="25vw" />
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 style={{ ...S, fontSize: "1.9rem", fontWeight: 600, color: "#1e1b3a", marginBottom: "24px" }}>Frequently Asked Questions</h2>
                <FAQAccordion items={exp.faqs} />
              </div>
            </div>

            {/* ─── Right: sticky booking card ─── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div style={{ background: "#1e1b3a", padding: "32px" }}>
                  <h3 style={{ ...S, fontSize: "1.6rem", fontWeight: 600, color: "white", marginBottom: "4px" }}>Book This Experience</h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "24px" }}>We respond within 24 hours</p>
                  <div className="space-y-3 mb-6">
                    {[
                      ["Duration", exp.duration],
                      ["Start Time", exp.startTime],
                      ["Group Size", "Max 6 guests"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                        <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem" }}>{k}</span>
                        <span style={{ color: "white", fontSize: "0.85rem", fontWeight: 500 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/contact?experience=${encodeURIComponent(exp.title)}`}
                    className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold mb-3 transition-all duration-200"
                    style={{ background: "#c9943a", color: "#1e1b3a", letterSpacing: "0.04em" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#e2b86a"}
                    onMouseLeave={e => e.currentTarget.style.background = "#c9943a"}
                  >
                    Send Booking Inquiry <ArrowRight size={14} />
                  </Link>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all duration-200"
                    style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#25D366"; e.currentTarget.style.color = "#25D366"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                  >
                    <MessageCircle size={15} /> WhatsApp Enquiry
                  </a>
                </div>
                <div style={{ padding: "16px", background: "#f5ece0", border: "1px solid #e5d9c8", fontSize: "0.78rem", color: "#4a4458", lineHeight: 1.65 }}>
                  <strong style={{ color: "#1e1b3a" }}>Cancellation:</strong> Flexible options available. See our{" "}
                  <Link href="/terms" style={{ color: "#c9943a", textDecoration: "underline" }}>Terms & Conditions</Link>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Related experiences */}
      {related.length > 0 && (
        <SectionWrapper variant="cream">
          <h2 style={{ ...S, fontSize: "2.2rem", fontWeight: 600, color: "#1e1b3a", textAlign: "center", marginBottom: "40px" }}>
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-4xl mx-auto">
            {related.map((e) => <ExperienceCard key={e.slug} experience={e} />)}
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
