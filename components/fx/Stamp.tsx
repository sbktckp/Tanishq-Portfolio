"use client";

import { motion } from "motion/react";

const TONES = {
  ember: "text-ember border-ember",
  sky: "text-sky border-sky",
  teal: "text-teal border-teal",
} as const;

/** Rubber stamp that slams onto the page when scrolled into view. */
export default function Stamp({
  title,
  sub,
  rotate,
  tone,
  delay = 0,
}: {
  title: string;
  sub: string;
  rotate: number;
  tone: keyof typeof TONES;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ scale: 1.7, opacity: 0, rotate: rotate - 14 }}
      whileInView={{ scale: 1, opacity: 1, rotate }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 420, damping: 18, delay }}
      className="mx-auto w-full max-w-xs"
    >
      <div
        style={{ filter: "url(#stamp)" }}
        className={`rounded-xl border-[5px] border-double p-5 text-center ${TONES[tone]}`}
      >
        <p
          className="font-display text-4xl font-extrabold uppercase leading-none"
          style={{ fontVariationSettings: '"wdth" 80' }}
        >
          {title}
        </p>
        <div className="my-3 h-0.5 bg-current" />
        <p className="font-mono text-xs font-bold uppercase leading-snug tracking-wider">{sub}</p>
      </div>
    </motion.div>
  );
}
