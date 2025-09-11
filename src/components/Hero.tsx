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

          /* Improved mobile-first typography */
          .hero-title {
            font-size: clamp(1.75rem, 5vw, 3.5rem);
            font-weight: 700;
            line-height: 1.1;
            letter-spacing: -0.02em;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          }
          
          .hero-subtitle {
            font-size: clamp(1.125rem, 3vw, 1.875rem);
            font-weight: 500;
            line-height: 1.3;
            letter-spacing: -0.01em;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          }

          /* Mobile-optimized responsive breakpoints */
          @media (max-width: 640px) {
            .hero-title {
              font-size: 1.5rem;
              line-height: 1.2;
              margin-bottom: 0.75rem;
            }
            
            .hero-subtitle {
              font-size: 1rem;
              line-height: 1.4;
            }
          }

          @media (min-width: 641px) and (max-width: 768px) {
            .hero-title {
              font-size: 1.875rem;
              line-height: 1.2;
            }
            
            .hero-subtitle {
              font-size: 1.125rem;
              line-height: 1.35;
            }
          }

          @media (min-width: 769px) and (max-width: 1024px) {
            .hero-title {
              font-size: 2.75rem;
              line-height: 1.15;
            }
            
            .hero-subtitle {
              font-size: 1.625rem;
              line-height: 1.25;
            }
          }

          @media (min-width: 1025px) {
            .hero-title {
              font-size: 3.5rem;
              line-height: 1.1;
            }
            
            .hero-subtitle {
              font-size: 1.875rem;
              line-height: 1.25;
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
      
      {/* Floating Decorative Elements - Removed */}

      {/* Main Content Container */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] text-center">{/* Hero Title with Mobile-Optimized Typography */}
            <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12 animate-fade-in-up max-w-5xl mx-auto" 
                 style={{ animationDelay: '0.2s' }}>
              <h1 className="hero-title text-white leading-tight tracking-tight mb-2 sm:mb-3 md:mb-4 lg:mb-6 px-1">
                <span className="block mb-1 sm:mb-2">
                  <span className="font-bold">Transforming how </span>
                  <span className="text-gradient-green animate-gradient font-bold">
                    farmers sell Fruits
                  </span>
                </span>
                <span className="block mb-1 sm:mb-2">
                  <span className="font-bold">and how </span>
                  <span className="text-gradient-green animate-gradient font-bold">
                    businesses buy
                  </span>
                </span>
              </h1>
              
              <div className="hero-subtitle text-white/90 leading-relaxed max-w-3xl mx-auto px-1">
                <span className="block">
                  Bloomly is building a{' '}
                  <span className="text-gradient-green-light animate-gradient font-semibold">
                    supportive ecosystem
                  </span>
                  {' '}for both
                </span>
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
