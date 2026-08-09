"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "hi";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "en", setLang: () => {} });

const STORAGE_KEY = "rx-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "hi" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
