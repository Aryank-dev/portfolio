import { useEffect, useState } from "react";

/**
 * useActiveSection
 * ────────────────
 * Tracks which <section data-section="..."> is currently in the middle of the
 * viewport. The header and the right-hand rail use this to show progress.
 */
export function useActiveSection(initialSectionId = "top") {
  const [activeSectionId, setActiveSectionId] = useState(initialSectionId);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSectionId(entry.target.id);
        });
      },
      // A thin horizontal band in the middle of the screen decides the section.
      { threshold: 0, rootMargin: "-42% 0px -52% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeSectionId;
}
