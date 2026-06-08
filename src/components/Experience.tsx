import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const A = "#D7FF43", O = "#FF7A00";
const resp = [
  "Developed enterprise applications using Angular and Spring Boot.",
  "Built responsive Angular Material interfaces.",
  "Designed RESTful APIs with JWT authentication.",
  "Integrated AWS services including S3, SES, SQS, API Gateway.",
  "Optimized PostgreSQL performance.",
  "Implemented CI/CD pipelines using Jenkins.",
  "Created file processing modules for CSV, TSV, and Excel uploads.",
  "Developed Spring Batch jobs for asynchronous processing.",
];
const tags = ["Angular", "Spring Boot", "Spring Batch", "PostgreSQL", "AWS", "Jenkins", "REST API", "JWT"];

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="experience" ref={ref} style={{ padding: "clamp(80px,12vw,160px) 24px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: "clamp(40px,6vw,80px)" }}>
          <span style={{ color: A, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", display: "block", marginBottom: 12 }}>03 // Experience</span>
          <h2 className="ff-bebas" style={{ fontSize: "clamp(44px, 8vw, 120px)", color: "#fff", letterSpacing: 4, lineHeight: 1 }}>WORK <span style={{ color: O }}>HISTORY</span></h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "clamp(32px,5vw,56px)" }}>
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: "absolute", left: 9, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${A}, ${O}, ${A}30)`, transformOrigin: "top" }}
          />
          {/* Dot */}
          <motion.div
            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.3 }}
            style={{ position: "absolute", left: 1, top: 0, width: 18, height: 18, borderRadius: "50%", background: A, border: "4px solid #0A0A0A", zIndex: 2 }}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card"
            style={{ padding: "clamp(24px,3vw,40px)" }}
          >
            <span style={{ display: "inline-block", padding: "6px 18px", borderRadius: 999, background: `${A}14`, color: A, fontSize: 13, letterSpacing: 2, marginBottom: 16 }}>
              Oct 2024 – Present
            </span>

            <h3 className="ff-bebas" style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "#fff", letterSpacing: 3, marginBottom: 6 }}>
              Engineer – Full Stack Developer
            </h3>
            <p style={{ color: O, fontWeight: 600, fontSize: "clamp(13px,1.2vw,16px)", marginBottom: 4 }}>
              Renault Nissan Technology &amp; Business Centre India
            </p>
            <p style={{ color: "#666", fontSize: 13, marginBottom: 28, display: "flex", alignItems: "center", gap: 6 }}>📍 Chennai, India</p>

            <h4 style={{ color: A, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 18 }}>Key Responsibilities</h4>

            <div style={{ display: "grid", gap: 14 }} className="grid-cols-1 md:grid-cols-2">
              {resp.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                >
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: `${A}10`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: A }} />
                  </span>
                  <span style={{ color: "#999", fontSize: 13, lineHeight: 1.7 }}>{r}</span>
                </motion.div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              {tags.map((t) => (
                <span key={t} style={{ padding: "4px 14px", borderRadius: 999, border: `1px solid ${A}30`, color: `${A}cc`, fontSize: 11, letterSpacing: 1 }}>{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
