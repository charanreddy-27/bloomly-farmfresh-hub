import { Reveal } from "./Reveal";

/* The partners' own colour logos. `h` is the display height in px, tuned so each reads at a similar size. */
const partners = [
  { name: "BigBasket", logo: "/BigBasket_Logo.webp", h: 46 },
  { name: "Zepto", logo: "/zepto-logo.webp", h: 46, rounded: true },
  { name: "Swiggy", logo: "/Swiggy_Logo.webp", h: 38 },
  { name: "Reliance Fresh", logo: "/ril-fresh-logo.jpg", h: 38 },
  { name: "STAR", logo: "/STAR_Logo.jpg", h: 50 },
  { name: "KPN Fresh", logo: "/KPN-Logo.svg", h: 22 },
  { name: "Superplum", logo: "/big-logo.png", h: 26 },
  { name: "More", logo: "/more.webp", h: 46 },
  { name: "FirstClub", logo: "/firstclub_private_limited_logo.jpg", h: 64, rounded: true },
];

// Four copies: the row moves by exactly half its width, so the loop never shows a gap, even on very wide screens.
const COPIES = 4;

const TrustedPartners = () => {
  return (
    <section className="section overflow-hidden">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">
            Trusted by Leading <span className="hl">Retailers</span>
          </h2>
          <p className="lead mt-4">Supplying India's leading supermarkets and quick-commerce apps.</p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mask-fade-x group mt-12 flex overflow-hidden py-4 md:mt-14">
        {/* Smaller tiles (and logos) on phones, so the row shows as many partners as it does on desktop */}
        <ul className="flex w-max shrink-0 animate-marquee [--logo-scale:0.5] group-hover:[animation-play-state:paused] sm:[--logo-scale:1]">
          {Array.from({ length: COPIES }).flatMap((_, copy) =>
            partners.map((p) => (
              <li
                key={`${copy}-${p.name}`}
                aria-hidden={copy > 0}
                className="card mr-2.5 grid h-16 w-28 shrink-0 place-items-center px-3 sm:mr-4 sm:h-28 sm:w-52 sm:px-6 md:mr-5 md:h-32 md:w-60"
              >
                <img
                  src={p.logo}
                  alt={copy === 0 ? p.name : ""}
                  decoding="async"
                  style={{ height: `calc(${p.h}px * var(--logo-scale))` }}
                  className={`w-auto max-w-full object-contain ${p.rounded ? "rounded-lg" : ""}`}
                />
              </li>
            )),
          )}
        </ul>
      </Reveal>
    </section>
  );
};

export default TrustedPartners;
