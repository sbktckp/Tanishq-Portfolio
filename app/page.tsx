import Image from "next/image";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SceneLoader from "@/components/three/SceneLoader";
import BasketballLoader from "@/components/fx/BasketballLoader";
import PageChrome from "@/components/fx/PageChrome";
import SplitText from "@/components/fx/SplitText";
import Magnetic from "@/components/fx/Magnetic";
import Marquee from "@/components/fx/Marquee";
import Counter from "@/components/fx/Counter";
import TiltCard from "@/components/fx/TiltCard";
import Timeline from "@/components/fx/Timeline";
import {
  profile,
  marquee,
  stats,
  ventures,
  experience,
  achievements,
  skills,
  education,
} from "@/lib/data";

const LOADER_MS = 2300;

export default function Home() {
  return (
    <>
      <BasketballLoader />
      <SceneLoader />
      <PageChrome />
      <Nav />
      <main id="top" className="relative z-10">
        {/* Hero */}
        <section className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 pb-20 pt-28 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Hello, I&apos;m
            </p>
            <SplitText
              text={profile.name}
              delay={LOADER_MS / 1000 + 0.1}
              className="text-5xl font-semibold tracking-tight sm:text-7xl"
            />
            <Reveal delay={LOADER_MS / 1000 + 0.6}>
              <p className="gradient-text mt-4 text-xl font-medium sm:text-2xl">
                Managing Director, AxiomPrep
              </p>
              <p className="mt-1 text-lg text-muted">Academic Content Head, Examlytics</p>
              <p className="mt-6 max-w-xl leading-relaxed text-muted">
                I co-founded and lead{" "}
                <span className="text-foreground">AxiomPrep</span> by Examlytics Group of
                Companies, building science prep for NEET and IIT-JEE aspirants from first
                principles.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Magnetic>
                  <a
                    href="#contact"
                    className="inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-background shadow-[0_0_30px_-4px_rgba(247,147,30,0.6)] transition hover:brightness-110"
                  >
                    Get in touch
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="#experience"
                    className="inline-block rounded-full border border-border bg-surface/50 px-7 py-3 text-sm font-medium backdrop-blur transition hover:border-accent-2"
                  >
                    View experience
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* The 3D atom tracks this element (#hero-anchor) */}
          <div id="hero-anchor" className="mx-auto w-56 sm:w-72 md:w-full md:max-w-[17rem]">
            <div className="rounded-[2rem] bg-gradient-to-br from-accent via-accent-deep to-accent-2 p-1 shadow-[0_0_80px_-10px_rgba(42,172,226,0.5)]">
              <Image
                src="/tanishq.jpg"
                alt="Portrait of Tanishq Kansal"
                width={960}
                height={1280}
                priority
                className="aspect-[4/5] w-full rounded-[1.85rem] object-cover object-top"
              />
            </div>
          </div>
        </section>

        <Marquee items={marquee} />

        {/* Stats */}
        <div className="mx-auto mt-10 max-w-6xl px-5">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <TiltCard className="h-full rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur-sm">
                  <div className="gradient-text text-3xl font-semibold sm:text-4xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-muted">{s.label}</div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* About */}
        <Section id="about" eyebrow="About" title="Building scalable learning solutions">
          <Reveal className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <Image
              src="/tanishq-circle.jpg"
              alt="Tanishq Kansal"
              width={240}
              height={240}
              className="mx-auto h-48 w-48 rounded-full ring-2 ring-accent/60 ring-offset-4 ring-offset-background"
            />
            <div className="space-y-4 leading-relaxed text-muted">
              <p>{profile.summary}</p>
              <p>
                I&apos;ve designed 25 NEET-oriented question paper sets with 4,500 questions, and
                contributed to educational content, scripts, presentations and academic projects
                across multiple EdTech initiatives. I turn complex science into clear,
                student-friendly material.
              </p>
            </div>
          </Reveal>
        </Section>

        {/* Ventures */}
        <Section id="ventures" eyebrow="Current work" title="Ventures">
          <div className="grid gap-6 lg:grid-cols-3">
            {ventures.map((v, i) => (
              <Reveal key={v.name} delay={i * 0.12} className="h-full">
                <TiltCard className="h-full rounded-2xl border border-border bg-surface/70 p-7 backdrop-blur-sm transition-colors hover:border-accent/60">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold">{v.name}</h3>
                      <p className="text-sm text-accent">{v.title}</p>
                      {v.org && <p className="text-xs text-muted">{v.org}</p>}
                    </div>
                    <span className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted">
                      <span className="relative flex h-2 w-2">
                        <span className="pulse-ring absolute inset-0 rounded-full bg-accent-2" />
                        <span className="relative h-2 w-2 rounded-full bg-accent-2" />
                      </span>
                      {v.period}
                    </span>
                  </div>
                  <p className="mt-4 text-muted">{v.blurb}</p>
                  {v.points.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {v.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
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
                      className="mt-5 inline-block text-sm font-medium text-accent-2 hover:underline"
                    >
                      Visit {v.href.replace("https://", "")} →
                    </a>
                  )}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" eyebrow="Experience" title="Content & collaborations">
          <Timeline>
            {experience.map((e) => (
              <li key={e.role + e.org} className="relative">
                <span className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(247,147,30,0.7)]" />
                <Reveal>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-lg font-semibold">{e.role}</h3>
                    <span className="font-mono text-xs text-muted">{e.period}</span>
                  </div>
                  <p className="text-sm text-accent-2">{e.org}</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    {e.points.map((p) => (
                      <li key={p}>– {p}</li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </Timeline>
        </Section>

        {/* Achievements */}
        <Section id="achievements" eyebrow="Recognition" title="Key achievements">
          <div className="grid gap-4 md:grid-cols-3">
            {achievements.map((a, i) => (
              <Reveal key={a} delay={i * 0.1} className="h-full">
                <TiltCard className="h-full rounded-2xl border border-border bg-surface/70 p-6 text-sm leading-relaxed text-muted backdrop-blur-sm">
                  <span className="gradient-text mb-3 block text-3xl">★</span>
                  {a}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" eyebrow="Skills" title="What I bring">
          <div className="grid gap-6 md:grid-cols-2">
            {skills.map((g, i) => (
              <Reveal key={g.group} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur-sm">
                  <h3 className="mb-4 font-semibold">{g.group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <h3 className="mb-4 font-semibold">Education</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {education.map((e) => (
                <div key={e.title} className="rounded-2xl border border-border bg-surface/50 p-5 backdrop-blur-sm">
                  <p className="font-medium">{e.title}</p>
                  <p className="text-sm text-muted">{e.place}</p>
                  <p className="mt-1 text-xs text-accent">{e.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">Languages: English, Hindi</p>
          </Reveal>
        </Section>

        {/* Contact */}
        <Section id="contact" eyebrow="Contact" title="Let's work together">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/20 via-surface/60 to-accent-2/20 p-8 backdrop-blur sm:p-12">
              <p className="max-w-xl text-muted">
                Open to academic content, assessment design and EdTech strategy conversations.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-lg sm:flex-row sm:gap-8">
                <a href={`mailto:${profile.email}`} className="hover:text-accent">
                  {profile.email}
                </a>
                <a href={`tel:${profile.phone}`} className="hover:text-accent">
                  {profile.phone}
                </a>
                <span className="text-muted">{profile.location}</span>
              </div>
            </div>
          </Reveal>
        </Section>
      </main>
      <footer className="relative z-10 border-t border-border bg-background/60 py-8 text-center text-sm text-muted backdrop-blur">
        © 2026 {profile.name}
      </footer>
    </>
  );
}
