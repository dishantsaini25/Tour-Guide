import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";

const PLANS = [
  {
    days: "1 day",
    title: "One day in Jaipur",
    text: "See Amber Fort, the stepwell, Jal Mahal, Jantar Mantar and City Palace in one day with your own guide and a private car, or walk the old city's royal heart in the morning and see it lit up by night.",
    tours: [
      { label: "Jaipur Full Day Tour", href: "/experiences/jaipur-full-day-tour" },
      { label: "The Crown of Jaipur", href: "/experiences/the-crown-of-jaipur" },
      { label: "The Blue Hour", href: "/experiences/the-blue-hour" },
    ],
    guide: { label: "One day in Jaipur itinerary", href: "/journal/one-day-in-jaipur" },
  },
  {
    days: "2 days",
    title: "Two days in Jaipur",
    text: "Give the old city one day and Amber the other: a sunrise walk through the markets and temples, then the town of Amber beyond the fort, and street food in the evening.",
    tours: [
      { label: "Jaipur at Dawn", href: "/experiences/jaipur-at-dawn" },
      { label: "The Ridge & Ramparts", href: "/experiences/ridge-and-ramparts" },
      { label: "Beyond the Pink", href: "/experiences/beyond-the-pink" },
    ],
    guide: { label: "How many days in Jaipur?", href: "/journal/how-many-days-in-jaipur" },
  },
  {
    days: "3 days",
    title: "Three days in Jaipur",
    text: "Add a day beyond the city: block printing in Bagru and the sacred lake of Pushkar, or a hike in the Aravalli hills, and end with a home-cooked dinner on our farm.",
    tours: [
      { label: "Pushkar Day Trip", href: "/experiences/pushkar-day-trip-from-jaipur" },
      { label: "The Lost Kingdom", href: "/experiences/the-lost-kingdom" },
      { label: "The Farm & Fire", href: "/experiences/farm-and-fire" },
    ],
    guide: { label: "3-day Jaipur itinerary", href: "/journal/3-day-jaipur-itinerary" },
  },
];

export default function PlanByDays() {
  return (
    <>
      <style>{`
        .pbd-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; }
        @media (min-width: 768px) { .pbd-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; } }
        .pbd-card { background: #fff; border: 1px solid #FFD89B; border-radius: 18px; padding: 24px 22px; display: flex; flex-direction: column; gap: 12px; min-width: 0; }
        .pbd-days { align-self: flex-start; background: #FFF3DC; color: #E07800; font-family: 'DM Sans', system-ui, sans-serif; font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; padding: 6px 12px; border-radius: 9999px; }
        .pbd-tours { display: flex; flex-wrap: wrap; gap: 8px; margin: 4px 0 0; padding: 0; list-style: none; }
        .pbd-tours a { display: inline-flex; align-items: center; min-height: 40px; padding: 8px 14px; border-radius: 9999px; background: #FF8C00; color: #fff; text-decoration: none; font-family: 'DM Sans', system-ui, sans-serif; font-size: .82rem; font-weight: 600; }
        .pbd-tours a:hover, .pbd-tours a:focus-visible { background: #E07800; }
        .pbd-guide { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; margin-top: auto; color: #E07800; text-decoration: none; font-family: 'DM Sans', system-ui, sans-serif; font-weight: 700; font-size: .85rem; }
      `}</style>
      <SectionWrapper variant="soft" id="plan-by-days">
        <SectionHeading
          label="Plan Your Days"
          title="How Many Days Do You Have?"
          subtitle="Pick the length of your stay, and we will show you how to spend it."
        />
        <div className="pbd-grid">
          {PLANS.map((p) => (
            <article key={p.days} className="pbd-card">
              <span className="pbd-days">{p.days}</span>
              <h3 style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700, fontSize: "1.45rem", color: "#1A1209", margin: 0 }}>{p.title}</h3>
              <p style={{ fontFamily: "DM Sans, system-ui, sans-serif", fontSize: ".95rem", lineHeight: 1.7, color: "#3D2E0E", margin: 0 }}>{p.text}</p>
              <ul className="pbd-tours">
                {p.tours.map((t) => (
                  <li key={t.href}><Link href={t.href}>{t.label}</Link></li>
                ))}
              </ul>
              <Link href={p.guide.href} className="pbd-guide">
                {p.guide.label} <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
