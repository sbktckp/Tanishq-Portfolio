"use client";

import { motion, type Variants } from "motion/react";

const container = (delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: delay } },
});

const char: Variants = {
  hidden: { y: "115%", rotateX: -80, opacity: 0 },
  show: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: { type: "spring", damping: 15, stiffness: 110 },
  },
};

/** Per-letter 3D rise-in headline. */
export default function SplitText({
  text,
  className = "",
  delay = 0.25,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.h1
      aria-label={text}
      className={className}
      variants={container(delay)}
      initial="hidden"
      animate="show"
      style={{ perspective: 600 }}
    >
      {text.split(" ").map((word, wi) => (
        <span key={wi} aria-hidden className="mr-[0.25em] inline-block overflow-hidden pb-2 align-bottom">
          {[...word].map((c, i) => (
            <motion.span
              key={i}
              variants={char}
              className="inline-block"
              style={{ transformOrigin: "50% 100%" }}
            >
              {c}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
