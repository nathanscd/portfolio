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
<div className="tech-box"> <h3 className="tech-title">Filtros</h3> <div className="tech-list"> <span>Tudo</span><h1></h1><span>HTML</span> <span>CSS</span> <span>JavaScript</span> <span>TypeScript</span> <span>React</span> <span>React Native</span> <span>Node.js</span> <span>Python</span> <span>SQL</span> <span>Figma</span> <span>Git</span> </div> </div>
<div className="card">
  <img src="src/static/GradeTracker.png"/>
  <h1 className="title-project">GradeTracker</h1>
  <h2 className="tech">React, TypeScript</h2>
  <p className="desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui sequi ullam quia dolores ea animi dolor unde officiis ipsa distinctio?</p>
</div>
</motion.section>
);
}