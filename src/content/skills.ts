/* ══════════════════════════════════════════════════════════════════════════
   SKILLS / TECH ARSENAL — Aryan Khalse | 1st-Year CSE (AI & ML) @ NST
   ══════════════════════════════════════════════════════════════════════════ */

export type Skill = {
  name: string;
  mark: string;
  note: string;
  level: string;
};

export type SkillGroup = {
  label: string;
  index: string;
  items: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages & Core CS",
    index: "A",
    items: [
      { name: "Python", mark: "PY", note: "Primary language for ML, quant, and automation", level: "fluent" },
      { name: "C / C++", mark: "C++", note: "Object-oriented, STL algorithms, and memory safety", level: "active" },
      { name: "Data Structures", mark: "DSA", note: "Arrays, trees, graphs, sorting, and hashing", level: "daily" },
      { name: "SQL", mark: "SQL", note: "Relational queries, schemas, and aggregations", level: "proficient" },
    ],
  },
  {
    label: "AI & Machine Learning",
    index: "B",
    items: [
      { name: "NumPy & Pandas", mark: "NP", note: "Vectorized linear algebra & time-series wrangling", level: "daily" },
      { name: "Scikit-Learn", mark: "SK", note: "Regression, classification, and clustering baselines", level: "proficient" },
      { name: "PyTorch", mark: "PT", note: "Tensors, autograd, and neural network layers", level: "exploring" },
      { name: "Jupyter & Colab", mark: "NB", note: "Interactive EDA, benchmarking, and prototyping", level: "daily" },
    ],
  },
  {
    label: "Tools & Environments",
    index: "C",
    items: [
      { name: "Git & GitHub", mark: "GIT", note: "Branching, PRs, version control, and OSS", level: "daily" },
      { name: "Linux & Bash", mark: "LNX", note: "POSIX environment, shell scripts, CLI utilities", level: "proficient" },
      { name: "Matplotlib & Seaborn", mark: "PLT", note: "Statistical visual analysis and data plots", level: "daily" },
      { name: "FastAPI / Web APIs", mark: "API", note: "Microservices & model deployment endpoints", level: "building" },
    ],
  },
];

export const skillsSectionContent = {
  headingLineOne: "Core skills,",
  headingLineHighlight: "built on fundamentals.",
  introduction:
    "Balancing foundational computer science and algorithmic rigor with modern machine learning frameworks. Focused on writing mathematically sound, performant, and reproducible code.",
  exploringNote: "currently exploring / transformer attention mechanisms & quant alphas",
  currentRotation: "daily routine / dsa problem solving · pytorch autograd · quant models",
  projectsLinkLabel: "see my project implementations",
};
