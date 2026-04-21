import React, { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { API_URL } from "../config";

const Newsletter = () => {
  const { lang } = useLanguage();
  const isHindi = lang === "hi";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to subscribe");
      }

      setStatus("success");
      setMessage(isHindi ? "सफलतापूर्वक न्यूज़लेटर की सदस्यता ली गई!" : data.message);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <div className="section-shell pt-[calc(var(--navbar-height)+3rem)] pb-12 flex flex-col items-center min-h-[70vh] justify-center text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl glass-card p-8 md:p-12 border border-slate-300 rounded-3xl"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 mb-6 mx-auto">
          <Mail size={28} />
        </div>
        
        <SectionHeading 
          title={isHindi ? "समाचार और पत्र" : "Subscribe to Our Newsletter"} 
          className="mx-auto" 
        />
        
        <p className="text-slate-600 mt-4 mb-8 text-base md:text-lg">
          {isHindi
            ? "ARV Foundation की नवीनतम गतिविधियों, प्रभाव कहानियों, सफलता की झलकियों और आगामी कार्यक्रमों से अपडेट रहें। आपकी इनबॉक्स में सीधे बदलाव की कहानियाँ।"
            : "Stay updated with ARV Foundation's latest activities, impact stories, success highlights, and upcoming events delivered straight to your inbox."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              placeholder={isHindi ? "अपना ईमेल दर्ज करें..." : "Enter your email address..."}
              className="w-full pl-11 pr-4 py-3.5 bg-white/80 border border-slate-300 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
              required
              disabled={status === "loading" || status === "success"}
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="magnetic shrink-0 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold px-6 py-3.5 rounded-xl hover:to-emerald-400 transition shadow-lg shadow-amber-500/20 focus-outline disabled:opacity-70 flex items-center justify-center h-[54px] min-w-[140px]"
          >
            {status === "loading" ? (
              <Loader2 className="animate-spin" size={20} />
            ) : status === "success" ? (
              "Subscribed ✓"
            ) : isHindi ? (
              "सदस्यता लें"
            ) : (
              "Subscribe Now"
            )}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {status !== "idle" && status !== "loading" && (
            <motion.div
              initial={{ height: 0, opacity: 0, mt: 0 }}
              animate={{ height: "auto", opacity: 1, mt: 16 }}
              exit={{ height: 0, opacity: 0, mt: 0 }}
              className="overflow-hidden"
            >
              <div 
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${
                  status === "success" 
                    ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20" 
                    : "bg-red-500/10 text-red-600 border-red-500/20"
                }`}
              >
                {status === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-xs text-slate-400 mt-6 md:mt-8">
          {isHindi 
            ? "हम कभी स्पैम नहीं करेंगे। आप कभी भी सदस्यता समाप्त कर सकते हैं।" 
            : "We care about your data. You can unsubscribe at any time."}
        </p>
      </motion.div>
    </div>
  );
};

export default Newsletter;
