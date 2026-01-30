import { motion } from "framer-motion";
import { Gauge, ArrowUpRight } from "lucide-react";

type Project = {
  id: string | number;
  title: string;
  image: string;
  tech: string[];
  description: string;
};

type Props = {
  project: Project;
  onClick: (p: Project) => void;
};

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <motion.div
      className="group relative bg-white overflow-hidden cursor-pointer"
      onClick={() => onClick(project)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative aspect-video overflow-hidden bg-[#0a0a0a]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out group-hover:grayscale-0"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md p-2 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2">
            <Gauge size={12} className="text-[#FF001D] animate-pulse" />
            <span className="font-['Orbitron'] text-[8px] text-white font-bold tracking-[0.2em] uppercase">
              System Ready
            </span>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#FF001D]/10 backdrop-blur-[2px]">
           <div className="bg-white p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <ArrowUpRight className="text-[#FF001D]" size={24} strokeWidth={3} />
           </div>
        </div>
      </div>

      <div className="p-6 border-x border-b border-gray-100 relative">
        <div className="absolute top-0 left-0 w-[2px] h-0 bg-[#FF001D] group-hover:h-full transition-all duration-500" />
        
        <h3 className="font-['Orbitron'] text-xl font-black italic uppercase text-[#111] group-hover:text-[#FF001D] transition-colors mb-3">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((t) => (
            <span 
              key={t} 
              className="px-2 py-0.5 bg-[#f4f4f4] text-[9px] font-['Orbitron'] font-black uppercase tracking-tighter text-gray-500 border-l border-gray-300"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-0.5 bg-[#111] text-[9px] font-['Orbitron'] font-black uppercase text-white">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        <p className="font-['Manrope'] text-sm text-gray-500 line-clamp-2 font-medium leading-relaxed">
          {project.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="h-[1px] flex-grow bg-gray-100 mr-4" />
          <span className="font-['Orbitron'] text-[9px] font-bold text-gray-300 uppercase tracking-widest group-hover:text-[#FF001D] transition-colors">
            Details // 0{project.id}
          </span>
        </div>
      </div>
    </motion.div>
  );
}