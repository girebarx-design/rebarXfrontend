"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="rx-lang" role="group" aria-label="Language / भाषा">
      <button
        type="button"
        className={`rx-lang__btn${lang === "en" ? " rx-lang__btn--active" : ""}`}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={`rx-lang__btn${lang === "hi" ? " rx-lang__btn--active" : ""}`}
        aria-pressed={lang === "hi"}
        onClick={() => setLang("hi")}
      >
        हिं
      </button>
    </div>
  );
}
