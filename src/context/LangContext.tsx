import { createContext, useContext, useState, ReactNode } from "react";
import en from "../locales/en.json"; 
import pt from "../locales/pt.json";
import spn from "../locales/spn.json"; 

interface TranslationKeys {
  title: string;
  sub: string;
  [key: string]: string; 
}

type LangKey = "pt" | "en" | "spn"; 

interface LangContextType {
  lang: LangKey; 
  t: TranslationKeys;
  toggleLang: () => void;
}

const langs: Record<LangKey, TranslationKeys> = { 
    en: en as unknown as TranslationKeys, 
    pt: pt as unknown as TranslationKeys, 
    spn: spn as unknown as TranslationKeys
};

const LangContext = createContext<LangContextType | null>(null);

interface LangProviderProps {
  children: ReactNode;
}

export function LangProvider({ children }: LangProviderProps) {
  const langOrder: LangKey[] = ["pt", "en", "spn"];
  const [lang, setLang] = useState<LangKey>("pt"); 
  const t: TranslationKeys = langs[lang];

  function toggleLang() {
    setLang((currentLang) => {
      const currentIndex = langOrder.indexOf(currentLang);
      const nextIndex = (currentIndex + 1) % langOrder.length;
      return langOrder[nextIndex];
    });
  }

  const value: LangContextType = { lang, t, toggleLang };

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);

  if (context === null) {
    throw new Error("useLang must be used within a LangProvider");
  }

  return context;
}
