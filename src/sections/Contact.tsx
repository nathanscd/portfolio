import { motion } from "framer-motion";


export default function Contact() {
return (
<motion.section
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="max-w-lg mx-auto px-6"
id="card"
>
<h2 className="text-3xl font-bold mb-4">Entre em contato</h2>
<form className="flex flex-col gap-4">
<input
type="text"
placeholder="Seu nome"
className="p-3 rounded-lg bg-neutral-900"
id="card"
/>
<input
type="email"
placeholder="Seu email"
className="p-3 rounded-lg bg-neutral-900"
id="card"
/>
<textarea
placeholder="Mensagem"
className="p-3 rounded-lg bg-neutral-900 h-32"
id="card"
/>
<button className="bg-red-600 py-3 rounded-lg">Enviar</button>
</form>
</motion.section>
);
} 