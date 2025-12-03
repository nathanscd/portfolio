type Project = {
  title: string;
  image: string;
  tech: string[];
  description: string;
};

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-window"
        onClick={e => e.stopPropagation()}
      >
        <img src={project.image} className="modal-img" alt={project.title} />

        <h1 className="modal-title">{project.title}</h1>
        <h3 className="modal-tech">{project.tech.join(" • ")}</h3>
        <p className="modal-desc">{project.description}</p>

        <button className="modal-close" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
