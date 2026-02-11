import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  HelpingHand,
  Heart,
  School,
  Stethoscope,
  Leaf,
  Droplets,
  Shirt,
  Soup,
  ImagePlus,
} from "lucide-react";
import { usePlacedImages } from "../utils/usePlacedImages.js";

const icons = [HelpingHand, Heart, School, Stethoscope, Leaf, Droplets, Shirt, Soup];

function slugify(s) {
  return s
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/* Extended content for each work-area detail page (editable later) */
const detailContent = {
  en: {
    "orphanage-support": {
      heading: "Orphanage Support",
      content: [
        "At ARV Foundation, we believe every child deserves love, care, and a chance at a bright future. Our Orphanage Support program works closely with orphanages across Prayagraj and surrounding regions to improve the living conditions of children who have lost their families.",
        "We provide nutritious meals, educational supplies, hygiene kits, and emotional support through mentorship programs. Regular health check-ups are organized in collaboration with local healthcare providers to ensure the well-being of every child.",
        "Our volunteers visit orphanages on weekends to teach, play, and spend quality time with the children — because sometimes a warm smile can change a life.",
      ],
    },
    "old-age-home": {
      heading: "Old Age Home",
      content: [
        "Senior citizens who have been abandoned by their families deserve dignity, companionship, and care. ARV Foundation supports old-age homes by providing essential supplies, medical aid, and recreational activities.",
        "We organize regular visits where volunteers interact with the elderly, celebrate festivals together, and provide physiotherapy and health awareness sessions.",
        "Our goal is to make sure no senior citizen feels forgotten or alone.",
      ],
    },
    "slum-area-development": {
      heading: "Slum Area Development",
      content: [
        "Millions of families in urban slums live without basic sanitation, clean water, and education. ARV Foundation runs community development programs in slum areas of Prayagraj.",
        "We conduct health camps, distribute food and essential supplies, organize education-awareness drives, and set up temporary learning centers for children who cannot attend regular schools.",
        "By partnering with local leaders and volunteers, we aim to create sustainable improvements that uplift entire communities.",
      ],
    },
    "environment-protection": {
      heading: "Environment Protection",
      content: [
        "Protecting our planet is integral to every mission. ARV Foundation spearheads tree-plantation drives, plastic-free campaigns, and cleanliness initiatives across Prayagraj.",
        "Our flagship 'Go For Sangam' campaign focuses on maintaining the purity and cleanliness of the sacred Sangam area. Volunteers participate in weekly clean-up drives along the riverbanks.",
        "We also conduct environmental awareness workshops in schools and colleges, motivating the youth to adopt eco-friendly practices.",
      ],
    },
    education: {
      heading: "Education",
      content: [
        "Education is the most powerful tool for social transformation. ARV Foundation provides free tuition and learning resources to children from underprivileged backgrounds.",
        "We run after-school support centers, distribute notebooks, uniforms, and stationery, and organize scholarship drives to help bright students continue their education.",
        "Our tutors and volunteers dedicate their evenings and weekends to ensure that no child is left behind because of poverty.",
      ],
    },
    health: {
      heading: "Health",
      content: [
        "Access to healthcare should be a right, not a privilege. ARV Foundation organizes free medical camps in slum areas, villages, and old-age homes.",
        "We distribute essential medicines, provide basic health screenings, and run awareness campaigns on topics like hygiene, nutrition, and preventive care.",
        "In collaboration with local hospitals and doctors, we ensure that medical support reaches those who need it the most.",
      ],
    },
    "old-clothes-distribution": {
      heading: "Old Clothes Distribution",
      content: [
        "Clothing is a basic need that many families cannot afford. ARV Foundation regularly collects clean, usable clothes from donors and distributes them across slum communities and homeless shelters.",
        "Our winter-wear drives ensure warmth for children and the elderly during harsh cold months. Every piece of clothing collected reaches a family in need.",
        "You can contribute by donating your used clothes at our collection points or during organized drives.",
      ],
    },
    "food-drive": {
      heading: "Food Drive",
      content: [
        "Hunger cannot wait. ARV Foundation conducts regular food drives to provide nutritious meals to families in slum areas, daily-wage workers, and the homeless.",
        "During festivals and special occasions, we organize large-scale community kitchens that serve hundreds of people. Our volunteers prepare and distribute packets of cooked food, dry rations, and clean drinking water.",
        "Every meal we serve is a step toward zero hunger in our community.",
      ],
    },
  },
  hi: {
    "orphanage-support": {
      heading: "अनाथालय सहयोग",
      content: [
        "ARV Foundation का मानना है कि हर बच्चा प्यार, देखभाल और उज्ज्वल भविष्य का हकदार है। हमारा अनाथालय सहयोग कार्यक्रम प्रयागराज और आसपास के क्षेत्रों में अनाथालयों के साथ मिलकर काम करता है।",
        "हम पौष्टिक भोजन, शैक्षिक सामग्री, स्वच्छता किट और मार्गदर्शन कार्यक्रमों के माध्यम से भावनात्मक सहायता प्रदान करते हैं।",
        "हमारे स्वयंसेवक सप्ताहांत पर अनाथालयों में जाकर बच्चों को पढ़ाते हैं, खेलते हैं और गुणवत्तापूर्ण समय बिताते हैं।",
      ],
    },
    "old-age-home": {
      heading: "वृद्धाश्रम सेवा",
      content: [
        "परित्यक्त बुजुर्ग सम्मान, साथ और देखभाल के हकदार हैं। ARV Foundation वृद्धाश्रमों को आवश्यक सामग्री, चिकित्सा सहायता और मनोरंजन गतिविधियाँ प्रदान करता है।",
        "हम नियमित यात्राओं का आयोजन करते हैं जहाँ स्वयंसेवक बुजुर्गों से मिलते हैं, त्योहार मनाते हैं और स्वास्थ्य जागरूकता सत्र आयोजित करते हैं।",
        "हमारा लक्ष्य यह सुनिश्चित करना है कि कोई भी बुजुर्ग उपेक्षित या अकेला महसूस न करे।",
      ],
    },
    "slum-area-development": {
      heading: "झुग्गी बस्ती विकास",
      content: [
        "शहरी झुग्गी बस्तियों में लाखों परिवार बुनियादी सुविधाओं के बिना रहते हैं। ARV Foundation प्रयागराज की बस्तियों में सामुदायिक विकास कार्यक्रम चलाता है।",
        "हम स्वास्थ्य शिविर, खाद्य वितरण, शिक्षा जागरूकता अभियान और अस्थायी शिक्षण केंद्र संचालित करते हैं।",
        "स्थानीय नेताओं और स्वयंसेवकों के साथ साझेदारी करके हम पूरे समुदाय को उन्नत करने के लिए स्थायी सुधार बनाते हैं।",
      ],
    },
    "environment-protection": {
      heading: "पर्यावरण संरक्षण",
      content: [
        "पर्यावरण की रक्षा हमारे हर मिशन का अभिन्न अंग है। ARV Foundation वृक्षारोपण, प्लास्टिक-मुक्त अभियान और स्वच्छता कार्यक्रम चलाता है।",
        "हमारा प्रमुख 'गो फ़ॉर संगम' अभियान पवित्र संगम क्षेत्र की स्वच्छता पर केंद्रित है।",
        "हम स्कूलों और कॉलेजों में पर्यावरण जागरूकता कार्यशालाएँ भी आयोजित करते हैं।",
      ],
    },
    education: {
      heading: "शिक्षा",
      content: [
        "शिक्षा सामाजिक परिवर्तन का सबसे शक्तिशाली उपकरण है। ARV Foundation वंचित पृष्ठभूमि के बच्चों को निःशुल्क शिक्षण और सामग्री प्रदान करता है।",
        "हम ट्यूशन केंद्र चलाते हैं, नोटबुक और स्टेशनरी वितरित करते हैं, और छात्रवृत्ति अभियान आयोजित करते हैं।",
        "हमारे शिक्षक और स्वयंसेवक यह सुनिश्चित करने के लिए समर्पित हैं कि गरीबी के कारण कोई भी बच्चा पीछे न रहे।",
      ],
    },
    health: {
      heading: "स्वास्थ्य",
      content: [
        "स्वास्थ्य सेवा तक पहुँच एक अधिकार होना चाहिए। ARV Foundation झुग्गी बस्तियों, गाँवों और वृद्धाश्रमों में निःशुल्क चिकित्सा शिविर आयोजित करता है।",
        "हम आवश्यक दवाइयाँ वितरित करते हैं, स्वास्थ्य जाँच प्रदान करते हैं और स्वच्छता और पोषण पर जागरूकता अभियान चलाते हैं।",
        "स्थानीय अस्पतालों और डॉक्टरों के सहयोग से हम सुनिश्चित करते हैं कि सबसे ज़रूरतमंदों तक चिकित्सा सहायता पहुँचे।",
      ],
    },
    "old-clothes-distribution": {
      heading: "पुराने कपड़ों का वितरण",
      content: [
        "कपड़े एक बुनियादी ज़रूरत है जो कई परिवारों की पहुँच से बाहर है। ARV Foundation नियमित रूप से दानदाताओं से कपड़े एकत्र करता है और वितरित करता है।",
        "हमारे शीतकालीन वस्त्र अभियान ठंड में बच्चों और बुजुर्गों को गर्माहट प्रदान करते हैं।",
        "आप हमारे संग्रह केंद्रों पर अपने पुराने कपड़े दान करके योगदान कर सकते हैं।",
      ],
    },
    "food-drive": {
      heading: "भोजन वितरण",
      content: [
        "भूख इंतज़ार नहीं कर सकती। ARV Foundation नियमित खाद्य अभियान चलाता है जो झुग्गी बस्तियों, दिहाड़ी मजदूरों और बेघरों को पौष्टिक भोजन प्रदान करता है।",
        "त्योहारों और विशेष अवसरों पर हम बड़े पैमाने पर सामुदायिक रसोई का आयोजन करते हैं।",
        "हमारा हर भोजन समुदाय में शून्य भुखमरी की दिशा में एक कदम है।",
      ],
    },
  },
};

const WorkDetail = () => {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const isHindi = lang === "hi";
  const { images: slotImages } = usePlacedImages("work", slug);

  const details = detailContent[lang];
  const page = details[slug];

  /* Find index for the icon */
  const workIndex = t.work.findIndex((w) => slugify(w.title) === slug);
  const Icon = icons[workIndex >= 0 ? workIndex % icons.length : 0];

  if (!page) {
    return (
      <div className="section-shell py-20 text-center space-y-4">
        <h2 className="text-2xl font-semibold">
          {isHindi ? "पृष्ठ नहीं मिला" : "Page Not Found"}
        </h2>
        <Link to="/work" className="text-amber-300 underline">
          {isHindi ? "कार्य पर वापस जाएँ" : "Back to Work"}
        </Link>
      </div>
    );
  }

  return (
    <div className="section-shell space-y-8 pb-12">
      {/* Back link */}
      <Link
        to="/work"
        className="inline-flex items-center gap-2 text-sm text-amber-200 hover:text-amber-100 transition"
      >
        <ArrowLeft size={16} />
        {isHindi ? "सभी कार्य" : "All Work"}
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

        {/* Image placeholders — connected to admin gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4">
          {[0, 1, 2].map((n) => (
            <div
              key={n}
              className={`aspect-video rounded-xl border ${
                slotImages[n]
                  ? "border-white/10 overflow-hidden"
                  : "border-dashed border-white/20 bg-white/5 grid place-items-center text-white/30"
              }`}
            >
              {slotImages[n] ? (
                <img src={slotImages[n]} alt={`${page.heading} ${n + 1}`} className="w-full h-full object-cover" />
              ) : (
                <ImagePlus size={28} />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WorkDetail;
