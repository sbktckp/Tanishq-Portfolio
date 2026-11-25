import Image from "next/image";
import type { CSSProperties } from "react";
import BallSlot from "./BallSlot";
import { profile, resumeFile, whatsappLink } from "@/lib/data";

function Label({ children, className }: { children: string; className: string }) {
  return (
    <span
      className={`absolute z-20 rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] shadow-lg shadow-black/40 ${className}`}
    >
      {children}
    </span>
  );
}

/** The name, one letter at a time. */
function BigName() {
  const words = profile.name.split(" ");
  return (
    <h1
      aria-label={profile.name}
      className="mt-4 text-[clamp(3.5rem,min(9vw,14vh),7.5rem)] font-extrabold uppercase leading-[0.9] tracking-tighter"
    >
      {words.map((word, w) => (
        <span key={word} aria-hidden className="block whitespace-nowrap">
          {[...word].map((letter, i) => (
            <span
              key={i}
              className={`letter ${w ? "letter-accent" : ""}`}
              style={{ "--i": w * words[0].length + i } as CSSProperties}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl content-center gap-16 overflow-x-clip px-5 pb-20 pt-8 md:grid-cols-[1.2fr_1fr] md:items-center"
    >
      <div>
        <p className="rise inline-flex items-center gap-3 rounded-full border border-line bg-night/50 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-rose">
          <span className="h-2 w-2 rounded-full bg-rose" />
          {profile.location}
        </p>
        <BigName />
        <p className="rise mt-5 max-w-xl text-xl font-medium leading-snug [animation-delay:700ms] sm:text-2xl">
          {profile.headline}
        </p>
        <p className="rise mt-4 max-w-lg leading-relaxed text-muted [animation-delay:820ms]">
          {profile.intro}
        </p>
        <div className="rise mt-7 flex flex-wrap gap-4 [animation-delay:940ms]">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="btn-glow px-8 py-4 text-sm font-semibold"
          >
            Get in touch
          </a>
          <a href={resumeFile} download className="btn-ghost px-8 py-4 text-sm font-semibold">
            Download resume
          </a>
          <a href="#experience" className="btn-ghost px-8 py-4 text-sm font-semibold">
            View experience
          </a>
        </div>
      </div>

      {/* The photo, labels and basketball stay still. */}
      <div className="relative mx-auto w-full max-w-sm">
        <figure className="photo-glow relative rotate-3 border border-line bg-surface p-3">
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
