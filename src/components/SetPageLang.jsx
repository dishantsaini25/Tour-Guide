"use client";
import { useEffect } from "react";

export default function SetPageLang({ lang }) {
  useEffect(() => {
    if (!lang) return;
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);

  return null;
}