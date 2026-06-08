import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const A = "#D7FF43", O = "#FF7A00";

const certs = [
  { t: "AWS Certified Cloud Practitioner", s: "In Progress", i: "☁️", c: O, badge: true },
  { t: "Web Application Development", s: "Internshala", i: "💻", c: A, badge: false },
  { t: "Frontend Development (HTML)", s: "Great Learning", i: "🌐", c: A, badge: false },
];

export default function Education() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} style={{ padding: "clamp(80px,12vw,160px) 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: "clamp(40px,6vw,80px)" }}>
          <span style={{ color: A, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", display: "block", marginBottom: 12 }}>07 // Education</span>
          <h2 className="ff-bebas" style={{ fontSize: "clamp(44px, 8vw, 120px)", color: "#fff", letterSpacing: 4, lineHeight: 1 }}>EDUCATION</h2>
        </motion.div>

        <div style={{ display: "grid", gap: "clamp(24px,3vw,40px)" }} className="grid-cols-1 md:grid-cols-2">
          {/* Degree */}
          <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}
            className="glass-card" style={{ padding: "clamp(24px,3vw,36px)" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: `${A}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 22 }}>🎓</div>
            <h3 className="ff-bebas" style={{ fontSize: "clamp(22px,3vw,34px)", color: "#fff", letterSpacing: 3, marginBottom: 6 }}>Bachelor of Technology</h3>
            <p style={{ color: A, fontSize: "clamp(14px,1.3vw,17px)", marginBottom: 4 }}>Information Technology</p>
            <p style={{ color: "#999", fontSize: 14, marginBottom: 2 }}>Dr. NGP Institute of Technology</p>
            <p style={{ color: "#555", fontSize: 13, marginBottom: 22 }}>Coimbatore, Tamil Nadu</p>

            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, borderRadius: 12, background: "rgba(10,10,10,0.6)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ textAlign: "center" }}>
                <div className="ff-bebas" style={{ fontSize: 34, color: A }}>8.38</div>
                <div style={{ color: "#666", fontSize: 10, letterSpacing: 2 }}>CGPA / 10</div>
              </div>
              <div style={{ flex: 1, height: 8, background: "#111", borderRadius: 999, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }} animate={inView ? { width: "83.8%" } : {}}
                  transition={{ duration: 1.3, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  style={{ height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${A}, ${O})` }}
                />
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            <h3 className="ff-bebas" style={{ fontSize: 22, color: "#fff", letterSpacing: 2, marginBottom: 20 }}>Certifications</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {certs.map((c, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5 + i * 0.12 }}
                  className="glass-card"
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" }}>
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: `${c.c}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{c.i}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#fff", fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.t}</div>
                    <div style={{ color: "#666", fontSize: 11, marginTop: 2 }}>{c.s}</div>
                  </div>
                  {c.badge && <span style={{ flexShrink: 0, padding: "4px 12px", borderRadius: 999, background: `${O}15`, color: O, fontSize: 10, letterSpacing: 1 }}>{c.s}</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
