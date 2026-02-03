import React, { useEffect } from "react";
import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLang } from "../context/LangContext";
import { 
  Gauge, GraduationCap, Briefcase, Award, Activity, 
  Zap, Crosshair, Flag, Timer, Trophy, Cpu, 
  Terminal, Database, MapPin, Radio, Globe, ShieldCheck, AlertCircle
} from "lucide-react";

const AttributeBar = ({ label, value }: { label: string, value: number }) => (
  <div className="space-y-1">
    <div className="flex justify-between items-end">
      <span className="font-['Orbitron'] text-[8px] text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="font-['Orbitron'] text-[10px] font-black text-[#FF001D]">{value}%</span>
    </div>
    <div className="h-1 w-full bg-gray-200 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="h-full bg-[#FF001D]"
      />
    </div>
  </div>
);

const LanguageChannel = ({ lang, level, flag }: { lang: string, level: string, flag: string }) => (
  <div className="flex items-center gap-4 p-3 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
    <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 font-['Orbitron'] text-lg group-hover:border-[#FF001D] transition-colors">
      {flag}
    </div>
    <div className="flex flex-col">
      <span className="font-['Orbitron'] text-[10px] text-[#FF001D] font-bold uppercase tracking-widest">Radio Channel</span>
      <div className="flex items-center gap-2">
        <span className="font-['Orbitron'] text-sm font-black text-white uppercase">{lang}</span>
        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
      </div>
      <span className="font-mono text-[9px] text-white/40 uppercase">{level}</span>
    </div>
  </div>
);

export default function About() {
  const { t } = useLang();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const skillSets = {
    core: ["Java", "C#", "Python", "TypeScript"],
    frontend: ["React", "Angular", "Vue.js", "Tailwind", "Framer Motion"],
    backend: ["Spring Boot", "Node.js", ".NET Core", "Docker"],
    data: ["SQL Server", "PostgreSQL", "Firebase", "Redis"]
  };

  const workHistory = [
    { role: "Intern em Análise & Dev", company: "Eletra Energy Solutions", date: "Current", desc: "Automação de fluxos (Python), aumento de produtividade (+67%). Desenvolvimento Fullstack (React/Firebase)." },
    { role: "Assistente Técnico", company: "Prepara Cursos", date: "2023", desc: "Diagnóstico de hardware, manutenção de infraestrutura de redes e suporte a usuários." },
    { role: "Freelance Developer", company: "Independent", date: "2022", desc: "Desenvolvimento de landing pages e automações web." }
  ];

  const educationHistory = [
    { school: "Estácio", degree: "Bacharelado C. Computação", date: "Prev. 2026.2", focus: "Algoritmos, Eng. Software, IA." },
    { school: "EEEP Pres. Roosevelt", degree: "Técnico em Redes", date: "2021-2023", focus: "Infraestrutura, TCP/IP, Segurança." }
  ];

  const certifications = [
    { name: "CS50's Intro to CS", provider: "Harvard", id: "CERT_01" },
    { name: "AWS Cloud Foundations", provider: "AWS Academy", id: "CERT_02" },
    { name: "Lead Dell", provider: "Dell Technologies", id: "CERT_03" }
  ];

  return (
    <section id="about" className="w-full min-h-screen bg-[#050505] text-white py-32 px-6 relative overflow-hidden selection:bg-[#FF001D] selection:text-white">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF001D]/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 border-b-2 border-white/10 pb-12"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="px-3 py-1 bg-[#FF001D] text-white font-['Orbitron'] text-[10px] font-black uppercase tracking-[0.2em] skew-x-[-12deg]">
                Driver Dossier
              </div>
              <span className="font-mono text-white/20 text-[10px] tracking-widest uppercase">Ref: SF24-NS15</span>
            </div>
            <h2 className="font-['Orbitron'] text-6xl md:text-9xl font-black italic uppercase leading-[0.8] tracking-tighter">
              NATHANAEL<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF001D] to-white">SECUNDO</span>
            </h2>
          </div>

          <div className="flex gap-12 items-end mt-12 md:mt-0">
             <div className="text-right">
                <p className="font-['Orbitron'] text-[10px] text-white/30 uppercase tracking-widest mb-1">Current Status</p>
                <div className="flex items-center gap-2 justify-end">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-['Orbitron'] text-xl font-black italic uppercase">On Track</span>
                </div>
             </div>
             <div className="hidden md:block text-9xl font-['Orbitron'] font-black text-white/5 leading-none -mb-6">
                15
             </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative group border border-white/10 p-3 bg-white/[0.02] backdrop-blur-sm"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                <img src="PFP.jpeg" alt="Pilot" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                   <div className="flex justify-between items-start">
                      <Crosshair className="text-[#FF001D] opacity-60" size={32} />
                      <div className="flex flex-col items-end">
                        <div className="bg-[#FF001D] text-white text-[8px] font-['Orbitron'] px-2 py-1 font-black uppercase tracking-widest">Live Telemetry</div>
                        <span className="font-mono text-[8px] text-white/40 mt-1">LATENCY: 4ms</span>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <div className="flex items-center gap-3">
                         <div className="w-12 h-[2px] bg-[#FF001D]" />
                         <span className="text-white font-['Orbitron'] text-xs font-black tracking-widest">BRAZILIAN GP</span>
                      </div>
                      <p className="text-white/40 text-[9px] font-mono uppercase tracking-tighter">Maranello Digital Division // Secured</p>
                   </div>
                </div>
              </div>
            </motion.div>

            <div 
               className="bg-white/[0.02] border border-white/10 p-8 relative overflow-hidden group hover:border-[#FF001D]/50 transition-all duration-500 perspective-[1000px]"
               onMouseMove={handleMouseMove}
               onMouseLeave={handleMouseLeave}
            >
               <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Trophy size={120} />
               </div>
               
               <h4 className="font-['Orbitron'] text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3 text-white/60">
                 <Activity size={14} className="text-[#FF001D]" /> Performance Metrics
               </h4>
               
               <div className="w-full h-48 flex items-center justify-center mb-10 relative">
                  <motion.div
                     style={{ rotateX, rotateY }}
                     animate={{ y: [-8, 8, -8] }}
                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                     className="w-full h-full flex items-center justify-center"
                  >
                     <img 
                       src="https://pngimg.com/d/formula_1_PNG39.png" 
                       alt="F1 Gear" 
                       className="h-full object-contain drop-shadow-[0_30px_30px_rgba(255,0,0,0.2)] filter contrast-125 brightness-110"
                     />
                  </motion.div>
               </div>

               <div className="space-y-5">
                  <AttributeBar label="Technical Focus" value={98} />
                  <AttributeBar label="Execution Speed" value={85} />
                  <AttributeBar label="System Endurance" value={92} />
               </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-['Orbitron'] text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-6 flex items-center gap-2">
                <Globe size={12} /> Communication Channels
              </h4>
              <div className="grid gap-3">
                <LanguageChannel lang="Portuguese" level="Native Speaker" flag="🇧🇷" />
                <LanguageChannel lang="English" level="Professional Working" flag="🇺🇸" />
                <LanguageChannel lang="Italian" level="Learning / Scuderia" flag="🇮🇹" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <Briefcase className="text-[#FF001D]" size={20} />
                  <h3 className="font-['Orbitron'] text-xl font-black italic uppercase tracking-tighter">Career Path</h3>
                </div>
                <div className="space-y-8 border-l border-white/10 pl-8 relative">
                  {workHistory.map((job, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute -left-[37px] top-1 w-4 h-4 bg-[#050505] border-2 border-[#FF001D] rounded-full" />
                      <span className="font-mono text-[10px] text-[#FF001D] font-bold uppercase tracking-widest">{job.date}</span>
                      <h4 className="font-['Orbitron'] text-sm font-black uppercase mt-1">{job.role}</h4>
                      <p className="font-['Orbitron'] text-[10px] text-white/40 uppercase mb-3">{job.company}</p>
                      <p className="font-mono text-xs text-white/60 leading-relaxed uppercase tracking-tight">{job.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <GraduationCap className="text-[#FF001D]" size={20} />
                  <h3 className="font-['Orbitron'] text-xl font-black italic uppercase tracking-tighter">Academic Specs</h3>
                </div>
                <div className="space-y-8 border-l border-white/10 pl-8 relative">
                  {educationHistory.map((edu, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute -left-[37px] top-1 w-4 h-4 bg-[#050505] border-2 border-white/20 rounded-full" />
                      <span className="font-mono text-[10px] text-white/30 font-bold uppercase tracking-widest">{edu.date}</span>
                      <h4 className="font-['Orbitron'] text-sm font-black uppercase mt-1">{edu.degree}</h4>
                      <p className="font-['Orbitron'] text-[10px] text-[#FF001D] font-bold uppercase mb-3">{edu.school}</p>
                      <p className="font-mono text-xs text-white/60 leading-relaxed uppercase tracking-tight">Focus: {edu.focus}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF001D]/5 blur-3xl" />
              <div className="flex items-center gap-4 mb-10">
                <Cpu className="text-[#FF001D]" size={20} />
                <h3 className="font-['Orbitron'] text-xl font-black italic uppercase tracking-tighter">Technical Stack</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                {Object.entries(skillSets).map(([category, skills], i) => (
                  <div key={category} className="space-y-4">
                    <h5 className="font-['Orbitron'] text-[10px] font-black text-[#FF001D] uppercase tracking-[0.3em]">{category}</h5>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 font-mono text-[10px] text-white/70 uppercase hover:border-[#FF001D] hover:text-white transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Award className="text-[#FF001D]" size={20} />
                  <h3 className="font-['Orbitron'] text-xl font-black italic uppercase tracking-tighter">Verified Certs</h3>
                </div>
                <div className="grid gap-4">
                  {certifications.map((cert, i) => (
                    <div key={i} className="p-4 border border-white/5 bg-white/[0.01] flex justify-between items-center group hover:border-white/20 transition-colors">
                      <div>
                        <h5 className="font-['Orbitron'] text-[11px] font-black uppercase text-white/90">{cert.name}</h5>
                        <p className="font-mono text-[9px] text-white/30 uppercase">{cert.provider} // {cert.id}</p>
                      </div>
                      <ShieldCheck size={16} className="text-green-500/50 group-hover:text-green-500 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 border border-[#FF001D]/20 bg-[#FF001D]/5 flex flex-col justify-center items-center text-center relative group">
                <div className="absolute top-2 left-2">
                  <AlertCircle size={14} className="text-[#FF001D] opacity-40" />
                </div>
                <Zap size={40} className="text-[#FF001D] mb-4 animate-pulse" />
                <h4 className="font-['Orbitron'] text-lg font-black italic uppercase mb-2">High Speed Development</h4>
                <p className="font-mono text-[10px] text-white/40 uppercase leading-relaxed">
                  Engineered for maximum throughput and zero-latency user experiences. Optimized for the modern web.
                </p>
                <div className="mt-6 flex gap-2">
                  {[1,2,3].map(i => <div key={i} className="w-8 h-1 bg-[#FF001D]" />)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
          <div className="flex items-center gap-4">
            <Radio size={16} className="text-[#FF001D] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Signal Strength: Optimal</span>
          </div>
          <div className="flex items-center gap-8 font-mono text-[9px] uppercase tracking-tighter">
            <span>S-Duct Aero: Active</span>
            <span>MGU-K Recovery: 94%</span>
            <span>DRS Status: Enabled</span>
          </div>
          <p className="font-mono text-[10px] uppercase">© 2026 Scuderia Secundo</p>
        </div>
      </div>
    </section>
  );
}
