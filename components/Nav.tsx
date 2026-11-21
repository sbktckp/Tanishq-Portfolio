const links = [
  ["About", "#about"],
  ["Ventures", "#ventures"],
  ["Experience", "#experience"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
] as const;

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-semibold tracking-tight">
          Tanishq<span className="text-accent">.</span>
        </a>
        <ul className="flex items-center gap-4 text-sm text-muted sm:gap-7">
          {links.map(([label, href]) => (
            <li key={href} className={label === "Skills" ? "hidden sm:block" : ""}>
              <a href={href} className="transition hover:text-foreground">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
