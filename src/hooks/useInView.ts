import { useEffect, useRef, useState } from "react";

/**
 * useInView
 * ─────────
 * Reports when an element first scrolls into the viewport.
 * The result is kept in React state, so it survives re-renders (important for
 * accordions and anything that updates after the first paint).
 *
 * @param threshold Fraction of the element that must be visible (0–1).
 */
export function useInView<T extends HTMLElement>(threshold = 0.06) {
  const elementRef = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Visitors who prefer reduced motion see everything immediately.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsInView(true);
          observer.disconnect(); // Reveal only once.
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { elementRef, isInView };
}
