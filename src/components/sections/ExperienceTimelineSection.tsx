import { ArrowUpRight } from "lucide-react";
import {
  experienceRoles,
  experienceSectionContent,
} from "../../content/experience";
import { profile } from "../../content/siteConfig";
import SectionLabel from "../layout/SectionLabel";
import ScrollReveal from "../ui/ScrollReveal";

/* ══════════════════════════════════════════════════════════════════════════
   EXPERIENCE TIMELINE
   ──────────────────────────────────────────────────────────────────────────
   ✏️ Add or edit jobs in src/content/experience.ts.
   ✏️ Heading and left-column copy live in experienceSectionContent there.
   ══════════════════════════════════════════════════════════════════════════ */

export default function ExperienceTimelineSection() {
  return (
    <section
      id="experience"
      data-section="experience"
      aria-labelledby="experience-title"
      className="relative scroll-mt-20 py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <SectionLabel section="experience" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ScrollReveal className="self-start lg:sticky lg:top-28">
            {/* VISIBLE: heading */}
            <h2
              id="experience-title"
              className="display-title text-[clamp(2.4rem,4.5vw,3.7rem)] text-snow"
            >
              {experienceSectionContent.headingLineOne}
              <br />
              <span className="text-frost">{experienceSectionContent.headingLineHighlight}</span>
            </h2>
            {/* VISIBLE: introduction */}
            <p className="mt-5 max-w-[360px] text-[13px] leading-[1.8] text-mist/60">
              {experienceSectionContent.introduction}
            </p>
            {/* VISIBLE: CV request link */}
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent(experienceSectionContent.cvSubject)}`}
              className="group mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/12 px-4 py-2.5 text-[11.5px] text-mist/75 transition-colors hover:border-frost/35 hover:text-snow"
            >
              {experienceSectionContent.cvLinkLabel}
              <ArrowUpRight
                className="h-3.5 w-3.5 text-frost/75 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.6}
              />
            </a>

            <div className="mt-8 hidden items-center gap-3 border-t border-white/[0.09] pt-5 lg:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-frost opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-frost" />
              </span>
              {/* VISIBLE: availability note */}
              <span className="font-mono text-[10px] leading-relaxed tracking-[0.08em] text-dim">
                {experienceSectionContent.availabilityNote}
              </span>
            </div>
          </ScrollReveal>

          <div>
            {/* ONE ROW PER JOB — data comes from content/experience.ts */}
            {experienceRoles.map((role, index) => (
              <ScrollReveal
                key={`${role.company}-${role.period}`}
                delayMs={index * 70}
                className="group border-t border-white/[0.09] py-7 last:border-b"
              >
                <article>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    {/* VISIBLE: date range + location */}
                    <span className="mono-label text-[10.5px] tracking-[0.15em] text-frost">
                      {role.period}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.07em] text-dim">
                      {role.location}
                    </span>
                  </div>
                  {/* VISIBLE: job title + company */}
                  <h3 className="mt-3 font-display text-[22px] leading-tight tracking-[-0.03em] text-snow/90 transition-colors duration-300 group-hover:text-snow sm:text-[25px]">
                    {role.title}
                    <span className="text-dim"> / </span>
                    <span className="text-mist">{role.company}</span>
                  </h3>
                  {/* VISIBLE: job description */}
                  <p className="mt-2.5 max-w-[580px] text-[13px] leading-[1.75] text-mist/90">
                    {role.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {role.disciplines.map((discipline) => (
                      <span
                        key={discipline}
                        className="rounded-full border border-white/15 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] tracking-[0.03em] text-mist"
                      >
                        {discipline}
                      </span>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
