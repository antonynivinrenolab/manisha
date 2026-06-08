const A = "#D7FF43";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "40px 24px" }}>
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-5" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <span className="ff-bebas" style={{ fontSize: 24, color: "#fff", letterSpacing: 3 }}>
          M<span style={{ color: A }}>.</span>E
        </span>
        <p style={{ color: "#555", fontSize: 13, textAlign: "center" }}>
          © 2025 Manisha E. All rights reserved. Built with ❤️ and modern web technologies.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #222", background: "none", color: "#888", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = A; e.currentTarget.style.color = A; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#888"; }}
        >↑</button>
      </div>
    </footer>
  );
}
