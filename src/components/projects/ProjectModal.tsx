import { useEffect, useState } from "react";

type MediaItem = {
  type: "image" | "video";
  src: string;
};

type Project = {
  title: string;
  tech: string[];
  description: string;
  date: string;
  media: MediaItem[];
};

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const [closing, setClosing] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!project) {
      setClosing(true);
      setTimeout(() => setClosing(false), 250);
    } else {
      setCurrent(0);
    }
  }, [project]);

  if (!project && !closing) return null;

  const next = () => {
    if (!project) return;
    setCurrent(prev =>
      prev + 1 < project.media.length ? prev + 1 : 0
    );
  };

  const prev = () => {
    if (!project) return;
    setCurrent(prev =>
      prev - 1 >= 0 ? prev - 1 : project.media.length - 1
    );
  };

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
        <div className="modal-columns">
          <div className="modal-left">
            <h1 className="modal-title">{project?.title}</h1>
            <h3 className="modal-tech">{project?.tech.join(" • ")}</h3>
            <p className="modal-description">{project?.description}</p>
            <p className="modal-date">Data: {project?.date}</p>
          </div>

          <div className="modal-right">
            <div className="carousel">
              <button className="carousel-btn" onClick={prev}>{"<"}</button>

              <div className="carousel-content">
                {project?.media[current].type === "image" && (
                  <img
                    src={project.media[current].src}
                    className="carousel-media"
                  />
                )}

                {project?.media[current].type === "video" && (
                  <video
                    src={project.media[current].src}
                    className="carousel-media"
                    controls
                  />
                )}
              </div>

              <button className="carousel-btn" onClick={next}>{">"}</button>
            </div>

            <div className="carousel-indicators">
              {project?.media.map((_, i) => (
                <div
                  key={i}
                  className={`dot ${i === current ? "active" : ""}`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
          </div>
        </div>

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
