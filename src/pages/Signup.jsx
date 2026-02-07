import SectionHeading from "../components/SectionHeading.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const { lang } = useLanguage();
    const isHindi = lang === "hi";
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ username: "", email: "", phone: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Signup success:", data);
                navigate('/login');
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Error connecting to server");
        }
    };

    return (
        <div className="section-shell flex items-center justify-center min-h-[70vh] pb-12 pt-12">
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
                        {isHindi ? "साइन अप करें" : "Sign Up"}
                    </h2>
                    <p className={`text-sm text-white/60 ${isHindi ? "font-devanagari" : ""}`}>
                        {isHindi
                            ? "नया खाता बनाएँ"
                            : "Create a new account"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-white/70 flex items-center gap-2">
                            <User size={14} />
                            {isHindi ? "उपयोगकर्ता नाम" : "Username"}
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition"
                            placeholder={isHindi ? "आपका नाम" : "Your Name"}
                        />
                    </div>

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
                            <Phone size={14} />
                            {isHindi ? "फ़ोन नंबर" : "Phone Number"}
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            minLength={10}
                            maxLength={10}
                            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition"
                            placeholder="+91 xxxxxxxxxx"
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
                        {isHindi ? "साइन अप" : "Sign Up"}
                    </motion.button>
                </form>

                <p className={`text-center text-xs text-white/50 ${isHindi ? "font-devanagari" : ""}`}>
                    {isHindi
                        ? "क्या आपके पास पहले से एक खाता मौजूद है? "
                        : "Already have an account? "}
                    <Link to="/login" className="text-amber-200 hover:underline">
                        {isHindi ? "लॉग इन करें" : "Login"}
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
