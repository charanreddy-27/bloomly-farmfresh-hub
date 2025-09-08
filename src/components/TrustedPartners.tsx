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
    }
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
            gap: 2rem;
            animation: slide 30s linear infinite;
            width: fit-content;
          }

          .scroller-inner:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <section className="section-padding bg-gradient-to-b from-background to-green-50/30 relative">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Trusted by Leading <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Retailers</span>
            </h2>
            
            <div className="flex justify-center mt-4 mb-8">
              <div className="w-32 h-1 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join the growing network of successful retailers who trust Bloomly for their fresh produce needs
            </p>
          </div>

          {/* Infinite Scrolling Carousel */}
          <div className="scroller" ref={scrollerRef}>
            <div className="scroller-inner">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="bg-white rounded-xl p-8 shadow-lg border border-green-100 min-w-[280px] h-32 flex items-center justify-center hover:shadow-xl transition-shadow duration-300"
                >
                  <img 
                    src={partner.logo}
                    alt={partner.alt}
                    className="max-h-20 max-w-[220px] object-contain"
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
