import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);

  // Valores reativos do mouse
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Configuração da mola (Spring)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const outlineX = useSpring(cursorX, springConfig);
  const outlineY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Atualiza os valores brutos
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      // Detecção melhorada de elementos clicáveis
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a');
      
      setIsPointer(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Ponto Central (Segue instantâneo) */}
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-[#FF001D] rounded-full pointer-events-none z-[9999]"
        style={{ 
          x: cursorX, 
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{ 
          scale: isPointer ? 0 : 1 // Some quando está em cima de link
        }}
      />
      
      {/* Outline Externo (Segue com mola) */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border border-[#FF001D]/50 rounded-full pointer-events-none z-[9998]"
        style={{ 
          x: outlineX, 
          y: outlineY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{ 
          scale: isPointer ? 2.5 : 1, // Cresce no link
          backgroundColor: isPointer ? "rgba(255, 0, 29, 0.1)" : "transparent",
          borderColor: isPointer ? "transparent" : "rgba(255, 0, 29, 0.5)"
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Força cursor none globalmente */}
      <style>{`
        * { cursor: none !important; }
      `}</style>
    </>
  );
}