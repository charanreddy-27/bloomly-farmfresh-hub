import { Link, useLocation, useNavigate } from "react-router-dom";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { CONTACT_EMAIL } from "./ContactSection";

const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Section links work from any page: go home first if needed, then scroll.
  const goToSection = (id: string) => {
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (pathname !== "/") {
      navigate("/");
      window.setTimeout(scroll, 120);
    } else {
      scroll();
    }
  };

  const link = "text-white/70 transition-colors duration-200 hover:text-white";
  const heading = "text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-leaf-300";

  return (
    <footer className="bg-forest-950 text-white">
      <div className="container py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12">
          <div>
            <Link to="/" aria-label="Bloomly home" className="inline-block w-[156px]">
              <BloomlyLogo tone="light" />
            </Link>
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-white/60">
              Building India's most reliable fresh fruit B2B supply chain.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className={heading}>Company</p>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              <li>
                <button type="button" onClick={() => goToSection("about")} className={link}>
                  About
                </button>
              </li>
              <li>
                <button type="button" onClick={() => goToSection("how-it-works")} className={link}>
                  How it works
                </button>
              </li>
              <li>
                <button type="button" onClick={() => goToSection("contact")} className={link}>
                  Contact
                </button>
              </li>
              <li>
                <Link to="/privacy-policy" className={link}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className={heading}>Connect</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={`${link} mt-4 block break-all text-[0.9375rem]`}>
              {CONTACT_EMAIL}
            </a>
            <p className="mt-2.5 text-[0.9375rem] text-white/60">Bengaluru, India</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/45">
          © {new Date().getFullYear()} Bloomly. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
