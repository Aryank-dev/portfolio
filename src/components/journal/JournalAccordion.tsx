import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { journalNotes, journalSectionContent } from "../../content/journal";
import ScrollReveal from "../ui/ScrollReveal";

/* ══════════════════════════════════════════════════════════════════════════
   JOURNAL ACCORDION — the three expandable Field Notes
   ──────────────────────────────────────────────────────────────────────────
   ✏️ Edit the notes themselves in src/content/journal.ts.
   ✏️ Only one note is open at a time. The first note starts open.

   WHY THE OLD TOGGLE BROKE — and what changed:
   1. The old reveal animation added an "is-in" class with plain DOM code.
      That class lived on the same element that re-rendered on toggle, so the
      entries could return to `opacity: 0` and vanish. Reveal state now lives
      in React (ScrollReveal), so toggling can never hide the titles.
   2. The old collapsing row used `grid-template-rows: 0fr` without allowing
      the inner grid item to shrink (`min-height` defaulted to `auto`). The
      panel kept its full height and the content overflowed invisibly.
      The inner wrapper now has `min-h-0`, so it collapses to exactly 0.
   3. The row size is written inline, which keeps the animation smooth and
      removes any dependency on a generated CSS class existing.
   ══════════════════════════════════════════════════════════════════════════ */

export default function JournalAccordion() {
  // The first note is expanded when the page loads. `null` = all collapsed.
  const [openNoteId, setOpenNoteId] = useState<string | null>(journalNotes[0]?.id ?? null);

  const toggleNote = (noteId: string) => {
    setOpenNoteId((currentOpenId) => (currentOpenId === noteId ? null : noteId));
  };

  return (
    <div className="border-b border-white/[0.09]">
      {journalNotes.map((note, index) => {
        const isOpen = openNoteId === note.id;
        const triggerId = `journal-trigger-${note.id}`;
        const panelId = `journal-panel-${note.id}`;

        return (
          <ScrollReveal
            key={note.id}
            delayMs={index * 80}
            className="border-t border-white/[0.09]"
          >
            <article
              className={`group transition-colors duration-500 ${
                isOpen ? "bg-white/[0.022]" : "hover:bg-white/[0.018]"
              }`}
            >
              <h3 className="m-0">
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={`${note.title} (${note.date})`}
                  onClick={() => toggleNote(note.id)}
                  className="flex w-full cursor-pointer items-start gap-4 px-1 py-6 text-left sm:gap-6 sm:px-3 sm:py-7"
                >
                  {/* VISIBLE: note number */}
                  <span
                    className={`mt-1 font-mono text-[11px] tracking-[0.12em] transition-colors ${
                      isOpen ? "text-frost" : "text-dim group-hover:text-frost"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-4">
                      {/* VISIBLE: note title — always visible, open or closed */}
                      <span
                        className={`font-display text-[21px] leading-[1.15] tracking-[-0.025em] transition-colors duration-300 sm:text-[25px] ${
                          isOpen ? "text-snow" : "text-snow/90 group-hover:text-snow"
                        }`}
                      >
                        {note.title}
                      </span>

                      {/* VISIBLE: + / − button */}
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
                          isOpen
                            ? "border-frost/45 bg-frost/[0.1] text-frost"
                            : "border-white/15 text-mist/75 group-hover:border-frost/35 group-hover:text-frost"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        ) : (
                          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        )}
                      </span>
                    </span>

                    {/* VISIBLE: date / read time / topic */}
                    <span className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="font-mono text-[10.5px] tracking-[0.08em] text-dim">
                        {note.date}
                      </span>
                      <span className="h-2.5 w-px bg-white/20" />
                      <span className="font-mono text-[10.5px] tracking-[0.08em] text-dim">
                        {note.readTime} read
                      </span>
                      <span className="h-2.5 w-px bg-white/20" />
                      <span className="font-mono text-[10.5px] tracking-[0.08em] text-frost/90">
                        {note.tag}
                      </span>
                    </span>

                    {/* VISIBLE: short excerpt */}
                    <span className="mt-3 block max-w-[62ch] text-[13px] leading-[1.7] text-mist/80">
                      {note.excerpt}
                    </span>
                  </span>
                </button>
              </h3>

              {/*
                THE EXPANDING PANEL
                • gridTemplateRows goes 0fr → 1fr for a smooth height animation.
                • The inner div MUST keep `min-h-0 overflow-hidden` so it can
                  actually shrink to zero. Removing those classes re-breaks the
                  collapsing animation.
              */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="mb-6 ml-0 space-y-3 border-l border-frost/25 pl-4 sm:ml-[2.15rem] sm:pl-5">
                    {/* VISIBLE: full article paragraphs — edit in content/journal.ts */}
                    {note.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        className="max-w-[68ch] text-[13.5px] leading-[1.85] text-mist/90"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {/* VISIBLE: signature at the end of the note */}
                    <p className="mono-label mt-4 text-[10px] tracking-[0.14em] text-dim">
                      {journalSectionContent.signature}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
