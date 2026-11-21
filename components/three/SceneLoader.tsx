"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

function canRender3D() {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !!gl && !reduce;
  } catch {
    return false;
  }
}

const subscribe = () => () => {};

/** Mounts the 3D scene only on the client, when WebGL works and motion is allowed. */
export default function SceneLoader() {
  const ok = useSyncExternalStore(subscribe, canRender3D, () => false);
  return ok ? <Scene /> : null;
}
