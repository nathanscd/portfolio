export default function GrainEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden opacity-[0.020]">
      <div className="absolute inset-[-200%] bg-[url('https://img.freepik.com/fotos-gratis/textura-de-papelao_1194-5419.jpg?semt=ais_hybrid&w=740&q=80')] animate-grain" />
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }
      `}</style>
    </div>
  );
}