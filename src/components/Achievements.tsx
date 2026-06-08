import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const A = "#D7FF43", O = "#FF7A00";
const items = [
  { i: "🚀", t: "Rapid Promotion", d: "Promoted to Engineer role within 12 months of joining.", c: A },
  { i: "⚡", t: "30+ Production Features", d: "Delivered 30+ production-ready features across enterprise applications.", c: O },
  { i: "🛡️", t: "System Reliability", d: "Improved system reliability and significantly reduced production incidents.", c: A },
  { i: "🏭", t: "Enterprise Impact", d: "Contributed to enterprise automotive workflows at Renault Nissan.", c: O },
];

export default function Achievements() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} style={{ padding: "clamp(80px,12vw,160px) 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: "clamp(40px,6vw,80px)" }}>
          <span style={{ color: A, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", display: "block", marginBottom: 12 }}>06 // Achievements</span>
          <h2 className="ff-bebas" style={{ fontSize: "clamp(44px, 8vw, 120px)", color: "#fff", letterSpacing: 4, lineHeight: 1 }}>KEY <span style={{ color: A }}>WINS</span></h2>
        </motion.div>

        <div style={{ display: "grid", gap: 16 }} className="grid-cols-1 md:grid-cols-2">
          {items.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card"
              style={{ padding: "clamp(20px,3vw,28px)", display: "flex", alignItems: "flex-start", gap: "clamp(14px,2vw,20px)" }}
            >
              <div style={{ flexShrink: 0, width: 50, height: 50, borderRadius: 14, background: `${a.c}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{a.i}</div>
              <div>
                <h3 className="ff-bebas" style={{ fontSize: "clamp(17px,1.8vw,22px)", color: a.c, letterSpacing: 2, marginBottom: 4 }}>{a.t}</h3>
                <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7 }}>{a.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
