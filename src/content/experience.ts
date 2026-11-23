/* ══════════════════════════════════════════════════════════════════════════
   EXPERIENCE / EDUCATION — Aryan Khalse | 1st-Year CSE (AI & ML) @ NST
   ══════════════════════════════════════════════════════════════════════════ */

export type ExperienceRole = {
  period: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  disciplines: string[];
};

export const experienceRoles: ExperienceRole[] = [
  {
    period: "2025 — Present",
    title: "B.Tech in Computer Science & Engineering (AI & ML)",
    company: "Newton School of Technology",
    location: "Pune, India",
    summary:
      "Core coursework in Data Structures, Discrete Mathematics, Linear Algebra, Probability & Statistics, Object-Oriented Programming with C++, and Python for Data Science.",
    disciplines: ["Data Structures", "Linear Algebra", "Python", "C++"],
  },
  {
    period: "2024 — Present",
    title: "Open-Source Contributor & Builder",
    company: "GitHub (@Aryank-dev)",
    location: "Remote",
    summary:
      "Built 11+ public repositories exploring LLM inference pipelines, Git architecture from scratch (MiniGit), healthcare donor platforms (JeevanSetu), and environment sanitizers.",
    disciplines: ["LLMs", "Git Internals", "Healthcare Tech", "Python"],
  },
  {
    period: "2024 — Present",
    title: "Quantitative Research Learner",
    company: "Quantitative Finance Lab",
    location: "Self-Driven",
    summary:
      "Implementing mathematical market alphas, technical indicators, and backtesting frameworks from scratch using vectorized NumPy and Pandas calculations.",
    disciplines: ["Quantitative Alphas", "Vectorized Math", "Time-Series"],
  },
  {
    period: "2024 — Present",
    title: "Competitive Programming & Problem Solving",
    company: "DSA & Hackathon Community",
    location: "Newton School of Tech",
    summary:
      "Consistent algorithmic practice across LeetCode, CodeChef, and collaborative university hackathons, sharpening dynamic programming, graph traversal, and sorting logic.",
    disciplines: ["Algorithms", "Problem Solving", "Hackathons"],
  },
];

export const experienceSectionContent = {
  headingLineOne: "Education &",
  headingLineHighlight: "technical journey.",
  introduction:
    "Building solid computer science fundamentals from first principles at Newton School of Technology, paired with active open-source building and algorithmic problem solving.",
  cvLinkLabel: "Request full student resume",
  cvSubject: "Aryan Khalse Resume Request",
  availabilityNote: "open for summer 2026 internships & research assistantships",
};
