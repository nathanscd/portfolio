import { motion } from "framer-motion";


export default function Home() {
return (
<motion.section
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="flex flex-col items-center text-center px-6">

  <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Nathanael Secundo Cardoso</h1>
  <p className="text-lg opacity-80 max-w-xl">
  Desenvolvedor Web | Focado em performance, design e qualidade.
  </p>

</motion.section>
);
}