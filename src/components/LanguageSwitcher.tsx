import { useLang } from "../context/LangContext";

interface LanguageSwitcherProps {
  className?: string; 
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { lang, toggleLang } = useLang();

  const nextLangText = {
    "pt": "PT",
    "en": "EN",
    "spn": "ES"
  };

  return (
    <button onClick={toggleLang} className={className}>
      {nextLangText[lang]}
    </button>
  );
}