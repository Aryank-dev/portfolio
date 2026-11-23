/* ══════════════════════════════════════════════════════════════════════════
   ENGINEERING PRINCIPLES — Aryan Khalse | 1st-Year CSE (AI & ML) @ NST
   ══════════════════════════════════════════════════════════════════════════ */

export type DesignPrinciple = {
  number: string;
  title: string;
  body: string;
};

export const designPrinciples: DesignPrinciple[] = [
  {
    number: "01",
    title: "First Principles Over Black Boxes",
    body: "Before importing an external library, understand the mathematical equations and underlying data structures. Real mastery comes from knowing the mechanics.",
  },
  {
    number: "02",
    title: "Benchmark & Verify Rigorously",
    body: "In both machine learning pipelines and core algorithms, assumptions remain hypotheses until measured. Benchmark latency, memory allocations, and edge cases.",
  },
  {
    number: "03",
    title: "Reproducibility & Clean Architecture",
    body: "Code should be modular, deterministic, and well-structured. If an AI pipeline, script, or backtest cannot be easily reproduced by peers, it is incomplete.",
  },
];

export const approachSectionContent = {
  headingLineOne: "First principles.",
  headingLineHighlight: "Rigorous engineering.",
  introduction:
    "Software engineering and artificial intelligence are grounded in mathematics, discrete structures, and disciplined experimentation. I focus on writing clear, verifiable, and performant code.",
  codeFilename: "pipeline_benchmark.py",
  codeFooter: "0 black-box hacks / type safe",
  codeStatus: "all tests green",
  qualityStats: [
    { value: "O(1)", label: "space target" },
    { value: "100%", label: "reproducible" },
    { value: "Strict", label: "type safety" },
  ],
  closingNote:
    "Curiosity drives the exploration; rigorous computer science makes it reliable and scalable.",
};
