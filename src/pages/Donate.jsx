import SectionHeading from "../components/SectionHeading.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { motion } from "framer-motion";
import { HeartHandshake, HandHeart } from "lucide-react";

const Donate = () => {
  const { lang } = useLanguage();

  const cards = [
    {
      id: "make-a-gift",
      icon: HeartHandshake,
      title: lang === "hi" ? "दान करें" : "Make a Gift",
      text:
        lang === "hi"
          ? "आपका समर्थन भोजन, शिक्षा, स्वास्थ्य और आश्रय प्रदान करता है।"
          : "Your support fuels food, education, healthcare, and shelter programs."
    },
    {
      id: "volunteer",
      icon: HandHeart,
      title: lang === "hi" ? "स्वयंसेवक बनें" : "Volunteer",
      text:
        lang === "hi"
          ? "स्थानीय ड्राइव, स्वास्थ्य कैंप और पर्यावरण अभियानों में हमारे साथ जुड़ें।"
          : "Join local drives, health camps, and environmental clean-ups with us."
    }
  ];

  return (
    <div className="section-shell space-y-8 pb-12">
      <SectionHeading
        eyebrow={lang === "hi" ? "दान" : "Donate"}
        title={lang === "hi" ? "हर सहयोग मायने रखता है" : "Every Contribution Matters"}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              id={card.id}
              key={card.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="glass-card p-6 border border-white/10"
            >
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/10 grid place-items-center text-amber-200">
                  <Icon size={20} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  <p className={`text-sm text-white/80 leading-relaxed ${lang === "hi" ? "font-devanagari" : ""}`}>{card.text}</p>
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.02 }}
                    className="inline-flex text-sm font-semibold text-amber-200"
                  >
                    {lang === "hi" ? "हमसे बात करें" : "Talk to us"}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Donate;
