"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import WhatsAppIcon from "./WhatsAppIcon";

const LINKS = [
  ["About", "#about"],
  ["What I run", "#ventures"],
  ["Experience", "#experience"],
  ["Toolkit", "#toolkit"],
  ["Contact", "#contact"],
] as const;

/**
 * Phone-only thumb-zone dock: one-tap WhatsApp, email, and a full-screen menu.
 * Slides away once the contact section is on screen (it has the same buttons).
 */
export default function MobileDock({ whatsapp, email }: { whatsapp: string; email: string }) {
  const [open, setOpen] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const hidden = atContact && !open;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.nav
            key="sheet"
            aria-label="Sections"
            className="fixed inset-0 z-[110] flex flex-col justify-center bg-ivory px-7 pb-28 md:hidden"
            initial={{ clipPath: "circle(0% at 90% 95%)" }}
            animate={{ clipPath: "circle(150% at 90% 95%)" }}
            exit={{ clipPath: "circle(0% at 90% 95%)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-1">
              {LINKS.map(([label, href], i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                >
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b-2 border-ink py-4 font-display text-5xl font-extrabold uppercase active:text-ember"
                    style={{ fontVariationSettings: '"wdth" 78' }}
                  >
                    {label}
                    <span className="font-mono text-sm font-normal">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <div
        className="fixed inset-x-3 z-[120] transition-transform duration-300 md:hidden"
        style={{
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)",
          transform: hidden ? "translateY(160%)" : "none",
        }}
      >
        <div className="hard flex items-center gap-2 rounded-full bg-ink p-2 text-ivory">
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-ink active:scale-[0.97]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp me
          </a>
          <a
            href={`mailto:${email}`}
            aria-label="Email Tanishq"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory text-ink active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-sun text-ink active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
