"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileSlider from "@/components/MobileSlider";
import { journalArticles } from "@/data/experiences";
import { ArrowRight, Clock, BookOpen, X, ChevronLeft, ChevronRight } from "lucide-react";

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";
const OR = "#FF8C00", GO = "#F5A623";
const CH = "#1A1209", MU = "#6B5B2E";

/* ── Category colour map ── */
const CAT_COLOR = {
  "From the Curator": "#FF8C00",
  "Heritage":         "#C45E00",
  "History":          "#E07800",
  "Culture":          "#F5A623",
  "Living Heritage":  "#FF8C00",
};

/* ── Render body text — supports **bold** markdown ── */
function BodyText({ text }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {text.split("\n\n").map((para, i) => {
        // Bold headings: **text**
        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} style={{ fontFamily: IN, color: MU, lineHeight: 1.9, fontSize: "0.95rem", fontWeight: 300 }}>
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**")
                ? <strong key={j} style={{ fontWeight: 700, color: CH }}>{part.slice(2, -2)}</strong>
                : part
            )}
          </p>
        );
      })}
    </div>
  );
}

/* ── Article Modal ── */
function ArticleModal({ article, onClose }) {
  const overlayRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const catColor = CAT_COLOR[article.category] || OR;

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(15,8,0,0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "jModalFadeIn 0.28s ease",
      }}
    >
      <div style={{
        background: "#FFFFFF",
        borderRadius: "24px",
        width: "100%",
        maxWidth: "720px",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 32px 80px rgba(0,0,0,0.38), 0 4px 16px rgba(0,0,0,0.14)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* ── Hero image ── */}
        <div style={{ position: "relative", height: "260px", flexShrink: 0, borderRadius: "24px 24px 0 0", overflow: "hidden" }}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover object-center"
            sizes="720px"
            priority
            onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,8,0,0.82) 0%, rgba(15,8,0,0.22) 55%, transparent 100%)" }} />

          {/* Category pill */}
          <div style={{ position: "absolute", top: "18px", left: "20px" }}>
            <span style={{
              background: `${catColor}ee`, color: "#FFFFFF",
              fontFamily: IN, fontSize: "0.58rem", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "5px 13px", borderRadius: "9999px",
              backdropFilter: "blur(4px)",
            }}>{article.category}</span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close article"
            style={{
              position: "absolute", top: "16px", right: "16px",
              width: "38px", height: "38px", borderRadius: "50%",
              background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.20)",
              color: "#FFFFFF", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
          >
            <X size={17} strokeWidth={2.5} />
          </button>

          {/* Title over image */}
          <div style={{ position: "absolute", bottom: "20px", left: "22px", right: "22px" }}>
            <h2 style={{
              fontFamily: PF, fontWeight: 700,
              fontSize: "clamp(1.3rem,3vw,1.85rem)",
              color: "#FFFFFF", lineHeight: 1.18,
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            }}>{article.title}</h2>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: "28px 28px 36px" }}>
          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: IN, fontSize: "0.68rem", color: "#9C8550" }}>
              <Clock size={12} style={{ color: OR }} />{article.readTime}
            </span>
            <span style={{ color: "#FFD89B" }}>·</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: IN, fontSize: "0.68rem", color: "#9C8550" }}>
              <BookOpen size={12} style={{ color: OR }} />The Raah Journal
            </span>
          </div>

          {/* Accent rule */}
          <div style={{ width: "36px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px", marginBottom: "22px" }} />

          {/* Body */}
          <BodyText text={article.body} />

          {/* Footer */}
          <div style={{ marginTop: "32px", paddingTop: "22px", borderTop: "1px solid #FFD89B", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "0.9rem", color: MU }}>
              — The Raah Journal, Jaipur
            </p>
            <button
              onClick={onClose}
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "9px 22px", borderRadius: "9999px",
                background: "linear-gradient(135deg,#FF8C00 0%,#E07800 55%,#C45E00 100%)",
                color: "#FFFFFF", fontFamily: IN, fontSize: "0.76rem",
                fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                border: "none", cursor: "pointer",
                boxShadow: "0 3px 12px rgba(255,140,0,0.28)",
              }}
            >
              Close <X size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Secondary card ── */
function JournalCard({ article, onOpen }) {
  const catColor = CAT_COLOR[article.category] || OR;
  return (
    <article
      className="jcard"
      onClick={() => onOpen(article)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(article); }}
      aria-label={`Read: ${article.title}`}
      style={{ cursor: "pointer" }}
    >
      {/* Thumbnail */}
      <div className="jcard-img-wrap">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover object-center jcard-img"
          sizes="(max-width:768px) 100vw, 25vw"
          onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(20,10,0,0.55) 0%,transparent 55%)" }} />
        <div style={{ position: "absolute", top: "12px", left: "12px" }}>
          <span style={{
            background: `${catColor}ee`, color: "#FFFFFF",
            fontFamily: IN, fontSize: "0.56rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "4px 10px", borderRadius: "9999px",
            backdropFilter: "blur(4px)",
          }}>{article.category}</span>
        </div>
      </div>

      {/* Body */}
      <div className="jcard-body">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: IN, fontSize: "0.63rem", color: "#9C8550" }}>
            <Clock size={10} style={{ color: OR }} />{article.readTime}
          </span>
        </div>
        <h3 style={{ fontFamily: PF, fontSize: "1.08rem", fontWeight: 700, color: CH, lineHeight: 1.25, marginBottom: "8px" }}>
          {article.title}
        </h3>
        <div style={{ width: "24px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px", marginBottom: "10px" }} />
        <p style={{ fontFamily: IN, fontSize: "0.83rem", color: MU, lineHeight: 1.75, fontWeight: 300, marginBottom: "16px", flex: 1 }}>
          {article.excerpt}
        </p>
        <div style={{ marginTop: "auto" }}>
          <span className="jcard-readmore">
            Read More <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </article>
  );
}

/* ── Featured cycler ── */
function FeaturedCycler({ articles, onOpen }) {
  const [idx, setIdx]     = useState(0);
  const [fade, setFade]   = useState(true);
  const timerRef          = useRef(null);

  const goTo = useCallback((next) => {
    setFade(false);
    setTimeout(() => {
      setIdx(next);
      setFade(true);
    }, 320);
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      goTo((idx + 1) % articles.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [idx, articles.length, goTo]);

  const prev = () => { clearInterval(timerRef.current); goTo((idx - 1 + articles.length) % articles.length); };
  const next = () => { clearInterval(timerRef.current); goTo((idx + 1) % articles.length); };

  const article   = articles[idx];
  const catColor  = CAT_COLOR[article.category] || OR;

  return (
    <div style={{ marginBottom: "56px" }}>
      {/* Label */}
      <div style={{ marginBottom: "22px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "6px" }}>
            Featured Stories
          </p>
          <div style={{ width: "32px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px" }} />
        </div>
        {/* Dot indicators */}
        <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => { clearInterval(timerRef.current); goTo(i); }}
              aria-label={`Go to story ${i + 1}`}
              style={{
                width: i === idx ? "22px" : "7px",
                height: "7px",
                borderRadius: "9999px",
                background: i === idx ? OR : "rgba(255,140,0,0.25)",
                border: "none",
                cursor: "pointer",
                transition: "width 0.35s ease, background 0.35s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <div
        className="jc-featured-wrap"
        style={{ opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.32s ease, transform 0.32s ease" }}
      >
        <div className="jc-featured-grid" onClick={() => onOpen(article)} style={{ cursor: "pointer" }}>
          {/* Image */}
          <div className="jc-featured-img">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover object-center jc-featured-img-inner"
              sizes="(max-width:768px) 100vw, 50vw"
              priority
              onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,8,0,0.6) 0%,rgba(15,8,0,0.05) 60%,transparent 100%)" }} />
            <div style={{ position: "absolute", top: "16px", left: "16px" }}>
              <span style={{
                background: `${catColor}ee`, color: "#FFFFFF",
                fontFamily: IN, fontSize: "0.6rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "5px 14px", borderRadius: "9999px",
                backdropFilter: "blur(4px)",
              }}>{article.category}</span>
            </div>
          </div>

          {/* Body */}
          <div className="jc-featured-body">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "14px" }}>
              <span style={{
                background: "rgba(255,140,0,0.10)", border: "1px solid rgba(255,140,0,0.22)",
                borderRadius: "9999px", padding: "3px 12px",
                fontFamily: IN, fontSize: "0.6rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", color: OR,
              }}>Story {idx + 1} of {articles.length}</span>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: IN, fontSize: "0.66rem", color: "#9C8550" }}>
                <Clock size={11} style={{ color: OR }} />{article.readTime}
              </span>
              <span style={{ color: "#FFD89B" }}>·</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: IN, fontSize: "0.66rem", color: "#9C8550" }}>
                <BookOpen size={11} style={{ color: OR }} />The Raah Journal
              </span>
            </div>

            <h2 style={{ fontFamily: PF, fontSize: "clamp(1.4rem,2.8vw,2rem)", fontWeight: 700, color: CH, lineHeight: 1.2, marginBottom: "12px" }}>
              {article.title}
            </h2>
            <div style={{ width: "32px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px", marginBottom: "14px" }} />
            <p style={{ fontFamily: IN, fontSize: "0.92rem", color: MU, lineHeight: 1.82, fontWeight: 300, marginBottom: "24px" }}>
              {article.excerpt}
            </p>

            <button
              className="jcta"
              onClick={(e) => { e.stopPropagation(); onOpen(article); }}
            >
              Read Full Story <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "14px" }}>
          <button onClick={prev} aria-label="Previous story" className="jc-arrow">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} aria-label="Next story" className="jc-arrow">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main export ── */
export default function JournalClient() {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <>
      <style>{`
        @keyframes jModalFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* ── Secondary card ── */
        .jcard {
          background: linear-gradient(145deg, #FFFBF0 0%, #FFF7E4 100%);
          border: 1px solid rgba(255,216,155,0.55);
          border-radius: 22px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 14px rgba(255,140,0,0.07), 0 1px 3px rgba(0,0,0,0.04);
          transition: box-shadow 0.38s ease, transform 0.38s ease, border-color 0.38s ease;
          height: 100%;
        }
        .jcard:hover {
          box-shadow: 0 14px 42px rgba(255,140,0,0.16), 0 2px 8px rgba(0,0,0,0.05);
          transform: translateY(-5px);
          border-color: rgba(255,140,0,0.32);
        }
        .jcard-img-wrap {
          position: relative; height: 190px; overflow: hidden; flex-shrink: 0;
        }
        .jcard-img { transition: transform 0.65s ease; }
        .jcard:hover .jcard-img { transform: scale(1.06); }
        .jcard-body {
          padding: 18px 20px 20px;
          display: flex; flex-direction: column; flex: 1;
        }
        .jcard-readmore {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.72rem; font-weight: 700;
          color: #FF8C00; letter-spacing: 0.06em; text-transform: uppercase;
          transition: gap 0.2s ease;
        }
        .jcard:hover .jcard-readmore { gap: 9px; }

        /* ── Featured card ── */
        .jc-featured-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(255,216,155,0.55);
          box-shadow: 0 4px 24px rgba(255,140,0,0.10);
          background: linear-gradient(145deg, #FFFBF0 0%, #FFF7E4 100%);
          transition: box-shadow 0.38s ease, transform 0.38s ease;
        }
        .jc-featured-grid:hover {
          box-shadow: 0 16px 48px rgba(255,140,0,0.18);
          transform: translateY(-3px);
        }
        @media (min-width: 768px) {
          .jc-featured-grid { grid-template-columns: 1fr 1fr; }
          .jc-featured-img { height: 100% !important; min-height: 300px; }
        }
        .jc-featured-img {
          position: relative; height: 240px; overflow: hidden; flex-shrink: 0;
        }
        .jc-featured-body { padding: 30px 28px; display: flex; flex-direction: column; justify-content: center; }
        .jc-featured-img-inner { transition: transform 0.65s ease; }
        .jc-featured-grid:hover .jc-featured-img-inner { transform: scale(1.04); }

        /* ── Arrow buttons ── */
        .jc-arrow {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(255,216,155,0.6);
          color: #FF8C00; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(255,140,0,0.12);
          transition: background 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .jc-arrow:hover {
          background: #FF8C00; color: #FFFFFF;
          box-shadow: 0 4px 16px rgba(255,140,0,0.3);
          transform: scale(1.08);
        }

        /* ── Desktop secondary grid ── */
        .jc-secondary-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 22px;
        }
        @media (min-width: 1024px) { .jc-secondary-grid { grid-template-columns: repeat(4,1fr); } }
        @media (max-width: 767px)  { .jc-secondary-grid { display: none; } }

        /* ── Mobile slider ── */
        .jc-slider-mobile { display: none; }
        @media (max-width: 767px) { .jc-slider-mobile { display: block; } }

        /* ── Subscribe block ── */
        .jc-subscribe {
          background: linear-gradient(135deg,#FFFBF0 0%,#FFF3DC 100%);
          border: 1px solid rgba(255,216,155,0.6);
          border-radius: 22px;
          padding: 48px 32px;
          text-align: center;
          margin-top: 56px;
          box-shadow: 0 2px 14px rgba(255,140,0,0.07);
        }

        /* ── CTA button ── */
        .jcta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 30px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.8rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          text-decoration: none; color: #FFFFFF !important;
          border-radius: 9999px;
          background: linear-gradient(135deg,#FF8C00 0%,#E07800 55%,#C45E00 100%);
          box-shadow: 0 4px 16px rgba(255,140,0,0.30);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          border: none; cursor: pointer;
        }
        .jcta:hover, .jcta:focus-visible {
          color: #FFFFFF !important; transform: translateY(-2px) scale(1.03);
          box-shadow: 0 0 0 4px rgba(255,140,0,0.14), 0 0 24px rgba(255,140,0,0.50), 0 10px 28px rgba(255,140,0,0.30) !important;
        }
        .jcta:active { transform: translateY(0) scale(1); }
        .jcta:focus-visible { outline: 2px solid #FF8C00; outline-offset: 3px; }

        /* ── Modal scrollbar ── */
        [role="dialog"] ::-webkit-scrollbar { width: 4px; }
        [role="dialog"] ::-webkit-scrollbar-thumb { background: #FFD89B; border-radius: 4px; }
      `}</style>

      {/* ── Featured cycler ── */}
      <FeaturedCycler articles={journalArticles} onOpen={setActiveArticle} />

      {/* ── Section label ── */}
      <div style={{ marginBottom: "26px" }}>
        <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "6px" }}>
          All Stories
        </p>
        <div style={{ width: "32px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px" }} />
      </div>

      {/* ── Secondary cards — desktop grid ── */}
      <div className="jc-secondary-grid">
        {journalArticles.map(a => (
          <JournalCard key={a.slug} article={a} onOpen={setActiveArticle} />
        ))}
      </div>

      {/* ── Secondary cards — mobile slider ── */}
      <div className="jc-slider-mobile">
        <MobileSlider autoPlay interval={3800} ariaLabel="Journal article cards">
          {journalArticles.map(a => (
            <JournalCard key={a.slug} article={a} onOpen={setActiveArticle} />
          ))}
        </MobileSlider>
      </div>

      {/* ── Subscribe block ── */}
      <div className="jc-subscribe">
        <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "8px" }}>
          Stay Connected
        </p>
        <div style={{ width: "32px", height: "2px", background: OR, borderRadius: "2px", margin: "0 auto 18px" }} />
        <h2 style={{ fontFamily: PF, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2rem)", color: CH, marginBottom: "10px" }}>
          New stories, when the city gives them.
        </h2>
        <p style={{ fontFamily: IN, color: MU, fontSize: "0.9rem", maxWidth: "400px", margin: "0 auto 28px", lineHeight: 1.78, fontWeight: 300 }}>
          We write when we have something worth sharing — not on a schedule.
        </p>
        <Link href="/contact" className="jcta">
          Get in Touch <ArrowRight size={14} />
        </Link>
      </div>

      {/* ── Article modal ── */}
      {activeArticle && (
        <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />
      )}
    </>
  );
}
