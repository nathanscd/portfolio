import { motion } from "framer-motion";
import ProjectList from "../components/projects/ProjectList";

export default function Projects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      id="projects"
      className="max-w-5xl mx-auto px-6 py-12"
    >
      <ProjectList />
    </motion.section>
  );
}
