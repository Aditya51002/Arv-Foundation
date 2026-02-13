import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react"; // Added Loader2 for better UX
import { useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { API_URL } from "../config"; // Import your API_URL

export default function QuickVolunteer({ open, onClose }) {
  const { lang } = useLanguage();
  const isHindi = lang === "hi";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name || !email) {
      alert(isHindi ? "कृपया नाम और ईमेल भरें।" : "Please fill in name and email.");
      return;
    }

    setLoading(true); // Disable button immediately
    try {
      const res = await fetch(`${API_URL}/api/volunteer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send data");
      }

      alert(
        isHindi
          ? "धन्यवाद — हम जल्द ही संपर्क करेंगे।"
          : "Thanks — we'll be in touch."
      );

      // Reset the form
      setName("");
      setEmail("");
      setMessage("");
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message === "Duplicate submission detected" 
        ? (isHindi ? "आप पहले ही भेज चुके हैं।" : "You have already submitted this.")
        : (isHindi ? "कुछ गलत हो गया।" : "Something went wrong.")
      );
    } finally {
      setLoading(false); // Re-enable button after request finishes
    }
  };

  const modal = (
    <div className="fixed inset-0 z-[9999] grid place-items-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[9999]"
        onClick={!loading ? onClose : null} // Prevent closing while loading
      />

      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        className="relative w-full max-w-lg p-6 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 z-[10000]"
      >
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-white/80 hover:text-white disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <h3 className={`text-2xl font-semibold mb-2 text-white ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi ? "स्वयंसेवा" : "Volunteer"}
        </h3>
        <p className={`text-sm text-white/70 mb-6 ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi
            ? "बताएं आप कैसे मदद करना चाहते हैं — हम जल्द ही संपर्क करेंगे।"
            : "Tell us how you'd like to help — we'll follow up."}
        </p>

        <div className="grid gap-4">
          <input
            value={name}
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-amber-300 transition-colors"
            placeholder={isHindi ? "आपका नाम" : "Your name"}
          />
          <input
            value={email}
            disabled={loading}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-amber-300 transition-colors"
            placeholder={isHindi ? "ईमेल" : "Email"}
          />
          <textarea
            value={message}
            disabled={loading}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-xl bg-white/5 border border-white/10 p-3 text-white h-32 focus:outline-none focus:border-amber-300 transition-colors"
            placeholder={isHindi ? "आप कैसे मदद कर सकते हैं (वैकल्पिक)" : "How you can help (optional)"}
          />

          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              {isHindi ? "रद्द करें" : "Cancel"}
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-2.5 rounded-xl bg-amber-400 text-black font-bold flex items-center gap-2 hover:bg-amber-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-amber-400/10"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading 
                ? (isHindi ? "भेज रहे हैं..." : "Sending...") 
                : (isHindi ? "भेजें" : "Send")}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modal, document.body);
}