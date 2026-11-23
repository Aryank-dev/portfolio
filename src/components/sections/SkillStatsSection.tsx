import { ArrowRight } from "lucide-react";
import { skillGroups, skillsSectionContent } from "../../content/skills";
import SectionLabel from "../layout/SectionLabel";
import ScrollReveal from "../ui/ScrollReveal";

/* ══════════════════════════════════════════════════════════════════════════
   SKILLS / TECH ARSENAL
   ──────────────────────────────────────────────────────────────────────────
   ✏️ To add or change a skill, edit src/content/skills.ts.
   This file is layout only — it renders whatever is in that content file.
   ══════════════════════════════════════════════════════════════════════════ */

export default function SkillStatsSection() {
  return (
    <section
      id="arsenal"
      data-section="arsenal"
      aria-labelledby="arsenal-title"
      className="relative flex min-h-[100svh] scroll-mt-20 items-center py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <SectionLabel section="arsenal" />

        <div className="glass mt-7 rounded-[28px] p-5 sm:p-8 lg:mr-[3%] lg:max-w-[1140px] lg:p-10">
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative z-10 grid gap-7 border-b border-white/[0.09] pb-8 lg:grid-cols-[1.1fr_0.75fr] lg:items-end lg:gap-16">
            <ScrollReveal>
              {/* VISIBLE: section heading — first line white, second line cyan */}
              <h2
                id="arsenal-title"
                className="display-title text-[clamp(2.45rem,4.7vw,3.9rem)] text-snow"
              >
                {skillsSectionContent.headingLineOne}
                <br />
                <span className="text-frost">{skillsSectionContent.headingLineHighlight}</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delayMs={100}>
              {/* VISIBLE: paragraph beside the heading */}
              <p className="max-w-[390px] text-[13.5px] leading-[1.8] text-mist/90">
                {skillsSectionContent.introduction}
              </p>
              <div className="mt-5 flex items-center gap-2">
                <span className="pulse-soft h-1.5 w-1.5 rounded-full bg-frost" />
                {/* VISIBLE: what you are currently learning */}
                <span className="font-mono text-[10px] tracking-[0.08em] text-dim">
                  {skillsSectionContent.exploringNote}
                </span>
              </div>
            </ScrollReveal>
          </div>

          <div className="relative z-10 mt-2 grid lg:grid-cols-3">
            {skillGroups.map((group, groupIndex) => (
              <ScrollReveal
                key={group.label}
                delayMs={groupIndex * 90}
                className="border-b border-white/[0.07] py-7 lg:border-b-0 lg:border-l lg:border-white/[0.07] lg:px-7 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <div className="flex items-center justify-between">
                  {/* VISIBLE: skill group heading */}
                  <span className="mono-label flex items-center gap-2.5 text-[10px] tracking-[0.16em] text-mist">
                    <span className="text-frost">{group.index}</span>
                    {group.label}
                  </span>
                  <span className="font-mono text-[9.5px] tracking-[0.08em] text-dim">
                    0{group.items.length}
                  </span>
                </div>

                <div className="mt-3">
                  {group.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/tool flex items-start gap-3 border-t border-white/[0.06] py-3.5 first:border-t-0 first:pt-2"
                    >
                      {/* VISIBLE: two-letter skill badge */}
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-[7px] border border-white/15 bg-white/[0.035] font-mono text-[9.5px] tracking-[0.02em] text-frost transition-colors duration-300 group-hover/tool:border-frost/40 group-hover/tool:bg-frost/[0.1]">
                        {skill.mark}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          {/* VISIBLE: skill name + level */}
                          <p className="text-[13px] leading-tight text-snow transition-colors group-hover/tool:text-frost">
                            {skill.name}
                          </p>
                          <span className="mono-label mt-0.5 shrink-0 text-[9px] tracking-[0.11em] text-dim">
                            {skill.level}
                          </span>
                        </div>
                        {/* VISIBLE: short skill description */}
                        <p className="mt-1 text-[11.5px] leading-snug text-mist/85">{skill.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
