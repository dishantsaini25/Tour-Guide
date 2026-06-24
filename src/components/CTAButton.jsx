"use client";
import Link from "next/link";

export default function CTAButton({ href, onClick, children, variant = "primary", size = "md", className = "", type = "button", disabled = false }) {
  const sz = { sm: "px-5 py-2 text-xs", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-sm" }[size];
  const styles = {
    primary:       { background: "#c9943a", color: "#1e1b3a", border: "none" },
    outline:       { background: "transparent", color: "#c9943a", border: "1.5px solid #c9943a" },
    "outline-dark":{ background: "transparent", color: "#1e1b3a", border: "1.5px solid #1e1b3a" },
    "outline-white":{ background: "transparent", color: "white", border: "1.5px solid rgba(255,255,255,0.6)" },
    dark:          { background: "#1e1b3a", color: "white", border: "none" },
    white:         { background: "white", color: "#1e1b3a", border: "none" },
  }[variant] || {};

  const base = `inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-200 ${sz} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`;

  if (href) return <Link href={href} className={base} style={styles}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={base} style={styles}>{children}</button>;
}
