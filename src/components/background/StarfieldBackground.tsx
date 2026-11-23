import { useEffect, useRef, useState } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  NormalBlending,
  OrthographicCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";

/*
 * Starfield background — a faithful port of the nareshkhatri.dev backdrop,
 * rebuilt on this project's Three.js layer.
 *
 * Reference values, kept 1:1:
 *   gradient   #020817 base + linear-gradient(to top left, #000, zinc-600/20, #000)
 *   particles  100 on desktop, 30 at ≤768px · DPR capped at 2 / 1.5
 *   size       half 0.1px specks, half 1.1px stars · pure white · alpha 0.1–0.7
 *   drift      ±0.1px per frame (60fps equivalent)
 *   cursor     magnetism 0.1–4.1 · staticity 50 · ease 50
 *   edges      20px fade, then the particle wraps back into view
 *
 * Framework upgrades layered on top:
 *   - round, anti-aliased points drawn in the fragment shader (no texture)
 *   - Z-depth drives star size *and* parallax distance (perspective)
 *   - scroll parallax is boosted 1.5× for a deeper sense of travel
 *   - damped scroll parallax with a cushioned stop, read straight from scrollY,
 *     so any number of sections can be appended without touching this loop
 *
 * VISUAL TWEAKS FOR BEGINNERS
 *   STAR_RADIUS          → make every star bigger or smaller
 *   DESKTOP_COUNT        → number of stars on large screens
 *   PARALLAX_MULTIPLIER  → how strongly the sky follows the scroll (1.5 = current)
 */

const DESKTOP_COUNT = 100;
const MOBILE_COUNT = 30;
const MOBILE_QUERY = "(max-width: 768px)";

const STAR_RADIUS = 1.1; // CSS px at depth 1 — the reference "big" particle
const STATICITY = 50;
const EDGE_FADE = 20;
const FIELD_MARGIN = 32;
/* ✏️ EDIT: the original travel was 0.07. 1.5 makes the background move 50%
   faster than the original relative to the visitor's scroll distance. */
const BASE_PARALLAX_SPEED = 0.07;
const PARALLAX_SPEED_MULTIPLIER = 1.5;
const SCROLL_PARALLAX = BASE_PARALLAX_SPEED * PARALLAX_SPEED_MULTIPLIER;
const MOUSE_EASE = 1.2122; // = reference ease (1/50 per frame) made frame-rate independent
const SCROLL_EASE = 3.1;
const INTRO_SECONDS = 0.9;

const glsl = (value: number) => value.toFixed(4);

type Star = {
  x: number; // normalised origin across the wrapped field
  y: number;
  depth: number; // 1 = reference star plane, larger = further away
  alpha: number;
  magnet: number;
  dx: number; // CSS px per second
  dy: number;
};

function createStars(count: number): Star[] {
  return Array.from({ length: count }, () => {
    // Reference: Math.floor(Math.random() * 2) + 0.1 → a 0.1px speck or a 1.1px star.
    // Here that split becomes two depth bands, and size is derived from depth.
    const isNear = Math.random() < 0.5;
    const depth = isNear ? 0.88 + Math.random() * 0.3 : 8 + Math.random() * 6;

    return {
      x: Math.random(),
      y: Math.random(),
      depth,
      alpha: Math.round((Math.random() * 0.6 + 0.1) * 10) / 10,
      magnet: isNear ? 1 + Math.random() * 3.1 : 0.1 + Math.random() * 1.4,
      dx: (Math.random() - 0.5) * 0.2 * 60,
      dy: (Math.random() - 0.5) * 0.2 * 60,
    };
  });
}

const VERTEX_SHADER = /* glsl */ `
  uniform vec2 uViewport;
  uniform float uPixelRatio;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform float uIntro;

  attribute vec2 aDrift;
  attribute float aAlpha;
  attribute float aMagnet;

  varying float vAlpha;
  varying float vPointSize;
  varying float vDiscRadius;

  void main() {
    // position.xy = normalised origin, position.z = depth.
    float depth = position.z;
    vec2 field = uViewport + vec2(${glsl(FIELD_MARGIN * 2)});

    // Cursor magnetism, identical to the reference: mouse / (staticity / magnetism).
    vec2 magnet = uMouse * (aMagnet / ${glsl(STATICITY)});

    // Perspective parallax: a camera panning with the damped scroll value
    // shifts every star by distance / depth, so nearer stars travel further.
    vec2 parallax = vec2(0.0, -uScroll * ${glsl(SCROLL_PARALLAX)} / depth);

    // Wrap inside a slightly oversized field: an endless sky for endless pages.
    vec2 p = position.xy * field + aDrift * uTime + magnet + parallax;
    p = mod(p, field) - vec2(${glsl(FIELD_MARGIN)});

    // Size scales with Z-depth — near stars are larger, far ones are specks.
    float radius = ${glsl(STAR_RADIUS)} / depth;

    // 20px edge fade so particles dissolve out and back in instead of popping.
    float edge = min(min(p.x, uViewport.x - p.x), min(p.y, uViewport.y - p.y)) - radius;
    float edgeFade = clamp(edge / ${glsl(EDGE_FADE)}, 0.0, 1.0);

    gl_Position = vec4(
      p.x / uViewport.x * 2.0 - 1.0,
      1.0 - p.y / uViewport.y * 2.0,
      0.0,
      1.0
    );

    float diameter = 2.0 * radius * uPixelRatio;   // device pixels
    float drawn = max(diameter, 1.0);
    float coverage = min(diameter * diameter, 1.0); // sub-pixel specks keep their true area

    vDiscRadius = drawn * 0.5;
    vPointSize = drawn + 2.0; // room for a one-pixel anti-aliased rim
    gl_PointSize = vPointSize;
    vAlpha = aAlpha * edgeFade * coverage * uIntro;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying float vAlpha;
  varying float vPointSize;
  varying float vDiscRadius;

  void main() {
    // A perfectly round star: distance from the sprite centre in device
    // pixels, feathered across exactly one pixel. No texture, no corners.
    float dist = length(gl_PointCoord - vec2(0.5)) * vPointSize;
    float disc = 1.0 - smoothstep(vDiscRadius - 0.5, vDiscRadius + 0.5, dist);
    float alpha = disc * vAlpha;

    if (alpha < 0.002) discard;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
  }
`;

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileQuery = window.matchMedia(MOBILE_QUERY);

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      setFallback(true);
      return;
    }
    renderer.setClearColor(0x000000, 0);

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const stars = createStars(DESKTOP_COUNT);
    const positions = new Float32Array(DESKTOP_COUNT * 3);
    const drift = new Float32Array(DESKTOP_COUNT * 2);
    const alphas = new Float32Array(DESKTOP_COUNT);
    const magnets = new Float32Array(DESKTOP_COUNT);

    stars.forEach((star, index) => {
      positions.set([star.x, star.y, star.depth], index * 3);
      drift.set([star.dx, star.dy], index * 2);
      alphas[index] = star.alpha;
      magnets[index] = star.magnet;
    });

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("aDrift", new BufferAttribute(drift, 2));
    geometry.setAttribute("aAlpha", new BufferAttribute(alphas, 1));
    geometry.setAttribute("aMagnet", new BufferAttribute(magnets, 1));

    const uniforms = {
      uViewport: { value: new Vector2(window.innerWidth, window.innerHeight) },
      uPixelRatio: { value: 1 },
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0, 0) },
      uScroll: { value: reduceMotion ? 0 : window.scrollY },
      uIntro: { value: reduceMotion ? 1 : 0 },
    };

    const material = new ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: NormalBlending,
    });

    const points = new Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);

    const render = () => renderer.render(scene, camera);

    const applySize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const compact = mobileQuery.matches;
      const ratio = Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 2);

      renderer.setPixelRatio(ratio);
      renderer.setSize(width, height, false);
      uniforms.uViewport.value.set(width, height);
      uniforms.uPixelRatio.value = ratio;
      geometry.setDrawRange(0, compact ? MOBILE_COUNT : DESKTOP_COUNT);

      if (reduceMotion) render();
    };

    applySize();

    const targetMouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };
    let smoothScroll = uniforms.uScroll.value;
    let elapsed = 0;
    let previous = performance.now();
    let frame = 0;

    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      // Same frame of reference as the reference: offset from viewport centre.
      targetMouse.x = event.clientX - window.innerWidth / 2;
      targetMouse.y = event.clientY - window.innerHeight / 2;
    };

    const tick = (now: number) => {
      // Clamp only real hitches; slow devices still keep pace with wall time.
      const delta = Math.min(Math.max((now - previous) / 1000, 0), 0.1);
      previous = now;
      elapsed += delta;

      const mouseDamping = 1 - Math.exp(-MOUSE_EASE * delta);
      const scrollDamping = 1 - Math.exp(-SCROLL_EASE * delta);

      smoothMouse.x += (targetMouse.x - smoothMouse.x) * mouseDamping;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * mouseDamping;

      // The cushion stop: the sky chases scrollY through a damped value, so
      // releasing the wheel leaves a gentle glide instead of a hard lock.
      // Raw pixels, not section indices — content can grow forever.
      smoothScroll += (window.scrollY - smoothScroll) * scrollDamping;

      uniforms.uTime.value = elapsed;
      uniforms.uIntro.value = Math.min(1, uniforms.uIntro.value + delta / INTRO_SECONDS);
      uniforms.uMouse.value.set(smoothMouse.x, smoothMouse.y);
      uniforms.uScroll.value = smoothScroll;

      render();
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      window.cancelAnimationFrame(frame);
      previous = performance.now();
      frame = window.requestAnimationFrame(tick);
    };

    // Pause while the tab is hidden — no frames for a sky nobody can see.
    const handleVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
      } else if (!reduceMotion) {
        start();
      }
    };

    window.addEventListener("resize", applySize);
    document.addEventListener("visibilitychange", handleVisibility);

    if (reduceMotion) {
      render();
    } else {
      window.addEventListener("pointermove", handlePointer, { passive: true });
      start();
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", applySize);
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Static 2D fallback for devices without WebGL — same stars, same sky.
  useEffect(() => {
    if (!fallback) return;
    const canvas = fallbackRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const stars = createStars(DESKTOP_COUNT);

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const compact = window.matchMedia(MOBILE_QUERY).matches;
      const ratio = Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 2);

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      stars.slice(0, compact ? MOBILE_COUNT : DESKTOP_COUNT).forEach((star) => {
        context.beginPath();
        context.arc(star.x * width, star.y * height, STAR_RADIUS / star.depth, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        context.fill();
      });
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [fallback]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="starfield-gradient absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      {fallback ? (
        <canvas ref={fallbackRef} className="absolute inset-0 block h-full w-full" />
      ) : null}
    </div>
  );
}
