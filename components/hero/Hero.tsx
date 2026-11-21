"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRef, type ReactNode, type RefObject } from "react";
import VariableName from "./VariableName";
import BallSlot from "./BallSlot";
import Magnetic from "../fx/Magnetic";
import { LOADER_MS } from "../fx/BasketballLoader";

const START = LOADER_MS / 1000;

function Sticker({
  area,
  children,
  className,
  rotate,
  delay,
}: {
  area: RefObject<HTMLElement | null>;
  children: ReactNode;
  className: string;
  rotate: number;
  delay: number;
}) {
  return (
    <motion.div
      drag
      dragConstraints={area}
      dragElastic={0.12}
      dragMomentum={false}
      data-cursor="drag"
      initial={{ scale: 0, rotate: rotate - 30 }}
      animate={{ scale: 1, rotate }}
      whileHover={{ scale: 1.06 }}
      whileDrag={{ scale: 1.12, rotate: 0, zIndex: 40 }}
      transition={{ type: "spring", stiffness: 260, damping: 14, delay: START + delay }}
      className={`hard absolute z-20 select-none rounded-xl px-4 py-2 font-display text-lg font-extrabold uppercase ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const area = useRef<HTMLElement>(null);

  return (
    <section ref={area} className="relative mx-auto max-w-[88rem] px-5 pb-24 pt-14 sm:pt-20">
      <p className="font-mono text-xs uppercase tracking-[0.25em]">
        Portfolio <span className="text-ember">/</span> Delhi, India
      </p>

      <VariableName
        delay={START}
        lines={[{ text: "Tanishq" }, { text: "Kansal", className: "md:pl-[16vw]" }]}
      />

      <div className="mt-10 grid gap-16 md:grid-cols-[1.15fr_1fr] md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: START + 0.7, duration: 0.7 }}
        >
          <p className="max-w-xl font-display text-2xl font-semibold leading-tight sm:text-3xl">
            I make hard science easy to follow for NEET and IIT-JEE students.
          </p>
          <p className="mt-5 max-w-lg leading-relaxed text-ink/75">
            Managing Director at <b className="text-ink">AxiomPrep</b>, which I co-founded, and
            Academic Content Head at <b className="text-ink">Examlytics</b>. I write the
            questions, build the papers and run the teams behind them.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <a
                href="#contact"
                className="hard inline-block rounded-full bg-sun px-7 py-3 font-semibold transition active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                Let&apos;s talk
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#experience"
                className="hard inline-block rounded-full bg-paper px-7 py-3 font-semibold transition active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                See my work
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-sm">
          <motion.figure
            drag
            dragConstraints={area}
            dragElastic={0.12}
            dragMomentum={false}
            data-cursor="drag"
            initial={{ opacity: 0, y: 60, rotate: 10 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            whileHover={{ rotate: 0 }}
            whileDrag={{ scale: 1.03, rotate: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 100, delay: START + 0.4 }}
            className="hard-lg relative bg-paper p-3 pb-14"
          >
            <span className="absolute -top-3 left-6 z-10 h-6 w-16 -rotate-6 bg-sun/70" />
            <span className="absolute -top-3 right-6 z-10 h-6 w-16 rotate-6 bg-sun/70" />
            <Image
              src="/tanishq.jpg"
              alt="Tanishq Kansal"
              width={960}
              height={1280}
              priority
              draggable={false}
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <figcaption className="absolute inset-x-0 bottom-2 text-center font-hand text-3xl">
              that&apos;s me
            </figcaption>
          </motion.figure>

          <Sticker area={area} rotate={-9} delay={1.0} className="-left-5 top-8 bg-sun">
            NEET
          </Sticker>
          <Sticker area={area} rotate={7} delay={1.15} className="-right-3 top-28 bg-sky">
            IIT-JEE
          </Sticker>
          <Sticker area={area} rotate={-4} delay={1.3} className="-right-4 bottom-2 bg-paper">
            Delhi
          </Sticker>

          <BallSlot className="absolute -bottom-12 -left-24 z-30 h-60 w-60 sm:-left-28 sm:h-72 sm:w-72" />
        </div>
      </div>
    </section>
  );
}
