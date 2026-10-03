import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/** Returns the id of the section currently crossing the middle of the viewport (or null). */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const { pathname } = useLocation();
  const key = ids.join("|");

  useEffect(() => {
    setActive(null);
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    // sections mount with the page, so wait a frame before observing
    const raf = requestAnimationFrame(() => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, pathname]);

  return active;
}
