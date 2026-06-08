export default function Marquee({ text, color = "#D7FF43", reverse = false }: { text: string; color?: string; reverse?: boolean }) {
  return (
    <div style={{ overflow: "hidden", padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div
        style={{
          display: "flex", whiteSpace: "nowrap", width: "max-content",
          animation: `k-marquee 35s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="ff-bebas" style={{ fontSize: "clamp(36px, 5vw, 64px)", color, opacity: 0.07, marginRight: 32, letterSpacing: 4 }}>
            {text} ·{" "}
          </span>
        ))}
      </div>
    </div>
  );
}
