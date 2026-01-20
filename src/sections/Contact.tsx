import { motion } from "framer-motion";
import { useLang } from "../context/LangContext"; 
import { div } from "framer-motion/client";

export default function Home() {
  const { t } = useLang(); 

  return (
    <div className="contact">
      <div className="background-racing">
        <div className="racing-red1">
          <div className="racing-red-inner"></div>
        </div>
        <div className="racing-red2"></div>
        <div className="red-glow"></div>
      </div>

      <div className="card-contact">
        <img src="PFP.jpeg" className="card-img" />
        <h1>NATHANAEL SECUNDO CARDOSO</h1>
        <h2>Contato</h2>
        <p>Disponível para novos desafios e arquiteturas de alto impacto.</p>
        <div className="container-social">
          <a href="https://github.com/nathanscd" target="_blank" rel="noopener noreferrer">
            <img src="github_icon.png" alt="GitHub" />
          </a>

          <a href="https://www.linkedin.com/in/nathanscd/" target="_blank" rel="noopener noreferrer">
            <img src="LinkedIn_icon.png" alt="LinkedIn" />
          </a>

          <a href="https://instagram.com/nathansscd" target="_blank" rel="noopener noreferrer">
            <img src="Instagram_icon.png" alt="Instagram" />
          </a>
        </div>
        
      </div>
    </div>
  );
}