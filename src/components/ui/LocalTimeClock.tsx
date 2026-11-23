import { useEffect, useState } from "react";
import { profile } from "../../content/siteConfig";

/** Formats the current time in the time zone set in content/siteConfig.ts. */
function readLocalTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: profile.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

/**
 * Live clock shown in the contact card.
 * VISIBLE: the time and the small "oslo" label below it.
 */
export default function LocalTimeClock() {
  const [currentTime, setCurrentTime] = useState(readLocalTime);
  const cityLabel = profile.location.split(",")[0]?.trim().toLowerCase() || "local";

  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(readLocalTime()), 20_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-baseline gap-1.5 font-display text-[14px] tabular-nums text-snow/90">
      {currentTime}
      <span className="mono-label text-[10px] tracking-[0.12em] text-dim">{cityLabel}</span>
    </span>
  );
}
