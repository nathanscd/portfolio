import { motion, useMotionValue, useTransform, animate, Variants, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const FerrariF1SVG = () => (
  <svg width="300" height="600" viewBox="0 0 150 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ferrariRed" x1="0" y1="0" x2="150" y2="0">
        <stop offset="0%" stopColor="#cc0000" />
        <stop offset="50%" stopColor="#ff2400" />
        <stop offset="100%" stopColor="#cc0000" />
      </linearGradient>
      <linearGradient id="tireGrad" x1="0" y1="0" x2="100%" y2="0">
        <stop offset="0%" stopColor="#1a1a1a" />
        <stop offset="50%" stopColor="#333" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>
      <linearGradient id="wingGrad" x1="0" y1="0" x2="0" y2="100%">
        <stop offset="0%" stopColor="#111" />
        <stop offset="100%" stopColor="#000" />
      </linearGradient>
    </defs>

    <ellipse cx="75" cy="150" rx="60" ry="100" fill="black" opacity="0.3" filter="blur(20px)" />

    <rect x="10" y="170" width="30" height="60" rx="8" fill="url(#tireGrad)" />
    <rect x="110" y="170" width="30" height="60" rx="8" fill="url(#tireGrad)" />
    
    <path d="M40 180 L110 180 L120 240 L30 240 Z" fill="#111" />

    <path d="M75 20 C 65 40, 60 80, 55 120 L 50 180 L 100 180 L 95 120 C 90 80, 85 40, 75 20 Z" fill="url(#ferrariRed)" />
    <path d="M50 120 L 25 130 L 25 200 L 50 190 Z" fill="url(#ferrariRed)" />
    <path d="M100 120 L 125 130 L 125 200 L 100 190 Z" fill="url(#ferrariRed)" />

    <rect x="15" y="50" width="25" height="50" rx="6" fill="url(#tireGrad)" />
    <rect x="110" y="50" width="25" height="50" rx="6" fill="url(#tireGrad)" />
    
    <path d="M40 75 L 75 65 L 110 75" stroke="#333" strokeWidth="4" />
    
    <path d="M15 30 L 135 30 L 130 45 L 75 55 L 20 45 Z" fill="url(#wingGrad)" />
    <path d="M75 55 L 75 20" stroke="url(#ferrariRed)" strokeWidth="8" /> 

    <ellipse cx="75" cy="115" rx="10" ry="18" fill="#222" />
    <circle cx="75" cy="110" r="6" fill="yellow" /> 
    <path d="M65 100 L 65 130 Q 75 140 85 130 L 85 100" stroke="#111" strokeWidth="3" fill="none"/>

    <path d="M35 230 L 115 230 L 115 250 L 35 250 Z" fill="url(#wingGrad)" />
    <rect x="35" y="235" width="80" height="5" fill="#cc0000" />

    <path d="M70 30 C 65 60, 62 100, 60 150" stroke="white" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
    <path d="M80 30 C 85 60, 88 100, 90 150" stroke="white" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
  </svg>
);

const SmokeEffect = () => {
  const particles = Array.from({ length: 12 });
  return (
    <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-[200px] h-[100px] pointer-events-none">
      {particles.map((_, i) => {
        const isLeft = i % 2 === 0;
        const xOffset = isLeft ? -40 : 40;
        return (
          <motion.div
            key={i}
            className="absolute bg-white/60 rounded-full blur-xl"
            style={{ 
                left: `calc(50% + ${xOffset}px)`,
                top: 0,
                width: Math.random() * 30 + 20,
                height: Math.random() * 30 + 20,
            }}
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ 
                opacity: [0, 0.8, 0], 
                scale: [0.5, 2, 3], 
                y: [0, 50, 100],
                x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 50] 
            }}
            transition={{ 
                duration: 0.8 + Math.random() * 0.5, 
                ease: "easeOut",
                delay: Math.random() * 0.2
            }}
          />
        )
      })}
    </div>
  )
}

export default function SpeedLoader({ onFinish }: { onFinish?: () => void }) {
  const progress = useMotionValue(0);
  const [isLaunching, setIsLaunching] = useState(false); 

  const rpm = useTransform(progress, [0, 100], [1200, 12500]);
  const speed = useTransform(progress, [0, 100], [0, 342]);
  const gear = useTransform(progress, [0, 100], [1, 8]);

  const [rpmValue, setRpmValue] = useState(0);
  const [speedValue, setSpeedValue] = useState(0);
  const [gearValue, setGearValue] = useState(1);

  useMotionValueEvent(rpm, "change", (v) => setRpmValue(Math.round(v)));
  useMotionValueEvent(speed, "change", (v) => setSpeedValue(Math.round(v)));
  useMotionValueEvent(gear, "change", (v) => setGearValue(Math.max(1, Math.round(v))));

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 1.5,
      ease: [0.2, 0, 0.2, 1],
    });

    controls.then(() => {
      setTimeout(() => {
        setIsLaunching(true);
        
        setTimeout(() => {
             onFinish?.();
        }, 800); 
      }, 400);
    });

    return () => controls.stop();
  }, [progress, onFinish]);

  const containerVariants: Variants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.5, delay: 0.4 } 
    },
  };
  
  const carVariants: Variants = {
  idle: {
    y: [0, 1], 
    scale: [1, 1.01],
    rotateX: 0,
    transition: {
      scale: { 
        duration: 0.1, 
        repeat: Infinity, 
        repeatType: "mirror", 
        ease: "linear"
      },
      y: { 
        duration: 0.05, 
        repeat: Infinity, 
        repeatType: "mirror",
        ease: "linear"
      }
    }
  },
  launch: { 
    y: -1200, 
    scale: 1.1,
    rotateX: -10, 
    transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] } 
  }
};
  
  const dashboardVariants: Variants = {
    idle: { scale: 1, opacity: 1 },
    launch: { 
        scale: 1.5, 
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.4, ease: "easeIn" } 
    }
  };

  const revLights = Array.from({ length: 10 });

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center font-['Orbitron'] overflow-hidden"
      variants={containerVariants}
      initial="initial"
      animate="initial"
      exit="exit"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a0000_0%,#000_80%)]" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_bottom,transparent_0%,#000_100%),linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10 overflow-visible">
         <AnimatePresence>
            {isLaunching && <SmokeEffect />}
         </AnimatePresence>

         <motion.div
            className="relative top-20 origin-bottom"  
            variants={carVariants}
            initial="idle"
            animate={isLaunching ? "launch" : "idle"}
         >
            {!isLaunching && (
                 <div className="absolute bottom-0 left-0 w-full h-20 bg-red-600/20 blur-3xl rounded-full animate-pulse"></div>
            )}
            <FerrariF1SVG />
         </motion.div>
      </div>


      <motion.div 
        className="relative z-20"
        variants={dashboardVariants}
        initial="idle"
        animate={isLaunching ? "launch" : "idle"}
      >
          <h2 className="text-center text-white/50 text-sm font-black italic tracking-[0.5em] mb-8 animate-pulse drop-shadow-md">
             RACE START SEQUENCE
          </h2>

          <div className="relative w-[360px] h-[360px] rounded-full bg-[#0a0a0a]/80 border border-white/10 shadow-[0_0_100px_rgba(204,0,0,0.2)] flex items-center justify-center backdrop-blur-md">
            
            <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full rotate-90">
                <defs>
                    <linearGradient id="rpmGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="60%" stopColor="#eab308" />
                        <stop offset="100%" stopColor="#cc0000" />
                    </linearGradient>
                </defs>
                <circle cx="150" cy="150" r="135" stroke="#1a1a1a" strokeWidth="12" fill="none" />
                <motion.circle
                    cx="150" cy="150" r="135"
                    stroke="url(#rpmGradient)" strokeWidth="12" fill="none"
                    strokeDasharray="848"
                    strokeDashoffset={useTransform(progress, [0, 100], [848, 100])}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_15px_rgba(204,0,0,0.6)]"
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="absolute top-16 flex gap-1.5">
                    {revLights.map((_, i) => {
                        const threshold = (i + 1) * 10;
                        const activeColor = i < 3 ? "#22c55e" : i < 7 ? "#ef4444" : "#3b82f6";
                        return (
                            <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full bg-[#222]"
                                style={{
                                    backgroundColor: useTransform(progress, (v) => v >= threshold ? activeColor : "#222"),
                                    boxShadow: useTransform(progress, (v) => v >= threshold ? `0 0 10px ${activeColor}` : "none")
                                }}
                            />
                        )
                    })}
                </div>

                <div className="mt-4 relative">
                    <span className="text-[10px] text-white/40 tracking-[0.3em] font-bold block mb-1">GEAR</span>
                    <div className="text-[72px] font-black text-white leading-[0.8] tabular-nums drop-shadow-2xl">
                        {gearValue}
                    </div>
                </div>

                <div className="mt-4 flex flex-col items-center">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-white/90 tabular-nums">{rpmValue}</span>
                        <span className="text-xs text-white/50">RPM</span>
                    </div>
                    <div className="w-12 h-[2px] bg-white/10 mt-1 mb-3"></div>
                </div>

                <div>
                    <span className="text-[42px] font-black text-white tabular-nums leading-none tracking-tighter">
                        {speedValue}
                    </span>
                    <div className="text-[10px] text-[#cc0000] font-bold tracking-widest mt-1">KM/H</div>
                </div>
            </div>
          </div>
      </motion.div>
    </motion.div>
  );
}