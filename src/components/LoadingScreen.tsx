import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => {
        const n = p + Math.random() * 20 + 8;
        if (n >= 100) {
          clearInterval(id);
          setTimeout(() => { setShow(false); setTimeout(onDone, 700); }, 300);
          return 100;
        }
        return n;
      });
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "fixed", inset: 0, zIndex: 100000, background: "#0A0A0A",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}
        >
          <h1 className="ff-bebas" style={{ fontSize: "clamp(48px,10vw,100px)", color: "#fff", letterSpacing: 4, marginBottom: 4 }}>
            MANISHA <span style={{ color: "#D7FF43" }}>E</span>
          </h1>
          <p style={{ color: "#777", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 48 }}>
            Java Full Stack Developer
          </p>
          <div style={{ width: "min(280px, 70vw)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "#555", fontSize: 11, letterSpacing: 3, textTransform: "uppercase" }}>Loading</span>
              <span style={{ color: "#D7FF43", fontSize: 11, fontFamily: "monospace" }}>{Math.min(Math.round(pct), 100)}%</span>
            </div>
            <div style={{ height: 2, background: "#1a1a1a", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: "#D7FF43", transition: "width 0.15s" }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
