import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Filters from "./Filters";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects } from "../../data/Projects";
import { Gauge, LayoutGrid } from "lucide-react";

type Project = {
  id: string | number;
  title: string;
  image: string;
  tech: string[];
  description: string;
};

export default function ProjectList() {
  const techFilters = [
    "Tudo",
    "HTML",
    "CSS",
    "TypeScript",
    "React",
    "Python",
    "SQL",
  ];

  const [activeFilter, setActiveFilter] = useState<string>("Tudo");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return activeFilter === "Tudo"
      ? projects
      : projects.filter((p) => p.tech.includes(activeFilter));
  }, [activeFilter]);

  const slashIn: Variants = {
    hidden: { x: -50, opacity: 0, skewX: 10 },
    visible: (i: number) => ({
      x: 0, opacity: 1, skewX: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section id="projects" className="w-full min-h-screen bg-[#f8f8f8] py-24 px-6 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-[1px] bg-black/5 z-0" />
      <div className="absolute top-0 left-0 w-1/4 h-full bg-white -skew-x-12 -translate-x-20 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col mb-16">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={slashIn} custom={0}
            className="flex items-center gap-3 mb-4"
          >
            <Gauge size={20} className="text-[#FF001D] animate-pulse" />
            <span className="font-['Orbitron'] text-[#FF001D] font-bold tracking-[0.4em] uppercase text-sm">
              Track Record // Projects
            </span>
          </motion.div>
          
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={slashIn} custom={1}
            className="font-['Orbitron'] text-5xl md:text-[7.5rem] font-black text-black italic uppercase leading-[0.9] tracking-tighter"
          >
            ENGINEERING<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#333] to-[#FF001D]">
              ARCHIVE
            </span>
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-4">
            <LayoutGrid size={20} className="text-gray-400" />
            <span className="font-['Orbitron'] text-[10px] font-black uppercase tracking-widest text-gray-400">
              Filter by Tech
            </span>
          </div>
          
          <Filters
            filters={techFilters}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </div>

        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative group"
                >
                  <ProjectCard
                    project={p}
                    onClick={setSelectedProject}
                  />
                  <div className="absolute -bottom-2 -right-2 w-full h-full border-b-2 border-r-2 border-[#FF001D]/20 -z-10 group-hover:border-[#FF001D] transition-colors" />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-200"
              >
                <span className="font-['Orbitron'] text-gray-300 text-sm tracking-widest uppercase">
                  No matches found in database
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}