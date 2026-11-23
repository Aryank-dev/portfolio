import type { ProjectArtVariant } from "../../content/projects";

type ProjectArtworkProps = {
  variant: ProjectArtVariant;
  inDialog?: boolean;
};

const metaByVariant: Record<ProjectArtVariant, string> = {
  aperture: "LLM PIPELINE / TOKENS",
  tidal: "QUANT ALPHA / BACKTEST",
  northwind: "HEALTHCARE / NETWORK",
  almanac: "RECOMMENDATION / ENGINE",
};

export default function ProjectArtwork({ variant, inDialog = false }: ProjectArtworkProps) {
  return (
    <div className="project-art relative h-full w-full overflow-hidden bg-[#0a0e15]">
      <div className="art-grid absolute inset-0 opacity-25" />
      <div className="art-shift absolute inset-0 flex items-center justify-center">
        {variant === "aperture" && <LlmPipelineArt inDialog={inDialog} />}
        {variant === "tidal" && <QuantAlphaArt inDialog={inDialog} />}
        {variant === "northwind" && <JeevanSetuArt inDialog={inDialog} />}
        {variant === "almanac" && <WardrobeArt inDialog={inDialog} />}
      </div>

      {/* Top Left Variant Tag */}
      <div className="absolute top-3 left-3.5 z-10">
        <span className="mono-label rounded-full border border-white/15 bg-[#11161d]/90 px-2.5 py-1 text-[9px] tracking-[0.14em] text-frost backdrop-blur-md">
          {metaByVariant[variant]}
        </span>
      </div>
    </div>
  );
}

/** 01: LLM Pipeline Explorer — Scaled Up in Card View for Enhanced Presence */
function LlmPipelineArt({ inDialog }: { inDialog?: boolean }) {
  return (
    <div className={`relative flex h-full w-full items-center justify-center ${inDialog ? "px-4 py-1" : "p-2 sm:p-4"}`}>
      <svg
        viewBox="0 0 380 170"
        className={`w-full transition-transform duration-300 origin-center ${
          inDialog
            ? "h-full max-h-[155px]"
            : "h-full max-h-[210px] sm:max-h-[240px] md:max-h-[265px] scale-[0.98] sm:scale-[1.02] md:scale-[1.06]"
        }`}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="token-stream" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#81a1c1" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#88c0d0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#eceff4" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Inter-stage Connector Arcs */}
        <path
          d="M 105 85 L 138 85"
          stroke="url(#token-stream)"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <path
          d="M 242 85 L 275 85"
          stroke="url(#token-stream)"
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* STAGE 1: BPE Tokenizer & Input Embeddings (x: 20 to 105) */}
        <g transform="translate(20, 28)">
          <rect x="0" y="0" width="85" height="114" rx="8" fill="#11161f" stroke="rgba(136,192,208,0.3)" strokeWidth="1.2" />
          <text x="42" y="16" fill="#8996a7" fontSize="7.5" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">
            1. BPE TOKENS
          </text>

          {/* Token Pills with IDs */}
          <g transform="translate(6, 28)">
            <rect x="0" y="0" width="73" height="18" rx="4" fill="#18202c" stroke="rgba(136,192,208,0.25)" />
            <text x="6" y="10" fill="#88c0d0" fontSize="7.5" fontFamily="monospace" dominantBaseline="central">"Vector"</text>
            <text x="67" y="10" fill="#8996a7" fontSize="6.5" fontFamily="monospace" textAnchor="end" dominantBaseline="central">#1420</text>
          </g>

          <g transform="translate(6, 50)">
            <rect x="0" y="0" width="73" height="18" rx="4" fill="#18202c" stroke="rgba(136,192,208,0.25)" />
            <text x="6" y="10" fill="#88c0d0" fontSize="7.5" fontFamily="monospace" dominantBaseline="central">"Embed"</text>
            <text x="67" y="10" fill="#8996a7" fontSize="6.5" fontFamily="monospace" textAnchor="end" dominantBaseline="central">#8391</text>
          </g>

          <g transform="translate(6, 72)">
            <rect x="0" y="0" width="73" height="18" rx="4" fill="#1f2937" stroke="rgba(136,192,208,0.45)" />
            <text x="6" y="10" fill="#eceff4" fontSize="7.5" fontFamily="monospace" dominantBaseline="central">"Attn"</text>
            <text x="67" y="10" fill="#88c0d0" fontSize="6.5" fontFamily="monospace" textAnchor="end" dominantBaseline="central">#4021</text>
          </g>

          <text x="42" y="103" fill="#81a1c1" fontSize="7" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">
            dim: 512 float16
          </text>
        </g>

        {/* STAGE 2: Multi-Head Self-Attention Matrix (x: 138 to 242) */}
        <g transform="translate(138, 22)">
          <rect x="0" y="0" width="104" height="126" rx="10" fill="#0e131b" stroke="rgba(136,192,208,0.45)" strokeWidth="1.2" />
          <text x="52" y="14" fill="#eceff4" fontSize="8" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">
            2. Q·Kᵀ / √d
          </text>

          {/* Attention Weight Heatmap Matrix (4x4) */}
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3].map((c) => {
              const weight = [
                [0.85, 0.42, 0.12, 0.05],
                [0.35, 0.92, 0.28, 0.14],
                [0.18, 0.38, 0.88, 0.45],
                [0.08, 0.15, 0.52, 0.96],
              ][r][c];

              return (
                <rect
                  key={`heat-${r}-${c}`}
                  x={16 + c * 18}
                  y={26 + r * 18}
                  width="14"
                  height="14"
                  rx="3"
                  fill="#88c0d0"
                  fillOpacity={weight}
                  stroke={weight > 0.8 ? "#eceff4" : "none"}
                  strokeWidth="0.8"
                />
              );
            })
          )}

          {/* Q, K, V indicator badges */}
          <g transform="translate(14, 106)">
            <rect x="0" y="0" width="22" height="12" rx="2" fill="#1a2330" />
            <text x="11" y="7" fill="#88c0d0" fontSize="6.5" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">Q</text>
          </g>
          <g transform="translate(41, 106)">
            <rect x="0" y="0" width="22" height="12" rx="2" fill="#1a2330" />
            <text x="11" y="7" fill="#88c0d0" fontSize="6.5" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">K</text>
          </g>
          <g transform="translate(68, 106)">
            <rect x="0" y="0" width="22" height="12" rx="2" fill="#1a2330" />
            <text x="11" y="7" fill="#88c0d0" fontSize="6.5" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">V</text>
          </g>
        </g>

        {/* STAGE 3: Logits Probability & Nucleus Sampling (x: 275 to 360) */}
        <g transform="translate(275, 28)">
          <rect x="0" y="0" width="85" height="114" rx="8" fill="#11161f" stroke="rgba(136,192,208,0.3)" strokeWidth="1.2" />
          <text x="42" y="16" fill="#8996a7" fontSize="7.5" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">
            3. LOGITS TOP-K
          </text>

          {/* Candidate 1 */}
          <g transform="translate(6, 28)">
            <text x="0" y="8" fill="#88c0d0" fontSize="7.5" fontFamily="monospace">"intel"</text>
            <text x="73" y="8" fill="#eceff4" fontSize="7" fontFamily="monospace" textAnchor="end">84%</text>
            <rect x="0" y="12" width="58" height="4" rx="2" fill="#88c0d0" />
          </g>

          {/* Candidate 2 */}
          <g transform="translate(6, 48)">
            <text x="0" y="8" fill="#81a1c1" fontSize="7.5" fontFamily="monospace">"system"</text>
            <text x="73" y="8" fill="#8996a7" fontSize="7" fontFamily="monospace" textAnchor="end">12%</text>
            <rect x="0" y="12" width="28" height="4" rx="2" fill="#81a1c1" />
          </g>

          {/* Candidate 3 */}
          <g transform="translate(6, 68)">
            <text x="0" y="8" fill="#8996a7" fontSize="7.5" fontFamily="monospace">"logic"</text>
            <text x="73" y="8" fill="#8996a7" fontSize="7" fontFamily="monospace" textAnchor="end">4%</text>
            <rect x="0" y="12" width="12" height="4" rx="2" fill="rgba(136,192,208,0.3)" />
          </g>

          <text x="42" y="103" fill="#88c0d0" fontSize="7" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">
            T=0.7 · p=0.95
          </text>
        </g>
      </svg>

      {/* Floating Status Badge */}
      <div
        className={`pointer-events-none absolute top-3 flex items-center gap-1.5 font-mono text-[9px] text-frost ${
          inDialog ? "right-14 sm:right-16" : "right-3.5"
        }`}
      >
        <span className="pulse-soft h-1.5 w-1.5 rounded-full bg-frost" />
        <span>94.2 tokens/s</span>
      </div>
    </div>
  );
}

/** 02: Quant Learning & Alpha Lab — Candlesticks & Alpha Momentum */
function QuantAlphaArt({ inDialog }: { inDialog?: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-4 py-2">
      <svg
        viewBox="0 0 380 170"
        className="h-full w-full max-h-[160px]"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        aria-hidden="true"
      >
        {/* Financial Coordinate Gridlines */}
        <g stroke="rgba(236,239,244,0.06)">
          <line x1="30" y1="30" x2="350" y2="30" />
          <line x1="30" y1="65" x2="350" y2="65" />
          <line x1="30" y1="100" x2="350" y2="100" />
          <line x1="30" y1="135" x2="350" y2="135" />
        </g>

        {/* Candlesticks */}
        {[
          { x: 55, w1: 75, w2: 115, bY: 85, bH: 18, isUp: true },
          { x: 85, w1: 65, w2: 105, bY: 72, bH: 22, isUp: true },
          { x: 115, w1: 70, w2: 120, bY: 80, bH: 28, isUp: false },
          { x: 145, w1: 85, w2: 135, bY: 95, bH: 20, isUp: false },
          { x: 175, w1: 60, w2: 110, bY: 68, bH: 30, isUp: true },
          { x: 205, w1: 45, w2: 90, bY: 52, bH: 26, isUp: true },
          { x: 235, w1: 35, w2: 80, bY: 42, bH: 28, isUp: true },
          { x: 265, w1: 42, w2: 88, bY: 48, bH: 22, isUp: false },
          { x: 295, w1: 25, w2: 70, bY: 32, bH: 28, isUp: true },
          { x: 325, w1: 18, w2: 58, bY: 24, bH: 24, isUp: true },
        ].map((c, idx) => (
          <g key={`candle-${idx}`}>
            <line x1={c.x} y1={c.w1} x2={c.x} y2={c.w2} stroke={c.isUp ? "#88c0d0" : "#81a1c1"} strokeWidth="1.2" />
            <rect
              x={c.x - 5}
              y={c.bY}
              width="10"
              height={c.bH}
              fill={c.isUp ? "#88c0d0" : "#171e28"}
              stroke={c.isUp ? "#88c0d0" : "#81a1c1"}
              strokeWidth="1.2"
              rx="2"
            />
          </g>
        ))}

        {/* Fast EMA 20 (Glowing Cyan) */}
        <path
          d="M 45 105 C 95 100, 145 90, 195 65 C 245 40, 285 32, 335 18"
          fill="none"
          stroke="#88c0d0"
          strokeWidth="2.2"
        />

        {/* Slow EMA 50 (Glacier Dashed) */}
        <path
          d="M 45 115 C 95 112, 145 106, 195 82 C 245 60, 285 52, 335 34"
          fill="none"
          stroke="#81a1c1"
          strokeWidth="1.4"
          strokeDasharray="4 3"
        />

        {/* Alpha Momentum Crossover Signal Marker at x=195 */}
        <circle cx="195" cy="65" r="4.5" fill="#eceff4" stroke="#88c0d0" strokeWidth="2" />
      </svg>

      {/* Floating Status Badge */}
      <div
        className={`pointer-events-none absolute top-3 flex items-center gap-1.5 font-mono text-[9px] text-frost ${
          inDialog ? "right-14 sm:right-16" : "right-3.5"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-frost" />
        <span>Sharpe / 2.34</span>
      </div>
    </div>
  );
}

/** 03: JeevanSetu — Healthcare Lifeline & Emergency Matching Network */
function JeevanSetuArt({ inDialog }: { inDialog?: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-4 py-2">
      <svg
        viewBox="0 0 380 170"
        className="h-full w-full max-h-[160px]"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ecg-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#81a1c1" stopOpacity="0.2" />
            <stop offset="35%" stopColor="#88c0d0" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#eceff4" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#88c0d0" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Pulse ECG Heartbeat Line (Left side: x: 25 to 200) */}
        <path
          d="M 25 90 L 70 90 L 78 74 L 86 110 L 96 36 L 106 142 L 116 76 L 124 98 L 132 90 L 200 90"
          stroke="url(#ecg-line)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right side: Donor Matching Network Mesh (x: 210 to 350) */}
        <g transform="translate(210, 20)">
          {/* Central Emergency Hub */}
          <circle cx="65" cy="65" r="22" fill="#141a24" stroke="rgba(136,192,208,0.25)" strokeWidth="1" />
          <circle cx="65" cy="65" r="14" fill="#1a2332" stroke="#88c0d0" strokeWidth="1.5" />
          <text x="65" y="68" fill="#eceff4" fontSize="10" fontFamily="monospace" textAnchor="middle" dominantBaseline="central" fontWeight="bold">+</text>

          {/* Donor Node O- */}
          <circle cx="15" cy="30" r="13" fill="#141a24" stroke="#88c0d0" strokeWidth="1.4" />
          <text x="15" y="32" fill="#88c0d0" fontSize="8.5" fontFamily="monospace" textAnchor="middle" dominantBaseline="central" fontWeight="bold">O-</text>

          {/* Donor Node A+ */}
          <circle cx="115" cy="25" r="12" fill="#141a24" stroke="#81a1c1" strokeWidth="1.2" />
          <text x="115" y="27" fill="#eceff4" fontSize="8" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">A+</text>

          {/* Donor Node B+ */}
          <circle cx="100" cy="100" r="13" fill="#141a24" stroke="#88c0d0" strokeWidth="1.2" />
          <text x="100" y="102" fill="#88c0d0" fontSize="8" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">B+</text>

          {/* Connection Dispatch Lines */}
          <line x1="28" y1="38" x2="52" y2="56" stroke="#88c0d0" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="77" y1="58" x2="103" y2="34" stroke="#88c0d0" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="74" y1="74" x2="90" y2="92" stroke="#88c0d0" strokeWidth="1.2" strokeDasharray="3 2" />
        </g>
      </svg>

      {/* Floating Status Badge */}
      <div
        className={`pointer-events-none absolute top-3 flex items-center gap-1.5 font-mono text-[9px] text-frost ${
          inDialog ? "right-14 sm:right-16" : "right-3.5"
        }`}
      >
        <span className="pulse-soft h-1.5 w-1.5 rounded-full bg-frost" />
        <span>Emergency Match: Active</span>
      </div>
    </div>
  );
}

/** 04: Wardrobe Engine — Scaled Up in Card View for Enhanced Presence */
function WardrobeArt({ inDialog }: { inDialog?: boolean }) {
  return (
    <div className={`relative flex h-full w-full items-center justify-center ${inDialog ? "px-4 py-1" : "p-2 sm:p-4"}`}>
      <svg
        viewBox="0 0 380 170"
        className={`w-full transition-transform duration-300 origin-center ${
          inDialog
            ? "h-full max-h-[155px]"
            : "h-full max-h-[210px] sm:max-h-[240px] md:max-h-[265px] scale-[0.98] sm:scale-[1.02] md:scale-[1.06]"
        }`}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="score-bar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#81a1c1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#88c0d0" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Combinatorial Flow Connecting Lines */}
        <path
          d="M 125 55 C 155 55, 155 85, 185 85"
          stroke="#88c0d0"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <path
          d="M 125 85 L 185 85"
          stroke="#88c0d0"
          strokeWidth="1.5"
        />
        <path
          d="M 125 115 C 155 115, 155 85, 185 85"
          stroke="#88c0d0"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <path
          d="M 270 85 L 295 85"
          stroke="#88c0d0"
          strokeWidth="2"
        />

        {/* STAGE 1: Clothing Item Nodes (Tops, Bottoms, Shoes) */}
        <g transform="translate(25, 38)">
          <rect x="0" y="0" width="100" height="94" rx="8" fill="#11161f" stroke="rgba(136,192,208,0.3)" strokeWidth="1.2" />
          <text x="50" y="14" fill="#8996a7" fontSize="7" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">
            WARDROBE ITEMS
          </text>

          <g transform="translate(8, 24)">
            <rect x="0" y="0" width="84" height="18" rx="4" fill="#18202c" stroke="rgba(136,192,208,0.2)" />
            <text x="6" y="10" fill="#88c0d0" fontSize="7" fontFamily="monospace" dominantBaseline="central">Top: Oxford</text>
          </g>
          <g transform="translate(8, 46)">
            <rect x="0" y="0" width="84" height="18" rx="4" fill="#18202c" stroke="rgba(136,192,208,0.2)" />
            <text x="6" y="10" fill="#88c0d0" fontSize="7" fontFamily="monospace" dominantBaseline="central">Bottom: Chino</text>
          </g>
          <g transform="translate(8, 68)">
            <rect x="0" y="0" width="84" height="18" rx="4" fill="#18202c" stroke="rgba(136,192,208,0.2)" />
            <text x="6" y="10" fill="#88c0d0" fontSize="7" fontFamily="monospace" dominantBaseline="central">Shoes: Derbies</text>
          </g>
        </g>

        {/* STAGE 2: Deterministic Scoring Engine */}
        <g transform="translate(185, 28)">
          <rect x="0" y="0" width="85" height="114" rx="8" fill="#0e131b" stroke="rgba(136,192,208,0.45)" strokeWidth="1.2" />
          <text x="42" y="14" fill="#eceff4" fontSize="7.5" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">
            SCORING ENGINE
          </text>

          <g transform="translate(8, 26)">
            <text x="0" y="8" fill="#8996a7" fontSize="6.5" fontFamily="monospace">Style Harmony</text>
            <text x="69" y="8" fill="#88c0d0" fontSize="6.5" fontFamily="monospace" textAnchor="end">+32</text>
            <rect x="0" y="12" width="60" height="3" rx="1.5" fill="#88c0d0" />
          </g>

          <g transform="translate(8, 46)">
            <text x="0" y="8" fill="#8996a7" fontSize="6.5" fontFamily="monospace">Color Matching</text>
            <text x="69" y="8" fill="#88c0d0" fontSize="6.5" fontFamily="monospace" textAnchor="end">+28</text>
            <rect x="0" y="12" width="52" height="3" rx="1.5" fill="#88c0d0" />
          </g>

          <g transform="translate(8, 66)">
            <text x="0" y="8" fill="#8996a7" fontSize="6.5" fontFamily="monospace">Recency Penalty</text>
            <text x="69" y="8" fill="#81a1c1" fontSize="6.5" fontFamily="monospace" textAnchor="end">-6</text>
            <rect x="0" y="12" width="20" height="3" rx="1.5" fill="#81a1c1" />
          </g>

          <text x="42" y="102" fill="#88c0d0" fontSize="7" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">
            Threshold: &gt;60
          </text>
        </g>

        {/* STAGE 3: Final Outfit Score Output */}
        <g transform="translate(295, 48)">
          <rect x="0" y="0" width="65" height="74" rx="8" fill="#141a24" stroke="rgba(136,192,208,0.5)" strokeWidth="1.4" />
          <text x="32" y="16" fill="#8996a7" fontSize="7" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">
            FIT SCORE
          </text>

          <text x="32" y="40" fill="#eceff4" fontSize="22" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" dominantBaseline="central">
            88
          </text>

          <rect x="10" y="56" width="45" height="12" rx="3" fill="#1f2a3a" />
          <text x="32" y="62" fill="#88c0d0" fontSize="6.5" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">
            MATCH #1
          </text>
        </g>
      </svg>

      {/* Floating Status Badge */}
      <div
        className={`pointer-events-none absolute top-3 flex items-center gap-1.5 font-mono text-[9px] text-frost ${
          inDialog ? "right-14 sm:right-16" : "right-3.5"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-frost" />
        <span>Deterministic Scoring</span>
      </div>
    </div>
  );
}
