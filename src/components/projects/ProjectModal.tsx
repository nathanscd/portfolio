import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react"; 
import "./Projects.css";

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

  const next = () => {
    setCurrent((prev) => (prev + 1 < mediaList.length ? prev + 1 : 0));
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 >= 0 ? prev - 1 : mediaList.length - 1));
  };

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-window"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-content">
          <div className="carousel-section">
            <div className="carousel-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  className="media-container"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {mediaList[current].type === "video" ? (
                    <video
                      src={mediaList[current].src}
                      autoPlay
                      loop
                      muted
                      className="modal-media"
                    />
                  ) : (
                    <img
                      src={mediaList[current].src}
                      alt="Project preview"
                      className="modal-media"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {mediaList.length > 1 && (
                <>
                  <button className="nav-btn prev" onClick={prev}>
                    <ChevronLeft size={24} />
                  </button>
                  <button className="nav-btn next" onClick={next}>
                    <ChevronRight size={24} />
                  </button>
                  <div className="indicators">
                    {mediaList.map((_, i) => (
                      <div
                        key={i}
                        className={`dot ${i === current ? "active" : ""}`}
                        onClick={() => setCurrent(i)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="info-section">
            <h2 className="modal-title">{project.title}</h2>
            {project.date && <span className="modal-date">{project.date}</span>}
            
            <div className="tech-stack">
              {project.tech.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>

            <div className="description-scroll">
              <p>{project.description}</p>
            </div>
            
            <div className="modal-actions">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="action-btn github"
                >
                  <Github size={20} />
                  GitHub
                </a>
              )}
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="action-btn live"
                >
                  <ExternalLink size={20} />
                  Projeto Online
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}