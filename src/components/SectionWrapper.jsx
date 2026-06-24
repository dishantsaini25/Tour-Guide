/**
 * SectionWrapper — consistent padding & background per section.
 * variant: "parchment" | "indigo" | "cream" | "white" | "none"
 */
export default function SectionWrapper({ children, className = "", variant = "parchment", id }) {
  const bg = {
    parchment: "bg-[#fdf6ed]",
    indigo:    "bg-[#1e1b3a]",
    cream:     "bg-[#f5ece0]",
    white:     "bg-white",
    none:      "",
  };
  return (
    <section id={id} className={`py-20 md:py-28 ${bg[variant] ?? ""} ${className}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}
