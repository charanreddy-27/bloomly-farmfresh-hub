import { useEffect, useState } from 'react';
import { CheckCircle, TrendingUp, Leaf } from 'lucide-react';
import Counter from './ui/Counter';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const benefits = [
    { icon: TrendingUp, text: "3x Higher Margins" },
    { icon: Leaf, text: "Zero Waste Guarantee" },
    { icon: CheckCircle, text: "99% On-Time Delivery" }
  ];

  return (
    <>
      <style>
        {`
          /* Enhanced fade-in and slide-up animations */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(60px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(80px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes floatGentle {
            0%, 100% { 
              transform: translateY(0px);
            }
            50% { 
              transform: translateY(-10px);
            }
          }

          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes glowPulse {
            0%, 100% {
              box-shadow: 
                0 0 20px rgba(34, 197, 94, 0.3),
                0 0 40px rgba(34, 197, 94, 0.1),
                inset 0 0 20px rgba(255, 255, 255, 0.1);
            }
            50% {
              box-shadow: 
                0 0 30px rgba(34, 197, 94, 0.5),
                0 0 60px rgba(34, 197, 94, 0.2),
                inset 0 0 30px rgba(255, 255, 255, 0.15);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            opacity: 0;
          }

          .animate-slide-in-up {
            animation: slideInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            opacity: 0;
          }

          .animate-float-gentle {
            animation: floatGentle 3s ease-in-out infinite;
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
          }

          .animate-glow-pulse {
            animation: glowPulse 2s ease-in-out infinite;
          }

          /* Enhanced glassmorphism */
          .glass-morphism {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 
              0 8px 32px rgba(0, 0, 0, 0.3),
              inset 0 1px 1px rgba(255, 255, 255, 0.2);
          }

          .glass-morphism-hover {
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 
              0 12px 40px rgba(0, 0, 0, 0.4),
              inset 0 1px 1px rgba(255, 255, 255, 0.3);
          }

          /* Text gradient effects */
          .text-gradient-green {
            background: linear-gradient(135deg, #22c55e, #16a34a, #15803d);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.5));
          }

          .text-gradient-green-light {
            background: linear-gradient(135deg, #4ade80, #22c55e, #16a34a);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 0 15px rgba(74, 222, 128, 0.4));
          }

          /* Improved mobile typography */
          @media (max-width: 640px) {
            .hero-title {
              font-size: clamp(1.75rem, 8vw, 2.5rem);
              line-height: 1.2;
            }
            
            .hero-subtitle {
              font-size: clamp(1.25rem, 6vw, 1.75rem);
              line-height: 1.3;
            }
          }

          @media (min-width: 641px) and (max-width: 768px) {
            .hero-title {
              font-size: clamp(2.5rem, 6vw, 3.5rem);
              line-height: 1.25;
            }
            
            .hero-subtitle {
              font-size: clamp(1.75rem, 4vw, 2.25rem);
              line-height: 1.3;
            }
          }

          @media (min-width: 769px) {
            .hero-title {
              font-size: clamp(3.5rem, 5vw, 5rem);
              line-height: 1.3;
            }
            
            .hero-subtitle {
              font-size: clamp(2.25rem, 3vw, 3rem);
              line-height: 1.35;
            }
          }

          /* Disable animations for reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            .animate-fade-in-up,
            .animate-slide-in-up,
            .animate-float-gentle,
            .animate-gradient,
            .animate-glow-pulse {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}
      </style>
    
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Enhanced Background Image with parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform scale-110"
        style={{
          backgroundImage: 'url(/gemini_generated_image_6bhcgz6bhcgz6bhc-Yanq8xlZjkhx8B9D.avif)',
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />
      
      {/* Enhanced Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-transparent to-green-900/30" />
      
      {/* Subtle Pattern Overlay for Texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_transparent_70%)]" />
      
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-8 md:right-16 text-green-300/20 
                        text-3xl md:text-6xl lg:text-7xl transform rotate-12 animate-float-gentle">🍃</div>
        <div className="absolute bottom-1/4 left-8 md:left-16 text-green-200/25 
                        text-2xl md:text-4xl lg:text-5xl transform -rotate-12 animate-float-gentle" 
                        style={{ animationDelay: '1s' }}>🌿</div>
        <div className="absolute top-1/3 left-1/3 text-green-400/15 
                        text-xl md:text-3xl lg:text-4xl transform rotate-45 animate-float-gentle" 
                        style={{ animationDelay: '2s' }}>🌱</div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            
            {/* Hero Title with Enhanced Typography */}
            <div className="mb-8 md:mb-12 lg:mb-16 animate-fade-in-up" 
                 style={{ animationDelay: '0.2s' }}>
              <h1 className="hero-title font-bold text-white leading-tight tracking-tight mb-4 md:mb-6">
                <span className="block mb-2 md:mb-3">
                  <span className="font-semibold">Transforming how </span>
                  <span className="text-gradient-green animate-gradient font-bold">
                    farmers sell
                  </span>
                </span>
                <span className="block mb-2 md:mb-3">
                  <span className="font-semibold">and how </span>
                  <span className="text-gradient-green animate-gradient font-bold">
                    businesses buy
                  </span>
                </span>
              </h1>
              
              <div className="hero-subtitle font-medium text-white/90 leading-relaxed max-w-4xl mx-auto">
                <span className="block">
                  Bloomly is building a{' '}
                  <span className="text-gradient-green-light animate-gradient font-semibold">
                    supportive ecosystem
                  </span>
                  {' '}for both
                </span>
              </div>
            </div>

            {/* Enhanced Feature Boxes with Glassmorphism */}
            <div className="w-full max-w-5xl mx-auto animate-slide-in-up" 
                 style={{ animationDelay: '0.6s' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4 md:px-0">
                
                {/* Direct Farm Sourcing */}
                <div className="group glass-morphism hover:glass-morphism-hover
                               rounded-2xl p-6 md:p-8 transition-all duration-500 ease-out
                               hover:scale-105 hover:-translate-y-2 cursor-pointer
                               animate-glow-pulse">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full 
                                   bg-gradient-to-br from-green-400 to-green-600
                                   flex items-center justify-center
                                   shadow-[0_0_30px_rgba(34,197,94,0.4)]
                                   group-hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]
                                   transition-all duration-500">
                      <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      Direct Farm Sourcing
                    </h3>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      Connect directly with verified farmers for the freshest produce
                    </p>
                  </div>
                </div>

                {/* Quality Assurance */}
                <div className="group glass-morphism hover:glass-morphism-hover
                               rounded-2xl p-6 md:p-8 transition-all duration-500 ease-out
                               hover:scale-105 hover:-translate-y-2 cursor-pointer
                               animate-glow-pulse" style={{ animationDelay: '0.2s' }}>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full 
                                   bg-gradient-to-br from-green-400 to-green-600
                                   flex items-center justify-center
                                   shadow-[0_0_30px_rgba(34,197,94,0.4)]
                                   group-hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]
                                   transition-all duration-500">
                      <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      Quality Assurance
                    </h3>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      Rigorous quality checks ensure premium produce standards
                    </p>
                  </div>
                </div>

                {/* Nationwide Network */}
                <div className="group glass-morphism hover:glass-morphism-hover
                               rounded-2xl p-6 md:p-8 transition-all duration-500 ease-out
                               hover:scale-105 hover:-translate-y-2 cursor-pointer
                               animate-glow-pulse" style={{ animationDelay: '0.4s' }}>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full 
                                   bg-gradient-to-br from-green-400 to-green-600
                                   flex items-center justify-center
                                   shadow-[0_0_30px_rgba(34,197,94,0.4)]
                                   group-hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]
                                   transition-all duration-500">
                      <Leaf className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      Nationwide Network
                    </h3>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      Extensive reach connecting farms across the country
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action - Optional Enhancement */}
            <div className="mt-12 md:mt-16 animate-fade-in-up" 
                 style={{ animationDelay: '1s' }}>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 
                                 hover:from-green-600 hover:to-green-700
                                 text-white font-semibold rounded-xl
                                 shadow-[0_0_30px_rgba(34,197,94,0.3)]
                                 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)]
                                 transition-all duration-300 hover:scale-105
                                 text-sm md:text-base">
                  Get Started Today
                </button>
                <button className="px-8 py-4 glass-morphism hover:glass-morphism-hover
                                 text-white font-semibold rounded-xl
                                 transition-all duration-300 hover:scale-105
                                 text-sm md:text-base">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;
