import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
<<<<<<< HEAD

export default function QuickVolunteer({ open, onClose }) {
=======
import { useLanguage } from "../context/LanguageContext.jsx";

export default function QuickVolunteer({ open, onClose }) {
  const { lang } = useLanguage();
  const isHindi = lang === "hi";
>>>>>>> main
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!open) return null;

  const modal = (
    <div className="fixed inset-0 z-[9999] grid place-items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[9999]"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        className="relative w-full max-w-lg p-6 bg-slate-900/90 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 z-[10000]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/80">
          <X />
        </button>

<<<<<<< HEAD
        <h3 className="text-2xl font-semibold mb-2">Volunteer</h3>
        <p className="text-sm text-white/80 mb-4">Tell us how you'd like to help — we'll follow up.</p>
=======
        <h3 className={`text-2xl font-semibold mb-2 ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi ? "स्वयंसेवा" : "Volunteer"}
        </h3>
        <p className={`text-sm text-white/80 mb-4 ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi
            ? "बताएं आप कैसे मदद करना चाहते हैं — हम जल्द ही संपर्क करेंगे।"
            : "Tell us how you'd like to help — we'll follow up."}
        </p>
>>>>>>> main

        <div className="grid gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg bg-white/5 border border-white/10 p-2 text-white"
<<<<<<< HEAD
            placeholder="Your name"
=======
            placeholder={isHindi ? "आपका नाम" : "Your name"}
>>>>>>> main
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-white/5 border border-white/10 p-2 text-white"
<<<<<<< HEAD
            placeholder="Email"
          />
          <textarea className="rounded-lg bg-white/5 border border-white/10 p-2 text-white" placeholder="How you can help (optional)" />

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-white/10">Cancel</button>
            <button
              onClick={() => {
                console.log({ name, email });
                alert("Thanks — we'll be in touch (this is a demo flow).");
=======
            placeholder={isHindi ? "ईमेल" : "Email"}
          />
          <textarea
            className="rounded-lg bg-white/5 border border-white/10 p-2 text-white"
            placeholder={isHindi ? "आप कैसे मदद कर सकते हैं (वैकल्पिक)" : "How you can help (optional)"}
          />

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-white/10">
              {isHindi ? "रद्द करें" : "Cancel"}
            </button>
            <button
              onClick={() => {
                console.log({ name, email });
                alert(
                  isHindi
                    ? "धन्यवाद — हम जल्द ही संपर्क करेंगे (यह एक डेमो प्रवाह है)।"
                    : "Thanks — we'll be in touch (this is a demo flow)."
                );
>>>>>>> main
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-amber-300 text-black font-semibold"
            >
<<<<<<< HEAD
              Send
=======
              {isHindi ? "भेजें" : "Send"}
>>>>>>> main
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modal, document.body);
}
