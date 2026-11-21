import Image from "next/image";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import Hero from "@/components/hero/Hero";
import BasketballLoader from "@/components/fx/BasketballLoader";
import CustomCursor from "@/components/fx/CustomCursor";
import ScrollBall from "@/components/fx/ScrollBall";
import ScrollMarquee from "@/components/fx/ScrollMarquee";
import Odometer from "@/components/fx/Odometer";
import Mark from "@/components/fx/Mark";
import Playground from "@/components/fx/Playground";
import ExperienceReel from "@/components/fx/ExperienceReel";
import Stamp from "@/components/fx/Stamp";
import RollLink from "@/components/fx/RollLink";
import DelhiClock from "@/components/fx/DelhiClock";
import MobileDock from "@/components/fx/MobileDock";
import WhatsAppIcon from "@/components/fx/WhatsAppIcon";
import Magnetic from "@/components/fx/Magnetic";
import {
  profile,
  marquee,
  stats,
  ventures,
  experience,
  stamps,
  toolkit,
  tags,
  education,
  whatsappLink,
} from "@/lib/data";

const CARD_TONES = [
  { bg: "bg-sun text-ink", chip: "bg-ink text-ivory" },
  { bg: "bg-sky text-ink", chip: "bg-ink text-ivory" },
  { bg: "bg-teal text-ivory", chip: "bg-ivory text-ink" },
];

const TILE_TONES = ["bg-sun", "bg-sky", "bg-teal text-ivory", "bg-paper"];

function Badge({ text }: { text: string }) {
  const label = `${text} · ${text} · `;
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <path id={`c-${text}`} d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <text className="fill-current font-mono text-[10.5px] font-bold uppercase tracking-[0.22em]">
          <textPath href={`#c-${text}`}>{label.toUpperCase()}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-current font-display text-xs font-extrabold uppercase">
        Now
      </div>
    </div>
  );
}


export default function Home() {
  return (
    <>
      <BasketballLoader />
      <CustomCursor />
      <ScrollBall />
      <Nav />
      <MobileDock whatsapp={whatsappLink} email={profile.email} />

      <main id="top">
        <Hero />

        {/* Scroll-reactive tape */}
        <div className="relative my-6 h-44 sm:h-60">
          <div className="absolute inset-x-[-5%] top-0 -rotate-[2.5deg] border-y-2 border-ink bg-sun py-3">
            <ScrollMarquee items={marquee} />
          </div>
          <div className="absolute inset-x-[-5%] top-14 rotate-[2deg] border-y-2 border-ink bg-ink py-3 text-ivory sm:top-20">
            <ScrollMarquee
              direction={-1}
              outline
              items={["Question papers", "Scripts", "Slides", "Notes", "Worksheets", "Solutions"]}
            />
          </div>
        </div>

        {/* Scoreboard */}
        <section className="mx-auto mt-16 max-w-6xl px-5">
          <Reveal>
            <div className="hard-lg relative overflow-hidden rounded-3xl bg-ink p-6 text-ivory sm:p-10">
              <div className="mb-8 flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em]">
                <span>Scoreboard</span>
                <span className="flex items-center gap-2">
                  <span className="blink h-2 w-2 rounded-full bg-ember" /> Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-10 gap-y-10 md:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-5xl font-extrabold text-sun sm:text-5xl lg:text-6xl">
                      <Odometer value={s.value} suffix={s.suffix} />
                    </div>
                    <p className="mt-3 font-mono text-xs uppercase tracking-wider text-ivory/70">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* About: notebook page */}
        <Section id="about" num="01" title="About">
          <Reveal>
            <div className="relative mx-auto max-w-4xl">
              <div className="hard-lg ruled relative rounded-xl bg-paper py-10 pl-16 pr-6 sm:pl-24 sm:pr-14">
                <span className="absolute inset-y-0 left-12 w-0.5 bg-ember/50 sm:left-20" />
                <div className="absolute inset-y-6 left-3 flex flex-col justify-between sm:left-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="h-4 w-4 rounded-full border-2 border-ink bg-ivory" />
                  ))}
                </div>

                <div className="space-y-8 text-lg leading-8 sm:text-xl">
                  <p>
                    Hi, I&apos;m Tanishq. I&apos;m from Delhi, and I spend my days turning hard science into
                    something a NEET or IIT-JEE student can actually follow.
                  </p>
                  <p>
                    Right now I&apos;m <Mark>Managing Director at AxiomPrep</Mark>, which I co-founded, and{" "}
                    <Mark>Academic Content Head at Examlytics</Mark>. I look after the content team, the tech
                    team and the mentors, and I work closely with our Founder &amp; CEO and CTO.
                  </p>
                  <p>
                    Before that I wrote papers, scripts and slides for a lot of other EdTech teams. In two
                    months of 2025 I built 25 NEET test papers with 180 questions each. That&apos;s{" "}
                    <Mark>4,500 questions</Mark>.
                  </p>
                  <p>I&apos;m also studying BMLS (Medical Laboratory Science) at DPSRU.</p>
                </div>

                <Image
                  src="/tanishq-circle.jpg"
                  alt=""
                  width={160}
                  height={160}
                  className="hard absolute -right-4 -top-8 h-24 w-24 rotate-6 rounded-full bg-paper sm:-right-8 sm:h-32 sm:w-32"
                />
                <p className="absolute -bottom-10 right-4 hidden rotate-[-4deg] font-hand text-3xl text-ember md:block">
                  25 papers x 180 = 4,500 &uarr;
                </p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* Ventures: stacking cards */}
        <Section id="ventures" num="02" title="What I run">
          <div className="space-y-10 pb-16">
            {ventures.map((v, i) => {
              const tone = CARD_TONES[i % CARD_TONES.length];
              return (
                <div
                  key={v.name}
                  className="sticky"
                  style={{ top: `calc(5.25rem + ${i * 1.4}rem)` }}
                >
                  <article
                    className={`hard-lg relative overflow-hidden rounded-[2rem] p-5 sm:p-12 ${tone.bg} ${
                      i % 2 ? "md:-rotate-[0.6deg]" : "md:rotate-[0.6deg]"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[8rem] font-extrabold leading-none opacity-[0.13] sm:text-[18rem]"
                    >
                      0{i + 1}
                    </span>
                    <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <span className={`inline-block rounded-full px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider ${tone.chip}`}>
                          {v.title}
                          {v.org ? ` · ${v.org}` : ""}
                        </span>
                        <h3
                          className="mt-4 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl"
                          style={{ fontVariationSettings: '"wdth" 80' }}
                        >
                          {v.name}
                        </h3>
                        <p className="mt-4 max-w-2xl text-lg leading-snug">{v.blurb}</p>
                        {v.points.length > 0 && (
                          <ul className="mt-4 max-w-2xl space-y-2 text-sm leading-snug sm:text-base">
                            {v.points.map((p) => (
                              <li key={p} className="flex gap-3">
                                <span className="mt-2 h-2 w-2 shrink-0 bg-current" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        )}
                        {v.href && (
                          <a
                            href={v.href}
                            target="_blank"
                            rel="noreferrer"
                            className="hard mt-6 inline-block rounded-full bg-paper px-6 py-2.5 font-semibold text-ink transition active:translate-x-1 active:translate-y-1 active:shadow-none"
                          >
                            Open {v.href.replace("https://", "")} &#8599;
                          </a>
                        )}
                      </div>
                      <div className="hidden md:block">
                        <Badge text={v.period.toUpperCase()} />
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Physics playground */}
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-6">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <h2
                className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl"
                style={{ fontVariationSettings: '"wdth" 78' }}
              >
                A box of things I&apos;ve made
              </h2>
              <p className="font-hand text-2xl text-ember"><span className="[@media(hover:none)]:hidden">go on, throw them around</span>
                <span className="hidden [@media(hover:none)]:inline">tap the box to shake it</span> &darr;
              </p>
            </div>
          </Reveal>
          <Playground tags={tags} />
        </section>

        {/* Experience: pinned ticket reel */}
        <ExperienceReel items={experience} />

        {/* Toolkit: periodic table */}
        <Section id="toolkit" num="03" title="The periodic table of me">
          <div className="space-y-10">
            {toolkit.map((g, gi) => (
              <Reveal key={g.group}>
                <div className="mb-3 flex items-center gap-3">
                  <span className={`hard h-4 w-4 ${TILE_TONES[gi]}`} />
                  <h3 className="font-mono text-sm font-bold uppercase tracking-[0.2em]">{g.group}</h3>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
                  {g.items.map(([sym, name], i) => {
                    const n = toolkit.slice(0, gi).reduce((a, x) => a + x.items.length, 0) + i + 1;
                    return (
                      <div
                        key={sym + name}
                        className={`hard group relative aspect-square cursor-default rounded-md p-2 transition duration-200 hover:z-10 hover:-translate-y-1.5 hover:-rotate-2 hover:shadow-[7px_7px_0_#3b0d1f] ${TILE_TONES[gi]}`}
                      >
                        <span className="font-mono text-[11px] font-bold">{n}</span>
                        <span
                          className="absolute inset-0 flex items-center justify-center font-display text-4xl font-extrabold sm:text-5xl"
                          style={{ fontVariationSettings: '"wdth" 90' }}
                        >
                          {sym}
                        </span>
                        <span className="absolute inset-x-1 bottom-1.5 text-center text-[10px] font-semibold leading-tight">
                          {name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Recognition: stamps */}
        <Section id="recognition" num="04" title="Stamped & approved">
          <div className="grid gap-12 py-4 md:grid-cols-3">
            {stamps.map((s, i) => (
              <Stamp key={s.title} {...s} delay={i * 0.18} />
            ))}
          </div>
          <Reveal className="mt-16">
            <div className="hard mx-auto max-w-3xl rounded-xl bg-paper p-6">
              <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em]">Report card</p>
              {education.map((e) => (
                <div key={e.title} className="flex flex-wrap items-baseline justify-between gap-2 border-t-2 border-dashed border-ink/30 py-3">
                  <div>
                    <p className="font-display text-xl font-bold">{e.title}</p>
                    <p className="text-sm text-ink/70">{e.place}</p>
                  </div>
                  <p className="font-mono text-sm font-bold text-ember">{e.note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Contact */}
        <section id="contact" className="relative overflow-hidden bg-ink pb-36 pt-20 text-ivory md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-sun">(05) Contact</p>
              <h2
                className="mt-4 font-display text-[clamp(4rem,17vw,15rem)] font-extrabold uppercase leading-[0.85] tracking-tight"
                style={{ fontVariationSettings: '"wdth" 76' }}
              >
                Say hi
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <RollLink
                href={`mailto:${profile.email}`}
                text={profile.email}
                className="font-display text-[clamp(1.4rem,5vw,4.5rem)] font-bold"
              />
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Magnetic>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border-2 border-ivory bg-[#25D366] px-7 py-4 font-semibold text-ink shadow-[5px_5px_0_#fbf4f1] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
                  >
                    <WhatsAppIcon />
                    Message me on WhatsApp
                  </a>
                </Magnetic>
                <span className="font-hand text-2xl text-sun">it opens with a message ready to send</span>
              </div>
            </Reveal>

            <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-ivory/20 pt-6 text-sm text-ivory/70">
              <DelhiClock />
              <span>&copy; 2026 {profile.name}</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
