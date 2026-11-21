"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Vertical timeline whose line draws itself as you scroll. */
export default function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className="relative pl-8">
      <div className="absolute left-0 top-0 h-full w-px bg-border" />
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent to-accent-2"
      />
      <ol className="space-y-8">{children}</ol>
    </div>
  );
}
