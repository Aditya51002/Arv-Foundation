import { useRef, useState, useEffect } from "react";
import SectionHeading from "./SectionHeading.jsx";
import ParallaxSection from "./ParallaxSection.jsx";

// Simple before/after slider without external deps.
// Accepts optional `leftImage` and `rightImage` props (urls). If not provided, shows gradients/placeholders.
const StorySection = ({ leftImage = null, rightImage = null, leftLabel = "Before", rightLabel = "After" }) => {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(50); // percentage
  const dragging = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(5, Math.min(95, pct));
      setPos(pct);
    };

    const onUp = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <section className="section-shell mb-24 pb-96">
      {/* Heading above slider (restored original layout) */}
      <div className="mb-4">
        <SectionHeading title="Stories of Change" />
      </div>

      {/* reduce parallax strength and reserve responsive bottom margin to keep visual space (uses CSS var) */}
      <ParallaxSection speed={0.08} className="relative rounded-md overflow-hidden mt-4 mb-[var(--slider-bottom-gap)] z-0">
        <div ref={containerRef} className="relative h-[340px]" style={{ height: 340 }}>
        {/* Right / background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: rightImage ? `url(${rightImage})` : `linear-gradient(135deg,#0b2b1f,#07231a)` ,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Left overlay clipped by width */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <div
            className="h-full"
            style={{
              backgroundImage: leftImage ? `url(${leftImage})` : `linear-gradient(135deg,#11372b,#0b2b1f)` ,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Divider handle */}
        <div
          role="slider"
          aria-valuemin={5}
          aria-valuemax={95}
          aria-valuenow={Math.round(pos)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(5, p - 3));
            if (e.key === "ArrowRight") setPos((p) => Math.min(95, p + 3));
          }}
          onMouseDown={() => (dragging.current = true)}
          onTouchStart={() => (dragging.current = true)}
          className="absolute top-0 bottom-0 -translate-x-1/2 flex items-center justify-center"
          style={{ left: `${pos}%`, width: 28 }}
        >
          <div className="h-14 w-14 rounded-full bg-white/10 border border-white/20 grid place-items-center shadow-lg">
            <div className="h-1 w-6 bg-white/40 rounded" />
          </div>
        </div>

          {/* Labels inside slider */}
          <div className="absolute left-4 bottom-4 bg-white/5 px-3 py-1 rounded text-sm">{leftLabel}</div>
          <div className="absolute right-4 bottom-4 bg-white/5 px-3 py-1 rounded text-sm">{rightLabel}</div>
        </div>
      </ParallaxSection>

      {/* placeholder text removed */}
    </section>
  );
};

export default StorySection;
