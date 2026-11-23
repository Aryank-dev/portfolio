import { ArrowUp } from "lucide-react";

/** Smoothly returns the visitor to the hero. */
export default function BackToTopButton() {
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="group inline-flex items-center gap-2.5 text-[11px] text-dim transition-colors hover:text-snow"
    >
      {/* VISIBLE: label next to the arrow */}
      <span className="mono-label text-[8px] tracking-[0.14em]">top</span>
      <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-frost/40">
        <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.5} />
      </span>
    </button>
  );
}
