import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Recycle, Droplet, ImagePlus } from "lucide-react";
import initiativesContent from "../data/initiativesContent.js";
import { usePlacedImages } from "../utils/usePlacedImages.js";

const icons = [Sparkles, Recycle, Droplet];

function slugify(s) {
  return s
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}


const InitiativeDetail = () => {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const isHindi = lang === "hi";
  const { images: slotImages } = usePlacedImages("initiative", slug);

  const initIndex = initiativesContent.findIndex((item) => slugify(item.title) === slug);
  if (initIndex === -1) {
    return (
      <div className="section-shell py-20 text-center space-y-4">
        <h2 className="text-2xl font-semibold">{isHindi ? "पृष्ठ नहीं मिला" : "Page Not Found"}</h2>
        <Link to="/initiatives" className="text-amber-300 underline">
          {isHindi ? "पहल पर वापस जाएँ" : "Back to Initiatives"}
        </Link>
      </div>
    );
  }

  const item = initiativesContent[initIndex];
  const Icon = icons[initIndex >= 0 ? initIndex % icons.length : 0];

  // Split description into paragraphs by double newline if present, otherwise keep single paragraph
  const paragraphs = (item.description || "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="section-shell space-y-8 pb-12">
      <Link to="/initiatives" className="inline-flex items-center gap-2 text-sm text-amber-200 hover:text-amber-100 transition">
        <ArrowLeft size={16} />
        {isHindi ? "सभी पहल" : "All Initiatives"}
      </Link>

      <SectionHeading title={item.title} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 md:p-8 border border-white/10 rounded-2xl space-y-5"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/10 grid place-items-center text-amber-200">
            <Icon size={22} />
          </div>
          <h3 className={`text-2xl font-semibold ${isHindi ? "font-devanagari" : ""}`}>{item.title}</h3>
        </div>

        {paragraphs.map((para, i) => (
          <p key={i} className={`text-sm md:text-base text-white/80 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
            {para}
          </p>
        ))}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4">
          {[0, 1, 2].map((n) => (
            <div
              key={n}
              className={`aspect-video rounded-xl border ${
                slotImages[n]
                  ? "border-white/10 overflow-hidden"
                  : "border-dashed border-white/20 bg-white/5 grid place-items-center text-white/30"
              }`}
            >
              {slotImages[n] ? (
                <img src={slotImages[n]} alt={`${item.title} ${n + 1}`} className="w-full h-full object-cover" />
              ) : (
                <ImagePlus size={28} />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default InitiativeDetail;
