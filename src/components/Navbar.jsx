import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Languages, Menu, X, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";

const navItemVariants = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0 }
};

const Navbar = () => {
  const { t, lang, toggleLanguage } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50"
    >
      <div className="section-shell pt-4">
        <div className="glass rounded-2xl px-4 py-3 md:px-6 md:py-4 border border-white/10">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/15 grid place-items-center text-amber-300">
                <HeartHandshake size={22} />
              </div>
              <div className="leading-tight">
                <p className="text-sm uppercase tracking-[0.2em] text-white/70">ARV</p>
                <p className="text-lg font-semibold">Foundation</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {t.navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: idx * 0.05 + 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`px-3 py-2 text-sm font-medium rounded-full transition hover:text-white ${
                      isActive(link.path)
                        ? "text-white bg-white/10 border border-white/10"
                        : "text-white/70 hover:bg-white/5"
                    }`}
                  >
                    {link.key === "home" && (lang === "hi" ? "होम" : "Home")}
                    {link.key === "about" && (lang === "hi" ? "परिचय" : "About")}
                    {link.key === "work" && (lang === "hi" ? "कार्य" : "Work")}
                    {link.key === "initiatives" && (lang === "hi" ? "पहल" : "Initiatives")}
                    {link.key === "donate" && (lang === "hi" ? "दान" : "Donate")}
                    {link.key === "contact" && (lang === "hi" ? "संपर्क" : "Contact")}
                    {link.key === "partners" && (lang === "hi" ? "साथी" : "Partners")}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleLanguage}
                className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium"
              >
                <Languages size={16} />
                <span className="hidden sm:inline">{t.navToggleLabel}</span>
                <span className="font-semibold">{lang === "en" ? "EN" : "HI"}</span>
                <motion.span
                  layout
                  className={`absolute inset-y-1 ${lang === "en" ? "left-1" : "right-1"} w-1/2 rounded-full bg-white/15`}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
              </motion.button>

              <Link to="/donate" className="relative inline-flex items-center">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="magnetic inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300 px-4 py-2 text-sm font-semibold text-black shadow-lg"
                >
                  {t.hero.donate}
                </motion.span>
              </Link>

              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 border border-white/10"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="mt-3 flex flex-col gap-2 pb-2">
                  {t.navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={`rounded-lg px-3 py-2 text-sm font-medium ${
                        isActive(link.path) ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
                      }`}
                    >
                      {link.key === "home" && (lang === "hi" ? "होम" : "Home")}
                      {link.key === "about" && (lang === "hi" ? "परिचय" : "About")}
                      {link.key === "work" && (lang === "hi" ? "कार्य" : "Work")}
                      {link.key === "initiatives" && (lang === "hi" ? "पहल" : "Initiatives")}
                      {link.key === "donate" && (lang === "hi" ? "दान" : "Donate")}
                      {link.key === "contact" && (lang === "hi" ? "संपर्क" : "Contact")}
                      {link.key === "partners" && (lang === "hi" ? "साथी" : "Partners")}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
