import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { useIntro } from "@/components/brand/LogoIntro";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Home", section: "top" },
  { label: "About", section: "about" },
  { label: "How it works", section: "how-it-works" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { docked } = useIntro();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  // Only the homepage opens on a dark hero; everywhere else the bar is solid from the start.
  const solid = scrolled || isMenuOpen || location.pathname !== "/";

  const scrollToSection = (id: string) => {
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const goTo = (id: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => scrollToSection(id), 120);
    } else {
      scrollToSection(id);
    }
  };

  const linkClass = cn(
    "relative py-2 text-[0.9375rem] font-semibold transition-colors duration-200",
    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-leaf after:transition-transform after:duration-300 hover:after:scale-x-100",
    solid ? "text-ink-soft hover:text-forest" : "text-white/85 hover:text-white",
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        solid ? "border-line bg-white shadow-[0_8px_24px_-18px_rgba(15,76,50,0.35)]" : "border-transparent bg-transparent",
      )}
    >
      <div className="container flex h-[var(--header-h)] items-center justify-between">
        <Link
          to="/"
          onClick={() => {
            setIsMenuOpen(false);
            if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Bloomly home"
          className="block"
        >
          {/* The intro's logo lands exactly here, then this one takes over. */}
          <span
            data-brand-logo
            data-tone={solid ? "dark" : "light"}
            className={cn("block w-[128px] md:w-[146px]", docked ? "opacity-100" : "opacity-0")}
          >
            <BloomlyLogo tone={solid ? "dark" : "light"} />
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {LINKS.map((item) => (
            <button key={item.label} type="button" onClick={() => goTo(item.section)} className={linkClass}>
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goTo("contact")}
            className={cn(
              "inline-flex h-10 items-center rounded-full px-5 text-[0.9375rem] font-semibold transition-colors duration-200",
              solid ? "bg-forest text-white hover:bg-forest-700" : "bg-white text-forest hover:bg-leaf-50",
            )}
          >
            Contact
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((o) => !o)}
          className={cn("-mr-2 grid h-11 w-11 place-items-center rounded-lg md:hidden", solid ? "text-forest" : "text-white")}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-line bg-white shadow-[0_24px_40px_-24px_rgba(15,76,50,0.35)] md:hidden" aria-label="Mobile">
          <div className="container flex flex-col pb-5 pt-1">
            {LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => goTo(item.section)}
                className="border-b border-line py-3.5 text-left text-base font-semibold text-ink"
              >
                {item.label}
              </button>
            ))}
            <button type="button" onClick={() => goTo("contact")} className="btn-forest mt-4 w-full">
              Contact us
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
