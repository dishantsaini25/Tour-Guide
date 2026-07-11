import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "About & Philosophy", description: "The story behind Raah India Experiences." };

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";
const CH = "#1A1F1C", MU = "#4A5550", FR = "#1E4D3A", CP = "#B07D3E";
const RULE = { width:"36px", height:"1.5px", background:`linear-gradient(to right,${CP},#C89A5A)`, margin:"10px 0 20px" };
const RULE_C = { width:"36px", height:"1.5px", background:`linear-gradient(to right,${CP},#C89A5A)`, margin:"10px auto 20px" };
const LABEL = { fontFamily:IN, fontSize:"0.6rem", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:CP };

const values = [
  { title:"Curated, Not Scripted", desc:"Every experience is personally researched, walked, and refined. Our routes evolve based on the city's rhythm, not a fixed script." },
  { title:"Small Groups Only", desc:"Maximum 8 guests. Meaningful travel requires space for conversation, curiosity, and genuine human connection." },
  { title:"No Forced Shopping. Ever.", desc:"Not one stop on any Raah experience is commission-based. We guide with complete independence and complete honesty." },
  { title:"Responsible Tourism", desc:"We support local artisans, small food vendors, and community spaces. Your journey creates genuine value for Jaipur's people." },
  { title:"Food as a Cultural Lens", desc:"From predawn street kitchens to countryside farmhouses — food is how we understand Jaipur, not just a tasting detour." },
  { title:"Slow Travel Philosophy", desc:"We move at a pace that lets you notice things — a texture, a smell, a conversation. Unhurried, observant, present." },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        .ab1{background:#1E4D3A!important;color:#F0EDE8!important;transition:background .2s;} .ab1:hover{background:#163529!important;}
        .ab2{border:1.5px solid #1E4D3A!important;color:#1E4D3A!important;transition:all .2s;} .ab2:hover{background:#1E4D3A!important;color:#F0EDE8!important;}
        .vc{background:#FFFFFF;border:1px solid #C8D8D0;border-top:2px solid #B07D3E;padding:26px;transition:box-shadow .35s,transform .35s;}
        .vc:hover{box-shadow:0 8px 28px rgba(30,77,58,0.1);transform:translateY(-2px);}
      `}</style>

      {/* Hero */}
      <section style={{ position:"relative", minHeight:"58vh", display:"flex", alignItems:"flex-end", backgroundImage:"url('https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=85')", backgroundSize:"cover", backgroundPosition:"center", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,rgba(10,25,16,0.78) 0%,rgba(10,25,16,0.4) 55%,rgba(10,25,16,0.18) 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,25,16,0.85) 0%,transparent 55%)" }} />
        <div style={{ position:"relative", zIndex:10, maxWidth:"1320px", margin:"0 auto", padding:"160px 20px 64px", width:"100%" }}>
          <p style={{ ...LABEL, marginBottom:"12px" }}>The Story Behind Raah</p>
          <h1 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(2.8rem,6vw,5rem)", color:"#F0EDE8", lineHeight:1.08 }}>
            We Don't Just Show You Jaipur.<br />
            <em style={{ color:CP, fontStyle:"italic" }}>We Help You Understand It.</em>
          </h1>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"80px", background:"linear-gradient(to top,#F2F0EC,transparent)" }} />
      </section>

      {/* Philosophy */}
      <section style={{ background:"#F2F0EC", padding:"88px 0" }}>
        <div style={{ maxWidth:"1320px", margin:"0 auto", padding:"0 20px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p style={LABEL}>Our Philosophy</p>
              <div style={RULE} />
              <h2 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(2rem,3.5vw,3rem)", color:CH, lineHeight:1.1, marginBottom:"22px" }}>
                Travel is Not Measured by Monuments Visited.
              </h2>
              <div style={{ display:"flex", flexDirection:"column", gap:"16px", fontFamily:IN, fontSize:"0.95rem", color:MU, lineHeight:1.85, fontWeight:300 }}>
                <p>At Raah India Experiences, we believe travel is not measured by the number of monuments visited but by the moments that leave a lasting imprint on the soul.</p>
                <p>In a world where travel has become hurried and destinations are reduced to checklists, we choose a different path — one that invites curiosity, connection, and understanding.</p>
                <p>Jaipur's true character reveals itself in the fragrance of flowers before sunrise, the echo of temple bells, the laughter of market vendors, and the recipes lovingly preserved across generations.</p>
                <blockquote style={{ fontFamily:PF, fontSize:"1.1rem", fontStyle:"italic", color:CH, borderLeft:`2px solid ${CP}`, paddingLeft:"18px", fontWeight:400 }}>
                  "We don't simply show places. We reveal stories. We don't collect destinations. We create connections."
                </blockquote>
              </div>
            </div>
            <div style={{ position:"relative" }}>
              <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden", border:"1px solid #C8D8D0" }}>
                <Image src="https://images.unsplash.com/photo-1609501676721-abb25c9012d9?w=800&q=85" alt="Morning rituals Jaipur" fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" />
              </div>
              <div style={{ position:"absolute", bottom:"-12px", right:"-12px", width:"90px", height:"90px", border:"1.5px solid rgba(176,125,62,0.3)" }} className="hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Curator */}
      <section style={{ background:"#E8F0EC", padding:"88px 0" }}>
        <div style={{ maxWidth:"1320px", margin:"0 auto", padding:"0 20px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div style={{ position:"relative" }}>
              <div style={{ position:"relative", aspectRatio:"3/4", overflow:"hidden", border:"1px solid #C8D8D0" }}>
                <Image src="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=85" alt="Jaipur — home of the curator" fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" />
              </div>
              <div style={{ position:"absolute", top:"-12px", left:"-12px", width:"80px", height:"80px", border:"1.5px solid rgba(176,125,62,0.2)" }} className="hidden lg:block" />
            </div>
            <div>
              <p style={LABEL}>About the Curator</p>
              <div style={RULE} />
              <h2 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(2rem,3.5vw,3rem)", color:CH, lineHeight:1.1, marginBottom:"22px" }}>
                Every Meaningful Journey<br />
                <em style={{ color:FR, fontStyle:"italic" }}>Begins With a Question.</em>
              </h2>
              <div style={{ display:"flex", flexDirection:"column", gap:"16px", fontFamily:IN, fontSize:"0.95rem", color:MU, lineHeight:1.85, fontWeight:300, marginBottom:"30px" }}>
                <p>For years, I watched travellers arrive in Jaipur filled with excitement and leave with photographs of forts and palaces — yet having never experienced the city that locals know and cherish.</p>
                <blockquote style={{ fontFamily:PF, fontSize:"1.05rem", fontStyle:"italic", color:CH, borderLeft:`2px solid ${CP}`, paddingLeft:"18px", fontWeight:400 }}>
                  "The monuments were beautiful, but I wish I had met the people who give this city its soul."
                </blockquote>
                <p>That single sentence became the foundation of Raah India Experiences.</p>
                <p style={{ fontWeight:500, color:CH }}>Welcome to the Jaipur I proudly call home.</p>
              </div>
              <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
                <Link href="/experiences" className="ab1" style={{ padding:"13px 28px", fontFamily:IN, fontSize:"0.8rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", textDecoration:"none" }}>Explore Experiences</Link>
                <Link href="/contact" className="ab2" style={{ padding:"13px 28px", fontFamily:IN, fontSize:"0.8rem", fontWeight:700, textDecoration:"none" }}>Book an Experience</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Walk */}
      <section style={{ background:"#F2F0EC", padding:"88px 0" }}>
        <div style={{ maxWidth:"1320px", margin:"0 auto", padding:"0 20px" }}>
          <div style={{ textAlign:"center", marginBottom:"56px" }}>
            <p style={LABEL}>Why Choose Raah</p>
            <div style={RULE_C} />
            <h2 style={{ fontFamily:PF, fontWeight:700, fontSize:"clamp(2rem,4vw,3rem)", color:CH, marginBottom:"12px" }}>Why Walk With Us</h2>
            <p style={{ fontFamily:IN, color:MU, fontSize:"1rem", maxWidth:"520px", margin:"0 auto", lineHeight:1.75, fontWeight:300 }}>Walking is the slowest way to travel — and often the most rewarding.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(v => (
              <div key={v.title} className="vc">
                <div style={{ width:"28px", height:"1.5px", background:CP, marginBottom:"14px" }} />
                <h3 style={{ fontFamily:PF, fontSize:"1.15rem", fontWeight:700, color:CH, marginBottom:"10px", lineHeight:1.25 }}>{v.title}</h3>
                <p style={{ fontFamily:IN, fontSize:"0.875rem", color:MU, lineHeight:1.8, fontWeight:300 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature */}
      <section style={{ background:"#E8F0EC", borderTop:"1px solid #C8D8D0", borderBottom:"1px solid #C8D8D0", padding:"44px 20px", textAlign:"center" }}>
        <p style={{ fontFamily:PF, fontSize:"clamp(1.1rem,2.2vw,1.5rem)", fontStyle:"italic", fontWeight:400, color:MU }}>
          "Because the most meaningful souvenirs are never things you buy —{" "}
          <em style={{ color:FR, fontStyle:"normal", fontWeight:600 }}>they are the stories you carry home.</em>"
        </p>
      </section>
    </>
  );
}
