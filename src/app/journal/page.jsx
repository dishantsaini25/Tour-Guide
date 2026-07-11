import Image from "next/image";
import Link from "next/link";
import { journalArticles } from "@/data/experiences";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "The Raah Journal", description: "Stories, observations, and conversations from the lanes of Jaipur." };

const PF="Fraunces,Georgia,serif", IN="DM Sans,system-ui,sans-serif";
const CH="#1A1F1C", MU="#4A5550", FR="#1E4D3A", CP="#B07D3E";
const BD="#C8D8D0", SF="#E8F0EC", IV="#F2F0EC", WH="#FFFFFF";

export default function JournalPage() {
  return (
    <>
      <style>{`
        .jcard{background:${WH};border:1px solid ${BD};overflow:hidden;transition:box-shadow .35s,transform .35s;}
        .jcard:hover{box-shadow:0 10px 36px rgba(30,77,58,0.1);transform:translateY(-3px);}
        .jcard img{transition:transform .65s ease;}
        .jcard:hover img{transform:scale(1.06);}
        .jcta{border:1.5px solid ${FR};color:${FR};font-family:'DM Sans',system-ui,sans-serif;transition:all .2s;}
        .jcta:hover{background:${FR}!important;color:#F0EDE8!important;}
      `}</style>

      {/* Hero — warm sage bg, not dark */}
      <section style={{ background:SF, paddingTop:"110px", paddingBottom:"72px", textAlign:"center", borderBottom:`1px solid ${BD}` }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", padding:"0 20px" }}>
          <p style={{ fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:CP, marginBottom:"10px" }}>The Raah Journal</p>
          <div style={{ width:"36px", height:"1.5px", background:CP, margin:"0 auto 18px" }} />
          <h1 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(3rem,7vw,5rem)", color:CH, lineHeight:1.08, marginBottom:"18px" }}>
            Stories From<br /><em style={{ color:FR, fontStyle:"italic" }}>the City</em>
          </h1>
          <p style={{ fontFamily:IN, color:MU, fontSize:"1rem", lineHeight:1.8, fontWeight:300 }}>
            Our journal is where Jaipur speaks for itself — through conversations overheard in narrow lanes, and stories no guidebook contains.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section style={{ background:IV, padding:"88px 0" }}>
        <div style={{ maxWidth:"1320px", margin:"0 auto", padding:"0 20px" }}>
          {/* Featured */}
          <div style={{ marginBottom:"64px" }}>
            <p style={{ fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:CP, marginBottom:"8px" }}>Latest Story</p>
            <div style={{ width:"36px", height:"1.5px", background:CP, marginBottom:"24px" }} />
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ border:`1px solid ${BD}`, background:WH, overflow:"hidden" }}>
              <div style={{ position:"relative", minHeight:"360px" }}>
                <Image src={journalArticles[0].image} alt={journalArticles[0].title} fill className="object-cover object-top" sizes="(max-width:1024px) 100vw,50vw" />
              </div>
              <div style={{ padding:"40px" }}>
                <div style={{ display:"flex", gap:"10px", alignItems:"center", marginBottom:"14px" }}>
                  <span style={{ background:FR, color:"#F0EDE8", fontFamily:IN, fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"4px 10px" }}>{journalArticles[0].category}</span>
                  <span style={{ fontFamily:IN, fontSize:"0.62rem", color:"#7A8A84" }}>· {journalArticles[0].readTime}</span>
                </div>
                <h2 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(1.8rem,3vw,2.5rem)", color:CH, lineHeight:1.12, marginBottom:"14px" }}>{journalArticles[0].title}</h2>
                <div style={{ width:"32px", height:"1.5px", background:CP, marginBottom:"16px" }} />
                <p style={{ fontFamily:IN, color:MU, lineHeight:1.8, fontSize:"0.95rem", marginBottom:"24px", fontWeight:300 }}>{journalArticles[0].excerpt}</p>
                <span style={{ display:"flex", alignItems:"center", gap:"6px", fontFamily:IN, color:FR, fontWeight:700, fontSize:"0.78rem", letterSpacing:"0.06em", textTransform:"uppercase" }}>
                  Coming Soon <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journalArticles.slice(1).map(a => (
              <article key={a.slug} className="jcard">
                <div style={{ position:"relative", height:"200px", overflow:"hidden" }}>
                  <Image src={a.image} alt={a.title} fill className="object-cover object-top" sizes="(max-width:768px) 100vw,33vw" />
                  <div style={{ position:"absolute", bottom:"12px", left:"14px" }}>
                    <span style={{ background:"rgba(30,77,58,0.88)", color:"#F0EDE8", fontFamily:IN, fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"4px 10px", backdropFilter:"blur(4px)" }}>{a.category}</span>
                  </div>
                </div>
                <div style={{ padding:"22px" }}>
                  <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"10px" }}>
                    <span style={{ fontFamily:IN, fontSize:"0.6rem", color:CP, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase" }}>{a.category}</span>
                    <span style={{ color:BD }}>·</span>
                    <span style={{ fontFamily:IN, fontSize:"0.62rem", color:"#7A8A84" }}>{a.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily:PF, fontSize:"1.2rem", fontWeight:700, color:CH, lineHeight:1.22, marginBottom:"10px" }}>{a.title}</h3>
                  <p style={{ fontFamily:IN, fontSize:"0.85rem", color:MU, lineHeight:1.75, marginBottom:"18px", fontWeight:300 }}>{a.excerpt}</p>
                  <div style={{ width:"26px", height:"1.5px", background:CP, marginBottom:"12px" }} />
                  <span style={{ display:"flex", alignItems:"center", gap:"4px", fontFamily:IN, fontSize:"0.73rem", fontWeight:700, color:FR, letterSpacing:"0.06em", textTransform:"uppercase" }}>
                    Coming Soon <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Subscribe */}
          <div style={{ marginTop:"64px", textAlign:"center", padding:"52px 32px", background:SF, border:`1px solid ${BD}` }}>
            <p style={{ fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:CP, marginBottom:"10px" }}>Stay Connected</p>
            <div style={{ width:"36px", height:"1.5px", background:CP, margin:"0 auto 18px" }} />
            <h2 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(1.6rem,3vw,2.2rem)", color:CH, marginBottom:"12px" }}>New stories, when the city gives them.</h2>
            <p style={{ fontFamily:IN, color:MU, fontSize:"0.9rem", marginBottom:"28px", maxWidth:"420px", margin:"0 auto 28px", lineHeight:1.75, fontWeight:300 }}>
              We write when we have something worth sharing — not on a schedule.
            </p>
            <Link href="/contact" className="jcta" style={{ display:"inline-block", padding:"12px 30px", fontFamily:IN, fontSize:"0.8rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", textDecoration:"none" }}>Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
