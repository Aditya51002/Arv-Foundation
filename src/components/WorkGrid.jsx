import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Stethoscope, School, HelpingHand, Droplets, Heart, Shirt, Soup, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import workContent from "../data/workContent.js";

function slugify(s) {
  return s
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const icons = [HelpingHand, Heart, School, Stethoscope, Leaf, Droplets, Shirt, Soup];
const spans = ["md:col-span-2", "", "md:row-span-2", "", "", "md:col-span-2", "", ""];

const WorkGrid = () => {
  const { t, lang } = useLanguage();
  // Use dedicated work content file instead of translation block
  const items = workContent;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, idx) => {
        const Icon = icons[idx % icons.length];
        const span = spans[idx] || "";
        const slug = slugify(item.title);
        return (
          <Link to={`/work/${slug}`} key={item.title} className="block">
            <motion.div
              id={slug}
              whileHover={{ y: -4, scale: 1.01 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className={`glass-card shine-border p-4 cursor-pointer group h-full ${span}`}
            >
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/10 grid place-items-center text-amber-200">
                  <Icon size={20} />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className={`text-xl font-semibold ${lang === "hi" ? "font-devanagari" : ""}`}>{item.title}</h3>
                  <p className={`text-sm text-white/75 leading-relaxed ${lang === "hi" ? "font-devanagari" : ""}`}>{item.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-amber-200 opacity-0 group-hover:opacity-100 transition-opacity">
                    {lang === "hi" ? "और पढ़ें" : "Read more"} <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default WorkGrid;
