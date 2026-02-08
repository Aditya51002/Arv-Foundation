import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Mail, Phone, MapPin, Heart, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const { lang, t } = useLanguage();
  const isHindi = lang === "hi";

  const quickLinks = [
    { label: isHindi ? "होम" : "Home", path: "/" },
    { label: isHindi ? "परिचय" : "About", path: "/about" },
    { label: isHindi ? "कार्य" : "Work", path: "/work" },
    { label: isHindi ? "पहल" : "Initiatives", path: "/initiatives" },
    { label: isHindi ? "दान" : "Donate", path: "/donate" },
  ];

  const moreLinks = [
    { label: isHindi ? "संस्थापक" : "Founder", path: "/founder" },
    { label: isHindi ? "साथी" : "Partners", path: "/partners" },
    { label: isHindi ? "सेवाएँ" : "Services", path: "/services" },
    { label: isHindi ? "संपर्क" : "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="mt-16 border-t border-white/10 bg-black/20 backdrop-blur-md">
      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand & About */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white tracking-wide">ARV Foundation</h3>
            <p className="text-sm leading-relaxed text-white/60">
              {isHindi
                ? "शिक्षा, स्वास्थ्य, भोजन, आश्रय और पर्यावरण पहलों के माध्यम से वंचित समुदायों के उत्थान के लिए समर्पित।"
                : "Dedicated to uplifting underprivileged communities through education, healthcare, food, shelter & environmental initiatives."}
            </p>
            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white/50 transition hover:bg-white/15 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              {isHindi ? "त्वरित लिंक" : "Quick Links"}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-white/50 transition hover:text-amber-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              {isHindi ? "अधिक" : "Explore"}
            </h4>
            <ul className="space-y-2">
              {moreLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-white/50 transition hover:text-amber-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              {isHindi ? "संपर्क" : "Contact Us"}
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0 text-amber-300/70" />
                <a href="mailto:arvcreation@gmail.com" className="transition hover:text-white">
                  arvcreation@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-amber-300/70" />
                <a href="tel:+918540078766" className="transition hover:text-white">
                  +91 85400 78766
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-amber-300/70" />
                <span>{isHindi ? "भारत" : "India"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} ARV Foundation. {isHindi ? "सर्वाधिकार सुरक्षित।" : "All Rights Reserved."}
          </p>
          <p className="flex items-center gap-1 text-xs text-white/40">
            {isHindi ? "से बनाया गया" : "Made with"}
            <Heart size={12} className="text-red-400" fill="currentColor" />
            {isHindi ? "भारत में" : "in India"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;