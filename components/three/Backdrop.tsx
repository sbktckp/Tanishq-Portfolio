"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { hasWebGL } from "@/lib/webgl";

const Journey = dynamic(() => import("./Journey"), { ssr: false });

const REDUCE = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(REDUCE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const canRide = () => hasWebGL() && !window.matchMedia(REDUCE).matches;

/**
 * Fixed layer behind the page: a wine glow, plus the 3D journey where WebGL works
 * and the reader has not asked for reduced motion.
 */
export default function Backdrop() {
  const ride = useSyncExternalStore(subscribe, canRide, () => false);
  return (
    <div className="backdrop pointer-events-none fixed inset-0 -z-10" aria-hidden>
      {ride && <Journey />}
    </div>
  );
}
