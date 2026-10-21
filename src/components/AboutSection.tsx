import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { Reveal } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/* What a farmer loses in the mandi chain before being paid (from the investor deck). */
const leakage = [
  { name: "Commission", value: "10%", share: 10, tone: "bg-ink" },
  { name: "Wastage deduction", value: "10%", share: 10, tone: "bg-ink/50" },
  { name: "Handling", value: "1–2%", share: 2, tone: "bg-ink/20" },
];
const leakageTotal = leakage.reduce((sum, l) => sum + l.share, 0);

const businessPains = [
  "Too small for any single agent to commit to reliably",
  "Daily supply gaps at the store",
  "A-grade sold with B-grade mixed in",
];

const benefits = [
  { title: "Hybrid Purchase Model", body: "Farmers can sell at the farm gate or at our distribution centers." },
  { title: "Fair & Transparent", body: "Market access with transparent pricing and reliable payments." },
  { title: "Reliable Distribution", body: "Consistent supply to all types of retail partners." },
];

const cardLabel = "text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-ink-muted";
const cardFigure = "mt-6 text-[2.75rem] font-extrabold leading-none tracking-[-0.04em] text-ink md:text-5xl";

/** The mission statement on a deep-green band, with the leaf mark building itself beside it. */
function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.45 });

  return (
    <section id="about" className="bg-forest-900 text-white">
      <div ref={ref} className="container grid items-center gap-12 py-24 md:py-32 lg:grid-cols-[2fr_1fr] lg:gap-12">
        <div>
          <motion.p
            className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-leaf-300"
            initial={{ opacity: 0, y: 12 }}
            animate={seen ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Our mission
          </motion.p>
          <motion.h2
            className="mt-6 text-[clamp(2rem,3.7vw,3.1rem)] font-extrabold leading-[1.14] tracking-[-0.03em]"
            initial={{ opacity: 0, y: 18 }}
            animate={seen ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          >
            Bloomly is on a mission to build the strongest{" "}
            <motion.span
              className="bg-[linear-gradient(#7FC141,#7FC141)] bg-left-bottom bg-no-repeat pb-1 text-leaf-300 [-webkit-box-decoration-break:clone] [box-decoration-break:clone]"
              initial={{ backgroundSize: "0% 3px" }}
              animate={seen ? { backgroundSize: "100% 3px" } : undefined}
              transition={{ duration: 1.1, ease: EASE, delay: 0.7 }}
            >
              fruit sourcing ecosystem
            </motion.span>{" "}
            in India.
          </motion.h2>
        </div>

        <BloomlyLogo mark play={seen} className="mx-auto hidden w-44 lg:block" title="" />
      </div>
    </section>
  );
}

const AboutSection = () => {
  return (
    <>
      <Mission />

      <section className="section">
        <div className="container">
          {/* The Challenge */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <h3 className="h-section">
                The <span className="hl">Challenge</span>
              </h3>
              <div className="mt-6 space-y-5 text-ink-soft">
                <p>
                  We observed a core challenge in the market: even the largest retail chains and general trade players struggle
                  to source fruits consistently and at the right quality.
                </p>
                <p>
                  While businesses excel at selling to end customers, sourcing remains their biggest bottleneck. Reliable,
                  consistent supply is the true backbone of the fresh produce value chain.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:col-span-7">
              {/* The farmer */}
              <Reveal className="card flex flex-col p-7 md:p-8">
                <p className={cardLabel}>The farmer</p>
                <p className={cardFigure}>21–22%</p>
                <p className="mt-3 text-lg font-bold leading-snug text-ink">of value is gone before the farmer is paid</p>

                <div className="mt-6 flex h-2 gap-1" aria-hidden>
                  {leakage.map((l, i) => (
                    <motion.span
                      key={l.name}
                      className={`origin-left rounded-full ${l.tone}`}
                      style={{ width: `${(l.share / leakageTotal) * 100}%` }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.18 }}
                    />
                  ))}
                </div>
                <ul className="mt-4 space-y-2 text-[0.9375rem]">
                  {leakage.map((l) => (
                    <li key={l.name} className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2.5 text-ink-soft">
                        <span className={`h-2 w-2 rounded-full ${l.tone}`} />
                        {l.name}
                      </span>
                      <span className="font-bold text-ink">{l.value}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  Then a wait for payment, with no say on grade or price.
                </p>
              </Reveal>

              {/* The business */}
              <Reveal delay={0.08} className="card flex flex-col p-7 md:p-8">
                <p className={cardLabel}>The business</p>
                <p className={cardFigure}>~50 kg</p>
                <p className="mt-3 text-lg font-bold leading-snug text-ink">a day is all one modern-trade store needs</p>

                <ul className="mt-6 divide-y divide-line border-t border-line text-[0.9375rem]">
                  {businessPains.map((pain) => (
                    <li key={pain} className="py-3 text-ink-soft last:pb-0">
                      {pain}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          {/* Our Solution */}
          <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:items-center lg:gap-14">
            <Reveal className="lg:order-2 lg:col-span-5">
              <h3 className="h-section">
                Our <span className="hl">Solution</span>
              </h3>
              <div className="mt-6 space-y-5 text-ink-soft">
                <p>
                  Bloomly set out to solve this as the private mandi: owned and transparent. Through our hybrid purchase model,
                  we source quality produce and ensure efficient distribution. This gives farmers fair market access,
                  transparent pricing, and reliable payments.
                </p>
                <p>
                  For businesses, Bloomly bridges the sourcing gap, ensuring general trade and both online and offline
                  businesses receive fresh, reliable, and dependable fruits, consistently. We take care of sourcing with trust
                  and efficiency, so businesses can focus on their customers.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="card lg:order-1 lg:col-span-7">
              <ul className="divide-y divide-line">
                {benefits.map((b) => (
                  <li key={b.title} className="px-7 py-6 md:px-9 md:py-7">
                    <h4 className="text-lg font-bold text-ink md:text-xl">{b.title}</h4>
                    <p className="mt-1.5 text-ink-soft">{b.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
