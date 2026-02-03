import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Project } from "../data/Projects";
import { 
  X, ExternalLink, Database, Activity, Cpu, 
  Layers, Terminal, ShieldCheck, Gauge, 
  AlertCircle, Globe
} from "lucide-react";

const HandDrawnCircle = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <svg viewBox="0 0 100 100" className={`absolute pointer-events-none ${className}`}>
    <motion.path 
      d="M50,10 C20,10 10,30 10,50 C10,80 30,90 50,90 C80,90 90,70 90,50 C90,20 70,10 50,10 Z" 
      fill="none" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4"
      initial={{ pathLength: 0, opacity: 0 }} 
      whileInView={{ pathLength: 1.1, opacity: 0.4 }} 
      transition={{ duration: 2, delay: delay }}
    />
  </svg>
);

const HandDrawnArrow = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <svg viewBox="0 0 100 50" className={`absolute pointer-events-none ${className}`} style={{ width: 80, height: 40 }}>
    <motion.path 
      d="M10,40 Q50,10 90,25" 
      fill="none" stroke="#FF0000" strokeWidth="2" 
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.6 }}
      transition={{ duration: 1, delay }}
    />
    <motion.path 
      d="M82,18 L90,25 L80,32" 
      fill="none" stroke="#FF0000" strokeWidth="2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.6 }}
      transition={{ delay: delay + 0.8 }}
    />
  </svg>
);

const StickyNote = ({ text, color = "bg-[#ffeb3b]", rotate = "rotate-2", top, left, right, author }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    className={`absolute ${top} ${left} ${right} ${color} text-black p-4 w-44 shadow-[5px_5px_15px_rgba(0,0,0,0.3)] z-30 transform ${rotate} hidden xl:block`}
  >
    <div className="w-10 h-4 bg-white/40 absolute -top-2 left-1/2 -translate-x-1/2 backdrop-blur-sm" />
    <p className="font-mono text-[11px] leading-tight mb-3 font-bold uppercase tracking-tighter">"{text}"</p>
    <div className="flex justify-between items-center border-t border-black/10 pt-2">
      <span className="font-mono text-[8px] opacity-50">ENG_NOTE</span>
      <span className="font-mono text-[9px] font-black">ID: {author}</span>
    </div>
  </motion.div>
);

const TelemetryGrid = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.15] z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#FF000008_1px,transparent_1px),linear-gradient(to_bottom,#FF000008_1px,transparent_1px)] bg-[size:200px_200px]" />
  </div>
);

const EngineerLog = ({ name, role, text, time }: any) => (
  <div className="group relative p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors font-mono text-xs overflow-hidden">
    <div className="absolute top-0 left-0 w-1 h-full bg-racing-red/40 group-hover:bg-racing-red transition-colors" />
    <div className="flex items-center gap-3 mb-2">
      <div className="px-2 py-0.5 bg-racing-red/10 border border-racing-red/20 text-racing-red text-[10px] font-bold">
        {role}
      </div>
      <span className="text-white/40 text-[10px]">{time}</span>
    </div>
    <p className="text-white/70 leading-relaxed uppercase tracking-tight">{text}</p>
    <div className="mt-3 flex items-center gap-2 text-white/20 text-[9px]">
      <Terminal size={10} />
      <span>AUTH_ID: {name}_SECURED</span>
    </div>
  </div>
);

interface ProjectPageProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectPage({ project, onClose }: ProjectPageProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const heroMedia = project.media?.find(m => m.type === 'video') || { type: 'image', src: project.image };
  const galleryImages = project.media?.filter(m => m !== heroMedia) || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-[#050505] text-white selection:bg-[#FF001D] selection:text-white"
    >
      <TelemetryGrid />
      
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 w-full h-[2px] bg-racing-red z-[1001] origin-left shadow-[0_0_20px_#FF0000]" />

      <div className="fixed top-0 left-0 w-full z-[1000] flex justify-between items-center px-8 py-6 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-racing-red font-bold tracking-[0.3em] uppercase">Technical Dossier</span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-white text-xs opacity-40">REF:</span>
              <span className="font-mono text-white text-xs tracking-widest">SF24-{String(project.id).padStart(3, '0')}</span>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <div className="hidden md:flex flex-col">
            <span className="font-mono text-[10px] text-white/40 uppercase">Status</span>
            <span className="font-mono text-[10px] text-green-500 flex items-center gap-1 uppercase font-bold">
              <ShieldCheck size={10} /> Verified & Optimized
            </span>
          </div>
        </div>
        
        <button 
          onClick={onClose} 
          className="group relative flex items-center gap-3 bg-white/5 border border-white/10 text-white px-6 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-racing-red hover:border-racing-red transition-all overflow-hidden"
        >
          <span className="relative z-10">Exit Analysis</span>
          <X size={14} className="relative z-10" />
          <div className="absolute inset-0 bg-racing-red translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-24">
        <StickyNote 
          text="Check the aero balance on this section. Looks aggressive." 
          author="LEC_16" 
          top="top-40" 
          right="right-10" 
          rotate="rotate-6" 
          color="bg-red-500 text-white"
        />

        <div className="relative mb-20">
          <HandDrawnCircle className="w-32 h-32 -top-10 -left-10 opacity-40" delay={0.5} />
          <HandDrawnArrow className="top-1/2 -right-20 rotate-12" delay={1} />
          
          <div className="relative aspect-[21/9] w-full border border-white/10 bg-black overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
            <motion.div layoutId={`image-${project.id}`} className="w-full h-full">
               {heroMedia.type === 'video' ? (
                   <video src={heroMedia.src} poster={project.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" autoPlay muted loop playsInline />
               ) : (
                   <img src={heroMedia.src} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
               )}
            </motion.div>
            
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
              <div className="px-3 py-1 bg-racing-red text-white font-mono text-[10px] font-black uppercase tracking-widest skew-x-[-12deg]">
                Classified
              </div>
              <div className="px-3 py-1 bg-white/10 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-tighter">
                Scan_ID: 0x882F
              </div>
            </div>

            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-racing-red/50 flex items-center justify-center bg-black/50 backdrop-blur-md">
                <Gauge size={20} className="text-racing-red animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-white/40 uppercase">Visual Stream</span>
                <span className="font-mono text-[10px] text-white uppercase font-bold tracking-widest">Live Telemetry Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 relative">
          <StickyNote 
            text="The architecture here is solid. No latency detected." 
            author="SAI_55" 
            top="top-1/2" 
            left="-left-20" 
            rotate="-rotate-3" 
            color="bg-zinc-200"
          />

          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[1px] bg-racing-red" />
                <span className="font-mono text-xs text-racing-red uppercase tracking-[0.4em] font-bold">Executive Summary</span>
              </div>
              <motion.h1 
                layoutId={`title-${project.id}`}
                className="font-mono text-4xl md:text-6xl font-black uppercase leading-none text-white mb-8 tracking-tighter"
              >
                {project.title}
              </motion.h1>
              <div className="relative">
                <p className="font-mono text-sm md:text-base text-white/60 leading-relaxed uppercase tracking-tight max-w-2xl">
                  {project.description}
                </p>
                <div className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-racing-red/40 to-transparent" />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EngineerLog 
                name="MARANELLO_AI" 
                role="Performance" 
                time="04:12:01" 
                text="Runtime optimization complete. Memory footprint reduced by 24% through advanced tree-shaking." 
              />
              <EngineerLog 
                name="V_ROSSI" 
                role="UX_ARCH" 
                time="06:45:22" 
                text="Interaction latency verified at < 8ms. Visual feedback loops synchronized with hardware refresh rates." 
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/[0.03] border border-white/10 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-racing-red/5 blur-3xl" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-racing-red/20" />
              
              <h3 className="font-mono text-xs uppercase text-white mb-8 flex items-center gap-3 font-bold tracking-widest">
                <Layers size={14} className="text-racing-red" /> System Specifications
              </h3>
              
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-white/30 uppercase">Core Technologies</span>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 font-mono text-[10px] text-white/80 uppercase hover:border-racing-red transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-white/30 uppercase">Deployment Date</span>
                    <span className="font-mono text-xs text-white uppercase">{project.date}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-white/30 uppercase">Version Control</span>
                    <a href={project.github} target="_blank" className="font-mono text-xs text-racing-red hover:text-white transition-colors flex items-center gap-2 uppercase">
                      Repository <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    className="mt-8 w-full flex items-center justify-center gap-3 bg-racing-red text-white py-4 font-mono text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500"
                  >
                    Access Live System <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
            
            <div className="mt-6 p-4 border border-yellow-500/20 bg-yellow-500/5 flex gap-4">
              <AlertCircle size={16} className="text-yellow-500 shrink-0" />
              <p className="font-mono text-[10px] text-yellow-500/80 uppercase leading-tight">
                Warning: Experimental rendering techniques detected. Hardware acceleration recommended for optimal telemetry sync.
              </p>
            </div>
          </div>
        </div>

        {galleryImages.length > 0 && (
          <div className="pt-20 border-t border-white/5 relative">
            <HandDrawnArrow className="top-10 left-1/2 -translate-x-1/2 -rotate-90 opacity-20" delay={2} />
            
            <div className="flex items-center justify-between mb-12">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-racing-red uppercase font-bold tracking-widest">Visual Evidence</span>
                <h3 className="font-mono text-xl text-white uppercase font-black">Component Breakdown</h3>
              </div>
              <div className="hidden md:flex items-center gap-4 font-mono text-[10px] text-white/20">
                <span>TOTAL_ASSETS: {galleryImages.length}</span>
                <div className="w-12 h-[1px] bg-white/10" />
                <span>ENCRYPTION: AES-256</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {galleryImages.map((media, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-racing-red/40" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-racing-red/40" />
                  
                  <div className="relative aspect-video bg-black border border-white/10 overflow-hidden">
                    {media.type === 'video' ? (
                      <video src={media.src} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                    ) : (
                      <img src={media.src} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span className="font-mono text-[10px] text-white uppercase tracking-widest bg-racing-red px-2 py-1">
                        Fig_{String(idx + 1).padStart(2, '0')} // Analysis
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="py-32 flex flex-col items-center justify-center gap-8 relative">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent top-0" />
          <div className="w-16 h-16 border border-white/10 flex items-center justify-center rotate-45 group hover:border-racing-red transition-colors duration-500">
            <Activity size={24} className="text-white/20 group-hover:text-racing-red -rotate-45 transition-colors" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.5em]">End of Technical Report</p>
            <p className="font-mono text-[9px] text-racing-red/40 uppercase">Confidential - Maranello Digital Division</p>
          </div>
          <button 
            onClick={onClose} 
            className="mt-4 font-mono text-[11px] text-white/40 hover:text-racing-red uppercase tracking-[0.3em] transition-colors border-b border-transparent hover:border-racing-red pb-1"
          >
            Return to Command Center
          </button>
        </div>
      </div>
    </motion.div>
  );
}
