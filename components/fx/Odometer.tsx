"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const COLUMN = Array.from({ length: 20 }, (_, i) => i % 10);

function Digit({ d, delay, go }: { d: number; delay: number; go: boolean }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.6em] overflow-hidden align-top leading-none">
      <motion.span
        className="absolute left-0 top-0 flex flex-col"
        initial={{ y: "0em" }}
        animate={{ y: go ? `${-(10 + d)}em` : "0em" }}
        transition={{ duration: 1.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {COLUMN.map((n, i) => (
          <span key={i} className="block h-[1em] w-[0.6em] text-center leading-none">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/** Slot-machine / scoreboard digits that roll into place when scrolled into view. */
export default function Odometer({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const go = useInView(ref, { once: true, margin: "-60px" });
  const chars = value.toLocaleString("en-US").split("");

  return (
    <span ref={ref} aria-label={value.toLocaleString("en-US") + suffix} className="inline-flex leading-none">
      {chars.map((c, i) =>
        /\d/.test(c) ? (
          <Digit key={i} d={Number(c)} delay={i * 0.12} go={go} />
        ) : (
          <span key={i} aria-hidden className="inline-block w-[0.3em] text-center leading-none">
            {c}
          </span>
        ),
      )}
      {suffix && <span aria-hidden>{suffix}</span>}
    </span>
  );
}
