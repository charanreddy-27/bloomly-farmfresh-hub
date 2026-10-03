import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "peer w-full rounded-2xl border bg-white px-4 pb-2.5 pt-6 text-[16px] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-transparent focus:border-forest focus:ring-4 focus:ring-leaf/20";
const label =
  "pointer-events-none absolute left-4 top-4 origin-left text-[0.95rem] text-ink-muted transition-all duration-300 ease-out-expo peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-forest peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.14em]";

type Common = { label: string; error?: string };

/** Text input with a floating label. */
export const Field = forwardRef<HTMLInputElement, Common & InputHTMLAttributes<HTMLInputElement>>(({ label: text, error, className, id, ...props }, ref) => (
  <div className={cn("relative", className)}>
    <input ref={ref} id={id} placeholder=" " className={cn(base, error ? "border-berry" : "border-forest/15")} aria-invalid={!!error} {...props} />
    <label htmlFor={id} className={label}>
      {text}
    </label>
    {error && <p className="mt-1.5 pl-1 text-sm text-berry">{error}</p>}
  </div>
));
Field.displayName = "Field";

/** Textarea with a floating label. */
export const AreaField = forwardRef<HTMLTextAreaElement, Common & TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ label: text, error, className, id, ...props }, ref) => (
    <div className={cn("relative", className)}>
      <textarea ref={ref} id={id} placeholder=" " className={cn(base, "min-h-[140px] resize-none", error ? "border-berry" : "border-forest/15")} aria-invalid={!!error} {...props} />
      <label htmlFor={id} className={label}>
        {text}
      </label>
      {error && <p className="mt-1.5 pl-1 text-sm text-berry">{error}</p>}
    </div>
  ),
);
AreaField.displayName = "AreaField";

/** Native select styled to match, with a permanently raised label. */
export function SelectField({
  label: text,
  id,
  options,
  placeholder,
  className,
  ...props
}: { label: string; options: { value: string; label: string }[]; placeholder: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={cn("relative", className)}>
      <select
        id={id}
        className="w-full appearance-none rounded-2xl border border-forest/15 bg-white px-4 pb-2.5 pt-6 text-[16px] text-ink outline-none transition-[border-color,box-shadow] duration-300 focus:border-forest focus:ring-4 focus:ring-leaf/20"
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <label htmlFor={id} className="pointer-events-none absolute left-4 top-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {text}
      </label>
      <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Animated check mark for success states. */
export function SuccessMark() {
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden>
      <circle cx="40" cy="40" r="36" fill="#8BB55E" fillOpacity="0.15" />
      <circle cx="40" cy="40" r="36" fill="none" stroke="#8BB55E" strokeWidth="3" strokeDasharray="226" strokeDashoffset="226" className="animate-[draw_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards]" />
      <path d="M26 41l9 9 19-20" fill="none" stroke="#0F4C32" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="44" strokeDashoffset="44" className="animate-[draw_0.6s_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]" />
    </svg>
  );
}
