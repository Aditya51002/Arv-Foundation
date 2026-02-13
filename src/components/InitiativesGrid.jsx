import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import initiativesContent from "../data/initiativesContent.js";
import { Sparkles, Recycle, Droplet, ArrowRight } from "lucide-react";
import initiativeImage1 from "../Images/Initiative/initiativeimage1.jpg";
import initiativeImage2 from "../Images/Initiative/initiativeimage2.jpg";
import initiativeImage3 from "../Images/Initiative/initiativeimage3.jpg";
import initiativeImage4 from "../Images/Initiative/initiativeimage4.jpg";
import initiativeImage5 from "../Images/Initiative/initiativeimage5.jpg";

// Slugify function to create URL-friendly slugs
function slugify(s) {
  return s
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Icons array
const icons = [Sparkles, Recycle, Droplet];

const InitiativesGrid = () => {
  const { t, lang } = useLanguage();
  const items = t && t.initiatives ? t.initiatives : initiativesContent;

  // Mouse / touch hover tilt effect
  const handleTileMove = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;

    const px = (clientX - rect.left) / rect.width;
    const py = (clientY - rect.top) / rect.height;

    const rx = (py - 0.5) * 6;
    const ry = (px - 0.5) * -10;

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
        const slug = slugify(item.title);

        return (
          <motion.div
            id={slug}
            key={item.title}
            whileHover={{ y: -3 }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            className="glass-card p-4 border border-white/10"
            onMouseMove={(e) => handleTileMove(e, slug)}
            onMouseLeave={() => handleTileLeave(slug)}
            onTouchMove={(e) => handleTileMove(e, slug)}
            onTouchEnd={() => handleTileLeave(slug)}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/10 border border-white/10 grid place-items-center text-amber-200">
                <Icon size={18} />
              </div>
              <p
                className={`mt-2 text-sm text-white/75 leading-relaxed ${
                  lang === "hi" ? "font-devanagari" : ""
                } line-clamp-3`}
              >
                {item.description}
              </p>
            </div>

            <div className="mt-3">
              <Link
                to={`/initiatives/${slug}`}
                className="text-sm text-amber-300 hover:underline inline-flex items-center gap-2"
              >
                {lang === "hi" ? "और पढ़ें" : "Read more"}{" "}
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default InitiativesGrid;
