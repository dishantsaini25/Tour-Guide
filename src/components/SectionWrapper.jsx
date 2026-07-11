export default function SectionWrapper({ children, variant = "main", id, className = "" }) {
  const bg = {
    main:   "#FFFFFF",
    soft:   "#FFFDE7",
    card:   "#FFFFFF",
    dark:   "#1A1209",
    maroon: "#FF8C00",
    white:  "#FFFFFF",
  };
  return (
    <section id={id} style={{ background: bg[variant] || bg.main, padding: "60px 0" }}
      className={`section-responsive ${className}`}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 20px" }} className="inner-pad">
        {children}
      </div>
    </section>
  );
}
