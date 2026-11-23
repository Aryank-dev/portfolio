import { useCallback, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, selectedWorkContent, type Project } from "../../content/projects";
import { profile } from "../../content/siteConfig";
import SectionLabel from "../layout/SectionLabel";
import CaseStudyDialog from "../projects/CaseStudyDialog";
import ProjectGalleryCard from "../projects/ProjectGalleryCard";
import ScrollReveal from "../ui/ScrollReveal";

/* ══════════════════════════════════════════════════════════════════════════
   SELECTED WORK / PORTFOLIO GALLERY
   ──────────────────────────────────────────────────────────────────────────
   ✏️ To add, remove, or reorder projects, edit src/content/projects.ts.
   ✏️ To change the heading or the footer line, edit selectedWorkContent
      in the same file.
   This component owns the case-study dialog open/close state.
   ══════════════════════════════════════════════════════════════════════════ */

export default function PortfolioGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeCaseStudy = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <section
        id="work"
        data-section="work"
        aria-labelledby="work-title"
        className="relative scroll-mt-20 py-20 sm:py-24 lg:py-28"
      >
        <div className="shell">
          <SectionLabel section="work" />

          <div className="mt-7 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <ScrollReveal>
              {/* VISIBLE: main heading */}
              <h2
                id="work-title"
                className="display-title text-[clamp(2.5rem,5vw,4.1rem)] text-snow"
              >
                {selectedWorkContent.headingLineOne}{" "}
                <span className="text-frost">{selectedWorkContent.headingHighlight}</span>
              </h2>
              {/* VISIBLE: paragraph under the heading */}
              <p className="mt-3 max-w-[480px] text-[13px] leading-[1.8] text-mist/60">
                {selectedWorkContent.introduction}
              </p>
            </ScrollReveal>

            <ScrollReveal className="lg:block">
              {/* VISIBLE: note on the right */}
              <p className="mono-label hidden max-w-[190px] text-right text-[10px] leading-[1.8] tracking-[0.13em] text-dim lg:block">
                {selectedWorkContent.sideNote}
              </p>
            </ScrollReveal>
          </div>

          {/* THE PROJECT GRID — one card per project in content/projects.ts */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectGalleryCard
                key={project.id}
                project={project}
                index={index}
                onOpen={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Full-screen case study, opened by clicking any project card. */}
      <CaseStudyDialog project={selectedProject} onClose={closeCaseStudy} />
    </>
  );
}
