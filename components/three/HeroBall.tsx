"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react";

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

/** Procedural basketball skin: pebbled orange leather + black channel seams (equirectangular). */
function makeTexture() {
  const w = 2048;
  const h = 1024;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;

  const base = g.createLinearGradient(0, 0, 0, h);
  base.addColorStop(0, "#f59a2c");
  base.addColorStop(0.5, "#f08a1c");
  base.addColorStop(1, "#e57712");
  g.fillStyle = base;
  g.fillRect(0, 0, w, h);

  const rng = mulberry32(11);
  for (let i = 0; i < 14000; i++) {
    const x = rng() * w;
    const y = rng() * h;
    g.fillStyle = rng() > 0.5 ? "rgba(110,40,0,0.22)" : "rgba(255,210,150,0.16)";
    g.beginPath();
    g.arc(x, y, 1.4 + rng() * 1.6, 0, Math.PI * 2);
    g.fill();
  }

  g.strokeStyle = "#1b0509";
  g.lineCap = "round";
  g.lineWidth = 15;
  // equator
  g.beginPath();
  g.moveTo(0, h / 2);
  g.lineTo(w, h / 2);
  g.stroke();
  // pole-to-pole channel (wraps at both texture edges + middle)
  for (const x of [0, w / 2, w]) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, h);
    g.stroke();
  }
  // curved side channels
  for (const [u, dir] of [
    [0.25, -1],
    [0.75, 1],
  ] as const) {
    g.beginPath();
    for (let s = 0; s <= 64; s++) {
      const v = s / 64;
      const x = (u + dir * 0.1 * Math.cos(Math.PI * (v - 0.5))) * w;
      if (s === 0) g.moveTo(x, v * h);
      else g.lineTo(x, v * h);
    }
    g.stroke();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function Ball() {
  const tex = useMemo(() => makeTexture(), []);
  return (
    <mesh position={[0, 0.1, 0]} rotation={[0.1, -Math.PI / 2 + 0.1, 0]}>
      <sphereGeometry args={[0.85, 64, 64]} />
      <meshStandardMaterial map={tex} roughness={0.78} metalness={0} />
    </mesh>
  );
}

export default function HeroBall() {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      camera={{ position: [0, 0.9, 7.6], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, -0.3, 0)}
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[3, 5, 5]} intensity={2.1} />
      <directionalLight position={[-4, 1, -2]} intensity={0.6} color="#ffb3c1" />
      <Ball />
    </Canvas>
  );
}
