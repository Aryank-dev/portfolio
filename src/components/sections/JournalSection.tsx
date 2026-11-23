import { journalSectionContent } from "../../content/journal";
import JournalAccordion from "../journal/JournalAccordion";
import SectionLabel from "../layout/SectionLabel";
import ScrollReveal from "../ui/ScrollReveal";

/* ══════════════════════════════════════════════════════════════════════════
   JOURNAL SECTION — "Field notes"
   ──────────────────────────────────────────────────────────────────────────
   ✏️ Article content: src/content/journal.ts
   ✏️ Heading and supporting copy: journalSectionContent in the same file.
   The accordion itself lives in components/journal/JournalAccordion.tsx.
   ══════════════════════════════════════════════════════════════════════════ */

export default function JournalSection() {
  return (
    <section
      id="journal"
      data-section="journal"
      aria-labelledby="journal-title"
      className="relative scroll-mt-20 py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <SectionLabel section="journal" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <ScrollReveal className="self-start lg:sticky lg:top-28">
            {/* VISIBLE: section heading */}
            <h2
              id="journal-title"
              className="display-title text-[clamp(2.4rem,4.5vw,3.7rem)] text-snow"
            >
              {journalSectionContent.headingLineOne}
              <br />
              <span className="text-frost">{journalSectionContent.headingLineHighlight}</span>
            </h2>
            {/* VISIBLE: supporting paragraph */}
            <p className="mt-5 max-w-[340px] text-[13px] leading-[1.8] text-mist/60">
              {journalSectionContent.introduction}
            </p>
            {/* VISIBLE: note-count pill */}
            <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.035] px-3.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-frost" />
              <span className="font-mono text-[10.5px] tracking-[0.09em] text-dim">
                {journalSectionContent.noteCountLabel}
              </span>
            </div>
          </ScrollReveal>

          <div>
            <JournalAccordion />
            {/* VISIBLE: closing line under the notes */}
            <p className="mt-5 font-mono text-[10.5px] tracking-[0.07em] text-dim">
              {journalSectionContent.closingNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
