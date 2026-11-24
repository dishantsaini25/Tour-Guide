import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SpanishBanner() {
  return (
    <>
      <style>{`
        .sb-wrap { padding: 36px 0; background: linear-gradient(135deg, #FF8C00 0%, #E07800 60%, #C45E00 100%); }
        .sb-inner { max-width: 1320px; margin: 0 auto; padding: 0 20px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 18px 32px; }
        .sb-btn { display: inline-flex; align-items: center; gap: 8px; min-height: 48px; padding: 12px 28px; border-radius: 9999px; background: #fff; color: #C45E00 !important; text-decoration: none; font-family: 'DM Sans', system-ui, sans-serif; font-weight: 700; font-size: .82rem; letter-spacing: .08em; text-transform: uppercase; }
        .sb-btn:hover, .sb-btn:focus-visible { box-shadow: 0 0 0 4px rgba(255,255,255,.35); }
      `}</style>
      <section className="sb-wrap" lang="es" aria-label="Tours en español">
        <div className="sb-inner inner-pad">
          <div style={{ minWidth: 0, flex: "1 1 320px" }}>
            <p style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700, fontSize: "clamp(1.5rem,3.4vw,2.2rem)", color: "#fff", margin: 0, lineHeight: 1.2 }}>
              ¿Hablas español?
            </p>
            <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "1rem", color: "rgba(255,255,255,.92)", margin: "8px 0 0", lineHeight: 1.6 }}>
              Todas nuestras experiencias en Jaipur se hacen en español, sin coste adicional.
            </p>
          </div>
          <Link href="/tours-en-espanol" className="sb-btn">
            Ver tours en español <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
