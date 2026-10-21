import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { Reveal } from "./Reveal";

export const CONTACT_EMAIL = "operations@bloomly.co.in";

/** No form: the email address, and two ways to use it. */
const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <section id="contact" className="section border-t border-line">
      <div className="container">
        <Reveal className="relative isolate overflow-hidden rounded-3xl bg-forest-900 px-5 py-10 text-white sm:px-7 sm:py-12 md:px-14 md:py-16">
          <BloomlyLogo mark leafColor="#ffffff" className="pointer-events-none absolute -bottom-10 -right-8 -z-10 w-64 opacity-[0.05] md:w-80" title="" />

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
                Get in <span className="text-leaf-300">Touch</span>
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">
                Ready to transform your fresh produce supply chain? Whether you're a business owner or an investor, we'd love to
                hear from you.
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.06] p-5 ring-1 ring-inset ring-white/10 sm:p-6 md:p-8">
              <p className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-white/60">Email us</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 block text-[1.0625rem] font-extrabold leading-tight tracking-[-0.02em] [overflow-wrap:anywhere] sm:text-[clamp(1.3rem,2.3vw,1.75rem)] text-white underline decoration-white/25 decoration-2 underline-offset-[6px] transition-colors duration-200 hover:decoration-leaf"
              >
                {CONTACT_EMAIL}
              </a>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`mailto:${CONTACT_EMAIL}`} className="btn-white">
                  Write to us
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <button type="button" onClick={copyEmail} aria-live="polite" className="btn-outline-light">
                  {copied ? <Check className="h-4 w-4 text-leaf-300" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy address"}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
