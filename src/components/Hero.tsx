import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useIntro } from "@/components/brand/LogoIntro";

const PHOTO = "/gemini_generated_image_6bhcgz6bhcgz6bhc-Yanq8xlZjkhx8B9D.avif";
const PHOTO_ALT = "Crates of freshly harvested oranges, sweet limes and mangoes ready for dispatch";
const EASE = [0.32, 0.72, 0, 1] as const;

/** The fruit photo across the whole first screen, under a Bloomly-green veil that keeps the text side solid. */
const Hero = () => {
  const { revealed } = useIntro();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: revealed ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section className="hero-section relative isolate overflow-hidden bg-forest-950" aria-label="Introduction">
      {/* Zoomed toward the crates so the truck behind them stays out of frame; settles gently as the page opens */}
      <motion.img
        src={PHOTO}
        alt={PHOTO_ALT}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ originY: 1 }}
        initial={{ scale: 1.4 }}
        animate={revealed ? { scale: 1.3 } : undefined}
        transition={{ duration: 2.6, ease: EASE }}
      />

      {/* Veil: even on phones and tablets, where text sits over the photo; left-to-right on desktop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-950/90 via-forest-950/80 to-forest-950/80 lg:hidden" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-forest-950 via-forest-950/85 to-forest-950/25 lg:block" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-t from-forest-950/80 via-transparent to-forest-950/55 lg:block" />

      <div className="container flex min-h-[100svh] flex-col justify-center pb-24 pt-[calc(var(--header-h)+2rem)]">
        <div className="max-w-[44rem]">
          <motion.p {...rise(0.05)} className="text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-leaf-300 sm:text-[0.8125rem] sm:tracking-[0.14em]">
            The private mandi for fruit · Bengaluru
          </motion.p>

          <motion.h1
            {...rise(0.14)}
            className="mt-6 text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-white"
          >
            Transforming how <span className="text-leaf-300">farmers sell fruits</span> and how{" "}
            <span className="text-leaf-300">businesses buy</span>
          </motion.h1>

          <motion.p {...rise(0.24)} className="mt-6 max-w-md text-lg leading-relaxed text-white/80 md:text-xl">
            Bloomly is building a strong ecosystem for both.
          </motion.p>

          <motion.div {...rise(0.34)} className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="btn-white group">
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a href="#how-it-works" className="btn-outline-light group">
              How it works
              <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
