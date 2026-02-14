import { motion } from "framer-motion";
import { Sparkles, MapPin, Users, Home as HomeIcon } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const branches = [
  { title: "Delhi Branch", description: "Community outreach and education hub." },
  { title: "Mumbai Branch", description: "Food drives and shelter initiatives." },
  { title: "Bengaluru Branch", description: "Health camps and volunteer programs." },
  { title: "Kolkata Branch", description: "Environmental & sustainability projects." },
];

const icons = [MapPin, Users, Sparkles, HomeIcon];

const Branches = () => {
  const { lang } = useLanguage();

  return (
    <section className="section-shell py-12 relative z-20" aria-label="Branches">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">{lang === "hi" ? "हमारे शाखाएँ" : "Our Branches"}</h2>
          <div className="h-1 w-20 bg-amber-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {branches.map((b, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={b.title}
                whileHover={{ y: -6, scale: 1.02 }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="glass-card p-4 rounded-2xl border border-white/8 hover:border-amber-300/50 transition-colors h-full"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/8 grid place-items-center text-amber-200 border border-white/6">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-md font-semibold text-white ${lang === "hi" ? "font-devanagari" : ""}`}>
                      {b.title}
                    </h4>
                    <p className={`mt-2 text-sm text-white/70 leading-relaxed ${lang === "hi" ? "font-devanagari" : ""}`}>
                      {b.description}
                    </p>
                    {/* Removed 'Learn more' link per design */}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Branches;
