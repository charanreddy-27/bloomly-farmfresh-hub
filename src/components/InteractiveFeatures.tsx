import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle, X } from 'lucide-react';

const InteractiveFeatures = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBackToTop(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openWhatsApp = () => {
    const phoneNumber = '917259536656'; // Replace with actual WhatsApp number
    const message = encodeURIComponent(
      'Hi Bloomly! I\'m interested in learning more about your fresh produce supply chain solutions.'
    );
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  const closeWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowWhatsApp(false);
  };

  return (
    <>
      {/* Back to Top Button - improved mobile sizing */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-3 right-3 md:bottom-6 md:right-6 z-50 
                   w-11 h-11 md:w-12 md:h-12 
                   bg-primary text-primary-foreground rounded-full 
                   shadow-lg hover:shadow-xl transition-all duration-300 
                   flex items-center justify-center group hover:scale-110 
                   touch-manipulation ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-1 transition-transform duration-200" />
      </button>

      {/* WhatsApp Floating Widget - Mobile with text that fits properly */}
      {showWhatsApp && (
        <>
          {/* Mobile Version - Properly sized with text */}
          <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
            <div className="relative max-w-[140px]">
              {/* Mobile WhatsApp Button - Compact with text */}
              <button
                onClick={openWhatsApp}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white 
                          px-2.5 py-2.5 rounded-full shadow-lg hover:shadow-xl 
                          transition-all duration-300 touch-manipulation
                          w-full h-10 text-xs font-medium justify-center"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-xs font-medium truncate">Chat with us</span>
              </button>
            </div>
          </div>

          {/* Desktop Version - Full Featured */}
          <div className="fixed bottom-20 left-6 z-50 animate-fade-in-up hidden md:block">
            <div className="relative">
              {/* Close button for desktop */}
              <button
                onClick={closeWhatsApp}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full 
                          flex items-center justify-center hover:bg-red-600 transition-colors z-10
                          touch-manipulation shadow-sm"
                aria-label="Close WhatsApp widget"
              >
                <X className="w-4 h-4" />
              </button>
              
              {/* Desktop WhatsApp Button */}
              <button
                onClick={openWhatsApp}
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white 
                          px-4 py-3 rounded-full shadow-lg hover:shadow-xl 
                          transition-all duration-300 group relative hover:animate-none
                          touch-manipulation min-h-[48px] text-base font-medium"
                style={{ 
                  animation: 'gentle-float 3s ease-in-out infinite'
                }}
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
                <span className="whitespace-nowrap">Chat with us</span>
                
                {/* Smooth breathing glow */}
                <div 
                  className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-green-500/20 rounded-full -z-10" 
                  style={{ 
                    animation: 'soft-glow 4s ease-in-out infinite alternate'
                  }}
                />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InteractiveFeatures;
