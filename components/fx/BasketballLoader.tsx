"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const DURATION_MS = 2300;

function Basketball() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="bb-grad" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffb347" />
          <stop offset="55%" stopColor="#f7931e" />
          <stop offset="100%" stopColor="#f05a1a" />
        </radialGradient>
        <clipPath id="bb-clip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bb-grad)" />
      <g clipPath="url(#bb-clip)" fill="none" stroke="#0f2d46" strokeWidth="2.6" strokeLinecap="round">
        <line x1="50" y1="0" x2="50" y2="100" />
        <line x1="0" y1="50" x2="100" y2="50" />
        <path d="M18 8 C 38 30, 38 70, 18 92" />
        <path d="M82 8 C 62 30, 62 70, 82 92" />
      </g>
      <circle cx="50" cy="50" r="48" fill="none" stroke="#0f2d46" strokeWidth="2.6" />
    </svg>
  );
}

/** Full-screen intro: a bouncing, spinning basketball with squash & stretch. */
export default function BasketballLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="relative flex h-56 w-40 items-end justify-center">
            {/* ball */}
            <motion.div
              className="absolute bottom-3 h-20 w-20"
              style={{ transformOrigin: "50% 100%" }}
              animate={{
                y: [0, -130, 0],
                scaleY: [0.82, 1.05, 1.05, 0.82],
                scaleX: [1.15, 0.97, 0.97, 1.15],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: ["easeOut", "easeIn"],
                times: [0, 0.5, 1],
              }}
            >
              <Basketball />
            </motion.div>
            {/* floor shadow */}
            <motion.div
              className="h-3 w-20 rounded-full bg-black/60 blur-[3px]"
              animate={{ scaleX: [1.15, 0.55, 1.15], opacity: [0.7, 0.25, 0.7] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: ["easeOut", "easeIn"] }}
            />
          </div>

          <div className="mt-6 h-px w-48 bg-border" />
          <motion.p
            className="mt-5 text-lg font-semibold tracking-wide"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Tanishq Kansal<span className="text-accent">.</span>
          </motion.p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Loading portfolio
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
