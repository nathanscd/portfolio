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
    "Google Firebase",
    "Tiptap (ProseMirror)",
    "Tailwind CSS",
    "CSS",
    "Framer Motion",
    "Zod"],
    description: "O PODS Administrator é um ecossistema completo de gerenciamento de pipeline e produtividade técnica, projetado para centralizar fluxos de trabalho complexos em uma interface de alta performance.\n\nFuncionalidades Implementadas:\n- Dashboard Inteligente: Central de controle com análise de dados em tempo real e links dinâmicos para navegação ágil.\n- Editor de Documentos Avançado: Páginas com formatação rica estilo Microsoft Word, utilizando a engine Tiptap para suporte a tipografia, cores e estruturação de texto.\n- Gestão de Pipeline: Módulos dedicados para Oportunidades de Negócio e visualização de tarefas em quadros Kanban.\n- Task Trackers: Sistema de rastreamento de atividades vinculado diretamente às oportunidades do pipeline.\n- Data Tools: Ferramentas integradas para Comparador de Planilhas e Pesquisas ETL (Extract, Transform, Load) inteligentes para manipulação de dados.\n- Analytics: Dashboard inteligente focado em métricas de conversão e status de oportunidades.\n- UX Personalizável: Sistema de temas dinâmicos (Light, Sepia, Dark, Black) e interface responsiva otimizada para foco e produtividade.",
    date: "2026",
    media: [
      { type: "image", src: "/Projetos/PODSADM/1.png" },
      { type: "image", src: "/Projetos/PODSADM/2.png" },
      { type: "image", src: "/Projetos/PODSADM/3.png" },
      { type: "image", src: "/Projetos/PODSADM/4.png" },
      { type: "video", src: "/Projetos/PODS - Google Chrome 2026-01-20 15-36-14.mp4" }
    ],
    "github": "https://github.com/nathanscd/PODSAdministrator"
  },

  {
    id: 2,
    title: "Ultimate Comparison",
    image: "Projetos/2.png",
    tech: ["Python", "Pandas", "Streamlit", "Matplotlib", "Seaborn", "Numpy", "Análise de Dados"],
    "description": "O Ultimate Comparison é um ecossistema de ferramentas de análise de dados desenvolvido com Streamlit, projetado para realizar auditorias comparativas complexas em arquivos Excel e PDF através de algoritmos de Fuzzy Matching e Processamento de Linguagem Natural (PLN). A plataforma utiliza a biblioteca RapidFuzz e a classe SequenceMatcher para identificar similaridades e disparidades textuais em nível granular, oferecendo suporte a processamento paralelo com Joblib para manipulação de grandes volumes de dados. Entre as funcionalidades avançadas, destacam-se a extração inteligente de parágrafos via PDFPlumber, automação de relatórios formatados com ReportLab e estilização dinâmica de planilhas com OpenPyXL. O projeto demonstra expertise em engenharia de dados, criação de dashboards interativos, paralelização de tarefas e implementação de heurísticas de comparação para detecção de alterações, adições e remoções em fluxos de trabalho de auditoria e compliance.",
    date: "2025",
    media: [
      { type: "image", src: "/Projetos/UltimateComparison/1.png" },
      { type: "image", src: "/Projetos/UltimateComparison/2.png" },
      { type: "image", src: "/Projetos/UltimateComparison/3.png" },
      { type: "image", src: "/Projetos/UltimateComparison/4.png" },
      { type: "video", src: "/Projetos/UltimateComparison/Página Inicial · Streamlit - Google Chrome 2026-01-20 16-28-24.mp4" }
    ],
    "github": "https://github.com/nathanscd/UltimateComparison",
    "link": "https://ultimatecomparison.streamlit.app/"
  },

  {
    id: 3,
    title: "RPGMaster",
    image: "Projetos/4.png",
    tech: ["React", "CSS", "TypeScript", "Google Firebase", "Tailwind CSS"],
    "description": "O RPG Master é uma plataforma de Virtual Tabletop (VTT) de alto desempenho, desenvolvida para transformar a experiência de jogo em mesa através de uma infraestrutura coesa, eficiente e visualmente impactante. O sistema foi construído utilizando React.js e TypeScript para garantir uma interface reativa e tipagem estática robusta, enquanto o Firebase (Firestore, Auth e Hosting) sustenta a sincronização de dados em tempo real entre mestre e jogadores. Entre as principais funcionalidades técnicas, destacam-se a manipulação dinâmica de imagens para mapas com suporte a Zoom-Pan-Pinch, sistemas de arrastar e soltar (Drag and Drop) para tokens, e algoritmos de processamento de dados que gerenciam automaticamente atributos, recursos e inventários complexos. A plataforma integra ferramentas avançadas como visão noturna via conic-gradients CSS, automação de rolagem de múltiplos dados com detecção de valores críticos e uma hierarquia de permissões que permite ao mestre criar e atribuir fichas diretamente a usuários específicos do banco de dados. O projeto demonstra habilidades avançadas em desenvolvimento Full Stack, integração de BaaS (Backend as a Service), gerenciamento de estados globais com Context API, criação de hooks customizados e automação de CI/CD via GitHub Actions para deploys contínuos e seguros.",
    date: "2026",
    media: [
      { type: "image", src: "/Projetos/RPGMaster01.png" },
      { type: "image", src: "/Projetos/RPGMaster02.png" },
      { type: "image", src: "/Projetos/RPGMaster03.png" },
      { type: "video", src: "/Projetos/RPGMaster - Google Chrome 2026-01-20 15-58-10.mp4" }
    ],
    "github": "https://github.com/nathanscd/RPGMaster",
    "link": "https://rpgmaster-ns.web.app/"
  },
  
  {
    id: 4,
    title: "CrossX",
    image:"Projetos/5.png",
    tech: ["CSS", "HTML", "SQL", "Python", "Flask"],
    "description": "O CrossX é uma solução de gestão de infraestrutura fitness desenvolvida em Python e Flask, focada em otimizar o fluxo operacional de academias através de um sistema CRUD de alta disponibilidade e uma arquitetura baseada em princípios RESTful. A aplicação utiliza o padrão de projeto MVC (Model-View-Controller) para garantir a separação de preocupações, integrando um banco de dados relacional para persistência íntegra de registros de alunos e metadados associados. Entre os diferenciais técnicos, destacam-se a implementação de rotas dinâmicas para manipulação de dados em tempo real, validação de inputs no backend e uma estrutura de diretórios escalável que facilita a manutenção e expansão modular. O projeto demonstra proficiência em desenvolvimento backend com Python, roteamento avançado com Flask, modelagem de dados SQL e gerenciamento de dependências via ambientes virtuais, estabelecendo uma base sólida para a integração futura de módulos de inteligência financeira e automação de planos de treino personalizados.",
    date: "2025",
    media: [
      { type: "image", src: "/Projetos/CrossX/1.png" },
      { type: "video", src: "/Projetos/CrossX/Cadastro de Alunos - CrossX - Google Chrome 2026-01-20 16-43-00.mp4" }
    ],
    "github": "https://github.com/nathanscd/CrossX",
  },

  {
    id: 5,
    title: "Sistema de Cadastro de Produtos",
    image:"Projetos/7.png",
    tech: ["Java", "Swing", "PostGRESQL", "JavaFX", "SQL"],
    "description": "O Sistema de Cadastro de Produtos é uma aplicação desktop robusta desenvolvida em Java, que integra uma interface gráfica (GUI) via Swing a um sistema de gerenciamento de banco de dados relacional (PostgreSQL). A arquitetura foca na implementação completa das operações de CRUD (Create, Read, Update, Delete) utilizando a API JDBC para persistência de dados. Entre os destaques técnicos, estão o uso de PreparedStatements para prevenir SQL Injection, lógica de validação de dados para garantir a integridade dos tipos numéricos e tratamento de exceções de SQL para gestão de erros em tempo real. A interface utiliza layouts dinâmicos (GridLayout, FlowLayout e BorderLayout) para uma experiência de usuário organizada, além de disparadores de eventos assíncronos via lambdas. O projeto demonstra domínio em integração de banco de dados BaaS, manipulação de estados de UI, design de schemas SQL com constraints de unicidade e arquitetura de software orientada a objetos para ferramentas de automação comercial.",
    date: "2025",
    media: [
      { type: "image", src: "" },
      { type: "image", src: "" },
      { type: "video", src: "" }
    ],
    "github": "https://github.com/nathanscd/cadastroprodutos",
  },

    {
    id: 6,
    title: "Sistema de Cadastro de Pessoas",
    image:"Projetos/6.png",
    tech: ["C", "Ordenação", "Listas", "Estrutura de Dados"],
    "description": "Este sistema de processamento de estruturas de dados em C é uma aplicação de baixo nível focada em algoritmos de ordenação e gerenciamento dinâmico de memória via listas encadeadas. O projeto implementa uma estrutura de dados do tipo Pilha (LIFO) para manipulação de registros de usuários, utilizando alocação dinâmica com malloc e free para garantir eficiência no uso da memória. Um diferencial técnico relevante é a implementação de múltiplos algoritmos de ordenação aplicados a nós de memória: o Bubble Sort para ordenação por idade e o Insertion Sort para ordenação por altura, ambos adaptados para navegar em ponteiros de uma lista encadeada simples. Além disso, o sistema conta com uma lógica rigorosa de validação de dados, incluindo um algoritmo de verificação de dígitos de controle de CPF e filtros de consistência para idade e altura. O projeto demonstra proficiência em manipulação de ponteiros, aritmética de endereços, definição de tipos abstratos de dados (TADs) e análise de complexidade algorítmica em ambiente C puro.",
    date: "2025",
    media: [
      { type: "image", src: "/Projetos/CadastroPessoas/1.png" },
      { type: "image", src: "/Projetos/CadastroPessoas/2.png" },
      { type: "video", src: "/Projetos/CadastroPessoas/Online C Compiler - online editor - Google Chrome 2026-01-20 16-57-08.mp4" }
    ],
    "github": "https://github.com/nathanscd/cadastroprodutos",
  }
];


