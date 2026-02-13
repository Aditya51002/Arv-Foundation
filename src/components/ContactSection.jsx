import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useState } from "react"; // ✅ added

const ContactSection = () => {
  const { t, lang } = useLanguage();
  const form = t.contact.form;

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation (security + UX)
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      alert("Message sent successfully ✅");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      alert(err.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 border border-white/10"
      >
        <h3 className="text-xl font-semibold mb-3">
          {lang === "hi" ? "संपर्क" : "Contact"}
        </h3>

        <p className="text-white/75 mb-4">
          {lang === "hi"
            ? "हमसे जुड़ें, दान करें या स्वयंसेवक बनें।"
            : "Reach out to collaborate, donate, or volunteer with us."}
        </p>

        <div className="space-y-3 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-amber-300" />
            <a href="mailto:arvcreation@gmail.com" className="hover:text-white">
              {t.contact.email}
            </a>
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

      {/* ✅ onSubmit added */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 border border-white/10 grid gap-4"
      >
        <div className="grid gap-3">
          <label className="text-sm text-white/70">{form.name}</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white"
            placeholder={form.name}
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm text-white/70">{form.email}</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white"
            placeholder={form.email}
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm text-white/70">{form.phone}</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white"
            placeholder={form.phone}
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm text-white/70">{form.message}</label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white"
            placeholder={form.message}
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="magnetic inline-flex justify-center rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300 px-4 py-3 font-semibold text-black"
        >
          {loading
            ? "Sending..."
            : lang === "hi"
            ? "संदेश भेजें"
            : "Send Message"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default ContactSection;
