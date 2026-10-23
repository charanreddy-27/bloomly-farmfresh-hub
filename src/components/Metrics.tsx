import { motion } from "framer-motion";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const inView = { once: true, amount: 0.6 } as const;

const figure = "text-[2.125rem] font-extrabold leading-none tracking-[-0.04em] sm:text-[2.75rem] md:text-[3.25rem]";
const label = "mt-2 text-[0.875rem] font-medium leading-snug text-ink-soft sm:mt-3 sm:text-[1rem] sm:leading-[inherit]";
const pad = "p-5 sm:p-7 md:p-8";

function Stat({ value, suffix, children, delay }: { value: number; suffix: string; children: string; delay: number }) {
  return (
    <Reveal delay={delay} className={`card flex flex-col justify-center ${pad} lg:col-span-2`}>
      <p className={`${figure} text-forest`}>
        <CountUp to={value} />
        {suffix}
      </p>
      <p className={label}>{children}</p>
    </Reveal>
  );
}

/** 95%, with a ring that fills when it comes into view. */
function RepeatRate({ delay }: { delay: number }) {
  return (
    <Reveal delay={delay} className={`card col-span-2 flex items-center justify-between gap-4 ${pad} lg:col-span-2`}>
      <div>
        <p className={`${figure} text-forest`}>
          <CountUp to={95} />%
        </p>
        <p className={label}>Customers repeat orders</p>
      </div>
      <svg viewBox="0 0 100 100" className="h-16 w-16 shrink-0 -rotate-90 sm:h-20 sm:w-20 md:h-[5.5rem] md:w-[5.5rem]" aria-hidden>
        <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E9E4" strokeWidth="9" />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#0F4C32"
          strokeWidth="9"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 0.95 }}
          viewport={inView}
          transition={{ duration: 1.8, ease: EASE, delay: 0.15 }}
        />
      </svg>
    </Reveal>
  );
}

/** 80–120 tonnes a month, shown as a band on a 0–150 scale. */
function MonthlyVolume({ delay }: { delay: number }) {
  const MAX = 150;
  const ticks = [0, 50, 100, 150];
  return (
    <Reveal delay={delay} className={`card col-span-2 flex flex-col ${pad} lg:col-span-6`}>
      <p className={`${figure} text-forest`}>
        <CountUp to={80} />–<CountUp to={120} />
        <span className="ml-1.5 text-[1.125rem] font-bold tracking-normal text-ink-muted sm:ml-2 sm:text-xl md:text-2xl">MT</span>
      </p>
      <p className={label}>Metric tonnes moved every month, consistent and repeatable</p>

      <div className="mt-auto pt-6 sm:pt-8" aria-hidden>
        <div className="relative h-2 rounded-full bg-line">
          <motion.div
            className="absolute inset-y-0 origin-left rounded-full bg-forest"
            style={{ left: `${(80 / MAX) * 100}%`, width: `${((120 - 80) / MAX) * 100}%` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          />
        </div>
        <div className="relative mt-2 h-4 text-xs font-medium text-ink-muted">
          {ticks.map((t) => (
            <span key={t} className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full" style={{ left: `${(t / MAX) * 100}%` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

const Metrics = () => {
  return (
    <section id="metrics" className="section">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">
            Bloomly's <span className="hl">Journey</span>
          </h2>
          <p className="lead mt-4">Proof that a private mandi works, for farmers and for businesses of every size.</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:mt-14 md:gap-5 lg:grid-cols-6">
          <Stat value={3100} suffix="+" delay={0}>
            Metric tonnes handled
          </Stat>
          <Stat value={2800} suffix="+" delay={0.06}>
            Farmers connected
          </Stat>
          <RepeatRate delay={0.12} />
          <MonthlyVolume delay={0.06} />
        </div>
      </div>
    </section>
  );
};

export default Metrics;
