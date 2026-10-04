/**
 * All site copy and company data lives here, so wording, numbers and
 * partners can be updated without touching any component.
 */

export const company = {
  name: "Bloomly",
  legalName: "Bloomly Platforms India Private Limited",
  email: "operations@bloomly.co.in",
  phone: "+91 72595 36656",
  phoneHref: "tel:+917259536656",
  whatsapp: "917259536656",
  whatsappMessage:
    "Hi Bloomly! I'm interested in learning more about your fresh produce supply chain solutions.",
  addressLines: ["Salarpuria Sattva Magnificia,", "78, Old Madras Rd, Mahadevapura,", "Bangalore – 560016"],
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Salarpuria+Sattva+Magnificia+Old+Madras+Road+Mahadevapura+Bangalore",
  city: "Bengaluru, India",
};

export const whatsappHref = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(company.whatsappMessage)}`;

/** Homepage chapters, in story order. `id` is the section anchor. */
export const chapters = [
  { id: "problem", number: "01", label: "The problem" },
  { id: "mission", number: "02", label: "The mission" },
  { id: "model", number: "03", label: "The model" },
  { id: "value", number: "04", label: "The value" },
  { id: "impact", number: "05", label: "The proof" },
  { id: "partners", number: "06", label: "The partners" },
  { id: "contact", number: "07", label: "Next step" },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];

export const hero = {
  // *word* = italic accent, \n = line break
  headline: "Transforming how farmers *sell* fruit,\nand how businesses *buy* it.",
  sub: "Bloomly is building India's most reliable B2B fresh fruit supply chain: fair, transparent sourcing for farmers, and consistent, quality supply for the businesses that sell it.",
  reveal: "Every fruit has a journey.",
  revealSub: "We make it a reliable one, from the farm gate to the shelf.",
  // The animated intro in the hero frame. One caption per scene, in order.
  film: {
    farmers: "Farmers",
    businesses: "Businesses",
    captions: [
      "India's farmers grow the fruit.",
      "Businesses need it on the shelf, every day.",
      "But the middle of the chain is broken.",
      "Bloomly connects both ends.",
      "Fair for farmers. Dependable for businesses.",
    ],
  },
};

export const ticker = [
  "Farm-gate sourcing",
  "Transparent pricing",
  "Reliable payments",
  "Consistent quality",
  "Modern trade",
  "Wholesale",
  "Retail — online & offline",
];

export const problem = {
  headline: "India grows the fruit. Getting it to the shelf, *reliably*, is where the chain breaks.",
  intro:
    "We saw a core challenge in the market: even the largest retail chains and general-trade players struggle to source fruit consistently, at the right quality. Businesses excel at selling to customers — sourcing is their biggest bottleneck. And the farmers on the other end feel it too.",
  farmers: {
    title: "Farmers",
    pains: [
      { title: "Limited market access", body: "Few dependable buyers, and little choice in where to sell a harvest." },
      { title: "Opaque pricing", body: "No clear view of what the fruit is really worth until it's already sold." },
      { title: "Uncertain payments", body: "Getting paid on time is never a given." },
    ],
  },
  businesses: {
    title: "Businesses",
    pains: [
      { title: "Inconsistent supply", body: "Even the largest retailers struggle with availability week to week." },
      { title: "Uneven quality", body: "Holding one standard across every batch is a constant fight." },
      { title: "Sourcing bottlenecks", body: "Gaps in supply ripple straight into store operations." },
    ],
  },
};

export const mission = {
  lead: "So we set out to fix the middle.",
  // words wrapped in *…* light up in leaf green
  statement:
    "Bloomly is on a mission to build the *strongest fruit sourcing ecosystem* in India — fair for the farmers who grow it, dependable for the businesses who sell it.",
};

export const model = {
  headline: "The *hybrid* model.",
  sub: "How Bloomly fixes the middle — flexible for farmers on the way in, dependable for businesses on the way out.",
  steps: [
    {
      number: "01",
      title: "Two ways in.",
      body: "Farmers choose how they sell. Bloomly buys directly at the farm gate — or farmers harvest and bring their produce to our distribution center.",
    },
    {
      number: "02",
      title: "One dispatch center.",
      body: "Everything converges at Bloomly's Dispatch Center, where fruit is aggregated, quality-checked and readied for dispatch.",
    },
    {
      number: "03",
      title: "Every channel out.",
      body: "Consistent, dependable supply flows out to modern trade, wholesale and retailers — online and offline.",
    },
  ],
  sources: ["Bloomly buys at the farm gate", "Farmers deliver to our DC"],
  hub: "Bloomly Dispatch Center",
  channels: ["Modern Trade", "Wholesale", "Retailers"],
};

export const audiences = {
  farmers: {
    tab: "For farmers",
    headline: "Sell your harvest with *confidence*.",
    body: "Fair market access, transparent pricing and payments you can rely on — with the flexibility to sell at your farm gate or at our center.",
    cta: "Sell to Bloomly",
    role: "farmer",
    benefits: [
      { icon: "tractor", title: "Sell your way", body: "At the farm gate, or harvest and drop off at our distribution center." },
      { icon: "scale", title: "Transparent pricing", body: "Clear, fair prices — no guesswork about what your fruit is worth." },
      { icon: "wallet", title: "Reliable payments", body: "Payments you can count on, so you can plan the next season." },
      { icon: "handshake", title: "Steady market access", body: "One dependable buyer, connected to retailers across every channel." },
    ],
  },
  businesses: {
    tab: "For businesses",
    headline: "Fruit you can *plan* around.",
    body: "Fresh, reliable and dependable supply — so you can focus on your customers while we take care of sourcing with trust and efficiency.",
    cta: "Source with Bloomly",
    role: "retailer",
    benefits: [
      { icon: "calendar", title: "Consistent supply", body: "Predictable volumes, week after week, season after season." },
      { icon: "shield", title: "The right quality", body: "One standard, held across every batch we deliver." },
      { icon: "store", title: "Every channel covered", body: "Modern trade, wholesale and general trade — online and offline." },
      { icon: "sparkles", title: "Focus on selling", body: "We handle the sourcing. You handle your customers." },
    ],
  },
} as const;

export type AudienceKey = keyof typeof audiences;

export const impact = {
  headline: "The journey *so far*.",
  sub: "Built season by season, with the farmers and businesses who trust us.",
  metrics: [
    { value: 1800, suffix: "+", label: "Metric tonnes of fruit delivered" },
    { value: 2400, suffix: "+", label: "Farmer connects across our network" },
    { value: 95, suffix: "%", label: "Of customers come back to reorder" },
  ],
  closer: "Behind every tonne: a farmer with a fair market, and a shelf that stayed stocked.",
};

export const partners = {
  headline: "Trusted by India's *leading* retailers.",
  sub: "From quick commerce to modern trade, businesses of every size rely on Bloomly for their fresh fruit.",
  logos: [
    // mono = clean one-colour version shown at rest; src = original colour logo shown on hover.
    // h = display height (px) so every mark reads at the same optical size.
    { name: "BigBasket", src: "/BigBasket_Logo.webp", mono: "/partners/bigbasket.png", h: 28 },
    { name: "Zepto", src: "/Logo_of_Zepto.png", mono: "/partners/zepto.png", h: 30 },
    { name: "Swiggy", src: "/Swiggy_Logo.webp", mono: "/partners/swiggy.png", h: 32 },
    { name: "Reliance Fresh", src: "/ril-fresh-logo.jpg", mono: "/partners/reliance-fresh.png", h: 30 },
    { name: "STAR", src: "/STAR_Logo.jpg", mono: "/partners/star.png", h: 40 },
    { name: "KPN Fresh", src: "/KPN-Logo.svg", mono: "/partners/kpn.svg", h: 19 },
    { name: "Superplum", src: "/big-logo.png", mono: "/partners/superplum.png", h: 24 },
    { name: "More", src: "/more.webp", mono: "/partners/more.png", h: 34 },
  ],
};

export const contact = {
  headline: "Let's grow *together*.",
  sub: "Whether you're a retailer, a farmer or an investor — we'd love to hear from you. We reply within 24 hours.",
  roles: [
    { value: "retailer", label: "Retailer / Business" },
    { value: "farmer", label: "Farmer" },
    { value: "investor", label: "Investor" },
    { value: "other", label: "Other" },
  ],
  formspree: "https://formspree.io/f/mzzaokpp",
};

export const careers = {
  formspree: "https://formspree.io/f/mvgblvpr",
  positions: [
    "Software Engineer",
    "Product Manager",
    "Data Analyst",
    "Supply Chain Manager",
    "Quality Assurance",
    "Business Development",
    "Operations Manager",
    "Customer Support",
    "Marketing Specialist",
    "Finance Manager",
    "Other",
  ],
  experience: ["0-1", "2-3", "4-5", "6-10", "10+"],
};
