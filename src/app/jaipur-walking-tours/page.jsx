import Link from "next/link";
import { experiences } from "@/data/experiences";
import { cloudImgW } from "@/lib/cloudinaryImage";

const URL = "https://www.raahexperiences.in/jaipur-walking-tours";
const TITLE = "Jaipur Walking Tours & Heritage Walks";
const DESCRIPTION =
  "Small-group walking tours and heritage walks in Jaipur's old city with a government-approved guide: sunrise, palaces, food, crafts and local life.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: `${TITLE} | Raah Experiences`,
    description: DESCRIPTION,
    url: URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Raah Experiences`,
    description: DESCRIPTION,
  },
};

// The old city walks, in the order a first-time visitor usually needs them.
// Facts (duration, start time, meeting point, price) come from experiences.js.
const WALKS = [
  {
    slug: "jaipur-at-dawn",
    kind: "Sunrise walk",
    bestFor: "Your first morning, photographers, early risers",
    summary: "The old city before it wakes: the flower market, the milk market, morning rituals at the temples and first light on Hawa Mahal.",
  },
  {
    slug: "living-walled-city",
    kind: "Heritage walk",
    bestFor: "People, neighbourhoods and everyday life",
    summary: "Jaipur through its people: residential lanes, temples, mosques and Jain shrines, old havelis and the historic markets of the walled city.",
  },
  {
    slug: "the-crown-of-jaipur",
    kind: "Palace walk",
    bestFor: "Monuments and history",
    summary: "Hawa Mahal, Jantar Mantar and the City Palace told as one story: the king who planned Jaipur.",
  },
  {
    slug: "beyond-the-pink",
    kind: "Food walk",
    bestFor: "Food lovers and evenings",
    summary: "The old city at dusk: street food tastings, lac bangle workshops and chai at a historic eatery.",
  },
  {
    slug: "artisans-jaipur",
    kind: "Craft walk",
    bestFor: "Crafts, and shopping with a purpose",
    summary: "The craft quarters of Jaipur: block printing, gem cutting and lac bangles, in workshops where families have worked for generations.",
  },
];

const FAQS = [
  {
    q: "How long are the walking tours in Jaipur?",
    a: "Our old city walks last two and a half hours, and the food walk three hours.",
  },
  {
    q: "Where do the walks start?",
    a: "All our old city walks start inside the City Palace complex, at Jaleb Chowk or Chandni Chowk, in the heart of the walled city. We send you the exact meeting point when you book.",
  },
  {
    q: "How many people are in a group?",
    a: "A maximum of 8 guests. Every walk can also be booked as a private tour for your group.",
  },
  {
    q: "Are the walks available in Spanish?",
    a: "Yes. Every walk is led in English or Spanish by a government-approved local guide. See our tours in Spanish.",
  },
  {
    q: "Which walk should I do first?",
    a: "Jaipur at Dawn. The old city is quiet, the light is soft and you see Jaipur before the crowds, which makes the rest of your stay easier to understand.",
  },
  {
    q: "How much walking is involved?",
    a: "The walks are at an easy pace with regular stops. Beyond the Pink, the food walk, is a little longer and rated moderate.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "Yes. Cancel at least 48 hours before the start for a full refund or free rescheduling, or at least 12 hours before for a 50% refund. Cancellations within 12 hours of the start, and no-shows, are not refunded.",
  },
];

function priceLabel(exp) {
  return `From USD ${exp.priceUSD} (₹${exp.priceINR.toLocaleString("en-IN")}) per person`;
}

export default function JaipurWalkingToursPage() {
  const walks = WALKS.map((w) => ({ ...w, exp: experiences.find((e) => e.slug === w.slug) })).filter((w) => w.exp);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${URL}#itemlist`,
    name: "Walking tours in Jaipur",
    numberOfItems: walks.length,
    itemListElement: walks.map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.raahexperiences.in/experiences/${w.slug}`,
      name: w.exp.title,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.raahexperiences.in/" },
      { "@type": "ListItem", position: 2, name: "Experiences", item: "https://www.raahexperiences.in/experiences" },
      { "@type": "ListItem", position: 3, name: "Walking Tours", item: URL },
    ],
  };

  const section = { paddingLeft: "max(16px, env(safe-area-inset-left, 0px))", paddingRight: "max(16px, env(safe-area-inset-right, 0px))" };
  const wrap = { maxWidth: 1100, margin: "0 auto" };
  const link = { color: "var(--orange-dark)" };

  return (
    <main style={{ background: "var(--bg)", color: "var(--body)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section style={{ ...section, background: "var(--cream)", paddingTop: 120, paddingBottom: 48 }}>
        <div style={{ ...wrap, maxWidth: 780 }}>
          <p style={{ color: "var(--orange)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 13, margin: 0 }}>
            Raah Experiences · Jaipur
          </p>
          <h1 style={{ color: "var(--charcoal)", fontSize: "clamp(30px, 5vw, 46px)", lineHeight: 1.15, margin: "12px 0 16px", textWrap: "balance" }}>
            Walking Tours in Jaipur
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, margin: 0 }}>
            Jaipur&apos;s old city is best seen on foot. Our walking tours and heritage walks take you into the lanes, temples, markets and workshops of the walled city, at the hours when they are most alive, with a government-approved local guide who grew up here.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, marginTop: 16, color: "var(--muted)" }}>
            Small groups of up to 8 guests · English or Spanish · 2.5 to 3 hours · Private walks on request
          </p>
        </div>
      </section>

      <section style={{ ...section, paddingTop: 48, paddingBottom: 48 }}>
        <div style={wrap}>
          <h2 style={{ color: "var(--charcoal)", fontSize: 28, margin: "0 0 24px" }}>Our walking tours</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {walks.map(({ slug, kind, summary, exp }) => (
              <article key={slug} style={{ background: "var(--card)", border: "1px solid var(--border-soft)", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", minWidth: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cloudImgW(exp.cardImage || exp.heroImage, 800)}
                  alt={exp.heroAlt || exp.title}
                  loading="lazy"
                  style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", maxWidth: "100%" }}
                />
                <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--orange)", fontWeight: 700, margin: 0 }}>{kind}</p>
                  <h3 style={{ color: "var(--charcoal)", fontSize: 20, margin: 0 }}>{exp.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--subtle)", margin: 0 }}>
                    {exp.duration} · {priceLabel(exp)}
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, flex: 1 }}>{summary}</p>
                  <Link href={`/experiences/${slug}`} style={{ ...link, fontWeight: 600, fontSize: 15 }}>
                    See the walk →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...section, background: "var(--cream)", paddingTop: 48, paddingBottom: 48 }}>
        <div style={{ ...wrap, maxWidth: 900 }}>
          <h2 style={{ color: "var(--charcoal)", fontSize: 28, margin: "0 0 16px" }}>Which walk is right for you?</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, minWidth: 620 }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid var(--border-soft)" }}>
                  <th style={{ padding: "10px 8px" }}>Walk</th>
                  <th style={{ padding: "10px 8px" }}>Best for</th>
                  <th style={{ padding: "10px 8px" }}>Time (Oct–Mar)</th>
                  <th style={{ padding: "10px 8px" }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {walks.map(({ slug, bestFor, exp }) => (
                  <tr key={slug} style={{ borderBottom: "1px solid var(--border-soft)", verticalAlign: "top" }}>
                    <td style={{ padding: "10px 8px", fontWeight: 600 }}>
                      <Link href={`/experiences/${slug}`} style={link}>{exp.title}</Link>
                    </td>
                    <td style={{ padding: "10px 8px" }}>{bestFor}</td>
                    <td style={{ padding: "10px 8px" }}>{exp.startTime.replace(" (Oct–Mar)", "")}</td>
                    <td style={{ padding: "10px 8px" }}>{exp.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ ...section, paddingTop: 48, paddingBottom: 48 }}>
        <div style={{ ...wrap, maxWidth: 780 }}>
          <h2 style={{ color: "var(--charcoal)", fontSize: 28, margin: "0 0 16px" }}>Where the walks start</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, margin: 0 }}>
            All our old city walks start inside the City Palace complex, at Jaleb Chowk or Chandni Chowk, in the centre of the walled city. They are easy to reach from hotels in the old city and on M.I. Road, and we send the exact meeting point when you book.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, marginTop: 16 }}>
            Prefer the hills? <Link href="/experiences/ridge-and-ramparts" style={link}>The Ridge &amp; Ramparts</Link> is a heritage walk and trek from Amber Fort to Jaigarh, and <Link href="/experiences/the-lost-kingdom" style={link}>The Lost Kingdom</Link> is a hike in the Aravalli hills.
          </p>
        </div>
      </section>

      <section style={{ ...section, background: "var(--cream)", paddingTop: 48, paddingBottom: 48 }}>
        <div style={{ ...wrap, maxWidth: 780 }}>
          <h2 style={{ color: "var(--charcoal)", fontSize: 28, margin: "0 0 16px" }}>Frequently asked questions</h2>
          <div style={{ display: "grid", gap: 20 }}>
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 style={{ color: "var(--charcoal)", fontSize: 18, margin: "0 0 6px" }}>{f.q}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0 }}>
                  {f.a.includes("tours in Spanish") ? (
                    <>
                      {f.a.replace(" See our tours in Spanish.", "")}{" "}
                      See our <Link href="/tours-en-espanol" lang="es" style={link}>tours en español</Link>.
                    </>
                  ) : f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...section, paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ ...wrap, maxWidth: 780 }}>
          <h2 style={{ color: "var(--charcoal)", fontSize: 28, margin: "0 0 16px" }}>Book a walk</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, margin: 0 }}>
            Message us on WhatsApp at <strong>+91 99299 92539</strong> or use our{" "}
            <Link href="/contact" style={link}>booking page</Link>. We reply personally within 24 hours. From November to February, booking a few days ahead is a good idea.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, marginTop: 16 }}>
            Looking for more than walks? See <Link href="/experiences" style={link}>all our Jaipur tours and experiences</Link>, or plan your stay with our <Link href="/journal/how-many-days-in-jaipur" style={link}>guide to how many days you need in Jaipur</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
