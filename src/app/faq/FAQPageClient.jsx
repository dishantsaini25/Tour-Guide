"use client";
import { useState, useMemo, useId } from "react";
import Link from "next/link";
import { Search, X, ChevronDown, Plus, Minus } from "lucide-react";
import { faqs, faqCategories } from "@/data/faqs";

/* ─────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────── */
const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";
const ALL = "All";

/* ─────────────────────────────────────────────────────────────────
   FAQ ACCORDION ITEM
   Single-open: closing one before opening another feels intentional
   on a premium site. Multiple-open allowed by passing null openId.
───────────────────────────────────────────────────────────────── */
function FAQItem({ item, isOpen, onToggle, index }) {
  return (
    <div
      style={{
        borderBottom: "1px solid #FFD89B",
        ...(index === 0 ? { borderTop: "1px solid #FFD89B" } : {}),
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
        className="faq-item-btn"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          outline: "none",
        }}
      >
        <span
          style={{
            fontFamily: PF,
            fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
            fontWeight: 600,
            color: isOpen ? "#FF8C00" : "#1A1209",
            lineHeight: 1.4,
            transition: "color 0.22s ease",
          }}
        >
          {item.question}
        </span>
        <span
          className="faq-icon"
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "1.5px solid #FF8C00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isOpen ? "#FFFFFF" : "#FF8C00",
            background: isOpen ? "#FF8C00" : "transparent",
            transition: "background 0.25s ease, color 0.25s ease",
          }}
        >
          {isOpen ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>

      {/* Answer — CSS max-height transition for smooth open/close */}
      <div
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        style={{
          overflow: "hidden",
          maxHeight: isOpen ? "600px" : 0,
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.4s ease, opacity 0.3s ease",
        }}
      >
        <p
          style={{
            fontFamily: IN,
            fontSize: "0.92rem",
            color: "#6B5B2E",
            lineHeight: 1.85,
            fontWeight: 300,
            paddingBottom: "22px",
            paddingRight: "50px",
          }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CATEGORY CHIP
───────────────────────────────────────────────────────────────── */
function CategoryChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={active ? "faq-chip faq-chip-active" : "faq-chip"}
      aria-pressed={active}
      style={{
        fontFamily: IN,
        fontSize: "0.76rem",
        fontWeight: 700,
        letterSpacing: "0.04em",
        padding: "7px 18px",
        borderRadius: "9999px",
        border: active ? "1.5px solid #FF8C00" : "1.5px solid #FFD89B",
        background: active ? "#FF8C00" : "transparent",
        color: active ? "#FFFFFF" : "#6B5B2E",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background 0.22s ease, color 0.22s ease, border-color 0.22s ease",
        outline: "none",
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────── */
export default function FAQPageClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [openId, setOpenId] = useState(null);
  const searchId = useId();

  /* ── Derived: filtered FAQ list ── */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const categoryMatch =
        activeCategory === ALL || f.category === activeCategory;
      if (!categoryMatch) return false;
      if (!q) return true;
      return (
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  const handleToggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const clearSearch = () => {
    setQuery("");
    setOpenId(null);
  };

  /* ── Group filtered FAQs by category for rendering ── */
  const grouped = useMemo(() => {
    if (activeCategory !== ALL) {
      return { [activeCategory]: filtered };
    }
    const map = {};
    for (const cat of faqCategories) {
      const items = filtered.filter((f) => f.category === cat);
      if (items.length) map[cat] = items;
    }
    return map;
  }, [filtered, activeCategory]);

  const hasResults = filtered.length > 0;
  const isSearching = query.trim().length > 0;

  return (
    <>
      <style>{`
        /* ── FAQ item button focus ── */
        .faq-item-btn:focus-visible {
          outline: 2px solid #FF8C00;
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* ── Category chip focus ── */
        .faq-chip:focus-visible {
          outline: 2px solid #FF8C00;
          outline-offset: 2px;
        }
        .faq-chip:hover:not(.faq-chip-active) {
          border-color: #FF8C00;
          color: #FF8C00;
        }

        /* ── Search input ── */
        .faq-search-input {
          width: 100%;
          padding: 14px 50px 14px 48px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.95rem;
          color: #1A1209;
          background: #FFFFFF;
          border: 1.5px solid #FFD89B;
          border-radius: 14px;
          outline: none;
          transition: border-color 0.22s ease, box-shadow 0.22s ease;
          line-height: 1;
        }
        .faq-search-input::placeholder { color: #9C8550; }
        .faq-search-input:focus {
          border-color: #FF8C00;
          box-shadow: 0 0 0 3px rgba(255,140,0,0.13);
        }

        /* ── Clear button ── */
        .faq-clear-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,140,0,0.1);
          border: none;
          border-radius: 50%;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6B5B2E;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .faq-clear-btn:hover { background: #FF8C00; color: #FFFFFF; }
        .faq-clear-btn:focus-visible { outline: 2px solid #FF8C00; outline-offset: 2px; }

        /* ── Category heading ── */
        .faq-cat-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }
        .faq-cat-heading::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, #FFD89B, transparent);
        }

        /* ── No results ── */
        .faq-empty {
          text-align: center;
          padding: 56px 24px;
        }

        /* ── CTA section button ── */
        .faq-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #FF8C00 0%, #E07800 55%, #C45E00 100%);
          color: #FFFFFF !important;
          padding: 15px 34px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 9999px;
          box-shadow: 0 4px 16px rgba(255,140,0,0.28);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .faq-cta-btn:hover, .faq-cta-btn:focus-visible {
          color: #FFFFFF !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 0 4px rgba(255,140,0,0.14), 0 8px 24px rgba(255,140,0,0.38) !important;
        }
        .faq-cta-btn:active { transform: translateY(0) scale(1); }
        .faq-cta-btn:focus-visible { outline: 2px solid #FF8C00; outline-offset: 3px; }

        /* ── CTA WhatsApp link ── */
        .faq-wa-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: #6B5B2E;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .faq-wa-link:hover { color: #25D366; }
        .faq-wa-link:focus-visible { outline: 2px solid #FF8C00; outline-offset: 2px; border-radius: 2px; }

        /* ── Mobile responsiveness ── */
        @media (max-width: 767px) {
          .faq-search-input { font-size: 1rem; }
          .faq-chips-row {
            overflow-x: auto;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 4px;
          }
          .faq-chips-row::-webkit-scrollbar { display: none; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(150deg, #1A1209 0%, #2C1D07 60%, #1A1209 100%)",
          paddingTop: "160px",
          paddingBottom: "80px",
          overflow: "hidden",
        }}
      >
        {/* Decorative warm glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,140,0,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "680px",
            margin: "0 auto",
            padding: "0 20px",
            textAlign: "center",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: IN,
              fontSize: "0.6rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#F5A623",
              marginBottom: "16px",
            }}
          >
            Help & Information
          </p>

          {/* Heading */}
          <h1
            style={{
              fontFamily: PF,
              fontWeight: 700,
              fontSize: "clamp(2.6rem, 6vw, 4rem)",
              color: "#FFFFFF",
              lineHeight: 1.08,
              marginBottom: "20px",
            }}
          >
            Frequently Asked{" "}
            <em style={{ color: "#FF8C00", fontStyle: "italic" }}>Questions</em>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: IN,
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75,
              fontWeight: 300,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Everything you need to know about booking a Raah experience —
            from what&rsquo;s included to where we meet.
          </p>

          {/* Stats strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px",
              marginTop: "36px",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: `${faqs.length}`, label: "answers" },
              { value: "4", label: "categories" },
              { value: "24 hrs", label: "response time" },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: PF,
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#FF8C00",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontFamily: IN,
                    fontSize: "0.68rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 500,
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: "linear-gradient(to top, #FFFFFF, transparent)",
          }}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════
          SEARCH + FILTER + ACCORDION
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "64px 0 96px",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          {/* ── Search bar ── */}
          <div style={{ position: "relative", marginBottom: "28px" }}>
            {/* Search icon */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9C8550",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <Search size={18} />
            </span>

            <label htmlFor={searchId} className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
              Search FAQs
            </label>
            <input
              id={searchId}
              type="search"
              className="faq-search-input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenId(null);
              }}
              placeholder="Search questions, answers, or topics…"
              autoComplete="off"
              aria-label="Search FAQs"
            />

            {/* Clear button */}
            {isSearching && (
              <button
                className="faq-clear-btn"
                onClick={clearSearch}
                aria-label="Clear search"
                title="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* ── Category chips ── */}
          <div
            className="faq-chips-row"
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "44px",
              flexWrap: "wrap",
            }}
            role="group"
            aria-label="Filter by category"
          >
            <CategoryChip
              label="All"
              active={activeCategory === ALL}
              onClick={() => {
                setActiveCategory(ALL);
                setOpenId(null);
              }}
            />
            {faqCategories.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenId(null);
                }}
              />
            ))}
          </div>

          {/* ── Results count (only when searching or filtering) ── */}
          {(isSearching || activeCategory !== ALL) && hasResults && (
            <p
              aria-live="polite"
              aria-atomic="true"
              style={{
                fontFamily: IN,
                fontSize: "0.75rem",
                color: "#9C8550",
                letterSpacing: "0.06em",
                marginBottom: "24px",
                fontWeight: 500,
              }}
            >
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              {isSearching ? ` for "${query.trim()}"` : ""}
              {activeCategory !== ALL ? ` in ${activeCategory}` : ""}
            </p>
          )}

          {/* ── No results state ── */}
          {!hasResults && (
            <div className="faq-empty" aria-live="polite">
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "#FFF3DC",
                  border: "1.5px solid #FFD89B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  color: "#FF8C00",
                }}
                aria-hidden="true"
              >
                <Search size={22} />
              </div>
              <h2
                style={{
                  fontFamily: PF,
                  fontSize: "1.35rem",
                  fontWeight: 600,
                  color: "#1A1209",
                  marginBottom: "10px",
                }}
              >
                No FAQs found
              </h2>
              <p
                style={{
                  fontFamily: IN,
                  fontSize: "0.9rem",
                  color: "#6B5B2E",
                  lineHeight: 1.75,
                  fontWeight: 300,
                  maxWidth: "380px",
                  margin: "0 auto 24px",
                }}
              >
                No results for &ldquo;{query.trim()}&rdquo;. Try searching for
                booking, experiences, private tours, or travel.
              </p>
              <button
                onClick={clearSearch}
                style={{
                  fontFamily: IN,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#FF8C00",
                  background: "none",
                  border: "1.5px solid #FF8C00",
                  borderRadius: "9999px",
                  padding: "8px 22px",
                  cursor: "pointer",
                  transition: "background 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#FF8C00";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#FF8C00";
                }}
              >
                Clear search
              </button>
            </div>
          )}

          {/* ── FAQ accordion (grouped by category) ── */}
          {hasResults && (
            <div>
              {Object.entries(grouped).map(([category, items], groupIdx) => (
                <div
                  key={category}
                  style={{ marginBottom: groupIdx < Object.keys(grouped).length - 1 ? "52px" : 0 }}
                >
                  {/* Category heading — only shown when "All" is active or multiple groups */}
                  {(activeCategory === ALL || Object.keys(grouped).length > 1) && (
                    <div className="faq-cat-heading" style={{ marginBottom: "4px" }}>
                      <h2
                        style={{
                          fontFamily: IN,
                          fontSize: "0.6rem",
                          letterSpacing: "0.24em",
                          textTransform: "uppercase",
                          fontWeight: 700,
                          color: "#FF8C00",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {category}
                      </h2>
                    </div>
                  )}

                  {/* FAQ items */}
                  {items.map((item, idx) => (
                    <FAQItem
                      key={item.id}
                      item={item}
                      index={idx}
                      isOpen={openId === item.id}
                      onToggle={() => handleToggle(item.id)}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "#FFFDE7",
          borderTop: "1px solid #FFD89B",
          borderBottom: "1px solid #FFD89B",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: IN,
              fontSize: "0.6rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#FF8C00",
              marginBottom: "14px",
            }}
          >
            Still have questions?
          </p>

          <h2
            style={{
              fontFamily: PF,
              fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#1A1209",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            We&rsquo;re happy to help
          </h2>

          <p
            style={{
              fontFamily: IN,
              fontSize: "0.95rem",
              color: "#6B5B2E",
              lineHeight: 1.8,
              fontWeight: 300,
              marginBottom: "36px",
            }}
          >
            Can&rsquo;t find what you&rsquo;re looking for? Reach out — we
            respond personally to every message, usually within 24 hours.
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link href="/contact" className="faq-cta-btn">
              Get in touch
            </Link>

            <a
              href="https://wa.me/919929992539?text=Hi+Raah+Experiences%2C+I+have+a+question+I+couldn%27t+find+in+the+FAQs."
              target="_blank"
              rel="noopener noreferrer"
              className="faq-wa-link"
              aria-label="Chat on WhatsApp"
            >
              {/* WhatsApp icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                style={{ color: "#25D366", flexShrink: 0 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Availability note */}
          <p
            style={{
              fontFamily: IN,
              fontSize: "0.75rem",
              color: "#9C8550",
              marginTop: "22px",
              fontWeight: 300,
            }}
          >
            WhatsApp available 9 AM – 9 PM IST, 7 days a week.
          </p>
        </div>
      </section>
    </>
  );
}
