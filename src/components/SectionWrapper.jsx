export default function SectionWrapper({ children, variant = "main", id, className = "" }) {
  const bg = {
    main:   "#F2F0EC",
    soft:   "#E8F0EC",
    card:   "#FFFFFF",
    dark:   "#1A1F1C",
    maroon: "#1E4D3A",
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
