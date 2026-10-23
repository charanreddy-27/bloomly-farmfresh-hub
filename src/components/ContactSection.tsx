import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { BloomlyLogo } from "@/components/brand/BloomlyLogo";
import { Reveal } from "./Reveal";

export const CONTACT_EMAIL = "operations@bloomly.co.in";
export const CONTACT_PHONE = "+91 72595 36656";
export const CONTACT_PHONE_HREF = "tel:+917259536656";
export const CONTACT_WHATSAPP_HREF = "https://wa.me/917259536656";
export const CONTACT_ADDRESS = ["Salarpuria Sattva Magnificia,", "78, Old Madras Rd, Mahadevapura, Bangalore - 560016"];
export const CONTACT_MAP_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_ADDRESS.join(" "))}`;

const rowLabel = "text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-white/60";

/** Address, email and phone, with a map link, a WhatsApp button and a copy-email button. */
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
        <Reveal className="relative isolate overflow-hidden rounded-3xl bg-forest-900 px-5 py-8 text-white sm:px-7 sm:py-12 md:px-14 md:py-16">
          <BloomlyLogo mark leafColor="#ffffff" className="pointer-events-none absolute -bottom-10 -right-8 -z-10 w-64 opacity-[0.05] md:w-80" title="" />

          <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-[clamp(1.75rem,3.6vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
                Get in <span className="text-leaf-300">Touch</span>
              </h2>
              <p className="mt-3 max-w-md text-[1rem] leading-relaxed text-white/75 sm:mt-5 sm:text-[1.125rem]">
                Selling fruit or buying it? Talk to us.
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.06] p-5 ring-1 ring-inset ring-white/10 sm:p-6 md:p-8">
              <div className="divide-y divide-white/10">
                <div className="pb-4 sm:pb-5">
                  <p className={rowLabel}>Address</p>
                  <a href={CONTACT_MAP_HREF} target="_blank" rel="noopener noreferrer" className="mt-2 block text-white/90 transition-colors hover:text-white">
                    {CONTACT_ADDRESS.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </a>
                </div>
                <div className="py-4 sm:py-5">
                  <p className={rowLabel}>Email</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-2 block text-lg font-extrabold leading-tight [overflow-wrap:anywhere] text-white underline decoration-white/25 decoration-2 underline-offset-[6px] transition-colors duration-200 hover:decoration-leaf"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <div className="pt-4 sm:pt-5">
                  <p className={rowLabel}>Phone</p>
                  <a href={CONTACT_PHONE_HREF} className="mt-2 block text-lg font-extrabold leading-tight text-white underline decoration-white/25 decoration-2 underline-offset-[6px] transition-colors duration-200 hover:decoration-leaf">
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>
              {/* full-width, thumb-sized buttons on phones */}
              <div className="mt-6 grid gap-3 sm:mt-7 sm:flex sm:flex-wrap">
                <a href={CONTACT_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn-white">
                  WhatsApp us
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <button type="button" onClick={copyEmail} aria-live="polite" className="btn-outline-light">
                  {copied ? <Check className="h-4 w-4 text-leaf-300" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy email"}
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
