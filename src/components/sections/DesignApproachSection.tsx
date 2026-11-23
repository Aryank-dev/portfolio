import {
  approachSectionContent,
  designPrinciples,
} from "../../content/designPrinciples";
import SectionLabel from "../layout/SectionLabel";
import ScrollReveal from "../ui/ScrollReveal";

/* ══════════════════════════════════════════════════════════════════════════
   DESIGN APPROACH — principles + live shader excerpt
   ──────────────────────────────────────────────────────────────────────────
   ✏️ Your three principles live in src/content/designPrinciples.ts.
   ✏️ Heading, quality stats, and labels are in that same file under
      approachSectionContent.
   ══════════════════════════════════════════════════════════════════════════ */

export default function DesignApproachSection() {
  return (
    <section
      id="approach"
      data-section="approach"
      aria-labelledby="approach-title"
      className="relative flex min-h-[100svh] scroll-mt-20 items-center py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <SectionLabel section="approach" />

        <div className="glass mt-7 rounded-[28px] p-5 sm:p-8 lg:ml-auto lg:max-w-[1080px] lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12">
            <ScrollReveal>
              {/* VISIBLE: main approach heading */}
              <h2
                id="approach-title"
                className="display-title text-[clamp(2.4rem,4.6vw,3.8rem)] text-snow"
              >
                {approachSectionContent.headingLineOne}
                <br />
                <span className="text-frost">{approachSectionContent.headingLineHighlight}</span>
              </h2>
              {/* VISIBLE: approach introduction */}
              <p className="mt-5 max-w-[440px] text-[13px] leading-[1.8] text-mist/65">
                {approachSectionContent.introduction}
              </p>

              {/* THE PRINCIPLES — one row each, from content/designPrinciples.ts */}
              <div className="mt-8">
                {designPrinciples.map((principle, index) => (
                  <ScrollReveal
                    key={principle.number}
                    delayMs={index * 80}
                    className="group border-t border-white/[0.09] py-5 last:pb-0"
                  >
                    <div className="flex gap-4 sm:gap-5">
                      <span className="mt-0.5 font-mono text-[10.5px] tracking-[0.1em] text-frost">
                        {principle.number}
                      </span>
                      <div>
                        {/* VISIBLE: principle title */}
                        <h3 className="font-display text-[17px] tracking-[-0.02em] text-snow/90 transition-colors group-hover:text-snow">
                          {principle.title}
                        </h3>
                        {/* VISIBLE: principle explanation */}
                        <p className="mt-1.5 max-w-[420px] text-[12.5px] leading-[1.75] text-mist/85">
                          {principle.body}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={140} className="flex flex-col">
              <div className="glass-inset overflow-hidden rounded-2xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
                  <span className="flex items-center gap-2" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-frost/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                  </span>
                  {/* VISIBLE: filename in the code window */}
                  <span className="font-mono text-[10px] tracking-[0.1em] text-dim">
                    {approachSectionContent.codeFilename}
                  </span>
                  <span className="mono-label text-[9.5px] tracking-[0.12em] text-frost">python</span>
                </div>

                {/* Clean vectorized snippet illustrating first-principles engineering */}
                <pre className="overflow-x-auto px-4 py-5 font-mono text-[10px] leading-[1.9] text-mist/85 sm:px-5 sm:text-[11px]">
                  <code>
                    <span className="text-dim/60">{"# 01 — vectorized alpha & normalization"}</span>
                    {"\n"}
                    <span className="text-glacier">def</span>
                    {" "}
                    <span className="text-frost">compute_alpha</span>
                    {"(returns: np.ndarray, window: int = 20):\n"}
                    {"    rolling_mean = np.mean(returns[-window:], axis=0)\n"}
                    {"    std = np.std(returns[-window:], axis=0) + 1e-8\n"}
                    {"    z_score = (returns[-1] - rolling_mean) / std\n\n"}
                    <span className="text-dim/60">{"# 02 — rank & market-neutral weights"}</span>
                    {"\n"}
                    {"    ranks = np.argsort(np.argsort(z_score))\n"}
                    {"    weights = (ranks - np.mean(ranks))\n"}
                    {"    return weights / np.sum(np.abs(weights))\n\n"}
                    <span className="text-dim/60">{"# 03 — verify dollar neutrality: sum(w) == 0"}</span>
                    {"\n"}
                    <span className="text-glacier">assert</span>
                    {" np.isclose(np.sum(weights), 0.0)"}
                  </code>
                </pre>

                <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-3">
                  <span className="font-mono text-[10px] tracking-[0.08em] text-dim">
                    {approachSectionContent.codeFooter}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] text-frost">
                    <span className="h-1.5 w-1.5 rounded-full bg-frost" />
                    {approachSectionContent.codeStatus}
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-6">
                {/* VISIBLE: three quality metrics */}
                <div className="grid grid-cols-3 divide-x divide-white/[0.08] rounded-xl border border-white/[0.08] bg-white/[0.018] py-3.5">
                  {approachSectionContent.qualityStats.map((stat) => (
                    <div key={stat.label} className="px-2 text-center">
                      <p className="font-display text-[16px] leading-none text-snow/85">{stat.value}</p>
                      <p className="mono-label mt-1.5 text-[9.5px] tracking-[0.1em] text-dim">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                {/* VISIBLE: closing note */}
                <p className="mt-4 max-w-[380px] font-mono text-[10px] leading-[1.8] tracking-[0.03em] text-dim">
                  {approachSectionContent.closingNote}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
