import { useState } from "react";
import Header from "./components/Header";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";


type Section = "home" | "about" | "projects" | "contact";


export default function App() {
const [section, setSection] = useState<Section>("home");


return (
<div className="min-h-screen w-full bg-black text-white font-sans">
<Header setSection={setSection} />


<main className="pt-32">
{section === "home" && <Home />}
{section === "about" && <About />}
{section === "projects" && <Projects />}
{section === "contact" && <Contact />}
</main>
</div>
);
}