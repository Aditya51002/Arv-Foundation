import SectionHeading from "../components/SectionHeading.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { lang } = useLanguage();
  const isHindi = lang === "hi";
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to backend auth API
    console.log("Login submitted:", form);
  };

  return (
    <div className="section-shell flex items-center justify-center min-h-[70vh] pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card p-8 border border-white/10 rounded-2xl space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="h-14 w-14 mx-auto rounded-2xl bg-white/10 border border-white/10 grid place-items-center text-amber-200">
            <User size={28} />
          </div>
          <h2 className={`text-2xl font-semibold ${isHindi ? "font-devanagari" : ""}`}>
            {isHindi ? "लॉगिन करें" : "Login"}
          </h2>
          <p className={`text-sm text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
            {isHindi
              ? "अपने खाते में प्रवेश करें"
              : "Sign in to your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-white/70 flex items-center gap-2">
              <Mail size={14} />
              {isHindi ? "ईमेल" : "Email"}
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition"
              placeholder={isHindi ? "आपका ईमेल" : "you@example.com"}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/70 flex items-center gap-2">
              <Lock size={14} />
              {isHindi ? "पासवर्ड" : "Password"}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300 py-2.5 text-sm font-semibold text-black shadow-lg"
          >
            {isHindi ? "लॉगिन" : "Sign In"}
          </motion.button>
        </form>

        <p className={`text-center text-xs text-white/50 ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi
            ? "खाता नहीं है? जल्द ही पंजीकरण उपलब्ध होगा।"
            : "Don't have an account? Registration coming soon."}
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
