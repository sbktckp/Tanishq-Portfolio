"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

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
  base.addColorStop(0, "#b52a4a");
  base.addColorStop(0.5, "#a3223f");
  base.addColorStop(1, "#8c1b35");
  g.fillStyle = base;
  g.fillRect(0, 0, w, h);

  const rng = mulberry32(11);
  for (let i = 0; i < 14000; i++) {
    const x = rng() * w;
    const y = rng() * h;
    g.fillStyle = rng() > 0.5 ? "rgba(40,0,12,0.28)" : "rgba(255,190,205,0.16)";
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

const FLOOR = -1.25;

function Ball() {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const shadow = useRef<THREE.Mesh>(null);
  const tex = useMemo(() => makeTexture(), []);
  const st = useRef({ phase: 0, amp: 0.9, vx: 0, vy: 0.9, down: false, lx: 0, ly: 0, moved: 0 });

  useFrame((_, dt) => {
    const s = st.current;
    if (!group.current || !mesh.current || !shadow.current) return;
    s.phase += dt * 3.3;
    s.amp += (0.9 - s.amp) * Math.min(1, dt * 1.6);
    const h = Math.abs(Math.sin(s.phase));
    group.current.position.y = FLOOR + h * s.amp * 1.7;

    const squash = h < 0.14 ? 0.8 + (h / 0.14) * 0.2 : 1;
    group.current.scale.set(1 / Math.sqrt(squash), squash, 1 / Math.sqrt(squash));

    if (!s.down) {
      s.vy += (0.9 - s.vy) * Math.min(1, dt * 1.2);
      s.vx += (0 - s.vx) * Math.min(1, dt * 1.2);
    }
    mesh.current.rotation.y += s.vy * dt;
    mesh.current.rotation.x += s.vx * dt;

    const k = 1 - h * 0.45;
    shadow.current.scale.set(k, k, k);
    (shadow.current.material as THREE.MeshBasicMaterial).opacity = 0.32 * (1 - h * 0.7);
  });

  return (
    <>
      <group ref={group}>
        <mesh
          ref={mesh}
          onPointerDown={(e) => {
            const s = st.current;
            s.down = true;
            s.moved = 0;
            s.lx = e.nativeEvent.clientX;
            s.ly = e.nativeEvent.clientY;
            const move = (ev: PointerEvent) => {
              const dx = ev.clientX - s.lx;
              const dy = ev.clientY - s.ly;
              s.lx = ev.clientX;
              s.ly = ev.clientY;
              s.moved += Math.abs(dx) + Math.abs(dy);
              if (mesh.current) {
                mesh.current.rotation.y += dx * 0.012;
                mesh.current.rotation.x += dy * 0.012;
              }
              s.vy = dx * 0.6;
              s.vx = dy * 0.6;
            };
            const up = () => {
              s.down = false;
              if (s.moved < 5) s.amp = 1.45; // a click is a jump
              window.removeEventListener("pointermove", move);
              window.removeEventListener("pointerup", up);
            };
            window.addEventListener("pointermove", move);
            window.addEventListener("pointerup", up);
          }}
        >
          <sphereGeometry args={[0.85, 64, 64]} />
          <meshStandardMaterial map={tex} roughness={0.78} metalness={0} />
        </mesh>
      </group>
      <mesh ref={shadow} rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR - 0.85, 0]}>
        <circleGeometry args={[0.75, 32]} />
        <meshBasicMaterial color="#3b0d1f" transparent opacity={0.3} depthWrite={false} />
      </mesh>
    </>
  );
}

export default function HeroBall() {
  return (
    <Canvas
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
