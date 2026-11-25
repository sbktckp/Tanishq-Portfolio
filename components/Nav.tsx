"use client";

import { useState } from "react";
import Logo from "./Logo";

const links = [
  ["About", "#about"],
  ["Current roles", "#roles"],
  ["Experience", "#experience"],
  ["Expertise", "#expertise"],
  ["Education", "#education"],
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" className="flex items-center gap-3" aria-label="Tanishq Kansal, home">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink text-paper">
            <Logo className="h-6 w-6" strokeWidth={46} />
          </span>
          <span className="text-base font-semibold tracking-tight">Tanishq Kansal</span>
        </a>
        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 text-sm text-muted lg:flex">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="hidden rounded-md bg-accent px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90 sm:inline-block"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-line lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <ul id="mobile-menu" className="border-t border-line bg-paper px-5 py-2 lg:hidden">
          {[...links, ["Contact", "#contact"] as const].map(([label, href]) => (
            <li key={href} className="border-b border-line last:border-0">
              <a href={href} onClick={() => setOpen(false)} className="block py-3.5 text-base">
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
