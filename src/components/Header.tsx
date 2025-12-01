import { useState } from "react";

type Props = {
  setSection: (value: "home" | "about" | "projects" | "contact") => void;
};

export default function Navbar({ setSection }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <button onClick={() => setOpen(true)} className="menu">
          Menu
        </button>
      </nav>

      <div
        className={open ? "backdrop show" : "backdrop"}
        onClick={() => setOpen(false)}
      ></div>

      <div className={open ? "nav-links-mobile open" : "nav-links-mobile"}>
        <button className="close" onClick={() => setOpen(false)}>
          <span className="t1">Close</span>
          <span className="t2">Close</span>
        </button>

        <button
          onClick={() => {
            setSection("home");
            setOpen(false);
          }}
          className="btn"
        >
          Home
        </button>

        <a
          href="#about"
          className="btn"
          onClick={() => {
            setSection("about");
            setOpen(false);
          }}
        >
          Sobre
        </a>

        <a
          href="#projects"
          className="btn"
          onClick={() => {
            setSection("projects");
            setOpen(false);
          }}
        >
          Projetos
        </a>

        <a
          href="#contact"
          className="btn"
          onClick={() => {
            setSection("contact");
            setOpen(false);
          }}
        >
          Contato
        </a>
      </div>
    </>
  );
}
