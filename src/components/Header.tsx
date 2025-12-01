import { useState } from "react";

type Props = {
  setSection: (value: "home" | "about" | "projects" | "contact") => void;
};

function Navbar({ setSection }: Props) {
const [open, setOpen] = useState(false);

return (
<nav className="navbar">
  <button
    className="hamburger"
    onClick={() => setOpen(!open)}
    aria-label="Menu"
  >
    <div className={open ? "bar bar1-open" : "bar"} />
    <div className={open ? "bar bar2-open" : "bar"} />
    <div className={open ? "bar bar3-open" : "bar"} />
  </button>

  <div className={open ? "nav-links-mobile open" : "nav-links-mobile"}>
    <button className="close" onClick={() => setOpen(!open)}>
      <span className="t1">Close</span>
      <span className="t2">Close</span>
    </button>

    <button onClick={() => setSection("home")} className="btn">Home</button>
    <a href="#about" onClick={() => {
                                    setSection("about"); 
                                    setOpen(false);}} 
                                    className="btn">Sobre</a>
    <a href="#projects" onClick={() => setSection("projects")} className="btn">Projetos</a>
    <a href="#contact" onClick={() => setSection("contact")} className="btn">Contato</a>
  </div>
</nav>
);
}
export default Navbar;