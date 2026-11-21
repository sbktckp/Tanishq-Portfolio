"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Highlighter-pen swipe behind a phrase. */
export default function Mark({ children }: { children: ReactNode }) {
  return (
    <motion.mark
      initial={{ backgroundSize: "0% 62%" }}
      whileInView={{ backgroundSize: "100% 62%" }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
      className="px-0.5 text-inherit"
      style={{
        backgroundImage: "linear-gradient(rgba(233,163,180,0.7), rgba(233,163,180,0.7))",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 88%",
        backgroundColor: "transparent",
      }}
    >
      {children}
    </motion.mark>
  );
}
