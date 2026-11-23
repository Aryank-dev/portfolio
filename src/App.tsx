import InvertedColorCursor from "./components/background/InvertedColorCursor";
import StarfieldBackground from "./components/background/StarfieldBackground";
import SectionProgressRail from "./components/layout/SectionProgressRail";
import SiteFooter from "./components/layout/SiteFooter";
import SiteHeader from "./components/layout/SiteHeader";
import ContactCallToActionSection from "./components/sections/ContactCallToActionSection";
import DesignApproachSection from "./components/sections/DesignApproachSection";
import ExperienceTimelineSection from "./components/sections/ExperienceTimelineSection";
import HeroOverviewSection from "./components/sections/HeroOverviewSection";
import JournalSection from "./components/sections/JournalSection";
import PortfolioGallery from "./components/sections/PortfolioGallery";
import SkillStatsSection from "./components/sections/SkillStatsSection";
import { useActiveSection } from "./hooks/useActiveSection";
import { useDeepLinkScroll } from "./hooks/useDeepLinkScroll";

/* ══════════════════════════════════════════════════════════════════════════
   APP — the page composition
   ──────────────────────────────────────────────────────────────────────────
   This file only decides the ORDER of the sections. It contains no copy and no
   project data. Edit content in src/content/*, and section layouts in
   src/components/sections/*.

   To add a new section:
   1. Create a component in src/components/sections/.
   2. Import it here.
   3. Place it in <main>, in the order you want visitors to read it.
   4. Add its { id, label, shortLabel } to navigationSections in
      src/content/siteConfig.ts.
   ══════════════════════════════════════════════════════════════════════════ */

export default function App() {
  const activeSectionId = useActiveSection();
  useDeepLinkScroll();

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* Keyboard visitors can jump straight past the navigation. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-frost focus:px-4 focus:py-2 focus:text-[12px] focus:font-medium focus:text-[#11161c]"
      >
        Skip to content
      </a>

      {/* Immersive layer 1: the starfield sky (z-0) */}
      <StarfieldBackground />

      {/* Immersive layer 2: the difference-blend cursor (z-200, fine pointers only) */}
      <InvertedColorCursor />

      <SiteHeader activeSectionId={activeSectionId} />
      <SectionProgressRail activeSectionId={activeSectionId} />

      <main id="main-content" className="relative z-10">
        <HeroOverviewSection />
        <SkillStatsSection />
        <PortfolioGallery />
        <DesignApproachSection />
        <ExperienceTimelineSection />
        <JournalSection />
        <ContactCallToActionSection />
        <SiteFooter />
      </main>
    </div>
  );
}
