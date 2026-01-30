import { motion, Variants } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, MapPin, Phone, Send, Zap, Activity, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
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
    <section id="contact" className="w-full min-h-screen bg-white text-[#111] py-24 px-6 relative overflow-hidden flex items-center">
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02] z-0"
        style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
      />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f8f8f8] -skew-x-12 translate-x-32 z-0" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="flex flex-col mb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slashIn} custom={0} className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#FF001D] text-white">
               <Activity size={14} className="animate-pulse" />
               <span className="font-['Orbitron'] font-black text-[10px] tracking-[0.3em] uppercase">{t.contact.subtitle.split(' // ')[1]}</span>
            </div>
          </motion.div>
          
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slashIn} custom={1} className="font-['Orbitron'] text-5xl md:text-[7.5rem] font-black italic uppercase leading-[0.85] tracking-tighter text-[#111]">
            {t.contact.title.split(' ')[0]}<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111] via-[#444] to-[#FF001D]">{t.contact.title.split(' ')[1]}</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-10">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative p-10 bg-[#111] text-white border-r-8 border-[#FF001D] overflow-hidden">
              <Zap size={140} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
              <div className="relative z-10 space-y-10">
                <p className="font-['Manrope'] text-xl md:text-2xl font-light italic leading-relaxed">
                  "{t.contact.info_card}"
                </p>
                <div className="space-y-6">
                  <ContactInfo icon={<Mail size={20}/>} label="Email" value="nathansscd@gmail.com" />
                  <ContactInfo icon={<Phone size={20}/>} label="Phone" value="(85) 98168-3486" />
                  <ContactInfo icon={<MapPin size={20}/>} label="Base" value={t.home.hometown_value} />
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-6">
               <h4 className="font-['Orbitron'] text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">{t.contact.social_label}</h4>
               <div className="flex gap-4">
                  <SocialIcon icon={<Github size={22}/>} link="https://github.com/nathanscd" />
                  <SocialIcon icon={<Linkedin size={22}/>} link="https://www.linkedin.com/in/nathanscd/" />
                  <SocialIcon icon={<Instagram size={22}/>} link="https://instagram.com/nathansscd" />
               </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-10 md:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.05)] border-t-8 border-[#111]">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-1 bg-[#FF001D]"></span>
                  <h3 className="font-['Orbitron'] text-2xl font-black italic uppercase tracking-tighter">{t.contact.form_title}</h3>
                </div>
                {status === "success" && <span className="text-green-600 font-['Orbitron'] text-[10px] font-bold animate-pulse uppercase tracking-widest">{t.contact.success}</span>}
                {status === "error" && <span className="text-[#FF001D] font-['Orbitron'] text-[10px] font-bold uppercase tracking-widest">{t.contact.error}</span>}
              </div>

              <form ref={formRef} className="space-y-8" onSubmit={sendEmail}>
                <div className="grid md:grid-cols-2 gap-8">
                  <FormGroup label={t.contact.form_name} name="user_name" placeholder={t.contact.form_name_placeholder} required />
                  <FormGroup label={t.contact.form_email} name="user_email" type="email" placeholder={t.contact.form_email_placeholder} required />
                </div>
                <FormGroup label={t.contact.form_subject} name="subject" placeholder={t.contact.form_subject_placeholder} required />
                <div className="space-y-2">
                  <label className="font-['Orbitron'] text-[10px] font-black uppercase tracking-widest text-gray-400">{t.contact.form_message}</label>
                  <textarea name="message" rows={4} className="w-full bg-[#f9f9f9] border-b-2 border-gray-100 p-4 font-['Manrope'] font-bold focus:border-[#FF001D] outline-none transition-all resize-none text-[#111]" placeholder={t.contact.form_message_placeholder} required />
                </div>

                <button 
                  disabled={isSending}
                  type="submit" 
                  className="group w-full relative h-16 bg-[#FF001D] overflow-hidden transition-all hover:bg-[#111] disabled:bg-gray-400"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3 font-['Orbitron'] font-black italic text-white uppercase tracking-[0.2em]">
                    {isSending ? <Loader2 size={18} className="animate-spin" /> : t.contact.form_submit.split(' // ')[0]}
                    {!isSending && <Send size={18} className="group-hover:translate-x-2 transition-transform" />}
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

const ContactInfo = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-5 group">
    <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-[#FF001D] transition-all">
      <div className="text-[#FF001D] group-hover:text-white">{icon}</div>
    </div>
    <div>
      <span className="block text-[10px] font-['Orbitron'] font-black text-gray-500 uppercase tracking-widest">{label}</span>
      <span className="font-['Manrope'] font-bold text-sm md:text-base">{value}</span>
    </div>
  </div>
);

const SocialIcon = ({ icon, link }: { icon: any, link: string }) => (
  <a href={link} target="_blank" rel="noreferrer" className="w-14 h-14 flex items-center justify-center bg-gray-50 border border-gray-100 text-[#111] hover:bg-[#FF001D] hover:text-white hover:scale-110 transition-all duration-300">
    {icon}
  </a>
);

const FormGroup = ({ label, name, placeholder, type = "text", required = false }: { label: string, name: string, placeholder: string, type?: string, required?: boolean }) => (
  <div className="space-y-2">
    <label className="font-['Orbitron'] text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</label>
    <input name={name} type={type} required={required} className="w-full bg-[#f9f9f9] border-b-2 border-gray-100 p-4 font-['Manrope'] font-bold focus:border-[#FF001D] outline-none transition-all text-[#111]" placeholder={placeholder} />
  </div>
);