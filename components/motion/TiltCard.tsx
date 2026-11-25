"use client";

import type { PointerEvent, ReactNode } from "react";

/** Glass card that leans toward the cursor and lights up beneath it. */
export default function TiltCard({
  children,
  className = "",
  tilt = 5,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const box = el.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width;
    const y = (e.clientY - box.top) / box.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * tilt}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * tilt}deg`);
  };

  const leave = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <div onPointerMove={move} onPointerLeave={leave} className={`glass tilt ${className}`}>
      {children}
    </div>
  );
}
