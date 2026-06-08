import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 3,
        background: "#D7FF43", transformOrigin: "left", zIndex: 99998,
        scaleX: scrollYProgress,
      }}
    />
  );
}
