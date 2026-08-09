"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { dict } from "./dict";

type DictEntry = { en: string; hi: string };

function resolve(path: string): unknown {
  // Only the first "." separates section from key — dictionary keys
  // themselves may contain dots (e.g. "ACI 440.11-22"), so a naive
  // split-on-every-dot breaks those lookups.
  const i = path.indexOf(".");
  if (i === -1) return (dict as any)[path];
  const section = path.slice(0, i);
  const key = path.slice(i + 1);
  return (dict as any)[section]?.[key];
}

/** Looks up "section.key" in the shared dictionary and returns the string
 * for the active language, falling back to English if the Hindi string (or
 * the key itself) is missing. */
export function useT() {
  const { lang } = useLanguage();
  return (path: string): string => {
    const entry = resolve(path) as DictEntry | undefined;
    if (!entry) return path;
    return entry[lang] ?? entry.en;
  };
}

export { useLanguage };
