import type { CSSProperties, ReactNode } from "react";
import { useInView } from "../../hooks/useInView";

type ScrollRevealProps = {
  children: ReactNode;
  /** Tailwind classes for the wrapper (grid spans, borders, flex, etc.). */
  className?: string;
  /** Stagger the entrance animation. 0 = first, 90 = 90ms later. */
  delayMs?: number;
};

/**
 * ScrollReveal
 * ────────────
 * Fades and lifts content into view the first time it is scrolled to.
 *
 * Why this exists: the previous version added an `is-in` class with plain DOM
 * code. When React re-rendered a stateful component (like the journal), the
 * class could be lost and the content returned to `opacity: 0`.
 * Here visibility lives in React state, so toggles can never erase it.
 */
export default function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
}: ScrollRevealProps) {
  const { elementRef, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${isInView ? "is-visible" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
