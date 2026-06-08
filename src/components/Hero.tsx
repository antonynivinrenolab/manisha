import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

const A = "#D7FF43", O = "#FF7A00";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [mp, setMp] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setMp({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const dots = useMemo(() => Array.from({ length: 16 }, () => ({
    l: Math.random() * 100, t: Math.random() * 100, d: 3 + Math.random() * 3, dl: Math.random() * 2,
  })), []);

  const tech = ["JAVA", "SPRING BOOT", "ANGULAR", "AWS", "POSTGRESQL"];

  return (
    <section
      id="hero"
      ref={ref}
      className="grid-dots"
      style={{
        position: "relative", width: "100%", minHeight: "100dvh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        overflow: "hidden", padding: "100px 24px 120px",
      } as React.CSSProperties}
    >
      {/* BG giant text */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }} aria-hidden="true">
        <div style={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 0.04, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="ff-bebas" style={{ fontSize: "clamp(80px, 18vw, 340px)", color: "#fff", lineHeight: 0.85, letterSpacing: 6 }}
          >MANISHA</motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 0.04, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            className="ff-bebas" style={{ fontSize: "clamp(100px, 24vw, 420px)", color: "#fff", lineHeight: 0.85, letterSpacing: 6 }}
          >E</motion.div>
        </div>
      </div>

      {/* Floating dots */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
        {dots.map((d, i) => (
          <motion.div
            key={i}
            style={{ position: "absolute", left: `${d.l}%`, top: `${d.t}%`, width: 3, height: 3, borderRadius: "50%", background: `${A}40` }}
            animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.4, 1] }}
            transition={{ duration: d.d, repeat: Infinity, delay: d.dl }}
          />
        ))}
      </div>

      {/* Neon arcs */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }} aria-hidden="true">
        <div style={{ position: "absolute", width: "min(400px,75vw)", height: "min(400px,75vw)", borderRadius: "50%", border: `1px solid ${A}25`, animation: "k-spin 22s linear infinite, k-neon 3s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: "min(470px,85vw)", height: "min(470px,85vw)", borderRadius: "50%", border: `1px solid ${O}12`, animation: "k-spin-r 30s linear infinite" }} />
      </div>

      {/* Portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <div style={{ transform: `perspective(800px) rotateY(${mp.x * 4}deg) rotateX(${-mp.y * 4}deg)`, transition: "transform 0.12s ease-out" }}>
          <div style={{ position: "absolute", inset: -28, borderRadius: "50%", background: `linear-gradient(135deg, ${A}22, transparent 50%, ${O}22)`, filter: "blur(28px)", animation: "k-pulse 3s ease-in-out infinite" }} />
          <div style={{
            position: "relative", width: "clamp(180px, 36vw, 280px)", height: "clamp(180px, 36vw, 280px)",
            borderRadius: "50%", overflow: "hidden", border: `2px solid ${A}44`,
            boxShadow: `0 0 60px ${A}15`,
          }}>
            <img src="/images/portrait.png" alt="Manisha E" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.5), transparent 50%)" }} />
          </div>
        </div>
      </motion.div>

      {/* Left — SCROLL */}
      <motion.div
        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1 }}
        className="hidden md:flex flex-col items-center gap-3"
        style={{ position: "absolute", left: 28, top: "50%", transform: "translateY(-50%)", zIndex: 2 }}
      >
        <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, transparent, ${A}66)` }} />
        <span className="ff-bebas" style={{ writingMode: "vertical-lr", fontSize: 12, color: "#666", letterSpacing: 6 }}>SCROLL</span>
        <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${A}66, transparent)` }} />
      </motion.div>

      {/* Right — tech */}
      <motion.div
        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1.1 }}
        className="hidden md:flex flex-col items-end gap-2"
        style={{ position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)", zIndex: 2 }}
      >
        {tech.map((t, i) => (
          <motion.span
            key={t} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 + i * 0.12 }}
            className="ff-bebas" style={{ fontSize: 13, color: "#555", letterSpacing: 4, cursor: "default", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = A)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >{t}</motion.span>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.5 }}
        style={{ position: "absolute", bottom: "clamp(60px, 10vh, 100px)", left: 0, right: 0, textAlign: "center", padding: "0 24px", zIndex: 2 }}
      >
        <p style={{ color: "#777", fontSize: "clamp(10px,1.2vw,13px)", letterSpacing: 4, textTransform: "uppercase", marginBottom: 10 }}>
          Java Full Stack Developer · 3+ Years Experience
        </p>
        <h2 className="ff-bebas" style={{ fontSize: "clamp(32px, 5.5vw, 72px)", color: "#fff", letterSpacing: 4, marginBottom: 24 }}>
          MANISHA <span style={{ color: A }}>E</span>
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: A, color: "#0A0A0A", border: "none", padding: "14px 32px",
              borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: 2,
              textTransform: "uppercase", cursor: "pointer", transition: "opacity 0.3s",
              fontFamily: "Inter, sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >View Projects</button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "none", color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
              padding: "14px 32px", borderRadius: 999, fontSize: 12, letterSpacing: 2,
              textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s",
              fontFamily: "Inter, sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = A; e.currentTarget.style.color = A; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; }}
          >Contact Me</button>
        </div>
      </motion.div>

      {/* Scroll mouse */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", animation: "k-bounce 2s ease-in-out infinite" }}
      >
        <div style={{ width: 20, height: 32, border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, display: "flex", justifyContent: "center", paddingTop: 6 }}>
          <motion.div style={{ width: 3, height: 7, borderRadius: 999, background: A }} animate={{ y: [0, 10, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
}
