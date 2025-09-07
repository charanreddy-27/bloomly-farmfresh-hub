import { useEffect, useState } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
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

  return (
    <section className="relative pt-20 pb-16 md:pt-28 lg:pt-32 md:pb-24 min-h-screen flex items-center overflow-hidden">
      {/* Premium Gradient Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      {/* Secondary Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-600/20" />
      
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-shapes">
          <div className="shape absolute w-32 h-32 bg-white/5 rounded-full blur-xl animate-float-slow" style={{ top: '10%', left: '10%', animationDelay: '0s' }} />
          <div className="shape absolute w-24 h-24 bg-emerald-400/10 rounded-full blur-lg animate-float-medium" style={{ top: '20%', right: '15%', animationDelay: '2s' }} />
          <div className="shape absolute w-40 h-40 bg-blue-400/5 rounded-full blur-2xl animate-float-slow" style={{ bottom: '20%', left: '20%', animationDelay: '4s' }} />
          <div className="shape absolute w-20 h-20 bg-purple-400/10 rounded-full blur-md animate-float-fast" style={{ top: '60%', right: '25%', animationDelay: '1s' }} />
          <div className="shape absolute w-36 h-36 bg-white/3 rounded-full blur-xl animate-float-medium" style={{ bottom: '10%', right: '10%', animationDelay: '3s' }} />
        </div>
      </div>

      {/* Glassmorphism Content Container */}
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Premium Fresh Produce Platform</span>
          </div>
          
          {/* Hero Headline with Gradient Text */}
          <h1 className="mb-6 text-white animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="block">Fresh. Convenient.</span>
            <span className="block">
              <span className="gradient-text bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Reliable.
              </span>
            </span>
          </h1>
          
          {/* Hero Subheadline */}
          <p className="mb-12 text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Delivering premium fruits directly to your business—on time, every time. 
            <span className="block mt-2 text-emerald-300 font-semibold">
              3x higher margins. Zero waste. Predictable supply.
            </span>
          </p>
          
          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={handlePartnerClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px]"
            >
              <span>PARTNER WITH US</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </button>
            
            <button 
              onClick={handleLearnMoreClick}
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold text-lg rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-3 min-w-[200px]"
            >
              <Play className="w-5 h-5" />
              <span>LEARN MORE</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/60 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="text-center">
              <Counter 
                end={500} 
                suffix="+" 
                className="text-2xl font-bold text-white"
              />
              <div className="text-sm">Retail Partners</div>
            </div>
            <div className="text-center">
              <Counter 
                end={50} 
                suffix="+" 
                className="text-2xl font-bold text-white"
              />
              <div className="text-sm">Farm Partners</div>
            </div>
            <div className="text-center">
              <Counter 
                end={99} 
                suffix="%" 
                className="text-2xl font-bold text-white"
              />
              <div className="text-sm">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;