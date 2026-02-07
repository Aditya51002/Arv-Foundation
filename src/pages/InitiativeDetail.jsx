import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Recycle, Droplet, ImagePlus } from "lucide-react";

const icons = [Sparkles, Recycle, Droplet];

function slugify(s) {
  return s
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const detailContent = {
  en: {
    "sanitary-pad-initiative": {
      heading: "Sanitary Pad Initiative",
      content: [
        "Menstrual hygiene is a fundamental need, yet millions of women and girls in India still lack access to affordable sanitary products. ARV Foundation's Sanitary Pad Initiative aims to bridge this gap by distributing free sanitary pads and conducting awareness sessions in schools, colleges, and slum communities.",
        "We collaborate with women self-help groups to promote sustainable menstrual hygiene practices and reduce taboos around menstruation. Our workshops empower women with knowledge about hygiene, health, and safe product choices.",
        "Through this initiative, we have reached thousands of women and girls, enabling them to live with dignity and confidence every day of the month.",
      ],
    },
    "go-for-sangam": {
      heading: "Go For Sangam",
      content: [
        "The holy Sangam in Prayagraj is one of India's most sacred confluences. However, increasing pollution and waste accumulation threaten its purity. ARV Foundation's 'Go For Sangam' campaign is a large-scale cleanliness drive dedicated to preserving this heritage site.",
        "Every month, our volunteers gather along the riverbanks to collect waste, spread awareness about proper waste disposal, and engage local communities in keeping Sangam clean.",
        "We partner with municipal authorities and environmental agencies to ensure long-lasting impact. Together, we are restoring the sanctity and beauty of this iconic location.",
      ],
    },
    "blood-donation-drive": {
      heading: "Blood Donation Drive",
      content: [
        "Blood donation saves lives — and one unit of blood can save up to three people. ARV Foundation regularly organizes blood donation camps in collaboration with Police Mitra and local hospitals.",
        "Our drives create awareness among youth and communities about the importance of voluntary blood donation. We ensure a safe, hygienic, and supportive environment for every donor.",
        "To date, our blood donation campaigns have collected hundreds of units that have directly helped accident victims, surgery patients, and those battling diseases.",
      ],
    },
  },
  hi: {
    "sanitary-pad-initiative": {
      heading: "सैनिटरी पैड पहल",
      content: [
        "मासिक धर्म स्वच्छता एक मौलिक आवश्यकता है, फिर भी भारत में लाखों महिलाएँ और लड़कियाँ सस्ती सैनिटरी उत्पादों तक पहुँच से वंचित हैं। ARV Foundation की सैनिटरी पैड पहल इस अंतर को पाटने का प्रयास करती है।",
        "हम स्कूलों, कॉलेजों और झुग्गी बस्तियों में निःशुल्क सैनिटरी पैड वितरित करते हैं और जागरूकता सत्र आयोजित करते हैं।",
        "इस पहल के माध्यम से हम हजारों महिलाओं और लड़कियों तक पहुँचे हैं, जिससे वे सम्मान और आत्मविश्वास के साथ जीवन जी सकें।",
      ],
    },
    "go-for-sangam": {
      heading: "गो फ़ॉर संगम",
      content: [
        "प्रयागराज का पवित्र संगम भारत के सबसे पवित्र संगमों में से एक है। लेकिन बढ़ता प्रदूषण इसकी पवित्रता को खतरे में डाल रहा है।",
        "ARV Foundation का 'गो फ़ॉर संगम' अभियान इस विरासत स्थल के संरक्षण के लिए समर्पित एक बड़े पैमाने पर स्वच्छता अभियान है।",
        "हम नगरपालिका अधिकारियों और पर्यावरण एजेंसियों के साथ साझेदारी करके दीर्घकालिक प्रभाव सुनिश्चित करते हैं।",
      ],
    },
    "blood-donation-drive": {
      heading: "रक्तदान अभियान",
      content: [
        "रक्तदान जीवन बचाता है — और रक्त की एक इकाई तीन लोगों तक की जान बचा सकती है।",
        "ARV Foundation पुलिस मित्र और स्थानीय अस्पतालों के सहयोग से नियमित रूप से रक्तदान शिविर आयोजित करता है।",
        "अब तक हमारे रक्तदान अभियानों ने सैकड़ों इकाइयाँ एकत्र की हैं जिन्होंने सीधे दुर्घटना पीड़ितों और रोगियों की मदद की है।",
      ],
    },
  },
};

const InitiativeDetail = () => {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const isHindi = lang === "hi";

  const details = detailContent[lang];
  const page = details[slug];

  const initIndex = t.initiatives.findIndex((item) => slugify(item.title) === slug);
  const Icon = icons[initIndex >= 0 ? initIndex % icons.length : 0];

  if (!page) {
    return (
      <div className="section-shell py-20 text-center space-y-4">
        <h2 className="text-2xl font-semibold">
          {isHindi ? "पृष्ठ नहीं मिला" : "Page Not Found"}
        </h2>
        <Link to="/initiatives" className="text-amber-300 underline">
          {isHindi ? "पहल पर वापस जाएँ" : "Back to Initiatives"}
        </Link>
      </div>
    );
  }

  return (
    <div className="section-shell space-y-8 pb-12">
      <Link
        to="/initiatives"
        className="inline-flex items-center gap-2 text-sm text-amber-200 hover:text-amber-100 transition"
      >
        <ArrowLeft size={16} />
        {isHindi ? "सभी पहल" : "All Initiatives"}
      </Link>

      <SectionHeading title={page.heading} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 md:p-8 border border-white/10 rounded-2xl space-y-5"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/10 grid place-items-center text-amber-200">
            <Icon size={22} />
          </div>
          <h3 className={`text-2xl font-semibold ${isHindi ? "font-devanagari" : ""}`}>
            {page.heading}
          </h3>
        </div>

        {page.content.map((para, i) => (
          <p
            key={i}
            className={`text-sm md:text-base text-white/80 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}
          >
            {para}
          </p>
        ))}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="aspect-video rounded-xl border border-dashed border-white/20 bg-white/5 grid place-items-center text-white/30"
            >
              <ImagePlus size={28} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default InitiativeDetail;
