import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { Reveal } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const farmerPains = [
  "Commission taken at every hop in the chain",
  "A long wait for payment",
  "No say on grade or price",
];

const businessPains = [
  "Too small for any single agent to commit to reliably",
  "Daily supply gaps at the store",
  "A-grade sold with B-grade mixed in",
];

const benefits = [
  { title: "India's Private Mandi", body: "Farmers can sell at the farm gate or at our private mandi." },
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
                <p className={cardFigure}>10%</p>
                <p className="mt-3 text-lg font-bold leading-snug text-ink">goes to commission before the farmer is paid</p>

                <ul className="mt-6 divide-y divide-line border-t border-line text-[0.9375rem]">
                  {farmerPains.map((pain) => (
                    <li key={pain} className="py-3 text-ink-soft last:pb-0">
                      {pain}
                    </li>
                  ))}
                </ul>
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
                  Bloomly set out to solve this as the private mandi: owned and transparent. Through India's private mandi,
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
