import SectionHeading from "../components/SectionHeading.jsx";
import ContactSection from "../components/ContactSection.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const Contact = () => {
  const { lang } = useLanguage();
  return (
    <div className="section-shell space-y-6 pb-12">
      <SectionHeading
        eyebrow={lang === "hi" ? "संपर्क" : "Contact"}
        title={lang === "hi" ? "हमसे जुड़ें" : "Connect with ARV"}
      />
      <ContactSection />
    </div>
  );
};

export default Contact;
