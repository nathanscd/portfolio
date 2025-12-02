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
      </div>
      <div>
        <div className="abt-div">
          <h1 className="abt fade-in">{t.abt}</h1>
          <p className="abt-text fade-in">{t.abtText}</p>
        </div>
      </div>
    </div>
   

  </motion.section>
  );
}