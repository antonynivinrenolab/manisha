import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const A = "#D7FF43";

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); setF({ name: "", email: "", message: "" }); };

  const inp: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none", borderBottom: "2px solid #1a1a1a",
    padding: "14px 0", color: "#fff", fontSize: 15, outline: "none", fontFamily: "Inter, sans-serif",
    transition: "border-color 0.3s",
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "clamp(80px,12vw,160px) 24px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Giant heading */}
        <motion.div initial={{ opacity: 0, y: 48 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "clamp(48px,8vw,80px)" }}>
          <span style={{ color: A, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", display: "block", marginBottom: 12 }}>08 // Contact</span>
          <h2 className="ff-bebas" style={{ fontSize: "clamp(40px, 9vw, 140px)", color: "#fff", letterSpacing: 4, lineHeight: 0.95 }}>LET'S BUILD</h2>
          <h2 className="ff-bebas accent-gradient" style={{ fontSize: "clamp(40px, 9vw, 140px)", letterSpacing: 4, lineHeight: 0.95 }}>SOMETHING GREAT</h2>
        </motion.div>

        <div style={{ display: "grid", gap: "clamp(40px,5vw,64px)" }} className="grid-cols-1 lg:grid-cols-2">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <label style={{ color: "#666", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name</label>
                <input type="text" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your name" required style={inp}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = A)} onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#1a1a1a")} />
              </div>
              <div>
                <label style={{ color: "#666", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label>
                <input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="your@email.com" required style={inp}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = A)} onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#1a1a1a")} />
              </div>
              <div>
                <label style={{ color: "#666", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
                <textarea value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} rows={4} placeholder="Tell me about your project..." required
                  style={{ ...inp, resize: "none" }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = A)} onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#1a1a1a")} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, paddingTop: 8 }}>
                <button type="submit" style={{ background: A, color: "#0A0A0A", border: "none", padding: "14px 32px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "Inter,sans-serif", transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                  {sent ? "✓ Sent!" : "Send Message"}
                </button>
                <a href="#" style={{ display: "inline-flex", alignItems: "center", padding: "14px 32px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", fontFamily: "Inter,sans-serif", transition: "all 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = A; e.currentTarget.style.color = A; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#fff"; }}>
                  Download Resume
                </a>
              </div>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }}
            style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <h3 className="ff-bebas" style={{ fontSize: 22, color: "#fff", letterSpacing: 2, marginBottom: 8 }}>Get in Touch</h3>
              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7 }}>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
            </div>

            {[
              { l: "Email", v: "manisharaj2865@gmail.com", h: "mailto:manisharaj2865@gmail.com", icon: "✉️" },
              { l: "Phone", v: "+91 9790372865", h: "tel:+919790372865", icon: "📞" },
              { l: "Location", v: "Chennai, India", h: "", icon: "📍" },
            ].map((c) => (
              <div key={c.l} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: `${A}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{c.icon}</div>
                <div>
                  <div style={{ color: "#666", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>{c.l}</div>
                  {c.h ? <a href={c.h} style={{ color: "#fff", fontSize: 14, textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = A)} onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}>{c.v}</a>
                    : <span style={{ color: "#fff", fontSize: 14 }}>{c.v}</span>}
                </div>
              </div>
            ))}

            {/* Open to */}
            <div className="glass-card" style={{ padding: 20 }}>
              <h4 style={{ color: A, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Open To</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Remote", "Hybrid", "On-Site", "Relocation"].map((t) => (
                  <span key={t} style={{ padding: "7px 16px", borderRadius: 999, background: `${A}08`, border: `1px solid ${A}20`, color: A, fontSize: 12 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Social */}
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { n: "LinkedIn", u: "#", svg: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11-.002-4.124 2.062 2.062 0 01.002 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { n: "GitHub", u: "#", svg: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
                { n: "Email", u: "mailto:manisharaj2865@gmail.com", svg: <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
              ].map((s) => (
                <a key={s.n} href={s.u} title={s.n} className="glass-card"
                  style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", color: "#888", transition: "all 0.3s", textDecoration: "none" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = A; e.currentTarget.style.borderColor = `${A}30`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
                  {s.svg}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
