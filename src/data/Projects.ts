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
  link?: string;
  github?: string;
};


export const projects: Project[] = [
  {
    id: 1,
    title: "PODS Administrator",
    image: "Projetos/1.png",
    tech: ["React",
    "TypeScript",
    "Firebase (Firestore/Auth/Functions)",
    "Tiptap (ProseMirror)",
    "Tailwind CSS",
    "OpenAI GPT-4 Turbo",
    "Vercel AI SDK",
    "Framer Motion",
    "Zod"],
    description: "O PODS Administrator é um ecossistema completo de gerenciamento de pipeline e produtividade técnica, projetado para centralizar fluxos de trabalho complexos em uma interface de alta performance.\n\nFuncionalidades Implementadas:\n- Dashboard Inteligente: Central de controle com análise de dados em tempo real e links dinâmicos para navegação ágil.\n- Editor de Documentos Avançado: Páginas com formatação rica estilo Microsoft Word, utilizando a engine Tiptap para suporte a tipografia, cores e estruturação de texto.\n- Gestão de Pipeline: Módulos dedicados para Oportunidades de Negócio e visualização de tarefas em quadros Kanban.\n- Task Trackers: Sistema de rastreamento de atividades vinculado diretamente às oportunidades do pipeline.\n- Data Tools: Ferramentas integradas para Comparador de Planilhas e Pesquisas ETL (Extract, Transform, Load) inteligentes para manipulação de dados.\n- Analytics: Dashboard inteligente focado em métricas de conversão e status de oportunidades.\n- UX Personalizável: Sistema de temas dinâmicos (Light, Sepia, Dark, Black) e interface responsiva otimizada para foco e produtividade.",
    date: "2026",
    media: [
      { type: "image", src: "src/static/GradeTracker.png" },
      { type: "video", src: "src/static/GradeTracker_demo.mp4" }
    ],
    "github": "https://github.com/grade-tracker/grade-tracker"
  },

  {
    id: 2,
    title: "Ultimate Comparison",
    image: "Projetos/2.png",
    tech: ["Python", "Pandas", "Streamlit", "Matplotlib", "Seaborn", "Numpy", "Análise de Dados"],
    description: "Ferramenta para comparação detalhada de produtos, serviços ou dados, permitindo análises rápidas e visuais.",
    date: "2025",
    media: [
      { type: "image", src: "Portfólio.png" },
      { type: "image", src: "Portfólio_2.png" },
      { type: "video", src: "Portfólio_demo.mp4" }
    ],
    "github": "https://github.com/nathanscd/UltimateComparison",
    "link": "https://ultimatecomparison.streamlit.app/"
  },

  {
    id: 3,
    title: "RPGMaster",
    image: "Projetos/4.png",
    tech: ["React", "CSS", "TypeScript", "Firebase (Firestore/Auth/Functions)", "Tailwind CSS"],
    description: "Ferramenta para jogar RPG de forma coesa, eficiente e interessante.",
    date: "2026",
    media: [
      { type: "image", src: "UltimateComparison.png" },
      { type: "image", src: "UltimateComparison_2.png" },
      { type: "video", src: "UltimateComparison_demo.mp4" }
    ],
    "github": "https://github.com/nathanscd/RPGMaster",
    "link": "https://rpgmaster-ns.web.app/"
  },
  
  {
    id: 4,
    title: "CrossX",
    image:"Projetos/5.png",
    tech: ["React", "CSS", "HTML", "TypeScript"],
    description: "Ferramenta para comparação detalhada de produtos, serviços ou dados, permitindo análises rápidas e visuais.",
    date: "2025",
    media: [
      { type: "image", src: "UltimateComparison.png" },
      { type: "image", src: "UltimateComparison_2.png" },
      { type: "video", src: "UltimateComparison_demo.mp4" }
    ],
    "github": "https://github.com/nathanscd/CrossX",
  },

  {
    id: 5,
    title: "Sistema de Cadastro de Produtos",
    image:"Projetos/6.png",
    tech: ["Java", "Swing", "PostGRESQL", "JavaFX"],
    description: "Ferramenta para cadastrar produtos, adicionar, preços e informações de clientes.",
    date: "2025",
    media: [
      { type: "image", src: "UltimateComparison.png" },
      { type: "image", src: "UltimateComparison_2.png" },
      { type: "video", src: "UltimateComparison_demo.mp4" }
    ],
    "github": "https://github.com/nathanscd/cadastroprodutos",
  },

    {
    id: 6,
    title: "Sistema de Cadastro de Pessoas",
    image:"Projetos/7.png",
    tech: ["C", "Ordenação", "Listas", "Estrutura de Dados"],
    description: "Ferramenta para cadastrar pessoas, ordenar, filtrar e editar informações de pessoas.",
    date: "2025",
    media: [
      { type: "image", src: "UltimateComparison.png" },
      { type: "image", src: "UltimateComparison_2.png" },
      { type: "video", src: "UltimateComparison_demo.mp4" }
    ],
    "github": "https://github.com/nathanscd/cadastroprodutos",
  }



];


