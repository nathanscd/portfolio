export type Project = {
  id: number;
  title: string;
  image: string;
  tech: string[];
  description: string;
  date: string;
  media: {
    type: "image" | "video";
    src: string;
  }[];
};


export const projects: Project[] = [
  {
    id: 1,
    title: "Grade Tracker",
    image: "src/static/GradeTracker.png",
    tech: ["React", "TypeScript"],
    description: "Sistema para acompanhar e calcular notas acadêmicas de forma simples, prática e visual.",
    date: "2024",
    media: [
      { type: "image", src: "src/static/GradeTracker.png" },
      { type: "video", src: "src/static/GradeTracker_demo.mp4" }
    ]
  },

  {
    id: 2,
    title: "Meu Portfólio",
    image: "src/static/Portfólio.png",
    tech: ["React", "CSS", "TypeScript"],
    description: "Meu site pessoal com tema inspirado em velocidade e performance, apresentando projetos, informações e contato.",
    date: "2025",
    media: [
      { type: "image", src: "src/static/Portfólio.png" },
      { type: "image", src: "src/static/Portfólio_2.png" },
      { type: "video", src: "src/static/Portfólio_demo.mp4" }
    ]
  },

  {
    id: 3,
    title: "Ultimate Comparison",
    image: "src/static/UltimateComparison.png",
    tech: ["Python"],
    description: "Ferramenta para comparação detalhada de produtos, serviços ou dados, permitindo análises rápidas e visuais.",
    date: "2024",
    media: [
      { type: "image", src: "src/static/UltimateComparison.png" },
      { type: "image", src: "src/static/UltimateComparison_2.png" },
      { type: "video", src: "src/static/UltimateComparison_demo.mp4" }
    ]
  },
  {
    id: 4,
    title: "Finance Tracker",
    image: "src/static/UltimateComparison.png",
    tech: ["React", "CSS", "HTML", "TypeScript"],
    description: "Ferramenta para comparação detalhada de produtos, serviços ou dados, permitindo análises rápidas e visuais.",
    date: "2024",
    media: [
      { type: "image", src: "src/static/UltimateComparison.png" },
      { type: "image", src: "src/static/UltimateComparison_2.png" },
      { type: "video", src: "src/static/UltimateComparison_demo.mp4" }
    ]
  },
  {
    id: 5,
    title: "CrossX",
    image: "src/static/UltimateComparison.png",
    tech: ["CSS", "HTML", "Python"],
    description: "Ferramenta para comparação detalhada de produtos, serviços ou dados, permitindo análises rápidas e visuais.",
    date: "2024",
    media: [
      { type: "image", src: "src/static/UltimateComparison.png" },
      { type: "image", src: "src/static/UltimateComparison_2.png" },
      { type: "video", src: "src/static/UltimateComparison_demo.mp4" }
    ]
  },
  {
    id: 6,
    title: "Up-To",
    image: "src/static/UltimateComparison.png",
    tech: ["CSS", "HTML", "React", "TypeScript"],
    description: "Ferramenta para comparação detalhada de produtos, serviços ou dados, permitindo análises rápidas e visuais.",
    date: "2024",
    media: [
      { type: "image", src: "src/static/UltimateComparison.png" },
      { type: "image", src: "src/static/UltimateComparison_2.png" },
      { type: "video", src: "src/static/UltimateComparison_demo.mp4" }
    ]
  }
];
