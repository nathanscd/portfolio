import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X, Gauge, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  setSection: (value: "home" | "about" | "projects" | "contact") => void;
};

export default function Navbar({ setSection }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (section: "home" | "about" | "projects" | "contact") => {
    setSection(section);
    setOpen(false);
    const targetId = section === "home" ? "root" : section;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full h-20 px-6 md:px-12 flex justify-between items-center z-[50] transition-all duration-500 ${
          scrolled 
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 h-16" 
            : "bg-transparent h-20"
        }`}
      >
        <div className="flex items-center gap-4">
           <div className={`p-2 border-l-2 border-[#FF001D] bg-white/5 transition-opacity ${scrolled ? 'opacity-100' : 'opacity-80'}`}>
              <LanguageSwitcher className="font-['Orbitron'] font-black text-[10px] text-white tracking-[0.2em] uppercase hover:text-[#FF001D] transition-colors" />
           </div>
           <div className="hidden lg:flex items-center gap-2 opacity-40">
              <Activity size={12} className="text-[#FF001D]" />
              <span className="font-['Orbitron'] text-[8px] text-white tracking-widest uppercase">System Online</span>
           </div>
        </div>

        <button 
          className="group flex items-center gap-4 font-['Orbitron'] font-black text-xs md:text-sm text-white tracking-[0.4em] transition-all"
          onClick={() => setOpen(true)}
        >
          <span className="hidden md:block group-hover:text-[#FF001D] transition-colors">OPEN MENU</span>
          <div className="relative flex items-center justify-center">
            <Menu className="w-8 h-8 text-white group-hover:text-[#FF001D] transition-colors" strokeWidth={1.5} />
            <motion.div 
              className="absolute -inset-2 border border-[#FF001D]/20 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop com desfoque pesado */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#050505f2] backdrop-blur-2xl z-[60]"
              onClick={() => setOpen(false)}
            />

            {/* Menu Drawer Estilo Racing */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full md:w-[600px] h-full bg-[#0a0a0a] z-[70] border-l border-white/5 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Linha Decorativa Superior */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF001D] to-transparent" />

              <div className="flex justify-between items-center p-10">
                <div className="flex items-center gap-3">
                  <Gauge className="text-[#FF001D]" size={20} />
                  <span className="font-['Orbitron'] text-white/30 text-[10px] tracking-[0.5em] uppercase italic">
                    Navigation // Strategy
                  </span>
                </div>
                <button 
                  className="p-3 rounded-full bg-white/5 text-white hover:bg-[#FF001D] transition-all hover:rotate-90 duration-300"
                  onClick={() => setOpen(false)}
                >
                  <X className="w-6 h-6" strokeWidth={2} />
                </button>
              </div>

              <div className="flex flex-col justify-center flex-grow px-12 gap-2">
                <NavButton number="01" label="HOME" onClick={() => handleNavigation("home")} />
                <NavButton number="02" label="SOBRE" onClick={() => handleNavigation("about")} />
                <NavButton number="03" label="PROJETOS" onClick={() => handleNavigation("projects")} />
                <NavButton number="04" label="CONTATO" onClick={() => handleNavigation("contact")} />
              </div>

              <div className="p-10 flex justify-between items-end border-t border-white/5 bg-white/[0.02]">
                <div>
                  <p className="font-['Orbitron'] text-[10px] text-white/20 uppercase tracking-[0.3em] mb-1">Developed by</p>
                  <p className="font-['Orbitron'] text-xs text-white font-bold tracking-widest uppercase">
                    Nathanael Secundo
                  </p>
                </div>
                <span className="font-['Orbitron'] text-[40px] font-black italic text-white/5 leading-none select-none">
                  2026
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavButton({ number, label, onClick }: { number: string, label: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 20 }}
      className="group text-left relative py-4 flex items-center gap-6"
    >
      <span className="font-['Orbitron'] text-sm font-bold text-[#FF001D] opacity-0 group-hover:opacity-100 transition-all">
        {number}
      </span>
      <span className="block font-['Orbitron'] text-5xl md:text-7xl font-black italic text-white/10 uppercase tracking-tighter transition-all duration-300 group-hover:text-white group-hover:italic">
        {label}
      </span>
      <div className="absolute left-0 bottom-2 w-0 h-[2px] bg-[#FF001D] group-hover:w-full transition-all duration-500" />
    </motion.button>
  );
}