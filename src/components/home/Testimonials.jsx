"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import MobileSlider from "@/components/MobileSlider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Star, StarHalf } from "lucide-react";

/* ── 15 real guest testimonials ─────────────────────────────── */
const testimonials = [
  {
    name: "Edith Maria Hoyos",
    from: "El Salvador",
    initials: "EH",
    rating: 5.0,
    text: "¡¡Muy buenos días!! Mil gracias Shobhit por tu ayuda y compañía. Para nosotros fuiste el mejor guía!!! Nos ayudaste con todo y resolviste muy bien todas nuestras inquietudes!!! Hemos explorado y conocido Jaipur de la manera excepcional. Los servicios eran impecables y seguro te vamos a recomendar a nuestros amigos a conocer Jaipur de una manera creativa. ¡¡Muy buen español!!",
  },
  {
    name: "James & Bernadette",
    from: "Ireland",
    initials: "JB",
    rating: 4.7,
    text: "Had a really great day on this tour with our very knowledgeable local expert Shobhit. We covered a lot of interesting and varied sights, scenes and experiences which made this Jaipur experience very memorable and remarkable. Thanks a lot to our Guide Shobhit. I would highly recommend them to explore the best version of Jaipur!!!",
  },
  {
    name: "Ignacio Rojas Marcos",
    from: "México",
    initials: "IR",
    rating: 5,
    text: "Hemos pasado muy buen tiempo en Jaipur, atendidos excelentemente por Shobhit. La experiencia de Jaipur a través de sus servicios es extraordinaria. Gracias por todo. Muy ilusionado con todo lo que nos ha mostrado.",
  },
  {
    name: "Rocío Albert",
    from: "Spain",
    initials: "RA",
    rating: 4.8,
    text: "Excelentes días en Jaipur atendidos maravillosamente por Shobhit. Un gran guía.",
  },
  {
    name: "Viktorija Satkauskienė",
    from: "Lithuania",
    initials: "VS",
    rating: 5.0,
    text: "I wholeheartedly recommend this Guide's services. He was the most professional, knowledgeable and engaging storyteller we have ever met. My mother & I travelled for three weeks and had various experiences with different guides. By the time we arrived in Jaipur, we didn't expect much more than a basic history of the main attractions. However, meeting this guide turned our day into the best one of all. No one had ever shared the city's history with such passion & enthusiasm the way he did. His English is excellent, and his communication with clients is outstanding. I sincerely recommend him, as you will have the best experience possible.",
  },
  {
    name: "Mónica Miyasato",
    from: "Perú",
    initials: "MM",
    rating: 4.5,
    text: "Ha sido un inmenso placer conocer Jaipur con la mejor compañía de un excelente ciudadano y guía, Shobhit. Aprendimos mucho, y llevamos muchos momentos inolvidables de Jaipur contigo.",
  },
  {
    name: "Maria Campos",
    from: "México",
    initials: "MC",
    rating: 5.0,
    text: "I want to highlight Shobhit who was the best guide, polite, well dressed, friendly and spoke very good Spanish. The experiences that he offers in Jaipur are the best way to experience the city and have immersive experiences.",
  },
  {
    name: "Marcela Padilla",
    from: "México",
    initials: "MP",
    rating: 5.0,
    text: "Nuestra experiencia con Shobhit ha sido maravillosa. Nos ha demostrado un gran conocimiento de cada lugar visitado. Siempre muy amable y pendiente en todo momento de nosotros. Sin duda, un gran profesional. Recomendable sus servicios 100%. Gracias.",
  },
  {
    name: "Leva Kuode",
    from: "Lithuania",
    initials: "LK",
    rating: 3.8,
    text: "Thanks a lot to you for showing me your beautiful city. I truly enjoyed it and really appreciate your knowledge and ability to explain in great detail. Highly recommended your professional and bespoke services.",
  },
  {
    name: "Julian Peter Berton",
    from: "London, UK",
    initials: "JP",
    rating: 4,
    text: "Thank you so much for the last two days when you showed me the wonderful awe inspiring city of Jaipur and some of its treasures through your curated experiences. I had a wonderful time and hope we meet again some time. Best Wishes.",
  },
  {
    name: "John Collins",
    from: "United Kingdom",
    initials: "JC",
    rating: 5.0,
    text: "Thank you for being our Guide this week. Your advice about priorities was excellent. There is so much to see and little time to see it. You demonstrated a wide breadth of knowledge which you easily shared with us. Your explanation of Jantar Mantar, City Palace & Amber Fort was first class. Well done! I can't wait to recommend you highly enough. All the best. See you next time in Jaipur.",
  },
  {
    name: "Robyn Lester",
    from: "Australia",
    initials: "RL",
    rating: 5.0,
    text: "Thank you Shobhit for the excellent Tour. You were a fantastic guide & I so appreciate your amazing pictures and efforts to help me resolve matters. A Diplomat!! See you again in the future. Wishing you all the best ahead!!",
  },
  {
    name: "Diyva Mowji",
    from: "USA",
    initials: "DM",
    rating: 5.0,
    text: "We had a wonderful tour in Jaipur with Shobhit. He was super knowledgeable about each place we visited and gave us amazing history and background on the various sites. He also took us to some lesser known but equally as beautiful places in Jaipur. I highly recommend booking a tour with him if you're visiting Jaipur.",
  },
  {
    name: "Fernando & Leticia",
    from: "Brazil",
    initials: "FL",
    rating: 5.0,
    text: "Amazing Tour! His level of knowledge of the History of the city was outstanding. Also, he provided high level tips for food, drinks, and other locations. I recommend hiring him for an exceptional experience in Jaipur.",
  },
  {
    name: "John & Carol",
    from: "Australia",
    initials: "JC",
    rating: 4.6,
    text: "A truly exceptional experience in Jaipur. Shobhit's warmth, depth of knowledge, and genuine passion for his city made every moment memorable. We came as tourists and left feeling like we truly understood Jaipur. Couldn't recommend more highly.",
  },
];

/* ── Star renderer — full, half, empty stars + numerical score ── */
function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const nearFull = rating % 1 >= 0.75;
  const fullCount = nearFull ? full + 1 : full;
  const showHalf = half;
  const empty = 5 - fullCount - (showHalf ? 1 : 0);

  const display = rating.toFixed(1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        marginBottom: "18px",
      }}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
        {[...Array(fullCount)].map((_, i) => (
          <Star
            key={`f${i}`}
            size={14}
            style={{ color: "#F5A623", fill: "#F5A623" }}
          />
        ))}

        {showHalf && (
          <StarHalf
            size={14}
            style={{ color: "#F5A623", fill: "#F5A623" }}
          />
        )}

        {[...Array(Math.max(0, empty))].map((_, i) => (
          <Star
            key={`e${i}`}
            size={14}
            style={{ color: "#D6D3D1", fill: "#D6D3D1" }}
          />
        ))}
      </div>

      {/* Rating */}
      <div className="inline-flex items-center bg-amber-50/80 rounded-md px-2.5 py-1">
        <span className="text-sm font-bold text-amber-700">
          {display}
        </span>
      </div>
    </div>
  );
}

/* ── Desktop slider constants ── */
const SHOW = 3;
const MAX_IDX = testimonials.length - SHOW; // 15 - 3 = 12
const DOT_COUNT = MAX_IDX + 1;                 // 13 dots

/* ── Single card ─────────────────────────────────────────────── */
function TestimonialCard({ t }) {
  return (
    <div className="tc-card">
      <StarRating rating={t.rating} />

      {/* Review text — scrollable on desktop if very long */}
      <div className="tc-card-body">
        <p className="tc-card-quote" style={{
          fontFamily: "DM Sans, system-ui, sans-serif",
          color: "#3D2E0E",
          lineHeight: 1.82,
          margin: 0,
        }}>{t.text}</p>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,216,155,0.6)", margin: "18px 0" }} />

      {/* Attribution */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "38px", height: "38px", borderRadius: "50%",
          background: "linear-gradient(135deg, #FFE8B0 0%, #FFD47A 100%)",
          border: "1.5px solid rgba(255,216,155,0.8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "0.7rem", fontWeight: 700, color: "#C45E00" }}>
            {t.initials}
          </span>
        </div>
        <div style={{ minWidth: 0 }}>
          <p className="tc-card-name" style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontWeight: 600, color: "#1A1209", marginBottom: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {t.name}
          </p>
          <p className="tc-card-from" style={{ fontFamily: "DM Sans, system-ui, sans-serif", color: "#9C8550", fontWeight: 300 }}>
            {t.from}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Desktop slider — 3 visible, 1 card per click ── */
function DesktopSlider() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(MAX_IDX, i + 1));
  const goTo = (i) => setIdx(i);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  const translateX = -(idx * (100 / SHOW));

  return (
    <div>
      <div style={{ position: "relative" }}>
        {/* Prev */}
        <button onClick={prev} disabled={idx === 0} aria-label="Previous testimonial"
          className="tc-arrow tc-arrow-left" style={{ opacity: idx === 0 ? 0.35 : 1 }}>
          <ChevronLeft size={20} strokeWidth={2.2} />
        </button>

        {/* Viewport */}
        <div style={{ overflow: "hidden", padding: "0 52px" }}>
          <motion.div
            animate={{ x: `${translateX}%` }}
            transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.9 }}
            style={{ display: "flex", gap: "20px", alignItems: "stretch" }}
          >
            {testimonials.map((t, i) => (
              <div key={i} style={{
                flex: `0 0 calc(${100 / SHOW}% - ${20 * (SHOW - 1) / SHOW}px)`,
                minWidth: 0,
              }}>
                <TestimonialCard t={t} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Next */}
        <button onClick={next} disabled={idx === MAX_IDX} aria-label="Next testimonial"
          className="tc-arrow tc-arrow-right" style={{ opacity: idx === MAX_IDX ? 0.35 : 1 }}>
          <ChevronRight size={20} strokeWidth={2.2} />
        </button>
      </div>

      {/* Dots — 13 for 15 cards */}
      <div role="tablist" aria-label="Testimonial navigation" className="tc-dots">
        {Array.from({ length: DOT_COUNT }).map((_, i) => (
          <button key={i} role="tab" aria-selected={i === idx}
            aria-label={`Position ${i + 1}`}
            onClick={() => goTo(i)}
            className={`tc-dot${i === idx ? " tc-dot-active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────── */
export default function Testimonials() {
  return (
    <>
      <style>{`
        /* ── Card shell — consistent height via flex column ── */
        .tc-card {
          background: linear-gradient(145deg, #FFFBF0 0%, #FFF7E4 100%);
          border: 1px solid rgba(255,216,155,0.55);
          border-radius: 22px;
          padding: 26px 24px 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 14px rgba(255,140,0,0.07), 0 1px 3px rgba(0,0,0,0.04);
          transition: box-shadow 0.38s ease, transform 0.38s ease;
          height: 100%;
          min-height: 320px;
        }
        .tc-card:hover {
          box-shadow: 0 12px 38px rgba(255,140,0,0.14), 0 2px 8px rgba(0,0,0,0.05);
          transform: translateY(-4px);
        }

        /* ── Review body — scrollable if very long, flex-grows to fill card ── */
        .tc-card-body {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,140,0,0.2) transparent;
          max-height: 160px;
          margin-bottom: 0;
        }
        .tc-card-body::-webkit-scrollbar { width: 3px; }
        .tc-card-body::-webkit-scrollbar-thumb { background: rgba(255,140,0,0.25); border-radius: 3px; }

        .tc-card-big-quote { font-size: 3.5rem; }
        .tc-card-quote     { font-size: 0.875rem; }
        .tc-card-name      { font-size: 0.85rem; }
        .tc-card-from      { font-size: 0.68rem; }

        /* ── Desktop: shown; Mobile: hidden ── */
        .tc-desktop { display: block; }
        .tc-mobile  { display: none; }
        @media (max-width: 767px) {
          .tc-desktop { display: none; }
          .tc-mobile  { display: block; }
          .tc-card {
            padding: 22px 18px 20px !important;
            min-height: 300px;
          }
          .tc-card-body { max-height: 180px; }
          .tc-card-big-quote { font-size: 2.8rem !important; }
          .tc-card-quote { font-size: 0.84rem !important; line-height: 1.76 !important; }
          .tc-card-name  { font-size: 0.8rem !important; }
          .tc-card-from  { font-size: 0.64rem !important; }
        }

        /* ── Arrow buttons ── */
        .tc-arrow {
          position: absolute; top: 50%;
          transform: translateY(-50%);
          z-index: 10; width: 40px; height: 40px; border-radius: 50%;
          border: 1.5px solid rgba(255,140,0,0.35);
          background: #FFFFFF; color: #FF8C00;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(255,140,0,0.15);
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .tc-arrow:hover {
          background: #FF8C00; color: #FFFFFF;
          box-shadow: 0 4px 18px rgba(255,140,0,0.35);
          transform: translateY(-50%) scale(1.08);
        }
        .tc-arrow:disabled { cursor: not-allowed; }
        .tc-arrow:focus-visible { outline: 2px solid #FF8C00; outline-offset: 3px; }
        .tc-arrow-left  { left:  4px; }
        .tc-arrow-right { right: 4px; }

        /* ── Pagination dots ── */
        .tc-dots {
          display: flex; justify-content: center; align-items: center;
          gap: 6px; margin-top: 24px; flex-wrap: wrap;
          max-width: 100%; padding: 0 8px;
        }
        .tc-dot {
          width: 6px; height: 6px; border-radius: 9999px;
          background: rgba(255,140,0,0.25);
          border: none; padding: 0; cursor: pointer;
          transition: width 0.3s ease, background 0.3s ease;
          flex-shrink: 0;
        }
        .tc-dot-active { width: 18px; background: #FF8C00; }
        .tc-dot:focus-visible { outline: 2px solid #FF8C00; outline-offset: 2px; }
      `}</style>

      <SectionWrapper variant="soft">
        <SectionHeading
          label="Guest Stories"
          title="What Our Guests Say"
          subtitle="The most meaningful souvenirs are the stories you carry home."
        />

        {/* Desktop: 3-visible track slider with arrows */}
        <div className="tc-desktop">
          <DesktopSlider />
        </div>

        {/* Mobile: single-card auto-slider */}
        <div className="tc-mobile">
          <MobileSlider autoPlay interval={4000} ariaLabel="Guest testimonials">
            {testimonials.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </MobileSlider>
        </div>
      </SectionWrapper>
    </>
  );
}
