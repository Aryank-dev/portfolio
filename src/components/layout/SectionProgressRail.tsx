import { navigationSections } from "../../content/siteConfig";

type SectionProgressRailProps = {
  activeSectionId: string;
};

/**
 * The small dot navigation pinned to the right edge on wide screens.
 * Labels come from content/siteConfig.ts → navigationSections.
 */
export default function SectionProgressRail({ activeSectionId }: SectionProgressRailProps) {
  return (
    <nav
      aria-label="Section index"
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 2xl:block"
    >
      <ol className="flex flex-col items-end gap-2.5">
        {navigationSections.map((section) => {
          const isActive = activeSectionId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-label={section.label}
                aria-current={isActive ? "location" : undefined}
                className="group flex h-6 items-center justify-end gap-2 py-1"
              >
                <span
                  className={`mono-label hidden text-[10px] tracking-[0.14em] transition-colors duration-300 2xl:block ${
                    isActive ? "text-frost" : "text-dim/0 group-hover:text-dim"
                  }`}
                >
                  {section.shortLabel}
                </span>
                <span
                  className={`h-px transition-all duration-500 ${
                    isActive
                      ? "w-5 bg-frost shadow-[0_0_8px_rgba(136,192,208,0.6)]"
                      : "w-2.5 bg-snow/20 group-hover:w-4 group-hover:bg-snow/45"
                  }`}
                />
                <span
                  className={`h-1 w-1 rounded-full transition-all duration-500 ${
                    isActive
                      ? "bg-frost shadow-[0_0_7px_rgba(136,192,208,0.7)]"
                      : "bg-snow/20 group-hover:bg-snow/45"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ol>
      <div className="mt-4 flex flex-col items-end pr-[3px]" aria-hidden="true">
        <div className="h-8 w-px bg-gradient-to-b from-frost/25 via-white/10 to-transparent" />
        <span className="mono-label mt-1.5 text-[9px] tracking-[0.14em] text-dim">gl</span>
      </div>
    </nav>
  );
}
