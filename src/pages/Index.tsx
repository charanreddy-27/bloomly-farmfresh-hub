import Header from "../components/Header";
import Hero from "../components/Hero";
import ProblemSolution from "../components/ProblemSolution";
import Metrics from "../components/Metrics";
import WhyBloomly from "../components/WhyBloomly";
import Solutions from "../components/Solutions";
import CallToAction from "../components/CallToAction";
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
        <WhyBloomly />
        <Solutions />
        <CallToAction />
      </main>
      <Footer />
      <InteractiveFeatures />
    </div>
  );
};

export default Index;
