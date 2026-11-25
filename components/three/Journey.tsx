"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { buildShape, mulberry32, type ShapeName } from "./formations";

/**
 * One scene per page section, in page order. `x` is the horizontal position as a
 * fraction of the screen width; `glow` is how bright the particles are there.
 */
const SCENES: { id: string; shape: ShapeName; x: number; glow: number }[] = [
  { id: "hero", shape: "sphere", x: 0.24, glow: 0.75 },
  { id: "figures", shape: "wave", x: 0, glow: 0.55 },
  { id: "about", shape: "helix", x: 0.36, glow: 0.6 },
  { id: "roles", shape: "lattice", x: -0.34, glow: 0.45 },
  { id: "experience", shape: "spiral", x: -0.32, glow: 0.5 },
  { id: "expertise", shape: "atom", x: -0.33, glow: 0.55 },
  { id: "achievements", shape: "knot", x: -0.34, glow: 0.55 },
  { id: "education", shape: "helix", x: 0.36, glow: 0.5 },
  { id: "contact", shape: "ring", x: 0.25, glow: 0.8 },
];

const PALETTE = ["#ff8fab", "#d6355f", "#a3143c", "#f4d3da"];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => v * v * (3 - 2 * v);

/** Soft round dot used for every particle. */
function makeSprite() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.75)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

/** Scroll position expressed as a scene number, e.g. 2.5 is halfway from scene 2 to 3. */
function sceneAt(tops: number[]) {
  const h = window.innerHeight;
  const y = window.scrollY;
  const maxY = document.documentElement.scrollHeight - h;
  let scene = 0;
  for (let i = 1; i < tops.length; i++) {
    // The morph runs while the next section climbs the screen.
    const start = Math.min(tops[i] - h * 0.85, maxY - h * 0.5);
    scene += clamp01((y - Math.max(0, start)) / (h * 0.6));
  }
  return scene;
}

function Particles({ count, still }: { count: number; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);
  const tops = useRef<number[]>([]);
  const current = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const width = useThree((s) => s.viewport.width);

  const { shapes, colors, delays, start, sprite } = useMemo(() => {
    const rnd = mulberry32(5);
    const colors = new Float32Array(count * 3);
    const delays = new Float32Array(count);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      color.set(PALETTE[Math.floor(rnd() * PALETTE.length)]);
      color.toArray(colors, i * 3);
      delays[i] = rnd();
    }
    const shapes = SCENES.map((s) => buildShape(s.shape, count));
    return { shapes, colors, delays, start: shapes[0].slice(), sprite: makeSprite() };
  }, [count]);

  useEffect(() => {
    const measure = () => {
      tops.current = SCENES.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.current.x = e.clientX / window.innerWidth - 0.5;
      pointer.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, []);

  useFrame(({ clock }, delta) => {
    const g = group.current;
    const p = points.current;
    if (!g || !p) return;
    const dt = Math.min(delta, 0.05);

    const target = still ? 0 : sceneAt(tops.current);
    const first = current.current === null;
    const scene = first
      ? target
      : current.current! + (target - current.current!) * (1 - Math.exp(-dt * 3.5));
    current.current = scene;

    const a = Math.min(SCENES.length - 1, Math.floor(scene));
    const b = Math.min(SCENES.length - 1, a + 1);
    const f = scene - a;

    const from = shapes[a];
    const to = shapes[b];
    const attr = p.geometry.attributes.position as THREE.BufferAttribute;
    const pos = attr.array as Float32Array;
    const t = still ? 0 : clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      // Particles set off at slightly different moments, which reads as a flow.
      const k = smooth(clamp01((f - delays[i] * 0.35) / 0.65));
      const drift = Math.sin(t * 0.7 + delays[i] * 40) * 0.035;
      for (let j = i * 3; j < i * 3 + 3; j++) pos[j] = from[j] + (to[j] - from[j]) * k + drift;
    }
    attr.needsUpdate = true;

    const narrow = width < 8;
    const mix = smooth(f);
    const x = narrow ? 0 : (SCENES[a].x + (SCENES[b].x - SCENES[a].x) * mix) * width;
    const glow = SCENES[a].glow + (SCENES[b].glow - SCENES[a].glow) * mix;
    (p.material as THREE.PointsMaterial).opacity = glow * (still ? 0.45 : narrow ? 0.55 : 1);

    g.position.x = x;
    g.scale.setScalar(narrow ? 0.68 : 1);
    // A gentle sway, so flat shapes such as the ring never turn edge-on.
    g.rotation.y = Math.sin(t * 0.14) * 0.55 + scene * 0.12 + pointer.current.x * 0.25;
    g.rotation.x = Math.sin(t * 0.11) * 0.08 + pointer.current.y * 0.15;
  });

  return (
    <group ref={group}>
      <points ref={points} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[start, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          size={0.075}
          sizeAttenuation
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/** Faint distant dust that gives the scene its depth. */
function Dust({ still }: { still: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rnd = mulberry32(29);
    const out = new Float32Array(420 * 3);
    for (let i = 0; i < out.length; i += 3) {
      out.set([(rnd() - 0.5) * 30, (rnd() - 0.5) * 18, -3 - rnd() * 10], i);
    }
    return out;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current || still) return;
    // The dust slides up as the page scrolls, like travelling past it.
    ref.current.position.y = Math.min(4, window.scrollY * 0.0006);
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#e8849d" size={0.04} transparent opacity={0.35} depthWrite={false} />
    </points>
  );
}

export default function Journey() {
  // Loaded in the browser only, so window is available here.
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = window.innerWidth < 768 ? 1600 : 3200;

  return (
    <Canvas
      frameloop={still ? "demand" : "always"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: false, alpha: true }}
    >
      <Particles count={count} still={still} />
      <Dust still={still} />
    </Canvas>
  );
}
