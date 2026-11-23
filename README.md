# Aryan Khalse — Developer Portfolio

Interactive developer portfolio showcasing AI/ML pipelines, quantitative modeling systems, and full-stack engineering.

**Website Link:** https://portfolio-omega-lime-13.vercel.app/
**Live Profile:** [github.com/Aryank-dev](https://github.com/Aryank-dev)  
**Location:** Newton School of Technology (NST), Pune, India 
**Specialization:** 1st-Year B.Tech CSE (Artificial Intelligence & Machine Learning)

---

## Highlights

- **Interactive 3D Neural Vector Sphere:** Custom HTML5 Canvas engine rendering a Fibonacci sphere lattice with autonomous 360° rotation, cursor proximity particle evasion, and mouse orientation tracking.
- **Project Showcases & Interactive Artwork:**
  - **LLM Pipeline Explorer:** Tokenization, multi-head attention heatmaps ($Q \cdot K^T / \sqrt{d}$), and logit sampling inspector.
  - **Quant Lab:** Quantitative strategy backtesting, equity curve modeling, Sharpe/Drawdown analytics.
  - **Wardrobe Engine:** Deterministic rule-based scoring engine for local-first outfit recommendations.
  - **JeevanSetu:** Critical blood donation bridge connecting regional donors and verified hospitals.
- **Deep-Link Navigation & Custom Cursor:** Direct URL hash synchronization, smooth section rails, and inverted-blend cursor tracking.
- **Single-File Distribution:** Optimized Vite build bundling CSS, JS, and assets into a single deliverable.

---

## Tech Stack

- **Framework:** React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Graphics & Animation:** HTML5 2D/3D Canvas, SVG, Three.js
- **Icons:** Lucide React
- **Build Tooling:** Vite 7, `vite-plugin-singlefile`

---

## Project Structure

```
WebPotfolio/
├── index.html                   # HTML5 entry & SEO meta
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite & Tailwind plugin setup
├── src/
│   ├── components/              # UI, layout, background & section components
│   │   ├── hero/                # 3D interactive ambient vector sphere
│   │   ├── projects/            # Artwork, cards, and modal case study dialogs
│   │   ├── sections/            # Hero, Arsenal, Work, Philosophy, Experience, Notes, Contact
│   │   └── background/          # Custom cursor & starfield canvas
│   ├── content/                 # Single source of truth for all copy & projects
│   ├── hooks/                   # Custom React hooks (deep-link, scroll locks, in-view)
│   └── index.css                # Global styles & design tokens
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build single-file production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

---

## License

Built by Aryan Khalse. All rights reserved.
