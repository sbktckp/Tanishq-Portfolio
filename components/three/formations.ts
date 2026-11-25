/**
 * Particle shapes for the scroll journey. Each returns n points (x, y, z)
 * within a radius of about three units.
 */

const TAU = Math.PI * 2;

/** Deterministic random numbers, so every visit draws the same shapes. */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Point = [number, number, number];
type Shape = (i: number, n: number, rnd: () => number) => Point;

const jitter = (rnd: () => number, amount: number) => (rnd() - 0.5) * amount;

/** Globe */
const sphere: Shape = (i, n) => {
  const y = 1 - (2 * (i + 0.5)) / n;
  const r = Math.sqrt(1 - y * y);
  const a = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(a) * r * 3, y * 3, Math.sin(a) * r * 3];
};

/** Rolling data surface */
const wave: Shape = (i, n) => {
  const cols = Math.ceil(Math.sqrt(n * 2));
  const rows = Math.ceil(n / cols);
  const x = ((i % cols) / (cols - 1) - 0.5) * 11;
  const z = (Math.floor(i / cols) / (rows - 1) - 0.5) * 5;
  return [x, Math.sin(x * 0.9) * 0.5 + Math.cos(z * 1.4) * 0.45 - 1.2, z];
};

/** DNA double helix with its base pairs */
const helix: Shape = (i, _n, rnd) => {
  const rung = rnd() < 0.28;
  const y = rung ? (Math.floor(rnd() * 26) / 25 - 0.5) * 7.4 : (rnd() - 0.5) * 7.4;
  const a = y * 1.7;
  const side = rung ? rnd() * 2 - 1 : i % 2 ? 1 : -1;
  return [
    Math.cos(a) * 1.35 * side + jitter(rnd, 0.1),
    y,
    Math.sin(a) * 1.35 * side + jitter(rnd, 0.1),
  ];
};

/** Crystal lattice: points along the edges of a 3 x 3 x 3 grid */
const lattice: Shape = (i, _n, rnd) => {
  const node = () => (Math.floor(rnd() * 4) - 1.5) * 1.45;
  const p: Point = [node(), node(), node()];
  p[i % 3] = (rnd() - 0.5) * 4.35;
  return p;
};

/** Spiral galaxy */
const spiral: Shape = (i, _n, rnd) => {
  const t = Math.pow(rnd(), 0.75);
  const a = t * TAU * 1.6 + ((i % 3) * TAU) / 3;
  const r = 0.2 + t * 3.3;
  const x = Math.cos(a) * r + jitter(rnd, 0.35);
  const z = Math.sin(a) * r + jitter(rnd, 0.35);
  // tilted toward the camera
  const y = jitter(rnd, 0.25) * (1.2 - t);
  return [x, y * 0.82 - z * 0.57, y * 0.57 + z * 0.82];
};

/** Atom: a dense nucleus and three orbits */
const atom: Shape = (i, n, rnd) => {
  if (i < n * 0.16) {
    const [x, y, z] = sphere(i, Math.ceil(n * 0.16), rnd);
    const k = 0.22 * Math.cbrt(rnd());
    return [x * k, y * k, z * k];
  }
  const a = rnd() * TAU;
  const tilt = ((i % 3) * Math.PI) / 3;
  const x = Math.cos(a) * 3.2;
  const y = Math.sin(a) * 1.05;
  return [
    x * Math.cos(tilt) - y * Math.sin(tilt) + jitter(rnd, 0.06),
    x * Math.sin(tilt) + y * Math.cos(tilt) + jitter(rnd, 0.06),
    Math.sin(a) * 1.4 + jitter(rnd, 0.06),
  ];
};

/** Interwoven knot */
const knot: Shape = (_i, _n, rnd) => {
  const t = rnd() * TAU;
  const r = 2 + Math.cos(3 * t) * 0.9;
  return [
    Math.cos(2 * t) * r + jitter(rnd, 0.28),
    Math.sin(2 * t) * r + jitter(rnd, 0.28),
    Math.sin(3 * t) * 1.2 + jitter(rnd, 0.28),
  ];
};

/** Open ring */
const ring: Shape = (_i, _n, rnd) => {
  const a = rnd() * TAU;
  const b = rnd() * TAU;
  const tube = 0.55 * Math.sqrt(rnd());
  const r = 2.8 + Math.cos(b) * tube;
  return [Math.cos(a) * r, Math.sin(a) * r, Math.sin(b) * tube];
};

/** Funnel of particles winding into the distance */
const vortex: Shape = (i, _n, rnd) => {
  const t = rnd();
  const a = t * TAU * 5 + ((i % 5) * TAU) / 5;
  const r = 0.35 + t * t * 3;
  return [
    Math.cos(a) * r + jitter(rnd, 0.2),
    (t - 0.5) * 6.4,
    Math.sin(a) * r + jitter(rnd, 0.2),
  ];
};

const SHAPES = { sphere, wave, helix, lattice, spiral, atom, knot, ring, vortex };

export type ShapeName = keyof typeof SHAPES;

export function buildShape(name: ShapeName, count: number) {
  const rnd = mulberry32(name.length * 97 + name.charCodeAt(0));
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) out.set(SHAPES[name](i, count, rnd), i * 3);
  return out;
}

/**
 * A word ten units wide: the particles that spell it, and the canvas it was drawn
 * on, so the same lettering can sit solid behind them. Browser only.
 */
export function buildText(text: string, count: number, font: string) {
  const w = 1200;
  const h = 360;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d", { willReadFrequently: true })!;
  g.font = `800 260px ${font}`;
  const px = Math.min(260, (260 * (w - 40)) / g.measureText(text).width);
  g.font = `800 ${px}px ${font}`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  const fill = g.createLinearGradient(0, h / 2 - px / 2, 0, h / 2 + px / 2);
  fill.addColorStop(0, "#f58aa8");
  fill.addColorStop(1, "#c4285a");
  g.fillStyle = fill;
  g.fillText(text, w / 2, h / 2);

  const { data } = g.getImageData(0, 0, w, h);
  const filled: number[] = [];
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (data[(y * w + x) * 4 + 3] > 140) filled.push(x, y);
    }
  }

  const rnd = mulberry32(text.length * 131 + 7);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // A few strays stay loose around the word to give it depth.
    if (!filled.length || rnd() < 0.07) {
      out.set([jitter(rnd, 15), jitter(rnd, 8), jitter(rnd, 7)], i * 3);
      continue;
    }
    const k = Math.floor(rnd() * (filled.length / 2)) * 2;
    out.set(
      [
        ((filled[k] + jitter(rnd, 2) - w / 2) / w) * 10,
        (-(filled[k + 1] + jitter(rnd, 2) - h / 2) / w) * 10,
        jitter(rnd, 0.35),
      ],
      i * 3,
    );
  }
  return { points: out, canvas: c };
}
