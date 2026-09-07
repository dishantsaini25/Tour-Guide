"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { journalArticles } from "@/data/experiences";
import { ArrowRight, Clock, BookOpen, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cloudImg } from "@/lib/cloudinaryImage";

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";
const OR = "#FF8C00", GO = "#F5A623";
const CH = "#1A1209", MU = "#6B5B2E";

/* ── Bold-markdown body renderer ── */
function BodyText({ text }) {
  return (
    <div className="jmodal-bodytext" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {text.split("\n\n").map((para, i) => {
        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} style={{ fontFamily: IN, color: MU, lineHeight: 1.9, fontSize: "0.95rem", fontWeight: 300 }}>
            {parts.map((pt, j) =>
              pt.startsWith("**") && pt.endsWith("**")
                ? <strong key={j} style={{ fontWeight: 700, color: CH }}>{pt.slice(2, -2)}</strong>
                : pt
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

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog" aria-modal="true" aria-label={article.title}
      className="jmodal-overlay"
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(8,4,0,0.82)",
        backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "92px 16px 20px",
        animation: "jFadeIn 0.22s ease",
        overflowY: "auto",
      }}
    >
      <div style={{
        background: "#FFFEF9",
        borderRadius: "32px",
        width: "100%", maxWidth: "660px", maxHeight: "82vh",
        display: "flex", flexDirection: "column",
        boxShadow: "0 0 0 1px rgba(255,216,155,0.35), 0 48px 120px rgba(0,0,0,0.50), 0 8px 24px rgba(0,0,0,0.18)",
        overflow: "hidden",
        animation: "jSlideUp 0.30s cubic-bezier(0.34,1.48,0.64,1)",
      }}>
        {/* ── Compact hero image ── */}
        <div className="jmodal-img" style={{ position: "relative", height: "170px", flexShrink: 0, overflow: "hidden" }}>
          <Image src={cloudImg(article.image)} alt={article.title} fill
            className="object-cover object-center" sizes="660px" priority
            onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,4,0,0.92) 0%,rgba(8,4,0,0.30) 50%,rgba(0,0,0,0.18) 100%)" }} />
          {/* Close */}
          <button onClick={onClose} aria-label="Close"
            className="jmodal-close"
            style={{
              position: "absolute", top: "12px", right: "12px",
              width: "34px", height: "34px", borderRadius: "50%",
              background: "rgba(255,255,255,0.92)", border: "none",
              color: CH, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.26)", zIndex: 2,
            }}
          ><X size={15} strokeWidth={2.8} /></button>
          {/* Title */}
          <div style={{ position: "absolute", bottom: "14px", left: "16px", right: "16px" }}>
            <h2 className="jmodal-title" style={{
              fontFamily: PF, fontWeight: 700,
              fontSize: "clamp(1.1rem,2.6vw,1.55rem)",
              color: "#FFFFFF", lineHeight: 1.2,
              textShadow: "0 2px 12px rgba(0,0,0,0.65)",
            }}>{article.title}</h2>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="jmodal-body" style={{ overflowY: "auto", flex: 1, padding: "22px 24px 30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: IN, fontSize: "0.65rem", color: "#9C8550" }}>
              <Clock size={10} style={{ color: OR }} />{article.readTime}
            </span>
            <span style={{ color: "#FFD89B" }}>·</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: IN, fontSize: "0.65rem", color: "#9C8550" }}>
              <BookOpen size={10} style={{ color: OR }} />The Raah Journal
            </span>
          </div>
          <div style={{ width: "30px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px", marginBottom: "18px" }} />
          <BodyText text={article.body} />
          <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid #FFD89B", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
            <p style={{ fontFamily: PF, fontStyle: "italic", fontSize: "0.86rem", color: MU }}>— The Raah Journal, Jaipur</p>
            <button onClick={onClose} style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              padding: "8px 20px", borderRadius: "9999px",
              background: `linear-gradient(135deg,${OR} 0%,#E07800 55%,#C45E00 100%)`,
              color: "#FFFFFF", fontFamily: IN, fontSize: "0.72rem",
              fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
              border: "none", cursor: "pointer",
              boxShadow: "0 3px 10px rgba(255,140,0,0.28)",
            }}>Close <X size={10} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Secondary card ── */
function JournalCard({ article, onOpen }) {
  return (
    <article className="jcard" onClick={() => onOpen(article)} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(article); }}
      aria-label={`Read: ${article.title}`} style={{ cursor: "pointer" }}
    >
      <div className="jcard-img-wrap">
        <Image src={cloudImg(article.image)} alt={article.title} fill
          className="object-cover object-center jcard-img" sizes="(max-width:768px) 88vw, 25vw"
          onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(20,10,0,0.55) 0%,transparent 55%)" }} />
      </div>
      <div className="jcard-body">
        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: IN, fontSize: "0.63rem", color: "#9C8550", marginBottom: "9px" }}>
          <Clock size={10} style={{ color: OR }} />{article.readTime}
        </span>
        <h3 style={{ fontFamily: PF, fontSize: "1.06rem", fontWeight: 700, color: CH, lineHeight: 1.25, marginBottom: "7px" }}>{article.title}</h3>
        <div style={{ width: "22px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px", marginBottom: "9px" }} />
        <p style={{ fontFamily: IN, fontSize: "0.82rem", color: MU, lineHeight: 1.72, fontWeight: 300, marginBottom: "14px", flex: 1 }}>{article.excerpt}</p>
        <div style={{ marginTop: "auto" }}>
          <span className="jcard-readmore">Read More <ArrowRight size={11} /></span>
        </div>
      </div>
    </article>
  );
}

/* ── Scroll-by-1 card slider — desktop: 4 visible with arrows; mobile: 1 card + dots ── */
function CardSlider({ articles, onOpen }) {
  const trackRef      = useRef(null);
  const [canPrev, setCanPrev]     = useState(false);
  const [canNext, setCanNext]     = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const touchX = useRef(null);

  // Width of one card + gap
  const CARD_W = () => {
    if (!trackRef.current) return 0;
    const first = trackRef.current.querySelector(".jcard-slide");
    return first ? first.offsetWidth + 22 : 0;
  };

  const updateState = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setCanPrev(t.scrollLeft > 4);
    setCanNext(t.scrollLeft < t.scrollWidth - t.clientWidth - 4);
    // Compute active dot: nearest card index to current scroll position
    const w = CARD_W();
    if (w > 0) setActiveIdx(Math.round(t.scrollLeft / w));
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    t.addEventListener("scroll", updateState, { passive: true });
    updateState();
    return () => t.removeEventListener("scroll", updateState);
  }, [updateState]);

  const scrollBy1 = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollBy({ left: dir * CARD_W(), behavior: "smooth" });
  };

  const goToIdx = (i) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollTo({ left: i * CARD_W(), behavior: "smooth" });
  };

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) scrollBy1(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        {/* Scrollable track */}
        <div ref={trackRef}
          onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
          className="jcs-track"
          style={{
            display: "flex", gap: "22px",
            overflowX: "auto", scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch", scrollbarWidth: "none",
            paddingBottom: "4px",
          }}
        >
          {articles.map(a => (
            <div key={a.slug} className="jcard-slide"
              style={{ flex: "0 0 calc(25% - 17px)", minWidth: "220px", scrollSnapAlign: "start" }}
            >
              <JournalCard article={a} onOpen={onOpen} />
            </div>
          ))}
        </div>

        {/* Desktop prev/next arrows */}
        {canPrev && (
          <button onClick={() => scrollBy1(-1)} aria-label="Previous card" className="jcs-arrow jcs-arrow-left">
            <ChevronLeft size={16} />
          </button>
        )}
        {canNext && (
          <button onClick={() => scrollBy1(1)} aria-label="Next card" className="jcs-arrow jcs-arrow-right">
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Mobile pagination dots — hidden on desktop */}
      <div className="jcs-dots" role="tablist" aria-label="Story pagination">
        {articles.map((a, i) => (
          <button
            key={a.slug}
            role="tab"
            aria-selected={i === activeIdx}
            aria-label={`Go to story ${i + 1}`}
            onClick={() => goToIdx(i)}
            style={{
              width:  i === activeIdx ? "20px" : "7px",
              height: "7px",
              borderRadius: "9999px",
              background: i === activeIdx ? OR : "rgba(255,140,0,0.28)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "width 0.32s ease, background 0.32s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Featured cycler — auto-slides, swipe on mobile, NO dots/arrows ── */
function FeaturedCycler({ articles, onOpen }) {
  const [idx, setIdx]   = useState(() => Math.floor(Math.random() * articles.length));
  const [fade, setFade] = useState(true);
  const timerRef        = useRef(null);
  const touchX          = useRef(null);

  const goTo = useCallback((next) => {
    setFade(false);
    setTimeout(() => { setIdx(next); setFade(true); }, 300);
  }, []);

  // Auto-advance every 6s
  useEffect(() => {
    timerRef.current = setInterval(() => goTo((idx + 1) % articles.length), 6000);
    return () => clearInterval(timerRef.current);
  }, [idx, articles.length, goTo]);

  const swipeStart = (e) => { touchX.current = e.touches[0].clientX; };
  const swipeEnd   = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 44) {
      clearInterval(timerRef.current);
      goTo(dx < 0
        ? (idx + 1) % articles.length
        : (idx - 1 + articles.length) % articles.length);
    }
    touchX.current = null;
  };

  const article  = articles[idx];

  return (
    <div style={{ marginBottom: "52px" }}>
      {/* Section label — no dots, no arrows */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "6px" }}>
          Featured Stories
        </p>
        <div style={{ width: "32px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px" }} />
      </div>

      {/* Card — fade transition, swipe on mobile */}
      <div
        onTouchStart={swipeStart} onTouchEnd={swipeEnd}
        style={{ opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.3s ease, transform 0.3s ease" }}
      >
        <div className="jc-featured-grid" onClick={() => onOpen(article)} style={{ cursor: "pointer" }}>
          {/* Image pane */}
          <div className="jc-featured-img">
            <Image src={cloudImg(article.image)} alt={article.title} fill
              className="object-cover object-center jc-featured-img-inner"
              sizes="(max-width:767px) 100vw, 50vw" priority
              onError={(e) => { e.currentTarget.src = "/images/placeholder.jpg"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,8,0,0.65) 0%,rgba(15,8,0,0.05) 60%,transparent 100%)" }} />
          </div>

          {/* Text pane */}
          <div className="jc-featured-body">
            <div style={{ marginBottom: "12px" }}>
              <span style={{
                background: "rgba(255,140,0,0.10)", border: "1px solid rgba(255,140,0,0.22)",
                borderRadius: "9999px", padding: "3px 12px",
                fontFamily: IN, fontSize: "0.58rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", color: OR,
              }}>Story {idx + 1} of {articles.length}</span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: IN, fontSize: "0.64rem", color: "#9C8550" }}>
                <Clock size={10} style={{ color: OR }} />{article.readTime}
              </span>
              <span style={{ color: "#FFD89B" }}>·</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: IN, fontSize: "0.64rem", color: "#9C8550" }}>
                <BookOpen size={10} style={{ color: OR }} />The Raah Journal
              </span>
            </div>
            <h2 style={{ fontFamily: PF, fontSize: "clamp(1.3rem,2.6vw,1.9rem)", fontWeight: 700, color: CH, lineHeight: 1.2, marginBottom: "10px" }}>
              {article.title}
            </h2>
            <div style={{ width: "28px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px", marginBottom: "12px" }} />
            <p style={{ fontFamily: IN, fontSize: "0.9rem", color: MU, lineHeight: 1.8, fontWeight: 300, marginBottom: "20px" }}>
              {article.excerpt}
            </p>
            <button className="jcta" onClick={(e) => { e.stopPropagation(); onOpen(article); }}>
              Read Full Story <ArrowRight size={13} />
            </button>
          </div>
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
        /* ── Animations ── */
        @keyframes jFadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes jSlideUp   { from{opacity:0;transform:translateY(22px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

        /* ── Modal close button hover ── */
        .jmodal-close:hover { background:#FF8C00 !important; color:#FFFFFF !important; transform:scale(1.08); }
        .jmodal-close { transition: background 0.18s, color 0.18s, transform 0.18s; }

        /* ── Secondary card ── */
        .jcard {
          background: linear-gradient(145deg,#FFFBF0 0%,#FFF7E4 100%);
          border: 1px solid rgba(255,216,155,0.55);
          border-radius: 20px; overflow: hidden;
          display: flex; flex-direction: column;
          box-shadow: 0 2px 12px rgba(255,140,0,0.07);
          transition: box-shadow 0.36s ease, transform 0.36s ease, border-color 0.36s ease;
          height: 100%;
        }
        .jcard:hover {
          box-shadow: 0 14px 40px rgba(255,140,0,0.16), 0 2px 8px rgba(0,0,0,0.05);
          transform: translateY(-5px); border-color: rgba(255,140,0,0.30);
        }
        .jcard-img-wrap { position:relative; height:180px; overflow:hidden; flex-shrink:0; }
        .jcard-img      { transition: transform 0.6s ease; }
        .jcard:hover .jcard-img { transform: scale(1.06); }
        .jcard-body     { padding:16px 18px 18px; display:flex; flex-direction:column; flex:1; }
        .jcard-readmore {
          display:inline-flex; align-items:center; gap:5px;
          font-family:'DM Sans',system-ui,sans-serif; font-size:0.7rem; font-weight:700;
          color:#FF8C00; letter-spacing:0.06em; text-transform:uppercase;
          transition: gap 0.2s ease;
        }
        .jcard:hover .jcard-readmore { gap:8px; }

        /* ── Card slider track — hides scrollbar ── */
        .jcs-track::-webkit-scrollbar { display:none; }
        .jcs-track { -ms-overflow-style:none; scrollbar-width:none; }

        /* ── Mobile card: 1 at a time, narrower ── */
        @media (max-width:767px) {
          .jcard-slide {
            flex: 0 0 82vw !important;
            min-width: 0 !important;
          }
          /* Smaller image + compact body on mobile */
          .jcard-img-wrap { height: 150px !important; }
          .jcard-body     { padding: 13px 14px 14px !important; }
          .jcard h3       { font-size: 0.96rem !important; }
          .jcard p        { font-size: 0.78rem !important; }
          .jcard-readmore { font-size: 0.65rem !important; }
        }

        /* ── Pagination dots — mobile only ── */
        .jcs-dots {
          display: none;
        }
        @media (max-width:767px) {
          .jcs-dots {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 7px;
            margin-top: 16px;
          }
        }

        /* ── Slider overlay arrows — desktop only ── */
        .jcs-arrow {
          position:absolute; top:50%; transform:translateY(-50%);
          width:38px; height:38px; border-radius:50%;
          background:rgba(255,255,255,0.94);
          border:1px solid rgba(255,216,155,0.7);
          color:#FF8C00; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 2px 10px rgba(255,140,0,0.14);
          transition:background 0.22s, box-shadow 0.22s, transform 0.22s;
          z-index:10;
        }
        .jcs-arrow:hover { background:#FF8C00; color:#FFFFFF; box-shadow:0 4px 16px rgba(255,140,0,0.3); transform:translateY(-50%) scale(1.08); }
        .jcs-arrow-left  { left:-14px; }
        .jcs-arrow-right { right:-14px; }
        @media (max-width:767px) { .jcs-arrow { display:none; } }

        /* ── Modal — mobile overrides ── */
        @media (max-width:767px) {
          /* More top clearance so modal doesn't hide under navbar */
          .jmodal-overlay  { padding: 80px 12px 16px !important; }
          /* Tighter internal padding */
          .jmodal-body     { padding: 16px 16px 24px !important; }
          /* Smaller body text */
          .jmodal-bodytext p { font-size: 0.84rem !important; line-height: 1.78 !important; }
          /* Smaller heading over image */
          .jmodal-title    { font-size: 1.05rem !important; }
          /* Compact image */
          .jmodal-img      { height: 148px !important; }
        }

        /* ── Featured card ── */
        .jc-featured-grid {
          display:grid; grid-template-columns:1fr; gap:0;
          border-radius:22px; overflow:hidden;
          border:1px solid rgba(255,216,155,0.55);
          box-shadow:0 4px 22px rgba(255,140,0,0.10);
          background:linear-gradient(145deg,#FFFBF0 0%,#FFF7E4 100%);
          transition:box-shadow 0.36s ease, transform 0.36s ease;
        }
        .jc-featured-grid:hover { box-shadow:0 16px 48px rgba(255,140,0,0.18); transform:translateY(-3px); }
        @media (min-width:768px) {
          .jc-featured-grid { grid-template-columns:1fr 1fr; }
          .jc-featured-img  { height:100% !important; min-height:280px; }
        }
        /* Mobile compact height */
        .jc-featured-img {
          position:relative; height:200px; overflow:hidden; flex-shrink:0;
        }
        @media (max-width:767px) { .jc-featured-img { height:185px !important; } }
        .jc-featured-body { padding:24px 22px; display:flex; flex-direction:column; justify-content:center; }
        @media (min-width:768px) { .jc-featured-body { padding:30px 28px; } }
        .jc-featured-img-inner { transition:transform 0.65s ease; }
        .jc-featured-grid:hover .jc-featured-img-inner { transform:scale(1.04); }

        /* ── Subscribe block with hover glow ── */
        .jc-subscribe {
          background: linear-gradient(135deg,#FFFBF0 0%,#FFF3DC 100%);
          border:1px solid rgba(255,216,155,0.60);
          border-radius:24px;
          padding:52px 32px;
          text-align:center;
          margin-top:52px;
          box-shadow:0 2px 14px rgba(255,140,0,0.07);
          transition: box-shadow 0.40s ease, border-color 0.40s ease, background 0.40s ease, transform 0.36s ease;
        }
        .jc-subscribe:hover {
          background: linear-gradient(135deg,#FFF7E4 0%,#FFEDC0 100%);
          border-color:rgba(255,140,0,0.28);
          box-shadow:0 0 0 4px rgba(255,140,0,0.06), 0 16px 48px rgba(255,140,0,0.13);
          transform:translateY(-3px);
        }

        /* ── CTA button ── */
        .jcta {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 30px;
          font-family:'DM Sans',system-ui,sans-serif;
          font-size:0.8rem; font-weight:700;
          letter-spacing:0.08em; text-transform:uppercase;
          text-decoration:none; color:#FFFFFF !important;
          border-radius:9999px;
          background:linear-gradient(135deg,#FF8C00 0%,#E07800 55%,#C45E00 100%);
          box-shadow:0 4px 16px rgba(255,140,0,0.30);
          transition:box-shadow 0.3s ease, transform 0.3s ease;
          border:none; cursor:pointer;
        }
        .jcta:hover,.jcta:focus-visible {
          color:#FFFFFF !important; transform:translateY(-2px) scale(1.03);
          box-shadow:0 0 0 4px rgba(255,140,0,0.14),0 0 24px rgba(255,140,0,0.50),0 10px 28px rgba(255,140,0,0.30) !important;
        }
        .jcta:active { transform:translateY(0) scale(1); }
        .jcta:focus-visible { outline:2px solid #FF8C00; outline-offset:3px; }

        /* ── Modal body scrollbar ── */
        [role="dialog"] div::-webkit-scrollbar { width:3px; }
        [role="dialog"] div::-webkit-scrollbar-thumb { background:#FFD89B; border-radius:3px; }
      `}</style>

      {/* ── Featured auto-cycler (no dots/arrows, swipe on mobile) ── */}
      <FeaturedCycler articles={journalArticles} onOpen={setActiveArticle} />

      {/* ── All Stories label ── */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "6px" }}>
          All Stories
        </p>
        <div style={{ width: "32px", height: "2px", background: `linear-gradient(to right,${OR},${GO})`, borderRadius: "2px" }} />
      </div>

      {/* ── Card slider — desktop: 4 visible, scroll-by-1; mobile: natural swipe ── */}
      <CardSlider articles={journalArticles} onOpen={setActiveArticle} />

      {/* ── Subscribe block ── */}
      <div className="jc-subscribe">
        <p style={{ fontFamily: IN, fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, color: OR, marginBottom: "8px" }}>
          Stay Connected
        </p>
        <div style={{ width: "32px", height: "2px", background: OR, borderRadius: "2px", margin: "0 auto 20px" }} />
        <h2 style={{ fontFamily: PF, fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.1rem)", color: CH, lineHeight: 1.15, marginBottom: "12px" }}>
          New stories, when the<br />city gives them.
        </h2>
        <p style={{ fontFamily: IN, color: MU, fontSize: "0.9rem", maxWidth: "380px", margin: "0 auto 28px", lineHeight: 1.82, fontWeight: 300 }}>
          We write when we have something worth sharing — not on a schedule.
          Jaipur sets the pace.
        </p>
        <Link href="/contact" className="jcta">
          Get in Touch <ArrowRight size={14} />
        </Link>
      </div>

      {/* ── Modal ── */}
      {activeArticle && (
        <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />
      )}
    </>
  );
}
