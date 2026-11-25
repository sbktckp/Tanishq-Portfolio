import type { ShapeName } from "./formations";

/**
 * The journey, in page order. Each entry belongs to the page element with the
 * same id.
 *  x     horizontal position, as a fraction of the screen width
 *  glow  particle brightness
 *  spin  how much the shape rotates (0 keeps words facing the reader)
 *  size  scale of the shape
 */
export type Scene = {
  id: string;
  shape: ShapeName | { text: string };
  x: number;
  glow: number;
  spin: number;
  size: number;
};

export const SCENES: Scene[] = [
  { id: "hero", shape: "sphere", x: 0.23, glow: 0.8, spin: 1, size: 1.2 },
  { id: "figures", shape: "wave", x: 0, glow: 0.6, spin: 0.35, size: 1.35 },
  { id: "act-questions", shape: { text: "4,500" }, x: 0, glow: 1, spin: 0, size: 1.25 },
  { id: "about", shape: "helix", x: 0.35, glow: 0.7, spin: 1, size: 1.15 },
  { id: "act-lead", shape: { text: "LEAD" }, x: 0, glow: 1, spin: 0, size: 1.25 },
  { id: "roles", shape: "lattice", x: -0.35, glow: 0.6, spin: 1, size: 1.15 },
  { id: "experience", shape: "spiral", x: -0.33, glow: 0.65, spin: 0.8, size: 1.3 },
  { id: "act-exams", shape: { text: "NEET · JEE" }, x: 0, glow: 1, spin: 0, size: 1.4 },
  { id: "expertise", shape: "atom", x: -0.35, glow: 0.65, spin: 1, size: 1.15 },
  { id: "achievements", shape: "knot", x: -0.34, glow: 0.7, spin: 1, size: 1.15 },
  { id: "education", shape: "vortex", x: 0.35, glow: 0.65, spin: 0.7, size: 1.2 },
  { id: "contact", shape: "ring", x: 0.24, glow: 1, spin: 0.8, size: 1.3 },
];
