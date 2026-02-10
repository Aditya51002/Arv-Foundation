import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Languages, Menu, X, ChevronDown, LogIn, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import { isAdminAuthed, logoutAdmin } from "../utils/adminAuth.js";
import { isUserAuthed, logoutUser } from "../utils/userAuth.js";

const navItemVariants = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0 },
};

/* ── top-level links (Contact removed, Partners + Services added) ── */
const getNavLinks = (lang) => [
  { key: "home", path: "/", label: lang === "hi" ? "होम" : "Home" },
  { key: "about", path: "/about", label: lang === "hi" ? "परिचय" : "About" },
  { key: "work", path: "/work", label: lang === "hi" ? "कार्य" : "Work" },
  { key: "initiatives", path: "/initiatives", label: lang === "hi" ? "पहल" : "Initiatives" },
  { key: "partners", path: "/partners", label: lang === "hi" ? "साथी" : "Partners" },
  {
    key: "services",
    label: lang === "hi" ? "सेवाएँ" : "Services",
    dropdown: [
      { label: lang === "hi" ? "इंटर्नशिप" : "Internship", path: "/services#internship" },
      { label: lang === "hi" ? "समाचार और पत्र" : "News & Letter", path: "/services#newsletter" },
      { label: lang === "hi" ? "संपर्क" : "Contact", path: "/services#contact" },
    ],
  },
];

const Navbar = () => {
  const { t, lang, toggleLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navLinks = getNavLinks(lang);

  useEffect(() => {
    const checkAuth = () => {
      // TODO: Replace mock auth with JWT API
      const adminAuthed = isAdminAuthed();
      const userAuthed = isUserAuthed();
      setIsAdmin(adminAuthed);
      setIsLoggedIn(adminAuthed || userAuthed);
    };

    checkAuth();
    // Re-check on location change to catch login/logout updates
  }, [location]);

  const handleLogout = () => {
    // TODO: Replace mock auth with JWT API
    logoutAdmin();
    logoutUser();
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleDocClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setDropdownOpen(null);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setDropdownOpen(null);
    };
    document.addEventListener("click", handleDocClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleDocClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (!navRef.current) return;
      const { height } = navRef.current.getBoundingClientRect();
      document.documentElement.style.setProperty("--navbar-height", `${Math.ceil(height)}px`);
    };
    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);
    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  const isActive = (path) => path && location.pathname === path;

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="section-shell pt-4">
        <div className="glass rounded-2xl px-4 py-3 md:px-6 md:py-4 border border-white/10">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full overflow-hidden border border-white/15 bg-transparent flex items-center justify-center p-0">
                <img
                  src="/ngo-logo.jpeg"
                  alt="ARV Foundation logo"
                  className="h-full w-full object-cover object-center transform scale-110"
                />
              </div>
              <div className="leading-tight">
                <p className="text-sm uppercase tracking-[0.2em] text-white/70">ARV</p>
                <p className="text-lg font-semibold">Foundation</p>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.key}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: idx * 0.04 + 0.1 }}
                  className="relative"
                >
                  {link.dropdown ? (
                    /* Dropdown trigger */
                    <>
                      <button
                        onClick={() =>
                          setDropdownOpen((prev) => (prev === link.key ? null : link.key))
                        }
                        className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-full transition hover:text-white ${dropdownOpen === link.key || location.pathname.startsWith("/services")
                            ? "text-white bg-white/10 border border-white/10"
                            : "text-white/70 hover:bg-white/5"
                          }`}
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${dropdownOpen === link.key ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {dropdownOpen === link.key && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-48 rounded-xl glass border border-white/10 py-1 shadow-xl z-50"
                          >
                            {link.dropdown.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={() => setDropdownOpen(null)}
                                className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    /* Normal link */
                    <Link
                      to={link.path}
                      className={`px-3 py-2 text-sm font-medium rounded-full transition hover:text-white ${isActive(link.path)
                          ? "text-white bg-white/10 border border-white/10"
                          : "text-white/70 hover:bg-white/5"
                        }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* ── Right side: language toggle, login, donate CTA, mobile burger ── */}
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleLanguage}
                className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300 px-4 py-2 text-sm font-semibold text-black shadow-lg"
              >
                <Languages size={16} />
                <span className="ml-2 inline-block">
                  <span className="relative inline-block">
                    <span className="relative inline-flex items-center gap-2 px-2 py-0.5">
                      <span className="hidden sm:inline">{t.navToggleLabel}</span>
                      <span className="font-semibold">{lang === "en" ? "EN" : "HI"}</span>
                    </span>
                  </span>
                </span>
              </motion.button>

              {/* Donate CTA removed per request */}

               {/* Admin dashboard shortcut */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-emerald-200/40 bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300 px-3 py-2 text-sm font-semibold text-black shadow-lg hover:bg-emerald-400/30 transition"
                >
                  <span>{lang === "hi" ? "एडमिन डैशबोर्ड" : "Admin"}</span>
                </Link>
              )}

              {/* Login/Logout */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/15 transition"
                >
                  <LogOut size={15} />
                  <span>{lang === "hi" ? "लॉग आउट" : "Logout"}</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/15 transition"
                >
                  <LogIn size={15} />
                  <span>{lang === "hi" ? "लॉगिन" : "Login"}</span>
                </Link>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 border border-white/10"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* ── Mobile nav ── */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="mt-3 flex flex-col gap-2 pb-2">
                  {navLinks.map((link) =>
                    link.dropdown ? (
                      <div key={link.key}>
                        <button
                          onClick={() =>
                            setDropdownOpen((prev) => (prev === link.key ? null : link.key))
                          }
                          className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/5"
                        >
                          {link.label}
                          <ChevronDown
                            size={14}
                            className={`transition-transform ${dropdownOpen === link.key ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {dropdownOpen === link.key && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-6 space-y-1"
                            >
                              {link.dropdown.map((sub) => (
                                <Link
                                  key={sub.path}
                                  to={sub.path}
                                  onClick={() => {
                                    setOpen(false);
                                    setDropdownOpen(null);
                                  }}
                                  className="block rounded-lg px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={link.key}
                        to={link.path}
                        onClick={() => setOpen(false)}
                        className={`rounded-lg px-3 py-2 text-sm font-medium ${isActive(link.path) ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
                          }`}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                  {/* Mobile admin shortcut */}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-emerald-100 bg-emerald-500/10 hover:bg-emerald-500/20 flex items-center gap-2"
                    >
                      {lang === "hi" ? "एडमिन डैशबोर्ड" : "Admin Dashboard"}
                    </Link>
                  )}

                  {/* Mobile login/logout link */}
                  {isLoggedIn ? (
                    <button
                      onClick={() => {
                        setOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/5 flex items-center gap-2"
                    >
                      <LogOut size={15} />
                      {lang === "hi" ? "लॉग आउट" : "Logout"}
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/5 flex items-center gap-2"
                    >
                      <LogIn size={15} />
                      {lang === "hi" ? "लॉगिन" : "Login"}
                    </Link>
                  )}
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
