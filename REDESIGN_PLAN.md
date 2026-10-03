# Bloomly website — redesign plan

**Status: implemented (2026-09-29).** Everything below is built, verified at 1440×900 and 390×844, and covered by interaction checks (CTAs → role pre-select, audience toggle, both forms with mocked Formspree, cross-page navigation, mobile menu, reduced motion).

## 1. What the old site gets wrong

| Area | Problem |
|---|---|
| Story | The narrative exists in the copy (problem → hybrid model → impact) but is laid out as disconnected card blocks. The hero subtitle ends mid-thought ("building a strong ecosystem for both"). The visitor never learns *why* Bloomly exists before being shown numbers. |
| Audience | Bloomly serves **two** audiences — farmers who sell and businesses who buy — but the site speaks to neither directly. There is no "I'm a farmer" path at all. |
| Brand | Five font families (Inter, Poppins, Manrope, Nunito, Quicksand). Flowchart uses blue/amber/purple/red/cyan that have nothing to do with the logo. The real brand is forest `#0F4C32` + leaf `#7FC141`. |
| Motion | Animations are CSS keyframes that fire on page load, not on scroll — most of them finish before the visitor ever sees them. ~1,400 lines of CSS, most unused. |
| Bugs | Footer "Careers" link → `#`. Careers form *requires* a CV file that is never sent (Formspree receives JSON only), then asks candidates to email it anyway. Global mobile CSS forces every `a`/`button` to 44×44px min and adds 80px body padding. Flowchart is scaled with `transform: scale(0.7)` on mobile, leaving dead space. |

## 2. The story (one scroll = one narrative)

The homepage is structured as chapters, each answering the question the previous one raised.

| # | Chapter | Question it answers | Content source |
|---|---|---|---|
| 0 | **Hero** — "Transforming how farmers *sell* fruit, and how businesses *buy* it." | Who are you? | existing headline + page title |
| — | Ticker strip — the model in keywords | — | existing solution copy |
| 01 | **The broken chain** — pains on *both* sides | Why should I care? | existing "Challenge" copy + inverse of the solution promises |
| 02 | **Mission** — scroll-lit statement | What are you trying to do? | existing mission line |
| 03 | **The hybrid model** — animated flow: 2 ways in → Dispatch Center → 3 channels out | How does it work? | existing flowchart |
| 04 | **Two sides, one ecosystem** — Farmers ⟷ Businesses toggle | What's in it for me? | existing solution bullets, split per audience |
| 05 | **The journey so far** — 1,800+ MT · 2,400+ farmers · 95% repeat | Does it work? | existing metrics (no new numbers invented) |
| 06 | **Trusted by** — partner marquee | Who else trusts you? | existing partner logos |
| 07 | **Let's grow together** — role-aware contact | What do I do next? | existing form + contact info |

Both hero CTAs ("Source fruit with us" / "I'm a farmer") jump to the contact form with the role pre-selected.

## 3. Design system

- **Palette**: Forest `#0F4C32` (primary), Deep forest `#07261A` (dark sections), Leaf `#7FC141` (accent), Cream `#F6F3EA` (page), Citrus `#F4A024` (sparingly — fruit warmth), Ink `#0E1F17` (text).
- **Type**: *Fraunces* (soft editorial serif, italic accents) for display; *DM Sans* for UI/body. Two families, down from five.
- **Texture**: subtle film-grain overlay; rounded 28px cards; thin hairline dividers; chapter labels (`01 — The broken chain`).
- **Illustration**: hand-built SVG fruits (orange, lime, mango, pomegranate, banana, apple) in brand colours — no stock photos needed.

## 4. Motion system

| Effect | Where | Tech |
|---|---|---|
| Brand preloader (leaf draws in → curtain lifts), once per session | App | Framer Motion + sessionStorage |
| Smooth inertial scrolling | Global | Lenis |
| Scroll progress bar | Global | `useScroll` |
| Header: transparent on hero → floating glass pill; hides on scroll-down | Header | `useScroll` + `useMotionValueEvent` |
| Masked word-by-word headline reveal | Hero, section titles | Framer variants |
| Photo Ken-Burns + scroll parallax + scale-out | Hero | `useTransform` |
| Floating SVG fruits with depth parallax | Hero, Mission | `useTransform` |
| Infinite keyword ticker | Below hero | CSS marquee |
| Sticky split with staggered pain cards | Chapter 01 | `whileInView` |
| Word-by-word colour fill tied to scroll position | Chapter 02 | `useScroll` per word |
| Flow diagram draws itself once on entering view (no pinning): paths draw, nodes light up in sequence, fruit particles travel the paths | Chapter 03 | `pathLength` + SVG `animateMotion` |
| Audience toggle with shared-layout pill + crossfade | Chapter 04 | `layoutId`, `AnimatePresence` |
| Count-up numbers with spring easing | Chapter 05 | `useSpring` + `useInView` |
| Two-row opposing logo marquee, greyscale → colour on hover | Chapter 06 | CSS |
| Magnetic buttons | CTAs | pointer tracking |
| Floating-label inputs, animated success state | Contact / Careers | Framer Motion |
| Giant wordmark reveal | Footer | `whileInView` |

All motion respects `prefers-reduced-motion` (falls back to static, fully visible content).

## 5. Pages

- **Home** — chapters above.
- **Careers** — new hero ("Grow with Bloomly"), why-join cards, restyled form. CV upload replaced by an optional resume/LinkedIn link + a pre-filled email button, because the old upload was never transmitted.
- **Privacy Policy** — restyled to match, content unchanged.
- **404** — branded ("This fruit fell off the truck").

## 6. Engineering

- Add `framer-motion`, `lenis`. Keep Vite + React + Tailwind + shadcn primitives.
- Rewrite `index.css` from scratch; keep shadcn CSS variables so `ui/*` components still work.
- Formspree endpoints unchanged (`mzzaokpp` contact, `mvgblvpr` careers).
- Fix all bugs in §1.
- Verify: `npm run build`, `tsc`, desktop + mobile screenshots in the browser.

## 7. Open items for the Bloomly team

- **Real photography** (farmers, the dispatch center, trucks loading) would lift chapters 01/03/04 further — every section is built so a photo can drop in.
- Confirm partner list and metrics are still current.
- Confirm LinkedIn/Twitter URLs in `index.html` structured data (currently `linkedin.com/company/bloomly`, `twitter.com/bloomly` — unverified).
