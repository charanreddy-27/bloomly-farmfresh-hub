import Header from "../components/Header";
import Hero from "../components/Hero";
import ProblemSolution from "../components/ProblemSolution";
import Metrics from "../components/Metrics";
import TrustedPartners from "../components/TrustedPartners";
import Solutions from "../components/Solutions";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import InteractiveFeatures from "../components/InteractiveFeatures";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Metrics />
        <TrustedPartners />
        <Solutions />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <InteractiveFeatures />
    </div>
  );
};

export default Index;
