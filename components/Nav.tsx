const links = [
  ["About", "#about"],
  ["Ventures", "#ventures"],
  ["Experience", "#experience"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
] as const;

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="whitespace-nowrap font-semibold tracking-tight">
          Tanishq Kansal<span className="text-accent">.</span>
        </a>
        <ul className="flex items-center gap-4 text-sm text-muted sm:gap-7">
          {links.map(([label, href]) => (
            <li
              key={href}
              className={label === "Skills" || label === "Ventures" ? "hidden md:block" : "hidden sm:block"}
            >
              <a href={href} className="transition hover:text-foreground">
                {label}
              </a>
            </li>
          ))}
          <li className="sm:hidden">
            <a href="#contact" className="rounded-full bg-accent px-4 py-1.5 font-medium text-background">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
