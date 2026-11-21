import Image from "next/image";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import {
  profile,
  stats,
  ventures,
  experience,
  achievements,
  skills,
  education,
} from "@/lib/data";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
          <div className="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full bg-accent-2/20 blur-[120px]" />
          <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-32 md:grid-cols-[1.2fr_1fr] md:pt-40">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Hello, I&apos;m
              </p>
              <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
                {profile.name}
              </h1>
              <p className="mt-4 text-xl text-muted sm:text-2xl">{profile.role}</p>
              <p className="mt-6 max-w-xl leading-relaxed text-muted">
                Co-founder &amp; COO of <span className="text-foreground">Axiom Prep</span> and
                Academic Content Head at <span className="text-foreground">Examlytics</span>,
                building science prep for NEET and IIT-JEE aspirants.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:brightness-110"
                >
                  Get in touch
                </a>
                <a
                  href="#experience"
                  className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-accent"
                >
                  View experience
                </a>
              </div>
            </div>
            <div className="mx-auto w-64 sm:w-80 md:w-full md:max-w-sm">
              <div className="rounded-[2rem] bg-gradient-to-br from-accent to-accent-2 p-1">
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
        </div>

        {/* Stats */}
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-3xl font-semibold text-accent">{s.value}</div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* About */}
        <Section id="about" eyebrow="About" title="Building scalable learning solutions">
          <Reveal className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <Image
              src="/tanishq-circle.jpg"
              alt="Tanishq Kansal"
              width={240}
              height={240}
              className="mx-auto h-48 w-48 rounded-full"
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
          <div className="grid gap-6 md:grid-cols-2">
            {ventures.map((v) => (
              <Reveal key={v.name}>
                <article className="h-full rounded-2xl border border-border bg-surface p-7 transition hover:border-accent/60">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold">{v.name}</h3>
                      <p className="text-sm text-accent">{v.title}</p>
                    </div>
                    <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                      {v.period}
                    </span>
                  </div>
                  <p className="mt-4 text-muted">{v.blurb}</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    {v.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {v.href && (
                    <a
                      href={v.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-block text-sm font-medium text-accent hover:underline"
                    >
                      Visit {v.href.replace("https://", "")} →
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" eyebrow="Experience" title="Content & collaborations">
          <ol className="relative space-y-8 border-l border-border pl-8">
            {experience.map((e) => (
              <li key={e.role + e.org} className="relative">
                <Reveal>
                  <span className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />
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
          </ol>
        </Section>

        {/* Achievements */}
        <Section id="achievements" eyebrow="Recognition" title="Key achievements">
          <div className="grid gap-4 md:grid-cols-3">
            {achievements.map((a) => (
              <Reveal key={a}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 text-sm leading-relaxed text-muted">
                  <span className="mb-3 block text-2xl text-accent">★</span>
                  {a}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" eyebrow="Skills" title="What I bring">
          <div className="grid gap-6 md:grid-cols-2">
            {skills.map((g) => (
              <Reveal key={g.group}>
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="mb-4 font-semibold">{g.group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((i) => (
                      <span
                        key={i}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                      >
                        {i}
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
                <div key={e.title} className="rounded-2xl border border-border p-5">
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
            <div className="rounded-3xl bg-gradient-to-br from-accent/20 to-accent-2/20 p-8 sm:p-12">
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
      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        © 2026 {profile.name}
      </footer>
    </>
  );
}
