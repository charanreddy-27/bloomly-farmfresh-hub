import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
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

const cardLabel = "text-[0.8125rem] font-extrabold uppercase tracking-[0.12em] text-ink sm:text-base";
const cardFigure = "shrink-0 text-[2.5rem] font-extrabold leading-none tracking-[-0.04em] text-ink sm:text-[2.75rem] md:text-5xl";
const cardLead = "text-[1.0625rem] font-bold leading-snug text-ink sm:text-[1.125rem]";
const challengeCard = "card flex flex-col p-5 sm:p-7 md:p-8";
const cardList = "mt-4 divide-y divide-line border-t border-line text-[0.9375rem] sm:mt-6";
const cardItem = "py-2.5 last:pb-0 sm:py-3";
// Body copy: a touch smaller on phones.
const copy = "mt-4 space-y-4 text-[0.9375rem] text-ink-soft sm:mt-6 sm:space-y-5 sm:text-[1rem]";

/** The mission statement on a deep-green band, with the leaf mark building itself beside it. */
function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.45 });

  return (
    <section id="about" className="bg-forest-900 text-white">
      <div ref={ref} className="container grid items-center gap-6 py-16 sm:gap-12 sm:py-24 md:py-32 lg:grid-cols-[2fr_1fr] lg:gap-12">
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
            className="mt-5 text-[clamp(1.75rem,3.7vw,3.1rem)] font-extrabold sm:mt-6 leading-[1.14] tracking-[-0.03em]"
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

        <BloomlyLogo mark play={seen} className="order-first w-12 lg:order-none lg:mx-auto lg:w-44" title="" />
      </div>
    </section>
  );
}

const AboutSection = () => {
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <Mission />

      <section className="section">
        <div className="container">
          {/* The Challenge */}
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <h3 className="h-section">
                The <span className="hl">Challenge</span>
              </h3>
              <div className={copy}>
                <p>
                  Majority of the fruit business in India still runs on the mandi. But a mandi isn't one partner it's dozens of commission
                  agents, and no one of them is accountable for grade, consistency or supply.
                </p>
              </div>
            </Reveal>

            {/* Stacked on phones, side by side from sm up */}
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:col-span-7">
              {/* The farmer: on phones the figure sits beside its caption */}
              <Reveal className={challengeCard}>
                <p className={cardLabel}>The farmer</p>
                <div className="mt-3 flex items-center gap-4 sm:mt-6 sm:block">
                  <p className={cardFigure}>10%</p>
                  <p className={`sm:mt-3 ${cardLead}`}>goes to commission before the farmer is paid</p>
                </div>

                <ul className={cardList}>
                  {farmerPains.map((pain) => (
                    <li key={pain} className={`text-ink-soft ${cardItem}`}>
                      {pain}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* The business */}
              <Reveal delay={0.08} className={challengeCard}>
                <p className={cardLabel}>The business</p>
                <p className={`mt-3 sm:mt-6 ${cardLead}`}>Different buyers, one problem: no single accountable supplier</p>

                <ul className={cardList}>
                  {buyers.map((b) => (
                    <li key={b.name} className={cardItem}>
                      <p className="font-bold text-ink">{b.name}</p>
                      <p className="mt-1 text-ink-soft">{b.need}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          {/* Our Solution */}
          <div className="mt-14 grid gap-6 sm:mt-20 md:mt-28 lg:grid-cols-12 lg:items-center lg:gap-14">
            <Reveal className="lg:order-2 lg:col-span-5">
              <h3 className="h-section">
                Our <span className="hl">Solution</span>
              </h3>
              <div className={copy}>
                <p>
                  Bloomly is a private mandi built to raise what farmers earn. Produce is graded in the farmer's presence, and every lot comes with a machine-generated grading slip showing its grade, quantity and price, so nothing is left to guesswork or anyone's discretion. Farmers are paid on the spot and in full, and they know exactly what their harvest is worth.
                </p>
                {/* On phones the second paragraph waits behind "Read more" */}
                <p className={readMore ? undefined : "hidden sm:block"}>
                  Every grade then reaches the buyer who values it most, whether they sell it on the shelf, deliver it to the doorstep, or turn it into something new. Businesses deal with one accountable operator and get consistent quality, dependable supply and quick response. Fair pay keeps farmers coming back and reliable supply keeps buyers with us, which makes Bloomly a trusted operator for both
                </p>
              </div>
              {!readMore && (
                <button type="button" onClick={() => setReadMore(true)} className="mt-3 inline-flex items-center gap-1 text-[0.9375rem] font-semibold text-forest sm:hidden">
                  Read more
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </button>
              )}
            </Reveal>

            <Reveal delay={0.08} className="card lg:order-1 lg:col-span-7">
              <ul className="divide-y divide-line">
                {benefits.map((b) => (
                  <li key={b.title} className="px-5 py-5 sm:px-7 sm:py-6 md:px-9 md:py-7">
                    <h4 className="text-[1.0625rem] font-bold leading-snug text-ink sm:text-lg sm:leading-7 md:text-xl">{b.title}</h4>
                    <p className="mt-1.5 text-[0.9375rem] text-ink-soft sm:text-[1rem]">{b.body}</p>
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
