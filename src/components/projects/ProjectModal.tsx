import { useEffect, useState } from "react";

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
  const [closing, setClosing] = useState(false);

  // quando "project" sai de null -> abre
  // quando volta para null -> dispara animação de saída
  useEffect(() => {
    if (!project) {
      setClosing(true);
      setTimeout(() => setClosing(false), 250);
    }
  }, [project]);

  if (!project && !closing) return null;

  return (
    <div
      className={`modal-backdrop ${closing ? "fade-out" : ""}`}
      onClick={() => {
        setClosing(true);
        setTimeout(onClose, 250);
      }}
    >
      <div
        className={`modal-window ${closing ? "pop-out" : ""}`}
        onClick={e => e.stopPropagation()}
      >
        <img src={project?.image} className="modal-img" />

        <h1 className="modal-title">{project?.title}</h1>
        <h3 className="modal-tech">{project?.tech.join(" • ")}</h3>
        <p className="modal-desc">{project?.description}</p>

        <button
          className="modal-close"
          onClick={() => {
            setClosing(true);
            setTimeout(onClose, 250);
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}