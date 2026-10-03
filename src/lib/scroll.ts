import type Lenis from "lenis";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};
export const getLenis = () => lenis;

export function scrollToId(id: string, immediate = false) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (lenis) {
    // Lenis caches the page height (debounced); after a route change it can still be the old page's.
    lenis.resize();
    lenis.scrollTo(el, { duration: 1.6, immediate, force: true });
  } else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  return true;
}

export function scrollToTop(immediate = false) {
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(0, { immediate, force: true, duration: 1.4 });
  } else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

/* Contact-role hand-off: a CTA can pre-select "farmer" / "retailer" in the contact form. */
export const ROLE_EVENT = "bloomly:contact-role";
let pendingRole: string | null = null;

export function setContactRole(role: string) {
  pendingRole = role;
  window.dispatchEvent(new CustomEvent(ROLE_EVENT, { detail: role }));
}
export function consumePendingRole() {
  const role = pendingRole;
  pendingRole = null;
  return role;
}

export type SectionNavState = { scrollTo?: string };

/** Navigate to a homepage section from anywhere, optionally pre-selecting a contact role. */
export function useGoToSection() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (id: string, role?: string) => {
      if (role) setContactRole(role);
      if (pathname === "/") {
        if (id === "top") scrollToTop();
        else scrollToId(id);
      } else {
        navigate("/", { state: { scrollTo: id } satisfies SectionNavState });
      }
    },
    [navigate, pathname],
  );
}
