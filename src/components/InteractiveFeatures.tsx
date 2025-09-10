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
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-200" />
      </button>

      {/* WhatsApp Floating Widget */}
      {showWhatsApp && (
        <div className="fixed bottom-20 left-6 z-50 animate-fade-in-up">
          <div className="relative">
            {/* Close button */}
            <button
              onClick={closeWhatsApp}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
              aria-label="Close WhatsApp widget"
            >
              <X className="w-3 h-3" />
            </button>
            
            {/* WhatsApp Button */}
            <button
              onClick={openWhatsApp}
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group animate-pulse hover:animate-none"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium text-sm">Chat with us</span>
            </button>
            
            {/* Pulse animation */}
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20 -z-10" />
          </div>
        </div>
      )}
    </>
  );
};

export default InteractiveFeatures;
