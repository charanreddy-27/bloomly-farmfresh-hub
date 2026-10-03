import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { company, whatsappHref } from "@/lib/content";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { useGoToSection } from "@/lib/scroll";
import { Magnetic } from "@/components/motion/Magnetic";

export default function Footer() {
  const goTo = useGoToSection();
  const year = new Date().getFullYear();
  const signRef = useRef<HTMLDivElement>(null);
  const signIn = useInView(signRef, { once: true, amount: 0.6 });

  const explore = [
    { label: "The problem", id: "problem" },
    { label: "Our model", id: "model" },
    { label: "Impact", id: "impact" },
    { label: "Partners", id: "partners" },
  ];

  return (
    <footer className="relative overflow-hidden rounded-t-[1.75rem] bg-forest-800 text-cream md:rounded-t-[2.5rem]">
      <div className="container pt-20 md:pt-28">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h2 className="display-lg max-w-2xl text-balance">
            Fresh fruit, <span className="accent-italic text-leaf">reliably</span> — from farm gate to shelf.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <button type="button" onClick={() => goTo("contact")} className="btn-leaf group">
                Partner with us
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
              </button>
            </Magnetic>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost-light">
              WhatsApp us
            </a>
          </div>
        </div>

        <div className="mt-16 h-px bg-white/10 md:mt-24" />

        <div className="grid gap-10 pb-16 pt-14 sm:grid-cols-2 md:pb-20 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <h3 className="eyebrow text-leaf">Bloomly</h3>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              Building India's most reliable fresh fruit B2B supply chain — fair for farmers, dependable for businesses.
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-leaf">Explore</h3>
            <ul className="mt-5 space-y-3 text-cream/70">
              {explore.map((l) => (
                <li key={l.id}>
                  <button type="button" onClick={() => goTo(l.id)} className="transition-colors hover:text-leaf">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-leaf">Company</h3>
            <ul className="mt-5 space-y-3 text-cream/70">
              <li>
                <Link to="/careers" className="transition-colors hover:text-leaf">
                  Careers
                </Link>
              </li>
              <li>
                <button type="button" onClick={() => goTo("contact")} className="transition-colors hover:text-leaf">
                  Contact
                </button>
              </li>
              <li>
                <Link to="/privacy-policy" className="transition-colors hover:text-leaf">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-leaf">Reach us</h3>
            <ul className="mt-5 space-y-3 text-cream/70">
              <li>
                <a href={`mailto:${company.email}`} className="break-all transition-colors hover:text-leaf">
                  {company.email}
                </a>
              </li>
              <li>
                <a href={company.phoneHref} className="transition-colors hover:text-leaf">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={company.mapsHref} target="_blank" rel="noopener noreferrer" className="block text-sm leading-relaxed transition-colors hover:text-leaf">
                  {company.addressLines.join(" ")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sign-off: the logo builds itself as the page comes to an end */}
      <div ref={signRef} className="container flex flex-col gap-6 pb-14 md:flex-row md:items-end md:justify-between md:pb-20">
        <BloomlyLogo tone="light" play={signIn} className="w-[min(70vw,28rem)]" />
        <p className="eyebrow text-cream/40">From farm gate to shelf</p>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-6 pb-24 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between sm:pb-6 sm:pr-28">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p>Made with care in {company.city}.</p>
        </div>
      </div>
    </footer>
  );
}
