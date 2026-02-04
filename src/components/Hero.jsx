import { motion } from "framer-motion";
import { ArrowRight, HandHeart, Leaf, Stethoscope, GraduationCap, HeartPulse, Shirt } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

const focusIcons = [HandHeart, HeartPulse, GraduationCap, Stethoscope, Leaf, Shirt];

const Hero = () => {
  const { t, lang } = useLanguage();

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="blur-blob left-[-10%] top-[-10%] h-64 w-64 bg-emerald-400/20" />
      <div className="blur-blob right-[-10%] top-10 h-64 w-64 bg-amber-300/20" />
      <div className="section-shell relative z-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <div className="badge w-fit">{lang === "hi" ? "गैर-सरकारी संगठन" : "Non-Governmental Organization"}</div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`text-4xl md:text-5xl font-bold leading-tight ${lang === "hi" ? "font-devanagari" : ""}`}
          >
            {t.hero.tagline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className={`text-lg text-white/80 max-w-2xl ${lang === "hi" ? "font-devanagari" : ""}`}
          >
            {t.hero.intro}
          </motion.p>
          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              href="/donate"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="magnetic inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300 px-5 py-3 text-black font-semibold shadow-xl"
            >
              {t.hero.donate}
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 font-semibold"
            >
              {t.hero.volunteer}
            </motion.a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {t.hero.focusAreas.map((area, idx) => {
              const Icon = focusIcons[idx % focusIcons.length];
              return (
                <motion.div
                  key={area.title}
                  whileHover={{ y: -4 }}
                  className="glass-card p-3 flex items-center gap-3"
                >
                  <div className="h-10 w-10 rounded-lg bg-white/10 border border-white/10 grid place-items-center text-amber-200">
                    <Icon size={18} />
                  </div>
                  <p className={`text-sm font-semibold ${lang === "hi" ? "font-devanagari" : ""}`}>{area.title}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-amber-400/30 blur-2xl" />
          <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-emerald-400/25 blur-2xl" />
          <div className="glass-card relative overflow-hidden p-6 border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/0" />
            <div className="relative space-y-4">
              <p className="pill w-fit">Since 2017</p>
              <h3 className="text-2xl font-semibold">ARV Impact Snapshot</h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-white/80">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <p className="text-3xl font-bold text-amber-300">50K+</p>
                  <p className="text-white/70">Meals & Clothes</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <p className="text-3xl font-bold text-emerald-200">120+</p>
                  <p className="text-white/70">Health & Education Drives</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <p className="text-3xl font-bold text-amber-200">15</p>
                  <p className="text-white/70">Core Programs</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <p className="text-3xl font-bold text-emerald-200">100+</p>
                  <p className="text-white/70">Volunteers</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
