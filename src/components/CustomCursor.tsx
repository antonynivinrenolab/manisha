import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const c = useRef<HTMLDivElement>(null);
  const f = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const cur = c.current, fol = f.current;
    if (!cur || !fol) return;
    let mx = 0, my = 0, cx = 0, cy = 0, fx = 0, fy = 0;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", move, { passive: true });
    let raf: number;
    const tick = () => {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      fx += (mx - fx) * 0.07; fy += (my - fy) * 0.07;
      cur.style.left = cx + "px"; cur.style.top = cy + "px";
      fol.style.left = fx + "px"; fol.style.top = fy + "px";
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={c} className="c-cursor" />
      <div ref={f} className="c-follower" />
    </>
  );
}
