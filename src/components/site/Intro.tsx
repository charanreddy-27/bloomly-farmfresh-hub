import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { getLenis } from "@/lib/scroll";

const KEY = "bloomly-intro-seen";
const IntroContext = createContext(true);

/** True once the preloader curtain has started lifting (immediately on repeat visits). */
export const useIntroReady = () => useContext(IntroContext);

function shouldPlay() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return sessionStorage.getItem(KEY) !== "1";
  } catch {
    return false;
  }
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(shouldPlay);

  useEffect(() => {
    if (!loading) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    getLenis()?.stop();
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* storage unavailable — intro will simply replay next time */
      }
      setLoading(false);
    }, 2400);
    return () => {
      window.clearTimeout(t);
      root.style.overflow = "";
      getLenis()?.start();
    };
  }, [loading]);

  return (
    <IntroContext.Provider value={!loading}>
      {children}
      <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>
    </IntroContext.Provider>
  );
}

function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest-800"
      exit={{ y: "-100%" }}
      transition={{ duration: 1.05, ease: EASE_IN_OUT }}
      aria-hidden
    >
      <motion.div exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5, ease: EASE_OUT }}>
        <BloomlyLogo tone="light" play className="w-52 md:w-72" />
      </motion.div>
      <motion.p
        className="mt-7 text-[0.6875rem] font-medium uppercase tracking-[0.32em] text-cream/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.1 }}
      >
        From farm gate to shelf
      </motion.p>
    </motion.div>
  );
}
