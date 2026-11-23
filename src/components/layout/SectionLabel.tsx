import { sectionLabels } from "../../content/siteConfig";
import ScrollReveal from "../ui/ScrollReveal";

type SectionLabelProps = {
  section: keyof typeof sectionLabels;
  className?: string;
};

/**
 * The numbered eyebrow above every section, e.g.
 *   03 ── SELECTED WORK                 2023 — 2025
 *
 * VISIBLE TEXT lives in src/content/siteConfig.ts → sectionLabels.
 */
export default function SectionLabel({ section, className = "" }: SectionLabelProps) {
  const { index, label, detail } = sectionLabels[section];

  return (
    <ScrollReveal className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      <span className="font-mono text-[10.5px] tracking-[0.14em] text-frost">{index}</span>
      <span className="h-px w-8 bg-gradient-to-r from-frost/60 to-white/10 sm:w-12" />
      <span className="mono-label text-[10.5px] tracking-[0.17em] text-mist">{label}</span>
      <span className="mono-label ml-auto hidden text-[10px] tracking-[0.13em] text-dim md:block">
        {detail}
      </span>
    </ScrollReveal>
  );
}
