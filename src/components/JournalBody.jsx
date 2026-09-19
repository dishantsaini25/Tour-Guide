"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PF = "Fraunces, Georgia, serif";
const IN = "DM Sans, system-ui, sans-serif";
const OR = "#FF8C00";
const CH = "#1A1209", MU = "#6B5B2E";

export default function JournalBody({ text }) {
  return (
    <div className="jmodal-bodytext">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p style={{ fontFamily: IN, color: MU, lineHeight: 1.9, fontSize: "0.95rem", fontWeight: 300, marginBottom: "16px" }}>
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong style={{ fontWeight: 700, color: CH }}>{children}</strong>
          ),
          a: ({ href, children }) => (
            <a href={href} style={{ color: OR, fontWeight: 600, textDecoration: "underline" }}>
              {children}
            </a>
          ),
          h2: ({ children }) => (
            <h2 style={{ fontFamily: PF, fontSize: "1.35rem", fontWeight: 700, color: CH, margin: "26px 0 12px", lineHeight: 1.25 }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ fontFamily: PF, fontSize: "1.1rem", fontWeight: 700, color: CH, margin: "20px 0 10px" }}>
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul style={{ paddingLeft: "20px", margin: "12px 0 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li style={{ fontFamily: IN, color: MU, lineHeight: 1.75, fontSize: "0.95rem", fontWeight: 300 }}>
              {children}
            </li>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              style={{ width: "100%", borderRadius: "14px", margin: "18px 0", display: "block" }}
            />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}