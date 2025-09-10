import { useEffect, useRef } from 'react';

const TrustedPartners = () => {
  const partners = [
    {
      name: "BigBasket",
      logo: "/BigBasket_Logo.webp",
      alt: "BigBasket Logo"
    },
    {
      name: "Zepto",
      logo: "/Logo_of_Zepto.png",
      alt: "Zepto Logo"
    },
    {
      name: "Swiggy",
      logo: "/Swiggy_Logo.webp",
      alt: "Swiggy Logo"
    },
    {
      name: "Reliance Fresh",
      logo: "/ril-fresh-logo.jpg",
      alt: "Reliance Fresh Logo"
    },
    {
      name: "STAR",
      logo: "/STAR_Logo.jpg",
      alt: "STAR Logo"
    },
    {
      name: "KPN Fresh",
      logo: "/KPN-Logo.svg",
      alt: "KPN Logo"
    },
    {
      name: "Superplum",
      logo: "/big-logo.png",
      alt: "Superplum Logo"
    },
{
      name: "More",
      logo: "/more.webp",
      alt: "More Logo"
    },
  ];

  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Duplicate partners for infinite scroll
    if (scrollerRef.current) {
      const scroller = scrollerRef.current;
      const scrollContent = scroller.querySelector('.scroller-inner');
      if (scrollContent) {
        const items = Array.from(scrollContent.children);
        items.forEach(item => {
          const duplicate = item.cloneNode(true);
          scrollContent.appendChild(duplicate);
        });
      }
    }
  }, []);

  const duplicatedPartners = [...partners, ...partners]; // For seamless infinite scroll

  return (
    <>
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .scroller {
            overflow: hidden;
            mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
            -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
          }

          .scroller-inner {
            display: flex;
            gap: 1rem;
            animation: slide 30s linear infinite;
            width: fit-content;
          }

          .scroller-inner:hover {
            animation-play-state: paused;
          }

          /* Mobile responsive gap */
          @media (min-width: 768px) {
            .scroller-inner {
              gap: 2rem;
            }
          }

          /* Disable animation for reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            .scroller-inner {
              animation: none;
            }
          }
        `}
      </style>

      <section className="section-padding bg-gradient-to-b from-background to-green-50/30 relative">
        <div className="container relative z-10">
          {/* Section Header - mobile-first responsive */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-foreground mb-4">
              Trusted by Leading{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Retailers
              </span>
            </h2>
            
            {/* Decorative line */}
            <div className="flex justify-center mt-4 mb-6 md:mb-8">
              <div className="w-24 h-1 md:w-32 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
            </div>
            
            <p className="text-responsive-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed
                          px-4 sm:px-6 md:px-0">
              Join the growing network of successful retailers who trust Bloomly for their fresh produce needs
            </p>
          </div>

          {/* Infinite Scrolling Carousel - mobile responsive */}
          <div className="scroller" ref={scrollerRef}>
            <div className="scroller-inner">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="bg-white rounded-xl shadow-lg border border-green-100 
                            hover:shadow-xl transition-shadow duration-300
                            flex items-center justify-center
                            min-w-[200px] h-20 p-4
                            sm:min-w-[240px] sm:h-24 sm:p-6
                            md:min-w-[280px] md:h-32 md:p-8"
                >
                  <img 
                    src={partner.logo}
                    alt={partner.alt}
                    className="h-auto object-contain
                              max-h-12 sm:max-h-16 md:max-h-20
                              max-w-[160px] sm:max-w-[200px] md:max-w-[220px]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustedPartners;
