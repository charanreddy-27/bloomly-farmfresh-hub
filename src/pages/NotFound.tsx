import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SiteLayout from "@/components/site/SiteLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteLayout>
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream pt-[var(--header-h)]">
        <div className="container relative text-center">
          <p className="font-display text-[clamp(5rem,14vw,9rem)] leading-none text-forest/15">404</p>
          <h1 className="display-lg mx-auto mt-2 max-w-xl text-forest">
            This one fell off the <span className="accent-italic text-leaf-600">truck</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">The page you're looking for doesn't exist — but there's plenty of fresh stuff back home.</p>
          <Link to="/" className="btn-forest group mt-10">
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
            Back to home
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
