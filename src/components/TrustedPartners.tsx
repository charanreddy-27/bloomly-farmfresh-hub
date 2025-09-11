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
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto scroll functionality (mobile only)
  const startAutoScroll = () => {
    if (!scrollerRef.current || !isMobile || isDragging || isUserInteracting) return;
    
    const scroll = () => {
      if (!scrollerRef.current || isDragging || !isAutoScrolling || isUserInteracting) return;
      
      const scroller = scrollerRef.current;
      const currentScroll = scroller.scrollLeft;
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      
      // Smooth auto scroll to the right
      if (currentScroll >= maxScroll - 5) {
        // Reset to beginning when reaching end
        scroller.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Slower, smoother scrolling
        scroller.scrollBy({ left: 0.8, behavior: 'auto' });
      }
    };
    
    // Stop any existing interval first
    stopAutoScroll();
    autoScrollRef.current = setInterval(scroll, 40); // Slightly faster for better visibility
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const scheduleAutoScrollResume = (delay = 2000) => {
    // Clear any existing resume timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    
    resumeTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
      setIsAutoScrolling(true);
      startAutoScroll();
    }, delay);
  };

  // Mouse handlers for both desktop and mobile
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollerRef.current?.scrollLeft || 0);
    
    if (isMobile) {
      setIsUserInteracting(true);
      setIsAutoScrolling(false);
      stopAutoScroll();
      
      // Clear any pending resume timeout
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    }
    
    if (scrollerRef.current) {
      scrollerRef.current.style.cursor = 'grabbing';
    }
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollerRef.current) return;
    e.preventDefault();
    
    const x = e.pageX - (scrollerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    if (scrollerRef.current) {
      scrollerRef.current.style.cursor = 'grab';
    }
    
    if (isMobile) {
      // Schedule auto-scroll resume
      scheduleAutoScrollResume(2000);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    
    if (scrollerRef.current) {
      scrollerRef.current.style.cursor = 'grab';
    }
    
    if (isMobile) {
      // Schedule auto-scroll resume
      scheduleAutoScrollResume(1000);
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setIsUserInteracting(true);
    setIsAutoScrolling(false);
    stopAutoScroll();
    
    // Clear any pending resume timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return;
    // Schedule auto-scroll resume
    scheduleAutoScrollResume(3000); // Increased delay for touch
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Allow native touch scrolling - don't prevent default
    if (!isMobile) return;
    // Keep auto scroll stopped while user is actively scrolling
    setIsUserInteracting(true);
    setIsAutoScrolling(false);
    stopAutoScroll();
    
    // Clear any pending resume timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  // Mobile infinite scroll setup
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const scroller = scrollerRef.current;
    if (!scroller || !isMobile) return;

    // Handle scroll events to pause auto-scroll when user manually scrolls
    const handleScroll = () => {
      if (!isAutoScrolling || isUserInteracting) return; // Don't interfere if already paused or user is interacting
      
      setIsUserInteracting(true);
      setIsAutoScrolling(false);
      stopAutoScroll();
      
      // Schedule auto-scroll resume
      scheduleAutoScrollResume(2000);
    };

    scroller.addEventListener('scroll', handleScroll, { passive: true });

    // Set initial position and start auto-scroll
    setTimeout(() => {
      scroller.scrollLeft = 0;
      setIsAutoScrolling(true);
      startAutoScroll();
    }, 1000); // Increased delay for better initialization
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      scroller.removeEventListener('scroll', handleScroll);
      stopAutoScroll();
      // Clean up resume timeout
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [isMobile]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoScroll();
    };
  }, []);

  // Create appropriate duplication based on device - more copies for mobile
  const displayPartners = isMobile 
    ? [...partners, ...partners, ...partners, ...partners, ...partners] // 5 copies for mobile
    : [...partners, ...partners]; // 2 copies for desktop

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
            animation: slide 40s linear infinite;
          }

          .scroller-inner:hover,
          .scroller.dragging .scroller-inner {
            animation-play-state: paused;
          }

          /* Mobile optimizations */
          @media (max-width: 767px) {
            .scroller {
              mask: none;
              -webkit-mask: none;
              padding: 0 1rem;
              scroll-behavior: auto;
              -webkit-overflow-scrolling: touch;
              touch-action: pan-x;
              overscroll-behavior-x: contain;
            }
            
            .scroller-inner {
              animation: none;
              padding: 0;
              gap: 0.75rem;
            }
          }

          /* Desktop responsive gap */
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ scrollBehavior: isAutoScrolling ? 'auto' : 'smooth' }}
          >
            <div className="scroller-inner">
              {displayPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="bg-white rounded-xl shadow-lg border border-green-100 
                            hover:shadow-xl transition-shadow duration-300
                            flex items-center justify-center
                            min-w-[240px] h-24 p-5
                            sm:min-w-[240px] sm:h-24 sm:p-6
                            md:min-w-[280px] md:h-32 md:p-8"
                >
                  <img 
                    src={partner.logo}
                    alt={partner.alt}
                    className="h-auto object-contain
                              max-h-16 sm:max-h-16 md:max-h-20
                              max-w-[200px] sm:max-w-[200px] md:max-w-[220px]"
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
