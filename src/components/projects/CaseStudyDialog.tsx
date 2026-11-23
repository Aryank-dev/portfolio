import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "../../content/projects";
import { profile } from "../../content/siteConfig";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import ProjectArtwork from "./ProjectArtwork";

type CaseStudyDialogProps = {
  project: Project | null;
  onClose: () => void;
};

/* VISIBLE: labels inside the case-study overlay. */
const DIALOG_LABELS = {
  eyebrowPrefix: "case study",
  rolePrefix: "role",
  briefHeading: "The brief",
  contributionHeading: "What I did",
  outcomeHeading: "The result",
  releasePrefix: "release",
  closingQuestion: "Have a problem shaped like this one?",
  closingAction: "Start a conversation",
  closeLabel: "Close case study",
};

/**
 * Full case-study overlay.
 * Content comes from src/content/projects.ts — edit the project data there,
 * not the layout here.
 */
export default function CaseStudyDialog({ project, onClose }: CaseStudyDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useBodyScrollLock(Boolean(project));

  useEffect(() => {
    if (!project) return;

    // Remember where focus was, then move it into the dialog.
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusableElements = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={DIALOG_LABELS.closeLabel}
        className="modal-backdrop fixed inset-0 cursor-default"
        tabIndex={-1}
      />

      {/* Increased breadth (max-w-[880px]) and decreased length (max-h-[82vh]) */}
      <div
        className="glass intro-rise relative z-10 flex flex-col w-full max-w-[880px] max-h-[82vh] overflow-hidden rounded-[24px] border border-white/15 shadow-[0_35px_100px_rgba(0,0,0,0.9)]"
        style={{ animationDuration: "0.3s" }}
      >
        {/* Floating Close Button with high z-index and isolated hit target */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={DIALOG_LABELS.closeLabel}
          className="absolute top-3.5 right-3.5 z-30 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-[#11161d]/90 text-snow shadow-lg backdrop-blur-md transition-all hover:border-frost hover:bg-[#1f2937] active:scale-95"
        >
          <X className="h-4 w-4" strokeWidth={1.8} />
        </button>

        {/* Compact Banner Artwork Header — inDialog handles badge clearance */}
        <div className="relative h-[120px] sm:h-[135px] shrink-0 border-b border-white/[0.08] overflow-hidden">
          <ProjectArtwork variant={project.art} inDialog={true} />
        </div>

        {/* Inner Scrollable Body with 2-Column Responsive Layout */}
        <div className="overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-5">
          {/* Top Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-x-3 text-[10px] font-mono">
              <span className="text-frost uppercase tracking-[0.14em]">
                {DIALOG_LABELS.eyebrowPrefix} / {project.number}
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="text-dim tracking-[0.12em]">{project.year}</span>
              <span className="h-3 w-px bg-white/20" />
              <span className="text-dim tracking-[0.12em]">{project.timeline}</span>
            </div>
            <span className="mono-label text-[9.5px] tracking-[0.12em] text-dim">
              {DIALOG_LABELS.rolePrefix} / {project.role}
            </span>
          </div>

          {/* Title & Action Links Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="case-study-title" className="display-title text-[24px] text-snow sm:text-[28px] leading-tight">
                {project.title}
              </h2>
              <p className="mt-1 text-[13px] text-frost/90">{project.descriptor}</p>
            </div>

            {/* Action Buttons (Live Demo & GitHub) */}
            <div className="flex items-center gap-2 shrink-0">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-frost/40 bg-frost/10 px-3.5 py-1.5 font-mono text-[10px] text-frost transition-all hover:bg-frost hover:text-[#11161c]"
                >
                  Live Demo
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : null}
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[10px] text-mist transition-all hover:border-white/35 hover:text-snow"
                >
                  GitHub
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : null}
            </div>
          </div>

          {/* Tags list */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[9px] tracking-[0.03em] text-mist"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Project Summary Description */}
          <p className="text-[13px] sm:text-[13.5px] leading-[1.7] text-mist/90">
            {project.description}
          </p>

          {/* Three Headline Metrics — Horizontal Cards */}
          <div className="grid grid-cols-3 divide-x divide-white/[0.08] rounded-xl border border-white/[0.08] bg-white/[0.02] py-2.5">
            {project.stats.map((stat) => (
              <div key={stat.label} className="px-3 text-center">
                <p className="font-display text-[17px] sm:text-[20px] leading-none tracking-[-0.03em] text-frost">
                  {stat.value}
                </p>
                <p className="mt-1 text-[9.5px] leading-snug text-dim">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 2-Column Balanced Content Section */}
          <div className="grid gap-6 border-t border-white/[0.08] pt-5 sm:grid-cols-[1.15fr_0.85fr]">
            {/* Left Column: The Brief + What I Did */}
            <div className="space-y-4">
              <div>
                <h3 className="mono-label text-[9.5px] tracking-[0.16em] text-snow/90">
                  {DIALOG_LABELS.briefHeading}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-[1.7] text-mist/85">{project.overview}</p>
              </div>

              <div>
                <h3 className="mono-label text-[9.5px] tracking-[0.16em] text-snow/90">
                  {DIALOG_LABELS.contributionHeading}
                </h3>
                <ul className="mt-1.5 space-y-1.5">
                  {project.contribution.map((item) => (
                    <li key={item} className="flex gap-2 text-[12px] leading-[1.6] text-mist/85">
                      <span className="mt-[6px] h-px w-2 shrink-0 bg-frost/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: The Result Callout & Release Info */}
            <div className="flex flex-col justify-between gap-4">
              <div className="rounded-xl border border-frost/20 bg-frost/[0.06] p-4">
                <h3 className="mono-label text-[9.5px] tracking-[0.16em] text-frost">
                  {DIALOG_LABELS.outcomeHeading}
                </h3>
                <p className="mt-2 text-[12.5px] leading-[1.7] text-mist/90">{project.outcome}</p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 text-[11px] font-mono text-dim">
                <div className="flex items-center justify-between">
                  <span className="uppercase tracking-[0.12em] text-dim/80">{DIALOG_LABELS.releasePrefix}</span>
                  <span className="text-frost">{project.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Closing Footer CTA */}
          <div className="flex flex-col items-start justify-between gap-3 border-t border-white/[0.08] pt-4 sm:flex-row sm:items-center">
            <p className="text-[12px] text-dim">{DIALOG_LABELS.closingQuestion}</p>
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent(
                `Let's talk about a project like ${project.title}`
              )}`}
              className="group inline-flex items-center gap-2 rounded-full bg-frost px-4 py-2 text-[11.5px] font-medium text-[#11161c] transition-colors hover:bg-[#a9d5df]"
            >
              {DIALOG_LABELS.closingAction}
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
