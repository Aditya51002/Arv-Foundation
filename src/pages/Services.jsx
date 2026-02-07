import SectionHeading from "../components/SectionHeading.jsx";
import ContactSection from "../components/ContactSection.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { motion } from "framer-motion";
import { GraduationCap, Newspaper, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const servicesContent = {
  en: {
    eyebrow: "Services",
    title: "What We Offer",
    cards: [
      {
        id: "internship",
        icon: GraduationCap,
        title: "Internship Program",
        text: "Gain hands-on experience working with grassroots communities. Our internship program is open to students and young professionals who want to make a difference through social-sector work. Interns participate in fieldwork, event management, content creation, and community engagement.",
        cta: "Apply Now",
      },
      {
        id: "newsletter",
        icon: Newspaper,
        title: "News & Letter",
        text: "Stay updated with ARV Foundation's latest activities, impact stories, success highlights, and upcoming events. Our monthly newsletter delivers meaningful stories of change directly to your inbox.",
        cta: "Subscribe",
      },
    ],
    contactHeading: "Contact Us",
  },
  hi: {
    eyebrow: "सेवाएँ",
    title: "हम क्या प्रदान करते हैं",
    cards: [
      {
        id: "internship",
        icon: GraduationCap,
        title: "इंटर्नशिप कार्यक्रम",
        text: "जमीनी स्तर के समुदायों के साथ काम करने का व्यावहारिक अनुभव प्राप्त करें। हमारा इंटर्नशिप कार्यक्रम उन छात्रों और युवा पेशेवरों के लिए खुला है जो सामाजिक क्षेत्र के माध्यम से बदलाव लाना चाहते हैं।",
        cta: "आवेदन करें",
      },
      {
        id: "newsletter",
        icon: Newspaper,
        title: "समाचार और पत्र",
        text: "ARV Foundation की नवीनतम गतिविधियों, प्रभाव कहानियों, सफलता की झलकियों और आगामी कार्यक्रमों से अपडेट रहें। हमारा मासिक समाचार पत्र सीधे आपके इनबॉक्स में बदलाव की सार्थक कहानियाँ पहुँचाता है।",
        cta: "सदस्यता लें",
      },
    ],
    contactHeading: "हमसे संपर्क करें",
  },
};

const Services = () => {
  const { lang } = useLanguage();
  const isHindi = lang === "hi";
  const content = servicesContent[lang];

  return (
    <div className="section-shell space-y-10 pb-12">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} />

      {/* Service cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {content.cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              id={card.id}
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-card p-6 border border-white/10 rounded-2xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/10 grid place-items-center text-amber-200">
                  <Icon size={20} />
                </div>
                <h3 className={`text-xl font-semibold ${isHindi ? "font-devanagari" : ""}`}>
                  {card.title}
                </h3>
              </div>
              <p className={`text-sm text-white/80 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
                {card.text}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300 px-4 py-2 text-sm font-semibold text-black"
              >
                {card.cta} <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Contact section embedded */}
      <div className="space-y-6">
        <SectionHeading
          eyebrow={isHindi ? "संपर्क" : "Contact"}
          title={content.contactHeading}
        />
        <ContactSection />
      </div>
    </div>
  );
};

export default Services;
