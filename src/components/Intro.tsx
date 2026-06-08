import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Intro() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const words = "Building scalable enterprise applications with modern frontend and backend technologies.".split(" ");

  return (
    <section ref={ref} style={{ padding: "clamp(80px,12vw,160px) 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 12px", marginBottom: 32 }}>
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.76, 0, 0.24, 1] }}
              className="ff-bebas"
              style={{ fontSize: "clamp(28px, 5vw, 64px)", color: "#fff", letterSpacing: 3 }}
            >{w}</motion.span>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ color: "#888", fontSize: "clamp(14px, 1.4vw, 17px)", textAlign: "center", lineHeight: 1.8, maxWidth: 680, margin: "0 auto" }}
        >
          Java Full Stack Developer with 3+ years of experience delivering enterprise-grade solutions
          using Angular, Spring Boot, Spring Batch, PostgreSQL, and AWS Cloud Services.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
          style={{ width: 64, height: 1, background: "#D7FF43", margin: "40px auto 0" }}
        />
      </div>
    </section>
  );
}
