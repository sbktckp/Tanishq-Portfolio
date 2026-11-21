"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import BasketballSvg from "./BasketballSvg";

/** Desktop: a basketball rolls along a bottom track. Phone: a slim top progress line. */
export default function ScrollBall() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const left = useTransform(p, (v) => `${v * 100}%`);
  const rotate = useTransform(p, (v) => v * 2400);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: p, transformOrigin: "left" }}
        className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-ember md:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-3 left-5 right-5 z-[60] hidden h-6 md:block"
      >
        <div className="absolute inset-x-0 bottom-1 h-[2px] bg-ink/15" />
        <motion.div style={{ scaleX: p, transformOrigin: "left" }} className="absolute inset-x-0 bottom-1 h-[2px] bg-ink" />
        <motion.div style={{ left, rotate }} className="absolute bottom-0 -ml-2.5 h-5 w-5">
          <BasketballSvg className="h-full w-full" />
        </motion.div>
      </div>
    </>
  );
}
