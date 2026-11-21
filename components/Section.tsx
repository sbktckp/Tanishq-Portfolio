import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <Reveal>
        <div className="mb-12 flex items-end justify-between gap-6 border-b-2 border-ink pb-4">
          <h2
            className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl"
            style={{ fontVariationSettings: '"wdth" 78' }}
          >
            {title}
          </h2>
          <span className="pb-2 font-mono text-sm">({num})</span>
        </div>
      </Reveal>
      {children}
    </section>
  );
}
