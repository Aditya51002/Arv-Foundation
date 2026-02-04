import SectionHeading from "../components/SectionHeading";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

const About = () => {
  const { t, lang } = useLanguage();
  const cards = [
    { title: lang === "hi" ? "हम कौन हैं" : "Who We Are", body: t.about.who },
    { title: lang === "hi" ? "मिशन" : "Mission", body: t.about.mission },
    { title: lang === "hi" ? "दृष्टि" : "Vision", body: t.about.vision }
  ];

  return (
    <div className="section-shell space-y-6 pb-12">
      <SectionHeading
        eyebrow={lang === "hi" ? "परिचय" : "About"}
        title={lang === "hi" ? "समाज के लिए आशा" : "Hope for Every Community"}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.45, delay: idx * 0.05 }}
            className="glass-card p-5 border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className={`text-sm text-white/80 leading-relaxed ${lang === "hi" ? "font-devanagari" : ""}`}>{card.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
