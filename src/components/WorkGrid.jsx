<<<<<<< HEAD
import { motion } from "framer-motion";
import { Leaf, Stethoscope, School, HelpingHand, Droplets, Heart, Shirt, Soup } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {t.work.map((item, idx) => {
        const Icon = icons[idx % icons.length];
        const span = spans[idx] || "";
        return (
          <motion.div
            id={slugify(item.title)}
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
=======
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
  // Use translations so descriptions follow selected language
  const items = t && t.work ? t.work : workContent;

  const handleTileMove = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX) ?? 0;
    const clientY = e.clientY ?? (e.touches && e.touches[0] && e.touches[0].clientY) ?? 0;
    const px = (clientX - rect.left) / rect.width;
    const py = (clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * 6; // rotateX
    const ry = (px - 0.5) * -10; // rotateY
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    el.style.transition = "transform 0.06s ease-out";
  };

  const handleTileLeave = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.transform = "none";
    el.style.transition = "transform 0.28s cubic-bezier(.2,.9,.2,1)";
  };

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
              onMouseMove={(e) => handleTileMove(e, slug)}
              onMouseLeave={() => handleTileLeave(slug)}
              onTouchMove={(e) => handleTileMove(e, slug)}
              onFocus={() => {}}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className={`glass-card p-5 rounded-2xl border border-white/10 h-full hover:border-amber-300/50 transition-colors ${span}`}
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/10 grid place-items-center text-amber-200">
                  <Icon size={18} />
                </div>
                <h3 className={`text-lg font-semibold ${lang === "hi" ? "font-devanagari" : ""}`}>{item.title}</h3>
              </div>
              {/* short summary (2-3 lines) + read more link */}
              <p className={`mt-3 text-sm text-white/80 leading-relaxed ${lang === "hi" ? "font-devanagari" : ""} line-clamp-3`}>{item.description}</p>
              <div className="mt-3">
                <Link to={`/work/${slug}`} className="text-sm text-amber-300 hover:underline inline-flex items-center gap-2">
                  {lang === "hi" ? "और पढ़ें" : "Read more"} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default WorkGrid;
>>>>>>> main
