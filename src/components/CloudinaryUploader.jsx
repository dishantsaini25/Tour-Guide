"use client";
import { useState, useRef } from "react";
import Image from "next/image";

/**
 * CloudinaryUploader
 * Drop-in component that lets the user pick a file, uploads it to
 * /api/upload (which forwards to Cloudinary), and previews the result.
 *
 * Props (all optional):
 *  onUploaded(url)  – callback fired with the Cloudinary secure_url
 *  label            – button label  (default: "Choose image")
 *  accept           – file accept   (default: "image/*")
 */
export default function CloudinaryUploader({
  onUploaded,
  label = "Choose image",
  accept = "image/*",
}) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const inputRef                    = useRef(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setLoading(true);
    setPreviewUrl(null);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error ?? `Server error ${res.status}`);
      }

      setPreviewUrl(data.url);
      onUploaded?.(data.url);
    } catch (err) {
      setError(err.message ?? "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "360px" }}>
      {/* Hidden native input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={handleFile}
        aria-label="Upload image to Cloudinary"
      />

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        style={{
          padding: "10px 22px",
          borderRadius: "9999px",
          background: loading
            ? "rgba(255,140,0,0.45)"
            : "linear-gradient(135deg,#FF8C00 0%,#E07800 55%,#C45E00 100%)",
          color: "#FFFFFF",
          fontFamily: "'DM Sans',system-ui,sans-serif",
          fontSize: "0.82rem",
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "opacity 0.2s",
        }}
      >
        {loading ? "Uploading…" : label}
      </button>

      {/* Error */}
      {error && (
        <p style={{
          fontFamily: "'DM Sans',system-ui,sans-serif",
          fontSize: "0.8rem",
          color: "#C0392B",
          background: "#FFF5F5",
          border: "1px solid #FFBBBB",
          borderRadius: "8px",
          padding: "8px 14px",
          margin: 0,
        }}>
          ⚠ {error}
        </p>
      )}

      {/* Preview */}
      {previewUrl && (
        <div style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #FFD89B",
          boxShadow: "0 4px 16px rgba(255,140,0,0.12)",
        }}>
          <Image
            src={previewUrl}
            alt="Uploaded image preview"
            fill
            className="object-cover object-center"
            sizes="360px"
            unoptimized={false}
          />
        </div>
      )}

      {/* Cloudinary URL (copyable) */}
      {previewUrl && (
        <p style={{
          fontFamily: "'DM Sans',system-ui,sans-serif",
          fontSize: "0.72rem",
          color: "#6B5B2E",
          wordBreak: "break-all",
          margin: 0,
        }}>
          <strong style={{ color: "#FF8C00" }}>URL: </strong>
          {previewUrl}
        </p>
      )}
    </div>
  );
}
