/**
 * Particle morph, run on the graphics card. `position` holds the current shape
 * and `target` the next one.
 */
export const vertexShader = /* glsl */ `
  attribute vec3 target;
  attribute vec4 seed;
  attribute vec3 tint;

  uniform float uMix;
  uniform float uTime;
  uniform float uIntro;
  uniform float uSpeed;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uAspect;
  uniform vec2 uMouse;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Particles leave at slightly different moments, so the change flows.
    float k = clamp((uMix - seed.x * 0.4) / 0.6, 0.0, 1.0);
    k = k * k * (3.0 - 2.0 * k);
    vec3 p = mix(position, target, k);

    // Burst and swirl while travelling between shapes.
    float burst = sin(k * 3.14159265);
    vec3 dir = normalize(seed.yzw - 0.5);
    p += dir * burst * (0.5 + seed.x * 1.2);
    float a = burst * (seed.y - 0.35) * 1.3;
    p.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * p.xz;

    // Opening: everything gathers from far away.
    float away = 1.0 - uIntro;
    p += dir * away * away * 16.0;

    // Constant gentle life.
    p += 0.045 * vec3(
      sin(uTime * 0.9 + seed.y * 40.0),
      cos(uTime * 0.8 + seed.z * 40.0),
      sin(uTime * 0.7 + seed.w * 40.0)
    ) * (1.0 + uSpeed * 2.0);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // Part around the cursor.
    vec2 ndc = gl_Position.xy / gl_Position.w;
    vec2 away2 = (ndc - uMouse) * vec2(uAspect, 1.0);
    float d = length(away2);
    float push = smoothstep(0.26, 0.0, d);
    ndc += (away2 / max(d, 0.001)) * push * 0.08 / vec2(uAspect, 1.0);
    gl_Position.xy = ndc * gl_Position.w;

    float spark = step(0.985, seed.w);
    float twinkle = 0.88 + 0.12 * sin(uTime * (0.6 + seed.z) + seed.y * 30.0);
    float size = uSize * (0.55 + seed.z * 0.9) * (1.0 + spark * 1.0);
    gl_PointSize = size * uPixelRatio * (10.0 / -mv.z) * (1.0 + push * 0.5);

    vColor = mix(tint, vec3(1.0, 0.86, 0.9), max(push * 0.6, burst * 0.15));
    vAlpha = twinkle * (0.8 + spark * 0.2);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float core = smoothstep(0.22, 0.0, d);
    float halo = smoothstep(0.5, 0.0, d);
    float a = (halo * halo * 0.45 + core * 0.85) * vAlpha * uOpacity;
    gl_FragColor = vec4(vColor + core * 0.08, a);
  }
`;
