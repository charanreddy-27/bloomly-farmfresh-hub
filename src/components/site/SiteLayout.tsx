import type { ReactNode } from "react";
import ChapterRail from "./ChapterRail";
import FloatingActions from "./FloatingActions";
import Footer from "./Footer";
import Header from "./Header";

export default function SiteLayout({ children, rail = false }: { children: ReactNode; rail?: boolean }) {
  return (
    <div className="relative min-h-screen">
      <Header />
      {rail && <ChapterRail />}
      <main>{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
