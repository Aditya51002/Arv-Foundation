import React from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const Newsletter = () => {
  const { lang } = useLanguage();
  const isHindi = lang === "hi";

  const placeholders = Array.from({ length: 10 }).map((_, i) => ({ id: i + 1 }));

  return (
    <div className="section-shell pt-[calc(var(--navbar-height)+3rem)] pb-12">
      <div className="mt-4 lg:mt-6">
        <SectionHeading title={isHindi ? "समाचार और पत्र" : "News & Letter"} />
      </div>

      <p className="text-white/80 mb-6">
        {isHindi
          ? "ARV Foundation की नवीनतम गतिविधियों, प्रभाव कहानियों, सफलता की झलकियों और आगामी कार्यक्रमों से अपडेट रहें।"
          : "Stay updated with ARV Foundation's latest activities, impact stories, success highlights, and upcoming events."}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {placeholders.map((p) => (
          <div
            key={p.id}
            className="h-40 rounded-2xl border border-white/8 bg-white/2 flex items-center justify-center text-white/40"
          >
            <div className="text-center">
              <div className="mb-2 text-sm">{isHindi ? "छवि" : "Image"} {p.id}</div>
              <div className="text-xs">{isHindi ? "आगे जोड़ें" : "Add later"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newsletter;
