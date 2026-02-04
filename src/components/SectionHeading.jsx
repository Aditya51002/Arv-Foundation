import { motion } from "framer-motion";

const SectionHeading = ({ title, eyebrow, align = "left" }) => {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} space-y-2`}>
      {eyebrow && <span className="badge">{eyebrow}</span>}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold"
      >
        {title}
      </motion.h2>
    </div>
  );
};

export default SectionHeading;
