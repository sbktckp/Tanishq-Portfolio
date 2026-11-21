import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
        <h2 className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
