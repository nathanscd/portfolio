import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X, Activity, Github, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLang } from "../context/LangContext";

type Props = {
  setSection: (value: "home" | "about" | "projects" | "contact") => void;
};

// Variantes tipadas corretamente
const menuVariants: Variants = {
  initial: { 
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
  },
  animate: { 
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
  },
  exit: { 
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
  }
};

const containerVars: Variants = {
  initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  open: { transition: { delayChildren: 0.3, staggerChildren: 0.05, staggerDirection: 1 } }
};

const linkEntranceVars: Variants = {
  initial: { y: 100, opacity: 0 },
  open: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function Navbar({ setSection }: Props) {
  // @ts-ignore
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  const handleNavigation = (section: "home" | "about" | "projects" | "contact") => {
    setSection(section);
    setOpen(false);
    setTimeout(() => {
      const element = document.getElementById(section === "home" ? "root" : section);
      element?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full px-6 md:px-12 flex justify-between items-center z-[90] transition-all duration-500 ${
            open ? "h-24 mix-blend-difference text-white" : 
            scrolled ? "h-16 bg-black/80 backdrop-blur-xl border-b border-white/10" : 
            "h-24 bg-transparent"
        }`}
      >
        <div className="flex items-center gap-6">
           <motion.div animate={{ opacity: open ? 0 : 1 }} className={`p-2 border-l-2 border-[#FF001D] transition-all ${scrolled && !open ? 'bg-white/5' : ''}`}>
              <LanguageSwitcher className="font-['Orbitron'] font-black text-[10px] text-white tracking-[0.2em] uppercase hover:text-[#FF001D] transition-colors" />
           </motion.div>
           
           <div className={`hidden lg:flex items-center gap-2 transition-opacity duration-500 ${open ? "opacity-0" : "opacity-40"}`}>
              <Activity size={12} className="text-[#FF001D]" />
              <span className="font-['Orbitron'] text-[8px] text-white tracking-widest uppercase">{t.nav?.system_status || "SYSTEM ONLINE"}</span>
           </div>
        </div>

        <button 
          className="group flex items-center gap-4 font-['Orbitron'] font-black text-xs md:text-sm text-white tracking-[0.4em] z-[100] relative cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className="hidden md:block group-hover:text-[#FF001D] transition-colors duration-300">
            {open ? "CLOSE" : (t.nav?.menu_open || "OPEN MENU")}
          </span>
          <div className={`relative flex items-center justify-center w-12 h-12 border transition-all duration-500 ${open ? "border-white rotate-90" : "border-white/20 group-hover:border-[#FF001D]"}`}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-[#080808] z-[80] flex flex-col justify-center px-6 md:px-20 overflow-hidden"
          >
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
            />

            <div className="max-w-[1800px] w-full mx-auto grid lg:grid-cols-12 h-full py-32 relative z-10">
                <div className="lg:col-span-8 flex flex-col justify-center relative z-20">
                    <motion.div variants={containerVars} initial="initial" animate="open" exit="initial" className="flex flex-col items-start gap-0">
                        <MenuLink title={t.nav?.home || "HOME"} number="01" onClick={() => handleNavigation("home")} setHovered={setHoveredLink} />
                        <MenuLink title={t.nav?.about || "ABOUT"} number="02" onClick={() => handleNavigation("about")} setHovered={setHoveredLink} />
                        <MenuLink title={t.nav?.projects || "PROJECTS"} number="03" onClick={() => handleNavigation("projects")} setHovered={setHoveredLink} />
                        <MenuLink title={t.nav?.contact || "CONTACT"} number="04" onClick={() => handleNavigation("contact")} setHovered={setHoveredLink} />
                    </motion.div>
                </div>

                <div className="lg:col-span-4 hidden lg:flex flex-col justify-between border-l border-white/10 pl-12 py-12 relative z-20">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="space-y-12">
                        <div>
                            <h4 className="font-['Orbitron'] text-[#FF001D] text-xs font-black uppercase tracking-widest mb-6">Coordinates</h4>
                            <p className="font-['Manrope'] text-white/60 text-sm leading-relaxed border-l-2 border-white/10 pl-4">
                                Fortaleza, CE - Brazil<br/>
                                <span className="text-[#FF001D]">Lat:</span> -3.7319 // <span className="text-[#FF001D]">Long:</span> -38.5267
                            </p>
                        </div>
                        <div>
                            <h4 className="font-['Orbitron'] text-[#FF001D] text-xs font-black uppercase tracking-widest mb-6">Uplink</h4>
                            <div className="flex gap-4">
                                <SocialLink href="https://github.com/nathanscd"><Github size={20}/></SocialLink>
                                <SocialLink href="https://linkedin.com/in/nathanscd"><Linkedin size={20}/></SocialLink>
                                <SocialLink href="https://instagram.com/nathansscd"><Instagram size={20}/></SocialLink>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 w-full pointer-events-none opacity-[0.06] z-0 overflow-hidden mix-blend-overlay">
                    <AnimatePresence mode="wait">
                        <motion.h1 
                            key={hoveredLink || "default"}
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: "0%", opacity: 1 }}
                            exit={{ y: "-100%", opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                            className="font-['Orbitron'] text-[18vw] leading-none font-black italic text-white whitespace-nowrap"
                        >
                            {hoveredLink || "MENU"}
                        </motion.h1>
                    </AnimatePresence>
                </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="absolute bottom-10 left-0 w-full px-6 md:px-12 flex justify-between items-end pointer-events-none z-30">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FF001D] animate-ping" />
                    <span className="font-['Orbitron'] text-[10px] text-white/40 uppercase tracking-[0.3em]">System_UI v2.0</span>
                </div>
                <div className="h-[1px] w-64 bg-gradient-to-r from-[#FF001D] to-transparent opacity-50" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuLink({ title, number, onClick, setHovered }: { title: string, number: string, onClick: () => void, setHovered: (v: string | null) => void }) {
    return (
        <motion.div variants={linkEntranceVars} className="relative w-full overflow-visible" onMouseEnter={() => setHovered(title)} onMouseLeave={() => setHovered(null)}>
            <button onClick={onClick} className="group flex items-start gap-6 outline-none w-full text-left relative py-2">
                <span className="font-['Orbitron'] text-xs font-bold text-[#FF001D] opacity-40 group-hover:opacity-100 transition-opacity duration-300 pt-3">
                    {number}
                </span>
                
                {/* Altura ajustada para 'auto' para evitar corte, com min-h para garantir tamanho */}
                <div className="relative h-20 md:h-32 lg:h-[7rem] overflow-hidden w-full">
                    <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                        <span className="block font-['Orbitron'] text-5xl md:text-8xl lg:text-[7rem] font-black italic uppercase text-white leading-[1.1] tracking-tighter h-20 md:h-32 lg:h-[7rem] flex items-center">
                            {title}
                        </span>
                        <span className="block font-['Orbitron'] text-5xl md:text-8xl lg:text-[7rem] font-black italic uppercase text-[#FF001D] leading-[1.1] tracking-tighter h-20 md:h-32 lg:h-[7rem] flex items-center skew-x-12 origin-bottom group-hover:skew-x-0 transition-transform duration-500">
                            {title}
                        </span>
                    </div>
                </div>

                <div className="opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out flex items-center h-20 md:h-32 lg:h-[7rem]">
                    <ArrowRight size={50} className="text-[#FF001D]" />
                </div>
            </button>
        </motion.div>
    );
}

function SocialLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm text-white hover:bg-[#FF001D] hover:border-[#FF001D] hover:text-white transition-all duration-300 group overflow-hidden relative">
            <div className="relative z-10 group-hover:scale-110 transition-transform">{children}</div>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </a>
    );
}