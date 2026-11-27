import Link from "next/link";
import { experiences } from "@/data/experiences";
import { cloudImgW } from "@/lib/cloudinaryImage";

const URL = "https://www.raahexperiences.in/tours-en-espanol";
const TITLE = "Tours en español en Jaipur con guía local";
const DESCRIPTION =
  "Tours en español en Jaipur con un guía oficial: paseos por la ciudad vieja, el Fuerte Amber, comida callejera y excursiones de un día.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
    languages: {
      en: "https://www.raahexperiences.in/experiences",
      es: URL,
      "x-default": "https://www.raahexperiences.in/experiences",
    },
  },
  openGraph: {
    title: `${TITLE} | Raah Experiences`,
    description: DESCRIPTION,
    url: URL,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Raah Experiences`,
    description: DESCRIPTION,
  },
};

// Spanish summaries, written from each tour's own page. Prices come from experiences.js.
const ES = {
  "jaipur-at-dawn": "La ciudad vieja antes de que despierte: el mercado de flores, el mercado de la leche, los rituales de la mañana en los templos y la primera luz sobre el Hawa Mahal.",
  "ridge-and-ramparts": "Amber más allá del fuerte: el pueblo de Amber, el templo Jagat Shiromani, antiguos pozos escalonados y las vistas del Fuerte Amber y del Fuerte Jaigarh.",
  "the-crown-of-jaipur": "El Hawa Mahal, el Jantar Mantar y el Palacio de la Ciudad contados como una sola historia: la del rey que planificó Jaipur.",
  "the-blue-hour": "Jaipur al anochecer en jeep abierto: el atardecer desde el Fuerte Nahargarh, el espectáculo de luz y sonido del Fuerte Amber y el Jal Mahal iluminado.",
  "beyond-the-pink": "La ciudad vieja al atardecer: de 6 a 8 degustaciones de comida callejera, los talleres de pulseras de laca y un chai en una casa de comidas histórica.",
  "farm-and-fire": "Cocina tradicional con una familia local en la granja de Raah, cerca de Amber: ingredientes del huerto, fuego de leña y una cena vegetariana compartida.",
  "living-walled-city": "Jaipur a través de su gente: barrios residenciales, templos, mezquitas y santuarios jainistas, y los mercados históricos de la ciudad amurallada.",
  "the-lost-kingdom": "Senderismo por los valles y senderos de las colinas Aravalli que rodean el antiguo reino de Amber.",
  "artisans-jaipur": "Los barrios de artesanos de Jaipur: talleres donde familias de artesanos trabajan como hace generaciones.",
  "jaipur-full-day-tour": "Lo mejor de Jaipur en un día, con guía oficial y coche privado con aire acondicionado: el Fuerte Amber, el pozo Panna Meena ka Kund, el Jal Mahal, Gaitore, el Jantar Mantar y el Palacio de la Ciudad. Recogida en tu hotel.",
  "jaipur-half-day-tour": "El Fuerte Amber y los monumentos reales de alrededor en medio día, con guía oficial y coche privado con aire acondicionado. Recogida en tu hotel.",
  "pushkar-day-trip-from-jaipur": "Excursión privada de un día: un taller de estampado a mano en el pueblo de Bagru y la ciudad sagrada de Pushkar, con su lago, sus ghats y el templo de Brahma.",
};

const DURATION_ES = {
  "Full day": "Día completo",
  "Half day": "Medio día",
};

function durationEs(d) {
  if (DURATION_ES[d]) return DURATION_ES[d];
  return d.replace("hrs", "h").replace(".", ",");
}

function priceEs(exp) {
  const privateTour = ["jaipur-full-day-tour", "jaipur-half-day-tour"].includes(exp.slug);
  if (exp.priceUnit === "per couple") return `USD ${exp.priceUSD} por pareja`;
  if (privateTour) return `Desde USD ${exp.priceUSD}`;
  return `USD ${exp.priceUSD} por persona`;
}

const FAQS = [
  {
    q: "¿Los tours son en español?",
    a: "Sí. Todas las experiencias de Raah se hacen en español sin coste adicional, con un guía oficial que aprendió español en Salamanca.",
  },
  {
    q: "¿Cuántas personas hay en cada grupo?",
    a: "Los paseos son en grupos pequeños de un máximo de 8 personas. Los tours de día completo, de medio día y la excursión a Pushkar son privados, solo para tu grupo.",
  },
  {
    q: "¿Cómo puedo reservar?",
    a: "Escríbenos por WhatsApp al +91 99299 92539 o desde nuestra página de contacto. Te respondemos en español.",
  },
  {
    q: "¿Cómo se paga?",
    a: "Aceptamos pagos por Wise o UPI. Te enviamos los datos de pago cuando confirmamos tu reserva.",
  },
  {
    q: "¿Puedo cancelar?",
    a: "Sí. Si cancelas al menos 48 horas antes del inicio, te devolvemos el importe completo, y si cancelas al menos 12 horas antes, el 50 %. Las cancelaciones con menos de 12 horas de antelación no tienen reembolso.",
  },
];

export default function ToursEnEspanolPage() {
  const tours = experiences.filter((e) => ES[e.slug]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "es",
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
    name: "Tours en español en Jaipur",
    inLanguage: "es",
    numberOfItems: tours.length,
    itemListElement: tours.map((exp, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.raahexperiences.in/experiences/${exp.slug}`,
      name: exp.title,
    })),
  };

  const section = { paddingLeft: "max(16px, env(safe-area-inset-left, 0px))", paddingRight: "max(16px, env(safe-area-inset-right, 0px))" };
  const wrap = { maxWidth: 1100, margin: "0 auto" };

  return (
    <main lang="es" style={{ background: "var(--bg)", color: "var(--body)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <section style={{ ...section, background: "var(--cream)", paddingTop: 120, paddingBottom: 48 }}>
        <div style={{ ...wrap, maxWidth: 780 }}>
          <p style={{ color: "var(--orange)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 13, margin: 0 }}>
            Raah Experiences · Jaipur
          </p>
          <h1 style={{ color: "var(--charcoal)", fontSize: "clamp(30px, 5vw, 46px)", lineHeight: 1.15, margin: "12px 0 16px", textWrap: "balance" }}>
            Tours en español en Jaipur, con un guía local
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, margin: 0 }}>
            Todas nuestras experiencias en Jaipur se hacen en español sin coste adicional. Tu guía es un guía oficial de Jaipur que aprendió español en Salamanca y que cada año acompaña a viajeros de España, México y toda Latinoamérica.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, marginTop: 16, color: "var(--muted)" }}>
            Paseos en grupos pequeños de un máximo de 8 personas, y tours privados de día completo, de medio día y a Pushkar.{" "}
            <Link href="/experiences" style={{ color: "var(--orange-dark)" }}>English version</Link>
          </p>
        </div>
      </section>

      <section style={{ ...section, paddingTop: 48, paddingBottom: 48 }}>
        <div style={wrap}>
          <h2 style={{ color: "var(--charcoal)", fontSize: 28, margin: "0 0 24px" }}>Nuestras experiencias</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {tours.map((exp) => (
              <article key={exp.slug} style={{ background: "var(--card)", border: "1px solid var(--border-soft)", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", minWidth: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cloudImgW(exp.cardImage || exp.heroImage, 800)}
                  alt={exp.heroAlt || exp.title}
                  loading="lazy"
                  style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", maxWidth: "100%" }}
                />
                <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  <h3 style={{ color: "var(--charcoal)", fontSize: 20, margin: 0 }}>{exp.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--subtle)", margin: 0 }}>
                    {durationEs(exp.duration)} · {priceEs(exp)}
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, flex: 1 }}>{ES[exp.slug]}</p>
                  <Link href={`/experiences/${exp.slug}`} style={{ color: "var(--orange-dark)", fontWeight: 600, fontSize: 15 }}>
                    Ver detalles (en inglés) →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...section, background: "var(--cream)", paddingTop: 48, paddingBottom: 48 }}>
        <div style={{ ...wrap, maxWidth: 780 }}>
          <h2 style={{ color: "var(--charcoal)", fontSize: 28, margin: "0 0 16px" }}>Cómo reservar</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, margin: 0 }}>
            Escríbenos por WhatsApp al <strong>+91 99299 92539</strong> o desde nuestra{" "}
            <Link href="/contact" style={{ color: "var(--orange-dark)" }}>página de contacto</Link>. Te respondemos en español. En temporada alta, de noviembre a febrero, conviene reservar con antelación.
          </p>
        </div>
      </section>

      <section style={{ ...section, paddingTop: 48, paddingBottom: 48 }}>
        <div style={{ ...wrap, maxWidth: 780 }}>
          <h2 style={{ color: "var(--charcoal)", fontSize: 28, margin: "0 0 16px" }}>Preguntas frecuentes</h2>
          <div style={{ display: "grid", gap: 20 }}>
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 style={{ color: "var(--charcoal)", fontSize: 18, margin: "0 0 6px" }}>{f.q}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...section, background: "var(--cream)", paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ ...wrap, maxWidth: 780 }}>
          <h2 style={{ color: "var(--charcoal)", fontSize: 28, margin: "0 0 16px" }}>Prepara tu viaje</h2>
          <ul style={{ fontSize: 17, lineHeight: 1.9, margin: 0, paddingLeft: 20 }}>
            <li><Link href="/journal/viajar-a-la-india" style={{ color: "var(--orange-dark)" }}>Viajar a la India: consejos, ruta y presupuesto</Link></li>
            <li><Link href="/journal/que-ver-en-jaipur" style={{ color: "var(--orange-dark)" }}>Qué ver en Jaipur</Link></li>
            <li><Link href="/journal/triangulo-de-oro-india" style={{ color: "var(--orange-dark)" }}>Triángulo de Oro de la India</Link></li>
            <li><Link href="/journal/fuerte-amber-guia-completa" style={{ color: "var(--orange-dark)" }}>Fuerte Amber: guía completa</Link></li>
            <li><Link href="/journal/palacio-de-los-vientos-jaipur" style={{ color: "var(--orange-dark)" }}>Palacio de los Vientos (Hawa Mahal)</Link></li>
            <li><Link href="/journal/mejor-epoca-para-viajar-a-la-india" style={{ color: "var(--orange-dark)" }}>La mejor época para viajar a la India</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
