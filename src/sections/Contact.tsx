import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, MapPin, Phone, Send, Zap, Activity, Loader2, Radio, ShieldCheck, Globe, Crosshair } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useLang } from "../context/LangContext";

export default function Contact() {
  const { t } = useLang();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    setStatus("idle");

    emailjs.sendForm(
      "service_u0popcy", 
      "template_38c28ym", 
      formRef.current, 
      "uV13vF_NpHsZwaq2r"
    )
    .then(() => {
      setStatus("success");
      formRef.current?.reset();
    })
    .catch(() => {
      setStatus("error");
    })
    .finally(() => {
      setIsSending(false);
      setTimeout(() => setStatus("idle"), 5000);
    });
  };

  const slashIn: Variants = {
    hidden: { x: -30, opacity: 0, skewX: 10 },
    visible: (i: number) => ({
      x: 0, opacity: 1, skewX: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section id="contact" className="w-full min-h-screen bg-white text-[#111] py-32 px-6 relative overflow-hidden selection:bg-[#FF001D] selection:text-white">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-red-50/50 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        <div className="flex flex-col mb-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slashIn} custom={0} className="flex items-center gap-4 mb-8">
            <div className="px-4 py-1.5 bg-[#FF001D] text-white font-['Orbitron'] text-[11px] font-black uppercase tracking-[0.3em] skew-x-[-15deg] shadow-lg shadow-red-500/20">
              Command Center
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-gray-400 text-[11px] tracking-widest uppercase font-bold">Uplink Active // SF24-COMMS</span>
            </div>
          </motion.div>
          
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slashIn} custom={1} className="font-['Orbitron'] text-7xl md:text-[10rem] font-black italic uppercase leading-[0.75] tracking-tighter text-[#111]">
            {t.contact.title.split(' ')[0]}<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF001D] to-gray-300 pr-5">{t.contact.title.split(' ')[1]}</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-5 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              className="relative p-12 bg-gray-50 border-l-[10px] border-[#FF001D] overflow-hidden shadow-2xl shadow-red-500/5"
            >
              <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                <Radio size={180} />
              </div>
              <div className="relative z-10 space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#FF001D]">
                    <Activity size={18} className="animate-pulse" />
                    <span className="font-['Orbitron'] text-[10px] font-black uppercase tracking-[0.4em]">Transmission Brief</span>
                  </div>
                  <p className="font-['Orbitron'] text-2xl md:text-3xl font-black italic leading-tight uppercase tracking-tighter text-[#111]">
                    "{t.contact.info_card}"
                  </p>
                </div>

                <div className="space-y-8">
                  <ContactInfo icon={<Mail size={22}/>} label="Direct Channel" value="nathansscd@gmail.com" />
                  <ContactInfo icon={<Phone size={22}/>} label="Voice Link" value="(85) 98168-3486" />
                  <ContactInfo icon={<MapPin size={22}/>} label="Base Coordinates" value={t.home.hometown_value} />
                </div>
              </div>
            </motion.div>

            <div className="space-y-8">
               <div className="flex items-center gap-4">
                 <Globe size={16} className="text-[#FF001D]" />
                 <h4 className="font-['Orbitron'] text-[11px] font-black uppercase tracking-[0.5em] text-gray-300">{t.contact.social_label}</h4>
               </div>
               <div className="flex gap-6">
                  <SocialIcon icon={<Github size={24}/>} link="https://github.com/nathanscd" label="GIT" />
                  <SocialIcon icon={<Linkedin size={24}/>} link="https://www.linkedin.com/in/nathanscd/" label="LKD" />
                  <SocialIcon icon={<Instagram size={24}/>} link="https://instagram.com/nathansscd" label="IG" />
               </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="bg-white p-12 md:p-16 shadow-2xl border-t-[10px] border-[#111] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 -skew-x-12 translate-x-16 -translate-y-16" />
              
              <div className="flex justify-between items-center mb-16 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[3px] bg-[#FF001D] shadow-[0_0_10px_rgba(255,0,0,0.3)]" />
                  <h3 className="font-['Orbitron'] text-3xl font-black italic uppercase tracking-tighter text-[#111]">{t.contact.form_title}</h3>
                </div>
                <div className="flex flex-col items-end">
                  {status === "success" && (
                    <div className="flex items-center gap-2 text-green-600">
                      <ShieldCheck size={16} />
                      <span className="font-['Orbitron'] text-[10px] font-black uppercase tracking-widest animate-pulse">{t.contact.success}</span>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex items-center gap-2 text-[#FF001D]">
                      <Activity size={16} />
                      <span className="font-['Orbitron'] text-[10px] font-black uppercase tracking-widest">{t.contact.error}</span>
                    </div>
                  )}
                </div>
              </div>

              <form ref={formRef} className="space-y-10 relative z-10" onSubmit={sendEmail}>
                <div className="grid md:grid-cols-2 gap-10">
                  <FormGroup label={t.contact.form_name} name="user_name" placeholder={t.contact.form_name_placeholder} required />
                  <FormGroup label={t.contact.form_email} name="user_email" type="email" placeholder={t.contact.form_email_placeholder} required />
                </div>
                <FormGroup label={t.contact.form_subject} name="subject" placeholder={t.contact.form_subject_placeholder} required />
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="font-['Orbitron'] text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">{t.contact.form_message}</label>
                    <span className="font-mono text-[9px] text-gray-300 uppercase">Secure Transmission</span>
                  </div>
                  <textarea 
                    name="message" 
                    rows={5} 
                    className="w-full bg-gray-50 border-b-2 border-gray-100 p-6 font-mono text-sm font-bold focus:border-[#FF001D] focus:bg-white outline-none transition-all resize-none text-[#111] placeholder:text-gray-300 uppercase tracking-tight" 
                    placeholder={t.contact.form_message_placeholder} 
                    required 
                  />
                </div>

                <button 
                  disabled={isSending}
                  type="submit" 
                  className="group w-full relative h-20 bg-[#FF001D] overflow-hidden transition-all hover:bg-[#111] disabled:bg-gray-400 shadow-xl shadow-red-500/20 hover:shadow-black/20"
                >
                  <div className="relative z-10 flex items-center justify-center gap-4 font-['Orbitron'] font-black italic text-white uppercase tracking-[0.3em] text-lg">
                    {isSending ? <Loader2 size={24} className="animate-spin" /> : t.contact.form_submit.split(' // ')[0]}
                    {!isSending && <Send size={20} className="group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-500" />}
                  </div>
                  <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        <div className="mt-40 pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-5">
            <div className="w-3 h-3 bg-[#FF001D] rounded-full animate-ping" />
            <div className="flex items-center gap-3">
              <Radio size={18} className="text-[#FF001D]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-black text-[#111]">Uplink Strength: 100%</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 font-mono text-[10px] uppercase tracking-widest font-black text-gray-300">
            <span className="hover:text-[#FF001D] transition-colors cursor-default">Encryption: AES-256</span>
            <span className="hover:text-[#FF001D] transition-colors cursor-default">Protocol: SF-NET</span>
            <span className="hover:text-[#FF001D] transition-colors cursor-default">Status: Ready to Launch</span>
          </div>
          <p className="font-mono text-[11px] uppercase font-black text-gray-400">© 2026 Scuderia Secundo</p>
        </div>
      </div>
    </section>
  );
}

const ContactInfo = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-6 group">
    <div className="w-14 h-14 flex items-center justify-center bg-white border border-gray-200 group-hover:border-[#FF001D] group-hover:bg-red-50 transition-all duration-500 shadow-sm">
      <div className="text-[#FF001D] group-hover:scale-110 transition-transform">{icon}</div>
    </div>
    <div>
      <span className="block text-[10px] font-['Orbitron'] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">{label}</span>
      <span className="font-['Orbitron'] font-black text-base md:text-lg text-[#111] uppercase italic tracking-tighter">{value}</span>
    </div>
  </div>
);

const SocialIcon = ({ icon, link, label }: { icon: any, link: string, label: string }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noreferrer" 
    className="group flex flex-col items-center gap-2"
  >
    <div className="w-16 h-16 flex items-center justify-center bg-white border border-gray-200 text-[#111] group-hover:border-[#FF001D] group-hover:bg-[#FF001D] group-hover:text-white group-hover:shadow-xl group-hover:shadow-red-500/20 transition-all duration-500">
      {icon}
    </div>
    <span className="font-mono text-[9px] font-black text-gray-300 group-hover:text-[#FF001D] transition-colors">{label}</span>
  </a>
);

const FormGroup = ({ label, name, placeholder, type = "text", required = false }: { label: string, name: string, placeholder: string, type?: string, required?: boolean }) => (
  <div className="space-y-3">
    <label className="font-['Orbitron'] text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">{label}</label>
    <input 
      name={name} 
      type={type} 
      required={required} 
      className="w-full bg-gray-50 border-b-2 border-gray-100 p-6 font-mono text-sm font-bold focus:border-[#FF001D] focus:bg-white outline-none transition-all text-[#111] placeholder:text-gray-300 uppercase tracking-tight" 
      placeholder={placeholder} 
    />
  </div>
);
