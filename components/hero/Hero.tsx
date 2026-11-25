import Image from "next/image";
import BallSlot from "./BallSlot";
import { profile } from "@/lib/data";

function Label({ children, className }: { children: string; className: string }) {
  return (
    <span
      className={`absolute z-20 rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] shadow-lg shadow-black/40 ${className}`}
    >
      {children}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto grid max-w-6xl gap-16 overflow-x-clip px-5 pb-24 pt-14 sm:pt-20 md:grid-cols-[1.15fr_1fr] md:items-center"
    >
      <div>
        <p className="rise text-xs font-medium uppercase tracking-[0.22em] text-rose">
          {profile.location}
        </p>
        <h1 className="rise mt-5 text-5xl font-semibold leading-[1.05] tracking-tight [animation-delay:90ms] sm:text-7xl">
          {profile.name}
        </h1>
        <p className="rise mt-6 max-w-xl text-xl leading-snug [animation-delay:180ms] sm:text-2xl">
          {profile.headline}
        </p>
        <p className="rise mt-4 max-w-lg leading-relaxed text-muted [animation-delay:270ms]">
          {profile.intro}
        </p>
        <div className="rise mt-9 flex flex-wrap gap-3 [animation-delay:360ms]">
          <a
            href="#contact"
            className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-ink transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/40"
          >
            Get in touch
          </a>
          <a
            href="#experience"
            className="rounded-md border border-line bg-night/40 px-6 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:border-rose"
          >
            View experience
          </a>
        </div>
      </div>

      {/* The photo, labels and basketball stay still. */}
      <div className="relative mx-auto w-full max-w-sm">
        <figure className="relative rotate-3 border border-line bg-surface p-3 shadow-2xl shadow-black/50">
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

        <Label className="-left-5 top-8 -rotate-[9deg] bg-accent text-ink">NEET</Label>
        <Label className="-right-3 top-28 rotate-[7deg] bg-accent text-ink">IIT-JEE</Label>
        <Label className="-right-4 bottom-2 -rotate-[4deg] bg-ink text-night">Delhi</Label>

        <BallSlot className="pointer-events-none absolute -bottom-12 -left-24 z-30 h-60 w-60 sm:-left-28 sm:h-72 sm:w-72" />
      </div>
    </section>
  );
}
