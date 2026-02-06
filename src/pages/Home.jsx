import Hero from "../components/Hero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import WorkGrid from "../components/WorkGrid.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { motion } from "framer-motion";

const Home = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="glass-card p-6 border border-white/10 pb-14 space-y-12">
      <Hero />

      <section className="section-shell space-y-6">
        <SectionHeading
          // eyebrow={lang === "hi" ? "हमारा उद्देश्य" : "Our Purpose"}
          title={lang === "hi" ? "उम्मीद के साथ सेवा" : "Serving with Hope"}
        />
        <div className="glass-card p-6 border border-white/10 pb-14 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[t.about.who, t.about.mission, t.about.vision].map((text, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="glass-card p-5 border border-white/10"
              >
                <p className={`text-sm leading-relaxed text-white/80 ${lang === "hi" ? "font-devanagari" : ""}`}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell space-y-6">
        <SectionHeading
          // eyebrow={lang === "hi" ? "हमारे प्रयास" : "Our Work"}
          title={lang === "hi" ? "जमीनी प्रभाव" : "Ground-Level Impact"}
        />
        <WorkGrid />
      </section>

      <section className="section-shell space-y-6">
        <SectionHeading
          eyebrow={lang === "hi" ? "पहल" : "Initiatives"}
          title={lang === "hi" ? "समुदाय को जोड़ना" : "Connecting Communities"}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.initiatives.map((item, idx) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="glass-card p-5 border border-white/10"
            >
              <h3 className={`text-lg font-semibold mb-2 ${lang === "hi" ? "font-devanagari" : ""}`}>{item.title}</h3>
              <p className={`text-sm text-white/80 leading-relaxed ${lang === "hi" ? "font-devanagari" : ""}`}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
