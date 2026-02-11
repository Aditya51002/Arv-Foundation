import { useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { usePlacedImages } from "../utils/usePlacedImages.js";
import { ImagePlus } from "lucide-react";

const partnerData = {
	en: [
		{
			slug: "shuruat-ek-jyoti-shiksha-ki",
			title: "Shuruat ek Jyoti Shiksha ki",
			content: "It is a social service and religiously inspired NGO, focused on serving humanity and Sanatan culture.This organization is actively involved in activities such as helping the poor and needy, distributing food, and raising social awareness.It also works to promote religious values, spiritual knowledge, and Indian traditions.Its objective is to build a better society through service, harmony, and moral values.The foundation's message is — Service is the greatest religion",
			images: ["", "", ""]
		},
		{
			slug: "adharshila-vridhaashram",
			title: "Adharshila Vridhaashram",
			content: "xyz",
			images: ["", "", ""]
		},
		{
			slug: "the-earth-modifications-team",
			title: "The Earth Modifications Team",
			content: "xyz",
			images: ["", "", ""]
		},
		{
			slug: "kedarsut-foundation",
			title: "Kedarsut Foundation",
			content: "xyz",
			images: ["", "", ""]
		},
		{
			slug: "miopass-charitable-and-welfare-foundation",
			title: "Miopass Charitable and Welfare Foundation",
			content: "xyz",
			images: ["", "", ""]
		}
	],
	hi: [
		{
			slug: "shuruat-ek-jyoti-shiksha-ki",
			title: "शुरुआत एक ज्योति शिक्षा की",
			content: "xyz",
			images: ["", "", ""]
		},
		{
			slug: "adharshila-vridhaashram",
			title: "आधारशिला वृद्धाश्रम",
			content: "xyz",
			images: ["", "", ""]
		},
		{
			slug: "the-earth-modifications-team",
			title: "द एर्थ मॉडिफिकेशंस टीम",
			content: "xyz",
			images: ["", "", ""]
		},
		{
			slug: "kedarsut-foundation",
			title: "केदारसूत फाउंडेशन",
			content: "xyz",
			images: ["", "", ""]
		},
		{
			slug: "miopass-charitable-and-welfare-foundation",
			title: "मायोपास चैरिटेबल एंड वेलफेयर फाउंडेशन",
			content: "xyz",
			images: ["", "", ""]
		}
	]
};

const PartnerDetail = () => {
	const { slug } = useParams();
	const { lang } = useLanguage();
	const t = partnerData[lang];
	const partner = t.find(p => p.slug === slug);
	const { images: slotImages } = usePlacedImages("partner", slug);

	if (!partner) {
		return <div>Partner not found</div>;
	}

	return (
		<div className="section-shell space-y-8 pb-12">
			<SectionHeading title={partner.title} />

			<div className="glass-card p-6 rounded-2xl border border-white/10">
				<p className="text-white/80 leading-relaxed">{partner.content}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{[0, 1, 2].map((index) => (
					<div key={index} className="glass-card p-4 rounded-2xl border border-white/10">
						<div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
							{slotImages[index] ? (
								<img src={slotImages[index]} alt={`${partner.title} ${index + 1}`} className="w-full h-full object-cover" />
							) : (
								<ImagePlus size={28} className="text-white/30" />
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PartnerDetail;