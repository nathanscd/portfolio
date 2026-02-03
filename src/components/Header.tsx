import React, { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X, Activity, Github, Linkedin, Instagram, ArrowRight, Radio, Gauge, Cpu } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLang } from "../context/LangContext";

type Props = {
  setSection: (value: "home" | "about" | "projects" | "contact") => void;
};

const menuVariants: Variants = {
  initial: { 
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  },
  animate: { 
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  },
  exit: { 
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  }
};

const containerVars: Variants = {
  initial: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
  open: { transition: { delayChildren: 0.4, staggerChildren: 0.08, staggerDirection: 1 } }
};

const linkEntranceVars: Variants = {
  initial: { y: 120, opacity: 0, skewY: 10 },
  open: { 
    y: 0, 
    opacity: 1, 
    skewY: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function Navbar({ setSection }: Props) {
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
        className={`fixed top-0 left-0 w-full px-8 md:px-16 flex justify-between items-center z-[90] transition-all duration-700 ${
            open ? "h-24 text-white" : 
            scrolled ? "h-20 bg-white/95 backdrop-blur-3xl border-b border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]" : 
            "h-28 bg-transparent"
        }`}
      >
        <div className="flex items-center gap-10">
           <motion.div 
             animate={{ opacity: open ? 0 : 1 }} 
             className={`flex items-center gap-4 transition-all duration-500 ${scrolled && !open ? 'bg-gray-50/80 px-5 py-2.5 border border-gray-100 rounded-sm' : ''}`}
           >
              <div className="w-2 h-2 bg-[#FF001D] rounded-full animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.5)]" />
              <LanguageSwitcher className="font-['Orbitron'] font-black text-[11px] text-[#111] tracking-[0.3em] uppercase hover:text-[#FF001D] transition-colors" />
           </motion.div>
           
           <div className={`hidden xl:flex items-center gap-4 transition-opacity duration-700 ${open ? "opacity-0" : "opacity-100"}`}>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex items-center gap-3">
                <Radio size={14} className="text-[#FF001D] animate-pulse" />
                <span className="font-['Orbitron'] text-[9px] text-gray-400 tracking-[0.4em] uppercase font-black">Uplink: Active</span>
              </div>
           </div>
        </div>

        <button 
          className="group flex items-center gap-6 font-['Orbitron'] font-black text-xs md:text-sm tracking-[0.5em] z-[100] relative cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className={`hidden md:block transition-colors duration-500 ${open ? "text-white" : "text-[#111] group-hover:text-[#FF001D]"}`}>
            {open ? "CLOSE_DOCK" : (t.nav?.menu_open || "OPEN_MENU")}
          </span>
          <div className={`relative flex items-center justify-center w-14 h-14 border-2 transition-all duration-700 skew-x-[-12deg] ${
            open ? "border-white bg-white text-black rotate-90" : "border-[#111] group-hover:border-[#FF001D] group-hover:bg-[#FF001D] group-hover:text-white"
          }`}>
            <div className="skew-x-[12deg]">
              {open ? <X size={24} /> : <Menu size={24} />}
            </div>
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
            className="fixed inset-0 bg-[#050505] z-[80] flex flex-col justify-center px-8 md:px-24 overflow-hidden"
          >
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
            />
            
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF001D]/5 to-transparent pointer-events-none" />

            <div className="max-w-[1800px] w-full mx-auto grid lg:grid-cols-12 h-full py-40 relative z-10">
                <div className="lg:col-span-8 flex flex-col justify-center relative z-20">
                    <motion.div variants={containerVars} initial="initial" animate="open" exit="initial" className="flex flex-col items-start gap-4">
                        <MenuLink title={t.nav?.home || "HOME"} number="01" onClick={() => handleNavigation("home")} setHovered={setHoveredLink} />
                        <MenuLink title={t.nav?.about || "ABOUT"} number="02" onClick={() => handleNavigation("about")} setHovered={setHoveredLink} />
                        <MenuLink title={t.nav?.projects || "PROJECTS"} number="03" onClick={() => handleNavigation("projects")} setHovered={setHoveredLink} />
                        <MenuLink title={t.nav?.contact || "CONTACT"} number="04" onClick={() => handleNavigation("contact")} setHovered={setHoveredLink} />
                    </motion.div>
                </div>

                <div className="lg:col-span-4 hidden lg:flex flex-col justify-between border-l-2 border-white/5 pl-16 py-16 relative z-20">
                    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="space-y-16">
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                              <Gauge size={16} className="text-[#FF001D]" />
                              <h4 className="font-['Orbitron'] text-[#FF001D] text-[11px] font-black uppercase tracking-[0.4em]">Coordinates</h4>
                            </div>
                            <p className="font-mono text-white/40 text-xs leading-relaxed border-l-2 border-[#FF001D]/30 pl-6 uppercase tracking-widest">
                              Base: Fortaleza, CE - Brazil<br/>
                              <span className="text-white/60">Lat:</span> -3.7319<br/>
                              <span className="text-white/60">Long:</span> -38.5267
                            </p>
                        </div>
                        
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                              <Cpu size={16} className="text-[#FF001D]" />
                              <h4 className="font-['Orbitron'] text-[#FF001D] text-[11px] font-black uppercase tracking-[0.4em]">Uplink Channels</h4>
                            </div>
                            <div className="flex gap-6">
                                <SocialLink href="https://github.com/nathanscd"><Github size={22}/></SocialLink>
                                <SocialLink href="https://linkedin.com/in/nathanscd"><Linkedin size={22}/></SocialLink>
                                <SocialLink href="https://instagram.com/nathansscd"><Instagram size={22}/></SocialLink>
                            </div>
                        </div>
                    </motion.div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-[2px] bg-[#FF001D]" />
                        <span className="font-['Orbitron'] text-[10px] text-white/20 uppercase tracking-[0.5em]">Scuderia Secundo</span>
                      </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full pointer-events-none opacity-[0.04] z-0 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.h1 
                            key={hoveredLink || "default"}
                            initial={{ y: "100%", opacity: 0, skewY: 10 }}
                            animate={{ y: "0%", opacity: 1, skewY: 0 }}
                            exit={{ y: "-100%", opacity: 0, skewY: -10 }}
                            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                            className="font-['Orbitron'] text-[22vw] leading-none font-black italic text-white whitespace-nowrap select-none"
                        >
                            {hoveredLink || "NAV"}
                        </motion.h1>
                    </AnimatePresence>
                </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-12 left-0 w-full px-8 md:px-16 flex justify-between items-end pointer-events-none z-30">
                <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-[#FF001D] rounded-full animate-ping" />
                    <span className="font-mono text-[11px] text-white/30 uppercase tracking-[0.4em] font-black">Telemetry Feed: Active</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="font-mono text-[10px] text-white/10 uppercase tracking-widest">v2.0.4-STABLE</span>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuLink({ title, number, onClick, setHovered }: { title: string, number: string, onClick: () => void, setHovered: (v: string | null) => void }) {
    return (
        <motion.div variants={linkEntranceVars} className="relative overflow-visible" onMouseEnter={() => setHovered(title)} onMouseLeave={() => setHovered(null)}>
            <button onClick={onClick} className="group flex items-center gap-8 outline-none text-left relative py-2 px-4 -ml-4">
                <span className="font-['Orbitron'] text-sm font-black text-[#FF001D] opacity-30 group-hover:opacity-100 transition-all duration-500 skew-x-[-15deg]">
                    {number}
                </span>
                
                <div className="relative h-20 md:h-28 lg:h-[7.5rem] overflow-hidden inline-block px-4">
                    <div className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                        <span className="block font-['Orbitron'] text-5xl md:text-7xl lg:text-[7.5rem] font-black italic uppercase text-white leading-none tracking-tighter h-20 md:h-28 lg:h-[7.5rem] flex items-center transition-all duration-500 group-hover:opacity-0">
                            {title}
                        </span>
                        <span className="block font-['Orbitron'] text-5xl md:text-7xl lg:text-[7.5rem] font-black italic uppercase text-[#FF001D] leading-none tracking-tighter h-20 md:h-28 lg:h-[7.5rem] flex items-center skew-x-[-12deg] group-hover:skew-x-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                          {title}
                        </span>
                    </div>
                </div>

                <div className="opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-out flex items-center h-20 md:h-28 lg:h-[7.5rem]">
                    <ArrowRight size={48} className="text-[#FF001D] drop-shadow-[0_0_15px_rgba(255,0,0,0.4)]" />
                </div>
            </button>
        </motion.div>
    );
}

function SocialLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noreferrer" className="w-16 h-16 flex items-center justify-center border-2 border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-[#FF001D] hover:border-[#FF001D] hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 group overflow-hidden relative skew-x-[-12deg]">
            <div className="relative z-10 group-hover:scale-125 transition-transform skew-x-[12deg]">{children}</div>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </a>
    );
}
