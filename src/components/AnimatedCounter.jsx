import { useState, useEffect } from "react";

const AnimatedCounter = ({ from = 0, to = 0, duration = 1500, suffix = "" }) => {
  const [value, setValue] = useState(from);

  useEffect(() => {
    let start = null;
    let rafId = null;

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = Math.floor(from + (to - from) * progress);
      setValue(current);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [from, to, duration]);

  return <>{value.toLocaleString()}{suffix}</>;
};

export default AnimatedCounter;
