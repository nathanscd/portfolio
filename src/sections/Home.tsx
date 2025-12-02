import { motion } from "framer-motion";

export default function Home() {
return (
<motion.section
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="main"
>
  <div className="background-racing">
  <div className="racing-red1">
    <div className="racing-red-inner"></div>
  </div>
  <div className="racing-red2"></div>
  <div className="red-glow"></div>
</div>

  <h1 className="name-main">NATHANAEL SECUNDO CARDOSO</h1>
  <p className="titles">Desenvolvedor | Designer | Analista de Dados</p>
  <p className="desc">Focado em performance, design e qualidade.</p>
</motion.section>


);
}