import { motion } from "framer-motion";
import "./Projects.css";

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
      className="project-card"
      onClick={() => onClick(project)}
      whileHover={{ y: -12 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="card-image-container">
        <img src={project.image} alt={project.title} className="project-img" />
        <div className="card-overlay">
          <span>Ver Detalhes</span>
        </div>
      </div>

      <div className="card-content">
        <h3 className="proj-title">{project.title}</h3>
        
        <div className="proj-tags">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
          {project.tech.length > 3 && (
            <span className="tech-pill">+{project.tech.length - 3}</span>
          )}
        </div>

        <p className="proj-desc">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}