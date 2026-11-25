import Act from "@/components/Act";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Section from "@/components/Section";
import Hero from "@/components/hero/Hero";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
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

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted marker:text-rose">
      {items.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}

function TimelineItem({ item }: { item: Role }) {
  return (
    <Reveal as="li" className="relative pl-8 sm:pl-12">
      <span aria-hidden className="timeline-dot" />
      <TiltCard tilt={2} className="p-6 sm:p-8">
        <p className="inline-block rounded-full border border-rose/40 px-3 py-1 text-xs font-medium text-rose">
          {item.period}
        </p>
        <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight sm:text-2xl">
          {item.role}
        </h3>
        <p className="mt-1 text-sm font-semibold text-rose">{item.org}</p>
        <Points items={item.points} />
      </TiltCard>
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

        <Marquee />

        {/* Key figures */}
        <section id="figures" aria-label="Key figures" className="py-20 sm:py-32">
          <dl className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <TiltCard tilt={2} className="flex h-full flex-col-reverse p-8 sm:p-10">
                  <dt className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-muted">
                    {s.label}
                  </dt>
                  <dd className="text-gradient pb-1 text-5xl font-bold tabular-nums leading-none tracking-tighter sm:text-7xl">
                    <CountUp value={s.value} />
                  </dd>
                </TiltCard>
              </Reveal>
            ))}
          </dl>
        </section>

        <Act id="act-questions" word="4,500" caption="NEET questions designed" />

        <Section id="about" num="01" title="About">
          <div className="space-y-5">
            {profile.about.map((p, i) => (
              <Reveal key={p} delay={i * 80}>
                <TiltCard tilt={2} className="p-6 text-lg leading-relaxed sm:p-8 sm:text-xl">
                  <p>{p}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Section>

        <Act id="act-lead" word="LEAD" caption="Managing Director · Academic Content Head" />

        <Section id="roles" num="02" title="Current roles">
          <div className="grid gap-6">
            {currentRoles.map((r) => (
              <Reveal key={r.org}>
                <TiltCard tilt={2} className="flex flex-col p-6 sm:p-10">
                  <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-rose">
                    <span className="h-2 w-2 rounded-full bg-rose" />
                    {r.period}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
                    {r.role}
                  </h3>
                  <p className="mt-2 font-semibold text-rose">{r.org}</p>
                  <Points items={r.points} />
                  {r.href && (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost mt-7 self-start px-5 py-2.5 text-sm font-semibold"
                    >
                      {r.href.replace("https://", "")} &#8599;
                    </a>
                  )}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="experience" num="03" title="Experience">
          <ol className="timeline relative space-y-8">
            {experience.map((e) => (
              <TimelineItem key={e.org} item={e} />
            ))}
          </ol>
        </Section>

        <Act id="act-exams" word="NEET · JEE" caption="Physics · Chemistry · Botany · Zoology" />

        <Section id="expertise" num="04" title="Expertise">
          <div className="grid gap-5 sm:grid-cols-2">
            {skills.map((g, i) => (
              <Reveal key={g.group} delay={(i % 2) * 120}>
                <TiltCard tilt={2} className="h-full p-6 sm:p-7">
                  <h3 className="text-base font-bold">{g.group}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="achievements" num="05" title="Achieve&shy;ments">
          <ul className="grid gap-6 md:grid-cols-2">
            {achievements.map((a, i) => (
              <Reveal as="li" key={a} delay={i * 140}>
                <TiltCard tilt={2} className="h-full p-7 text-lg leading-relaxed sm:p-9">
                  <span aria-hidden className="mb-5 block h-0.5 w-10 bg-rose" />
                  {a}
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        </Section>

        <Section id="education" num="06" title="Education">
          <ul className="space-y-6">
            {education.map((e, i) => (
              <Reveal as="li" key={e.title} delay={i * 120}>
                <TiltCard tilt={2} className="p-7 sm:p-9">
                  <p className="text-sm font-semibold text-rose">{e.note}</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{e.title}</h3>
                  <p className="mt-2 text-muted">{e.place}</p>
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        </Section>

        <section id="contact" className="flex min-h-screen flex-col justify-end">
          <div className="mx-auto w-full max-w-6xl px-5 pb-8 pt-20">
            <Reveal>
              <h2 className="text-gradient pb-3 text-[clamp(3rem,min(10vw,15vh),8rem)] font-extrabold uppercase leading-[0.9] tracking-tighter">
                Get in
                <br />
                touch
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                For academic content, assessment design and collaboration enquiries.
              </p>
            </Reveal>
            <Reveal delay={150} className="mt-10 flex flex-wrap gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="btn-glow break-all px-8 py-4 text-sm font-semibold sm:text-base"
              >
                {profile.email}
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost px-8 py-4 text-sm font-semibold sm:text-base"
              >
                Message on WhatsApp
              </a>
            </Reveal>
            <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-sm text-muted">
              <span>&copy; 2026 {profile.name}</span>
              <span>{profile.location}</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
