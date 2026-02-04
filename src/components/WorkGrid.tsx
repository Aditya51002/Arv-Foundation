import { motion } from "framer-motion";
import { Leaf, Stethoscope, School, HelpingHand, Droplets, Heart, Shirt, Soup } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const icons = [HelpingHand, Heart, School, Stethoscope, Leaf, Droplets, Shirt, Soup];
const spans = ["md:col-span-2", "", "md:row-span-2", "", "", "md:col-span-2", "", ""];

const WorkGrid = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {t.work.map((item, idx) => {
        const Icon = icons[idx % icons.length];
        const span = spans[idx] || "";
        return (
          <motion.div
            key={item.title}
            whileHover={{ y: -4 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.03 }}
            className={`glass-card shine-border p-4 ${span}`}
          >
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/10 grid place-items-center text-amber-200">
                <Icon size={20} />
              </div>
              <div className="space-y-2">
                <h3 className={`text-xl font-semibold ${lang === "hi" ? "font-devanagari" : ""}`}>{item.title}</h3>
                <p className={`text-sm text-white/75 leading-relaxed ${lang === "hi" ? "font-devanagari" : ""}`}>{item.description}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WorkGrid;
