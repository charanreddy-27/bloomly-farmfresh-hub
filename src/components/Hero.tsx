import { useEffect, useState } from 'react';
import { ArrowRight, Play, Sparkles, CheckCircle, TrendingUp, Leaf } from 'lucide-react';
import Counter from './ui/Counter';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePartnerClick = () => {
    const signupSection = document.getElementById('signup-section');
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMoreClick = () => {
    const solutionsSection = document.getElementById('solutions');
    if (solutionsSection) {
      solutionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    { icon: TrendingUp, text: "3x Higher Margins" },
    { icon: Leaf, text: "Zero Waste Guarantee" },
    { icon: CheckCircle, text: "99% On-Time Delivery" }
  ];

  return (
    <section className="relative pt-16 pb-12 md:pt-20 md:pb-16 min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/gemini_generated_image_6bhcgz6bhcgz6bhc-Yanq8xlZjkhx8B9D.avif)',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200/30 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-green-300/20 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-400/25 rounded-full blur-lg animate-float-fast" />
        
        {/* Leaf decorations */}
        <div className="absolute top-1/4 right-10 text-green-300/20 text-6xl transform rotate-12">🍃</div>
        <div className="absolute bottom-1/4 left-16 text-green-200/30 text-4xl transform -rotate-12">🌿</div>
      </div>

      {/* Main Content */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="text-center lg:text-left">

            
            {/* Hero Headline with Green Gradient Text */}
            <h1 className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-2xl">
                Fresh. Convenient.
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span 
                  className="text-green-400 drop-shadow-2xl font-extrabold"
                  style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(34, 197, 94, 0.3)'
                  }}
                >
                  Reliable.
                </span>
              </span>
            </h1>
            
            {/* Hero Subheadline */}
            <p className="mb-8 text-lg md:text-xl text-white leading-relaxed animate-fade-in-up font-medium" style={{ 
              animationDelay: '0.4s',
              textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
            }}>
              Delivering premium fruits directly to your business—on time, every time.
              <span className="block mt-2 text-green-300 font-semibold text-base" style={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
              }}>
                Direct farm connections • Predictable supply • Quality guaranteed
              </span>
            </p>
            
            {/* Benefits List */}
            <div className="mb-8 flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-full border border-green-300 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <IconComponent className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
            
    
          </div>

          {/* Right Content - Visual/Stats */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="bg-white/97 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">Trusted by Businesses</h3>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <Counter 
                    end={500} 
                    suffix="+" 
                    className="text-3xl font-bold text-green-600"
                  />
                  <div className="text-sm text-gray-700 mt-1 font-medium">Retail Partners</div>
                </div>
                <div className="text-center">
                  <Counter 
                    end={50} 
                    suffix="+" 
                    className="text-3xl font-bold text-green-600"
                  />
                  <div className="text-sm text-gray-700 mt-1 font-medium">Farm Partners</div>
                </div>
                <div className="text-center">
                  <Counter 
                    end={99} 
                    suffix="%" 
                    className="text-3xl font-bold text-green-600"
                  />
                  <div className="text-sm text-gray-700 mt-1 font-medium">On-Time Delivery</div>
                </div>
              </div>

              {/* Quick Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm" />
                  <span className="text-sm font-medium">Direct farm-to-retail supply chain</span>
                </div>
                <div className="flex items-center gap-3 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm" />
                  <span className="text-sm font-medium">Temperature-controlled logistics</span>
                </div>
                <div className="flex items-center gap-3 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm" />
                  <span className="text-sm font-medium">AI-powered demand forecasting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-green-600/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-600/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;