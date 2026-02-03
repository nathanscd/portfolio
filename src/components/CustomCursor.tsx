import React, { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, Variants, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState<"default" | "pointer" | "text" | "hidden" | "loading">("default");
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const outlineX = useSpring(mouseX, springConfig);
  const outlineY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);

    const target = e.target as HTMLElement;
    if (!target) return;

    const computedStyle = window.getComputedStyle(target);

    if (target.closest('.force-native-cursor')) {
      setCursorVariant("hidden");
      return;
    }

    const isLink = target.closest('a') || target.closest('button') || computedStyle.cursor === 'pointer' || target.getAttribute('role') === 'button';
    const isText = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || computedStyle.cursor === 'text' || target.isContentEditable;
    const isLoading = target.getAttribute('data-cursor') === 'wait' || computedStyle.cursor === 'wait';

    if (isLoading) {
      setCursorVariant("loading");
    } else if (isLink) {
      setCursorVariant("pointer");
    } else if (isText) {
      setCursorVariant("text");
    } else {
      setCursorVariant("default");
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setCursorVariant("hidden");
    const handleMouseEnter = () => setCursorVariant("default");

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove]);

  const dotVariants: Variants = {
    default: { scale: 1, opacity: 1, backgroundColor: "#FF0000" },
    pointer: { scale: 1.5, opacity: 1, backgroundColor: "#FF0000" },
    text: { scale: 0, opacity: 0 },
    loading: { scale: 0.6, opacity: 0.8, backgroundColor: "#FF0000" },
    hidden: { scale: 0, opacity: 0 },
  };

  const outlineVariants: Variants = {
    default: { 
      height: 40, 
      width: 40, 
      borderWidth: 2, 
      borderColor: "#FF0000", 
      backgroundColor: "transparent",
      opacity: 0.6 
    },
    pointer: { 
      height: 60, 
      width: 60, 
      borderWidth: 1, 
      borderColor: "#FF0000", 
      backgroundColor: "rgba(255, 0, 0, 0.1)",
      opacity: 1 
    },
    text: { 
      height: 30, 
      width: 2, 
      borderWidth: 0, 
      backgroundColor: "#FF0000", 
      borderRadius: 0,
      opacity: 1 
    },
    loading: { 
      height: 50, 
      width: 50, 
      borderWidth: 2, 
      borderColor: "#FF0000", 
      borderTopColor: "transparent",
      borderRadius: "50%",
      rotate: 360,
      transition: { rotate: { duration: 1, repeat: Infinity, ease: "linear" } }
    },
    hidden: { scale: 0, opacity: 0 }
  };

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        .force-native-cursor, .force-native-cursor * { cursor: auto !important; }
        @media (hover: none) and (pointer: coarse) {
          * { cursor: auto !important; }
          .custom-cursor-container { display: none; }
        }
      `}</style>

      <div className="custom-cursor-container fixed top-0 left-0 z-[999999] pointer-events-none">
        <motion.div
          className="absolute flex items-center justify-center rounded-full"
          style={{ 
            x: mouseX, 
            y: mouseY, 
            translateX: "-50%", 
            translateY: "-50%",
            width: 8,
            height: 8
          }}
          variants={dotVariants}
          animate={cursorVariant}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />

        <motion.div
          className="absolute flex items-center justify-center rounded-full box-border"
          style={{ 
            x: outlineX, 
            y: outlineY, 
            translateX: "-50%", 
            translateY: "-50%" 
          }}
          variants={outlineVariants}
          animate={cursorVariant}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
        >
          <AnimatePresence>
            {isClicked && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-full border-2 border-[#FF0000]"
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
