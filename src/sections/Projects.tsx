import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LangContext";
import { projects, Project } from "../data/Projects";
import { 
  Github, ExternalLink, X, Cpu, Layers, Calendar, 
  ArrowUpRight, Play, Pause, RotateCcw, Activity, Zap 
} from "lucide-react";

export default function Projects() {
  const { t } = useLang();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "unset";
  }, [selectedId]);

  return (
    <section className="relative min-h-screen bg-[#050505] text-white py-32 px-6 md:px-12 selection:bg-[#FF001D] selection:text-white">
      
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF001D] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} className="h-[2px] bg-[#FF001D] shadow-[0_0_10px_#FF001D]" />
              <span className="font-['Orbitron'] text-[#FF001D] text-xs font-black tracking-[0.4em] uppercase">
                {t.projects.subtitle || "SYSTEM ARCHIVE"}
              </span>
            </div>
            <h2 className="font-['Orbitron'] text-6xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter mix-blend-difference">
              MISSION<br/><span className="text-white/20">LOGS</span>
            </h2>
          </div>
          
          <div className="font-['Orbitron'] text-xs text-right hidden md:block">
            <div className="flex items-center justify-end gap-2 mb-2 text-[#FF001D]">
               <Activity className="animate-pulse" size={14} />
               <span className="font-bold tracking-widest">LIVE CONNECTION</span>
            </div>
            <p className="text-white/40 tracking-[0.2em]">DATABASE: ENCRYPTED</p>
          </div>
        </div>

        {/* GRID DE PROJETOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedId(project.id)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <ProjectModal project={projects.find(p => p.id === selectedId)!} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, onClick }: { project: Project, onClick: () => void }) {
  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      onClick={onClick}
      whileHover={{ y: -5 }}
      className="group relative h-[450px] bg-[#0a0a0a] border border-white/10 cursor-pointer overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-[#FF001D]/50 hover:shadow-[0_0_30px_rgba(255,0,29,0.1)]"
    >
      <div className="absolute inset-0 z-0">
        <motion.img 
          layoutId={`card-image-${project.id}`}
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 p-6 flex justify-between items-start">
        <span className="font-['Orbitron'] text-4xl font-black text-white/10 group-hover:text-[#FF001D] transition-colors duration-500">
          {String(project.id).padStart(2, '0')}
        </span>
        <motion.div className="w-10 h-10 border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:bg-[#FF001D] group-hover:border-[#FF001D] transition-all duration-300" whileHover={{ rotate: 90 }}>
           <ArrowUpRight size={20} className="text-white" />
        </motion.div>
      </div>

      <div className="relative z-10 p-6 border-t border-white/10 bg-black/90 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center gap-2 mb-3">
           <div className="w-1.5 h-1.5 bg-[#FF001D]" />
           <span className="font-['Orbitron'] text-[9px] uppercase tracking-[0.2em] text-[#FF001D]">{project.tech[0]}</span>
        </div>
        <motion.h3 layoutId={`card-title-${project.id}`} className="font-['Orbitron'] text-2xl font-black italic uppercase leading-none mb-4 text-white">
          {project.title}
        </motion.h3>
        <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {project.tech.slice(0, 3).map((tech, i) => (
             <span key={i} className="text-[9px] font-['Orbitron'] font-bold text-gray-400 border border-white/20 px-2 py-1 uppercase bg-white/5">{tech}</span>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-[#FF001D] group-hover:w-6 group-hover:h-6 transition-all duration-300" />
         <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-[#FF001D] group-hover:w-6 group-hover:h-6 transition-all duration-300" />
      </div>
    </motion.div>
  );
}

function CustomVideoPlayer({ src, poster }: { src: string, poster: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("00:00");
    const [duration, setDuration] = useState("00:00");

    useEffect(() => {
        if(videoRef.current) videoRef.current.muted = true;
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const dur = videoRef.current.duration;
            setProgress((current / dur) * 100);
            const formatTime = (time: number) => {
                const minutes = Math.floor(time / 60);
                const seconds = Math.floor(time % 60);
                return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            };
            setCurrentTime(formatTime(current));
            if(!isNaN(dur)) setDuration(formatTime(dur));
        }
    };

    const handleReplay = () => {
        if(videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setIsPlaying(true);
        }
    }

    return (
        <div className="relative w-full h-full group bg-black">
            <video ref={videoRef} src={src} poster={poster} className="w-full h-full object-cover" onTimeUpdate={handleTimeUpdate} onClick={togglePlay} playsInline muted loop />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {!isPlaying && (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-20 h-20 bg-[#FF001D]/20 backdrop-blur-sm border border-[#FF001D] flex items-center justify-center rounded-full">
                        <Play fill="#fff" className="text-white ml-1" size={30} />
                    </motion.div>
                )}
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col gap-2">
                    <div className="w-full h-1 bg-white/20 relative cursor-pointer" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pos = (e.clientX - rect.left) / rect.width;
                        if(videoRef.current) videoRef.current.currentTime = pos * videoRef.current.duration;
                    }}>
                        <motion.div className="absolute top-0 left-0 h-full bg-[#FF001D] shadow-[0_0_10px_#FF001D]" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between font-['Orbitron']">
                        <div className="flex items-center gap-4">
                            <button onClick={togglePlay} className="text-white hover:text-[#FF001D] transition-colors">
                                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                            </button>
                            <span className="text-[10px] font-bold text-[#FF001D] tracking-widest">
                                {currentTime} <span className="text-white/40">/ {duration}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                             <div className="flex items-center gap-2 text-[9px] text-white/50 uppercase tracking-widest border border-white/10 px-2 py-1">
                                <Zap size={10} className="text-[#FF001D]" /> Audio_Disabled
                             </div>
                             <button onClick={handleReplay} className="text-white hover:text-[#FF001D] transition-colors"><RotateCcw size={18} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProjectModal({ project, onClose }: { project: Project, onClose: () => void }) {
  const [activeMedia, setActiveMedia] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[100] flex flex-col bg-[#050505] overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0 mix-blend-overlay bg-[url('https://media.giphy.com/media/oEI9uWU0WMrM4/giphy.gif')]" />
        
        <div className="relative z-20 flex justify-between items-center p-6 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md">
            <div className="flex items-center gap-6">
                <span className="font-['Orbitron'] text-4xl font-black text-[#FF001D]">{String(project.id).padStart(2, '0')}</span>
                <div className="h-8 w-[1px] bg-white/20" />
                <motion.h2 layoutId={`card-title-${project.id}`} className="font-['Orbitron'] text-2xl md:text-3xl font-black italic uppercase leading-none text-white">{project.title}</motion.h2>
            </div>
            <button onClick={onClose} className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 hover:bg-[#FF001D] hover:border-[#FF001D] transition-all skew-x-[-10deg]">
                <div className="skew-x-[10deg] flex items-center gap-2">
                   <span className="font-['Orbitron'] text-[10px] font-bold uppercase tracking-widest text-white">Close</span>
                   <X size={16} className="text-white" />
                </div>
            </button>
        </div>

        <div className="relative z-10 flex-grow overflow-y-auto custom-scrollbar">
            <div className="max-w-[1920px] mx-auto grid lg:grid-cols-12 min-h-full">
                <div className="lg:col-span-8 p-6 md:p-12 border-r border-white/10 flex flex-col gap-6">
                     <motion.div layoutId={`card-image-${project.id}`} className="relative w-full aspect-video bg-black border border-white/10 shadow-2xl overflow-hidden">
                         {project.media && project.media[activeMedia]?.type === "video" ? (
                             <CustomVideoPlayer src={project.media[activeMedia].src} poster={project.image} />
                         ) : (
                             <img src={project.media ? project.media[activeMedia]?.src : project.image} className="w-full h-full object-contain" />
                         )}
                     </motion.div>
                     {project.media && project.media.length > 1 && (
                        <div className="flex gap-4 pb-2 overflow-x-auto scrollbar-none">
                            {project.media.map((media, idx) => (
                                <button key={idx} onClick={() => setActiveMedia(idx)} className={`relative w-40 aspect-video border-2 transition-all ${activeMedia === idx ? 'border-[#FF001D] opacity-100' : 'border-white/10 opacity-50 hover:opacity-100'}`}>
                                    {media.type === 'video' && (<div className="absolute inset-0 flex items-center justify-center bg-black/50"><Play size={16} fill="#fff" className="text-white" /></div>)}
                                    <img src={media.type === 'video' ? project.image : media.src} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                     )}
                </div>

                <div className="lg:col-span-4 p-6 md:p-12 bg-[#080808] flex flex-col gap-10">
                     <div className="p-6 bg-white/5 border-l-4 border-[#FF001D]">
                        <h4 className="font-['Orbitron'] text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2">Description</h4>
                        <p className="font-['Manrope'] text-gray-300 text-sm md:text-base leading-relaxed">{project.description}</p>
                     </div>
                     <div>
                        <h4 className="font-['Orbitron'] text-[#FF001D] text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2"><Layers size={14} /> Stack Architecture</h4>
                        <div className="flex flex-wrap gap-2">{project.tech.map((tech) => (<span key={tech} className="px-3 py-1.5 bg-black border border-white/20 text-white text-[10px] font-['Orbitron'] font-bold uppercase tracking-wide">{tech}</span>))}</div>
                     </div>
                     <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10">
                         <div><span className="block text-[10px] font-['Orbitron'] text-white/40 uppercase tracking-widest mb-1">Timeline</span><div className="flex items-center gap-2 text-white font-['Orbitron'] text-sm font-bold"><Calendar size={14} className="text-[#FF001D]" /> {project.date}</div></div>
                         <div><span className="block text-[10px] font-['Orbitron'] text-white/40 uppercase tracking-widest mb-1">Core System</span><div className="flex items-center gap-2 text-white font-['Orbitron'] text-sm font-bold"><Cpu size={14} className="text-[#FF001D]" /> {project.tech[0]}</div></div>
                     </div>
                     <div className="mt-auto grid gap-4">
                        <a href={project.github} target="_blank" className="flex items-center justify-center gap-3 py-4 bg-[#FF001D] text-white font-['Orbitron'] text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"><Github size={18} /> Source Code</a>
                        {project.link && (<a href={project.link} target="_blank" className="flex items-center justify-center gap-3 py-4 border border-white/20 text-white font-['Orbitron'] text-xs font-black uppercase tracking-[0.2em] hover:border-[#FF001D] hover:text-[#FF001D] transition-all"><ExternalLink size={18} /> Live Preview</a>)}
                     </div>
                </div>
            </div>
        </div>
    </motion.div>
  );
}