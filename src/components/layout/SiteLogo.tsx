import { profile } from "../../content/siteConfig";

/**
 * The small star mark used in the header and footer.
 * The name beside it comes from content/siteConfig.ts → profile.wordmark.
 */
export function StarMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-[11px] border border-white/12 bg-white/[0.045] ${className}`}
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(136,192,208,0.22),transparent_65%)]" />
      <svg viewBox="0 0 32 32" className="relative h-[22px] w-[22px]" fill="none">
        <path
          d="M16 4.5l2.15 9.35L27.5 16l-9.35 2.15L16 27.5l-2.15-9.35L4.5 16l9.35-2.15L16 4.5Z"
          fill="#A9D4DF"
        />
        <circle cx="16" cy="16" r="2.1" fill="#171B22" />
      </svg>
    </span>
  );
}

/** Header lockup: star mark + two-line name. */
export default function SiteLogo() {
  return (
    <a href="#top" className="group flex items-center gap-3 rounded-sm" aria-label={`${profile.fullName} — back to top`}>
      <StarMark className="h-10 w-10 transition-transform duration-500 group-hover:rotate-[22deg]" />
      <span className="flex flex-col leading-none">
        {/* VISIBLE: your name (profile.wordmark) */}
        <span className="font-display text-[15px] font-medium tracking-[0.01em] text-snow">
          {profile.wordmark}
          <span className="text-frost">.</span>
        </span>
        {/* VISIBLE: your role (profile.role) */}
        <span className="mono-label mt-1.5 text-[8.5px] tracking-[0.19em] text-dim">
          {profile.role}
        </span>
      </span>
    </a>
  );
}
