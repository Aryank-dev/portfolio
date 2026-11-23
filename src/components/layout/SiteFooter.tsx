import { footerContent, profile } from "../../content/siteConfig";
import BackToTopButton from "../ui/BackToTopButton";
import { StarMark } from "./SiteLogo";

/**
 * Footer. All microcopy is edited in src/content/siteConfig.ts →
 * profile and footerContent.
 */
export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08]">
      <div className="shell flex flex-col gap-6 py-7 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2.5">
            <StarMark className="h-6 w-6 rounded-[7px]" />
            {/* VISIBLE: copyright line */}
            <span className="font-mono text-[11px] tracking-[0.08em] text-dim">
              © {profile.copyrightYear} {profile.fullName}
            </span>
          </span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          {/* VISIBLE: "designed & built in…" */}
          <span className="hidden font-mono text-[11px] tracking-[0.05em] text-dim sm:block">
            {footerContent.builtIn}
          </span>
        </div>

        {/* VISIBLE: tech stack note */}
        <p className="hidden items-center gap-2 font-mono text-[10.5px] tracking-[0.08em] text-dim lg:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-frost" />
          {footerContent.stack}
        </p>

        <BackToTopButton />
      </div>

      <div className="shell flex flex-col gap-2 border-t border-white/[0.05] py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* VISIBLE: shader note and build note */}
        <span className="font-mono text-[10.5px] tracking-[0.09em] text-dim">
          {footerContent.shaderNote}
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.09em] text-dim/80">
          {footerContent.buildNote}
        </span>
      </div>
    </footer>
  );
}
