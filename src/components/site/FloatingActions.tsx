import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useState } from "react";
import { whatsappHref } from "@/lib/content";
import { scrollToTop } from "@/lib/scroll";
import { EASE_OUT } from "@/lib/motion";

/** WhatsApp shortcut + back-to-top button whose ring fills with scroll progress. */
export default function FloatingActions() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 700));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <button
            type="button"
            onClick={() => scrollToTop()}
            aria-label="Back to top"
            className="group relative hidden h-12 w-12 place-items-center rounded-full bg-cream/90 md:grid text-forest shadow-lg backdrop-blur transition-transform hover:-translate-y-0.5"
          >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden>
              <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
              <motion.circle cx="24" cy="24" r="22" fill="none" stroke="#8BB55E" strokeWidth="2" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
            </svg>
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Bloomly on WhatsApp"
            className="group flex h-12 items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-forest pl-3.5 pr-3.5 text-cream shadow-[0_12px_30px_-12px_rgba(7,38,26,0.6)] transition-all duration-500 ease-premium hover:bg-forest-500 hover:pr-5"
          >
            <span className="relative grid h-5 w-5 place-items-center">
              <MessageCircle className="relative h-5 w-5" strokeWidth={1.5} />
            </span>
            <span className="max-w-0 whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-500 ease-premium group-hover:max-w-[140px] group-hover:opacity-100">
              WhatsApp us
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
