import { useEffect, useRef } from "react";

const ParallaxSection = ({ children, speed = 0.3, className = "" }) => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // disable parallax on small screens to avoid layout overlap
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    let rafId = null;

    const onScroll = () => {
      const el = containerRef.current;
      const inner = innerRef.current;
      if (!el || !inner) return;
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      // compute a normalized progress value and translate the inner node
      const progress = (rect.top + rect.height) / (winH + rect.height); // ~0..1
      const translate = (0.5 - progress) * speed * winH; // pixels
      inner.style.transform = `translate3d(0, ${translate}px, 0)`;
    };

    const handler = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScroll);
    };

    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    handler();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={className} style={{ overflow: "hidden", position: "relative" }}>
      <div ref={innerRef} style={{ willChange: "transform", transition: "transform 120ms linear" }}>
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
