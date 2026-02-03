import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LangContext";
import { projects, Project } from "../data/Projects";
import { ArrowUpRight, FolderGit2, Shield, Radio } from "lucide-react";
import ProjectPage from "./ProjectPage";

export default function Projects() {
  const { t } = useLang();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative min-h-screen bg-[#050505]">
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          <motion.section
            key="projects-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen text-white py-32 px-6 md:px-12 selection:bg-[#FF001D] selection:text-white"
          >
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
            />
            
            <div className="max-w-[1800px] w-full mx-auto relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-b border-white/10 pb-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-[#FF001D] animate-pulse" />
                    <span className="font-['Orbitron'] text-[#FF001D] text-xs font-black tracking-[0.4em] uppercase">
                      {t.projects.subtitle || "SECURE DATABASE"}
                    </span>
                  </div>
                  <h2 className="font-['Orbitron'] text-6xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter text-white">
                    MISSION<br/><span className="text-white/20">LOGS</span>
                  </h2>
                </div>

                <div className="font-mono text-[10px] text-right opacity-60 space-y-2 hidden md:block">
                  <div className="flex items-center justify-end gap-2 text-[#FF001D]">
                     <Radio size={12} className="animate-pulse" />
                     <span>LIVE FEED: CONNECTED</span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                     <Shield size={12} />
                     <span>ENCRYPTION: ENABLED</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project) => (
                  <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onClick={() => setSelectedProject(project)} 
                  />
                ))}
              </div>
            </div>
          </motion.section>
        ) : (
          <ProjectPage 
            key="project-detail"
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project, onClick: () => void }) {
  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      onClick={onClick}
      className="group relative h-[450px] bg-[#080808] cursor-pointer overflow-hidden border border-white/10 hover:border-[#FF001D] transition-all duration-500"
    >
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          layoutId={`image-${project.id}`}
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
      </div>

      <div className="relative z-20 p-6 flex justify-between items-start border-b border-white/5 bg-[#080808]/80 backdrop-blur-sm">
         <div className="flex items-center gap-2 text-[#FF001D]">
            <FolderGit2 size={14} />
            <span className="font-mono text-[10px] uppercase">PROJECT_{String(project.id).padStart(2, '0')}</span>
         </div>
         <div className="w-8 h-8 border border-white/20 flex items-center justify-center group-hover:bg-[#FF001D] group-hover:border-[#FF001D] transition-all duration-300">
            <ArrowUpRight className="text-white w-4 h-4" />
         </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 z-20">
         <motion.h3 
            layoutId={`title-${project.id}`}
            className="font-['Orbitron'] text-2xl font-black italic uppercase leading-none text-white mb-2"
         >
           {project.title}
         </motion.h3>
         <div className="flex gap-2 mt-3">
            {project.tech.slice(0,3).map(t => (
                <span key={t} className="text-[9px] font-mono text-gray-400 border border-white/10 px-2 py-1 bg-black/50">
                    {t}
                </span>
            ))}
         </div>
      </div>
    </motion.div>
  );
}
