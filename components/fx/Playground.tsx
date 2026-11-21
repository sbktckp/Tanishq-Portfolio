"use client";

import { useEffect, useRef } from "react";
import BasketballSvg from "./BasketballSvg";

const TONES = ["bg-sun", "bg-sky text-ink", "bg-paper", "bg-teal text-ivory", "bg-ember text-ivory", "bg-stone"];

/**
 * A box of real 2D physics (matter-js). The words rain down, pile up and can be
 * grabbed and thrown around with the mouse.
 */
export default function Playground({ tags }: { tags: string[] }) {
  const box = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLDivElement | null)[]>([]);
  const ball = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = box.current;
    if (!container) return;
    let stopped = false;
    let cleanup = () => {};

    (async () => {
      const Matter = (await import("matter-js")).default;
      if (stopped) return;
      const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint, Runner } = Matter;

      const engine = Engine.create({ gravity: { x: 0, y: 1.1, scale: 0.001 } });
      const W = () => container.clientWidth;
      const H = () => container.clientHeight;
      const T = 120;

      const floor = Bodies.rectangle(W() / 2, H() + T / 2, W() * 4, T, { isStatic: true });
      const left = Bodies.rectangle(-T / 2, H() / 2 - 600, T, H() * 4, { isStatic: true });
      const right = Bodies.rectangle(W() + T / 2, H() / 2 - 600, T, H() * 4, { isStatic: true });
      Composite.add(engine.world, [floor, left, right]);

      type Item = { body: Matter.Body; el: HTMLElement; w: number; h: number };
      const items: Item[] = [];
      const timers: number[] = [];

      const spawn = (el: HTMLElement, i: number, circle = false) => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const x = 60 + ((i * 137) % Math.max(120, W() - 120));
        const y = -80 - i * 10;
        const body = circle
          ? Bodies.circle(x, y, w / 2, { restitution: 0.85, friction: 0.05, density: 0.0016 })
          : Bodies.rectangle(x, y, w, h, {
              chamfer: { radius: h / 2 },
              restitution: 0.45,
              friction: 0.25,
              angle: ((i % 7) - 3) * 0.2,
            });
        Body.setVelocity(body, { x: ((i % 5) - 2) * 1.2, y: 0 });
        Composite.add(engine.world, body);
        items.push({ body, el, w, h });
      };

      const start = () => {
        els.current.forEach((el, i) => {
          if (el) timers.push(window.setTimeout(() => spawn(el, i), i * 150));
        });
        if (ball.current) {
          const b = ball.current;
          timers.push(window.setTimeout(() => spawn(b, 7, true), 900));
        }
      };

      // Only start raining when the box scrolls into view
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            start();
            io.disconnect();
          }
        },
        { threshold: 0.35 },
      );
      io.observe(container);

      // Grab-and-throw only with a real mouse (touch would hijack page scroll)
      let mc: Matter.MouseConstraint | null = null;
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const mouse = Mouse.create(container);
        // matter-js swallows wheel events, which would trap page scrolling over the box
        const wheel = (mouse as unknown as { mousewheel: EventListener }).mousewheel;
        for (const type of ["mousewheel", "DOMMouseScroll", "wheel"]) {
          mouse.element.removeEventListener(type, wheel);
        }
        mc =MouseConstraint.create(engine, {
          mouse,
          constraint: { stiffness: 0.18, damping: 0.1, render: { visible: false } },
        });
        Composite.add(engine.world, mc);
      }

      // Touch screens: tap the box to shake everything up (dragging would fight page scroll)
      const shake = (e: PointerEvent) => {
        if (e.pointerType === "mouse") return;
        navigator.vibrate?.(12);
        for (const { body } of items) {
          Body.setVelocity(body, { x: (Math.random() - 0.5) * 16, y: -9 - Math.random() * 9 });
          Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.3);
        }
      };
      container.addEventListener("pointerdown", shake);

      const runner = Runner.create();
      Runner.run(runner, engine);

      let raf = 0;
      const draw = () => {
        for (const { body, el, w, h } of items) {
          el.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
          el.style.opacity = "1";
        }
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);

      const ro = new ResizeObserver(() => {
        Body.setPosition(floor, { x: W() / 2, y: H() + T / 2 });
        Body.setPosition(right, { x: W() + T / 2, y: H() / 2 - 600 });
        for (const it of items) {
          if (it.body.position.x > W()) Body.setPosition(it.body, { x: W() - it.w, y: it.body.position.y });
        }
      });
      ro.observe(container);

      cleanup = () => {
        container.removeEventListener("pointerdown", shake);
        timers.forEach(clearTimeout);
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        Runner.stop(runner);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      };
    })();

    return () => {
      stopped = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={box}
      data-cursor="throw"
      className="hard-lg relative h-[26rem] overflow-hidden rounded-3xl bg-paper sm:h-[30rem]"
      style={{
        backgroundImage: "radial-gradient(rgba(15,45,70,0.18) 1.5px, transparent 1.5px)",
        backgroundSize: "22px 22px",
      }}
    >
      {tags.map((t, i) => (
        <div
          key={t}
          ref={(el) => {
            els.current[i] = el;
          }}
          style={{ opacity: 0 }}
          className={`hard absolute left-0 top-0 select-none whitespace-nowrap rounded-full px-4 py-2 font-display text-base font-extrabold uppercase sm:px-5 sm:text-xl ${TONES[i % TONES.length]}`}
        >
          {t}
        </div>
      ))}
      <div ref={ball} style={{ opacity: 0 }} className="absolute left-0 top-0 h-[4.5rem] w-[4.5rem] select-none sm:h-20 sm:w-20">
        <BasketballSvg className="h-full w-full" />
      </div>
    </div>
  );
}
