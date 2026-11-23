import { ArrowUpRight } from "lucide-react";
import { contactContent, profile, socialLinks } from "../../content/siteConfig";
import SectionLabel from "../layout/SectionLabel";
import CopyEmailButton from "../ui/CopyEmailButton";
import LocalTimeClock from "../ui/LocalTimeClock";
import ScrollReveal from "../ui/ScrollReveal";

/* ══════════════════════════════════════════════════════════════════════════
   CONTACT / CALL TO ACTION — the closing section
   ──────────────────────────────────────────────────────────────────────────
   ✏️ Heading, paragraph, and detail rows: contactContent in siteConfig.ts.
   ✏️ Email and availability: profile in siteConfig.ts.
   ✏️ Social links: socialLinks in siteConfig.ts.
   ══════════════════════════════════════════════════════════════════════════ */

export default function ContactCallToActionSection() {
  return (
    <section
      id="contact"
      data-section="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-20 py-20 sm:py-24 lg:py-28"
    >
      <div className="shell">
        <SectionLabel section="contact" />

        <div className="glass relative mt-7 overflow-hidden rounded-[30px] p-6 sm:p-9 lg:p-12">
          <div className="card-sheen -top-48 -right-36 h-[34rem] w-[34rem]" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -bottom-48 -left-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(129,161,193,0.1),transparent_68%)]"
            aria-hidden="true"
          />
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.09] pb-6">
              {/* VISIBLE: availability line */}
              <span className="mono-label flex items-center gap-2.5 text-[10px] tracking-[0.15em] text-mist">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-frost opacity-60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-frost" />
                </span>
                {profile.availabilityLong}
              </span>
              {/* VISIBLE: availability slot */}
              <span className="font-mono text-[10px] tracking-[0.09em] text-dim">
                {profile.availabilitySlot}
              </span>
            </div>

            <ScrollReveal>
              {/* VISIBLE: big closing headline */}
              <h2
                id="contact-title"
                className="display-title mt-9 max-w-[900px] text-[clamp(2.9rem,6vw,5.2rem)] text-snow sm:mt-11"
              >
                {contactContent.headingLineOne}
                <br />
                <span className="text-gradient">{contactContent.headingHighlight}</span>
              </h2>
            </ScrollReveal>

            <div className="mt-9 grid gap-9 border-t border-white/[0.09] pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
              <ScrollReveal delayMs={90}>
                {/* VISIBLE: contact paragraph */}
                <p className="max-w-[420px] text-[14px] leading-[1.8] text-mist/90">
                  {contactContent.introduction}
                </p>
                <div className="mt-6">
                  <CopyEmailButton />
                </div>
                {/* VISIBLE: secondary contact line */}
                <p className="mt-3.5 font-mono text-[10px] tracking-[0.05em] text-dim">
                  {contactContent.secondaryPrompt}{" "}
                  <a
                    href={`mailto:${profile.email}?subject=${encodeURIComponent(
                      contactContent.secondarySubject
                    )}`}
                    className="link-underline text-mist transition-colors hover:text-frost"
                  >
                    {contactContent.secondaryActionLabel}
                  </a>
                  .
                </p>
              </ScrollReveal>

              <ScrollReveal delayMs={160}>
                {/* VISIBLE: four detail rows */}
                <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-start lg:border-l lg:border-white/[0.08] lg:pl-10">
                  {contactContent.details.map((detail) => (
                    <div key={detail.label}>
                      <dt className="mono-label text-[9.5px] tracking-[0.14em] text-dim">
                        {detail.label}
                      </dt>
                      <dd className="mt-2 text-[13px] text-mist">
                        {detail.showClock ? <LocalTimeClock /> : detail.value}
                      </dd>
                      <dd className="mt-0.5 font-mono text-[10px] text-dim">{detail.detail}</dd>
                    </div>
                  ))}
                </dl>
              </ScrollReveal>
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-white/[0.09] pt-6 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {/* VISIBLE: social links — edit socialLinks in siteConfig.ts */}
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[12px] text-mist transition-colors hover:text-snow"
                  >
                    {social.label}
                    <ArrowUpRight
                      className="h-3 w-3 text-dim/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-frost"
                      strokeWidth={1.5}
                    />
                  </a>
                ))}
              </div>

              {/* VISIBLE: final call to action */}
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(
                  contactContent.primaryAction.subject
                )}`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-frost px-4.5 py-2.5 text-[12px] font-medium text-[#11161c] transition-all duration-300 hover:bg-[#a9d5df] hover:shadow-[0_0_30px_rgba(136,192,208,0.2)]"
              >
                {contactContent.primaryAction.label}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
