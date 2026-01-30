import { motion, Variants } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, MapPin, Phone, Send, Zap, Activity } from "lucide-react";

export default function Contact() {
  const slashIn: Variants = {
    hidden: { x: -30, opacity: 0, skewX: 10 },
    visible: (i: number) => ({
      x: 0, opacity: 1, skewX: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section id="contact" className="w-full min-h-screen bg-white text-[#111] py-24 px-6 relative overflow-hidden flex items-center">
      
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f8f8f8] -skew-x-12 translate-x-32 z-0" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        <div className="flex flex-col mb-16">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={slashIn} custom={0}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex items-center gap-2 px-3 py-1 bg-[#FF001D] text-white">
               <Activity size={14} className="animate-pulse" />
               <span className="font-['Orbitron'] font-black text-[10px] tracking-[0.3em] uppercase">Comms Channel</span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={slashIn} custom={1}
            className="font-['Orbitron'] text-5xl md:text-[7.5rem] font-black italic uppercase leading-[0.85] tracking-tighter"
          >
            ESTABLISH<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111] via-[#444] to-[#FF001D]">
              CONNECTION
            </span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Card de Informações (Esquerda) */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-10 bg-[#111] text-white border-r-8 border-[#FF001D] overflow-hidden"
            >
              <Zap size={140} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
              
              <div className="relative z-10 space-y-10">
                <p className="font-['Manrope'] text-xl md:text-2xl font-light italic leading-relaxed">
                  "Pronto para integrar sua equipe e elevar a <span className="text-[#FF001D] font-bold">performance</span> dos seus sistemas."
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-[#FF001D] transition-all">
                       <Mail size={20} className="text-[#FF001D] group-hover:text-white" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-['Orbitron'] font-black text-gray-500 uppercase tracking-widest">Email</span>
                      <span className="font-['Manrope'] font-bold text-sm md:text-base">nathansscd@gmail.com</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-[#FF001D] transition-all">
                       <Phone size={20} className="text-[#FF001D] group-hover:text-white" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-['Orbitron'] font-black text-gray-500 uppercase tracking-widest">Phone</span>
                      <span className="font-['Manrope'] font-bold text-sm md:text-base">(85) 98168-3486</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-[#FF001D] transition-all">
                       <MapPin size={20} className="text-[#FF001D] group-hover:text-white" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-['Orbitron'] font-black text-gray-500 uppercase tracking-widest">Base</span>
                      <span className="font-['Manrope'] font-bold text-sm md:text-base">Fortaleza, CE // BR</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-6">
               <h4 className="font-['Orbitron'] text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">Social Telemetry</h4>
               <div className="flex gap-4">
                  {[
                    { icon: <Github size={22} />, link: "https://github.com/nathanscd" },
                    { icon: <Linkedin size={22} />, link: "https://www.linkedin.com/in/nathanscd/" },
                    { icon: <Instagram size={22} />, link: "https://instagram.com/nathansscd" }
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href={social.link} 
                      target="_blank" 
                      className="w-14 h-14 flex items-center justify-center bg-gray-50 border border-gray-100 text-[#111] hover:bg-[#FF001D] hover:text-white hover:scale-110 transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
               </div>
            </div>
          </div>

          {/* Formulário (Direita) */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 md:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.05)] border-t-8 border-[#111]"
            >
              <div className="flex items-center gap-4 mb-12">
                <span className="w-12 h-1 bg-[#FF001D]"></span>
                <h3 className="font-['Orbitron'] text-2xl font-black italic uppercase tracking-tighter">Direct Message</h3>
              </div>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="font-['Orbitron'] text-[10px] font-black uppercase tracking-widest text-gray-400">Pilot Name</label>
                    <input type="text" className="w-full bg-transparent border-b-2 border-gray-100 py-3 font-['Manrope'] font-bold focus:border-[#FF001D] outline-none transition-colors" placeholder="IDENTIFY YOURSELF" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-['Orbitron'] text-[10px] font-black uppercase tracking-widest text-gray-400">Communication Channel</label>
                    <input type="email" className="w-full bg-transparent border-b-2 border-gray-100 py-3 font-['Manrope'] font-bold focus:border-[#FF001D] outline-none transition-colors" placeholder="YOUR EMAIL" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-['Orbitron'] text-[10px] font-black uppercase tracking-widest text-gray-400">Subject</label>
                  <input type="text" className="w-full bg-transparent border-b-2 border-gray-100 py-3 font-['Manrope'] font-bold focus:border-[#FF001D] outline-none transition-colors" placeholder="BRIEFING TOPIC" />
                </div>

                <div className="space-y-2">
                  <label className="font-['Orbitron'] text-[10px] font-black uppercase tracking-widest text-gray-400">Message Data</label>
                  <textarea rows={4} className="w-full bg-transparent border-b-2 border-gray-100 py-3 font-['Manrope'] font-bold focus:border-[#FF001D] outline-none transition-colors resize-none" placeholder="TRANSMIT YOUR MESSAGE..."></textarea>
                </div>

                <button className="group w-full relative h-16 bg-[#FF001D] overflow-hidden transition-all hover:bg-[#111]">
                   <div className="relative z-10 flex items-center justify-center gap-3 font-['Orbitron'] font-black italic text-white uppercase tracking-[0.2em]">
                      Transmit Data <Send size={18} className="group-hover:translate-x-2 transition-transform" />
                   </div>
                   <div className="absolute inset-0 bg-white/10 -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700" />
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}