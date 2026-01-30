import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LangContext";
import { projects } from "../data/Projects";
import { 
  Github, 
  ExternalLink, 
  Activity, 
  ChevronRight, 
  Cpu, 
  Layers,
  Zap,
  Play,
  Image as ImageIcon,
  X,
  Maximize2,
  ChevronLeft,
  Pause,
  RotateCcw
} from "lucide-react";

export default function Projects() {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeProject = projects[activeIndex];

  useEffect(() => {
    setMediaIndex(0);
    setIsGlitching(true);
    const timer = setTimeout(() => setIsGlitching(false), 300);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const handleVolumeChange = (e: any) => {
    if (e.target.muted === false) e.target.muted = true;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="projects" className="w-full min-h-screen bg-[#050505] text-white py-32 px-6 md:px-12 relative overflow-hidden flex flex-col justify-center">
      
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
           style={{ backgroundImage: 'linear-gradient(#FF001D 1px, transparent 1px), linear-gradient(90deg, #FF001D 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-[#FF001D] shadow-[0_0_10px_#FF001D]" />
              <span className="font-['Orbitron'] text-[#FF001D] text-[10px] font-black tracking-[0.5em] uppercase">
                {t.projects.subtitle}
              </span>
            </div>
            <h2 className="font-['Orbitron'] text-6xl md:text-[7rem] font-black italic uppercase leading-[0.8] tracking-tighter">
              {t.projects.title.split(' ')[0]}<br/>
              <span className="text-white/10">{t.projects.title.split(' ')[1]}</span>
            </h2>
          </div>
          <div className="hidden lg:block text-right font-['Orbitron'] text-[10px] text-[#FF001D] tracking-widest leading-relaxed uppercase font-black">
            <div className="flex items-center gap-2 justify-end mb-1">
              <Activity size={12} className="animate-pulse" />
              <span>System_Status: Optimal</span>
            </div>
            <p className="text-white/20">Visual_Feed // Active_Connection</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-4 flex flex-col gap-2">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                onClick={() => setActiveIndex(index)}
                className={`group relative w-full text-left p-6 transition-all duration-500 overflow-hidden border-l-4 ${
                  activeIndex === index 
                    ? "bg-white/5 border-[#FF001D] translate-x-4" 
                    : "bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/20 text-white/30"
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex flex-col">
                    <span className={`font-['Orbitron'] text-[10px] font-black mb-1 transition-colors ${activeIndex === index ? "text-[#FF001D]" : "text-white/10"}`}>
                      ENTRY_{String(index + 1).padStart(2, '0')}
                    </span>
                    <h4 className={`font-['Orbitron'] text-xl font-black italic uppercase transition-all ${activeIndex === index ? "text-white" : "group-hover:text-white/60"}`}>
                      {project.title}
                    </h4>
                  </div>
                  <ChevronRight size={20} className={`transition-all duration-500 ${activeIndex === index ? "opacity-100 translate-x-0 text-[#FF001D]" : "opacity-0 -translate-x-4"}`} />
                </div>
                {activeIndex === index && (
                  <motion.div layoutId="activeGlow" className="absolute inset-0 bg-[#FF001D]/5 -z-10" />
                )}
              </motion.button>
            ))}
          </div>

          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className={`h-full flex flex-col bg-white/[0.02] border border-white/5 rounded-sm p-8 transition-all duration-300 ${isGlitching ? 'brightness-150' : 'brightness-100'}`}
              >
                <div className="grid md:grid-cols-2 gap-12 h-full">
                  
                  <div className="space-y-6">
                    <div className="relative aspect-video group overflow-hidden border border-white/10 bg-black shadow-[0_0_30px_rgba(255,0,29,0.1)]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${activeIndex}-${mediaIndex}`}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="w-full h-full relative"
                        >
                          {activeProject.media[mediaIndex]?.type === "video" ? (
                            <div className="relative w-full h-full">
                              <video 
                                ref={videoRef}
                                src={activeProject.media[mediaIndex].src} 
                                autoPlay muted loop playsInline
                                onVolumeChange={handleVolumeChange}
                                className="w-full h-full object-cover opacity-80"
                              />
                              {/* F1 STYLE VIDEO CONTROLS */}
                              <div className="absolute bottom-4 left-0 right-0 px-6 z-40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={togglePlay} className="p-2 bg-[#FF001D] text-white rounded-none skew-x-[-12deg] hover:bg-white hover:text-black transition-colors">
                                  <div className="skew-x-[12deg]">{isPlaying ? <Pause size={14} /> : <Play size={14} />}</div>
                                </button>
                                <button onClick={() => videoRef.current && (videoRef.current.currentTime = 0)} className="p-2 bg-black/60 text-white rounded-none skew-x-[-12deg] border border-white/10 hover:border-[#FF001D] transition-colors">
                                  <div className="skew-x-[12deg]"><RotateCcw size={14} /></div>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="relative w-full h-full group/img">
                              <img 
                                src={activeProject.media[mediaIndex]?.src || activeProject.image} 
                                className="w-full h-full object-cover opacity-70 group-hover/img:opacity-100 transition-all duration-700"
                                alt="Feed"
                              />
                              <button 
                                onClick={() => setIsModalOpen(true)}
                                className="absolute inset-0 m-auto w-12 h-12 bg-[#FF001D] text-white flex items-center justify-center rounded-none skew-x-[-12deg] opacity-0 group-hover/img:opacity-100 transition-all duration-300 scale-50 group-hover/img:scale-100 shadow-[0_0_15px_#FF001D]"
                              >
                                <div className="skew-x-[12deg]"><Maximize2 size={20} /></div>
                              </button>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      <div className="absolute inset-0 z-30 pointer-events-none p-4 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div className="bg-[#FF001D] px-2 py-0.5 font-['Orbitron'] text-[8px] font-black text-white">LIVE // {activeProject.date}</div>
                          <Zap size={14} className="text-[#FF001D] fill-current" />
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="font-['Orbitron'] text-[8px] text-white/30 uppercase tracking-widest">Cam_Mode: 0{mediaIndex + 1}</div>
                          <div className="w-8 h-8 border-r-2 border-b-2 border-[#FF001D]" />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                      {activeProject.media.map((m, idx) => (
                        <button
                          key={idx}
                          onClick={() => setMediaIndex(idx)}
                          className={`flex-shrink-0 w-20 h-12 border transition-all relative ${mediaIndex === idx ? 'border-[#FF001D] scale-105' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                        >
                          {m.type === "video" && <Play className="absolute inset-0 m-auto text-white z-10" size={12} />}
                          <img src={m.type === "video" ? activeProject.image : m.src} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a href={activeProject.github} target="_blank" className="flex-1 flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 font-['Orbitron'] text-[10px] font-black uppercase tracking-widest hover:bg-[#FF001D] hover:text-white transition-all">
                        <Github size={16} /> {t.projects.code_link}
                      </a>
                      {activeProject.link && (
                        <a href={activeProject.link} target="_blank" className="flex-1 flex items-center justify-center gap-3 py-4 bg-white text-black font-['Orbitron'] text-[10px] font-black uppercase tracking-widest hover:bg-[#FF001D] hover:text-white transition-all">
                          <ExternalLink size={16} /> {t.projects.live_link}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between py-2">
                    <div className="space-y-6">
                      <div className="space-y-4">
                         <div className="flex items-center gap-2">
                            <Cpu size={14} className="text-[#FF001D]" />
                            <span className="font-['Orbitron'] text-[9px] text-white/40 font-black tracking-widest uppercase italic">Project_Specifications</span>
                         </div>
                         <h3 className="font-['Orbitron'] text-3xl font-black italic uppercase tracking-tighter text-white">
                           {activeProject.title}
                         </h3>
                         <div className="w-full h-[1px] bg-gradient-to-r from-[#FF001D] to-transparent opacity-30" />
                         <p className="font-['Manrope'] text-sm text-gray-400 leading-relaxed text-justify h-[180px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-[#FF001D]">
                           {activeProject.description}
                         </p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/5">
                      <span className="font-['Orbitron'] text-[9px] font-black text-[#FF001D] uppercase tracking-widest flex items-center gap-2">
                        <Layers size={12} /> Hardware_Stack
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tech.map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 font-['Orbitron'] text-[8px] font-black text-white/50 hover:text-[#FF001D] hover:border-[#FF001D] transition-all uppercase">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#FF001D]/20" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#FF001D]/20" />
          </div>

        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl overflow-hidden"
            onClick={() => setIsModalOpen(false)}
          >
            {/* NOISE EFFECT OVERLAY */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-screen bg-[url('https://media.giphy.com/media/oEI9uWU0WMrM4/giphy.gif')]" />
            
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: "#FF001D" }}
              className="absolute top-10 right-10 text-white p-4 bg-white/5 border border-white/10 z-[110]"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={32} />
            </motion.button>

            {/* MODAL NAVIGATION */}
            <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-10 pointer-events-none z-[105]">
              <button 
                onClick={(e) => { e.stopPropagation(); setMediaIndex(prev => prev > 0 ? prev - 1 : activeProject.media.length - 1); }}
                className="p-6 bg-white/5 border border-white/10 text-white pointer-events-auto hover:bg-[#FF001D] transition-colors"
              >
                <ChevronLeft size={40} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setMediaIndex(prev => (prev + 1) % activeProject.media.length); }}
                className="p-6 bg-white/5 border border-white/10 text-white pointer-events-auto hover:bg-[#FF001D] transition-colors"
              >
                <ChevronRight size={40} />
              </button>
            </div>

            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={activeProject.media[mediaIndex]?.src || activeProject.image}
              className="max-w-full max-h-full object-contain border border-white/10 relative z-10 shadow-[0_0_60px_rgba(255,0,29,0.2)]"
              onClick={(e) => e.stopPropagation()}
            />

            {/* MODAL BOTTOM INFO */}
            <div className="absolute bottom-10 left-10 z-[110] font-['Orbitron']">
              <span className="text-[#FF001D] text-xs font-black tracking-widest block mb-2 uppercase italic">Telemetria Visual // Detalhe</span>
              <h2 className="text-white text-3xl font-black uppercase tracking-tighter italic">{activeProject.title}</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}