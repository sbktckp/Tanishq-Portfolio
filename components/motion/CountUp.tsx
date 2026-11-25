"use client";

import { useEffect, useRef } from "react";

const DURATION = 1400;

/** Counts up to a figure such as "50,000+" the first time it is seen. */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = Number(value.replace(/\D/g, ""));
    const suffix = value.endsWith("+") ? "+" : "";
    let frame = 0;
    el.textContent = `0${suffix}`;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let start: number | undefined;
        const tick = (now: number) => {
          start ??= now;
          const p = Math.min((now - start) / DURATION, 1);
          const eased = 1 - (1 - p) ** 3;
          el.textContent =
            p < 1 ? Math.round(target * eased).toLocaleString("en-US") + suffix : value;
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <>
      <span ref={ref} aria-hidden>
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
