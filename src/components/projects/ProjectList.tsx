import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Filters from "./Filters";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects } from "../../data/Projects";
import "./Projects.css";

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
    "JavaScript",
    "TypeScript",
    "React",
    "Python",
    "SQL",
    "Figma",
    "After Effects",
    "Photoshop",
    "Illustrator",
    "Premiere",
  ];

  const [activeFilter, setActiveFilter] = useState<string>("Tudo");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return activeFilter === "Tudo"
      ? projects
      : projects.filter((p) => p.tech.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section className="projects-container">
      <Filters
        filters={techFilters}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      <motion.div layout className="projects-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  project={p}
                  onClick={setSelectedProject}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="no-results"
            >
              <p>Nenhum projeto encontrado com essa tecnologia.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}