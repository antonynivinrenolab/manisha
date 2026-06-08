import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";

const A = "#D7FF43";

function Counter({ end, suffix, label }: { end: number | string; suffix?: string; label: string }) {
  const [val, setVal] = useState(0);
  const [r, iv] = useInView({ threshold: 0.5, triggerOnce: true });
  const started = useRef(false);
  const num = typeof end === "number" ? end : 0;
  const isNum = typeof end === "number";

  useEffect(() => {
    if (!iv || !isNum || started.current) return;
    started.current = true;
    let cur = 0;
    const step = num / 50;
    const id = setInterval(() => {
      cur += step;
      if (cur >= num) { setVal(num); clearInterval(id); } else setVal(Math.floor(cur));
    }, 30);
    return () => clearInterval(id);
  }, [iv, num, isNum]);

  return (
    <motion.div
      ref={r}
      initial={{ opacity: 0, y: 24 }}
      animate={iv ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="glass-card"
      style={{ textAlign: "center", padding: "clamp(20px,3vw,28px)" }}
    >
      <div className="ff-bebas" style={{ fontSize: "clamp(36px, 4vw, 52px)", color: A, marginBottom: 4 }}>
        {isNum ? val : end}{suffix || ""}
      </div>
      <div style={{ color: "#777", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>{label}</div>
    </motion.div>
  );
}

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" ref={ref} style={{ padding: "clamp(80px,12vw,160px) 24px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: "clamp(40px,6vw,80px)" }}>
          <span style={{ color: A, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", display: "block", marginBottom: 12 }}>01 // About</span>
          <h2 className="ff-bebas" style={{ fontSize: "clamp(44px, 8vw, 120px)", color: "#fff", letterSpacing: 4, lineHeight: 1 }}>
            ABOUT <span style={{ color: A }}>ME</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gap: "clamp(32px,4vw,64px)" }} className="grid-cols-1 md:grid-cols-2">
          {/* Text */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <p style={{ color: "#999", fontSize: "clamp(14px,1.3vw,18px)", lineHeight: 1.9 }}>
              I am Manisha E, a Java Full Stack Developer with expertise in Angular, Spring Boot, Spring Batch,
              PostgreSQL, and AWS Cloud technologies. I specialize in developing scalable enterprise applications,
              designing efficient REST APIs, optimizing databases, and delivering high-quality software solutions.
              I enjoy solving complex technical challenges and building reliable digital products that create business value.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
              {["Chennai, India", "3+ Years", "RNTBCI", "Open to Relocation"].map((t) => (
                <span key={t} className="glass-card" style={{ padding: "8px 18px", borderRadius: 999, color: "#888", fontSize: 13, letterSpacing: 1 }}>{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Counters */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Counter end={3} suffix="+" label="Years Experience" />
            <Counter end={30} suffix="+" label="Features Delivered" />
            <Counter end={100} suffix="%" label="Agile Delivery" />
            <Counter end="Enterprise" label="App Development" />
          </div>
        </div>
      </div>
    </section>
  );
}
