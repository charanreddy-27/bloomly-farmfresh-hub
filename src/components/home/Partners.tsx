import { ChapterLabel } from "@/components/site/ChapterLabel";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { partners } from "@/lib/content";

type Logo = (typeof partners.logos)[number];

function LogoRow({ logos, reverse, duration }: { logos: readonly Logo[]; reverse?: boolean; duration: string }) {
  // Two copies per half so the loop never shows a gap on wide screens.
  const half = [...logos, ...logos];
  return (
    <div className="mask-fade-x pause-on-hover flex overflow-hidden">
      <div
        className={`flex w-max shrink-0 gap-4 pr-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {[...half, ...half].map((logo, i) => (
          <div
            key={i}
            className="group grid h-24 w-44 shrink-0 place-items-center rounded-3xl border border-forest/5 bg-white p-5 shadow-[0_10px_30px_-20px_rgba(7,38,26,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(7,38,26,0.45)] md:h-28 md:w-56 md:p-6"
            aria-hidden={i >= logos.length}
          >
            <span className="relative grid place-items-center">
              <img
                src={logo.mono}
                alt={i < logos.length ? logo.name : ""}
                loading="lazy"
                style={{ height: logo.h }}
                className="w-auto max-w-[9.5rem] object-contain opacity-55 transition-opacity duration-500 group-hover:opacity-0"
              />
              <img
                src={logo.src}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute max-h-14 w-auto max-w-[10.5rem] object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  const reversed = [...partners.logos].reverse();
  return (
    <section id="partners" className="relative overflow-hidden bg-cream py-28 md:py-40">
      <div className="container">
        <ChapterLabel number="06" label="The partners" />
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SplitText text={partners.headline} className="display-lg max-w-3xl text-forest" accentClassName="accent-italic text-leaf-600" />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-lg text-ink-soft">{partners.sub}</p>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-16 space-y-4 md:mt-20" amount={0.1}>
        <LogoRow logos={partners.logos} duration="55s" />
        <LogoRow logos={reversed} reverse duration="65s" />
      </Reveal>
    </section>
  );
}
