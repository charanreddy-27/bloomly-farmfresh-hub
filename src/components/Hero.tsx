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
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(40px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-25px) rotate(8deg) scale(1.05); }
          }

          @keyframes float-medium {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-20px) rotate(-5deg) scale(1.03); }
          }

          @keyframes float-fast {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-15px) rotate(3deg) scale(1.02); }
          }

          @keyframes glow-pulse {
            0%, 100% { 
              filter: brightness(1) saturate(1);
              text-shadow: 0 0 20px rgba(127, 193, 65, 0.4);
            }
            50% { 
              filter: brightness(1.2) saturate(1.3);
              text-shadow: 0 0 40px rgba(127, 193, 65, 0.8);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            opacity: 0;
          }

          .animate-float-slow {
            animation: float-slow 8s ease-in-out infinite;
          }

          .animate-float-medium {
            animation: float-medium 6s ease-in-out infinite;
            animation-delay: -3s;
          }

          .animate-float-fast {
            animation: float-fast 4s ease-in-out infinite;
            animation-delay: -2s;
          }

          .animate-glow-pulse {
            animation: glow-pulse 3s ease-in-out infinite;
          }

          /* Modern glass morphism effect */
          .glass-morphism {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
          }

          /* Enhanced shadow effects */
          .shadow-3xl {
            box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 
                        0 0 0 1px rgba(255, 255, 255, 0.05);
          }

          /* Disable animations for reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            .animate-fade-in-up,
            .animate-float-slow,
            .animate-float-medium,
            .animate-float-fast,
            .animate-glow-pulse {
              animation: none;
              opacity: 1;
              transform: none;
            }
          }
        `}
      </style>
    
    <section className="relative min-h-screen flex items-center overflow-hidden
                        pt-16 pb-8 md:pt-20 md:pb-12 lg:pt-24 lg:pb-16">
      {/* Background Image with improved mobile performance */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: 'url(/gemini_generated_image_6bhcgz6bhcgz6bhc-Yanq8xlZjkhx8B9D.avif)',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      
      {/* Multi-layer overlay for enhanced text readability and modern look */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-transparent to-green-900/20" />
      
      {/* Enhanced Decorative Elements - Modern Design */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Enhanced nature elements with better positioning */}
        <div className="absolute top-1/4 right-8 md:right-16 text-green-300/30 hover:text-green-300/50
                        text-4xl md:text-7xl lg:text-8xl transform rotate-12 animate-float-medium
                        transition-colors duration-300">🍃</div>
        <div className="absolute bottom-1/4 left-12 md:left-20 text-green-200/40 hover:text-green-200/60
                        text-3xl md:text-5xl lg:text-6xl transform -rotate-12 animate-float-fast
                        transition-colors duration-300">🌿</div>
        <div className="absolute top-1/3 left-1/3 text-green-400/20 hover:text-green-400/40
                        text-2xl md:text-4xl lg:text-5xl transform rotate-45 animate-float-slow
                        transition-colors duration-300" style={{ animationDelay: '-2s' }}>�</div>
      </div>

      {/* Main Content - Perfectly Centered Layout */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-screen">
            
            {/* Hero Text Layout - Properly Centered and Sized */}
            <div className="text-center w-full max-w-5xl mx-auto animate-fade-in-up" 
                 style={{ animationDelay: '0.2s' }}>
              
              {/* Main Headline - Optimized Size and Alignment */}
              <div className="mb-12 lg:mb-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                             font-bold text-white leading-[1.2] tracking-tight
                             drop-shadow-2xl text-center">
                  <span className="block mb-4 lg:mb-6">
                    <span className="inline">Transforming how</span>
                  </span>
                  <span className="block mb-4 lg:mb-6">
                    <span className="font-bold bg-gradient-to-r from-green-400 to-green-500 
                                   bg-clip-text text-transparent
                                   drop-shadow-[0_0_30px_rgba(127,193,65,0.6)]
                                   filter brightness-110">
                      farmers sell
                    </span>
                    <span className="text-white/95 mx-3 lg:mx-4">and</span>
                  </span>
                  <span className="block">
                    <span className="inline">how </span>
                    <span className="font-bold bg-gradient-to-r from-green-400 to-green-500 
                                   bg-clip-text text-transparent
                                   drop-shadow-[0_0_30px_rgba(127,193,65,0.6)]
                                   filter brightness-110">
                      businesses buy
                    </span>
                  </span>
                </h1>
              </div>

              {/* Supporting Description - Properly Sized */}
              <div className="mb-12 lg:mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="max-w-3xl mx-auto">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl
                               font-light leading-relaxed tracking-wide text-white/95
                               drop-shadow-xl text-center">
                    <span className="block mb-2">
                      — Bloomly is building a
                    </span>
                    <span className="font-semibold bg-gradient-to-r from-green-300 to-green-400 
                                   bg-clip-text text-transparent
                                   drop-shadow-[0_0_25px_rgba(110,190,67,0.6)]
                                   filter brightness-110">
                      supportive ecosystem
                    </span>
                    <span className="block mt-2">for both</span>
                  </p>
                </div>
              </div>

              {/* Feature Highlights - Balanced Size */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 animate-fade-in-up max-w-4xl mx-auto" 
                   style={{ animationDelay: '0.6s' }}>
                <div className="group flex items-center space-x-3 px-6 py-3 
                               bg-white/10 backdrop-blur-lg border border-white/20
                               rounded-xl hover:bg-white/20 hover:border-white/30
                               transition-all duration-500 shadow-2xl hover:shadow-3xl
                               hover:scale-105 transform hover:-translate-y-1">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500
                               shadow-[0_0_15px_rgba(127,193,65,0.6)] group-hover:shadow-[0_0_20px_rgba(127,193,65,0.8)]
                               transition-all duration-300"></div>
                  <span className="text-white font-medium text-sm md:text-base lg:text-lg 
                                 tracking-wide drop-shadow-lg">
                    Direct Farm Sourcing
                  </span>
                </div>
                
                <div className="group flex items-center space-x-3 px-6 py-3 
                               bg-white/10 backdrop-blur-lg border border-white/20
                               rounded-xl hover:bg-white/20 hover:border-white/30
                               transition-all duration-500 shadow-2xl hover:shadow-3xl
                               hover:scale-105 transform hover:-translate-y-1">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500
                               shadow-[0_0_15px_rgba(110,190,67,0.6)] group-hover:shadow-[0_0_20px_rgba(110,190,67,0.8)]
                               transition-all duration-300"></div>
                  <span className="text-white font-medium text-sm md:text-base lg:text-lg 
                                 tracking-wide drop-shadow-lg">
                    Quality Assurance
                  </span>
                </div>
                
                <div className="group flex items-center space-x-3 px-6 py-3 
                               bg-white/10 backdrop-blur-lg border border-white/20
                               rounded-xl hover:bg-white/20 hover:border-white/30
                               transition-all duration-500 shadow-2xl hover:shadow-3xl
                               hover:scale-105 transform hover:-translate-y-1">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500
                               shadow-[0_0_15px_rgba(127,193,65,0.6)] group-hover:shadow-[0_0_20px_rgba(127,193,65,0.8)]
                               transition-all duration-300"></div>
                  <span className="text-white font-medium text-sm md:text-base lg:text-lg 
                                 tracking-wide drop-shadow-lg">
                    Nationwide Network
                  </span>
                </div>
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