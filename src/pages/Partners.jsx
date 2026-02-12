import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartHandshake, Users, ShieldCheck, Check } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { API_URL } from "../config";
const copy = {
	en: {
    
		title: "Partners & Collaborators",
		lede: "We co-create projects with CSR teams, universities, and community groups to reach more families.",
		benefits: [
			{
				icon: HeartHandshake,
				title: "Shuruat ek Jyoti Shiksha ki",
				slug: "shuruat-ek-jyoti-shiksha-ki",
				desc: "Align your CSR goals with on-ground programs across education, health, and relief."
			},
			{
				icon: Users,
				title: "Adharshila Vridhaashram ",
				slug: "adharshila-vridhaashram",
				desc: "Tap into verified beneficiary clusters through our field volunteers and local partners."
			},
			{
				icon: ShieldCheck,
				title: "The Earth Modifications Team",
				slug: "the-earth-modifications-team",
				desc: "Impact reports, photos, and on-site visits keep your team aligned with outcomes."
			},

            {
                icon: Users,
                title: "Kedarsut Foundation ",
                slug: "kedarsut-foundation",
                desc: "Xyz"
            },

            {
                icon: Users,
                title: "Miopass Charitable and Welfare Foundation ",
                slug: "miopass-charitable-and-welfare-foundation",
                desc: "Xyz"
            
            }
		],
		stepsTitle: "How to collaborate",
		stepLabel: "Step",
		steps: [
			"Share your focus area and location preference.",
			"We design a joint plan with budgets and timelines.",
			"Start the project with regular reporting checkpoints."
		],
		cta: "Start a partnership",
		formTitle: "Partnership Proposal Form",
		formIntro:
			"Tell us how you would like to collaborate so we can co-design the next impact sprint with you.",
		categoriesLabel: "Select partnership categories",
		selectedSingular: "focus selected",
		selectedPlural: "focus areas selected",
		selectedTag: "Selected focus area",
		unselectedTag: "Tap to add as a focus area",
		labels: {
			organizationName: "Organization / Individual Name",
			contactName: "Contact Person Name",
			email: "Email Address",
			phone: "Phone Number",
			location: "Location (City / State)",
			offerDetails: "Please describe what you are offering and how you would like to collaborate.",
			duration: "Estimated duration of partnership (optional)",
			capacity: "Expected scale or capacity (optional)"
		},
		placeholders: {
			organizationName: "Your organization or group",
			contactName: "Primary contact",
			email: "partnerships@example.org",
			phone: "+91 90000 00000",
			location: "City, State",
			offerDetails:
				"Share the program, focus geography, expected beneficiaries, and any timelines.",
			duration: "e.g. 3 months",
			capacity: "e.g. 500 families per month"
		},
		submit: "Submit Partnership Proposal"
	},
	hi: {
		
		title: "हमारे साथी",
		lede: "हम सीएसआर टीमों, विश्वविद्यालयों और सामुदायिक समूहों के साथ मिलकर अधिक परिवारों तक पहुँचते हैं।",
		benefits: [
			{
				icon: HeartHandshake,
				title: "शुरुआत एक ज्योति शिक्षा की",
				slug: "shuruat-ek-jyoti-shiksha-ki",
				desc: "शिक्षा, स्वास्थ्य और राहत कार्यक्रमों में आपकी सीएसआर प्राथमिकताओं के अनुसार परियोजनाएँ बनाते हैं।"
			},
			{
				icon: Users,
				title: "आधारशिला वृद्धाश्रम",
				slug: "adharshila-vridhaashram",
				desc: "मैदान स्तर के स्वयंसेवकों और स्थानीय सहयोगियों के साथ सत्यापित लाभार्थी समूहों तक पहुंच।"
			},
			{
				icon: ShieldCheck,
				title: "द एर्थ मॉडिफिकेशंस टीम",
				slug: "the-earth-modifications-team",
				desc: "प्रभाव रिपोर्ट, तस्वीरें और साइट विज़िट के साथ आपकी टीम को परिणामों से जोड़े रखते हैं।"
			},
			{
				icon: Users,
				title: "केदारसूत फाउंडेशन",
				slug: "kedarsut-foundation",
				desc: "Xyz"
			},
			{
				icon: Users,
				title: "मायोपास चैरिटेबल एंड वेलफेयर फाउंडेशन",
				slug: "miopass-charitable-and-welfare-foundation",
				desc: "Xyz"
			}
		],
		stepsTitle: "सहयोग कैसे शुरू करें",
		stepLabel: "चरण",
		steps: [
			"अपना फोकस क्षेत्र और पसंदीदा स्थान साझा करें।",
			"हम बजट और समयसीमा के साथ संयुक्त योजना तैयार करते हैं।",
			"नियमित रिपोर्टिंग के साथ परियोजना शुरू करें।"
		],
		cta: "साझेदारी शुरू करें",
		formTitle: "साझेदारी प्रस्ताव फ़ॉर्म",
		formIntro:
			"बताएं आप कैसे सहयोग करना चाहते हैं ताकि हम आपके साथ अगली इम्पैक्ट योजना तैयार कर सकें।",
		categoriesLabel: "साझेदारी श्रेणियाँ चुनें",
		selectedSingular: "फोकस क्षेत्र चुना गया",
		selectedPlural: "फोकस क्षेत्र चुने गए",
		selectedTag: "चुना गया फोकस क्षेत्र",
		unselectedTag: "फोकस क्षेत्र जोड़ने के लिए तपाएं",
		labels: {
			organizationName: "संगठन / व्यक्ति का नाम",
			contactName: "संपर्क व्यक्ति का नाम",
			email: "ईमेल पता",
			phone: "फोन नंबर",
			location: "स्थान (शहर / राज्य)",
			offerDetails: "कृपया बताएं आप क्या ऑफर कर रहे हैं और कैसे सहयोग करना चाहते हैं।",
			duration: "साझेदारी की अनुमानित अवधि (वैकल्पिक)",
			capacity: "अपेक्षित प्रमाण या क्षमता (वैकल्पिक)"
		},
		placeholders: {
			organizationName: "आपका संगठन या समूह",
			contactName: "प्राथमिक संपर्क",
			email: "partnerships@example.org",
			phone: "+91 90000 00000",
			location: "शहर, राज्य",
			offerDetails:
				"प्रोग्राम, फोकस इलाका, अपेक्षित लाभार्थी और समयसीमा साझा करें।",
			duration: "जैसे 3 महीने",
			capacity: "जैसे 500 परिवार प्रति माह"
		},
		submit: "साझेदारी प्रस्ताव जमा करें"
	}
};

const partnershipCategories = [
	{ key: "food", en: "Food Distribution Partner", hi: "खाद्य वितरण साझेदार" },
	{ key: "clothes", en: "Clothes Donation Partner", hi: "कपड़े दान साझेदार" },
	{ key: "grocery", en: "Essential Grocery Support", hi: "आवश्यक किराना सहयोग" },
	{ key: "medical", en: "Medical & Medicine Support", hi: "चिकित्सा एवं दवा सहयोग" },
	{ key: "education", en: "Education & Skill Development", hi: "शिक्षा एवं कौशल विकास" },
	{ key: "hygiene", en: "Hygiene & Sanitation Support", hi: "स्वच्छता एवं सैनिटेशन सहयोग" },
	{ key: "logistics", en: "Logistics & Transportation Partner", hi: "लॉजिस्टिक्स एवं परिवहन साझेदार" },
	{ key: "csr", en: "Financial / CSR Partner", hi: "वित्तीय / CSR साझेदार" }
];

const Partners = () => {
	const { lang } = useLanguage();
	const t = copy[lang];
	const isHindi = lang === "hi";
	const categoryMap = new Map(partnershipCategories.map((item) => [item.key, item]));
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [formData, setFormData] = useState({
		organizationName: "",
		contactName: "",
		email: "",
		phone: "",
		location: "",
		offerDetails: "",
		duration: "",
		capacity: ""
	});
	const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		const ready =
			formData.organizationName.trim() &&
			formData.contactName.trim() &&
			formData.email.trim() &&
			formData.phone.trim() &&
			formData.location.trim() &&
			formData.offerDetails.trim() &&
			selectedCategories.length > 0;
		setIsReadyToSubmit(Boolean(ready));
	}, [formData, selectedCategories]);



	const handleCategoryToggle = (category) => {
		setSelectedCategories((prev) =>
			prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
		);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event) => {
  event.preventDefault();
  if (!isReadyToSubmit || submitting) return; // prevent multiple clicks
  setSubmitting(true); // lock the form

  const payload = {
    ...formData,
    partnershipTypes: selectedCategories.map((key) => {
      const item = categoryMap.get(key);
      return item ? item.en : key;
    })
  };

  try {
    const response = await fetch(`${API_URL}/api/partnerships`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("✅ Partnership proposal submitted successfully!");
      // Reset form
      setFormData({
        organizationName: "",
        contactName: "",
        email: "",
        phone: "",
        location: "",
        offerDetails: "",
        duration: "",
        capacity: ""
      });
      setSelectedCategories([]);
    } else {
      const error = await response.json();
      alert("❌ Submission failed: " + error.message);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Something went wrong. Please try again.");
  } finally {
    setSubmitting(false); // unlock the form
  }
};


	return (
		<div className="section-shell space-y-8 pb-12">
			<SectionHeading eyebrow={t.eyebrow} title={t.title} />

			<p className={`text-white/80 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>{t.lede}</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{t.benefits.map((item) => {
					const Icon = item.icon;
					return (
						<Link key={item.title} to={`/partners/${item.slug}`} className="block">
							<motion.div 
								whileHover={{ y: -4, scale: 1.01 }}
								whileInView={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: 20 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.4 }}
								className="glass-card p-5 rounded-2xl border border-white/10 h-full hover:border-amber-300/50 transition-colors"
							>
								<div className="flex items-center gap-3">
									<div className="h-11 w-11 rounded-xl bg-white/10 border border-white/10 grid place-items-center text-amber-200">
										<Icon size={18} />
									</div>
									<h3 className={`text-lg font-semibold ${isHindi ? "font-devanagari" : ""}`}>{item.title}</h3>
								</div>
								<p className={`mt-2 text-sm text-white/75 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>{item.desc}</p>
							</motion.div>
						</Link>
					);
				})}
			</div>

			<div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
					<div className="space-y-1">
						<span className="badge inline-flex">{t.stepsTitle}</span>
						<h3 className={`text-xl font-semibold ${isHindi ? "font-devanagari" : ""}`}>{t.title}</h3>
						<p className={`text-sm text-white/75 ${isHindi ? "font-devanagari" : ""}`}>
							arvcreation@gmail.com • +91-73514 88967
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
					{t.steps.map((step, idx) => (
						<div key={step} className="rounded-xl border border-white/10 bg-white/5 p-3">
							<div className="flex items-center gap-2 text-sm font-semibold text-amber-200">
							<span className="h-6 w-6 rounded-full bg-white/10 grid place-items-center text-xs border border-white/15">{idx + 1}</span>
								<span>{t.stepLabel} {idx + 1}</span>
							</div>
							<p className={`mt-2 text-sm text-white/80 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>{step}</p>
						</div>
					))}
				</div>

				<form onSubmit={handleSubmit} className="mt-6 space-y-6">
					<div>
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
							<h4 className={`text-lg font-semibold ${isHindi ? "font-devanagari" : ""}`}>{t.formTitle}</h4>
							<span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
								{selectedCategories.length}{" "}
								{selectedCategories.length === 1 ? t.selectedSingular : t.selectedPlural}
							</span>
						</div>
						<p className={`mt-1 text-sm text-white/70 ${isHindi ? "font-devanagari" : ""}`}>
							{t.formIntro}
						</p>
					</div>

					<div className="space-y-3">
						<p className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
							{t.categoriesLabel}
						</p>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
							{partnershipCategories.map((category) => {
								const label = isHindi ? category.hi : category.en;
								const isSelected = selectedCategories.includes(category.key);
								return (
									<button
										key={category.key}
										type="button"
										onClick={() => handleCategoryToggle(category.key)}
										className={`glass-card border text-left transition-all duration-200 rounded-2xl px-4 py-3 ${
											isSelected
												? "border-amber-300/70 shadow-[0_0_25px_rgba(245,165,36,0.35)]"
												: "border-white/10"
										}`}
										aria-pressed={isSelected}
									>
										<div className="flex items-center justify-between gap-3">
											<span className={`text-sm font-semibold text-white/90 ${isHindi ? "font-devanagari" : ""}`}>{label}</span>
											{isSelected && <Check size={16} className="text-amber-300" />}
										</div>
										<span className={`mt-1 block text-xs text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
											{isSelected ? t.selectedTag : t.unselectedTag}
										</span>
									</button>
								);
							})}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<label className="flex flex-col gap-2">
							<span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
								{t.labels.organizationName}
							</span>
							<input
								type="text"
								name="organizationName"
								value={formData.organizationName}
								onChange={handleInputChange}
								className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none"
								placeholder={t.placeholders.organizationName}
								required
							/>
						</label>
						<label className="flex flex-col gap-2">
							<span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
								{t.labels.contactName}
							</span>
							<input
								type="text"
								name="contactName"
								value={formData.contactName}
								onChange={handleInputChange}
								className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none"
								placeholder={t.placeholders.contactName}
								required
							/>
						</label>
						<label className="flex flex-col gap-2">
							<span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
								{t.labels.email}
							</span>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none"
								placeholder={t.placeholders.email}
								required
							/>
						</label>
						<label className="flex flex-col gap-2">
							<span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
								{t.labels.phone}
							</span>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleInputChange}
								className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none"
								placeholder={t.placeholders.phone}
								required
							/>
						</label>
						<label className="md:col-span-2 flex flex-col gap-2">
							<span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
								{t.labels.location}
							</span>
							<input
								type="text"
								name="location"
								value={formData.location}
								onChange={handleInputChange}
								className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none"
								placeholder={t.placeholders.location}
								required
							/>
						</label>
					</div>

					<label className="flex flex-col gap-2">
						<span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
							{t.labels.offerDetails}
						</span>
						<textarea
							name="offerDetails"
							value={formData.offerDetails}
							onChange={handleInputChange}
							className="glass border border-white/10 rounded-2xl px-4 py-3 min-h-[140px] bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none"
							placeholder={t.placeholders.offerDetails}
							required
						></textarea>
					</label>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<label className="flex flex-col gap-2">
							<span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
								{t.labels.duration}
							</span>
							<input
								type="text"
								name="duration"
								value={formData.duration}
								onChange={handleInputChange}
								className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none"
								placeholder={t.placeholders.duration}
							/>
						</label>
						<label className="flex flex-col gap-2">
							<span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
								{t.labels.capacity}
							</span>
							<input
								type="text"
								name="capacity"
								value={formData.capacity}
								onChange={handleInputChange}
								className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none"
								placeholder={t.placeholders.capacity}
							/>
						</label>
					</div>

					<button
  type="submit"
  className={`w-full rounded-2xl px-6 py-3 font-semibold text-base transition focus:outline-none ${
    isReadyToSubmit && !submitting
      ? "accent-gradient text-[#0b1411]"
      : "bg-white/10 text-white/40 cursor-not-allowed"
  }`}
  disabled={!isReadyToSubmit || submitting}
>
  {submitting ? "Submitting..." : t.submit}
</button>

				</form>
			</div>
		</div>
	);
};

export default Partners;
