import SiteLayout from "@/components/site/SiteLayout";
import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import Problem from "@/components/home/Problem";
import Mission from "@/components/home/Mission";
import HybridModel from "@/components/home/HybridModel";
import TwoSides from "@/components/home/TwoSides";
import Impact from "@/components/home/Impact";
import Partners from "@/components/home/Partners";
import Contact from "@/components/home/Contact";

/**
 * The homepage is one story, told in chapters:
 * who we are → the broken chain → our mission → how the hybrid model fixes it →
 * what each side gets → proof → who trusts us → talk to us.
 */
const Index = () => (
  <SiteLayout rail>
    <Hero />
    <Ticker />
    <Problem />
    <Mission />
    <HybridModel />
    <TwoSides />
    <Impact />
    <Partners />
    <Contact />
  </SiteLayout>
);

export default Index;
