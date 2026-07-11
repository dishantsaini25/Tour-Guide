import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { journalArticles } from "@/data/experiences";
import { ArrowUpRight } from "lucide-react";

export default function JournalPreview() {
  const articles = journalArticles.slice(0, 3);
  return (
    <>
      <style>{`
        .jc { background:#FFFFFF; border:1px solid #C8D8D0; overflow:hidden; transition:box-shadow .35s,transform .35s; }
        .jc:hover { box-shadow:0 10px 36px rgba(30,77,58,0.1); transform:translateY(-3px); }
        .jc img { transition:transform .65s ease; }
        .jc:hover img { transform:scale(1.06); }
        .jall { border:1.5px solid #1E4D3A; color:#1E4D3A; font-family:'DM Sans',system-ui,sans-serif; transition:all .2s; }
        .jall:hover { background:#1E4D3A!important; color:#F0EDE8!important; }
      `}</style>
      <SectionWrapper variant="main">
        <SectionHeading label="The Raah Journal" title="Stories From the City" subtitle="Our journal is where Jaipur speaks for itself — through conversations overheard in narrow lanes, observations from markets before sunrise, and stories no guidebook contains." />
        <div className="jp-slider">
          {articles.map((a) => (
            <article key={a.slug} className="jc">
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <Image src={a.image} alt={a.title} fill className="object-cover object-top" sizes="(max-width:768px) 100vw,33vw" />
                <div style={{ position: "absolute", bottom: "12px", left: "14px" }}>
                  <span style={{ background: "rgba(30,77,58,0.88)", color: "#F0EDE8", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 10px", backdropFilter: "blur(4px)" }}>{a.category}</span>
                </div>
              </div>
              <div style={{ padding: "22px" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.62rem", color: "#B07D3E", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>{a.category}</span>
                  <span style={{ color: "#C8D8D0" }}>·</span>
                  <span style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.62rem", color: "#7A8A84" }}>{a.readTime}</span>
                </div>
                <h3 style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.15rem", fontWeight: 700, color: "#1A1F1C", lineHeight: 1.25, marginBottom: "10px" }}>{a.title}</h3>
                <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.85rem", color: "#4A5550", lineHeight: 1.75, marginBottom: "18px", fontWeight: 300 }}>{a.excerpt}</p>
                <div style={{ width: "28px", height: "1.5px", background: "#B07D3E", marginBottom: "14px" }} />
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#1E4D3A", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Read Article <ArrowUpRight size={12} />
                </span>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "44px" }}>
          <Link href="/journal" className="jall" style={{ display: "inline-block", padding: "13px 32px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
            Visit The Raah Journal
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
