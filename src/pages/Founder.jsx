import SectionHeading from "../components/SectionHeading.jsx";
import FounderCard from "../components/FounderCard.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const Founder = () => {
  const { lang } = useLanguage();
  return (
    <div className="section-shell space-y-6 pb-12">
      <SectionHeading
        eyebrow={lang === "hi" ? "संस्थापक" : "Founder"}
        title={lang === "hi" ? "निःस्वार्थ सेवा का संकल्प" : "A Promise to Serve"}
      />
      <FounderCard />
    </div>
  );
};

export default Founder;
