# Bloomly — bloomly.co.in

Marketing site for Bloomly, India's B2B fresh-fruit supply chain. Vite + React + TypeScript + Tailwind, with Framer Motion and Lenis for motion.

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # production build in dist/
```

## The homepage tells one story

Each section is a chapter that answers the question the previous one raised. See `REDESIGN_PLAN.md` for the reasoning.

| # | Chapter | Component |
|---|---|---|
| — | Hero: headline → the Bloomly film in a frame that opens to full-bleed → "Every fruit has a journey." | `src/components/home/Hero.tsx`, `HeroFilm.tsx` |
| — | Quiet keyword band | `home/Ticker.tsx` |
| 01 | The problem — the broken middle between farmers and businesses | `home/Problem.tsx` |
| 02 | The mission — statement lights up word by word | `home/Mission.tsx` |
| 03 | The hybrid model — flow diagram that draws itself once when it comes into view | `home/HybridModel.tsx` |
| 04 | The value — farmers ⟷ businesses toggle | `home/TwoSides.tsx` |
| 05 | The proof — count-up metrics | `home/Impact.tsx` |
| 06 | The partners — logo marquee | `home/Partners.tsx` |
| 07 | Contact — role-aware form | `home/Contact.tsx` |

## Editing content

**All copy, numbers, partners and contact details live in `src/lib/content.ts`.** Change wording there, not in components.

- Wrap words in `*asterisks*` to render them as the green italic accent; `\n` forces a line break in headlines.
- Metrics: `impact.metrics`. Partner logos: `partners.logos` — `mono` is the clean one-colour version shown at rest (in `public/partners/`), `src` the original colour logo shown on hover, `h` the display height.
- Form endpoints: `contact.formspree` and `careers.formspree`.
- Hero "I'm a farmer" / "Source fruit with us" buttons pre-select the matching role in the contact form.

## Structure

```
src/
  lib/content.ts        all copy + data
  lib/scroll.ts         smooth-scroll helpers, cross-page section navigation
  lib/motion.ts         shared easing curves
  components/home/      homepage chapters
  components/site/      header, footer, preloader, chapter rail, form fields
  components/motion/    reusable effects (SplitText, Reveal, Magnetic, CountUp, VelocityMarquee)
  components/brand/      the Bloomly logo as animatable shapes (BloomlyLogo, logoPaths)
  pages/                Index, Careers, PrivacyPolicy, NotFound
```

## Design system

- Colours (Tailwind): `forest` (#0F4C32, from the logo), `leaf` (#8BB55E — a calmer take on the logo's #7FC141), `cream`, `citrus`, `berry`, `ink`.
- Type: Instrument Serif (display, `.display-xl/lg/md`, `.accent-italic`) + Geist (body).
- All motion respects `prefers-reduced-motion`.

## The hero film and the logo

- `HeroFilm.tsx` is a ~20-second looping animation drawn on canvas that shows what Bloomly solves: farmers appear, businesses appear, the routes between them tangle and lose fruit, then Bloomly connects both ends and fruit flows steadily. Captions live in `hero.film.captions` in `content.ts`. It has a pause button, and shows a still frame for visitors who prefer reduced motion.
- `BloomlyLogo` renders the real logo from `public/Bloomly-2.svg`, split into shapes so the leaves unfurl and the letters rise. It is used in the page intro, the header (leaves sway on hover), the hub of the hero film, and the footer sign-off.

## Notes

- The Careers form no longer has a file upload: Formspree never received the file (JSON-only submissions). Candidates now share a resume link, and the success screen offers a pre-filled "Email us your CV" button.
- The original pre-redesign source is archived in `legacy-site-backup.zip`.
