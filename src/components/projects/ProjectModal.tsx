import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Github, ExternalLink, Activity, Info, Boxes } from "lucide-react"; 

type MediaItem = {
  type: "image" | "video";
  src: string;
};

type Project = {
  id: string | number;
  title: string;
  tech: string[];
  description: string;
  date?: string; 
  media?: MediaItem[];
  image: string; 
  link?: string;
  github?: string;
};

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const [current, setCurrent] = useState(0);

  if (!project) return null;

  const mediaList = project.media || [{ type: "image", src: project.image }];

  const next = () => setCurrent((p) => (p + 1 < mediaList.length ? p + 1 : 0));
  const prev = () => setCurrent((p) => (p - 1 >= 0 ? p - 1 : mediaList.length - 1));

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505f2] backdrop-blur-xl p-4 md:p-8" onClick={onClose}>
      <motion.div
        className="relative w-full max-w-5xl bg-white border-x border-[#ffffff1a] flex flex-col h-full max-h-[85vh] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-sm"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF001D] to-transparent z-50" />

        <button 
          className="absolute top-0 right-0 z-50 p-5 bg-white text-[#111] hover:bg-[#FF001D] hover:text-white transition-all duration-300"
          onClick={onClose}
        >
          <X size={22} strokeWidth={2.5} />
        </button>

        <div className="w-full bg-[#080808] flex items-center justify-center relative flex-[2.5] overflow-hidden group">
          <div className="absolute inset-0 z-10 pointer-events-none border-b border-[#ffffff0d]" 
               style={{ backgroundImage: 'linear-gradient(#ffffff03 1px, transparent 1px), linear-gradient(90deg, #ffffff03 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="w-full h-full absolute inset-0 flex items-center justify-center p-4 md:p-10"
              initial={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            >
              {mediaList[current].type === "video" ? (
                <video 
                  src={mediaList[current].src} 
                  autoPlay loop muted 
                  className="w-full h-full object-contain rounded-sm drop-shadow-[0_20px_50px_rgba(255,0,29,0.2)]" 
                />
              ) : (
                <img 
                  src={mediaList[current].src} 
                  alt="Project Preview" 
                  className="w-full h-full object-contain rounded-sm drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
                />
              )}
            </motion.div>
          </AnimatePresence>

          {mediaList.length > 1 && (
            <div className="absolute bottom-6 flex items-center gap-4 z-20 bg-[#00000080] backdrop-blur-md p-2 rounded-full border border-[#ffffff1a]">
               <button onClick={(e) => {e.stopPropagation(); prev()}} className="p-2 text-white/70 hover:text-[#FF001D] transition-colors"><ChevronLeft size={20}/></button>
               <span className="text-[10px] font-['Orbitron'] text-white/40 tracking-widest">{current + 1} / {mediaList.length}</span>
               <button onClick={(e) => {e.stopPropagation(); next()}} className="p-2 text-white/70 hover:text-[#FF001D] transition-colors"><ChevronRight size={20}/></button>
            </div>
          )}

          <div className="absolute top-6 left-8 flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FF001D] rounded-sm">
                <Activity size={14} className="text-white animate-pulse" />
                <span className="font-['Orbitron'] text-[9px] text-white font-black tracking-[0.2em] uppercase text-nowrap">Live View</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-8 md:px-12 md:py-10 flex flex-col flex-[1.5] overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-gray-100 pb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#FF001D]">
                <Boxes size={14} />
                <span className="font-['Orbitron'] text-[10px] font-black tracking-[0.3em] uppercase">Architecture Report</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-['Orbitron'] font-black uppercase italic leading-none tracking-tighter text-[#111]">{project.title}</h2>
              {project.date && <span className="text-[11px] font-medium text-gray-400 tracking-[0.1em] uppercase block">{project.date}</span>}
            </div>

            <div className="flex flex-wrap gap-1.5 md:justify-end">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 bg-[#111] text-[9px] font-['Orbitron'] font-black uppercase tracking-widest text-white rounded-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3 space-y-5">
              <div className="flex items-center gap-2 text-gray-300">
                <Info size={14} />
                <span className="font-['Orbitron'] text-[9px] font-black uppercase tracking-widest">Core Narrative</span>
              </div>
              <p className="font-['Manrope'] text-gray-600 leading-relaxed text-base font-medium pl-6 border-l-2 border-[#FF001D]">
                {project.description}
              </p>
            </div>

            <div className="md:col-span-2 flex flex-col gap-3">
              {project.github && (
                <a href={project.github} target="_blank" className="w-full py-4 bg-transparent border border-[#11111120] text-[#111] text-center font-['Orbitron'] font-black uppercase tracking-widest text-[10px] hover:bg-[#111] hover:text-white transition-all duration-300 flex items-center justify-center gap-3">
                  <Github size={18}/> Repository
                </a>
              )}
              {project.link && (
                <a href={project.link} target="_blank" className="w-full py-4 bg-[#FF001D] text-white text-center font-['Orbitron'] font-black italic uppercase tracking-widest text-[10px] hover:bg-[#111] transition-all duration-500 flex items-center justify-center gap-3 shadow-xl shadow-[#ff001d20]">
                  <ExternalLink size={18}/> Execute App
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}