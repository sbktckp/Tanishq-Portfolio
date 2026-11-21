"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

type Item = { role: string; org: string; period: string; points: string[] };

const BANDS = ["bg-sun", "bg-sky", "bg-teal text-ivory", "bg-stone"];

function Ticket({ e, i, className = "" }: { e: Item; i: number; className?: string }) {
  return (
    <article className={`hard-lg relative flex h-[23rem] shrink-0 overflow-hidden rounded-2xl bg-paper ${className}`}>
      <div className={`${BANDS[i % BANDS.length]} flex w-14 shrink-0 flex-col items-center justify-between border-r-2 border-dashed border-ink py-4`}>
        <span className="font-mono text-xs font-bold">No.{String(i + 1).padStart(3, "0")}</span>
        <span className="font-display text-sm font-extrabold uppercase tracking-widest [writing-mode:vertical-rl]">
          Admit one
        </span>
        <span className="h-3 w-3 rounded-full border-2 border-ink bg-ivory" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-5">
        <p className="font-mono text-xs uppercase tracking-wider text-ink/70">{e.period}</p>
        <h3
          className="mt-2 font-display text-2xl font-extrabold leading-[1.05]"
          style={{ fontVariationSettings: '"wdth" 85' }}
        >
          {e.role}
        </h3>
        <p className="mt-1 text-sm font-semibold text-ember">{e.org}</p>
        <ul className="mt-3 space-y-1.5 text-sm leading-snug text-ink/80">
          {e.points.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ink" />
              {p}
            </li>
          ))}
        </ul>
        <div className="barcode mt-auto h-7 w-full opacity-80" />
      </div>
    </article>
  );
}

/**
 * Desktop: a pinned section where scrolling slides the tickets sideways.
 * Phone: a native swipe carousel with snap points (no scroll-jacking).
 */
export default function ExperienceReel({ items }: { items: Item[] }) {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sec, offset: ["start start", "end end"] });

  const xRaw = useTransform(scrollYProgress, (v) => {
    const t = track.current;
    if (!t) return 0;
    return -v * Math.max(0, t.scrollWidth - window.innerWidth + 40);
  });
  const x = useSpring(xRaw, { stiffness: 140, damping: 30, mass: 0.3 });
  const count = useTransform(scrollYProgress, (v) =>
    String(Math.min(items.length, Math.floor(v * items.length) + 1)).padStart(2, "0"),
  );

  return (
    <div id="experience">
      {/* Desktop pinned reel */}
      <section ref={sec} className="relative hidden md:block" style={{ height: `${items.length * 38 + 100}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
          <div className="mx-auto mb-8 flex w-full max-w-6xl items-end justify-between gap-6 border-b-2 border-ink px-5 pb-4">
            <h2
              className="font-display text-7xl font-extrabold tracking-tight"
              style={{ fontVariationSettings: '"wdth" 78' }}
            >
              Experience
            </h2>
            <span className="pb-2 font-mono text-sm">
              <motion.span>{count}</motion.span> / {String(items.length).padStart(2, "0")} (keep scrolling)
            </span>
          </div>
          <motion.div ref={track} style={{ x }} className="flex w-max gap-6 pl-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))] pr-[10vw]">
            {items.map((e, i) => (
              <Ticket key={e.role + e.org} e={e} i={i} className="w-[27rem]" />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Phone swipe carousel */}
      <section className="py-14 md:hidden">
        <div className="mx-5 mb-6 flex items-end justify-between border-b-2 border-ink pb-3">
          <h2
            className="font-display text-5xl font-extrabold tracking-tight"
            style={{ fontVariationSettings: '"wdth" 78' }}
          >
            Experience
          </h2>
          <span className="pb-1 font-mono text-xs">swipe &rarr;</span>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8 pr-[12vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((e, i) => (
            <Ticket key={e.role + e.org} e={e} i={i} className="w-[82vw] snap-center" />
          ))}
        </div>
      </section>
    </div>
  );
}
