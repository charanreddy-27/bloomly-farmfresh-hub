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
              
              {/* Complete Sentence Design - Unified Message */}
              <div className="mb-12 lg:mb-16">
                <div className="max-w-5xl mx-auto">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                               font-light text-white leading-[1.3] tracking-wide
                               drop-shadow-2xl text-center">
                    
                    {/* First part - Main action */}
                    <span className="block mb-2 lg:mb-3">
                      <span className="font-medium">Transforming how </span>
                      <span className="font-bold bg-gradient-to-r from-green-400 to-green-500 
                                     bg-clip-text text-transparent
                                     drop-shadow-[0_0_30px_rgba(127,193,65,0.7)]
                                     filter brightness-110">
                        farmers sell
                      </span>
                      <span className="font-medium"> and how </span>
                      <span className="font-bold bg-gradient-to-r from-green-400 to-green-500 
                                     bg-clip-text text-transparent
                                     drop-shadow-[0_0_30px_rgba(127,193,65,0.7)]
                                     filter brightness-110">
                        businesses buy
                      </span>
                    </span>
                    
                    {/* Subtle connecting element - reduced size and spacing */}
                    <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                                   font-extralight text-green-300/60 mb-1 lg:mb-2
                                   drop-shadow-lg">
                      ·
                    </span>
                    
                    {/* Supporting statement - closer spacing */}
                    <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl
                                   font-light leading-relaxed">
                      <span className="text-white/90">Bloomly is building a </span>
                      <span className="font-semibold bg-gradient-to-r from-green-300 to-green-400 
                                     bg-clip-text text-transparent
                                     drop-shadow-[0_0_25px_rgba(110,190,67,0.6)]
                                     filter brightness-110">
                        supportive ecosystem
                      </span>
                      <span className="text-white/90"> for both</span>
                    </span>
                  </h1>
                </div>
              </div>

              {/* Removed separate description section since it's now integrated */}

             
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;