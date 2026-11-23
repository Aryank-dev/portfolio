import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../content/projects";
import { selectedWorkContent } from "../../content/projects";
import ScrollReveal from "../ui/ScrollReveal";
import ProjectArtwork from "./ProjectArtwork";

type ProjectGalleryCardProps = {
  project: Project;
  index: number;
  onOpen: () => void;
};

/**
 * One project card in the Selected Work grid.
 *
 * LAYOUT RULE
 *   index 0 and 3 → wide "featured" cards (artwork + text side by side)
 *   index 1 and 2 → smaller cards (artwork above text)
 * Add more projects in src/content/projects.ts and this pattern continues.
 */
export default function ProjectGalleryCard({ project, index, onOpen }: ProjectGalleryCardProps) {
  const isFeaturedCard = index === 0 || index === 3;
  const isArtworkOnRight = index === 3;

  return (
    <ScrollReveal
      delayMs={(index % 2) * 90}
      className={isFeaturedCard ? "md:col-span-2" : undefined}
    >
      <article className="project-card group relative h-full rounded-[24px]">
        <a
          href={`#case-${project.id}`}
          onClick={(event) => {
            event.preventDefault();
            onOpen();
          }}
          aria-haspopup="dialog"
          aria-label={`Open the ${project.title} case study`}
          /* The custom cursor shows this word while hovering the card. */
          data-cursor-label="VIEW"
          className="glass hover-border flex h-full flex-col rounded-[24px] p-2 transition-transform duration-500 hover:-translate-y-1 focus-visible:outline-offset-4 md:[&:hover]:border-frost/25"
        >
          <div
            className={`relative overflow-hidden rounded-[17px] ${
              isFeaturedCard
                ? "h-[210px] sm:h-[245px] md:h-full md:min-h-[320px]"
                : "h-[195px] sm:h-[215px]"
            } ${isFeaturedCard ? "md:grid md:grid-cols-[1.05fr_0.95fr] md:gap-2" : ""}`}
          >
            <div
              className={`relative h-full overflow-hidden rounded-[17px] ${
                isFeaturedCard ? "md:self-stretch" : ""
              } ${isArtworkOnRight ? "md:order-2" : ""}`}
            >
              {/* VISIBLE: illustration — chosen by project.art in content/projects.ts */}
              <ProjectArtwork variant={project.art} />
            </div>

            {isFeaturedCard ? (
              <div
                className={`relative hidden flex-col justify-between gap-5 p-5 sm:p-7 md:flex ${
                  isArtworkOnRight ? "md:order-1" : ""
                }`}
              >
                <FeaturedCardCopy project={project} />
              </div>
            ) : null}
          </div>

          <div className={`flex flex-1 flex-col p-4 sm:p-5 ${isFeaturedCard ? "md:hidden" : ""}`}>
            <CompactCardCopy project={project} />
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/[0.075] px-4 py-3.5 sm:px-5">
            {/* VISIBLE: "read case study" label */}
            <span className="mono-label text-[10px] tracking-[0.14em] text-dim transition-colors group-hover:text-frost">
              {selectedWorkContent.cardAction}
            </span>
            <span className="flex items-center gap-2">
              <span className="font-mono text-[10.5px] tracking-[0.08em] text-dim">{project.year}</span>
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/15 text-mist transition-all duration-300 group-hover:border-frost/40 group-hover:text-frost">
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.6} />
              </span>
            </span>
          </div>
        </a>
      </article>
    </ScrollReveal>
  );
}

/** Large-card copy, shown beside the artwork on desktop. */
function FeaturedCardCopy({ project }: { project: Project }) {
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          {/* VISIBLE: case-study number */}
          <span className="mono-label text-[10px] tracking-[0.15em] text-frost">
            {project.number} / case study
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-mist/60 transition-colors duration-300 group-hover:border-frost/35 group-hover:text-frost md:hidden">
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </span>
        </div>
        {/* VISIBLE: title, descriptor, description, tags — all from content/projects.ts */}
        <h3 className="mt-5 font-display text-[29px] leading-none tracking-[-0.04em] text-snow transition-colors duration-300 group-hover:text-frost sm:text-[34px]">
          {project.title}
        </h3>
        <p className="mt-2 text-[12.5px] text-frost/90">{project.descriptor}</p>
        <p className="mt-4 max-w-[38ch] text-[13px] leading-[1.75] text-mist/85">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-white/[0.035] px-2.5 py-1 font-mono text-[10px] tracking-[0.03em] text-mist"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-white/[0.07] pt-4">
        <span className="font-mono text-[10px] tracking-[0.08em] text-dim">
          {project.role} / {project.timeline}
        </span>
        <span className="mono-label hidden text-[9.5px] tracking-[0.13em] text-dim sm:block">
          open source
        </span>
      </div>
    </>
  );
}

/** Compact-card copy, shown below the artwork. */
function CompactCardCopy({ project }: { project: Project }) {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <span className="mono-label text-[10px] tracking-[0.15em] text-frost">
          {project.number} / {project.year}
        </span>
        <span className="mono-label text-[9.5px] tracking-[0.11em] text-dim">{project.role}</span>
      </div>
      <h3 className="mt-4 font-display text-[26px] leading-none tracking-[-0.04em] text-snow transition-colors duration-300 group-hover:text-frost">
        {project.title}
      </h3>
      <p className="mt-2 text-[12px] text-frost/85">{project.descriptor}</p>
      <p className="mt-3.5 text-[12.5px] leading-[1.7] text-mist/80">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/15 bg-white/[0.035] px-2.5 py-1 font-mono text-[10px] tracking-[0.03em] text-mist"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
