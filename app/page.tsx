import Nav from "@/components/Nav";
import Section from "@/components/Section";
import Hero from "@/components/hero/Hero";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import Backdrop from "@/components/three/Backdrop";
import {
  profile,
  stats,
  currentRoles,
  experience,
  skills,
  achievements,
  education,
  whatsappLink,
  type Role,
} from "@/lib/data";

const CARD =
  "rounded-lg border border-line bg-surface/70 transition duration-300 hover:-translate-y-1 hover:border-rose/50 hover:shadow-2xl hover:shadow-accent/20";

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted marker:text-rose">
      {items.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}

function RoleRow({ item }: { item: Role }) {
  return (
    <Reveal
      as="li"
      className="group grid gap-2 border-b border-line py-8 first:pt-0 last:border-0 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-8"
    >
      <p className="text-sm text-muted">{item.period}</p>
      <div>
        <h3 className="text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-rose">
          {item.role}
        </h3>
        <p className="mt-1 text-sm font-medium text-rose">{item.org}</p>
        <Points items={item.points} />
      </div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Backdrop />
      <Nav />

      <main id="top">
        <Hero />

        {/* Key figures */}
        <section id="figures" aria-label="Key figures" className="border-t border-line bg-surface/50">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end border-l border-rose/40 pl-5">
                <dt className="mt-2 text-sm text-muted">{s.label}</dt>
                <dd className="text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <Section id="about" title="About">
          <div className="max-w-3xl space-y-5 text-lg leading-relaxed">
            {profile.about.map((p, i) => (
              <Reveal key={p} delay={i * 80}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="roles" title="Current roles">
          <div className="grid gap-5">
            {currentRoles.map((r) => (
              <Reveal key={r.org}>
                <article className={`flex flex-col p-6 sm:p-8 ${CARD}`}>
                  <h3 className="text-lg font-semibold leading-snug">{r.role}</h3>
                  <p className="mt-1 text-sm font-medium text-rose">{r.org}</p>
                  <Points items={r.points} />
                  {r.href && (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-auto self-start pt-6 text-sm font-medium underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-rose hover:decoration-rose"
                    >
                      {r.href.replace("https://", "")}{" "}
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        &#8599;
                      </span>
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <ol>
            {experience.map((e) => (
              <RoleRow key={e.org} item={e} />
            ))}
          </ol>
        </Section>

        <Section id="expertise" title="Expertise" className="bg-surface/50">
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            {skills.map((g, i) => (
              <Reveal key={g.group} delay={(i % 3) * 100}>
                <h3 className="border-b border-line pb-3 text-sm font-semibold">{g.group}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {g.items.map((s) => (
                    <li key={s} className="transition duration-300 hover:translate-x-1 hover:text-ink">
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="achievements" title="Achievements">
          <ul className="grid gap-5 md:grid-cols-2">
            {achievements.map((a, i) => (
              <Reveal as="li" key={a} delay={i * 120}>
                <div className={`h-full p-6 leading-relaxed sm:p-8 ${CARD}`}>{a}</div>
              </Reveal>
            ))}
          </ul>
        </Section>

        <Section id="education" title="Education">
          <ul>
            {education.map((e, i) => (
              <Reveal
                as="li"
                key={e.title}
                delay={i * 120}
                className="flex flex-col justify-between gap-2 border-b border-line py-6 first:pt-0 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <div>
                  <h3 className="text-lg font-semibold">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted">{e.place}</p>
                </div>
                <p className="shrink-0 text-sm font-medium text-rose">{e.note}</p>
              </Reveal>
            ))}
          </ul>
        </Section>

        <section id="contact" className="border-t border-line bg-gradient-to-b from-accent/25 to-accent/5">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Get in touch</h2>
              <p className="mt-4 max-w-lg leading-relaxed text-muted">
                For academic content, assessment design and collaboration enquiries.
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="break-all rounded-md bg-ink px-6 py-3 text-sm font-medium text-night transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose/20"
              >
                {profile.email}
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-ink/30 bg-night/40 px-6 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:border-ink"
              >
                Message on WhatsApp
              </a>
            </Reveal>
            <div className="mt-20 flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-sm text-muted">
              <span>&copy; 2026 {profile.name}</span>
              <span>{profile.location}</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
