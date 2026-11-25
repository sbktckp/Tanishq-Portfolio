import Nav from "@/components/Nav";
import Section from "@/components/Section";
import Hero from "@/components/hero/Hero";
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

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted marker:text-accent">
      {items.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}

function RoleRow({ item }: { item: Role }) {
  return (
    <li className="grid gap-2 border-b border-line py-8 first:pt-0 last:border-0 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-8">
      <p className="text-sm text-muted">{item.period}</p>
      <div>
        <h3 className="text-lg font-semibold leading-snug">{item.role}</h3>
        <p className="mt-1 text-sm font-medium text-accent">{item.org}</p>
        <Points items={item.points} />
      </div>
    </li>
  );
}

export default function Home() {
  return (
    <>
      <Nav />

      <main id="top">
        <Hero />

        {/* Key figures */}
        <section aria-label="Key figures" className="border-t border-line bg-mist">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end border-l border-line pl-5">
                <dt className="mt-2 text-sm text-muted">{s.label}</dt>
                <dd className="text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Section id="about" title="About">
          <div className="max-w-3xl space-y-5 text-lg leading-relaxed">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="roles" title="Current roles">
          <div className="grid gap-5">
            {currentRoles.map((r) => (
              <article key={r.org} className="flex flex-col rounded-lg border border-line p-6 sm:p-8">
                <h3 className="text-lg font-semibold leading-snug">{r.role}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{r.org}</p>
                <Points items={r.points} />
                {r.href && (
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto self-start pt-6 text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-accent"
                  >
                    {r.href.replace("https://", "")} &#8599;
                  </a>
                )}
              </article>
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

        <Section id="expertise" title="Expertise" className="bg-mist">
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            {skills.map((g) => (
              <div key={g.group}>
                <h3 className="border-b border-line pb-3 text-sm font-semibold">{g.group}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="achievements" title="Achievements">
          <ul className="grid gap-5 md:grid-cols-2">
            {achievements.map((a) => (
              <li key={a} className="rounded-lg border border-line p-6 leading-relaxed sm:p-8">
                {a}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="education" title="Education">
          <ul>
            {education.map((e) => (
              <li
                key={e.title}
                className="flex flex-col justify-between gap-2 border-b border-line py-6 first:pt-0 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <div>
                  <h3 className="text-lg font-semibold">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted">{e.place}</p>
                </div>
                <p className="shrink-0 text-sm font-medium text-accent">{e.note}</p>
              </li>
            ))}
          </ul>
        </Section>

        <section id="contact" className="bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Get in touch</h2>
            <p className="mt-4 max-w-lg leading-relaxed text-paper/70">
              For academic content, assessment design and collaboration enquiries.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="break-all rounded-md bg-paper px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
              >
                {profile.email}
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-paper/30 px-6 py-3 text-sm font-medium transition-colors hover:border-paper"
              >
                Message on WhatsApp
              </a>
            </div>
            <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-paper/15 pt-6 text-sm text-paper/60">
              <span>&copy; 2026 {profile.name}</span>
              <span>{profile.location}</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
