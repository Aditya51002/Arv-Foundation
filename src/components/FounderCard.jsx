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
      className="flip-card"
    >
      <div tabIndex={0} aria-label="Founder card. Press Enter to flip." className="flip-inner">
        {/* Front face */}
        <div className="flip-front">
          <div className="glass-card p-6 md:p-8 relative overflow-hidden">
            <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-amber-300/25 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-emerald-300/25 blur-3xl" />
            <div className="relative space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-white/90 border border-slate-300 grid place-items-center text-amber-600">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Founder Message</p>
                  <p className="text-xl font-semibold">ARV Foundation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Quote className="text-amber-300" size={24} />
                <p className={`text-lg leading-relaxed text-slate-800/85 ${lang === "hi" ? "font-devanagari" : ""}`}>{t.founderMessage}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back face */}
        <div className="flip-back">
          <div className="glass-card p-6 md:p-8 relative overflow-hidden">
            <div className="relative space-y-4">
              <h4 className="text-lg font-semibold">Founder — About</h4>
              <p className={`text-sm text-slate-700 ${lang === "hi" ? "font-devanagari" : ""}`}>
                {t.founderMessage} {/* fallback: reuse founderMessage until a dedicated bio is provided */}
              </p>
              <a href="/founder" className="inline-block mt-3 text-amber-300 hover:underline">
                {lang === "hi" ? "और पढ़ें" : "Read more"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FounderCard;
