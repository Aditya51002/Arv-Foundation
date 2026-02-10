import { useState, useEffect, useRef } from "react";

const AnimatedCounter = ({ from = 0, to = 0, duration = 1500, suffix = "", startOnView = true }) => {
  const [value, setValue] = useState(from);
  const elRef = useRef(null);
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    let start = null;

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = Math.floor(from + (to - from) * progress);
      setValue(current);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    const startAnimation = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      rafRef.current = requestAnimationFrame(tick);
    };

    if (startOnView && typeof IntersectionObserver !== "undefined") {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            obs.disconnect();
          }
        });
      }, { threshold: 0.2 });
      if (elRef.current) obs.observe(elRef.current);

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        obs.disconnect();
      };
    }

    // fallback: start immediately
    startAnimation();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [from, to, duration, startOnView]);

  return (
    <span ref={elRef}>{value.toLocaleString()}{suffix}</span>
  );
};

export default AnimatedCounter;
