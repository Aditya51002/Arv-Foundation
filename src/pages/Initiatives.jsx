import SectionHeading from "../components/SectionHeading.jsx";
import InitiativesGrid from "../components/InitiativesGrid.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

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
