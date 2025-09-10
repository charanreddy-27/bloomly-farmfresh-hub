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
    const phoneNumber = '919876543210'; // Replace with actual WhatsApp number
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
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 
                   w-10 h-10 md:w-12 md:h-12 
                   bg-primary text-primary-foreground rounded-full 
                   shadow-lg hover:shadow-xl transition-all duration-300 
                   flex items-center justify-center group hover:scale-110 ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-1 transition-transform duration-200" />
      </button>

      {/* WhatsApp Floating Widget - improved mobile positioning */}
      {showWhatsApp && (
        <div className="fixed bottom-16 left-4 md:bottom-20 md:left-6 z-50 animate-fade-in-up">
          <div className="relative">
            {/* Close button - improved mobile sizing */}
            <button
              onClick={closeWhatsApp}
              className="absolute -top-1 -right-1 md:-top-2 md:-right-2 
                        w-5 h-5 md:w-6 md:h-6 
                        bg-red-500 text-white rounded-full 
                        flex items-center justify-center 
                        hover:bg-red-600 transition-colors z-10
                        touch-manipulation"
              aria-label="Close WhatsApp widget"
            >
              <X className="w-2.5 h-2.5 md:w-3 md:h-3" />
            </button>
            
            {/* WhatsApp Button - improved mobile sizing */}
            <button
              onClick={openWhatsApp}
              className="flex items-center gap-2 md:gap-3 
                        bg-green-500 hover:bg-green-600 text-white 
                        px-3 py-2 md:px-4 md:py-3 
                        rounded-full shadow-lg hover:shadow-xl 
                        transition-all duration-300 group relative hover:animate-none
                        touch-manipulation min-h-[44px]"
              style={{ 
                animation: 'gentle-float 3s ease-in-out infinite'
              }}
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
              <span className="font-medium text-xs md:text-sm whitespace-nowrap">Chat with us</span>
              
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
      )}
    </>
  );
};

export default InteractiveFeatures;
