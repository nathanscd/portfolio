import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, ChevronRight, Activity, MapPin, Cpu, Network } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function Home({ setSection }: { setSection: (val: any) => void }) {
  const { t } = useLang();
  const [engineStatus, setEngineStatus] = useState<"idle" | "cranking" | "ready">("idle");

  const startIgnition = () => {
    setEngineStatus("cranking");
    setTimeout(() => {
      setEngineStatus("ready");
    }, 2000);
  };

  return (
    <div className="bg-white">
      {/* SEÇÃO 01: HERO / PILOT PROFILE */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-[1500px] w-full mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="relative group">
              <div className="absolute -inset-4 border border-gray-100 group-hover:border-[#FF001D] transition-colors duration-500 skew-x-[-2deg]" />
              <img src="PFP.jpeg" className="w-full contrast-125 brightness-90 relative z-10" />
              <div className="absolute -bottom-6 -left-6 z-20 bg-[#FF001D] text-white p-6 skew-x-[-15deg] shadow-2xl">
                 <div className="skew-x-[15deg]">
                    <span className="block font-['Orbitron'] text-5xl font-black leading-none">{t.home.driver_number}</span>
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">{t.home.driver_unit}</span>
                 </div>
              </div>
            </motion.div>
            <div className="flex flex-col gap-1 border-l-4 border-black pl-8 pt-4">
              <div className="flex items-center gap-2 text-gray-400">
                 <MapPin size={14} className="text-[#FF001D]" />
                 <span className="font-['Orbitron'] text-[10px] font-bold tracking-widest uppercase">{t.home.hometown_label}</span>
              </div>
              <h3 className="font-['Orbitron'] text-2xl font-black italic uppercase text-[#111]">{t.home.hometown_value}</h3>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-8 bg-black/5 px-5 py-2.5 border-r-4 border-[#FF001D] w-fit">
              <Gauge size={20} className="text-[#FF001D] animate-pulse" />
              <span className="font-['Orbitron'] text-[#111] font-black tracking-[0.4em] uppercase text-[10px]">{t.home.telemetry_status}</span>
            </div>
            <h1 className="font-['Orbitron'] text-6xl md:text-[8.5rem] font-black italic uppercase leading-[0.75] tracking-tighter text-[#111]">{t.home.first_name}</h1>
            <h1 className="font-['Orbitron'] text-6xl md:text-[8.5rem] font-black italic uppercase leading-[0.75] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#111] to-[#FF001D]">{t.home.last_name}</h1>
            <p className="mt-10 font-['Manrope'] text-[#555] text-xl font-semibold max-w-lg leading-relaxed border-l-2 border-gray-100 pl-6">{t.home.role_description}</p>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-2 order-3">
          </div>
        </div>
      </section>

      {/* SEÇÃO 02: PERFORMANCE TELEMETRY */}
      <section className="py-32 px-6 bg-white relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-2 h-2 bg-[#FF001D] rounded-full animate-ping" />
            <h2 className="font-['Orbitron'] text-xs font-black italic uppercase tracking-[0.5em] text-[#111]">{t.home.stats_label}</h2>
          </div>

          <div className="flex flex-col border-t border-gray-200">
            <LeclercStatCard label={t.home.stat_semester} value="05" sub={t.home.stat_semester_sub} />
            <LeclercStatCard label={t.home.stat_reduction} value="63%" sub={t.home.stat_reduction_sub} />
            <LeclercStatCard label={t.home.stat_economy} value="U$600" sub={t.home.stat_economy_sub} />
          </div>
        </div>
      </section>

      {/* SEÇÃO 03: TECHNICAL CORE */}
      <section className="bg-[#050505] py-40 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2">
                <div className="w-12 h-[1px] bg-[#FF001D]" />
                <span className="font-['Orbitron'] text-[#FF001D] font-black tracking-[0.5em] text-[10px] uppercase">{t.about.skills_title}</span>
              </div>
              <h2 className="font-['Orbitron'] text-6xl md:text-8xl text-white font-black italic uppercase leading-none">
                TECHNICAL<br/><span className="text-white/20">TELEMETRY</span>
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="p-8 border-l border-white/10 bg-white/[0.02] backdrop-blur-3xl group hover:bg-white/[0.05] transition-all text-left">
                <Cpu className="text-[#FF001D] mb-6 group-hover:scale-110 transition-transform" size={40} />
                <span className="block font-['Orbitron'] text-white text-lg font-black tracking-tighter">ENGINEERING</span>
                <span className="text-white/30 text-[9px] font-bold tracking-[0.3em] uppercase italic">Backend Systems</span>
              </div>
              <div className="p-8 border-l border-white/10 bg-white/[0.02] backdrop-blur-3xl group hover:bg-white/[0.05] transition-all text-left">
                <Network className="text-[#FF001D] mb-6 group-hover:scale-110 transition-transform" size={40} />
                <span className="block font-['Orbitron'] text-white text-lg font-black tracking-tighter">INTERFACE</span>
                <span className="text-white/30 text-[9px] font-bold tracking-[0.3em] uppercase italic">Frontend Mastery</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 border border-white/5">
            {['React', 'TypeScript', 'SQL Server', 'Python', 'Docker', 'AWS', 'C#', 'PostgreSQL'].map((tech) => (
              <div key={tech} className="relative aspect-square md:aspect-auto md:h-48 border border-white/5 flex flex-col items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-[#FF001D] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                <span className="font-['Orbitron'] text-white/40 group-hover:text-white font-black italic text-xl tracking-[0.2em] relative z-10 transition-all">
                  {tech}
                </span>
                <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                   <div className="h-[1px] w-8 bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 04: ENGINE ROOM */}
      <section className="bg-[#FF001D] py-40 px-6 flex flex-col items-center text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 font-['Orbitron'] text-[20rem] font-black italic text-black whitespace-nowrap pointer-events-none select-none">
          SECUNDO 16 SECUNDO 16
        </div>
        
        <div className="relative z-10 space-y-12 max-w-2xl w-full">
          <h2 className="font-['Orbitron'] text-4xl md:text-6xl text-white font-black italic uppercase tracking-tighter">{t.home.start_engine}</h2>
          
          <AnimatePresence mode="wait">
            {engineStatus === "idle" && (
              <motion.button 
                key="idle-btn"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={startIgnition}
                className="group w-full flex items-center justify-center gap-6 bg-white text-[#FF001D] px-12 py-6 skew-x-[-12deg] hover:bg-black hover:text-white transition-all shadow-2xl"
              >
                <div className="skew-x-[12deg] flex items-center gap-4 font-['Orbitron'] font-black italic tracking-[0.2em]">
                  {t.home.start_engine} <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.button>
            )}

            {engineStatus === "cranking" && (
              <motion.div 
                key="cranking-ui"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <Activity className="text-white animate-spin" size={48} />
                <span className="font-['Orbitron'] text-white font-black uppercase tracking-widest">{t.home.cranking}</span>
              </motion.div>
            )}

            {engineStatus === "ready" && (
              <motion.div 
                key="nav-options"
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
              >
                <button onClick={() => setSection("projects")} className="py-6 bg-white text-black font-['Orbitron'] font-black italic uppercase text-xs tracking-widest skew-x-[-10deg] hover:bg-black hover:text-white transition-all"><span className="skew-x-[10deg] block">{t.nav.projects}</span></button>
                <button onClick={() => setSection("about")} className="py-6 bg-white text-black font-['Orbitron'] font-black italic uppercase text-xs tracking-widest skew-x-[-10deg] hover:bg-black hover:text-white transition-all"><span className="skew-x-[10deg] block">{t.nav.about}</span></button>
                <button onClick={() => setSection("contact")} className="py-6 bg-white text-black font-['Orbitron'] font-black italic uppercase text-xs tracking-widest skew-x-[-10deg] hover:bg-black hover:text-white transition-all"><span className="skew-x-[10deg] block">{t.nav.contact}</span></button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

function LeclercStatCard({ label, value, sub }: any) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-gray-200 group transition-all duration-500 hover:bg-[#f9f9f9] px-4">
      <div className="order-2 md:order-1 space-y-1 text-left">
        <span className="block font-['Orbitron'] text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] group-hover:text-[#FF001D] transition-colors">{label}</span>
        <p className="font-['Orbitron'] text-[10px] font-bold text-gray-300 italic group-hover:text-gray-400 uppercase tracking-wider">{sub}</p>
      </div>
      <div className="order-1 md:order-2 mb-4 md:mb-0">
        <span className="font-['Orbitron'] text-7xl md:text-8xl font-black italic text-[#111] leading-none tracking-tighter block group-hover:scale-105 transition-transform origin-right">
          {value}
        </span>
      </div>
    </div>
  );
}