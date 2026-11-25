"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { buildShape, buildText, mulberry32 } from "./formations";
import { SCENES } from "./scenes";
import { fragmentShader, vertexShader } from "./shaders";

const PALETTE = ["#e8668a", "#c93a66", "#a81646", "#8a1238", "#f0b6c4"];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => v * v * (3 - 2 * v);
const lerp = THREE.MathUtils.lerp;

/** Shared, per-frame state of the journey. */
type Ride = {
  scene: number;
  speed: number;
  travel: number;
  x: number;
  y: number;
  mouse: boolean;
};

/** Scroll position expressed as a scene number, e.g. 2.5 is halfway from scene 2 to 3. */
function sceneAt(tops: number[]) {
  const h = window.innerHeight;
  const y = window.scrollY;
  const maxY = document.documentElement.scrollHeight - h;
  let scene = 0;
  for (let i = 1; i < tops.length; i++) {
    // The change runs while the next section climbs the screen.
    const start = Math.min(tops[i] - h * 0.85, maxY - h * 0.5);
    scene += clamp01((y - Math.max(0, start)) / (h * 0.65));
  }
  return scene;
}

/** Eases the shared state toward this frame's scroll and pointer. */
function steer(
  r: Ride,
  dt: number,
  moved: number,
  scene: number,
  pointer: { x: number; y: number; mouse: boolean },
) {
  const speed = Math.min(1, moved / (dt * 3200));
  r.speed = lerp(r.speed, speed, 1 - Math.exp(-dt * (speed > r.speed ? 9 : 2.5)));
  r.travel += dt * (0.5 + r.speed * 9);
  r.scene = lerp(r.scene, scene, 1 - Math.exp(-dt * 4));
  r.x = lerp(r.x, pointer.x, 1 - Math.exp(-dt * 5));
  r.y = lerp(r.y, pointer.y, 1 - Math.exp(-dt * 5));
  r.mouse = pointer.mouse;
  return r;
}

/** Reads scroll and pointer once per frame and moves the camera. */
function Pilot({ ride }: { ride: RefObject<Ride> }) {
  const tops = useRef<number[]>([]);
  const lastY = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0, mouse: false });

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
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: 1 - (e.clientY / window.innerHeight) * 2,
        mouse: e.pointerType === "mouse",
      };
    };
    const leave = () => (pointer.current.mouse = false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.05);
    const y = window.scrollY;
    const moved = lastY.current === null ? 0 : Math.abs(y - lastY.current);
    lastY.current = y;
    const r = steer(ride.current, dt, moved, sceneAt(tops.current), pointer.current);

    // The view widens a little as you speed up.
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = 45 + r.speed * 6;
    cam.position.x = r.x * 0.45;
    cam.position.y = r.y * 0.3;
    cam.lookAt(0, 0, 0);
    cam.updateProjectionMatrix();
  });

  return null;
}

function Particles({ count, ride }: { count: number; ride: RefObject<Ride> }) {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const cage = useRef<THREE.Group>(null);
  const lettering = useRef<THREE.Group>(null);
  const segment = useRef(-1);
  const born = useRef<number | null>(null);

  const { shapes, words, geometry, uniforms, cages } = useMemo(() => {
    const font = getComputedStyle(document.body).fontFamily;
    const words: { scene: number; texture: THREE.CanvasTexture }[] = [];
    const shapes = SCENES.map((s, scene) => {
      if (typeof s.shape === "string") {
        return new THREE.BufferAttribute(buildShape(s.shape, count), 3);
      }
      const { points, canvas } = buildText(s.shape.text, count, font);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      words.push({ scene, texture });
      return new THREE.BufferAttribute(points, 3);
    });

    const rnd = mulberry32(5);
    const seed = new Float32Array(count * 4);
    const tint = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      seed.set([rnd(), rnd(), rnd(), rnd()], i * 4);
      color.set(PALETTE[Math.floor(rnd() * PALETTE.length)]).toArray(tint, i * 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", shapes[0]);
    geometry.setAttribute("target", shapes[1]);
    geometry.setAttribute("seed", new THREE.BufferAttribute(seed, 4));
    geometry.setAttribute("tint", new THREE.BufferAttribute(tint, 3));

    const uniforms = {
      uMix: { value: 0 },
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uSpeed: { value: 0 },
      uSize: { value: 3.6 },
      uOpacity: { value: 1 },
      uPixelRatio: { value: 1 },
      uAspect: { value: 1 },
      uMouse: { value: new THREE.Vector2(9, 9) },
    };

    const cages = [4.1, 4.7].map((radius, i) => {
      const solid = new THREE.IcosahedronGeometry(radius, i);
      const edges = new THREE.EdgesGeometry(solid);
      solid.dispose();
      return edges;
    });

    return { shapes, words, geometry, uniforms, cages };
  }, [count]);

  useEffect(() => {
    // Tells the page that the particles are drawing the big words.
    document.documentElement.dataset.journey = "on";
    return () => {
      delete document.documentElement.dataset.journey;
      geometry.dispose();
      cages.forEach((c) => c.dispose());
      words.forEach((w) => w.texture.dispose());
    };
  }, [geometry, cages, words]);

  useFrame(({ clock, viewport, gl }) => {
    const g = group.current;
    const p = points.current;
    const m = material.current;
    if (!g || !p || !m) return;
    const r = ride.current;
    const t = clock.elapsedTime;
    born.current ??= t;

    const last = SCENES.length - 1;
    const a = Math.min(last - 1, Math.floor(r.scene));
    const f = clamp01(r.scene - a);
    if (segment.current !== a) {
      segment.current = a;
      p.geometry.setAttribute("position", shapes[a]);
      p.geometry.setAttribute("target", shapes[a + 1]);
    }

    const from = SCENES[a];
    const to = SCENES[a + 1];
    const k = smooth(f);
    const narrow = viewport.aspect < 0.9;
    const word = lerp(from.spin, to.spin, k);

    const u = m.uniforms;
    u.uMix.value = f;
    u.uTime.value = t;
    u.uIntro.value = smooth(clamp01((t - born.current) / 2.4));
    u.uSpeed.value = r.speed;
    u.uPixelRatio.value = gl.getPixelRatio();
    u.uAspect.value = viewport.aspect;
    u.uMouse.value.set(r.mouse ? r.x : 9, r.mouse ? r.y : 9);
    u.uSize.value = narrow ? 2.8 : lerp(3.9, 3.4, word);
    // Words stay bright on phones; background shapes dim so text reads clearly.
    u.uOpacity.value = lerp(from.glow, to.glow, k) * (narrow ? lerp(1, 0.45, word) : lerp(1.15, 0.8, word));

    // Once the particles have gathered, the solid word fades in behind them.
    lettering.current?.children.forEach((child, i) => {
      const away = Math.abs(r.scene - words[i].scene);
      const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      material.opacity = smooth(clamp01((0.55 - away) / 0.4)) * u.uIntro.value;
      child.visible = material.opacity > 0.001;
    });

    // Fit words (ten units wide) inside any screen.
    const fit = (s: (typeof SCENES)[number]) => {
      if (typeof s.shape !== "string") return Math.min(s.size, (viewport.width * 0.9) / 10);
      return narrow ? 0.7 : s.size;
    };
    g.scale.setScalar(lerp(fit(from), fit(to), k));
    g.position.x = narrow ? 0 : lerp(from.x, to.x, k) * viewport.width;
    g.rotation.y = (Math.sin(t * 0.16) * 0.7 + r.scene * 0.18) * word + r.x * 0.22;
    g.rotation.x = Math.sin(t * 0.12) * 0.12 * word - r.y * 0.14;

    if (cage.current) {
      cage.current.rotation.set(t * 0.09, t * 0.13 + r.travel * 0.02, 0);
      cage.current.scale.setScalar(0.92 + Math.sin(f * Math.PI) * 0.25);
      cage.current.children.forEach((child, i) => {
        const line = (child as THREE.LineSegments).material as THREE.LineBasicMaterial;
        line.opacity = word * (i ? 0.035 : 0.08) * u.uIntro.value * (narrow ? 0.6 : 1);
      });
    }
  });

  return (
    <group ref={group}>
      <group ref={lettering}>
        {words.map((w) => (
          <mesh key={w.scene} position={[0, 0, -0.05]} renderOrder={-1} visible={false}>
            <planeGeometry args={[10, 3]} />
            <meshBasicMaterial
              map={w.texture}
              transparent
              opacity={0}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
      <points ref={points} geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <group ref={cage}>
        {cages.map((geo, i) => (
          <lineSegments key={i} geometry={geo}>
            <lineBasicMaterial
              color={i ? "#ff8fab" : "#e0245e"}
              transparent
              opacity={0}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </lineSegments>
        ))}
      </group>
    </group>
  );
}

const DEPTH = 40;

/** Distant stars drifting past; they stretch slightly as you scroll. */
function Warp({ count, ride }: { count: number; ride: RefObject<Ride> }) {
  const ref = useRef<THREE.LineSegments>(null);
  const { stars, geometry } = useMemo(() => {
    const rnd = mulberry32(29);
    const stars = Array.from({ length: count }, () => {
      const a = rnd() * Math.PI * 2;
      const radius = 2.5 + rnd() * 14;
      return [Math.cos(a) * radius, Math.sin(a) * radius * 0.7, rnd() * DEPTH] as const;
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 6), 3));
    return { stars, geometry };
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    const line = ref.current;
    if (!line) return;
    const r = ride.current;
    const attr = line.geometry.attributes.position as THREE.BufferAttribute;
    const pos = attr.array as Float32Array;
    const length = 0.05 + r.speed * 1.4;
    stars.forEach(([x, y, offset], i) => {
      const z = ((offset + r.travel) % DEPTH) - DEPTH + 9;
      pos.set([x, y, z, x, y, z - length], i * 6);
    });
    attr.needsUpdate = true;
    (line.material as THREE.LineBasicMaterial).opacity = 0.28 + r.speed * 0.22;
  });

  return (
    <lineSegments ref={ref} geometry={geometry} frustumCulled={false}>
      <lineBasicMaterial
        color="#ff9db5"
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

const RINGS = 14;

/** A tunnel of hexagons that you fly through. */
function Tunnel({ ride }: { ride: RefObject<Ride> }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * 9, Math.sin(a) * 9, 0);
    });
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    const r = ride.current;
    group.current?.children.forEach((ring, i) => {
      const along = ((i * (DEPTH / RINGS) + r.travel * 0.55) % DEPTH) / DEPTH;
      ring.position.z = along * DEPTH - DEPTH + 6;
      ring.rotation.z = i * 0.16 + r.scene * 0.5 + r.travel * 0.012;
      const material = (ring as THREE.LineLoop).material as THREE.LineBasicMaterial;
      // Fade in from the distance and out before reaching the reader.
      material.opacity = Math.sin(along * Math.PI) * (0.07 + r.speed * 0.1);
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: RINGS }, (_, i) => (
        <lineLoop key={i} geometry={geometry}>
          <lineBasicMaterial
            color="#d6245a"
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineLoop>
      ))}
    </group>
  );
}

export default function Journey() {
  const ride = useRef<Ride>({ scene: 0, speed: 0, travel: 0, x: 0, y: 0, mouse: false });
  // Loaded in the browser only, so window is available here.
  const phone = window.innerWidth < 768;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: false, alpha: true }}
    >
      <Pilot ride={ride} />
      <Tunnel ride={ride} />
      <Warp count={phone ? 140 : 320} ride={ride} />
      <Particles count={phone ? 5000 : 12000} ride={ride} />
    </Canvas>
  );
}
