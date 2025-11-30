import { motion } from "framer-motion";


export default function Projects() {
const items = [1, 2, 3, 4];


return (
<motion.section
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6"
id="card"
>
{items.map((p) => (
<div key={p} className="bg-neutral-900 p-6 rounded-2xl">
<h3 className="text-xl font-semibold mb-2">Projeto {p}</h3>
<p className="opacity-70 text-sm">
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae atque quibusdam et? Nulla quidem odio excepturi mollitia cum, eligendi pariatur.
</p>
</div>
))}
</motion.section>
);
}