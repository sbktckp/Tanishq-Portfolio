"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { hasWebGL } from "@/lib/webgl";

const Journey = dynamic(() => import("./Journey"), { ssr: false });

const subscribe = () => () => {};

/** Fixed layer behind the page: a wine glow, plus the 3D journey where WebGL works. */
export default function Backdrop() {
  const ok = useSyncExternalStore(subscribe, hasWebGL, () => false);
  return (
    <div className="backdrop pointer-events-none fixed inset-0 -z-10" aria-hidden>
      {ok && <Journey />}
    </div>
  );
}
