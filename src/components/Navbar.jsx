import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Languages, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

const navItemVariants = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0 }
};

const Navbar = () => {
  const { t, lang, toggleLanguage } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    function handleDocClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") setActiveDropdown(null);
    }

    document.addEventListener("click", handleDocClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleDocClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

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
                <div className="h-12 w-12 rounded-full overflow-hidden border border-white/15 bg-transparent flex items-center justify-center p-0">
                  <img src="/ngo-logo.jpeg" alt="ARV Foundation logo" className="h-full w-full object-cover object-center transform scale-110" />
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

                <span className="ml-4 inline-block">
                  <span className="relative inline-block">
                    <motion.span
                      layout
                      className="absolute inset-0 rounded-full bg-white/15 pointer-events-none z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    />

                    <span className="relative z-10 inline-flex items-center gap-2 px-3 py-1">
                      <span className="hidden sm:inline">{t.navToggleLabel}</span>
                      <span className="font-semibold">{lang === "en" ? "EN" : "HI"}</span>
                    </span>
                  </span>
                </span>
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

// Helper to build dropdown items for each page
function getDropdownItems(key, t, lang) {
  const slug = (s) =>
    s
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  if (key === "about") {
    return [
      { label: lang === "hi" ? "हम कौन हैं" : "Who We Are", path: "/about#who" },
      { label: lang === "hi" ? "मिशन" : "Mission", path: "/about#mission" },
      { label: lang === "hi" ? "दृष्टि" : "Vision", path: "/about#vision" }
    ];
  }

  if (key === "work") {
    return t.work.map((item) => ({ label: item.title, path: `/work#${slug(item.title)}` }));
  }

  if (key === "initiatives") {
    return t.initiatives.map((item) => ({ label: item.title, path: `/initiatives#${slug(item.title)}` }));
  }

  if (key === "donate") {
    return [
      { label: lang === "hi" ? "दान करें" : "Make a Gift", path: "/donate#make-a-gift" },
      { label: lang === "hi" ? "स्वयंसेवक बनें" : "Volunteer", path: "/donate#volunteer" }
    ];
  }

  return [];
}

// close dropdown when clicking outside or pressing Escape
// (handled in component via useEffect)
