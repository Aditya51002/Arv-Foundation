import SectionHeading from "../components/SectionHeading";
import InitiativesGrid from "../components/InitiativesGrid";
import { useLanguage } from "../context/LanguageContext";

const Initiatives = () => {
  const { lang } = useLanguage();
  return (
    <div className="section-shell space-y-6 pb-12">
      <SectionHeading
        eyebrow={lang === "hi" ? "विशेष अभियान" : "Featured Initiatives"}
        title={lang === "hi" ? "समुदाय को जोड़ना" : "Connecting Communities"}
      />
      <InitiativesGrid />
    </div>
  );
};

export default Initiatives;
