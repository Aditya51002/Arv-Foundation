import { motion } from "framer-motion";
import { Sparkles, Droplet, Recycle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

const icons = [Sparkles, Recycle, Droplet];

const InitiativesGrid = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {t.initiatives.map((item, idx) => {
        const Icon = icons[idx % icons.length];
        return (
          <motion.div
            key={item.title}
            whileHover={{ y: -3 }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            className="glass-card p-4 border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/10 border border-white/10 grid place-items-center text-amber-200">
                <Icon size={18} />
              </div>
              <h3 className={`text-lg font-semibold ${lang === "hi" ? "font-devanagari" : ""}`}>{item.title}</h3>
            </div>
            <p className={`mt-2 text-sm text-white/75 leading-relaxed ${lang === "hi" ? "font-devanagari" : ""}`}>{item.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default InitiativesGrid;
