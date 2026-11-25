import type { ReactNode } from "react";

export default function Section({
  id,
  title,
  className = "",
  children,
}: {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`border-t border-line ${className}`}>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[15rem_1fr] lg:gap-16">
        <h2 className="self-start text-2xl font-semibold tracking-tight">
          <span aria-hidden className="mb-4 block h-0.5 w-8 bg-accent" />
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
