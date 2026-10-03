import { AnimatePresence, motion } from "framer-motion";
import { chapters } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const IDS = chapters.map((c) => c.id);
const DARK = new Set(["mission", "impact"]);

/** Vertical chapter navigator pinned to the left edge on wide screens. */
export default function ChapterRail() {
  const active = useActiveSection(IDS);
  const dark = active ? DARK.has(active) : false;

  return (
    <AnimatePresence>
      {active && (
        <motion.nav
          aria-label="Chapters"
          className="fixed left-6 top-1/2 z-30 hidden flex-col gap-3 2xl:flex"
          style={{ y: "-50%" }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.5 }}
        >
          {chapters.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => scrollToId(c.id)}
                className={cn("group flex items-center gap-3 text-left transition-colors duration-500", dark ? "text-cream" : "text-forest")}
              >
                <span
                  className={cn(
                    "h-px transition-all duration-500 ease-out-expo",
                    on ? "w-10 bg-leaf" : "w-4 bg-current opacity-30 group-hover:w-6 group-hover:opacity-70",
                  )}
                />
                <span className="flex gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em]">
                  <span className={cn("transition-opacity duration-500", on ? "opacity-100" : "opacity-0 group-hover:opacity-60")}>{c.number}</span>
                  <span
                    className={cn(
                      "transition-opacity duration-500",
                      on ? "opacity-0 group-hover:opacity-100 min-[1720px]:opacity-100" : "opacity-0 group-hover:opacity-60",
                    )}
                  >
                    {c.label}
                  </span>
                </span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
