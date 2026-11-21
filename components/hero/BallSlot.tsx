"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import BasketballSvg from "../fx/BasketballSvg";

const HeroBall = dynamic(() => import("../three/HeroBall"), { ssr: false });

function webgl() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const subscribe = () => () => {};

/** The interactive 3D basketball, with a static SVG fallback when WebGL is unavailable. */
export default function BallSlot({ className = "" }: { className?: string }) {
  const ok = useSyncExternalStore(subscribe, webgl, () => false);
  return (
    <div
      data-cursor="spin"
      className={`${className}`}
      style={{ touchAction: "pan-y" }}
      aria-label="Basketball. Drag to spin, click to bounce."
    >
      {ok ? <HeroBall /> : <BasketballSvg className="mx-auto mt-16 h-28 w-28" />}
    </div>
  );
}
