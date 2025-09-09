import { Truck, Building2, HandHeart, Users } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-gradient-to-b from-background to-green-50/30 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-16 left-16 w-24 h-24 bg-green-300 rounded-full blur-2xl" />
        <div className="absolute bottom-16 right-16 w-32 h-32 bg-green-400 rounded-full blur-2xl" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            About <span 
              className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, #2E7D32 0%, #4CAF50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >Us</span>
          </h2>
        </div>

        {/* Mission Statement */}
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight fade-in">
            Bloomly is on a mission to build the strongest{' '}
            <span className="text-primary">fruit sourcing ecosystem</span>{' '}
            in India.
          </h3>
        </div>

        {/* The Challenge */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                The Challenge
              </h4>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We observed a core challenge in the market: even the largest retail chains and general trade players struggle to source fruits consistently and at the right quality.
                </p>
                <p>
                  While businesses excel at selling to end customers, sourcing remains their biggest bottleneck and reliable, consistent supply is the true backbone of the fresh produce value chain.
                </p>
              </div>
            </div>
            <div className="slide-up">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-red-100 border-l-4 border-l-red-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-red-100">
                    <Building2 className="w-8 h-8 text-red-600" />
                  </div>
                  <h5 className="text-xl font-bold text-foreground">Market Reality</h5>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Even large retail chains face inconsistent fruit sourcing, affecting their ability to serve customers reliably.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Solution */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up order-2 lg:order-1">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-green-100 border-l-4 border-l-green-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-green-100">
                    <HandHeart className="w-8 h-8 text-green-600" />
                  </div>
                  <h5 className="text-xl font-bold text-foreground">Our Approach</h5>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  A hybrid purchase model that works for both farmers and businesses, ensuring fair access and reliable supply.
                </p>
              </div>
            </div>
            <div className="fade-in order-1 lg:order-2">
              <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Our Solution
              </h4>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Bloomly set out to solve this. Through our hybrid purchase model, farmers can sell directly to us at the farm gate or bring their harvest to the nearest Bloomly distribution center. This gives farmers fair market access, transparent pricing, and reliable payments.
                </p>
                <p>
                  For businesses, Bloomly bridges the sourcing gap ensuring general trade, and both online and offline retailers receive fresh, reliable, and dependable fruits, consistently. By strengthening the supply backbone, we enable businesses to focus on customers while we take care of sourcing with trust and efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-6 fade-in">
              How Our Hybrid Model Works
            </h4>
            <p className="text-xl text-muted-foreground slide-up max-w-3xl mx-auto">
              Two convenient options designed to serve farmers and ensure quality for businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-green-100 text-center scale-in">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <HandHeart className="w-8 h-8 text-white" />
              </div>
              <h5 className="text-xl font-bold text-foreground mb-4">Farm Gate Purchase</h5>
              <p className="text-muted-foreground leading-relaxed">
                Farmers can sell directly to us at the farm gate, providing convenience and fair market access with transparent pricing.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg border border-green-100 text-center scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h5 className="text-xl font-bold text-foreground mb-4">Distribution Centers</h5>
              <p className="text-muted-foreground leading-relaxed">
                Farmers can bring their harvest to the nearest Bloomly distribution center for flexible and efficient processing.
              </p>
            </div>
          </div>
        </div>

        {/* Final Impact Statement */}
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-white rounded-xl p-12 shadow-lg border border-green-100 fade-in">
            <Users className="w-16 h-16 text-primary mb-8 mx-auto" />
            <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-tight">
              Strengthening India's Fruit Supply Chain
            </h4>
            <p className="text-xl text-muted-foreground leading-relaxed">
              By strengthening the supply backbone, we enable businesses to focus on customers while we take care of sourcing with trust and efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
