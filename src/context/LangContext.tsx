import { createContext, useContext, useState, ReactNode } from "react";
import en from "../locales/en.json"; 
import pt from "../locales/pt.json";
import spn from "../locales/spn.json"; 

// Interface flexível para evitar erros de sublinhado vermelho
interface TranslationKeys {
  [key: string]: any; 
}

type LangKey = "pt" | "en" | "spn"; 

interface LangContextType {
  lang: LangKey; 
  t: TranslationKeys;
  toggleLang: () => void;
}

const langs: Record<LangKey, any> = { en, pt, spn };

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const langOrder: LangKey[] = ["pt", "en", "spn"];
  const [lang, setLang] = useState<LangKey>("pt"); 
  const t = langs[lang];

  function toggleLang() {
    setLang((currentLang) => {
      const currentIndex = langOrder.indexOf(currentLang);
      const nextIndex = (currentIndex + 1) % langOrder.length;
      return langOrder[nextIndex];
    });
  }

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used within a LangProvider");
  return context;
}