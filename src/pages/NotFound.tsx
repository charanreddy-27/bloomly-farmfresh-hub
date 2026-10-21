import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container flex flex-1 flex-col items-start justify-center pb-24 pt-[calc(var(--header-h)+4rem)]">
        <p className="eyebrow">404</p>
        <h1 className="h-section mt-3 text-forest">Page not found</h1>
        <p className="lead mt-4 max-w-md">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn-forest mt-8">
          Return to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
