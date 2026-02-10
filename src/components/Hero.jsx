
import { motion } from "framer-motion";
import { ArrowRight, HandHeart, Leaf, Stethoscope, GraduationCap, HeartPulse, Shirt } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuickVolunteer from "./QuickVolunteer.jsx";
import AnimatedCounter from "./AnimatedCounter.jsx";

const focusIcons = [HandHeart, HeartPulse, GraduationCap, Stethoscope, Leaf, Shirt];

const Hero = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const sectionRef = useRef(null);
  const blobLeftRef = useRef(null);
  const blobRightRef = useRef(null);
  const videoRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // respect user preference for reduced motion
    if (typeof window !== "undefined") {
      try {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(Boolean(mq && mq.matches));
        const handler = (ev) => setReducedMotion(Boolean(ev.matches));
        if (mq && mq.addEventListener) mq.addEventListener("change", handler);
        else if (mq && mq.addListener) mq.addListener(handler);
      } catch (e) {
        // ignore
      }
    }

    if (reducedMotion) return; // skip parallax if user prefers reduced motion

    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX) ?? 0;
      const clientY = e.clientY ?? (e.touches && e.touches[0] && e.touches[0].clientY) ?? 0;
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      const lx = (x - 0.5) * 12; // strength
      const ly = (y - 0.5) * 8;
      if (blobLeftRef.current) blobLeftRef.current.style.transform = `translate3d(${lx}px, ${ly}px, 0) scale(1.02)`;
      if (blobRightRef.current) blobRightRef.current.style.transform = `translate3d(${lx * -1}px, ${ly * -1}px, 0) scale(1.02)`;
      // gentle parallax on video
      if (videoRef.current) videoRef.current.style.transform = `scale(1.03) translate3d(${lx * -0.4}px, ${ly * -0.4}px,0)`;
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("touchmove", onMove);
    };
  }, [reducedMotion]);

  return (
    <>
    <section ref={sectionRef} className="relative overflow-hidden py-12 md:py-16">
      {/* Background media layer (video optional). Non-essential: site works if files missing. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* Always render poster image as explicit fallback to ensure visibility */}
        <img src="/hero-poster.svg" alt="" className="w-full h-full object-cover block" />

        {!videoFailed && (
          <video
            ref={videoRef}
            src="/hero.mp4"
            poster="/hero-poster.svg"
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            onError={() => setVideoFailed(true)}
            className="w-full h-full object-cover opacity-40 absolute inset-0"
          />
        )}

        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div ref={blobLeftRef} className="blur-blob left-[-10%] top-[-10%] h-64 w-64 bg-emerald-400/20" />
      <div ref={blobRightRef} className="blur-blob right-[-10%] top-10 h-64 w-64 bg-amber-300/20" />

      <div className="section-shell relative z-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          {/* <div className="badge w-fit">{lang === "hi" ? "गैर-सरकारी संगठन" : "Non-Governmental Organization"}</div> */}
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`text-4xl md:text-5xl font-bold leading-tight animated-headline ${lang === "hi" ? "font-devanagari" : ""}`}
          >
            <span className="headline-gradient">{t.hero.tagline}</span>
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
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/donate")}
              className="magnetic inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300 px-5 py-3 text-black font-semibold shadow-xl"
            >
              {t.hero.donate}
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setVolunteerOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 font-semibold"
            >
              {t.hero.volunteer}
            </motion.button>
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
                  <p className="text-3xl font-bold text-amber-300"><AnimatedCounter to={50000} suffix="+" duration={1400} /></p>
                  <p className="text-white/70">Meals & Clothes</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <p className="text-3xl font-bold text-emerald-200"><AnimatedCounter to={120} suffix="+" duration={1400} /></p>
                  <p className="text-white/70">Health & Education Drives</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <p className="text-3xl font-bold text-amber-200"><AnimatedCounter to={15} duration={1200} /></p>
                  <p className="text-white/70">Core Programs</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <p className="text-3xl font-bold text-emerald-200"><AnimatedCounter to={100} suffix="+" duration={1400} /></p>
                  <p className="text-white/70">Volunteers</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    
    <QuickVolunteer open={volunteerOpen} onClose={() => setVolunteerOpen(false)} />
    </>
  );
};

export default Hero;
