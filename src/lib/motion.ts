/** Shared easing curves so every animation on the site feels like one system. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const; // expo-out: fast start, long settle
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const; // for curtains and wipes
export const EASE_PREMIUM = [0.32, 0.72, 0, 1] as const; // weighted, unhurried settle — the default for reveals

export const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};
