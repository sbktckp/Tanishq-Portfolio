/** Big link whose letters roll over (slot-machine style) on hover. */
export default function RollLink({
  href,
  text,
  className = "",
}: {
  href: string;
  text: string;
  className?: string;
}) {
  return (
    <a href={href} aria-label={text} className={`group inline-flex overflow-hidden ${className}`}>
      {[...text].map((c, i) => (
        <span key={i} aria-hidden className="relative inline-block overflow-hidden">
          <span
            className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {c === " " ? " " : c}
          </span>
          <span
            className="absolute left-0 top-full block text-sun transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {c === " " ? " " : c}
          </span>
        </span>
      ))}
    </a>
  );
}
