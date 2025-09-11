import { Truck, Building2, HandHeart, Users } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="pt-8 md:pt-12 lg:pt-16 pb-4 md:pb-6 lg:pb-8 bg-gradient-to-b from-background to-green-50/30 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-16 left-16 w-24 h-24 bg-green-300 rounded-full blur-2xl" />
        <div className="absolute bottom-16 right-16 w-32 h-32 bg-green-400 rounded-full blur-2xl" />
      </div>

      <div className="container relative z-10">
       

        {/* Mission Statement */}
        <div className="max-w-5xl mx-auto text-center mb-12 md:mb-20">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 md:mb-8 leading-tight fade-in px-4">
            Bloomly is on a mission to build the strongest{' '}
            <span className="text-primary">fruit sourcing ecosystem</span>{' '}
            in India.
          </h3>
        </div>

        {/* The Challenge */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="fade-in px-4 lg:px-0">
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8">
                The Challenge
              </h4>
              <div className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  We observed a core challenge in the market: even the largest retail chains and general trade players struggle to source fruits consistently and at the right quality.
                </p>
                <p>
                  While businesses excel at selling to end customers, sourcing remains their biggest bottleneck and reliable, consistent supply is the true backbone of the fresh produce value chain.
                </p>
              </div>
            </div>
            <div className="slide-up px-4 lg:px-0">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-red-100 border-l-4 border-l-red-500">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="p-2 md:p-3 rounded-full bg-red-100 flex-shrink-0">
                    <Building2 className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
                  </div>
                  <h5 className="text-lg md:text-xl font-bold text-foreground">Market Reality</h5>
                </div>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Even large retail chains face inconsistent fruit sourcing, affecting their ability to serve customers reliably.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Solution */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="slide-up order-2 lg:order-1 px-4 lg:px-0">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-green-100 border-l-4 border-l-green-500">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="p-2 md:p-3 rounded-full bg-green-100 flex-shrink-0">
                    <HandHeart className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                  </div>
                  <h5 className="text-lg md:text-xl font-bold text-foreground">Our Approach</h5>
                </div>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  A hybrid purchase model that works for both farmers and businesses, ensuring fair access and reliable supply.
                </p>
              </div>
            </div>
            <div className="fade-in order-1 lg:order-2 px-4 lg:px-0">
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8">
                Our Solution
              </h4>
              <div className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Bloomly set out to solve this. Through our hybrid purchase model, we source quality produce and ensure efficient distribution. This gives farmers fair market access, transparent pricing, and reliable payments.
                </p>
                <p>
                  For businesses, Bloomly bridges the sourcing gap ensuring general trade, and both online and offline businesses receive fresh, reliable, and dependable fruits, consistently. By strengthening the supply backbone, we enable businesses to focus on customers while we take care of sourcing with trust and efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
