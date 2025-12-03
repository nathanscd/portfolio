import { motion } from "framer-motion";
import { useLang } from "../context/LangContext"; 


export default function About() {
  const { t } = useLang(); 
  return (
  <motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="max-w-3xl mx-auto px-6"
  >
    <div className="hero-abt">
      <div className="profile">
        <img src="src/static/PFP.jpeg" />
        <h1>Nathanael Secundo Cardoso</h1>
        <h2>Desenvolvedor | Designer | Analista de Dados</h2>
        <h2>Localidade: Fortaleza, CE - BR</h2>
      </div>
      <div>
        <div className="abt-div">
          <h1 className="abt fade-in">{t.abt}</h1>
          <p className="abt-text fade-in">{t.abtText}</p>
          <div className="tech-box"> <h3 className="tech-title">Tecnologias</h3> <div className="tech-list"> <span>HTML</span> <span>CSS</span> <span>JavaScript</span> <span>TypeScript</span> <span>React</span> <span>React Native</span> <span>Node.js</span> <span>Python</span> <span>SQL</span> <span>Figma</span> <span>Git</span> </div> </div>
        </div>
      </div>
    </div>
   

  </motion.section>
  );
}