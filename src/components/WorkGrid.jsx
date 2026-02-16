import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Stethoscope, School, HelpingHand, Droplets, Heart, Shirt, Soup, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import workContent from "../data/workContent.js";
import { useBulkDynamicContent } from "../utils/useDynamicContent.js";

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
  
  // Create array of content keys for dynamic content
  const contentKeys = workContent.map((item, idx) => {
    const slug = slugify(item.title);
    return [`work:${slug}:title`, `work:${slug}:description`];
  }).flat();

  // Create fallbacks object
  const fallbacks = {};
  workContent.forEach((item, idx) => {
    const slug = slugify(item.title);
    fallbacks[`work:${slug}:title`] = item.title;
    fallbacks[`work:${slug}:description`] = item.description;
  });

  // Get dynamic content with fallbacks from translations or static content
  const { content: dynamicContent, loading } = useBulkDynamicContent(contentKeys, fallbacks);

  // Use translations so descriptions follow selected language, with dynamic content override
  const baseItems = t && t.work ? t.work : workContent;
  
  // Combine base items with dynamic content
  const items = baseItems.map((item, idx) => {
    const slug = slugify(item.title);
    const titleKey = `work:${slug}:title`;
    const descKey = `work:${slug}:description`;
    
    return {
      title: loading ? item.title : (dynamicContent[titleKey] || item.title),
      description: loading ? item.description : (dynamicContent[descKey] || item.description)
    };
  });

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
