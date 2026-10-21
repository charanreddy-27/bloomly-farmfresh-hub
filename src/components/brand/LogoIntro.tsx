import { animate, motion, useMotionValue } from "framer-motion";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { BloomlyLogo } from "./BloomlyLogo";

/**
 * The brand intro: on the first visit of a session the Bloomly logo builds itself
 * on a green screen, then travels to its place in the header while the page appears.
 *
 * `revealed` flips when the logo starts travelling (the page can begin its own entrance);
 * `docked` flips when it has landed (the header shows its own logo from then on).
 */
type IntroState = { revealed: boolean; docked: boolean };
const IntroContext = createContext<IntroState>({ revealed: true, docked: true });
export const useIntro = () => useContext(IntroContext);

const KEY = "bloomly-intro-seen";
const BUILD_MS = 1650; // long enough for every shape of the logo to settle
const EASE = [0.65, 0, 0.35, 1] as const;

function shouldPlay() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return sessionStorage.getItem(KEY) !== "1";
  } catch {
    return false;
  }
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [playing] = useState(shouldPlay);
  const [state, setState] = useState<IntroState>({ revealed: !playing, docked: !playing });

  return (
    <IntroContext.Provider value={state}>
      {children}
      {playing && !state.docked && (
        <Intro onReveal={() => setState((s) => ({ ...s, revealed: true }))} onDocked={() => setState({ revealed: true, docked: true })} />
      )}
    </IntroContext.Provider>
  );
}

function Intro({ onReveal, onDocked }: { onReveal: () => void; onDocked: () => void }) {
  const logoRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const veil = useMotionValue(1);
  const [tone, setTone] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const controls: { stop: () => void }[] = [];

    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* storage unavailable: the intro simply plays again next time */
      }
      const from = logoRef.current?.getBoundingClientRect();
      const target = document.querySelector<HTMLElement>("[data-brand-logo]");
      const to = target?.getBoundingClientRect();
      onReveal();

      if (!from || !to || !to.width) {
        onDocked();
        return;
      }
      // match the header's own logo colour, so the hand-over is invisible
      setTone(target?.dataset.tone === "dark" ? "dark" : "light");
      const opts = { duration: 0.95, ease: EASE } as const;
      controls.push(animate(x, to.left - from.left, opts));
      controls.push(animate(y, to.top - from.top, opts));
      controls.push(animate(scale, to.width / from.width, opts));
      controls.push(animate(veil, 0, { duration: 0.8, ease: EASE, delay: 0.1, onComplete: onDocked }));
    }, BUILD_MS);

    return () => {
      window.clearTimeout(timer);
      controls.forEach((c) => c.stop());
      root.style.overflow = "";
    };
    // runs once: the intro plays a single time per page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div data-intro className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      <motion.div className="absolute inset-0 bg-forest-900" style={{ opacity: veil }} />
      <div className="absolute inset-0 grid place-items-center">
        <motion.div ref={logoRef} style={{ x, y, scale, originX: 0, originY: 0 }} className="w-[220px] md:w-[300px]">
          <BloomlyLogo tone={tone} play />
        </motion.div>
      </div>
    </div>
  );
}
