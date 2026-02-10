import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import initiativesContent from "../data/initiativesContent.js";
import { Sparkles, Recycle, Droplet } from "lucide-react";
import initiativeImage1 from "../Images/Initiative/initiativeimage1.jpg";
import initiativeImage2 from "../Images/Initiative/initiativeimage2.jpg";
import initiativeImage3 from "../Images/Initiative/initiativeimage3.jpg";
import initiativeImage4 from "../Images/Initiative/initiativeimage4.jpg";
import initiativeImage5 from "../Images/Initiative/initiativeimage5.jpg";

function slugify(s) {
  return s
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const icons = [Sparkles, Recycle, Droplet];

const InitiativesGrid = () => {
  const { t, lang } = useLanguage();
  const items = initiativesContent;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, idx) => {
        const Icon = icons[idx % icons.length];
        const slug = slugify(item.title);
        return (
          <Link to={`/initiatives/${slug}`} key={item.title} className="block">
            <motion.div
              id={slug}
              whileHover={{ y: -3, scale: 1.01 }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="glass-card p-5 rounded-2xl border border-white/10 h-full hover:border-amber-300/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/10 grid place-items-center text-amber-200">
                  <Icon size={18} />
                </div>
                <h3 className={`text-lg font-semibold ${lang === "hi" ? "font-devanagari" : ""}`}>{item.title}</h3>
              </div>
              <p
                className={`mt-2 text-sm text-white/75 leading-relaxed ${lang === "hi" ? "font-devanagari" : ""}`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.description}
              </p>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default InitiativesGrid;
