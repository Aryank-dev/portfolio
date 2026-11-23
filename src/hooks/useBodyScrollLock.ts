import { useEffect } from "react";

/**
 * Locks page scrolling while a dialog or mobile menu is open.
 *
 * A shared counter means overlapping overlays cannot accidentally unlock the
 * page early when only one of them closes.
 */
let activeLocks = 0;

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    activeLocks += 1;
    document.body.classList.add("no-scroll");

    return () => {
      activeLocks = Math.max(0, activeLocks - 1);
      if (activeLocks === 0) document.body.classList.remove("no-scroll");
    };
  }, [isLocked]);
}
