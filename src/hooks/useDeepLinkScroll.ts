import { useEffect } from "react";

/**
 * Handles explicit hashtag deep links, but prevents unwanted auto-scrolling
 * on initial load or reload so visitors always start at the Hero / Overview section.
 */
export function useDeepLinkScroll() {
  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Always ensure initial load starts at the top (Hero / Overview)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Clean up any stale hash in the URL on fresh page load without reloading
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);
}
