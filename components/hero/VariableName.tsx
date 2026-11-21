"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";

type Line = { text: string; className?: string };

/**
 * Giant poster-style name set in a variable font. Each letter morphs between
 * heavy+condensed and light+wide depending on how close the cursor is.
 */
export default function VariableName({ lines, delay = 0 }: { lines: Line[]; delay?: number }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const pointer = { x: -9999, y: -9999 };
    const level = refs.current.map(() => 0);
    let raf = 0;

    const tick = () => {
      raf = 0;
      let active = false;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
        const target = Math.max(0, 1 - d / 280);
        level[i] += (target - level[i]) * 0.18;
        if (Math.abs(target - level[i]) > 0.003) active = true;
        const t = level[i];
        el.style.fontVariationSettings = `"wght" ${Math.round(800 - 520 * t)}, "wdth" ${Math.round(75 + 25 * t)}`;
      });
      if (active) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  let index = 0;
  return (
    <h1 aria-label={lines.map((l) => l.text).join(" ")} className="mt-3 font-display uppercase">
      {lines.map((line, li) => (
        <span
          key={li}
          aria-hidden
          className={`block overflow-hidden pb-[0.06em] text-[clamp(3.6rem,min(27vw,30vh),17rem)] md:text-[clamp(3.6rem,min(19vw,30vh),17rem)] leading-[0.86] tracking-[-0.02em] ${line.className ?? ""}`}
        >
          {[...line.text].map((ch) => {
            const i = index++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "110%", rotate: 8 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 120, delay: delay + i * 0.045 }}
              >
                <span
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="inline-block"
                  style={{ fontVariationSettings: '"wght" 800, "wdth" 75' }}
                >
                  {ch}
                </span>
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
