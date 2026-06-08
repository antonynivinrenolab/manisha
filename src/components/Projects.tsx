import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const A = "#D7FF43", O = "#FF7A00";
const projects = [
  { id: 1, title: "Enterprise Workflow Management Platform", tech: ["Angular", "Spring Boot", "PostgreSQL", "AWS"], feat: ["Authentication", "Dashboard", "Reporting", "Workflow Automation"], desc: "A comprehensive enterprise platform for managing complex business workflows with role-based authentication, real-time dashboards, and automated reporting capabilities.", c: A },
  { id: 2, title: "Batch Data Processing System", tech: ["Spring Batch", "PostgreSQL", "AWS SQS"], feat: ["Asynchronous Processing", "Data Synchronization", "Validation Engine"], desc: "High-performance batch processing system designed to handle millions of records with asynchronous job execution, data validation, and real-time monitoring.", c: O },
  { id: 3, title: "File Upload & Validation Platform", tech: ["Angular", "Spring Boot", "AWS S3"], feat: ["CSV Upload", "Excel Processing", "Validation Workflow"], desc: "Enterprise file management platform supporting multiple file formats with automated validation workflows and cloud storage integration.", c: A },
];

function PCard({ p, idx }: { p: typeof projects[0]; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      onClick={() => setOpen(!open)}
      className="glass-card"
      style={{ cursor: "pointer", overflow: "hidden", transition: "border-color 0.3s" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${p.c}25`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
    >
      <div style={{ height: 3, background: `linear-gradient(90deg, ${p.c}, transparent)` }} />
      <div style={{ padding: "clamp(20px,3vw,32px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span className="ff-bebas" style={{ fontSize: "clamp(48px,5vw,72px)", color: `${p.c}10`, lineHeight: 1 }}>0{p.id}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${p.c}50`, color: p.c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}
          >+</motion.span>
        </div>
        <h3 className="ff-bebas" style={{ fontSize: "clamp(18px,2.2vw,26px)", color: "#fff", letterSpacing: 2, marginBottom: 10 }}>{p.title}</h3>
        <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {p.tech.map((t) => (
            <span key={t} style={{ padding: "4px 12px", borderRadius: 999, border: `1px solid ${p.c}30`, color: p.c, fontSize: 11 }}>{t}</span>
          ))}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
              <div style={{ paddingTop: 18, marginTop: 18, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <h4 style={{ color: A, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Key Features</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {p.feat.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.c, flexShrink: 0 }} />
                      <span style={{ color: "#999", fontSize: 13 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "clamp(80px,12vw,160px) 24px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: "clamp(40px,6vw,80px)" }}>
          <span style={{ color: A, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", display: "block", marginBottom: 12 }}>04 // Projects</span>
          <h2 className="ff-bebas" style={{ fontSize: "clamp(44px, 8vw, 120px)", color: "#fff", letterSpacing: 4, lineHeight: 1 }}>FEATURED <span style={{ color: A }}>WORK</span></h2>
          <p style={{ color: "#777", fontSize: "clamp(13px,1.2vw,16px)", marginTop: 14, maxWidth: 480 }}>Enterprise-grade applications built with modern technologies.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 20 }}>
          {projects.map((p, i) => <PCard key={p.id} p={p} idx={i} />)}
        </div>
      </div>
    </section>
  );
}
