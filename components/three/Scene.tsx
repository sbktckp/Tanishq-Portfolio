"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, type RefObject } from "react";

const ORANGE = "#f7931e";
const DEEP = "#f05a1a";
const SKY = "#2aace2";
const TEAL = "#2e7d8f";
const COLORS = [ORANGE, SKY, TEAL, DEEP];

type Mouse = RefObject<{ x: number; y: number }>;

/** Small deterministic PRNG so the scene layout is stable between renders. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ */
/* Atom that orbits the hero portrait (tracks the DOM element's rect) */
/* ------------------------------------------------------------------ */

function Ring({
  radius,
  tilt,
  speed,
  color,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
}) {
  const pivot = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (pivot.current) pivot.current.rotation.z += dt * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 12, 180]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      <group ref={pivot}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

function Atom({ mouse }: { mouse: Mouse }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const viewport = useThree((s) => s.viewport);

  useFrame((_, dt) => {
    const el = document.getElementById("hero-anchor");
    if (!el || !group.current || !spin.current || !shell.current) return;
    const r = el.getBoundingClientRect();
    const W = window.innerWidth;
    const H = window.innerHeight;
    const x = ((r.left + r.width / 2) / W - 0.5) * viewport.width;
    const y = -((r.top + r.height / 2) / H - 0.5) * viewport.height;
    const k = W < 640 ? 0.8 : 1;
    group.current.position.set(x, y, 0);
    group.current.scale.setScalar((r.width / W) * viewport.width * k);

    spin.current.rotation.y += dt * 0.25;
    spin.current.rotation.x = THREE.MathUtils.lerp(spin.current.rotation.x, mouse.current.y * 0.5, 0.05);
    spin.current.rotation.z = THREE.MathUtils.lerp(spin.current.rotation.z, -mouse.current.x * 0.3, 0.05);
    shell.current.rotation.y -= dt * 0.12;
    shell.current.rotation.x += dt * 0.07;
  });

  return (
    <group ref={group}>
      <group ref={spin}>
        <Ring radius={0.88} tilt={[1.1, 0, 0.2]} speed={0.9} color={ORANGE} />
        <Ring radius={0.98} tilt={[1.25, 1.05, 0.5]} speed={-0.7} color={SKY} />
        <Ring radius={1.08} tilt={[0.9, 2.1, 1.0]} speed={0.55} color={TEAL} />
        <Ring radius={0.78} tilt={[1.5, 0.5, 2.0]} speed={-1.1} color={DEEP} />
      </group>
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial color={SKY} wireframe transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Starfield / particle dust with scroll + mouse parallax              */
/* ------------------------------------------------------------------ */

function Particles({ mouse, count = 1800 }: { mouse: Mouse; count?: number }) {
  const group = useRef<THREE.Group>(null);
  const viewport = useThree((s) => s.viewport);

  const { positions, colors } = useMemo(() => {
    const rng = mulberry32(42);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [ORANGE, SKY, "#ffffff", TEAL].map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rng() - 0.5) * 26;
      positions[i * 3 + 1] = -rng() * 60 + 6;
      positions[i * 3 + 2] = (rng() - 0.5) * 14 - 3;
      const c = palette[Math.floor(rng() * palette.length)];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;
    const scrollWorld = window.scrollY * (viewport.height / window.innerHeight);
    group.current.position.y = scrollWorld * 0.55;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mouse.current.x * -0.4, 0.04);
    group.current.rotation.y = state.clock.elapsedTime * 0.02 + window.scrollY * 0.0003;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Floating geometric "molecules" that drift past as you scroll        */
/* ------------------------------------------------------------------ */

const rng = mulberry32(7);
const SHAPES = Array.from({ length: 18 }, (_, i) => ({
  kind: i % 4,
  x: (rng() - 0.5) * 13,
  y: -(i * 1.55 + rng()),
  z: -1 - rng() * 5,
  s: 0.22 + rng() * 0.35,
  color: COLORS[i % 4],
  wire: i % 2 === 1,
}));

function Shape({ kind }: { kind: number }) {
  switch (kind) {
    case 0:
      return <octahedronGeometry args={[1, 0]} />;
    case 1:
      return <icosahedronGeometry args={[1, 0]} />;
    case 2:
      return <tetrahedronGeometry args={[1.1, 0]} />;
    default:
      return <torusGeometry args={[0.8, 0.28, 16, 32]} />;
  }
}

function Floaters({ mouse }: { mouse: Mouse }) {
  const group = useRef<THREE.Group>(null);
  const viewport = useThree((s) => s.viewport);

  useFrame(() => {
    if (!group.current) return;
    const scrollWorld = window.scrollY * (viewport.height / window.innerHeight);
    group.current.position.y = scrollWorld * 0.85;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mouse.current.x * 0.6, 0.05);
  });

  return (
    <group ref={group}>
      {SHAPES.map((s, i) => (
        <Float key={i} speed={1.2 + (i % 3) * 0.4} rotationIntensity={1.4} floatIntensity={1.6}>
          <mesh position={[s.x, s.y, s.z]} scale={s.s}>
            <Shape kind={s.kind} />
            <meshStandardMaterial
              color={s.color}
              metalness={0.5}
              roughness={0.3}
              flatShading
              wireframe={s.wire}
              transparent
              opacity={s.wire ? 0.7 : 0.9}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */

export default function Scene() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#06121d", 7, 17]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.6} color={ORANGE} />
        <pointLight position={[-6, -3, 3]} intensity={30} color={SKY} />
        <Atom mouse={mouse} />
        <Particles mouse={mouse} />
        <Floaters mouse={mouse} />
      </Canvas>
    </div>
  );
}
