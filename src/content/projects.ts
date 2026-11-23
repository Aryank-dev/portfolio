/* ══════════════════════════════════════════════════════════════════════════
   PROJECTS — Aryan Khalse | 1st-Year CSE (AI & ML) @ NST
   ══════════════════════════════════════════════════════════════════════════ */

export type ProjectArtVariant = "aperture" | "tidal" | "northwind" | "almanac";

export type Project = {
  id: string;
  number: string;
  title: string;
  year: string;
  descriptor: string;
  description: string;
  tags: string[];
  role: string;
  timeline: string;
  art: ProjectArtVariant;
  stats: { value: string; label: string }[];
  overview: string;
  contribution: string[];
  outcome: string;
  demoUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    /* ── PROJECT 1 ──────────────────────────────────────────────────────── */
    id: "llm-pipeline",
    number: "01",
    title: "LLM Pipeline Explorer",
    year: "2026",
    descriptor: "Interactive benchmarking & prompt pipeline visualization",
    description:
      "An experimental workbench designed to analyze token streaming, prompt composition latency, context chunking, and inference performance across modern LLM architectures.",
    tags: ["LLMs", "Python", "Prompt Engineering", "Pipelines"],
    role: "AI/ML Engineer",
    timeline: "Nov 2026",
    art: "aperture",
    demoUrl: "https://github.com/Aryank-dev/llm-pipeline-explorer",
    repoUrl: "https://github.com/Aryank-dev/llm-pipeline-explorer",
    stats: [
      { value: "Real-time", label: "token stream tracing" },
      { value: "Modular", label: "prompt pipeline stages" },
      { value: "100%", label: "reproducible benchmarks" },
    ],
    overview:
      "Created to study how prompt engineering strategies, chain-of-thought routing, and context windows affect generation latency, token budgets, and output fidelity.",
    contribution: [
      "Constructed modular prompt composition layers to test decomposition and few-shot strategies.",
      "Engineered execution timers and token consumption counters tracking every inference stage.",
      "Built structured evaluation benchmarks comparing response latency across different model backends.",
    ],
    outcome:
      "Serves as an ongoing testbed for testing LLM agent workflows, prompt tuning, and token optimizations.",
  },
  {
    /* ── PROJECT 2 ──────────────────────────────────────────────────────── */
    id: "quant-learning",
    number: "02",
    title: "Quant Learning & Alpha Lab",
    year: "2026",
    descriptor: "Mathematical modeling & algorithmic alpha research",
    description:
      "Implementation of quantitative trading algorithms, time-series analysis, statistical momentum signals, and backtesting frameworks using Python and vectorized math.",
    tags: ["Quant Finance", "Python", "NumPy", "Pandas"],
    role: "Quantitative Research",
    timeline: "Nov 2026",
    art: "tidal",
    demoUrl: "https://github.com/Aryank-dev/quant-learning",
    repoUrl: "https://github.com/Aryank-dev/quant-learning",
    stats: [
      { value: "Vectorized", label: "NumPy / Pandas operations" },
      { value: "Sharpe/IR", label: "risk-adjusted evaluation" },
      { value: "0", label: "black-box dependencies" },
    ],
    overview:
      "Bridging foundational statistics and financial markets, implementing mathematical formulas for momentum, mean-reversion, moving averages, and volatility measures from first principles.",
    contribution: [
      "Formulated mathematical indicators (EMA, RSI, Bollinger bands) using efficient vectorized operations.",
      "Built custom backtesting routines with maximum drawdown tracking and Sharpe ratio calculations.",
      "Documented step-by-step mathematical derivations and hypothesis testing in Jupyter notebooks.",
    ],
    outcome:
      "Established an extensive foundation in quantitative analysis, financial time-series engineering, and mathematical hypothesis verification.",
  },
  {
    /* ── PROJECT 3 ──────────────────────────────────────────────────────── */
    id: "jeevansetu",
    number: "03",
    title: "JeevanSetu",
    year: "2026",
    descriptor: "Emergency healthcare & blood donor discovery platform",
    description:
      "A public-interest healthcare application engineered to bridge the critical gap between emergency patients and nearby blood donors with rapid matching.",
    tags: ["Full Stack", "Healthcare", "Python/JS", "Social Good"],
    role: "Full-Stack Developer",
    timeline: "Oct 2026",
    art: "northwind",
    demoUrl: "https://github.com/Aryank-dev/JeevanSetu",
    repoUrl: "https://github.com/Aryank-dev/JeevanSetu",
    stats: [
      { value: "Rapid", label: "donor-patient discovery" },
      { value: "Verified", label: "categorized blood types" },
      { value: "Social", label: "healthcare access impact" },
    ],
    overview:
      "Built in response to critical blood and plasma shortages during medical emergencies, providing immediate verified donor contact channels and location awareness.",
    contribution: [
      "Designed the donor discovery workflow and relational schema for blood types and geographic zones.",
      "Engineered a responsive, accessible interface allowing users in distress to request assistance in seconds.",
      "Implemented verification criteria to reduce spam and outdated donor listings.",
    ],
    outcome:
      "Demonstrated how software engineering and thoughtful UI design can solve tangible local healthcare access challenges.",
  },
  {
    /* ── PROJECT 4 ──────────────────────────────────────────────────────── */
    id: "wardrobe",
    number: "04",
    title: "Wardrobe Engine",
    year: "2026",
    descriptor: "Local-first digital wardrobe & deterministic recommendation engine",
    description:
      "A local-first digital wardrobe and outfit recommendation app built with Next.js 16, React, TypeScript, and Tailwind CSS. Features client-side deterministic scoring, combinatorics, hard filtering, thresholding, and wear recency penalties without backend APIs.",
    tags: ["Next.js 16", "TypeScript", "Algorithms", "Local-First"],
    role: "Full-Stack & Algorithm Developer",
    timeline: "Sep 2026",
    art: "almanac",
    demoUrl: "https://wardrobe-pearl.vercel.app/",
    repoUrl: "https://github.com/Aryank-dev/Wardrobe",
    stats: [
      { value: "100%", label: "client-side deterministic" },
      { value: "PWA", label: "offline-first architecture" },
      { value: "0ms", label: "backend latency" },
    ],
    overview:
      "Engineered a privacy-respecting, zero-backend wardrobe manager that uses deterministic scoring algorithms to generate daily outfit recommendations from user clothing items.",
    contribution: [
      "Developed a combinatorial candidate generation engine scoring tops, bottoms, and outerwear with thresholding.",
      "Implemented a wear-history recency penalty algorithm preventing repetitive recommendations without permanent exclusion.",
      "Engineered a responsive Next.js 16 + Tailwind interface with in-browser image compression and LocalStorage isolation.",
    ],
    outcome:
      "Successfully deployed a fully functional, zero-latency PWA to Vercel that runs entirely in the browser with zero cloud costs or data tracking.",
  },
];

export const selectedWorkContent = {
  headingLineOne: "Featured",
  headingHighlight: "projects.",
  introduction:
    "Projects spanning LLM inference pipelines, quantitative modeling, local-first recommendation engines, and healthcare software. Every repository is public and verifiable on GitHub.",
  sideNote: "click any project for architecture, design choices, and github source",
  cardAction: "view project breakdown",
  footerQuestion: "Want to explore all my code and open-source contributions?",
  footerLinkLabel: "View Aryan's GitHub Profile",
  footerLinkSubject: "Collaboration inquiry",
};
