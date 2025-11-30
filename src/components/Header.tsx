type Props = {
setSection: (value: "home" | "about" | "projects" | "contact") => void;
};


export default function Header({ setSection }: Props) {
return (
<header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 z-50 bg-black/40 backdrop-blur-md">
<nav id="navbar" className="flex gap-6 text-sm uppercase">
  <div id="nav-logo" className="text-2xl font-bold tracking-tight">Nathanael Secundo Cardoso</div>
  <button onClick={() => setSection("home")}>Home</button>
  <button onClick={() => setSection("about")}>Sobre</button>
  <button onClick={() => setSection("projects")}>Projetos</button>
  <button onClick={() => setSection("contact")}>Contato</button>
</nav>
</header>
);
}