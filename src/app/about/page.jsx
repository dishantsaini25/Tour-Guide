import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About",
  description: "Meet your local Jaipur storyteller and the philosophy behind Jaipur Walks.",
};

const S = { fontFamily: "Cormorant Garamond, Georgia, serif" };

const philosophy = [
  { num: "01", title: "Beyond Monuments", desc: "Forts and palaces are beautiful — but a city is its people, its routines, and its rituals. We look beyond the postcard." },
  { num: "02", title: "Living Culture", desc: "Heritage isn't something preserved in museums. It's practiced every morning at dawn markets, at bangle workshops, and in temple courtyards." },
  { num: "03", title: "Slow Travel", desc: "We move at a pace that allows you to notice things — a texture, a smell, a conversation. Unhurried, observant, present." },
  { num: "04", title: "Storytelling-Led", desc: "Context transforms a monument into a story. Every stop comes with the kind of backstory that makes a place unforgettable." },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-phil-card:hover { border-color: rgba(201,148,58,0.3) !important; background: rgba(201,148,58,0.04) !important; }
        .about-link-btn:hover { background: #e2b86a !important; }
        .about-outline-btn:hover { background: #c9943a !important; color: #1e1b3a !important; }
      `}</style>

      {/* ── Hero ── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "60vh", backgroundImage: "url('https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=85')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(30,27,58,0.78)" }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-14 pt-36">
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#c9943a", marginBottom: "12px" }}>The Story</p>
          <h1 style={{ ...S, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 600, color: "white", lineHeight: 1.1 }}>
            A Jaipur Native.{" "}
            <span style={{ color: "#c9943a", fontStyle: "italic" }}>A Lifetime of Stories.</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-14" style={{ background: "linear-gradient(to top, #fdf6ed, transparent)" }} />
      </section>

      {/* ── Host story ── */}
      <section style={{ background: "#fdf6ed", padding: "80px 0" }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <Image src="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80" alt="Jaipur at dusk" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="absolute -bottom-5 -right-5 hidden lg:block" style={{ width: 110, height: 110, border: "2px solid rgba(201,148,58,0.3)" }} />
            </div>
            <div>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#c9943a", marginBottom: "8px" }}>Your Host</p>
              <div style={{ width: 36, height: 2, background: "#c9943a", marginBottom: "20px" }} />
              <h2 style={{ ...S, fontSize: "clamp(1.9rem, 3vw, 2.8rem)", fontWeight: 600, color: "#1e1b3a", lineHeight: 1.15, marginBottom: "24px" }}>
                Born in the Pink City.
                <br /><span style={{ color: "#c9943a", fontStyle: "italic" }}>Curious about everything in it.</span>
              </h2>
              <div className="space-y-4" style={{ color: "#4a4458", lineHeight: 1.8, fontSize: "0.95rem" }}>
                <p>I grew up in Jaipur — in the lanes of the old city, surrounded by the sounds of evening aartis, the smells of the flower market at dawn, and the unhurried rhythms of a city that has been alive for three centuries.</p>
                <p>For years, I watched travellers pass through Jaipur on a checklist — Amber Fort, Hawa Mahal, City Palace, done. And I thought: they're missing the whole city. The real Jaipur isn't the one in the guidebook.</p>
                <p>So I created these experiences — for the kind of traveller who wants to understand a place, not just document it. Small groups. Slow pace. Real stories.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section style={{ background: "#1e1b3a", padding: "80px 0" }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#c9943a", marginBottom: "8px" }}>The Philosophy</p>
            <div style={{ width: 36, height: 2, background: "#c9943a", margin: "0 auto 16px" }} />
            <h2 style={{ ...S, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "white" }}>How I Think About Travel</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {philosophy.map((p) => (
              <div key={p.num} className="about-phil-card p-7" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", transition: "border-color 0.3s, background 0.3s" }}>
                <div style={{ ...S, fontSize: "2.5rem", fontWeight: 700, color: "rgba(201,148,58,0.2)", lineHeight: 1, marginBottom: "14px" }}>{p.num}</div>
                <h3 style={{ ...S, fontSize: "1.25rem", fontWeight: 600, color: "white", marginBottom: "10px" }}>{p.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.52)", fontSize: "0.875rem", lineHeight: 1.75 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hosting values ── */}
      <section style={{ background: "#f5ece0", padding: "80px 0" }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#c9943a", marginBottom: "8px" }}>How I Host</p>
              <div style={{ width: 36, height: 2, background: "#c9943a", marginBottom: "20px" }} />
              <h2 style={{ ...S, fontSize: "clamp(1.9rem, 3vw, 2.8rem)", fontWeight: 600, color: "#1e1b3a", lineHeight: 1.15, marginBottom: "24px" }}>
                Hospitality. Pace.<br />Safety. Personalisation.
              </h2>
              <div className="space-y-4" style={{ color: "#4a4458", fontSize: "0.9rem", lineHeight: 1.8 }}>
                {[
                  ["Hospitality", "You're not a tourist in my group. You're a guest in my city."],
                  ["Pace", "We never rush. If something interests you, we stop. There's no rigid itinerary, only a thoughtful flow."],
                  ["Safety", "Routes are well-considered, group sizes are small, and I carry a first-aid kit on every walk."],
                  ["Personalisation", "Tell me what you love — history, food, photography — and I'll emphasise those threads throughout."],
                ].map(([k, v]) => (
                  <p key={k}><strong style={{ color: "#1e1b3a" }}>{k} — </strong>{v}</p>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image src="https://images.unsplash.com/photo-1609501676721-abb25c9012d9?w=700&q=80" alt="Morning temple experience Jaipur" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#fdf6ed", padding: "80px 0" }}>
        <div className="max-w-xl mx-auto px-5 text-center">
          <h2 style={{ ...S, fontSize: "2.5rem", fontWeight: 600, color: "#1e1b3a", marginBottom: "14px" }}>Ready to Experience Jaipur?</h2>
          <p style={{ color: "#4a4458", marginBottom: "28px", lineHeight: 1.75 }}>
            Browse the experiences, pick what resonates, and get in touch. I respond personally within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/experiences" className="about-link-btn inline-flex items-center justify-center px-8 py-4 text-sm font-semibold" style={{ background: "#c9943a", color: "#1e1b3a", letterSpacing: "0.04em", transition: "background 0.2s" }}>
              See All Experiences
            </Link>
            <Link href="/contact" className="about-outline-btn inline-flex items-center justify-center px-8 py-4 text-sm font-semibold" style={{ border: "1.5px solid #c9943a", color: "#c9943a", letterSpacing: "0.04em", transition: "background 0.2s, color 0.2s" }}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
