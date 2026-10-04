import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { cn } from "@/lib/utils";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { company } from "@/lib/content";
import { getLenis, scrollToTop, useGoToSection } from "@/lib/scroll";
import { useActiveSection } from "@/hooks/use-active-section";

type NavItem = { label: string; section?: string; to?: string; matches?: string[] };

const NAV: NavItem[] = [
  { label: "Story", section: "problem", matches: ["problem", "mission"] },
  { label: "Our model", section: "model", matches: ["model", "value"] },
  { label: "Impact", section: "impact", matches: ["impact"] },
  { label: "Partners", section: "partners", matches: ["partners"] },
  { label: "Careers", to: "/careers" },
];

const SECTION_IDS = ["problem", "mission", "model", "value", "impact", "partners", "contact"];
const DARK_TOP_ROUTES = ["/", "/careers"];

function RollText({ children }: { children: string }) {
  return (
    <span className="relative block h-[1.25em] overflow-hidden leading-[1.25em]">
      <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">{children}</span>
      <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0" aria-hidden>
        {children}
      </span>
    </span>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const goTo = useGoToSection();
  const active = useActiveSection(SECTION_IDS);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 640);
  });

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      getLenis()?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const light = !scrolled && DARK_TOP_ROUTES.includes(pathname) && !open;

  const handleNav = (item: NavItem) => {
    setOpen(false);
    if (item.section) goTo(item.section);
  };

  const logoClick = () => {
    setOpen(false);
    if (pathname === "/") scrollToTop();
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5"
        animate={{ y: hidden && !open ? "-130%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between rounded-full transition-all duration-500 ease-out-expo",
            scrolled && !open
              ? "max-w-5xl border border-forest/10 bg-cream/75 py-2 pl-5 pr-2 shadow-[0_8px_30px_-12px_rgba(7,38,26,0.25)] backdrop-blur-xl"
              : "max-w-[1320px] border border-transparent py-3 pl-2 pr-0 md:pl-4",
          )}
        >
          <Link to="/" onClick={logoClick} className="relative block h-7 w-[110px] md:h-8 md:w-[126px]" aria-label="Bloomly home">
            <BloomlyLogo tone={light || open ? "light" : "dark"} interactive className="h-full w-auto" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV.map((item) => {
              const isActive = item.to ? pathname === item.to : pathname === "/" && !!active && !!item.matches?.includes(active);
              const cls = cn(
                "group relative px-4 py-2 text-[0.92rem] font-medium transition-colors",
                light ? "text-cream/80 hover:text-cream" : "text-ink-soft hover:text-forest",
                isActive && (light ? "text-cream" : "text-forest"),
              );
              const inner = (
                <>
                  <RollText>{item.label}</RollText>
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-0.5 left-[calc(50%-2px)] h-1 w-1 rounded-full bg-leaf"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              );
              return item.to ? (
                <Link key={item.label} to={item.to} className={cls} aria-current={isActive ? "page" : undefined}>
                  {inner}
                </Link>
              ) : (
                <button key={item.label} type="button" onClick={() => handleNav(item)} className={cls} aria-current={isActive ? "page" : undefined}>
                  {inner}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo("contact")}
              className={cn(
                "group hidden items-center gap-2 rounded-full py-2.5 pl-5 pr-2.5 text-sm font-semibold transition-colors duration-300 sm:inline-flex",
                light ? "bg-cream text-forest-800 hover:bg-leaf" : "bg-forest text-cream hover:bg-forest-500",
              )}
            >
              <RollText>Get in touch</RollText>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-leaf text-forest-900 transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "relative grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden",
                light || open ? "bg-white/10 text-cream" : "bg-forest text-cream",
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-5">
                <span className={cn("absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-all duration-500 ease-out-expo", open && "top-[5px] rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-0.5 w-5 rounded bg-current transition-all duration-500 ease-out-expo", open && "bottom-[5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-forest-800 px-6 pb-8 pt-28 text-cream lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {[...NAV, { label: "Contact", section: "contact" } as NavItem].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 + i * 0.06 }}
                  className="border-b border-white/10"
                >
                  {item.to ? (
                    <Link to={item.to} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-4">
                      <span className="text-xs text-leaf">0{i + 1}</span>
                      <span className="font-display text-4xl">{item.label}</span>
                    </Link>
                  ) : (
                    <button type="button" onClick={() => handleNav(item)} className="flex w-full items-baseline gap-4 py-4 text-left">
                      <span className="text-xs text-leaf">0{i + 1}</span>
                      <span className="font-display text-4xl">{item.label}</span>
                    </button>
                  )}
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="mt-auto space-y-1 text-sm text-cream/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <a href={`mailto:${company.email}`} className="block hover:text-leaf">
                {company.email}
              </a>
              <a href={company.phoneHref} className="block hover:text-leaf">
                {company.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
