import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Activity, Cpu, Wind, BarChart3, Settings, Trophy, RotateCw, Zap, Flag } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function Home({ setSection }: { setSection: (val: any) => void }) {
  const { t } = useLang();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <div ref={containerRef} className="bg-[#FAFAFA] text-[#111] overflow-x-hidden selection:bg-[#FF001D] selection:text-white">
      
      <div className="fixed top-0 left-0 w-full h-1 z-50 flex pointer-events-none">
         <div className="h-full bg-green-500 w-1/3 animate-pulse" />
         <div className="h-full bg-yellow-500 w-1/3 opacity-0" /> 
         <div className="h-full bg-[#FF001D] w-1/3" />
      </div>

      <HeroSection t={t} yParallax={yParallax} rotateParallax={rotateParallax} />
      <ChampionshipsSection />
      <TelemetrySection />
      <EngineRoomSection t={t} setSection={setSection} />

    </div>
  );
}

function HeroSection({ t, yParallax, rotateParallax }: any) {
  const [tire, setTire] = useState<"soft" | "medium" | "hard">("soft");

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    
        <div className="max-w-[1600px] w-full mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
             <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative group perspective-[2000px]"
             >
                <div className="relative z-20 border-[8px] border-white bg-white overflow-hidden shadow-2xl rounded-sm">
                    <img src="PFP.jpeg" className="w-full group-hover: transition-all duration-700 scale-110 group-hover:scale-100" />
                    
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                        <div className="bg-white/90 p-4 shadow-lg backdrop-blur-sm">
                            <span className="block font-['Orbitron'] text-xs font-bold text-[#FF001D] tracking-widest uppercase mb-1">Scuderia</span>
                            <span className="block font-['Orbitron'] text-4xl font-black italic">SECUNDO</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-['Orbitron'] text-8xl font-black text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-none italic">15</span>
                        </div>
                    </div>
                </div>

                <div className="absolute top-1/2 -left-12 -translate-y-1/2 flex flex-col gap-4 z-30 bg-white shadow-xl p-2 border border-gray-100 rounded-full">
                    {['soft', 'medium', 'hard'].map((type) => (
                        <button 
                            key={type}
                            onClick={() => setTire(type as any)}
                            className={`w-10 h-10 rounded-full border-[3px] flex items-center justify-center transition-all duration-300 relative group/tire ${
                                tire === type ? 'scale-110 opacity-100 shadow-md' : 'opacity-40 hover:opacity-100 hover:scale-105'
                            } ${
                                type === 'soft' ? 'border-[#FF001D] bg-white' : type === 'medium' ? 'border-[#FFD700] bg-white' : 'border-gray-800 bg-white'
                            }`}
                        >
                            <span className={`w-8 h-8 rounded-full border border-dashed border-gray-300 ${type === 'soft' ? 'bg-red-50' : type === 'medium' ? 'bg-yellow-50' : 'bg-gray-100'}`} />
                        </button>
                    ))}
                </div>
             </motion.div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 text-left relative">
             <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                        <motion.div 
                            key={i} 
                            initial={{  backgroundColor: "#ddd" }}
                            animate={{ backgroundColor: ["#ddd", "#FF001D", "#ddd"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            className="w-4 h-4 rounded-full border border-gray-300" 
                        />
                    ))}
                </div>
                <span className="font-['Orbitron'] text-[#FF001D] text-xs font-bold tracking-[0.3em] uppercase animate-pulse">Race Control: Green Flag</span>
             </div>

             <div className="relative z-10">
                <h1 className="font-['Orbitron'] text-5xl md:text-7xl lg:text-[7rem] font-black italic uppercase leading-[0.85] tracking-tighter text-[#111] mb-1">
                    NATHANAEL
                </h1>
                <h1 className="font-['Orbitron'] text-5xl md:text-7xl lg:text-[7rem] font-black italic uppercase leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF001D] to-[#8a0010]">
                    SECUNDO
                </h1>
             </div>

             <div className="mt-12 flex flex-col md:flex-row gap-12 border-t border-gray-200 pt-12">
                <div className="max-w-md">
                    <h3 className="flex items-center gap-2 font-['Orbitron'] text-[#FF001D] font-bold uppercase tracking-widest text-xs mb-4">
                        <Activity size={14} /> Current Role
                    </h3>
                    <p className="font-['Manrope'] text-xl text-gray-600 font-light leading-relaxed">
                        Fullstack Engineer driving performance at <span className="text-[#111] font-bold border-b-2 border-[#FF001D]">Eletra Energy</span>. Specializing in high-speed React interfaces and robust Python automation engines.
                    </p>
                </div>
                
                <div className="flex flex-col gap-6">
                    <StatCompact label="XP Years" value="03" />
                    <StatCompact label="Projects" value="20+" />
                    <StatCompact label="Win Rate" value="100%" />
                </div>
             </div>
          </div>
        </div>
        
        <motion.div 
            style={{ x: yParallax }}
            className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none"
        >
             <img src="https://purepng.com/public/uploads/large/purepng.com-formula-1-carformula-1-carformula-1-racing-carformula-one-car-1701527494553j8i3m.png" className="w-[80%] max-w-[1200px] mx-auto filter grayscale contrast-125" />
        </motion.div>
    </section>
  );
}

function StatCompact({ label, value }: any) {
    return (
        <div>
            <span className="block font-['Orbitron'] text-[9px] text-gray-400 uppercase tracking-widest">{label}</span>
            <span className="font-['Orbitron'] text-3xl font-black italic text-[#111]">{value}</span>
        </div>
    )
}

function ChampionshipsSection() {
    return (
        <section className="relative py-32 bg-white perspective-[1000px] overflow-hidden">
            <motion.div 
                className="absolute inset-0 bg-[#050505] z-0 pointer-events-none"
                initial={{ clipPath: "circle(0% at 50% 50%)" }}
                whileInView={{ clipPath: "circle(150% at 50% 50%)" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
            />

            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
            
            <div className="max-w-[1600px] mx-auto px-6 relative z-10">
                <div className="flex items-end justify-between mb-24 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <Trophy size={18} className="text-[#FF001D]" />
                             <span className="font-['Orbitron'] text-[#FF001D] text-[10px] font-black uppercase tracking-[0.3em]">Hall of Fame</span>
                        </div>
                        <h2 className="font-['Orbitron'] text-5xl md:text-7xl font-black italic uppercase text-white leading-none">
                            Grand Prix <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF001D] to-red-900">Wins</span>
                        </h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-20">
                    <Circuit3D 
                        name="MONACO" 
                        country="MC"
                        year="2025"
                        path="M50,150 C60,140 70,140 80,150 L90,160 C95,165 100,165 105,160 L120,130 C125,120 130,120 135,125 L150,140 L160,130 C170,110 160,100 150,90 L140,85 C130,80 130,70 140,65 L160,60 C180,55 190,70 185,90 L180,110 L200,120 C220,130 220,150 200,160 L150,180 C130,190 100,190 80,180 L50,160 Z"
                        project="RPGMaster"
                        desc="Complex state management system built with React & Redux."
                        stats={{ speed: "High", downforce: "Max", strategy: "Hard" }}
                    />
                    <Circuit3D 
                        name="INTERLAGOS" 
                        country="BR"
                        year="2024"
                        path="M80,50 L180,50 C200,50 210,70 200,90 L180,130 C170,150 150,150 140,130 L130,110 C120,90 100,90 90,110 L80,130 C70,150 60,150 50,130 L40,110 L60,90 C70,80 70,60 80,50 Z"
                        project="Eletra Auto"
                        desc="Python automation scripts optimized for speed and reliability."
                        stats={{ speed: "Med", downforce: "Med", strategy: "Mix" }}
                    />
                    <Circuit3D 
                        name="SILVERSTONE" 
                        country="UK"
                        year="2026"
                        path="M100,150 L120,140 C140,130 160,130 180,140 L200,150 C220,160 240,150 250,130 L240,100 C230,80 210,80 200,90 L180,100 C160,110 140,100 130,80 L140,60 C150,40 130,30 110,40 L80,50 C60,60 50,80 60,100 L70,120 C80,140 90,155 100,150 Z"
                        project="Portfolio V2"
                        desc="Award-winning frontend architecture using Framer Motion."
                        stats={{ speed: "Max", downforce: "Low", strategy: "Soft" }}
                    />
                </div>
            </div>
        </section>
    )
}

function Circuit3D({ name, country, year, path, project, desc, stats }: any) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div 
            className="relative w-full aspect-[4/5] group cursor-pointer perspective-[1000px]"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div 
                className="w-full h-full relative preserve-3d"
                initial={{ rotateX: 20, rotateY: -10, rotateZ: 2 }}
                whileHover={{ scale: 1.05 }} // Mantém apenas o zoom no hover
                animate={{ 
                    rotateY: isFlipped ? 180 : -10, 
                    rotateX: isFlipped ? 0 : 20, 
                    rotateZ: isFlipped ? 0 : 2 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* --- FRONT: TRACK DESIGN (Carbon) --- */}
                <div 
                    className="absolute inset-0 bg-[#161616] border border-white/10 rounded-xl shadow-2xl p-8 flex flex-col justify-between overflow-hidden backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                    <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#FF001D] blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity" />

                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                 <span className="bg-white text-black text-[9px] font-black px-1.5 rounded-sm">{country}</span>
                                 <span className="text-[#FF001D] font-['Orbitron'] text-[10px] font-bold">{year}</span>
                            </div>
                            <h3 className="text-3xl font-['Orbitron'] font-black italic text-white uppercase">{name}</h3>
                        </div>
                        <Trophy size={20} className="text-[#444] group-hover:text-[#FFD700] transition-colors" />
                    </div>

                    <div className="relative z-10 flex-grow flex items-center justify-center py-8">
                        <svg viewBox="0 0 300 250" className="w-full h-full drop-shadow-[0_0_25px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_30px_rgba(255,0,29,0.5)] transition-all duration-500">
                             <path 
                                d={path} 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="3" 
                                className="text-gray-700 group-hover:text-white transition-colors duration-500" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                             />
                             <path 
                                d={path} 
                                fill="none" 
                                stroke="#FF001D" 
                                strokeWidth="3" 
                                strokeDasharray="10 10"
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                             />
                        </svg>
                    </div>

                    <div className="relative z-10 pt-6 border-t border-white/10">
                        <div className="flex justify-between items-center opacity-70">
                            {Object.entries(stats).map(([key, val]) => (
                                <div key={key} className="text-center">
                                    <span className="block text-[8px] uppercase text-gray-500 mb-1">{key}</span>
                                    <span className="block text-[10px] font-bold text-white uppercase">{(val as string)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- BACK: PROJECT DETAILS (Rotated 180) --- */}
                <div 
                    className="absolute inset-0 bg-[#000] border-2 border-[#FF001D] rounded-xl shadow-2xl p-8 flex flex-col justify-between overflow-hidden backface-hidden"
                    style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                             <Flag className="text-[#FF001D]" size={20} />
                             <span className="font-['Orbitron'] text-white text-[10px] font-black uppercase tracking-[0.3em]">Winning Project</span>
                        </div>
                        
                        <h3 className="text-3xl font-['Orbitron'] font-black italic text-white uppercase mb-4 leading-none">{project}</h3>
                        <p className="text-gray-400 font-['Manrope'] text-sm leading-relaxed font-medium border-l-2 border-[#FF001D] pl-3">
                            {desc}
                        </p>
                    </div>

                    <div className="relative z-10">
                         <button className="w-full py-3 bg-[#FF001D] text-white font-['Orbitron'] font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-[#FF001D] transition-colors skew-x-[-10deg]">
                            View Telemetry
                         </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

function TelemetrySection() {
    return (
        <section className="bg-white py-32 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                             <Cpu className="text-[#FF001D] animate-spin-slow" size={24} />
                             <span className="font-['Orbitron'] text-gray-400 text-xs font-bold uppercase tracking-[0.4em]">System Diagnostics</span>
                        </div>
                        <h2 className="font-['Orbitron'] text-5xl md:text-7xl font-black italic uppercase text-[#111] leading-none">
                            Active <span className="text-[#FF001D]">Telemetry</span>
                        </h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <ECUCard 
                        title="Power Unit" 
                        subtitle="Backend Infrastructure"
                        code="PU-26" 
                        stats={[
                            { label: "Node.js", val: 92, max: "22k" },
                            { label: "Python", val: 88, max: "15k" },
                            { label: "C# .NET", val: 85, max: "12k" }
                        ]}
                        color="text-purple-600"
                        accent="bg-purple-600"
                        icon={<Settings />}
                    />
                    <ECUCard 
                        title="Aerodynamics" 
                        subtitle="Frontend Interface"
                        code="AERO-X" 
                        stats={[
                            { label: "React / Next", val: 96, max: "MAX" },
                            { label: "Tailwind", val: 98, max: "MIN" },
                            { label: "Framer", val: 90, max: "OPT" }
                        ]}
                        color="text-[#FF001D]"
                        accent="bg-[#FF001D]"
                        icon={<Wind />}
                    />
                    <ECUCard 
                        title="Race Strategy" 
                        subtitle="Data & Analytics"
                        code="STRAT-1" 
                        stats={[
                            { label: "SQL Server", val: 85, max: "FST" },
                            { label: "PostgreSQL", val: 82, max: "STB" },
                            { label: "Docker", val: 78, max: "RDY" }
                        ]}
                        color="text-blue-600"
                        accent="bg-blue-600"
                        icon={<BarChart3 />}
                    />
                </div>
            </div>
        </section>
    )
}

function ECUCard({ title, subtitle, code, stats, color, accent, icon }: any) {
    return (
        <div className="bg-[#FAFAFA] border border-gray-200 p-8 rounded-sm relative overflow-hidden group hover:border-[#FF001D] hover:shadow-2xl transition-all duration-500">
            <div className={`absolute top-0 left-0 w-full h-1 ${accent} opacity-100`} />
            
            <div className="flex justify-between items-start mb-8">
                <div>
                    <span className="font-['Orbitron'] text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 block">{code}</span>
                    <h3 className="font-['Orbitron'] text-2xl font-black italic text-[#111] uppercase">{title}</h3>
                    <span className="text-xs text-gray-500 font-bold">{subtitle}</span>
                </div>
                <div className={`p-3 bg-gray-100 rounded-lg ${color}`}>{icon}</div>
            </div>

            <div className="space-y-6">
                {stats.map((s: any, i: number) => (
                    <div key={i}>
                        <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                            <span className="text-[#111]">{s.label}</span>
                            <span className={color}>{s.max}</span>
                        </div>
                        <div className="h-3 w-full bg-gray-200 rounded-sm overflow-hidden flex gap-[2px]">
                            {[...Array(20)].map((_, idx) => (
                                <div 
                                    key={idx} 
                                    className={`flex-1 rounded-sm transition-all duration-300 ${
                                        (idx * 5) < s.val 
                                            ? idx > 15 ? 'bg-red-500' : idx > 10 ? 'bg-yellow-500' : 'bg-green-500' 
                                            : 'bg-gray-300 opacity-20'
                                    }`} 
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function EngineRoomSection({ t, setSection }: any) {
    const [status, setStatus] = useState<"idle" | "revving" | "launched">("idle");
    const [rpm, setRpm] = useState(0);

    const handleStart = () => {
        setStatus("revving");
        let currentRpm = 0;
        const interval = setInterval(() => {
            currentRpm += Math.random() * 800 + 200;
            if (currentRpm > 12000) currentRpm = 11500 + Math.random() * 500;
            setRpm(currentRpm);
        }, 50);

        setTimeout(() => {
            clearInterval(interval);
            setStatus("launched");
            setRpm(12000);
        }, 2000);
    };

    return (
        <section className="bg-[#FF001D] relative min-h-[800px] flex flex-col items-center justify-center overflow-hidden">
             <div className="absolute inset-0 opacity-10 font-['Orbitron'] text-[20rem] font-black italic text-black whitespace-nowrap pointer-events-none select-none">
                 SECUNDO 15 SECUNDO 15
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <svg viewBox="0 0 850 650" className="w-full max-w-[1000px] transform rotate-[-5deg]">
                    <motion.path 
                        d="M795.6,322.8c-13.9-22-33.8-40.8-58.8-55.1c-6.8-3.9-14.1-7.3-21.7-10.1c-20.4-7.7-42.4-11.6-64.5-11.6c-28.6,0-56.6,6.6-82.2,19.2c-17.4,8.6-33.4,19.7-47.6,32.8l-21,19.5l-22.3-18.9c-13.6-11.5-28.6-21.1-44.7-28.7c-25-11.7-52.3-17.7-80.4-17.7c-21.6,0-43,3.6-63.4,10.8c-8.1,2.9-16,6.6-23.4,10.8c-27.8,16-49.6,37.6-63.7,63.2c-13.9,25.2-21.1,53.2-21.1,82.4c0,31.9,8.6,62.4,25.1,89.1c14.1,23,33.4,42.8,56.3,57.8c7.7,5.1,15.8,9.5,24.3,13.4c22.3,10.1,46.4,15.3,71.5,15.3c29.5,0,58.2-7.3,84.1-21.2c16.3-8.8,31.3-20,44.7-33.1l33.8-33.1l32.8,33.8c13.3,13.6,28.3,25.2,44.3,34.2c25.4,14.3,53.7,21.8,82.9,21.8c24.8,0,48.6-5.3,70.5-15.6c8.2-3.9,16.1-8.5,23.5-13.7c22.3-15.5,40.7-36.1,53.9-60c13.1-23.9,19.8-50.4,19.8-78.1C855.3,402.9,833.7,360.5,795.6,322.8z" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="10"
                        initial={{ pathLength: 0.1, opacity: 0.1 }}
                        animate={status === "revving" ? { pathLength: 1, opacity: 1, transition: { duration: 2, ease: "linear" } } : { pathLength: 0.1, opacity: 0.1 }}
                    />
                </svg>
            </div>

            <div className="relative z-20 w-full max-w-3xl px-6 text-center">
                <AnimatePresence mode="wait">
                    {status === "idle" && (
                        <motion.div 
                            key="start"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="space-y-8"
                        >
                            <h2 className="font-['Orbitron'] text-6xl md:text-8xl text-white font-black italic uppercase tracking-tighter drop-shadow-lg">
                                IGNITION
                            </h2>
                            <button 
                                onClick={handleStart}
                                className="group relative inline-flex items-center justify-center px-16 py-6 bg-white overflow-hidden skew-x-[-12deg] shadow-[10px_10px_0px_rgba(0,0,0,0.3)] hover:shadow-[15px_15px_0px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="skew-x-[12deg] flex items-center gap-4 font-['Orbitron'] text-[#FF001D] font-black text-xl uppercase tracking-widest">
                                    Start Engine <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                                </div>
                            </button>
                        </motion.div>
                    )}

                    {status === "revving" && (
                        <motion.div 
                            key="revving"
                            className="w-full"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        >
                             <div className="flex justify-between items-end mb-4 px-4">
                                <span className="font-['Orbitron'] text-white font-bold">RPM</span>
                                <span className="font-['Orbitron'] text-4xl text-white font-black">{Math.floor(rpm)}</span>
                             </div>
                             
                             <div className="flex gap-1 h-16 w-full items-end bg-black/20 p-2 rounded">
                                {[...Array(20)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`flex-1 transition-all duration-75 rounded-t-sm ${
                                            (rpm / 12000) * 20 > i 
                                                ? i > 16 ? 'bg-blue-500' : i > 12 ? 'bg-red-500' : 'bg-green-500' 
                                                : 'bg-black/30'
                                        }`}
                                        style={{ height: (rpm / 12000) * 20 > i ? '100%' : '10%' }}
                                    />
                                ))}
                             </div>
                             <p className="mt-4 font-['Orbitron'] text-white uppercase tracking-[0.5em] animate-pulse">Synchronizing Systems...</p>
                        </motion.div>
                    )}

                    {status === "launched" && (
                        <motion.div 
                            key="menu"
                            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
                        >
                             <MenuCard title={t.nav.projects} onClick={() => setSection("projects")} icon={<Trophy />} />
                             <MenuCard title={t.nav.about} onClick={() => setSection("about")} icon={<Activity />} />
                             <MenuCard title={t.nav.contact} onClick={() => setSection("contact")} icon={<Zap />} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

function MenuCard({ title, onClick, icon }: any) {
    return (
        <button 
            onClick={onClick} 
            className="group relative bg-white h-40 flex flex-col items-center justify-center gap-4 skew-x-[-10deg] hover:bg-black hover:text-white transition-all shadow-xl hover:scale-105"
        >
            <div className="skew-x-[10deg] flex flex-col items-center gap-2">
                <div className="text-[#FF001D] group-hover:text-white transition-colors">{icon}</div>
                <span className="font-['Orbitron'] font-black italic uppercase text-lg tracking-widest">{title}</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF001D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </button>
    )
}