"use client";

import { motion, useMotionValue, useScroll, useSpring } from "motion/react";
import { useEffect } from "react";

/** Scroll progress bar + soft cursor-following glow. */
export default function PageChrome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 110, damping: 20 });
  const sy = useSpring(y, { stiffness: 110, damping: 20 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-accent via-accent-deep to-accent-2"
      />
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(42,172,226,0.13),transparent_65%)] [@media(hover:hover)]:block"
      />
    </>
  );
}
