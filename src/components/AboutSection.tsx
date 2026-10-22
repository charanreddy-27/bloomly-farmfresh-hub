import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { Reveal } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const farmerPains = [
  "Commission and handling charges, all taken before the farmer is paid",
  "A long wait for payment",
  "No say on grade or price",
];

const buyers = [
  { name: "Modern trade & quick commerce", need: "Heavy tonnage, the exact grade, daily deliveries, and sourcing from someone who owns the outcome require green-channel-level scale." },
  { name: "Retailer", need: "One mandi at the edge of the city, 2 a.m. trips, buying for three days with no storage lead to wastage." },
  { name: "Misfit Sellers", need: "They travel just as far for low-value fruit that spoils faster." },
];

const benefits = [
  { title: "One accountable institution", body: "Not a cluster of agents: one company that owns the fruit and the outcome." },
  { title: "Accurate grading, better income", body: "You see the weight, the machine grade/slip, price, and each grade goes to the buyer who values it most. Money reaches your account the same day." },
  { title: "A buyer for every grade", body: "A-grade goes to retail chains, supermarkets, quick commerce and local stores. Misfits go to pulp and processing partners, so less is wasted and farmers earn more. No mandi can match this, as it isn't a single institution." },
];

const cardLabel = "text-base font-extrabold uppercase tracking-[0.12em] text-ink";
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
            Bloomly is on a mission to build India's largest{" "}
            <motion.span
              className="bg-[linear-gradient(#7FC141,#7FC141)] bg-left-bottom bg-no-repeat pb-1 text-leaf-300 [-webkit-box-decoration-break:clone] [box-decoration-break:clone]"
              initial={{ backgroundSize: "0% 3px" }}
              animate={seen ? { backgroundSize: "100% 3px" } : undefined}
              transition={{ duration: 1.1, ease: EASE, delay: 0.7 }}
            >
              private mandi network
            </motion.span>
            , one accountable alternative in every major city.
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
                  Majority of the fruit business in India still runs on the mandi. But a mandi isn't one partner it's dozens of commission
                  agents, and no one of them is accountable for grade, consistency or supply.
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
                <p className="mt-6 text-lg font-bold leading-snug text-ink">Different buyers, one problem: no single accountable supplier</p>

                <ul className="mt-6 divide-y divide-line border-t border-line text-[0.9375rem]">
                  {buyers.map((b) => (
                    <li key={b.name} className="py-3 last:pb-0">
                      <p className="font-bold text-ink">{b.name}</p>
                      <p className="mt-1 text-ink-soft">{b.need}</p>
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
                  Bloomly is a private mandi, built to grow farmers' income. Farmers and aggregators bring their fruit in, it's
                  graded accurately and in the open, and every grade is matched to the buyer who values it most. Farmers are
                  paid on the spot.
                </p>
                <p>
                  That sets off a virtuous cycle: fair prices draw more farmers, and steady quality and pricing draw more buyers,
                  from supermarkets and quick commerce to neighbourhood stores and juice and cut-fruit businesses.
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
