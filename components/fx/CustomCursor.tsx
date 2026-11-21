"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** A trailing ring that grows over links and shows a hint (drag, spin, throw) over interactive things. */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 38, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 520, damping: 38, mass: 0.4 });
  const [label, setLabel] = useState("");
  const [link, setLink] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const hint = t?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "";
      setLabel(hint);
      setLink(!hint && !!t?.closest("a,button"));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  const size = label ? 78 : link ? 48 : 18;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[210] hidden [@media(hover:hover)]:block"
    >
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink font-mono text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center ${
          label ? "bg-sun" : "bg-transparent mix-blend-multiply"
        }`}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
