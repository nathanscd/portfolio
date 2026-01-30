import { useEffect, useState } from "react";
import { LangProvider } from "./context/LangContext"; 
import Navbar from "./components/Header";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import SpeedLoader from "./components/SpeedLoader";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";

type Section = "home" | "about" | "projects" | "contact";

export default function App() {
  const [section, setSection] = useState<Section>("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [section]);

  return (
    <LangProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <SpeedLoader key="loader" onFinish={() => setLoading(false)} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-white selection:bg-[#FF001D] selection:text-white"
          >
            <Navbar setSection={setSection} />

            <main className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                {section === "home" && (
                  <PageWrapper key="home">
                    <Home setSection={setSection} />
                  </PageWrapper>
                )}
                {section === "about" && (
                  <PageWrapper key="about">
                    <About />
                  </PageWrapper>
                )}
                {section === "projects" && (
                  <PageWrapper key="projects">
                    <Projects />
                  </PageWrapper>
                )}
                {section === "contact" && (
                  <PageWrapper key="contact">
                    <Contact />
                  </PageWrapper>
                )}
              </AnimatePresence>
            </main>

            <footer className="py-12 bg-white border-t border-gray-100 flex flex-col items-center gap-4">
              <div className="w-8 h-[2px] bg-[#FF001D]" />
              <p className="font-['Orbitron'] text-[9px] text-gray-400 tracking-[0.5em] uppercase">
                Performance Portfolio // 2026
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </LangProvider>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}