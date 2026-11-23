import { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════════════════
   INVERTED COLOR CURSOR
   ──────────────────────────────────────────────────────────────────────────
   A smooth custom pointer with `mix-blend-mode: difference`. Wherever it
   travels, the colours beneath it are inverted — over text, artwork, glass.
   • Automatically disabled on touch/coarse-pointer devices.
   • Add data-cursor-label="VIEW" to any link to show a word inside the cursor.
   • Sizes, colours and smoothing are in src/index.css under "CUSTOM CURSOR".
   ══════════════════════════════════════════════════════════════════════════ */

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, select, textarea, label, [data-cursor-label]";

/** Visual positions of the dot and ring use different damping values. */
const DOT_EASING = 0.42; // 0–1: higher follows the pointer more closely
const RING_EASING = 0.16; // lower = longer, smoother trail

export default function InvertedColorCursor() {
  const layerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // The layer is always in the DOM so these refs exist on mount. CSS keeps
    // it hidden on touch devices and enables it once this attribute is set.
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointerQuery.matches || prefersReducedMotion) return;

    const layer = layerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!layer || !dot || !ring || !label) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let dotX = pointerX;
    let dotY = pointerY;
    let ringX = pointerX;
    let ringY = pointerY;
    let animationFrame = 0;
    let isRunning = false;
    let hasPointerPosition = false;

    const place = (element: HTMLElement, x: number, y: number) => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const renderFrame = () => {
      dotX += (pointerX - dotX) * DOT_EASING;
      dotY += (pointerY - dotY) * DOT_EASING;
      ringX += (pointerX - ringX) * RING_EASING;
      ringY += (pointerY - ringY) * RING_EASING;

      place(dot, dotX, dotY);
      place(ring, ringX, ringY);
      place(label, ringX, ringY);

      const delta =
        Math.abs(pointerX - ringX) +
        Math.abs(pointerY - ringY) +
        Math.abs(pointerX - dotX) +
        Math.abs(pointerY - dotY);

      if (delta > 0.1) {
        animationFrame = window.requestAnimationFrame(renderFrame);
      } else {
        isRunning = false;
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrame = window.requestAnimationFrame(renderFrame);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!hasPointerPosition) {
        hasPointerPosition = true;
        dotX = pointerX;
        dotY = pointerY;
        ringX = pointerX;
        ringY = pointerY;
        place(dot, dotX, dotY);
        place(ring, ringX, ringY);
        place(label, ringX, ringY);
        document.documentElement.dataset.customCursor = "on";
        layer.classList.add("is-visible");
      }

      document.documentElement.dataset.customCursor = "on";
      layer.classList.remove("is-hidden");

      const target = event.target instanceof Element ? event.target.closest(INTERACTIVE_SELECTOR) : null;
      const isInteractive = Boolean(target);
      layer.classList.toggle("is-hovering", isInteractive);

      const customLabel = target?.getAttribute("data-cursor-label") ?? "";
      label.textContent = customLabel;
      layer.classList.toggle("has-label", customLabel.length > 0);

      startLoop();
    };

    const handlePointerDown = () => layer.classList.add("is-pressed");
    const handlePointerUp = () => layer.classList.remove("is-pressed");
    const hideCursor = () => {
      layer.classList.add("is-hidden");
      delete document.documentElement.dataset.customCursor;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("mouseleave", hideCursor);
    window.addEventListener("blur", hideCursor);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
      delete document.documentElement.dataset.customCursor;
    };
  }, []);

  return (
    <div ref={layerRef} className="inverted-cursor-layer is-hidden" aria-hidden="true">
      <div ref={ringRef} className="inverted-cursor__ring" />
      <div ref={dotRef} className="inverted-cursor__dot" />
      <span ref={labelRef} className="inverted-cursor__label" />
    </div>
  );
}
