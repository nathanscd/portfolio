import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLang } from "../context/LangContext";
import { ChevronRight, Gauge, Zap, Flag, Map, User, Mail } from "lucide-react";
import SpeedLoader from "../components/SpeedLoader";

type SectionType = "home" | "about" | "projects" | "contact";

export default function Home({ setSection }: { setSection: (val: SectionType) => void }) {
  const { t } = useLang();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [showPitMenu, setShowPitMenu] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetSection, setTargetSection] = useState<SectionType>("home");

  const handleInitialLoadFinish = () => {
    setIsLoading(false);
  };

  const handleEngineStart = () => {
    setIsStarting(true);
    setTimeout(() => {
      setIsStarting(false);
      setShowPitMenu(true);
    }, 1500); 
  };

  const handleNavigationHome = (section: SectionType) => {
    setTargetSection(section);
    setShowPitMenu(false);
    setIsNavigating(true);
  };

  const onNavigationFinish = () => {
    setIsNavigating(false);
    setSection(targetSection);
    
    // O segredo está aqui: forçar o scroll após o loader sair
    const targetId = targetSection === "home" ? "root" : targetSection;
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const slashIn: Variants = {
    hidden: { x: -100, opacity: 0, skewX: 20 },
    visible: (custom: number = 0) => ({
      x: 0, 
      opacity: 1, 
      skewX: 0,
      transition: { delay: custom, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const engineButtonVariants: Variants = {
    idle: { scale: 1, boxShadow: "0px 0px 0px rgba(255, 0, 29, 0)" },
    hover: { scale: 1.05, boxShadow: "0px 10px 30px rgba(255, 0, 29, 0.4)" },
    cranking: {
      scale: [1, 1.02, 0.98, 1.01, 1],
      x: [0, -3, 3, -2, 2, 0],
      backgroundColor: ["#FF001D", "#8a000e", "#FF001D"],
      transition: { duration: 0.1, repeat: Infinity }
    }
  };

  const menuContainerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, scale: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    exit: { opacity: 0, scale: 1.1, filter: "blur(10px)" }
  };

  const menuItemVariants: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {(isLoading || isNavigating) && (
            <SpeedLoader onFinish={isLoading ? handleInitialLoadFinish : onNavigationFinish} />
        )}
      </AnimatePresence>

      <motion.section
        id="home"
        className="w-full h-screen bg-white flex flex-col justify-center px-6 relative overflow-hidden"
        initial="hidden"
        animate="visible"
      >
        <div className="absolute top-0 right-0 w-3/4 md:w-[45%] h-full bg-[#f4f4f4] -skew-x-12 translate-x-20 md:translate-x-32 z-0 border-l-4 border-[#FF001D]/10"></div>
        <motion.div 
          className="absolute inset-0 z-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
          animate={{ backgroundPosition: ['0px 0px', '-60px 60px'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="max-w-7xl w-full mx-auto relative z-10">
          <div className="flex flex-col items-start">
            
            <motion.div variants={slashIn} custom={0.2} className="flex items-center gap-3 mb-4 pl-1">
              <Gauge size={18} className="text-[#FF001D] animate-pulse" />
              <span className="font-['Orbitron'] text-[#FF001D] font-bold tracking-[0.3em] uppercase text-xs md:text-sm">
                SYSTEM READY // {t.title}
              </span>
            </motion.div>

            <div className="relative z-20">
              <motion.h1 variants={slashIn} custom={0.4} className="font-['Orbitron'] text-6xl md:text-[9rem] font-black italic uppercase leading-[0.85] tracking-tighter text-[#111111]">
                NATHANAEL
              </motion.h1>
              <motion.h1 variants={slashIn} custom={0.5} className="font-['Orbitron'] text-6xl md:text-[9rem] font-black italic uppercase leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#555] to-transparent">
                SECUNDO
              </motion.h1>
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-6 items-start z-20">
              <motion.div 
                initial={{ height: 0 }} animate={{ height: "120px" }} transition={{ delay: 0.8 }}
                className="hidden md:block w-2 bg-[#FF001D] skew-x-[-12deg]"
              />
              <motion.p 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}
                className="font-['Manrope'] text-[#444] text-lg md:text-xl font-semibold max-w-xl leading-relaxed tracking-wide"
              >
                {t.sub}
              </motion.p>
            </div>

            <div className="mt-16 relative z-30">
              <motion.button
                onClick={handleEngineStart}
                disabled={isStarting}
                variants={engineButtonVariants}
                initial="idle"
                whileHover={isStarting ? "cranking" : "hover"}
                animate={isStarting ? "cranking" : "idle"}
                className="group relative inline-flex items-center justify-center px-12 py-6 bg-[#FF001D] overflow-hidden font-['Orbitron'] font-black italic uppercase text-white tracking-widest text-xl skew-x-[-12deg] border-b-4 border-[#b30014] active:border-b-0 active:translate-y-1 transition-all select-none shadow-2xl cursor-pointer"
              >
                <span className="relative skew-x-[12deg] flex items-center gap-3 z-10">
                  {isStarting ? <>IGNITION SEQUENCE <Zap className="animate-bounce" /></> : <>START ENGINE <ChevronRight /></>}
                </span>
                <span className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out"></span>
              </motion.button>
            </div>

          </div>
        </div>

        <AnimatePresence>
            {showPitMenu && (
                <motion.div 
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowPitMenu(false)}
                >
                    <motion.div 
                        className="bg-white w-full max-w-4xl p-8 md:p-12 relative border-y-8 border-[#FF001D] skew-x-[-2deg] shadow-[0_0_50px_rgba(255,0,29,0.3)]"
                        variants={menuContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <PitButton 
                                title="TELEMETRY" 
                                subtitle="Sobre Mim" 
                                icon={<User size={32} />} 
                                onClick={() => handleNavigationHome("about")} 
                                variants={menuItemVariants}
                            />
                            <PitButton 
                                title="TRACK RECORD" 
                                subtitle="Projetos" 
                                icon={<Flag size={32} />} 
                                onClick={() => handleNavigationHome("projects")} 
                                variants={menuItemVariants}
                            />
                            <PitButton 
                                title="RADIO CHECK" 
                                subtitle="Contato" 
                                icon={<Mail size={32} />} 
                                onClick={() => handleNavigationHome("contact")} 
                                variants={menuItemVariants}
                            />
                             <PitButton 
                                title="PADDOCK" 
                                subtitle="Home" 
                                icon={<Map size={32} />} 
                                onClick={() => handleNavigationHome("home")}
                                variants={menuItemVariants}
                            />
                        </div>
                        <button 
                            className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white font-['Orbitron'] text-sm tracking-widest uppercase mt-8 transition-colors"
                            onClick={() => setShowPitMenu(false)}
                        >
                            [ CANCEL STRATEGY ]
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
      </motion.section>
    </>
  );
}

function PitButton({ title, subtitle, icon, onClick, variants }: any) {
    return (
        <motion.button
            variants={variants}
            onClick={onClick}
            className="group flex items-center gap-6 p-6 border-2 border-gray-100 hover:border-[#FF001D] bg-gray-50 hover:bg-black transition-all duration-300 text-left relative overflow-hidden w-full cursor-pointer"
        >
            <div className="p-4 bg-white border border-gray-200 group-hover:bg-[#FF001D] group-hover:text-white group-hover:border-[#FF001D] transition-colors rounded-sm shadow-sm">
                {icon}
            </div>
            <div>
                <h3 className="font-['Orbitron'] font-black text-2xl italic text-[#111] group-hover:text-white uppercase leading-none mb-1 transition-colors">
                    {title}
                </h3>
                <p className="font-['Manrope'] font-bold text-gray-400 group-hover:text-[#FF001D] uppercase text-sm tracking-widest transition-colors">
                    {subtitle}
                </p>
            </div>
            <div className="absolute right-0 top-0 h-full w-2 bg-[#FF001D] translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </motion.button>
    );
}