import Image from "next/image";
import BallSlot from "./BallSlot";
import { profile } from "@/lib/data";

function Label({ children, className }: { children: string; className: string }) {
  return (
    <span
      className={`absolute z-20 rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] shadow-lg shadow-ink/10 ${className}`}
    >
      {children}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-16 overflow-x-clip px-5 pb-24 pt-14 sm:pt-20 md:grid-cols-[1.15fr_1fr] md:items-center">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{profile.location}</p>
        <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-xl text-xl leading-snug sm:text-2xl">{profile.headline}</p>
        <p className="mt-4 max-w-lg leading-relaxed text-muted">{profile.intro}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
          <a
            href="#experience"
            className="rounded-md border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-ink"
          >
            View experience
          </a>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-sm">
        <figure className="relative rotate-3 border border-line bg-paper p-3 shadow-xl shadow-ink/10">
          <Image
            src="/tanishq.jpg"
            alt="Tanishq Kansal"
            width={960}
            height={1280}
            preload
            className="aspect-[4/5] w-full object-cover object-top"
          />
          <figcaption className="pb-2 pt-4 text-center text-sm font-medium text-muted">
            {profile.name}
          </figcaption>
        </figure>

        <Label className="-left-5 top-8 -rotate-[9deg] bg-accent text-paper">NEET</Label>
        <Label className="-right-3 top-28 rotate-[7deg] bg-accent text-paper">IIT-JEE</Label>
        <Label className="-right-4 bottom-2 -rotate-[4deg] border border-line bg-paper">Delhi</Label>

        <BallSlot className="pointer-events-none absolute -bottom-12 -left-24 z-30 h-60 w-60 sm:-left-28 sm:h-72 sm:w-72" />
      </div>
    </section>
  );
}
