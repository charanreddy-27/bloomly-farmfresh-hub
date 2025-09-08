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
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }

          @keyframes float-medium {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-3deg); }
          }

          @keyframes float-fast {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            opacity: 0;
          }

          .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
          }

          .animate-float-medium {
            animation: float-medium 4s ease-in-out infinite;
            animation-delay: -2s;
          }

          .animate-float-fast {
            animation: float-fast 3s ease-in-out infinite;
            animation-delay: -1s;
          }

          /* Disable animations for reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            .animate-fade-in-up,
            .animate-float-slow,
            .animate-float-medium,
            .animate-float-fast {
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
      
      {/* Multi-layer overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
      
      {/* Decorative Elements - responsive positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 w-12 h-12 md:top-20 md:left-10 md:w-20 md:h-20 
                        bg-green-200/30 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-20 right-5 w-16 h-16 md:top-40 md:right-20 md:w-32 md:h-32 
                        bg-green-300/20 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 md:w-24 md:h-24 
                        bg-green-400/25 rounded-full blur-lg animate-float-fast" />
        
        {/* Responsive leaf decorations */}
        <div className="absolute top-1/4 right-5 md:right-10 text-green-300/20 
                        text-3xl md:text-6xl transform rotate-12">🍃</div>
        <div className="absolute bottom-1/4 left-8 md:left-16 text-green-200/30 
                        text-2xl md:text-4xl transform -rotate-12">🌿</div>
      </div>

      {/* Main Content with improved mobile layout */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content - improved mobile typography */}
          <div className="text-center lg:text-left">
            
            {/* Hero Headline with responsive Green Gradient Text */}
            <h1 className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="block font-bold leading-tight text-white drop-shadow-2xl
                              text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Fresh. Convenient.
              </span>
              <span className="block font-bold leading-tight
                              text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span 
                  className="drop-shadow-2xl font-extrabold"
                  style={{
                    color: '#7FC141',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(127, 193, 65, 0.3)'
                  }}
                >
                  Reliable.
                </span>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;