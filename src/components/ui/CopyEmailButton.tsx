import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "../../content/siteConfig";

/**
 * The email address plus a "copy" button.
 * The address itself is edited in src/content/siteConfig.ts → profile.email.
 */
export default function CopyEmailButton() {
  const [hasCopied, setHasCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    },
    []
  );

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setHasCopied(true);
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setHasCopied(false), 2200);
    } catch {
      // Older browsers: fall back to opening the visitor's mail app.
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* VISIBLE: the email address (edit profile.email in content/siteConfig.ts) */}
      <a
        href={`mailto:${profile.email}`}
        className="group inline-flex min-w-0 items-center gap-3 rounded-full border border-white/12 bg-white/[0.035] py-2 pr-4 pl-4 text-snow transition-colors hover:border-frost/35 hover:bg-white/[0.06] sm:py-2.5 sm:pr-5 sm:pl-5"
      >
        <span className="truncate font-display text-[15px] tracking-[-0.02em] sm:text-[19px]">
          {profile.email}
        </span>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-frost transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.6}
        />
      </a>

      <button
        type="button"
        onClick={copyAddress}
        aria-live="polite"
        className="inline-flex h-[42px] items-center gap-2 rounded-full border border-white/10 px-3.5 text-[11px] text-mist/70 transition-colors hover:border-frost/30 hover:text-snow sm:h-[46px]"
      >
        {hasCopied ? (
          <Check className="h-3.5 w-3.5 text-frost" strokeWidth={1.8} />
        ) : (
          <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
        )}

        {/* VISIBLE: button label — change "copy" / "copied" here */}
        <span className="mono-label text-[8px] tracking-[0.12em]">
          {hasCopied ? "copied" : "copy"}
        </span>
      </button>
    </div>
  );
}
