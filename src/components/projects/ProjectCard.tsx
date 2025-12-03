type Project = {
  id: number;
  title: string;
  tech: string[];
  description: string;
  image: string;
};

type Props = {
  project: Project;
  onClick: (p: Project) => void;
};

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <div className="project-card" onClick={() => onClick(project)}>
      <img src={project.image} alt={project.title} className="project-img" />
      
      <h3 className="proj-title">{project.title}</h3>
      <p className="proj-tech">{project.tech.join(", ")}</p>

      <p className="proj-desc">
        {project.description.length > 120
          ? project.description.substring(0, 120) + "..."
          : project.description}
      </p>
    </div>
  );
}
