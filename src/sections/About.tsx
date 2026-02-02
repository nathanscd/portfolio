import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLang } from "../context/LangContext";
import { 
  Gauge, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Activity, 
  Zap, 
  Crosshair, 
  Flag, 
  Timer, 
  Trophy,
  Cpu,
  Terminal,
  Database,
  MapPin 
} from "lucide-react";

export default function About() {
  const { t } = useLang();

  // --- LÓGICA DO PARALLAX MAGNÉTICO (Mouse Reverso) ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Suavização do movimento (Spring Physics)
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Transformação: Mouse para Direita -> Objeto Gira para Esquerda (Oposto)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]); // Cima/Baixo
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]); // Esquerda/Direita

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calcula posição do mouse relativa ao centro do card (-0.5 a 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reseta para o centro quando o mouse sai
    x.set(0);
    y.set(0);
  };

  // --- DADOS ---
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

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section id="about" className="w-full min-h-screen bg-[#FAFAFA] text-[#111] py-32 px-6 relative overflow-hidden selection:bg-[#FF001D] selection:text-white">
      
      {/* --- BACKGROUND LAYERS (Monaco Track + Noise) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Layer 1: Noise */}
        <div className="absolute inset-0 opacity-[0.3] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0JyBoZWlnaHQ9JzQnIHZpZXdCb3g9JzAgMCA0IDQnPjxwYXRoIGZpbGw9JyM5OTknIG9wYWNpdHk9JzAuMDcnIGQ9J00xIDNoMXYxSDF6TTMgMGgxdjFIM3pNMCAyaDF2MUgwem0yIDFhMSAxIDAgMSAwIDIgMSAxIDAgMCAwLTJ6Jy8+')] mix-blend-multiply"></div>
        {/* Layer 2: Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
        {/* Layer 3: MONACO TRACK */}
        <div className="absolute top-[5%] -right-[15%] w-[900px] h-[900px] opacity-[0.08] rotate-[-15deg]">
            <svg viewBox="0 0 850 650" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M795.6,322.8c-13.9-22-33.8-40.8-58.8-55.1c-6.8-3.9-14.1-7.3-21.7-10.1c-20.4-7.7-42.4-11.6-64.5-11.6c-28.6,0-56.6,6.6-82.2,19.2c-17.4,8.6-33.4,19.7-47.6,32.8l-21,19.5l-22.3-18.9c-13.6-11.5-28.6-21.1-44.7-28.7c-25-11.7-52.3-17.7-80.4-17.7c-21.6,0-43,3.6-63.4,10.8c-8.1,2.9-16,6.6-23.4,10.8c-27.8,16-49.6,37.6-63.7,63.2c-13.9,25.2-21.1,53.2-21.1,82.4c0,31.9,8.6,62.4,25.1,89.1c14.1,23,33.4,42.8,56.3,57.8c7.7,5.1,15.8,9.5,24.3,13.4c22.3,10.1,46.4,15.3,71.5,15.3c29.5,0,58.2-7.3,84.1-21.2c16.3-8.8,31.3-20,44.7-33.1l33.8-33.1l32.8,33.8c13.3,13.6,28.3,25.2,44.3,34.2c25.4,14.3,53.7,21.8,82.9,21.8c24.8,0,48.6-5.3,70.5-15.6c8.2-3.9,16.1-8.5,23.5-13.7c22.3-15.5,40.7-36.1,53.9-60c13.1-23.9,19.8-50.4,19.8-78.1C855.3,402.9,833.7,360.5,795.6,322.8z" stroke="#111" strokeWidth="1.5" strokeDasharray="6 4" strokeMiterlimit="10"/>
                <path d="M795.6,322.8c-13.9-22-33.8-40.8-58.8-55.1c-6.8-3.9-14.1-7.3-21.7-10.1" stroke="#FF001D" strokeWidth="3" strokeLinecap="round"/>
            </svg>
        </div>
        {/* Layer 4: Red Glow */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#FF001D] opacity-[0.06] blur-[150px]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        
        {/* HEADER: DRIVER PROFILE */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={containerVars}
          className="flex flex-col md:flex-row justify-between items-end mb-20 border-b-4 border-[#FF001D] pb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#FF001D] text-white text-[10px] font-black px-2 py-1 uppercase tracking-widest">
                Driver Profile
              </div>
              <span className="font-['Orbitron'] text-gray-400 text-[10px] uppercase tracking-[0.3em]">
                System ID: NS-2026
              </span>
            </div>
            <h2 className="font-['Orbitron'] text-6xl md:text-9xl font-black italic uppercase leading-[0.8] tracking-tighter">
              NATHANAEL<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF001D] to-black pr-5">SECUNDO</span>
            </h2>
          </div>

          <div className="flex gap-8 items-end mt-8 md:mt-0">
             <div className="text-right">
                <p className="font-['Orbitron'] text-[10px] font-bold uppercase text-gray-400 tracking-widest">Role</p>
                <p className="font-['Orbitron'] text-xl font-black italic uppercase">Fullstack Engineer</p>
             </div>
             <div className="text-right">
                <p className="font-['Orbitron'] text-[10px] font-bold uppercase text-gray-400 tracking-widest">Team</p>
                <p className="font-['Orbitron'] text-xl font-black italic uppercase">Eletra Energy</p>
             </div>
             <div className="hidden md:block text-9xl font-['Orbitron'] font-black text-[#f0f0f0] leading-none -mb-6">
                15
             </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* COLUNA ESQUERDA */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* FOTO CARD */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative group border-2 border-black p-2 bg-white"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img src="PFP.jpeg" alt="Pilot" className="w-full h-full object-cover contrast-125 group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                   <div className="flex justify-between">
                      <Crosshair className="text-[#FF001D] opacity-80" size={24} />
                      <div className="bg-black/80 text-white text-[8px] font-['Orbitron'] px-2 py-1">LIVE FEED</div>
                   </div>
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                         <div className="w-16 h-1 bg-[#FF001D]" />
                         <span className="text-white font-['Orbitron'] text-xs font-bold drop-shadow-md">BRA</span>
                      </div>
                      <p className="text-white/80 text-[10px] font-mono">{t.home.hometown_value}</p>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* --- HELMET & GEAR SECTION (COM PARALLAX INTERATIVO) --- */}
            <div 
               className="bg-[#f9f9f9] border border-gray-200 p-6 relative overflow-hidden group hover:border-[#FF001D] transition-colors shadow-lg perspective-[1000px]"
               onMouseMove={handleMouseMove}
               onMouseLeave={handleMouseLeave}
            >
               <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                  <Trophy size={80} />
               </div>
               <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FF001D]/5 to-transparent pointer-events-none" />
               
               <h4 className="font-['Orbitron'] text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10 pointer-events-none">
                 <div className="w-2 h-2 bg-[#FF001D] rounded-full" /> Gear Setup
               </h4>
               
               {/* 3D PNG COM ROTAÇÃO BASEADA NO MOUSE */}
               <div className="w-full h-40 flex items-center justify-center mb-6 relative z-10">
                  <motion.div
                     style={{ 
                        rotateX: rotateX, // Mouse Y
                        rotateY: rotateY, // Mouse X
                     }}
                     animate={{ 
                        y: [-5, 5, -5] // Flutuação contínua
                     }}
                     transition={{
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                     }}
                     className="w-full h-full flex items-center justify-center"
                  >
                     <img 
                       src="https://pngimg.com/d/formula_1_PNG39.png" 
                       alt="F1 Gear" 
                       className="h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)] filter contrast-110"
                     />
                  </motion.div>
               </div>

               {/* ATTRIBUTES BARS */}
               <div className="space-y-3 relative z-10 pointer-events-none">
                  <AttributeBar label="Focus" value={98} />
                  <AttributeBar label="Speed" value={85} />
                  <AttributeBar label="Endurance" value={92} />
               </div>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-2 gap-4">
               <StatBox label="XP Years" value="03" icon={<Timer size={14}/>} />
               <StatBox label="Projects" value="20+" icon={<Flag size={14}/>} />
            </div>

          </div>

          {/* COLUNA DIREITA */}
          <div className="lg:col-span-8">
            
            {/* BIO BLOCK */}
            <div className="mb-16 bg-[#111] text-white p-10 relative overflow-hidden border-l-[8px] border-[#FF001D] shadow-2xl rounded-sm">
               <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#FF001D]/10 to-transparent" />
               <Zap className="text-[#FF001D] absolute top-6 right-6 animate-pulse" size={32} />
               
               <h3 className="font-['Orbitron'] text-2xl font-black italic uppercase mb-6 flex items-center gap-3 relative z-10">
                 Mission Briefing
               </h3>
               <p className="font-['Manrope'] text-lg text-gray-300 leading-relaxed font-light text-justify max-w-3xl relative z-10">
                 "{t.about.description}"
               </p>
               
               <div className="mt-8 flex gap-4 relative z-10">
                  {certifications.map(cert => (
                    <div key={cert.id} className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-sm border border-white/10 hover:border-[#FF001D] transition-colors">
                       <Award size={12} className="text-[#FF001D]" />
                       <span className="text-[10px] font-['Orbitron'] uppercase tracking-wider font-bold">{cert.name}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* TRACK RECORD GRID */}
            <div className="mb-16 grid md:grid-cols-2 gap-12">
               
               {/* 1. PROFESSIONAL EXPERIENCE */}
               <div>
                 <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
                    <Briefcase size={20} className="text-[#FF001D]" />
                    <h3 className="font-['Orbitron'] text-lg font-black italic uppercase text-[#111]">
                       Professional Circuit
                    </h3>
                 </div>

                 <div className="space-y-8 relative">
                    <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200" />
                    {workHistory.map((job, index) => (
                       <TimelineItem key={index} role={job.role} company={job.company} date={job.date} desc={job.desc} type="work" />
                    ))}
                 </div>
               </div>

               {/* 2. ACADEMIC DATA */}
               <div>
                 <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
                    <GraduationCap size={20} className="text-[#FF001D]" />
                    <h3 className="font-['Orbitron'] text-lg font-black italic uppercase text-[#111]">
                       Academic Data
                    </h3>
                 </div>

                 <div className="space-y-4">
                    {educationHistory.map((edu, index) => (
                       <TimelineItem key={index} role={edu.degree} company={edu.school} date={edu.date} desc={edu.focus} type="edu" />
                    ))}
                 </div>
               </div>
            </div>

            {/* SKILLS TELEMETRY */}
            <div>
               <div className="flex items-center gap-4 mb-8">
                  <h3 className="font-['Orbitron'] text-xl font-black italic uppercase text-[#111] flex items-center gap-2">
                     <Gauge size={20} className="text-[#FF001D]" /> Technical Telemetry
                  </h3>
                  <div className="h-[1px] flex-1 bg-gray-200" />
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                  <SkillGroup title="Core Engine" icon={<Terminal size={16}/>} skills={skillSets.core} />
                  <SkillGroup title="Interface Systems" icon={<Cpu size={16}/>} skills={skillSets.frontend} />
                  <SkillGroup title="Backend Infra" icon={<Database size={16}/>} skills={skillSets.backend} />
                  <SkillGroup title="Data & Cloud" icon={<Activity size={16}/>} skills={skillSets.data} />
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// --- SUB COMPONENTS ---

function AttributeBar({ label, value }: { label: string, value: number }) {
   return (
      <div className="flex items-center gap-3">
         <span className="w-20 font-['Orbitron'] text-[9px] font-bold uppercase text-gray-500 text-right">{label}</span>
         <div className="flex-1 h-2 bg-gray-200 skew-x-[-12deg] overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: `${value}%` }}
               transition={{ duration: 1, ease: "circOut" }}
               className="h-full bg-[#FF001D]" 
            />
         </div>
         <span className="text-[9px] font-bold text-[#FF001D] w-6">{value}</span>
      </div>
   )
}

function StatBox({ label, value, icon }: any) {
   return (
      <div className="bg-white border-2 border-gray-100 p-4 hover:border-[#FF001D] hover:shadow-[4px_4px_0px_#FF001D] transition-all group">
         <div className="flex justify-between items-start mb-2">
            <span className="font-['Orbitron'] text-[10px] font-bold uppercase text-gray-400 tracking-widest">{label}</span>
            <div className="text-gray-300 group-hover:text-[#FF001D] transition-colors">{icon}</div>
         </div>
         <span className="font-['Orbitron'] text-3xl font-black text-[#111] group-hover:scale-110 block origin-left transition-transform duration-300">{value}</span>
      </div>
   )
}

function TimelineItem({ role, company, date, desc, type }: any) {
   const isWork = type === 'work';
   if (isWork) {
      return (
         <div className="relative pl-8 group">
            <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-white bg-[#FF001D] group-hover:scale-125 transition-transform shadow-md z-10" />
            <div className="flex flex-col mb-1">
               <div className="flex justify-between items-baseline">
                  <h4 className="font-['Orbitron'] text-sm font-black uppercase text-[#111]">{company}</h4>
                  <span className="font-['Orbitron'] text-[10px] font-bold text-[#FF001D] bg-[#FF001D]/10 px-1.5 py-0.5 rounded-sm">{date}</span>
               </div>
               <span className="font-['Manrope'] text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{role}</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">{desc}</p>
         </div>
      );
   }
   return (
      <div className="bg-gray-50 p-4 border-l-4 border-black hover:border-[#FF001D] hover:bg-white hover:shadow-lg transition-all">
         <div className="flex justify-between items-start mb-1">
            <h4 className="font-['Orbitron'] text-sm font-black uppercase text-[#111]">{company}</h4>
            <span className="font-['Orbitron'] text-[10px] font-bold text-gray-400">{date}</span>
         </div>
         <span className="block font-['Orbitron'] text-xs font-bold text-[#FF001D] uppercase mb-2">{role}</span>
         <p className="text-[10px] text-gray-500 font-mono leading-tight">{desc}</p>
      </div>
   );
}

function SkillGroup({ title, icon, skills }: any) {
   return (
      <div className="bg-gray-50 p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-500 group">
         <h5 className="font-['Orbitron'] text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-[#FF001D] group-hover:scale-105 transition-transform origin-left">
            {icon} {title}
         </h5>
         <div className="flex flex-wrap gap-2">
            {skills.map((skill: string) => (
               <span key={skill} className="px-3 py-1 bg-white border border-gray-200 text-[10px] font-['Orbitron'] font-bold uppercase hover:bg-[#FF001D] hover:text-white hover:border-[#FF001D] transition-all cursor-default skew-x-[-10deg]">
                  <span className="block skew-x-[10deg]">{skill}</span>
               </span>
            ))}
         </div>
      </div>
   )
}