import { useState } from "react";
import Filters from "./Filters";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects } from "../../data/Projects";

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

  const filteredProjects =
    activeFilter === "Tudo"
      ? projects
      : projects.filter(p => p.tech.includes(activeFilter));

  return (
    <>
      <Filters
        filters={techFilters}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      <div className="projects-grid">
        {filteredProjects.map(p => (
          <ProjectCard
            key={p.id}
            project={p}
            onClick={setSelectedProject}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
