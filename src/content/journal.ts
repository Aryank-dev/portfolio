/* ══════════════════════════════════════════════════════════════════════════
   JOURNAL / DEV NOTES — Aryan Khalse | 1st-Year CSE (AI & ML) @ NST
   ══════════════════════════════════════════════════════════════════════════ */

export type JournalNote = {
  id: string;
  title: string;
  date: string;
  readTime: string;
  tag: string;
  excerpt: string;
  paragraphs: string[];
};

export const journalNotes: JournalNote[] = [
  {
    id: "llm-pipelines",
    title: "Demystifying LLM Pipelines: Beyond Prompt Wrapping",
    date: "FEB 2026",
    readTime: "6 min",
    tag: "LLMs & AI",
    excerpt:
      "Why real AI engineering begins when you stop treating language models as black boxes and start measuring token throughput, prompt decomposition, and latency.",
    paragraphs: [
      "When first learning language models, it is easy to assume LLM development is just writing clever prompts into an API endpoint. Building the LLM Pipeline Explorer showed me that latency, context chunking, and memory footprint dominate real-world applications.",
      "By instrumenting inference token by token, you quickly notice that prompt composition structure and token caching dictate whether a response feels instantaneous or sluggish. Treating model endpoints as predictable I/O pipelines changes how you architect software around them.",
    ],
  },
  {
    id: "vectorized-alphas",
    title: "First-Principles Alpha: Vectorized Math vs Loops",
    date: "JAN 2026",
    readTime: "5 min",
    tag: "Quant & Math",
    excerpt:
      "Why naive Python loops fail on financial time-series data, and how NumPy vectorization turns matrix arithmetic into millisecond calculations.",
    paragraphs: [
      "In quantitative modeling, backtesting an algorithmic hypothesis over large tick datasets using standard Python for-loops is prohibitively slow. Transitioning to vectorized NumPy arrays and memory-contiguous slices transformed execution times from minutes to milliseconds.",
      "More importantly, thinking in vectors forces mathematical discipline. Calculating exponential moving averages and rolling standard deviations as matrix operations connects linear algebra theory directly to high-throughput data processing.",
    ],
  },
  {
    id: "deterministic-scoring",
    title: "Deterministic Scoring: Building an Offline Recommendation Engine",
    date: "FEB 2025",
    readTime: "5 min",
    tag: "Algorithms",
    excerpt:
      "How to build an intelligent recommendation engine in pure TypeScript using combinatorial candidate generation, thresholding, and recency decay without any cloud backend.",
    paragraphs: [
      "Most recommendation engines rely on heavy remote databases and black-box ML APIs. While building Wardrobe, I wanted to explore whether an intelligent, personalized recommendation system could run 100% locally in the browser with zero latency.",
      "By designing a deterministic scoring pipeline that combines multi-attribute compatibility scoring with a time-decay recency penalty, the engine balances variety and preference without ever sending user data over a network. It proved that thoughtful algorithmic design can often replace heavy server infrastructure.",
    ],
  },
];

export const journalSectionContent = {
  headingLineOne: "Dev notes &",
  headingLineHighlight: "learning logs.",
  introduction:
    "Documenting architectural discoveries, mathematical derivations, and technical breakthroughs as I navigate computer science and machine learning.",
  noteCountLabel: "03 articles / 2024 — 2026",
  closingNote: "written from first principles, verified through code.",
  signature: "written by aryan khalse / newton school of tech",
};
