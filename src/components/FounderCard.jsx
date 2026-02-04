import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Quote, ShieldCheck } from "lucide-react";

const FounderCard = () => {
  const { t, lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 md:p-8 relative overflow-hidden"
    >
      <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-amber-300/25 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-emerald-300/25 blur-3xl" />
      <div className="relative space-y-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 grid place-items-center text-amber-200">
            <ShieldCheck size={22} />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">Founder Message</p>
            <p className="text-xl font-semibold">ARV Foundation</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Quote className="text-amber-300" size={24} />
          <p className={`text-lg leading-relaxed text-white/85 ${lang === "hi" ? "font-devanagari" : ""}`}>{t.founderMessage}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FounderCard;
