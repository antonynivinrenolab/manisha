import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const A = "#D7FF43", O = "#FF7A00";
const flow = [
  { l: "Angular Frontend", i: "🖥️" },
  { l: "API Gateway", i: "🔗" },
  { l: "Spring Boot Services", i: "⚙️" },
  { l: "PostgreSQL", i: "🗄️" },
];
const aws = [
  { l: "AWS S3", i: "📦" }, { l: "AWS SES", i: "📧" },
  { l: "AWS SQS", i: "📨" }, { l: "CloudWatch", i: "📊" },
];

export default function Cloud() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} style={{ padding: "clamp(80px,12vw,160px) 24px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: "clamp(40px,6vw,80px)" }}>
          <span style={{ color: A, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", display: "block", marginBottom: 12 }}>05 // Cloud</span>
          <h2 className="ff-bebas" style={{ fontSize: "clamp(44px, 8vw, 120px)", color: "#fff", letterSpacing: 4, lineHeight: 1 }}>AWS <span style={{ color: O }}>CLOUD</span></h2>
          <p style={{ color: "#777", fontSize: "clamp(13px,1.2vw,16px)", marginTop: 14, maxWidth: 480 }}>Cloud architecture powering enterprise applications.</p>
        </motion.div>

        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          {/* Vertical pipeline */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            {flow.map((n, i) => (
              <div key={n.l} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
                  className="glass-card"
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", transition: "transform 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <span style={{ fontSize: 22 }}>{n.i}</span>
                  <span style={{ color: "#fff", fontSize: "clamp(13px,1.2vw,15px)", fontWeight: 500 }}>{n.l}</span>
                </motion.div>
                {i < flow.length - 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 0.4 } : {}} transition={{ delay: 0.5 + i * 0.12 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4px 0" }}>
                    <div style={{ width: 1, height: 18, background: `${A}40` }} />
                    <span style={{ color: A, fontSize: 10 }}>▼</span>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* AWS services grid */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.8 }}
            style={{ marginTop: 48 }}>
            <p style={{ textAlign: "center", color: "#666", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>Connected AWS Services</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {aws.map((s, i) => (
                <motion.div key={s.l}
                  initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.08 }}
                  className="glass-card"
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", transition: "transform 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <span style={{ fontSize: 18 }}>{s.i}</span>
                  <span style={{ color: "#999", fontSize: 13 }}>{s.l}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
