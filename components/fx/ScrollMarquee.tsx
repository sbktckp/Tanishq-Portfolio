"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";
import BasketballSvg from "./BasketballSvg";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Tape of giant words. Speeds up, skews and reverses with your scroll velocity. */
export default function ScrollMarquee({
  items,
  direction = 1,
  outline = false,
}: {
  items: string[];
  direction?: 1 | -1;
  outline?: boolean;
}) {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const skewX = useTransform(smooth, [-1500, 1500], [-7, 7]);
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef<number>(direction);

  useAnimationFrame((_, delta) => {
    const b = boost.get();
    if (b < -0.05) dir.current = -direction;
    else if (b > 0.05) dir.current = direction;
    const move = dir.current * 0.011 * delta;
    base.set(base.get() + move + move * Math.abs(b));
  });

  const row = [...items, ...items];
  return (
    <motion.div style={{ skewX }} className="overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className="flex w-max">
        {row.map((t, i) => (
          <span
            key={i}
            className={`flex items-center font-display text-4xl font-extrabold uppercase sm:text-6xl ${
              outline ? "outline-text" : ""
            }`}
            style={{ fontVariationSettings: '"wdth" 80' }}
          >
            {t}
            <BasketballSvg className="mx-6 h-[0.7em] w-[0.7em] shrink-0 sm:mx-9" />
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
