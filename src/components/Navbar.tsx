import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const C = { bg: "#0A0A0A", accent: "#D7FF43", txt: "#fff", sub: "#888" };
const links = [
  { l: "Home", h: "#hero" }, { l: "About", h: "#about" }, { l: "Skills", h: "#skills" },
  { l: "Experience", h: "#experience" }, { l: "Projects", h: "#projects" }, { l: "Contact", h: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (h: string) => { setOpen(false); document.querySelector(h)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className={scrolled ? "glass-nav" : ""}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
          padding: scrolled ? "12px 0" : "18px 0",
          transition: "padding 0.4s, background 0.4s",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <button onClick={() => go("#hero")} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <span className="ff-bebas" style={{ fontSize: 28, color: C.txt, letterSpacing: 2 }}>
              M<span style={{ color: C.accent }}>.</span>E
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.l}
                onClick={() => go(l.h)}
                style={{
                  background: "none", border: "none", color: C.sub, fontSize: 13, letterSpacing: 2,
                  textTransform: "uppercase", cursor: "pointer", transition: "color 0.3s",
                  fontFamily: "Inter, sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.txt)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.sub)}
              >
                {l.l}
              </button>
            ))}
          </div>

          {/* CTA desktop */}
          <button
            onClick={() => go("#contact")}
            className="hidden md:inline-flex"
            style={{
              background: "none", border: `1px solid ${C.accent}`, color: C.accent,
              padding: "10px 24px", borderRadius: 999, fontSize: 12, letterSpacing: 2,
              textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s",
              fontFamily: "Inter, sans-serif", alignItems: "center",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = C.bg; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = C.accent; }}
          >
            Let's Talk
          </button>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden flex-col gap-[5px] p-2"
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Menu"
          >
            <span style={{ display: "block", width: 24, height: 2, background: "#fff", transition: "all 0.3s", transform: open ? "rotate(45deg) translateY(7px)" : "none", transformOrigin: "center" }} />
            <span style={{ display: "block", width: 24, height: 2, background: "#fff", transition: "all 0.3s", opacity: open ? 0 : 1 }} />
            <span style={{ display: "block", width: 24, height: 2, background: "#fff", transition: "all 0.3s", transform: open ? "rotate(-45deg) translateY(-7px)" : "none", transformOrigin: "center" }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 8999, background: "rgba(10,10,10,0.97)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l.l}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => go(l.h)}
                className="ff-bebas"
                style={{
                  background: "none", border: "none", color: "#fff", fontSize: 36,
                  letterSpacing: 3, cursor: "pointer", padding: "10px 0",
                }}
              >
                {l.l}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
