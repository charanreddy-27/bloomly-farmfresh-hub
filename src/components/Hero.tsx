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
      {/* Green Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #F1F8E9 0%, #E8F5E9 50%, #C8E6C9 100%)',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      
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
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Fresh. Convenient.
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span 
                  className="bg-gradient-to-r from-green-600 via-green-500 to-green-700 bg-clip-text text-transparent"
                  style={{
                    background: 'linear-gradient(90deg, #2E7D32 0%, #4CAF50 50%, #2E7D32 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Reliable.
                </span>
              </span>
            </h1>
            
            {/* Hero Subheadline */}
            <p className="mb-8 text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Delivering premium fruits directly to your business—on time, every time.
              <span className="block mt-2 text-green-600 font-semibold text-base">
                Direct farm connections • Predictable supply • Quality guaranteed
              </span>
            </p>
            
            {/* Benefits List */}
            <div className="mb-8 flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full border border-green-200">
                    <IconComponent className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
            
            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <button 
                onClick={handlePartnerClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>PARTNER WITH US</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={handleLearnMoreClick}
                className="group px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-semibold text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5" />
                <span>LEARN MORE</span>
              </button>
            </div>
          </div>

          {/* Right Content - Visual/Stats */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">Trusted by Businesses</h3>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <Counter 
                    end={500} 
                    suffix="+" 
                    className="text-3xl font-bold text-green-600"
                  />
                  <div className="text-sm text-gray-600 mt-1">Retail Partners</div>
                </div>
                <div className="text-center">
                  <Counter 
                    end={50} 
                    suffix="+" 
                    className="text-3xl font-bold text-green-600"
                  />
                  <div className="text-sm text-gray-600 mt-1">Farm Partners</div>
                </div>
                <div className="text-center">
                  <Counter 
                    end={99} 
                    suffix="%" 
                    className="text-3xl font-bold text-green-600"
                  />
                  <div className="text-sm text-gray-600 mt-1">On-Time Delivery</div>
                </div>
              </div>

              {/* Quick Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Direct farm-to-retail supply chain</span>
                </div>
                <div className="flex items-center gap-3 text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Temperature-controlled logistics</span>
                </div>
                <div className="flex items-center gap-3 text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">AI-powered demand forecasting</span>
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