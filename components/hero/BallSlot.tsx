"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import BasketballSvg from "./BasketballSvg";
import { hasWebGL } from "@/lib/webgl";

const HeroBall = dynamic(() => import("../three/HeroBall"), { ssr: false });

const subscribe = () => () => {};

/** The still 3D basketball, with an SVG fallback when WebGL is unavailable. */
export default function BallSlot({ className = "" }: { className?: string }) {
  const ok = useSyncExternalStore(subscribe, hasWebGL, () => false);
  return (
    <div className={className} aria-hidden>
      {ok ? <HeroBall /> : <BasketballSvg className="mx-auto mt-16 h-28 w-28" />}
    </div>
  );
}
