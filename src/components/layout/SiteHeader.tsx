import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigationSections, profile } from "../../content/siteConfig";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import SiteLogo from "./SiteLogo";

type SiteHeaderProps = {
  activeSectionId: string;
};

/** Sections shown directly in the desktop header. */
const DESKTOP_MENU_IDS = ["work", "arsenal", "approach", "experience", "journal"];

export default function SiteHeader({ activeSectionId }: SiteHeaderProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const desktopLinks = navigationSections.filter((section) => DESKTOP_MENU_IDS.includes(section.id));

  useBodyScrollLock(isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          hasScrolled
            ? "border-white/[0.07] bg-[#03060d]/72 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[76px] items-center justify-between gap-6">
          <SiteLogo />

          {/* DESKTOP MENU — labels come from content/siteConfig.ts */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {desktopLinks.map((section) => {
              const isActive = activeSectionId === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative rounded-full px-3.5 py-2 text-[12.5px] transition-colors duration-300 ${
                    isActive ? "text-snow" : "text-mist/70 hover:text-snow"
                  }`}
                >
                  {section.label}
                  <span
                    className={`absolute bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-frost transition-all duration-400 ${
                      isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            {/* VISIBLE: availability indicator (profile.availabilityShort) */}
            <span className="hidden items-center gap-2 xl:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-frost opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-frost" />
              </span>
              <span className="mono-label text-[10.5px] tracking-[0.12em] text-mist">
                {profile.availabilityShort}
              </span>
            </span>

            {/* VISIBLE: header call-to-action button */}
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full bg-frost px-4.5 py-2.5 text-[12px] font-medium tracking-[-0.01em] text-[#11161c] transition-all duration-300 hover:bg-[#a9d5df] hover:shadow-[0_0_28px_rgba(136,192,208,0.22)] sm:inline-flex"
            >
              Start a project
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </a>

            <button
              type="button"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-snow transition-colors hover:border-frost/40 hover:bg-white/[0.05] lg:hidden"
            >
              {isMenuOpen ? <X className="h-4 w-4" strokeWidth={1.6} /> : <Menu className="h-4 w-4" strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU — every label comes from content/siteConfig.ts */}
      <div
        id="mobile-navigation-menu"
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-40 lg:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
          className={`modal-backdrop absolute inset-0 transition-opacity duration-500 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-3 top-[84px] rounded-[24px] border border-white/10 bg-[#0a0e17]/96 p-3 shadow-[0_34px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-all duration-500 ${
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <div className="mb-2 flex items-center justify-between px-3 py-2">
            <span className="mono-label text-[9px] text-dim">
              Index / {String(navigationSections.length).padStart(2, "0")} sections
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-frost" />
              <span className="mono-label text-[9px] text-mist/70">available</span>
            </span>
          </div>

          <nav className="flex flex-col" aria-label="Mobile navigation">
            {navigationSections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={() => setIsMenuOpen(false)}
                className={`group flex items-center justify-between rounded-xl px-3 py-3 transition-colors ${
                  activeSectionId === section.id
                    ? "bg-white/[0.055] text-snow"
                    : "text-mist/75 hover:bg-white/[0.04] hover:text-snow"
                }`}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-[9px] tracking-[0.12em] text-frost/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[20px] tracking-[-0.02em]">{section.label}</span>
                </span>
                <ArrowUpRight
                  className={`h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                    activeSectionId === section.id ? "text-frost" : "text-dim"
                  }`}
                  strokeWidth={1.5}
                />
              </a>
            ))}
          </nav>

          <div className="mt-3 border-t border-white/[0.07] px-3 pt-4 pb-2">
            {/* VISIBLE: email + location inside the mobile menu */}
            <a
              href={`mailto:${profile.email}`}
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between text-[13px] text-mist transition-colors hover:text-snow"
            >
              {profile.email}
              <span className="mono-label text-[8px] text-frost">email</span>
            </a>
            <p className="mt-2 text-[11px] text-dim">
              {profile.location} · {profile.coordinates}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
