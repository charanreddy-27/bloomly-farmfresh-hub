import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChapterLabel } from "@/components/site/ChapterLabel";
import { AreaField, Field, SuccessMark } from "@/components/site/Field";
import { SplitText } from "@/components/motion/SplitText";
import { useToast } from "@/hooks/use-toast";
import { company, contact, whatsappHref } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { consumePendingRole, ROLE_EVENT } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const EMPTY = { name: "", email: "", phone: "", company: "", type: "", message: "" };

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [roleError, setRoleError] = useState(false);

  // CTAs elsewhere on the site ("I'm a farmer", "Source with Bloomly") pre-select the role.
  useEffect(() => {
    const pending = consumePendingRole();
    if (pending) setForm((f) => ({ ...f, type: pending }));
    const onRole = (e: Event) => {
      const role = (e as CustomEvent<string>).detail;
      setForm((f) => ({ ...f, type: role }));
      setRoleError(false);
      consumePendingRole();
    };
    window.addEventListener(ROLE_EVENT, onRole);
    return () => window.removeEventListener(ROLE_EVENT, onRole);
  }, []);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type) {
      setRoleError(true);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(contact.formspree, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          type: form.type,
          message: form.message,
          _replyto: form.email,
          _subject: `New Contact Form Submission from ${form.name}`,
        }),
      });
      if (!res.ok) throw new Error(`Form submission failed: ${res.status}`);
      setSentTo(form.name.split(" ")[0] || "there");
      setForm(EMPTY);
    } catch {
      toast({
        title: "Error sending message",
        description: `Please try again or contact us directly at ${company.email}`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const details = [
    { icon: MapPin, label: "Visit", value: company.addressLines.join(" "), href: company.mapsHref, external: true },
    { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
    { icon: Phone, label: "Call", value: company.phone, href: company.phoneHref },
  ];

  return (
    <section id="contact" className="relative bg-cream pb-24 pt-4 md:pb-32">
      <div className="container">
        <motion.div
          className="relative grid overflow-hidden rounded-[1.5rem] bg-forest text-cream md:rounded-[2rem] lg:grid-cols-[1fr_1.1fr]"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
        >
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 [background:radial-gradient(closest-side,rgba(139,181,94,0.22),transparent)]" aria-hidden />

          {/* Pitch + details */}
          <div className="relative flex flex-col p-8 md:p-14">
            <ChapterLabel number="07" label="Next step" dark />
            <SplitText text={contact.headline} className="display-lg mt-6 text-cream" />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/70">{contact.sub}</p>

            <ul className="mt-10 space-y-2">
              {details.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-start gap-4 rounded-2xl p-3 -mx-3 transition-colors hover:bg-white/5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-leaf transition-colors duration-300 group-hover:border-leaf group-hover:bg-leaf group-hover:text-forest-900">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">{label}</span>
                      <span className="mt-0.5 block text-cream/90">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 lg:mt-auto lg:pt-12">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost-light group">
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="relative p-3 md:p-4">
            <div className="relative flex h-full flex-col justify-center rounded-[1.05rem] bg-cream p-6 text-ink md:rounded-[1.4rem] md:p-10">
              <AnimatePresence mode="wait">
                {sentTo ? (
                  <motion.div
                    key="done"
                    className="flex h-full min-h-[30rem] flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                  >
                    <SuccessMark />
                    <h3 className="display-md mt-6 text-forest">Thank you, {sentTo}!</h3>
                    <p className="mt-3 max-w-sm text-ink-soft">Your message is on its way. We'll get back to you within 24 hours.</p>
                    <button type="button" onClick={() => setSentTo(null)} className="btn-ghost-dark mt-8">
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <fieldset>
                      <legend className="mb-3 text-sm font-semibold text-ink">I am a…</legend>
                      <div className="flex flex-wrap gap-2" role="radiogroup">
                        {contact.roles.map((r) => {
                          const on = form.type === r.value;
                          return (
                            <button
                              key={r.value}
                              type="button"
                              role="radio"
                              aria-checked={on}
                              onClick={() => {
                                setForm((f) => ({ ...f, type: r.value }));
                                setRoleError(false);
                              }}
                              className={cn(
                                "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
                                on ? "border-forest text-cream" : "border-forest/15 bg-white text-ink-soft hover:border-forest/40",
                              )}
                            >
                              {on && <motion.span layoutId="role-chip" className="absolute inset-0 rounded-full bg-forest" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                              <span className="relative">{r.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      {roleError && <p className="mt-2 text-sm text-berry">Please tell us who you are, so the right person replies.</p>}
                    </fieldset>

                    <div className="grid gap-4 pt-2 sm:grid-cols-2">
                      <Field id="name" name="name" label="Full name *" autoComplete="name" required value={form.name} onChange={set} />
                      <Field id="email" name="email" type="email" label="Email address *" autoComplete="email" required value={form.email} onChange={set} />
                      <Field id="phone" name="phone" type="tel" label="Phone number *" autoComplete="tel" required value={form.phone} onChange={set} />
                      <Field id="company" name="company" label="Company (optional)" autoComplete="organization" value={form.company} onChange={set} />
                    </div>
                    <AreaField id="message" name="message" label="How can we help? *" required value={form.message} onChange={set} />

                    <button type="submit" disabled={submitting} className="btn-forest group w-full py-4 text-base">
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-ink-muted">
                      By sending this form you agree to our{" "}
                      <Link to="/privacy-policy" className="underline decoration-leaf underline-offset-2 hover:text-forest">
                        privacy policy
                      </Link>
                      .
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
