export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div aria-hidden className="overflow-hidden py-8">
      <div className="-mx-6 -rotate-1 border-y border-border bg-surface/60 py-4 backdrop-blur">
        <div className="marquee flex w-max whitespace-nowrap">
          {row.map((t, i) => (
            <span
              key={i}
              className="flex items-center pr-10 text-2xl font-semibold uppercase tracking-wider text-foreground/80"
            >
              {t}
              <span className="ml-10 text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
