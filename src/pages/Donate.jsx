import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeartHandshake, HandHeart, Shirt, Utensils, ToyBrick, Pill, Check } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const Donate = () => {
  const { lang } = useLanguage();
  const [selectedContributions, setSelectedContributions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    if (isAuthenticated) {
      // TODO: Fetch logged-in user details from backend API
      setFormData(prev => ({
        ...prev,
        name: prev.name || "Asha Volunteer",
        email: prev.email || "asha.volunteer@example.org",
        phone: prev.phone || "+91 90000 00000"
      }));
    } else {
      setFormData(prev => ({ ...prev, name: "", email: "", phone: "" }));
    }
  }, [isAuthenticated]);

  const cards = [
    {
      id: "make-a-gift",
      icon: HeartHandshake,
      title: lang === "hi" ? "दान करें" : "Make a Gift",
      text:
        lang === "hi"
          ? "आपका समर्थन भोजन, शिक्षा, स्वास्थ्य और आश्रय प्रदान करता है।"
          : "Your support fuels food, education, healthcare, and shelter programs."
    },
    {
      id: "volunteer",
      icon: HandHeart,
      title: lang === "hi" ? "स्वयंसेवक बनें" : "Volunteer",
      text:
        lang === "hi"
          ? "स्थानीय ड्राइव, स्वास्थ्य कैंप और पर्यावरण अभियानों में हमारे साथ जुड़ें।"
          : "Join local drives, health camps, and environmental clean-ups with us."
    },

    {
      id: "donate-clothes",
      icon: Shirt,
      title: lang === "hi" ? "कपड़े दान करें" : "Donate Clothes",
      text:
        lang === "hi"
          ? "जरूरतमंद परिवारों को साफ और उपयोगी कपड़ों का संग्रह और वितरण।"
          : "Collection and distribution of clean, usable clothes to needy families."  
    },
    
    {
      id: "donate-food",
      icon: Utensils,
      title: lang === "hi" ? "भोजन दान करें" : "Donate Food",
      text:
        lang === "hi"
          ? "झुग्गी बस्तियों और मजदूर वर्ग को पौष्टिक भोजन उपलब्ध कराना।"
          : "Providing nutritious food to slum residents and labor-class families."
    },

    {
      id: "donate-medicine",
      icon: Pill, 
      title: lang === "hi" ? "दवा दान करें" : "Donate Medicine",
      text:
        lang === "hi"
          ? "जरूरतमंदों को आवश्यक दवाइयों का वितरण।"
          : "Distribution of essential medicines to those in need."
    },
    {
      id: "donate-toys",
      icon: ToyBrick, 
      title: lang === "hi" ? "खिलौने दान करें" : "Donate Toys",
      text:
        lang === "hi"
          ? "अनाथालयों और वंचित क्षेत्रों में बच्चों को खिलौने और खेल प्रदान करना।"
          : "Providing toys and games to children in orphanages and underprivileged areas."
    }
    

   
  ];

  const handleContributionToggle = id => {
    setSelectedContributions(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleInputChange = field => event => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (selectedContributions.length === 0) {
      setConfirmation(lang === "hi" ? "कृपया कोई योगदान विकल्प चुनें।" : "Please select at least one contribution option.");
      return;
    }

    // TODO: On submit, send contribution details to backend API
    // TODO: Trigger email notification to ARV Foundation
    // TODO: Send email to ARV Foundation with user contribution details

    setConfirmation(lang === "hi" ? "धन्यवाद! हम जल्द आपसे संपर्क करेंगे।" : "Thank you! Someone from ARV will connect with you soon.");
    setTimeout(() => setConfirmation(""), 4000);
  };

  const renderAuthFields = () => (
    <div className="grid gap-4 md:grid-cols-3">
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-wide text-white/60">{lang === "hi" ? "पूरा नाम" : "Full Name"}</span>
        <input
          type="text"
          value={formData.name}
          onChange={handleInputChange("name")}
          className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40"
          placeholder={lang === "hi" ? "अपना नाम दर्ज करें" : "Enter your name"}
          required
          readOnly={isAuthenticated}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-wide text-white/60">{lang === "hi" ? "ईमेल" : "Email Address"}</span>
        <input
          type="email"
          value={formData.email}
          onChange={handleInputChange("email")}
          className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40"
          placeholder="you@example.com"
          required
          readOnly={isAuthenticated}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-wide text-white/60">{lang === "hi" ? "फ़ोन" : "Phone Number"}</span>
        <input
          type="tel"
          value={formData.phone}
          onChange={handleInputChange("phone")}
          className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40"
          placeholder={lang === "hi" ? "+91 90000 00000" : "+91 90000 00000"}
          required
          readOnly={isAuthenticated}
        />
      </label>
    </div>
  );

  return (
    <div className="section-shell space-y-10 pb-16">
      <SectionHeading title={lang === "hi" ? "हर सहयोग मायने रखता है" : "Every Contribution Matters"} />

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const isSelected = selectedContributions.includes(card.id);
          return (
            <motion.button
              type="button"
              id={card.id}
              key={card.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              onClick={() => handleContributionToggle(card.id)}
              className={`glass-card p-6 border text-left transition-all duration-200 ${
                isSelected ? "border-amber-300/70 shadow-[0_0_25px_rgba(245,165,36,0.35)]" : "border-white/10"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`h-11 w-11 rounded-xl grid place-items-center ${isSelected ? "bg-amber-300/20 text-amber-200" : "bg-white/10 text-amber-200"} border border-white/10`}>
                  <Icon size={20} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    {isSelected && <Check size={16} className="text-amber-300" />}
                  </div>
                  <p className={`text-sm text-white/80 leading-relaxed ${lang === "hi" ? "font-devanagari" : ""}`}>{card.text}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 border border-white/10 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-lg font-semibold">{lang === "hi" ? "योगदान विवरण" : "Contribution Preferences"}</h2>
          <button
            type="button"
            onClick={() => setIsAuthenticated(prev => !prev)}
            className="text-xs tracking-wide uppercase text-amber-200"
          >
            {isAuthenticated ? (lang === "hi" ? "लॉगआउट का अनुकरण" : "Simulate Logout") : (lang === "hi" ? "लॉगिन का अनुकरण" : "Simulate Login")}
          </button>
        </div>

        {renderAuthFields()}

        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-white/60">{lang === "hi" ? "आप कैसे मदद करना चाहेंगे?" : "How would you like to help us?"}</span>
          <textarea
            value={formData.message}
            onChange={handleInputChange("message")}
            className="glass border border-white/10 rounded-2xl px-4 py-3 min-h-[140px] bg-white/5 text-white placeholder:text-white/40"
            placeholder={lang === "hi" ? "योगदान के बारे में हमें बताएं..." : "Tell us about the contribution you have in mind..."}
            required
          />
        </label>

        {selectedContributions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedContributions.map(type => (
              <span key={type} className="badge text-xs bg-amber-300/15 text-amber-100 border-amber-200/40">
                {cards.find(card => card.id === type)?.title || type}
              </span>
            ))}
          </div>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          className="accent-gradient rounded-2xl px-6 py-3 font-semibold text-base text-[#0b1411]"
        >
          {lang === "hi" ? "हमसे बात करें" : "Talk to Us"}
        </motion.button>

        {confirmation && <p className="text-sm text-amber-200">{confirmation}</p>}
      </form>
    </div>
  );
};

export default Donate;
