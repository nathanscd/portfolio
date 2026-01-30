import { motion, Variants } from "framer-motion";
import { useLang } from "../context/LangContext";
import { Gauge, GraduationCap, Briefcase, Award, Activity, Zap } from "lucide-react";

export default function About() {
  const { t } = useLang();

  const skills = [
    "Java", "JavaScript", "C#", "TypeScript", "Python", "SQL", 
    "Spring Boot", "Node.js", "React", "Angular", "Vue", "Git"
  ];

  const certifications = [
    { name: "CS50's Intro to Computer Science", school: "Harvard", icon: <Zap size={20} /> },
    { name: "AWS Cloud Foundations", school: "AWS Academy", icon: <Zap size={20} /> },
    { name: "Lead Dell", school: "Lead Dell Fortaleza", icon: <Zap size={20} /> }
  ];

  const slashIn: Variants = {
    hidden: { x: -50, opacity: 0, skewX: 10 },
    visible: (i: number) => ({
      x: 0, opacity: 1, skewX: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section id="about" className="w-full min-h-screen bg-white text-[#111111] py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f4f4f4] -skew-x-12 translate-x-32 z-0 opacity-80" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col mb-16">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={slashIn} custom={0}
            className="flex items-center gap-3 mb-4"
          >
            <Gauge size={20} className="text-[#FF001D] animate-pulse" />
            <span className="font-['Orbitron'] text-[#FF001D] font-bold tracking-[0.4em] uppercase text-sm">
              Technical Telemetry // Driver Profile
            </span>
          </motion.div>
          
          <motion.h2 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={slashIn} 
            custom={1}
            className="font-['Orbitron'] text-5xl md:text-[7.5rem] font-black italic uppercase leading-[0.9] tracking-tighter px-2"
          >
            NATHANAEL<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#333] to-[#FF001D]">
              SECUNDO
            </span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              className="relative aspect-[4/5] overflow-hidden group shadow-2xl border-b-8 border-[#FF001D]"
            >
              <img src="PFP.jpeg" alt="Nathanael" className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
                <span className="text-white font-['Orbitron'] font-black italic text-2xl">BRAZIL</span>
                <p className="text-gray-300 text-xs font-bold uppercase tracking-widest">Fortaleza, CE</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              <StatCard label="Semestre" value="05" sub="Ciência da Computação" />
              <StatCard label="Economia Anual" value="U$600" sub="Otimização de Processos" />
              <StatCard label="Redução de Tempo" value="63%" sub="Eficiência Operacional" />
              <StatCard label="Produtividade" value="+67%" sub="Automação Python" />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <div className="bg-[#111] p-8 md:p-12 text-white relative border-r-8 border-[#FF001D] overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Activity size={150} />
              </div>
              <p className="font-['Manrope'] text-xl md:text-2xl font-light italic leading-relaxed relative z-10">
                "Analista de Desenvolvimento Júnior focado na <span className="text-[#FF001D] font-bold">otimização de sistemas</span> e automação de processos, com histórico de redução real de até 63% no tempo operacional."
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="font-['Orbitron'] text-xl font-bold flex items-center gap-3 uppercase">
                <Award className="text-[#FF001D]" /> Performance Upgrades // Certifications
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {certifications.map((cert, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5, backgroundColor: "#111", color: "#fff" }}
                    className="p-6 bg-gray-50 border-t-2 border-gray-100 transition-all group"
                  >
                    <div className="text-[#FF001D] mb-4 group-hover:text-white transition-colors">{cert.icon}</div>
                    <h4 className="font-['Orbitron'] text-[10px] font-black uppercase mb-1 tracking-wider">{cert.name}</h4>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">{cert.school}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-12 pt-4">
              <CareerBlock 
                icon={<Briefcase size={22}/>} 
                title="Professional Track" 
                items={[
                  { 
                    t: "Eletra Energy Solutions", 
                    s: "Intern em Análise de Dados & Desenvolvimento", 
                    p: "Trabalho Atual",
                    d: "Focado em automatizar fluxos internos (Python) aumentando a produtividade em 67%. Desenvolvi aplicativos Fullstack (React, Typescript, Firebase) para organização de fluxo de trabalho e reduzi erros em 30%."
                  },
                  { 
                    t: "Prepara Cursos", 
                    s: "Assistente e Suporte Técnico", 
                    p: "2023",
                    d: "Diagnóstico e correção de problemas em sistemas, validação de funcionalidades e coleta de demandas técnicas para melhorias de aplicações."
                  },
                  { 
                    t: "Grupo VPX", 
                    s: "Tradutor Técnico", 
                    p: "2024",
                    d: "Tradução de materiais técnicos de português para inglês, garantindo clareza na comunicação entre equipes multilíngues."
                  }
                ]} 
              />

              <CareerBlock 
                icon={<GraduationCap size={22}/>} 
                title="Education Pit" 
                items={[
                  { 
                    t: "Estácio", 
                    s: "Bacharelado em Ciência da Computação", 
                    p: "5º Semestre // Prev. 2026.2",
                    d: "Desenvolvimento de competências em algoritmos, arquitetura de sistemas e engenharia de software."
                  },
                  { 
                    t: "EEEP Presidente Roosevelt", 
                    s: "Técnico em Redes de Computadores", 
                    p: "2021-2023",
                    d: "Ensino médio técnico focado em infraestrutura de TI, protocolos de rede e segurança."
                  }
                ]} 
              />
            </div>

            <div className="pt-4">
              <h3 className="font-['Orbitron'] text-xs font-bold mb-6 text-gray-400 uppercase tracking-[0.3em]">Tech Telemetry</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-white border border-gray-200 font-['Orbitron'] text-[9px] font-black uppercase tracking-widest hover:border-[#FF001D] hover:text-[#FF001D] transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, sub }: any) {
  return (
    <div className="bg-gray-50 p-6 border-l-4 border-[#FF001D] hover:bg-black group transition-all duration-300">
      <span className="block font-['Orbitron'] text-4xl font-black text-[#FF001D]">{value}</span>
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111] group-hover:text-white transition-colors">{label}</span>
      <p className="text-[9px] text-gray-400 font-medium italic uppercase mt-1 group-hover:text-gray-500 transition-colors">{sub}</p>
    </div>
  );
}

function CareerBlock({ icon, title, items }: any) {
  return (
    <div className="space-y-8">
      <h4 className="font-['Orbitron'] text-sm font-bold flex items-center gap-3 uppercase tracking-[0.2em] text-[#FF001D]">
        {icon} {title}
      </h4>
      <div className="grid gap-6">
        {items.map((item: any, i: number) => (
          <div key={i} className="border-l-2 border-gray-100 pl-6 py-2 hover:border-[#FF001D] transition-colors group">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h5 className="font-['Orbitron'] text-sm font-black uppercase italic group-hover:text-[#FF001D] transition-colors">{item.t}</h5>
                    <p className="text-[11px] text-[#111] font-bold uppercase">{item.s}</p>
                </div>
                <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap">{item.p}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">{item.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}