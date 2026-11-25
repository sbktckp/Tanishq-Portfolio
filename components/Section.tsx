import type { ReactNode } from "react";
import Reveal from "./motion/Reveal";

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
    <section id={id}>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-32 lg:grid-cols-[17rem_1fr] lg:gap-14">
        <Reveal className="self-start lg:sticky lg:top-28">
          <p aria-hidden className="text-outline text-8xl font-extrabold leading-none tracking-tighter">
            {num}
          </p>
          <h2 className="text-gradient mt-3 pb-1 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            {title}
          </h2>
          <span aria-hidden className="rule mt-5 block h-1 w-16 rounded-full bg-rose" />
        </Reveal>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
