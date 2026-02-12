import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeartHandshake, HandHeart, Shirt, Utensils, ToyBrick, Pill, Check, Loader2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { API_URL } from "../config"; 

const Donate = () => {
  const { lang } = useLanguage();
  const [selectedContributions, setSelectedContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // Automatically fill data if a regular user is already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      }));
    }
  }, []);

  const cards = [
    {
      id: "make-a-gift",
      icon: HeartHandshake,
      title: lang === "hi" ? "दान करें" : "Make a Gift",
      text: lang === "hi" ? "आपका समर्थन भोजन, शिक्षा, स्वास्थ्य और आश्रय प्रदान करता है।" : "Your support fuels food, education, healthcare, and shelter programs."
    },
    {
      id: "volunteer",
      icon: HandHeart,
      title: lang === "hi" ? "स्वयंसेवक बनें" : "Volunteer",
      text: lang === "hi" ? "स्थानीय ड्राइव, स्वास्थ्य कैंप और पर्यावरण अभियानों में हमारे साथ जुड़ें।" : "Join local drives, health camps, and environmental clean-ups with us."
    },
    {
      id: "donate-clothes",
      icon: Shirt,
      title: lang === "hi" ? "कपड़े दान करें" : "Donate Clothes",
      text: lang === "hi" ? "जरूरतमंद परिवारों को साफ और उपयोगी कपड़ों का संग्रह और वितरण।" : "Collection and distribution of clean, usable clothes to needy families."
    },
    {
      id: "donate-food",
      icon: Utensils,
      title: lang === "hi" ? "भोजन दान करें" : "Donate Food",
      text: lang === "hi" ? "झुग्गी बस्तियों और मजदूर वर्ग को पौष्टिक भोजन उपलब्ध कराना।" : "Providing nutritious food to slum residents and labor-class families."
    },
    {
      id: "donate-medicine",
      icon: Pill,
      title: lang === "hi" ? "दवा दान करें" : "Donate Medicine",
      text: lang === "hi" ? "जरूरतमंदों को आवश्यक दवाइयों का वितरण।" : "Distribution of essential medicines to those in need."
    },
    {
      id: "donate-toys",
      icon: ToyBrick,
      title: lang === "hi" ? "खिलौने दान करें" : "Donate Toys",
      text: lang === "hi" ? "अनाथालयों और वंचित क्षेत्रों में बच्चों को खिलौने और खेल प्रदान करना।" : "Providing toys and games to children in orphanages and underprivileged areas."
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validation: At least one card must be selected
    if (selectedContributions.length === 0) {
      setConfirmation(lang === "hi" ? "कृपया कम से cual एक विकल्प चुनें।" : "Please select at least one contribution option.");
      return;
    }

    setLoading(true);
    try {
      // FIXED: Using the specific contributions endpoint
      const response = await fetch(`${API_URL}/api/contributions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          types: selectedContributions, // Array of IDs like ["volunteer", "donate-food"]
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setConfirmation(lang === "hi" ? "धन्यवाद! हम जल्द आपसे संपर्क करेंगे।" : "Thank you! Our team will connect with you soon.");
        // Reset form and selections
        setFormData(prev => ({ ...prev, message: "" }));
        setSelectedContributions([]);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setConfirmation(lang === "hi" ? "त्रुटि! कृपया फिर से प्रयास करें।" : "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
      // Clear confirmation message after 5 seconds
      setTimeout(() => setConfirmation(""), 5000);
    }
  };

  return (
    <div className="section-shell space-y-10 pb-16">
      <SectionHeading title={lang === "hi" ? "हर सहयोग मायने रखता है" : "Every Contribution Matters"} />

      {/* Contribution Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const isSelected = selectedContributions.includes(card.id);
          return (
            <motion.button
              type="button"
              key={card.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              onClick={() => handleContributionToggle(card.id)}
              className={`glass-card p-6 border text-left transition-all duration-200 ${
                isSelected ? "border-amber-300/70 shadow-[0_0_25px_rgba(245,165,36,0.2)]" : "border-white/10"
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

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="glass-card p-6 border border-white/10 space-y-6">
        <h2 className="text-lg font-semibold">{lang === "hi" ? "योगदान विवरण" : "Contribution Details"}</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-white/60">{lang === "hi" ? "पूरा नाम" : "Full Name"}</span>
            <input
              type="text"
              value={formData.name}
              onChange={handleInputChange("name")}
              className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white"
              placeholder={lang === "hi" ? "अपना नाम दर्ज करें" : "Enter your name"}
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-white/60">{lang === "hi" ? "ईमेल" : "Email Address"}</span>
            <input
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white"
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-white/60">{lang === "hi" ? "फ़ोन" : "Phone Number"}</span>
            <input
              type="tel"
              value={formData.phone}
              onChange={handleInputChange("phone")}
              className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white"
              placeholder="+91 90000 00000"
              required
            />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-white/60">{lang === "hi" ? "आप कैसे मदद करना चाहेंगे?" : "How would you like to help us?"}</span>
          <textarea
            value={formData.message}
            onChange={handleInputChange("message")}
            className="glass border border-white/10 rounded-2xl px-4 py-3 min-h-[140px] bg-white/5 text-white"
            placeholder={lang === "hi" ? "योगदान के बारे में हमें बताएं..." : "Tell us about the contribution you have in mind..."}
            required
          />
        </label>

        {/* Selected Badges Preview */}
        {selectedContributions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedContributions.map(type => (
              <span key={type} className="badge text-[10px] bg-amber-300/15 text-amber-100 border border-amber-200/20 px-2 py-1 rounded-md">
                {cards.find(card => card.id === type)?.title || type}
              </span>
            ))}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="accent-gradient rounded-2xl px-6 py-4 font-bold text-base text-[#0b1411] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              {lang === "hi" ? "भेज रहे हैं..." : "Sending..."}
            </>
          ) : (
            lang === "hi" ? "अपना योगदान भेजें" : "Submit Contribution"
          )}
        </motion.button>

        {confirmation && (
          <motion.p 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="text-sm text-amber-300 font-medium italic"
          >
            {confirmation}
          </motion.p>
        )}
      </form>
    </div>
  );
};

export default Donate;