import { ArrowDown, ArrowUpRight } from "lucide-react";
import { heroContent } from "../../content/siteConfig";
import HeroTelemetryPanel from "../hero/HeroTelemetryPanel";

/* ══════════════════════════════════════════════════════════════════════════
   HERO / OVERVIEW — the first screen visitors see
   ──────────────────────────────────────────────────────────────────────────
   All headline, paragraph, button, and statistic text lives in
   src/content/siteConfig.ts → heroContent + profile.
   This file controls layout only.
   ══════════════════════════════════════════════════════════════════════════ */

export default function HeroOverviewSection() {
  return (
    <section
      id="top"
      data-section="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] scroll-mt-24 items-center pt-28 pb-12 sm:pt-32 lg:pb-16 overflow-hidden"
    >
      {/* 3D Neural Celestial Sphere shifted 4cm (4vw) to the right with zero borderline */}
      <div className="pointer-events-auto absolute right-[-280px] lg:right-[-240px] xl:right-[-200px] top-1/2 -translate-y-1/2 translate-x-[4vw] z-10 hidden md:block select-none">
        <HeroTelemetryPanel />
      </div>

      <div className="shell relative z-20 w-full">
        {/* Left Column: Headline, intro, CTA buttons, and statistics */}
        <div className="max-w-[560px] sm:max-w-[600px] lg:max-w-[620px] xl:max-w-[660px]">
          {/* VISIBLE: eyebrow label and location */}
          <p
            className="intro-rise flex flex-wrap items-center gap-x-3 gap-y-2"
            style={{ animationDelay: "80ms" }}
          >
            <span className="flex items-center gap-2.5">
              <span className="h-px w-7 bg-frost/70" />
              <span className="mono-label text-[10.5px] tracking-[0.17em] text-frost">
                {heroContent.eyebrow}
              </span>
            </span>
            <span className="hidden h-2.5 w-px bg-white/20 sm:block" />
            <span className="font-mono text-[10.5px] tracking-[0.12em] text-dim">
              {heroContent.locationLabel}
            </span>
          </p>

          {/* VISIBLE: main headline */}
          <h1
            id="hero-title"
            className="display-title mt-6 text-[clamp(3.35rem,7.15vw,6.1rem)] text-snow sm:mt-7"
            style={{ animationDelay: "160ms" }}
          >
            {heroContent.headingLineOne}
            <br />
            {heroContent.headingLineTwo}{" "}
            <span className="text-gradient text-frost-glow">
              {heroContent.headingHighlight}
              <span className="text-snow/35">.</span>
            </span>
          </h1>

          {/* VISIBLE: intro paragraph */}
          <p
            className="intro-rise mt-6 max-w-[500px] text-[15px] leading-[1.8] text-mist/90 sm:mt-7 sm:text-[16px]"
            style={{ animationDelay: "260ms" }}
          >
            {heroContent.introduction}
          </p>

          {/* VISIBLE: two hero buttons */}
          <div
            className="intro-rise mt-7 flex flex-col items-stretch gap-2.5 sm:mt-8 sm:flex-row sm:items-center"
            style={{ animationDelay: "340ms" }}
          >
            <a
              href={heroContent.primaryAction.href}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-frost px-5 py-3 text-[12.5px] font-medium text-[#11161c] transition-all duration-300 hover:bg-[#a9d5df] hover:shadow-[0_0_32px_rgba(136,192,208,0.18)] active:scale-[0.99]"
            >
              {heroContent.primaryAction.label}
              <ArrowDown
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                strokeWidth={1.8}
              />
            </a>
            <a
              href={heroContent.secondaryAction.href}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.035] px-5 py-3 text-[12.5px] text-mist transition-all duration-300 hover:border-frost/40 hover:bg-white/[0.06] hover:text-snow"
            >
              {heroContent.secondaryAction.label}
              <ArrowUpRight
                className="h-3.5 w-3.5 text-frost transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.7}
              />
            </a>
          </div>

          {/* VISIBLE: three hero statistics */}
          <div
            className="intro-rise mt-9 grid max-w-[470px] grid-cols-3 gap-5 border-t border-white/[0.1] pt-5 sm:mt-11 sm:gap-8"
            style={{ animationDelay: "430ms" }}
          >
            {heroContent.stats.map((stat) => (
              <div key={stat.label}>
                <p className="flex items-baseline gap-1.5">
                  <span className="font-display text-[26px] leading-none tracking-[-0.045em] text-snow">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.08em] text-frost">
                    {stat.unit}
                  </span>
                </p>
                <p className="mt-2 text-[11px] leading-snug text-dim sm:text-[11.5px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
