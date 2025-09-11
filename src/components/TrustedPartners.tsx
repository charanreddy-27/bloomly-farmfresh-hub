import { useEffect, useRef, useState } from 'react';

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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragThreshold] = useState(50); // Minimum drag distance to trigger snap

  // Calculate logo width including gap for snapping
  const getLogoWidth = () => {
    if (!scrollerRef.current) return 0;
    const containerWidth = scrollerRef.current.offsetWidth;
    const isMobile = window.innerWidth < 768;
    return isMobile ? 220 : 300; // Approximate logo width + gap
  };

  // Smooth scroll to specific logo index
  const scrollToIndex = (index: number) => {
    if (!scrollerRef.current) return;
    const logoWidth = getLogoWidth();
    const targetScroll = index * logoWidth;
    scrollerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Mouse drag functionality with snap-to-logo
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollerRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX);
    scrollerRef.current.style.cursor = 'grabbing';
    e.preventDefault(); // Prevent text selection
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollerRef.current) return;
    e.preventDefault();
    // Visual feedback during drag (optional - you can remove this if you want no movement during drag)
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 10) {
      scrollerRef.current.style.transform = `translateX(${deltaX * 0.1}px)`;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (scrollerRef.current) {
      scrollerRef.current.style.cursor = 'grab';
      scrollerRef.current.style.transform = 'translateX(0)'; // Reset transform
      
      const deltaX = e.clientX - startX;
      
      // Determine direction and snap to next/previous logo
      if (Math.abs(deltaX) > dragThreshold) {
        if (deltaX > 0) {
          // Dragged right - go to previous logo
          const newIndex = Math.max(0, currentIndex - 1);
          setCurrentIndex(newIndex);
          scrollToIndex(newIndex);
        } else {
          // Dragged left - go to next logo
          const maxIndex = partners.length - 1;
          const newIndex = Math.min(maxIndex, currentIndex + 1);
          setCurrentIndex(newIndex);
          scrollToIndex(newIndex);
        }
      }
    }
  };

  const handleMouseLeave = () => {
    if (isDragging && scrollerRef.current) {
      scrollerRef.current.style.transform = 'translateX(0)';
    }
    setIsDragging(false);
    if (scrollerRef.current) {
      scrollerRef.current.style.cursor = 'grab';
    }
  };

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
      scroller.style.cursor = 'grab';
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
            overflow-x: auto;
            overflow-y: hidden;
            cursor: grab;
            user-select: none;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* Internet Explorer 10+ */
            scroll-behavior: smooth;
            mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
            -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
            transition: transform 0.2s ease-out;
          }

          .scroller::-webkit-scrollbar {
            display: none; /* WebKit browsers */
          }

          .scroller.dragging {
            cursor: grabbing;
            scroll-behavior: auto;
          }

          .scroller-inner {
            display: flex;
            gap: 1rem;
            width: fit-content;
            padding: 0 1rem;
            animation: slide 30s linear infinite;
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .scroller-inner:hover,
          .scroller.dragging .scroller-inner {
            animation-play-state: paused;
          }

          /* Mobile responsive gap */
          @media (min-width: 768px) {
            .scroller-inner {
              gap: 2rem;
              padding: 0 2rem;
            }
          }

          /* Disable animation for reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            .scroller-inner {
              animation: none !important;
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

          {/* Draggable/Scrollable Carousel */}
          <div 
            className={`scroller ${isDragging ? 'dragging' : ''}`} 
            ref={scrollerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
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
