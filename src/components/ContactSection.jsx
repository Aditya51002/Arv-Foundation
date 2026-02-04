import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

const ContactSection = () => {
  const { t, lang } = useLanguage();
  const form = t.contact.form;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 border border-white/10"
      >
        <h3 className="text-xl font-semibold mb-3">{lang === "hi" ? "संपर्क" : "Contact"}</h3>
        <p className="text-white/75 mb-4">
          {lang === "hi"
            ? "हमसे जुड़ें, दान करें या स्वयंसेवक बनें।"
            : "Reach out to collaborate, donate, or volunteer with us."}
        </p>
        <div className="space-y-3 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-amber-300" />
            <a href="mailto:arvcreation@gmail.com" className="hover:text-white">{t.contact.email}</a>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-amber-300" />
            <span>+91-XXXXXXXXXX</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-amber-300" />
            <span>{lang === "hi" ? "प्रयागराज, भारत" : "Prayagraj, India"}</span>
          </div>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 border border-white/10 grid gap-4"
      >
        <div className="grid gap-3">
          <label className="text-sm text-white/70">{form.name}</label>
          <input
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300"
            placeholder={form.name}
          />
        </div>
        <div className="grid gap-3">
          <label className="text-sm text-white/70">{form.email}</label>
          <input
            type="email"
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300"
            placeholder={form.email}
          />
        </div>
        <div className="grid gap-3">
          <label className="text-sm text-white/70">{form.phone}</label>
          <input
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300"
            placeholder={form.phone}
          />
        </div>
        <div className="grid gap-3">
          <label className="text-sm text-white/70">{form.message}</label>
          <textarea
            rows={4}
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300"
            placeholder={form.message}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="magnetic inline-flex justify-center rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300 px-4 py-3 font-semibold text-black"
        >
          {lang === "hi" ? "संदेश भेजें" : "Send Message"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default ContactSection;
