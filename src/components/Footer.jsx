import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

const quickLinks = (lang) => [
  { to: "/", label: lang === "hi" ? "होम" : "Home" },
  { to: "/about", label: lang === "hi" ? "परिचय" : "About" },
  { to: "/initiatives", label: lang === "hi" ? "पहल" : "Initiatives" },
  { to: "/donate", label: lang === "hi" ? "दान" : "Donate" },
  { to: "/contact", label: lang === "hi" ? "संपर्क" : "Contact" },
  { to: "/partners", label: lang === "hi" ? "साथी" : "Partners" },
];

const Footer = () => {
  const { t, lang } = useLanguage();
  const links = quickLinks(lang);
  const leftLinks = links.slice(0, 3);
  const rightLinks = links.slice(3);

  return (
    <footer className="mt-10 pt-8 pb-6 text-sm text-white/70">
      <div className="section-shell">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-start">
          <div className="md:pr-10">
            <div className="text-lg font-semibold mb-1 text-white/90">ARV Foundation</div>
            <p className="mt-2 text-white/60 text-sm max-w-[48ch]">{t.about.who}</p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="font-semibold mb-3 text-white/90 text-center md:text-center">{lang === "hi" ? "जल्दी लिंक" : "Quick Links"}</div>
            <div className="grid grid-cols-2 gap-x-8 w-full max-w-[260px] mx-auto">
              <ul className="space-y-2 text-center">
                {leftLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-white/70 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="space-y-2 text-center">
                {rightLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-white/70 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:pl-10 md:text-right">
            <div className="font-semibold mb-2 text-white/90">{lang === "hi" ? "संपर्क" : "Contact"}</div>
            <div className="text-white/70">{t.contact.email}</div>
            <div className="mt-3 text-xs text-white/50">{t.contact.footer}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
