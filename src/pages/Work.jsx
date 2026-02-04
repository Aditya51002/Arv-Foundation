import SectionHeading from "../components/SectionHeading.jsx";
import WorkGrid from "../components/WorkGrid.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const Work = () => {
  const { lang } = useLanguage();

  return (
    <div className="section-shell space-y-6 pb-12">
      <SectionHeading
        eyebrow={lang === "hi" ? "हमारा कार्य" : "Our Work"}
        title={lang === "hi" ? "सम्मान के साथ सेवा" : "Serving with Dignity"}
      />
      <WorkGrid />
    </div>
  );
};

export default Work;
