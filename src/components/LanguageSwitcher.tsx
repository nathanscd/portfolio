import { useLang } from "../context/LangContext";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string; 
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { lang, toggleLang } = useLang();

  const langMap = {
    "pt": { label: "PT", region: "BR", flag: "🇧🇷" },
    "en": { label: "EN", region: "US", flag: "🇺🇸" },
    "spn": { label: "ES", region: "ES", flag: "🇪🇸" }
  };

  return (
    <button 
      onClick={toggleLang} 
      className={`group relative flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 hover:border-[#FF001D] transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Background animado no hover */}
      <div className="absolute inset-0 bg-[#FF001D] translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
      
      <Globe size={14} className="text-[#FF001D] group-hover:text-white transition-colors" />
      
      <div className="flex flex-col items-start leading-none">
        <span className="font-['Orbitron'] text-[8px] text-gray-500 group-hover:text-white/50 tracking-widest uppercase transition-colors">
          Region
        </span>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5"
          >
            <span className="font-['Orbitron'] text-xs font-black text-white group-hover:text-white tracking-tighter transition-colors">
              {langMap[lang].label}
            </span>
            <span className="text-[10px] opacity-80 group-hover:opacity-100 transition-opacity">
              {langMap[lang].flag}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detalhe estético de "Bit" de dados */}
      <div className="flex gap-0.5 ml-2">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`w-1 h-1 rounded-full transition-colors ${
              i === 1 ? 'bg-[#FF001D] group-hover:bg-white' : 'bg-white/10'
            }`} 
          />
        ))}
      </div>
    </button>
  );
}