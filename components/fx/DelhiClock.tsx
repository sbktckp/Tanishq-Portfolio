"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
};
const snapshot = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

/** Live local time in Delhi. */
export default function DelhiClock() {
  const t = useSyncExternalStore(subscribe, snapshot, () => "--:--");
  return (
    <span className="font-mono text-sm">
      <span className="blink mr-2 inline-block h-2 w-2 rounded-full bg-sun" />
      Delhi {t} IST
    </span>
  );
}
