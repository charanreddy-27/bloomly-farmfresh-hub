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
        <ul className="flex w-max shrink-0 animate-marquee group-hover:[animation-play-state:paused]">
          {Array.from({ length: COPIES }).flatMap((_, copy) =>
            partners.map((p) => (
              <li
                key={`${copy}-${p.name}`}
                aria-hidden={copy > 0}
                className="card mr-4 grid h-28 w-52 shrink-0 place-items-center px-6 md:mr-5 md:h-32 md:w-60"
              >
                <img
                  src={p.logo}
                  alt={copy === 0 ? p.name : ""}
                  decoding="async"
                  style={{ height: p.h }}
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
