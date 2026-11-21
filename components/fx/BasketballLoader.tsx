"use client";

import { AnimatePresence, animate, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import BasketballSvg from "./BasketballSvg";
import { LOGO_PATHS } from "../Logo";

export const LOADER_MS = 2300;
const EASE = [0.76, 0, 0.24, 1] as const;

/** Intro: bouncing basketball, the TK monogram drawing itself, then a two-colour curtain lifts. */
export default function BasketballLoader() {
  const [done, setDone] = useState(false);
  const pct = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), LOADER_MS);
    const c = animate(0, 100, {
      duration: LOADER_MS / 1000 - 0.15,
      ease: "easeInOut",
      onUpdate: (v) => {
        if (pct.current) pct.current.textContent = String(Math.round(v)).padStart(3, "0");
      },
    });
    return () => {
      clearTimeout(t);
      c.stop();
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="curtain"
          aria-hidden
          className="fixed inset-0 z-[199] bg-ember"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: EASE, delay: 0.14 } }}
        />
      )}
      {!done && (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading"
          onClick={() => setDone(true)}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ivory"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: EASE } }}
        >
          <div className="relative flex h-52 w-40 items-end justify-center">
            <motion.div
              className="absolute bottom-3 h-20 w-20"
              style={{ transformOrigin: "50% 100%" }}
              animate={{
                y: [0, -120, 0],
                scaleY: [0.82, 1.05, 1.05, 0.82],
                scaleX: [1.15, 0.97, 0.97, 1.15],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 0.85,
                repeat: Infinity,
                ease: ["easeOut", "easeIn"],
                times: [0, 0.5, 1],
              }}
            >
              <BasketballSvg className="h-full w-full" />
            </motion.div>
            <motion.div
              className="h-3 w-20 rounded-full bg-ink/40 blur-[3px]"
              animate={{ scaleX: [1.15, 0.55, 1.15], opacity: [0.7, 0.25, 0.7] }}
              transition={{ duration: 0.85, repeat: Infinity, ease: ["easeOut", "easeIn"] }}
            />
          </div>

          <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[#050407]">
            <svg viewBox="420 240 810 750" className="h-10 w-10" fill="none">
              {LOGO_PATHS.map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  stroke="#ff6a2e"
                  strokeWidth={34}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.4, ease: "easeInOut" }}
                />
              ))}
            </svg>
          </div>

          <p className="mt-5 font-mono text-xs uppercase tracking-[0.3em]">
            Loading <span ref={pct}>000</span>%
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink/50">tap to skip</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
