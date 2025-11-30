import { motion } from "framer-motion";


export default function About() {
return (
<motion.section
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="max-w-3xl mx-auto px-6"
id="card"
>
<h2 className="text-3xl font-bold mb-4">Sobre mim</h2>
<p className="opacity-80 leading-relaxed">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam soluta ea tenetur, nam deserunt pariatur repellat, impedit tempora corporis nihil ullam beatae fuga eum nostrum quis in iusto veritatis eos.
</p>
</motion.section>
);
}