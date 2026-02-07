import { useEffect, useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import ContactSection from "../components/ContactSection.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { motion } from "framer-motion";
import { GraduationCap, Newspaper, Mail, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";

const servicesContent = {
  en: {
    eyebrow: "Services",
    title: "What We Offer",
    cards: [
      {
        id: "internship",
        icon: GraduationCap,
        title: "Internship Program",
        text: "Gain hands-on experience working with grassroots communities. Our internship program is open to students and young professionals who want to make a difference through social-sector work. Interns participate in fieldwork, event management, content creation, and community engagement.",
        cta: "Apply Now",
      },
      {
        id: "newsletter",
        icon: Newspaper,
        title: "News & Letter",
        text: "Stay updated with ARV Foundation's latest activities, impact stories, success highlights, and upcoming events. Our monthly newsletter delivers meaningful stories of change directly to your inbox.",
        cta: "Subscribe",
      },
    ],
    contactHeading: "Contact Us",
    form: {
      title: "Internship Application",
      subtitle: "Share a few details so we can match you with the right internship opportunity.",
      labels: {
        fullName: "Full Name *",
        email: "Email Address *",
        phone: "Phone Number *",
        age: "Age (optional)",
        cityState: "City / State *",
        qualification: "Current Qualification *",
        college: "College / University Name *",
        fieldOfStudy: "Field of Study *",
        interests: "Area of Interest (select one or more)",
        duration: "Preferred Duration *",
        availability: "Availability *",
        motivation: "Why do you want to intern with ARV Foundation? *",
        experience: "Previous experience (optional)",
        resume: "Resume / CV (UI only)"
      },
      placeholders: {
        fullName: "Your full name",
        email: "you@example.com",
        phone: "+91 90000 00000",
        cityState: "City, State",
        qualification: "e.g. B.A., B.Com, 12th",
        college: "Name of institution",
        fieldOfStudy: "e.g. Social Work, Commerce, Engineering",
        motivation: "Tell us what excites you about working with ARV, and how you hope to contribute.",
        experience: "Share any relevant internships, volunteering, or project experience."
      },
      options: {
        duration: {
          placeholder: "Select duration",
          oneMonth: "1 Month",
          threeMonths: "3 Months",
          sixMonths: "6 Months"
        },
        availability: {
          placeholder: "Select availability",
          partTime: "Part-time",
          fullTime: "Full-time"
        }
      },
      interestsList: [
        "Field Work",
        "Event Management",
        "Content Creation",
        "Community Engagement",
        "Research & Documentation"
      ],
      error: "Please complete all required fields and select at least one area of interest.",
      cancel: "Cancel",
      submit: "Submit Application"
    }
  },
  hi: {

    title: "हम क्या प्रदान करते हैं",
    cards: [
      {
        id: "internship",
        icon: GraduationCap,
        title: "इंटर्नशिप कार्यक्रम",
        text: "जमीनी स्तर के समुदायों के साथ काम करने का व्यावहारिक अनुभव प्राप्त करें। हमारा इंटर्नशिप कार्यक्रम उन छात्रों और युवा पेशेवरों के लिए खुला है जो सामाजिक क्षेत्र के माध्यम से बदलाव लाना चाहते हैं।",
        cta: "आवेदन करें",
      },
      {
        id: "newsletter",
        icon: Newspaper,
        title: "समाचार और पत्र",
        text: "ARV Foundation की नवीनतम गतिविधियों, प्रभाव कहानियों, सफलता की झलकियों और आगामी कार्यक्रमों से अपडेट रहें। हमारा मासिक समाचार पत्र सीधे आपके इनबॉक्स में बदलाव की सार्थक कहानियाँ पहुँचाता है।",
        cta: "सदस्यता लें",
      },
    ],
    contactHeading: "हमसे संपर्क करें",
    form: {
      title: "इंटर्नशिप आवेदन",
      subtitle: "कुछ जानकारी साझा करें ताकि हम आपको सही इंटर्नशिप अवसर से जोड़ सकें।",
      labels: {
        fullName: "पूरा नाम *",
        email: "ईमेल पता *",
        phone: "फोन नंबर *",
        age: "उम्र (वैकल्पिक)",
        cityState: "शहर / राज्य *",
        qualification: "वर्तमान योग्यता *",
        college: "कॉलेज / विश्वविद्यालय नाम *",
        fieldOfStudy: "अध्ययन क्षेत्र *",
        interests: "रुचि का क्षेत्र (एक या अधिक चुनें)",
        duration: "पसंदीदा अवधि *",
        availability: "उपलब्धता *",
        motivation: "आप ARV Foundation में इंटर्नशिप क्यों करना चाहते हैं? *",
        experience: "पिछला अनुभव (वैकल्पिक)",
        resume: "रेज़्यूमे / सीवी (केवल UI)"
      },
      placeholders: {
        fullName: "अपना पूरा नाम",
        email: "you@example.com",
        phone: "+91 90000 00000",
        cityState: "शहर, राज्य",
        qualification: "जैसे B.A., B.Com, 12th",
        college: "संस्थान का नाम",
        fieldOfStudy: "जैसे सोशल वर्क, कॉमर्स, इंजीनियरिंग",
        motivation: "ARV के साथ काम करने में आपकी रुचि क्या है और आप कैसे योगदान देना चाहते हैं?",
        experience: "कोई भी संबंधित इंटर्नशिप, स्वयंसेवा या प्रोजेक्ट अनुभव साझा करें।"
      },
      options: {
        duration: {
          placeholder: "अवधि चुनें",
          oneMonth: "1 महीना",
          threeMonths: "3 महीने",
          sixMonths: "6 महीने"
        },
        availability: {
          placeholder: "उपलब्धता चुनें",
          partTime: "आंशिक समय",
          fullTime: "पूर्ण समय"
        }
      },
      interestsList: [
        "फील्ड वर्क",
        "इवेंट प्रबंधन",
        "कंटेंट निर्माण",
        "समुदाय सहभागिता",
        "रिसर्च और डॉक्यूमेंटेशन"
      ],
      error: "कृपया सभी आवश्यक फ़ील्ड भरें और कम से कम एक रुचि क्षेत्र चुनें।",
      cancel: "रद्द करें",
      submit: "आवेदन जमा करें"
    }
  },
};

const Services = () => {
  const { lang } = useLanguage();
  const isHindi = lang === "hi";
  const content = servicesContent[lang];
  const formCopy = content.form;

  const [isInternshipFormOpen, setIsInternshipFormOpen] = useState(false);
  const [internshipFormData, setInternshipFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    cityState: "",
    qualification: "",
    college: "",
    fieldOfStudy: "",
    availability: "",
    duration: "",
    motivation: "",
    experience: "",
    resumeName: ""
  });
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    // TODO: API endpoint for internship applications
    // TODO: Trigger confirmation email to applicant
    // TODO: Notify ARV Foundation internship team
    // TODO: Fetch logged-in user details from backend and pre-fill internship form when authentication is available
  }, []);

  useEffect(() => {
    if (!isInternshipFormOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isInternshipFormOpen]);

  const internshipInterests = formCopy.interestsList;

  const handleInternshipInputChange = (event) => {
    const { name, value } = event.target;
    setInternshipFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
    );
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];
    setInternshipFormData((prev) => ({ ...prev, resumeName: file ? file.name : "" }));
    // TODO: Handle resume upload via backend
  };

  const handleInternshipSubmit = (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "cityState",
      "qualification",
      "college",
      "fieldOfStudy",
      "availability",
      "duration",
      "motivation"
    ];

    const hasMissingField = requiredFields.some(
      (field) => !String(internshipFormData[field] || "").trim()
    );
    const hasNoInterest = selectedInterests.length === 0;

    if (hasMissingField || hasNoInterest) {
      return;
    }

    const payload = {
      ...internshipFormData,
      areasOfInterest: selectedInterests
    };

    console.log("Internship application ready for submission", payload);
    // TODO: Send internship application data to backend API
    // TODO: Notify HR / Internship team via email
  };

  return (
    <div className="section-shell space-y-10 pb-12">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} />

      {/* Service cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {content.cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              id={card.id}
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-card p-6 border border-white/10 rounded-2xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/10 grid place-items-center text-amber-200">
                  <Icon size={20} />
                </div>
                <h3 className={`text-xl font-semibold ${isHindi ? "font-devanagari" : ""}`}>
                  {card.title}
                </h3>
              </div>
              <p className={`text-sm text-white/80 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
                {card.text}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
            if (card.id === "internship") {
              setIsInternshipFormOpen(true);
            }
          }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300 px-4 py-2 text-sm font-semibold text-black"
              >
                {card.cta} <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          );
        })}
      </div>

    {isInternshipFormOpen && (
      <div className="fixed inset-0 z-40 flex items-start justify-center px-4 pb-8 pt-[calc(var(--navbar-height)+1rem)] bg-black/70 backdrop-blur-md">
        <div className="relative flex w-full max-w-2xl max-h-[calc(100vh-var(--navbar-height)-2rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1411]/85 backdrop-blur-2xl p-6 space-y-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className={`text-lg font-semibold ${isHindi ? "font-devanagari" : ""}`}>{formCopy.title}</h2>
              <p className={`mt-1 text-sm text-white/70 ${isHindi ? "font-devanagari" : ""}`}>
                {formCopy.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsInternshipFormOpen(false)}
              className="rounded-full p-1.5 bg-white/5 border border-white/10 text-white/70 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleInternshipSubmit} className="flex-1 min-h-0 space-y-5 overflow-y-auto pr-1 overscroll-contain">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                  {formCopy.labels.fullName}
                </span>
                <input
                  type="text"
                  name="fullName"
                  value={internshipFormData.fullName}
                  onChange={handleInternshipInputChange}
                  className={`glass border rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none ${
                    submitAttempted && !internshipFormData.fullName.trim()
                      ? "border-red-500/70"
                      : "border-white/10"
                  }`}
                  placeholder={formCopy.placeholders.fullName}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                  {formCopy.labels.email}
                </span>
                <input
                  type="email"
                  name="email"
                  value={internshipFormData.email}
                  onChange={handleInternshipInputChange}
                  className={`glass border rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none ${
                    submitAttempted && !internshipFormData.email.trim()
                      ? "border-red-500/70"
                      : "border-white/10"
                  }`}
                  placeholder={formCopy.placeholders.email}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                  {formCopy.labels.phone}
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={internshipFormData.phone}
                  onChange={handleInternshipInputChange}
                  className={`glass border rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none ${
                    submitAttempted && !internshipFormData.phone.trim()
                      ? "border-red-500/70"
                      : "border-white/10"
                  }`}
                  placeholder={formCopy.placeholders.phone}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                  {formCopy.labels.age}
                </span>
                <input
                  type="number"
                  name="age"
                  value={internshipFormData.age}
                  onChange={handleInternshipInputChange}
                  className="glass border border-white/10 rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none"
                  min="14"
                />
              </label>
              <label className="md:col-span-2 flex flex-col gap-2">
                <span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                  {formCopy.labels.cityState}
                </span>
                <input
                  type="text"
                  name="cityState"
                  value={internshipFormData.cityState}
                  onChange={handleInternshipInputChange}
                  className={`glass border rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none ${
                    submitAttempted && !internshipFormData.cityState.trim()
                      ? "border-red-500/70"
                      : "border-white/10"
                  }`}
                  placeholder={formCopy.placeholders.cityState}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                  {formCopy.labels.qualification}
                </span>
                <input
                  type="text"
                  name="qualification"
                  value={internshipFormData.qualification}
                  onChange={handleInternshipInputChange}
                  className={`glass border rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none ${
                    submitAttempted && !internshipFormData.qualification.trim()
                      ? "border-red-500/70"
                      : "border-white/10"
                  }`}
                  placeholder={formCopy.placeholders.qualification}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                  {formCopy.labels.college}
                </span>
                <input
                  type="text"
                  name="college"
                  value={internshipFormData.college}
                  onChange={handleInternshipInputChange}
                  className={`glass border rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none ${
                    submitAttempted && !internshipFormData.college.trim()
                      ? "border-red-500/70"
                      : "border-white/10"
                  }`}
                  placeholder={formCopy.placeholders.college}
                />
              </label>
              <label className="md:col-span-2 flex flex-col gap-2">
                <span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                  {formCopy.labels.fieldOfStudy}
                </span>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={internshipFormData.fieldOfStudy}
                  onChange={handleInternshipInputChange}
                  className={`glass border rounded-xl px-4 py-3 bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none ${
                    submitAttempted && !internshipFormData.fieldOfStudy.trim()
                      ? "border-red-500/70"
                      : "border-white/10"
                  }`}
                  placeholder={formCopy.placeholders.fieldOfStudy}
                />
              </label>
            </div>

            <div className="space-y-3">
              <p
                className={`text-xs uppercase tracking-wide ${
                  submitAttempted && selectedInterests.length === 0
                    ? "text-red-400"
                    : "text-white/60"
                }`}
              >
                {formCopy.labels.interests}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {internshipInterests.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`glass-card border text-left transition-all duration-200 rounded-2xl px-4 py-3 ${
                        isSelected
                          ? "border-amber-300/70 shadow-[0_0_20px_rgba(245,165,36,0.32)]"
                          : "border-white/10"
                      }`}
                    >
                      <span className={`text-sm font-semibold text-white/90 ${isHindi ? "font-devanagari" : ""}`}>
                        {interest}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                  {formCopy.labels.duration}
                </span>
                <select
                  name="duration"
                  value={internshipFormData.duration}
                  onChange={handleInternshipInputChange}
                  className={`glass border rounded-xl px-4 py-3 bg-[#0b1411]/80 text-white focus:border-amber-200 focus:outline-none ${
                    submitAttempted && !internshipFormData.duration
                      ? "border-red-500/70"
                      : "border-white/10"
                  }`}
                >
                  <option value="" className="bg-[#0b1411] text-white">{formCopy.options.duration.placeholder}</option>
                  <option value="1-month" className="bg-[#0b1411] text-white">{formCopy.options.duration.oneMonth}</option>
                  <option value="3-months" className="bg-[#0b1411] text-white">{formCopy.options.duration.threeMonths}</option>
                  <option value="6-months" className="bg-[#0b1411] text-white">{formCopy.options.duration.sixMonths}</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                  {formCopy.labels.availability}
                </span>
                <select
                  name="availability"
                  value={internshipFormData.availability}
                  onChange={handleInternshipInputChange}
                  className={`glass border rounded-xl px-4 py-3 bg-[#0b1411]/80 text-white focus:border-amber-200 focus:outline-none ${
                    submitAttempted && !internshipFormData.availability
                      ? "border-red-500/70"
                      : "border-white/10"
                  }`}
                >
                  <option value="" className="bg-[#0b1411] text-white">{formCopy.options.availability.placeholder}</option>
                  <option value="part-time" className="bg-[#0b1411] text-white">{formCopy.options.availability.partTime}</option>
                  <option value="full-time" className="bg-[#0b1411] text-white">{formCopy.options.availability.fullTime}</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                {formCopy.labels.motivation}
              </span>
              <textarea
                name="motivation"
                value={internshipFormData.motivation}
                onChange={handleInternshipInputChange}
                className={`glass border rounded-2xl px-4 py-3 min-h-[120px] bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none ${
                  submitAttempted && !internshipFormData.motivation.trim()
                    ? "border-red-500/70"
                    : "border-white/10"
                }`}
                placeholder={formCopy.placeholders.motivation}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                {formCopy.labels.experience}
              </span>
              <textarea
                name="experience"
                value={internshipFormData.experience}
                onChange={handleInternshipInputChange}
                className="glass border border-white/10 rounded-2xl px-4 py-3 min-h-[100px] bg-white/5 text-white placeholder:text-white/40 focus:border-amber-200 focus:outline-none"
                placeholder={formCopy.placeholders.experience}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className={`text-xs uppercase tracking-wide text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                {formCopy.labels.resume}
              </span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="block w-full text-xs text-white/70 file:mr-3 file:rounded-full file:border-none file:bg-white/90 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-black file:cursor-pointer cursor-pointer"
                />
                {internshipFormData.resumeName && (
                  <span className="text-xs text-white/70 truncate">
                    {internshipFormData.resumeName}
                  </span>
                )}
              </div>
            </label>

            {submitAttempted && (
              <p className={`text-xs text-red-400 ${isHindi ? "font-devanagari" : ""}`}>
                {formCopy.error}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsInternshipFormOpen(false)}
                className={`px-5 py-2 rounded-full border border-white/20 text-sm text-white/80 hover:bg-white/5 ${isHindi ? "font-devanagari" : ""}`}
              >
                {formCopy.cancel}
              </button>
              <button
                type="submit"
                className={`accent-gradient rounded-full px-6 py-2 text-sm font-semibold text-[#0b1411] ${isHindi ? "font-devanagari" : ""}`}
              >
                {formCopy.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

      {/* Contact section embedded */}
      <div className="space-y-6">
        <SectionHeading
          eyebrow={isHindi ? "संपर्क" : "Contact"}
          title={content.contactHeading}
        />
        <ContactSection />
      </div>
    </div>
  );
};

export default Services;
