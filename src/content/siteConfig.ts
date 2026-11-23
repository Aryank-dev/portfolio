/* ══════════════════════════════════════════════════════════════════════════
   SITE CONFIG — Aryan Khalse | 1st-Year CSE (AI & ML) @ NST
   ══════════════════════════════════════════════════════════════════════════ */

/* ── 1. IDENTITY ────────────────────────────────────────────────────────── */
export const profile = {
  wordmark: "aryan khalse",
  role: "cse ai & ml undergraduate",
  fullName: "Aryan Khalse",
  email: "aryanrk2008@gmail.com",
  location: "Pune, India",
  coordinates: "18.520° N, 73.856° E",
  timeZone: "Asia/Kolkata",
  availabilityShort: "open for internships",
  availabilityLong: "open for summer research & internships",
  availabilitySlot: "Summer 2026 / Hackathons",
  availabilityTimeline: "2025 — 2029 / B.Tech CSE (AI & ML)",
  copyrightYear: "2026",
} as const;

/* ── 2. SOCIAL LINKS ────────────────────────────────────────────────────── */
export const socialLinks = [
  { label: "GitHub", href: "https://github.com/Aryank-dev" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aryan-khalse-421144429" },
];

/* ── 3. NAVIGATION ──────────────────────────────────────────────────────── */
export const navigationSections = [
  { id: "top", label: "Overview", shortLabel: "overview" },
  { id: "arsenal", label: "Tech Stack", shortLabel: "stack" },
  { id: "work", label: "Projects", shortLabel: "projects" },
  { id: "approach", label: "Philosophy", shortLabel: "approach" },
  { id: "experience", label: "Education", shortLabel: "education" },
  { id: "journal", label: "Dev Notes", shortLabel: "notes" },
  { id: "contact", label: "Contact", shortLabel: "contact" },
];

/* ── 4. HERO ────────────────────────────────────────────────────────────── */
export const heroContent = {
  eyebrow: "CSE (AI & ML) · NEWTON SCHOOL OF TECHNOLOGY",
  locationLabel: "PUNE / INDIA",
  headingLineOne: "Learning",
  headingLineTwo: "systems with",
  headingHighlight: "intelligence",
  introduction:
    "First-year Computer Science undergraduate specializing in Artificial Intelligence & Machine Learning at Newton School of Technology. Exploring LLM pipelines, quantitative modeling, systems programming, and foundational DSA.",
  primaryAction: { label: "Explore my projects", href: "#work" },
  secondaryAction: { label: "Get in touch", href: "#contact" },
  stats: [
    { value: "01", unit: "st", label: "year B.Tech CSE (AI & ML)" },
    { value: "11+", unit: "repos", label: "public repositories on GitHub" },
    { value: "AI/ML", unit: "& CS", label: "applied ML & core systems" },
  ],
  scrollCue: "scroll to explore",
  liveBadge: "portfolio live",
} as const;

/* ── 5. CONTACT ─────────────────────────────────────────────────────────── */
export const contactContent = {
  introduction:
    "Interested in collaborating on hackathons, machine learning research, open-source projects, or summer internship roles? Let's connect.",
  secondaryPrompt: "Prefer a direct message?",
  secondaryActionLabel: "Connect on LinkedIn",
  secondarySubject: "Hello from portfolio",
  headingLineOne: "Let’s build something",
  headingHighlight: "meaningful.",
  details: [
    { label: "institution", value: "Newton School of Tech", detail: "B.Tech CSE (AI & ML)", showClock: false },
    { label: "local time", value: "", detail: "IST / UTC+5:30", showClock: true },
    { label: "status", value: "Class of 2029", detail: "1st Year Undergraduate", showClock: false },
    { label: "focus", value: "AI/ML · DSA · Systems", detail: "Python · C++ · Quant", showClock: false },
  ],
  primaryAction: { label: "Send an email", subject: "Opportunity / Collaboration" },
} as const;

/* ── 6. FOOTER MICROCOPY ────────────────────────────────────────────────── */
export const footerContent = {
  builtIn: "Newton School of Technology, Pune",
  stack: "react / typescript / tailwind css / three.js",
  shaderNote: "responsive starfield canvas",
  buildNote: "aryan khalse portfolio",
} as const;

/* ── 7. SECTION LABELS ──────────────────────────────────────────────────── */
export const sectionLabels: Record<string, { index: string; label: string; detail: string }> = {
  arsenal: { index: "02", label: "tech stack / skills", detail: "python · c++ · ml · dsa" },
  work: { index: "03", label: "featured projects", detail: "open-source github work" },
  approach: { index: "04", label: "engineering principles", detail: "first-principles / rigor" },
  experience: { index: "05", label: "education & journey", detail: "2025 — present" },
  journal: { index: "06", label: "dev notes & learning", detail: "ai/ml & cs exploration" },
  contact: { index: "07", label: "contact / connect", detail: "open to opportunities" },
};
