import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../data/translations.js";

const LanguageContext = createContext(undefined);

const STORAGE_KEY = "arv-lang";

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    return saved === "hi" || saved === "en" ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const toggleLanguage = () => setLang((prev) => (prev === "en" ? "hi" : "en"));

  const t = useMemo(() => translations[lang], [lang]);

  const value = useMemo(() => ({ lang, t, setLanguage: setLang, toggleLanguage }), [lang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
