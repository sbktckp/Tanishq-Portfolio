import Logo from "./Logo";

const links = [
  ["About", "#about"],
  ["Work", "#ventures"],
  ["Experience", "#experience"],
  ["Toolkit", "#toolkit"],
] as const;

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-ivory/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-3" aria-label="Tanishq Kansal, home">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#050407]">
            <Logo className="h-6 w-6" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">Tanishq Kansal</span>
        </a>
        <ul className="flex items-center gap-7 text-sm font-medium">
          {links.map(([label, href]) => (
            <li key={href} className="hidden md:block">
              <a
                href={href}
                className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-ember after:transition-all hover:after:w-full"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="hard inline-block rounded-full bg-sun px-5 py-2 font-semibold transition active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Say hi
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
