import type { ReactNode } from "react";
import ChapterRail from "./ChapterRail";
import FloatingActions from "./FloatingActions";
import Footer from "./Footer";
import Header from "./Header";

export default function SiteLayout({ children, rail = false }: { children: ReactNode; rail?: boolean }) {
  return (
    <div className="relative min-h-screen">
      <a
        href="#main-content"
        className="sr-only z-[110] rounded-full bg-cream px-4 py-2 text-sm font-semibold text-forest focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      {rail && <ChapterRail />}
      <main id="main-content">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
