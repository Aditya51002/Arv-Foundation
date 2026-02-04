import { useLanguage } from "../context/LanguageContext.jsx";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="mt-10 py-6 text-center text-sm text-white/60 border-t border-white/10">
      {t.contact.footer}
    </footer>
  );
};

export default Footer;
