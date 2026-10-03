import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Loader2, Mail, Sprout, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { AreaField, Field, SelectField, SuccessMark } from "@/components/site/Field";
import { useIntroReady } from "@/components/site/Intro";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { useToast } from "@/hooks/use-toast";
import { careers, company } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { scrollToId } from "@/lib/scroll";

const WHY = [
  {
    icon: Target,
    title: "Work on a real problem",
    body: "How fruit is sourced shapes farmers' incomes and what ends up on India's shelves. The work you do here shows up in both.",
  },
  {
    icon: Sprout,
    title: "Build the ecosystem",
    body: "From farm-gate procurement to dispatch and distribution — every part of the chain is still being built, and there's room to shape it.",
  },
  {
    icon: TrendingUp,
    title: "Grow with us",
    body: "We grow season by season, alongside the farmers and businesses we work with. We're looking for people who want to grow with us.",
  },
];

const EMPTY = { name: "", email: "", phone: "", position: "", experience: "", resumeLink: "", coverLetter: "" };
type Errors = Partial<Record<"name" | "email" | "phone", string>>;

function validate(f: typeof EMPTY): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Full name is required";
  if (!f.email.trim()) e.email = "Email address is required";
  else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = "Please enter a valid email address";
  if (!f.phone.trim()) e.phone = "Phone number is required";
  return e;
}

export default function Careers() {
  const ready = useIntroReady();
  const { toast } = useToast();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof Errors]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitting(true);
    try {
      const position = form.position || "Not specified";
      const experience = form.experience ? `${form.experience} years` : "Not specified";
      const resume = form.resumeLink || "Not provided";
      const coverLetter = form.coverLetter || "No cover letter provided";
      const res = await fetch(careers.formspree, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          position,
          experience,
          resume_link: resume,
          cover_letter: coverLetter,
          _replyto: form.email,
          _subject: `Career Application from ${form.name}${form.position ? ` - ${form.position}` : ""}`,
          message: `Career application submitted with the following details:\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nPosition: ${position}\nExperience: ${experience}\nResume / LinkedIn: ${resume}\n\nCover Letter:\n${coverLetter}`,
        }),
      });
      if (!res.ok) throw new Error(`Form submission failed: ${res.status}`);
      setSubmittedName(form.name);
      setForm(EMPTY);
    } catch {
      toast({
        title: "We couldn't send your application",
        description: `Please try again, or email us directly at ${company.email}`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const cvMailto = (name: string) =>
    `mailto:${company.email}?subject=${encodeURIComponent(`CV - ${name}`)}&body=${encodeURIComponent("Hi Bloomly team,\n\nPlease find my CV attached.\n\n")}`;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-800 pb-10 pt-[calc(var(--header-h)+5rem)] text-cream md:pt-[calc(var(--header-h)+7rem)]">
        <div className="pointer-events-none absolute -left-40 top-0 h-[60vh] w-[60vh] [background:radial-gradient(closest-side,rgba(139,181,94,0.22),transparent)]" aria-hidden />
        <div className="container relative">
          <motion.p
            className="eyebrow text-leaf"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8 }}
          >
            Careers at Bloomly
          </motion.p>
          <SplitText as="h1" text={"Grow *with*\nBloomly."} play={ready} delay={0.1} className="display-xl mt-6 text-cream" />
          <motion.div
            className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE_OUT, delay: 0.6 }}
          >
            <p className="max-w-xl text-lg leading-relaxed text-cream/70">
              Help us rebuild how India's fruit moves — fairer for the farmers who grow it, more dependable for the businesses who sell it.
            </p>
            <Magnetic>
              <button type="button" onClick={() => scrollToId("apply")} className="btn-leaf group">
                Apply now
                <ArrowDown className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5" />
              </button>
            </Magnetic>
          </motion.div>
        </div>

        <div className="mt-20 border-y border-white/10 py-5 md:mt-28">
          <VelocityMarquee baseVelocity={-1.2}>
            {careers.positions
              .filter((p) => p !== "Other")
              .map((p) => (
                <span key={p} className="flex items-center whitespace-nowrap font-display text-xl italic text-cream/70 md:text-3xl">
                  {p}
                  <span className="mx-8 h-2 w-2 rounded-full bg-leaf md:mx-12" />
                </span>
              ))}
          </VelocityMarquee>
        </div>
      </section>

      {/* Why Bloomly */}
      <section className="bg-cream py-24 md:py-36">
        <div className="container">
          <p className="eyebrow text-forest/70">
            <span className="text-leaf-600">Why</span> Bloomly
          </p>
          <SplitText text="Meaningful work, *close to the ground*." className="display-lg mt-6 max-w-3xl text-forest" accentClassName="accent-italic text-leaf-600" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.1}>
                <div className="group h-full rounded-[1.25rem] border border-forest/10 bg-white p-8 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(7,38,26,0.35)] md:p-10">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-100 text-forest transition-all duration-500 group-hover:-rotate-6 group-hover:bg-leaf">
                    <w.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-8 font-display text-2xl text-forest">{w.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="bg-cream pb-24 md:pb-36">
        <div className="container">
          <div className="grid gap-10 rounded-[1.5rem] bg-forest p-3 text-cream md:rounded-[2rem] md:p-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="p-6 md:p-10">
              <p className="eyebrow text-leaf">Apply</p>
              <h2 className="display-md mt-6">
                Tell us about <span className="accent-italic text-leaf">yourself</span>.
              </h2>
              <p className="mt-5 max-w-sm leading-relaxed text-cream/70">
                Fill in the form and we'll get back to you soon. Share a link to your resume or LinkedIn — or email your CV straight to us.
              </p>
              <a href={`mailto:${company.email}`} className="mt-8 inline-flex items-center gap-3 text-cream/90 transition-colors hover:text-leaf">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15">
                  <Mail className="h-[18px] w-[18px]" />
                </span>
                {company.email}
              </a>
              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">Roles we hire for</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {careers.positions
                    .filter((p) => p !== "Other")
                    .map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, position: p }))}
                        className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                          form.position === p ? "border-leaf bg-leaf text-forest-900" : "border-white/15 text-cream/80 hover:border-leaf hover:text-leaf"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            <div className="rounded-[1.05rem] bg-cream p-6 text-ink md:rounded-[1.4rem] md:p-10">
              <AnimatePresence mode="wait">
                {submittedName ? (
                  <motion.div
                    key="done"
                    className="flex min-h-[32rem] flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                  >
                    <SuccessMark />
                    <h3 className="display-md mt-6 text-forest">Application received!</h3>
                    <p className="mt-3 max-w-sm text-ink-soft">
                      Thank you for your interest in joining Bloomly. We'll review your application and get back to you soon.
                    </p>
                    <a href={cvMailto(submittedName)} className="btn-forest mt-8">
                      <Mail className="h-4 w-4" /> Email us your CV
                    </a>
                    <button type="button" onClick={() => setSubmittedName(null)} className="mt-4 text-sm font-medium text-forest underline decoration-leaf underline-offset-4">
                      Submit another application
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} noValidate className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field id="c-name" name="name" label="Full name *" autoComplete="name" value={form.name} onChange={set} error={errors.name} className="sm:col-span-2" />
                      <Field id="c-email" name="email" type="email" label="Email address *" autoComplete="email" value={form.email} onChange={set} error={errors.email} />
                      <Field id="c-phone" name="phone" type="tel" label="Phone number *" autoComplete="tel" value={form.phone} onChange={set} error={errors.phone} />
                      <SelectField
                        id="c-position"
                        name="position"
                        label="Position"
                        placeholder="Select a position"
                        value={form.position}
                        onChange={set}
                        options={careers.positions.map((p) => ({ value: p, label: p }))}
                      />
                      <SelectField
                        id="c-experience"
                        name="experience"
                        label="Experience"
                        placeholder="Select experience level"
                        value={form.experience}
                        onChange={set}
                        options={careers.experience.map((x) => ({ value: x, label: `${x} years` }))}
                      />
                      <Field
                        id="c-resume"
                        name="resumeLink"
                        type="url"
                        label="Resume or LinkedIn link (optional)"
                        value={form.resumeLink}
                        onChange={set}
                        className="sm:col-span-2"
                      />
                    </div>
                    <AreaField
                      id="c-cover"
                      name="coverLetter"
                      label="Why Bloomly? (optional)"
                      value={form.coverLetter}
                      onChange={set}
                    />
                    <button type="submit" disabled={submitting} className="btn-forest group w-full py-4 text-base">
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                        </>
                      ) : (
                        <>
                          Submit application
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
