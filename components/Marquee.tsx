const ITEMS = [
  "NEET",
  "IIT-JEE",
  "Assessment Design",
  "Question Papers",
  "Content Strategy",
  "EdTech",
];

/** A quiet band of slowly moving keywords. */
export default function Marquee() {
  return (
    <div
      aria-hidden
      className="select-none overflow-hidden border-y border-line bg-night/50 py-5 text-lg font-semibold uppercase tracking-[0.18em] text-muted sm:text-xl"
    >
      <div className="marquee flex w-max">
        {/* Two identical halves make the loop seamless. */}
        {[0, 1].map((half) => (
          <ul key={half} className="flex shrink-0 items-center">
            {[...ITEMS, ...ITEMS].map((item, i) => (
              <li key={i} className="flex items-center whitespace-nowrap">
                {item}
                <span className="mx-10 h-1.5 w-1.5 rotate-45 bg-rose" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
