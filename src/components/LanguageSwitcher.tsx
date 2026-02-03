import { useLang } from "../context/LangContext";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string; 
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { lang, toggleLang } = useLang();

  const langMap = {
    "pt": { label: "PT-BR", code: "01", flag: "🇧🇷" },
    "en": { label: "EN-US", code: "02", flag: "🇺🇸" },
    "spn": { label: "ES-ES", code: "03", flag: "🇪🇸" }
  };

  return (
    <button 
      onClick={toggleLang} 
      className={`group relative flex items-center gap-4 px-5 py-2 transition-all duration-500 skew-x-[-12deg] border border-black/10 hover:border-[#FF001D] bg-transparent overflow-hidden cursor-pointer ${className}`}
    >
      {/* CAMADA DE PREENCHIMENTO: Inicialmente escondida abaixo (translate-y-full) */}
      <div className="absolute inset-0 bg-[#FF001D] translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none" />
      
      {/* CONTEÚDO: z-10 para ficar acima do preenchimento vermelho */}
      <div className="relative z-10 flex items-center gap-3 skew-x-[12deg]">
        <div className="relative flex items-center justify-center">
            <Globe size={13} className="text-[#FF001D] group-hover:text-white transition-colors duration-300" />
            {/* Pulso de sinal */}
            <motion.div 
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-[#FF001D] rounded-full -z-10 group-hover:bg-white"
            />
        </div>

        <div className="flex flex-col items-start leading-none border-l border-black/5 group-hover:border-white/20 pl-3 transition-colors">
          <span className="font-mono text-[7px] text-gray-400 group-hover:text-white/60 tracking-[0.2em] uppercase mb-0.5">
            CH_{langMap[lang].code}
          </span>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5"
            >
              <span className="font-['Orbitron'] text-[10px] font-black text-[#111] group-hover:text-white tracking-widest transition-colors">
                {langMap[lang].label}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicadores de Telemetria Laterais */}
        <div className="flex flex-col gap-0.5 ml-1">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-1 h-1 transition-all duration-300 ${
                langMap[lang].code === `0${i}` 
                  ? 'bg-[#FF001D] group-hover:bg-white scale-110' 
                  : 'bg-black/10 group-hover:bg-white/20'
              }`} 
            />
          ))}
        </div>
      </div>
    </button>
  );
}