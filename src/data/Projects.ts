export type Project = {
  id: number;
  title: string;
  image: string;
  tech: string[];
  description: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "GradeTracker",
    image: "/static/GradeTracker.png",
    tech: ["React", "TypeScript"],
    description: "Um sistema para acompanhar notas acadêmicas."
  },
  {
    id: 2,
    title: "Meu Portfólio",
    image: "/static/portfolio.png",
    tech: ["React", "CSS"],
    description: "Site pessoal com design focado em corrida e performance."
  }
];
