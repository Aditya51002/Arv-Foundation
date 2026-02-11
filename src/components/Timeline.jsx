import { motion } from "framer-motion";

const timelineData = [
  { year: "2017", title: "Founded ARV Foundation", desc: "Started with local drives and community outreach in one city." },
  { year: "2018", title: "First Health Drive", desc: "Organized free health checkups reaching remote villages." },
  { year: "2019", title: "Education Initiative", desc: "Launched scholarship and school-supply programs for children." },
  { year: "2021", title: "Scale-up", desc: "Expanded to 3 states and formalized volunteer networks." },
  { year: "2023", title: "Digital Transparency", desc: "Published impact reports and started community dashboards." },
];

const Timeline = ({ className = "section-shell" }) => {
  return (
    // responsive top margin using CSS variable `--timeline-gap`
    <section className={className + " py-12 mt-[var(--timeline-gap)] relative z-20"} aria-label="Our journey timeline">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-white/8" />
          <ol className="space-y-8 pl-12">
            {timelineData.map((item, idx) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-7 top-0 h-4 w-4 rounded-full bg-amber-300 border-2 border-white/12" />
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <time className="text-sm text-white/70 font-medium">{item.year}</time>
                  <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                  <p className="text-sm text-white/75 mt-1">{item.desc}</p>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
