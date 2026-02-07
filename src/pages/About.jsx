import SectionHeading from "../components/SectionHeading.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { motion } from "framer-motion";
import { Globe, Target, Users, UserCircle, ImagePlus } from "lucide-react";

const aboutContent = {
  en: {
    who: {
      title: "Who We Are",
      body: "ARV Foundation is a registered non-governmental organization established on 14 November 2017 in Prayagraj, India. We work at the grassroots level to reduce poverty, inequality, and social neglect by empowering individuals and communities. Through education, healthcare, food distribution, shelter, and environmental conservation, we strive to bring real, measurable change to the lives of those who need it most.",
    },
    mission: {
      title: "Mission",
      body: "Our mission is to empower underprivileged communities through holistic development — providing quality education, accessible healthcare, nutritional support, vocational training, and environmental awareness. We believe every individual deserves dignity, opportunity, and a fair chance at life regardless of their circumstances.",
    },
    volunteers: {
      title: "Our Volunteers",
      body: "Our strength lies in our dedicated volunteers who selflessly give their time and energy. From organizing food drives to conducting health camps and running education programs, our volunteers are the backbone of ARV Foundation. They come from all walks of life, united by a common purpose — to serve humanity with compassion.",
    },
    team: {
      title: "Meet Our Team",
      body: "Behind every initiative is a passionate team of change-makers. Our leadership combines experience in social work, management, and community outreach to design impactful programs. Together, we ensure transparency, accountability, and sustained impact across all our projects.",
    },
  },
  hi: {
    who: {
      title: "हम कौन हैं",
      body: "ARV Foundation एक पंजीकृत गैर-सरकारी संगठन है, जिसकी स्थापना 14 नवंबर 2017 को प्रयागराज, भारत में हुई थी। हम जमीनी स्तर पर कार्य करते हुए गरीबी, असमानता और सामाजिक उपेक्षा को कम करने के लिए व्यक्तियों और समुदायों को सशक्त बनाते हैं। शिक्षा, स्वास्थ्य, खाद्य वितरण, आश्रय और पर्यावरण संरक्षण के माध्यम से हम सबसे ज़रूरतमंद लोगों के जीवन में वास्तविक बदलाव लाने का प्रयास करते हैं।",
    },
    mission: {
      title: "मिशन",
      body: "हमारा मिशन समग्र विकास के माध्यम से वंचित समुदायों को सशक्त बनाना है — गुणवत्तापूर्ण शिक्षा, सुलभ स्वास्थ्य सेवा, पोषण सहायता, व्यावसायिक प्रशिक्षण और पर्यावरण जागरूकता प्रदान करना। हम मानते हैं कि हर व्यक्ति सम्मान, अवसर और जीवन में उचित अवसर का हकदार है।",
    },
    volunteers: {
      title: "हमारे स्वयंसेवक",
      body: "हमारी ताकत हमारे समर्पित स्वयंसेवकों में निहित है जो निस्वार्थ भाव से अपना समय और ऊर्जा देते हैं। खाद्य अभियानों से लेकर स्वास्थ्य शिविरों और शिक्षा कार्यक्रमों तक, हमारे स्वयंसेवक ARV Foundation की रीढ़ हैं। वे सभी क्षेत्रों से आते हैं, एक समान उद्देश्य से एकजुट — करुणा के साथ मानवता की सेवा करना।",
    },
    team: {
      title: "हमारी टीम से मिलें",
      body: "हर पहल के पीछे परिवर्तन लाने वालों की एक जुनूनी टीम है। हमारा नेतृत्व सामाजिक कार्य, प्रबंधन और सामुदायिक आउटरीच में अनुभव को मिलाकर प्रभावशाली कार्यक्रम तैयार करता है। साथ मिलकर, हम अपनी सभी परियोजनाओं में पारदर्शिता, जवाबदेही और निरंतर प्रभाव सुनिश्चित करते हैं।",
    },
  },
};

const iconMap = { who: Globe, mission: Target, volunteers: Users, team: UserCircle };

const About = () => {
  const { lang } = useLanguage();
  const isHindi = lang === "hi";
  const content = aboutContent[lang];

  const cards = [
    { id: "who", ...content.who, hasImages: false },
    { id: "mission", ...content.mission, hasImages: false },
    { id: "volunteers", ...content.volunteers, hasImages: true },
    { id: "team", ...content.team, hasImages: true },
  ];

  return (
    <div className="section-shell space-y-8 pb-12">
      <SectionHeading
        // eyebrow={isHindi ? "परिचय" : "About"}
        title={isHindi ? "समाज के लिए आशा" : "Hope for Every Community"}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((card, idx) => {
          const Icon = iconMap[card.id];
          return (
            <motion.div
              id={card.id}
              key={card.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="glass-card p-6 border border-white/10 rounded-2xl space-y-4"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/10 grid place-items-center text-amber-200">
                  <Icon size={20} />
                </div>
                <h3 className={`text-xl font-semibold ${isHindi ? "font-devanagari" : ""}`}>
                  {card.title}
                </h3>
              </div>

              {/* Body */}
              <p className={`text-sm text-white/80 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
                {card.body}
              </p>

              {/* Image placeholders for Volunteers & Team */}
              {card.hasImages && (
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="aspect-square rounded-xl border border-dashed border-white/20 bg-white/5 grid place-items-center text-white/30"
                    >
                      <ImagePlus size={24} />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default About;
