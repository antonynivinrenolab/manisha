import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const A = "#D7FF43", O = "#FF7A00";

const cats = [
  { t: "Frontend", c: A, i: "🖥️", s: ["Angular 14+", "TypeScript", "HTML5", "CSS3", "SCSS", "Angular Material", "RxJS"] },
  { t: "Backend", c: O, i: "⚙️", s: ["Java", "Spring Boot", "Spring Batch", "Spring Data JPA", "Hibernate", "REST APIs"] },
  { t: "Database", c: A, i: "🗄️", s: ["PostgreSQL", "MySQL", "SQL", "JDBC"] },
  { t: "Cloud", c: O, i: "☁️", s: ["AWS S3", "AWS SES", "AWS SQS", "AWS API Gateway", "AWS CloudWatch"] },
  { t: "DevOps", c: A, i: "🔄", s: ["Jenkins", "Git", "GitHub", "Bitbucket", "CI/CD"] },
  { t: "Tools", c: O, i: "🛠️", s: ["Swagger", "Postman", "Agile", "Scrum"] },
];

function Card({ cat, idx }: { cat: typeof cats[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [st, setSt] = useState("");
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    setSt(`perspective(700px) rotateX(${(y - 0.5) * -8}deg) rotateY(${(x - 0.5) * 8}deg) scale(1.02)`);
  };
  const onLeave = () => setSt("perspective(700px) rotateX(0) rotateY(0) scale(1)");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="glass-card"
      style={{ padding: "clamp(20px,3vw,32px)", transform: st, transition: "transform 0.12s ease-out" }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 10, background: `${cat.c}14`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 18 }}>{cat.i}</div>
      <h3 className="ff-bebas" style={{ fontSize: "clamp(20px,2.5vw,28px)", color: cat.c, letterSpacing: 3, marginBottom: 14 }}>{cat.t}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {cat.s.map((sk) => (
          <span key={sk} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)", color: "#999", fontSize: 13, background: "rgba(255,255,255,0.02)", transition: "color 0.2s, border-color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = `${cat.c}40`; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#999"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
          >{sk}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="skills" ref={ref} style={{ padding: "clamp(80px,12vw,160px) 24px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: "clamp(40px,6vw,80px)" }}>
          <span style={{ color: A, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", display: "block", marginBottom: 12 }}>02 // Skills</span>
          <h2 className="ff-bebas" style={{ fontSize: "clamp(44px, 8vw, 120px)", color: "#fff", letterSpacing: 4, lineHeight: 1 }}>TECH <span style={{ color: A }}>STACK</span></h2>
          <p style={{ color: "#777", fontSize: "clamp(13px,1.2vw,16px)", marginTop: 14, maxWidth: 480 }}>Technologies and tools I use to bring enterprise solutions to life.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 20 }}>
          {cats.map((c, i) => <Card key={c.t} cat={c} idx={i} />)}
        </div>
      </div>
    </section>
  );
}
