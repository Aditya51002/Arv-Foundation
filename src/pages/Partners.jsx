import { Link } from "react-router-dom";
import { HeartHandshake, Users, ShieldCheck, ArrowRight, LucideArrowBigUpDash } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const copy = {
	en: {
    
		title: "Partners & Collaborators",
		lede: "We co-create projects with CSR teams, universities, and community groups to reach more families.",
		benefits: [
			{
				icon: HeartHandshake,
				title: "Shuruat ek Jyoti Shiksha ki",
				desc: "Align your CSR goals with on-ground programs across education, health, and relief."
			},
			{
				icon: Users,
				title: "Adharshila Vridhaashram ",
				desc: "Tap into verified beneficiary clusters through our field volunteers and local partners."
			},
			{
				icon: ShieldCheck,
				title: "The Earth Modifications Team",
				desc: "Impact reports, photos, and on-site visits keep your team aligned with outcomes."
			},

            {
                icon: Users,
                title: "Kedarsut Foundation ",
                desc: "Xyz"
            },

            {
                icon: Users,
                title: "Miopass Charitable and Welfare Foundation ",
                desc: "Xyz"
            
            }
		],
		stepsTitle: "How to collaborate",
		steps: [
			"Share your focus area and location preference.",
			"We design a joint plan with budgets and timelines.",
			"Start the project with regular reporting checkpoints."
		],
		cta: "Start a partnership"
	},
	hi: {
		eyebrow: "साझेदारी",
		title: "हमारे साथी",
		lede: "हम सीएसआर टीमों, विश्वविद्यालयों और सामुदायिक समूहों के साथ मिलकर अधिक परिवारों तक पहुँचते हैं।",
		benefits: [
			{
				icon: HeartHandshake,
				title: "सीएसआर व अनुदान",
				desc: "शिक्षा, स्वास्थ्य और राहत कार्यक्रमों में आपकी सीएसआर प्राथमिकताओं के अनुसार परियोजनाएँ बनाते हैं।"
			},
			{
				icon: Users,
				title: "सामुदायिक पहुँच",
				desc: "मैदान स्तर के स्वयंसेवकों और स्थानीय सहयोगियों के साथ सत्यापित लाभार्थी समूहों तक पहुंच।"
			},
			{
				icon: ShieldCheck,
				title: "पारदर्शी प्रभाव",
				desc: "प्रभाव रिपोर्ट, तस्वीरें और साइट विज़िट के साथ आपकी टीम को परिणामों से जोड़े रखते हैं।"
			}
		],
		stepsTitle: "सहयोग कैसे शुरू करें",
		steps: [
			"अपना फोकस क्षेत्र और पसंदीदा स्थान साझा करें।",
			"हम बजट और समयसीमा के साथ संयुक्त योजना तैयार करते हैं।",
			"नियमित रिपोर्टिंग के साथ परियोजना शुरू करें।"
		],
		cta: "साझेदारी शुरू करें"
	}
};

const Partners = () => {
	const { lang } = useLanguage();
	const t = copy[lang];
	const isHindi = lang === "hi";

	return (
		<div className="section-shell space-y-8 pb-12">
			<SectionHeading eyebrow={t.eyebrow} title={t.title} />

			<p className={`text-white/80 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>{t.lede}</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{t.benefits.map((item) => {
					const Icon = item.icon;
					return (
						<div key={item.title} className="glass-card p-5 rounded-2xl border border-white/10 h-full">
							<div className="flex items-center gap-3">
								<div className="h-11 w-11 rounded-xl bg-white/10 border border-white/10 grid place-items-center text-amber-200">
									<Icon size={18} />
								</div>
								<h3 className={`text-lg font-semibold ${isHindi ? "font-devanagari" : ""}`}>{item.title}</h3>
							</div>
							<p className={`mt-2 text-sm text-white/75 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>{item.desc}</p>
						</div>
					);
				})}
			</div>

			<div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
					<div className="space-y-1">
						<span className="badge inline-flex">{t.stepsTitle}</span>
						<h3 className="text-xl font-semibold">{t.title}</h3>
						<p className={`text-sm text-white/75 ${isHindi ? "font-devanagari" : ""}`}>
							arvcreation@gmail.com • +91-73514 88967
						</p>
					</div>
					<Link
						to="/contact"
						className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 font-semibold shadow-lg"
					>
						{t.cta}
						<ArrowRight size={16} />
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
					{t.steps.map((step, idx) => (
						<div key={step} className="rounded-xl border border-white/10 bg-white/5 p-3">
							<div className="flex items-center gap-2 text-sm font-semibold text-amber-200">
								<span className="h-6 w-6 rounded-full bg-white/10 grid place-items-center text-xs border border-white/15">{idx + 1}</span>
								<span>{isHindi ? "चरण" : "Step"} {idx + 1}</span>
							</div>
							<p className={`mt-2 text-sm text-white/80 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>{step}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Partners;