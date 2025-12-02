import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  setSection: (value: "home" | "about" | "projects" | "contact") => void;
};

export default function Navbar({ setSection }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <LanguageSwitcher className="lang-switch" />
        <button className="close" onClick={() => setOpen(true)}>
          <span className="t1">MENU</span>
          <span className="t2">MENU</span>
        </button>
      </nav>

      <div
        className={open ? "backdrop show" : "backdrop"}
        onClick={() => setOpen(false)}
      ></div>

      <div className={open ? "nav-links-mobile open" : "nav-links-mobile"}>
        <div className="upp">
          <span>O que quer ver primeiro?</span>
          <button className="close" onClick={() => setOpen(false)}>
            <span className="t1">FECHAR</span>
            <span className="t2">FECHAR</span>
          </button>
        </div>
        

        <button
          onClick={() => {
            setSection("home");
            setOpen(false);
          }}
          className="btn"
        >
          HOME
        </button>

        <a
          href="#about"
          className="btn"
          onClick={() => {
            setSection("about");
            setOpen(false);
          }}
        >
          SOBRE
        </a>

        <a
          href="#projects"
          className="btn"
          onClick={() => {
            setSection("projects");
            setOpen(false);
          }}
        >
          PROJETOS
        </a>

        <a
          href="#contact"
          className="btn"
          onClick={() => {
            setSection("contact");
            setOpen(false);
          }}
        >
          CONTATO
        </a>
      </div>
    </>
  );
}
