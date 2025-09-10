import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleGetStarted = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (path: string, sectionId?: string) => {
    setIsMenuOpen(false);
    
    if (path.startsWith('/')) {
      navigate(path);
      // Scroll to top after navigation for route-based pages
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else if (sectionId) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleHomeClick = () => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 border-b z-50 shadow-sm transition-all duration-300 
                       bg-gradient-to-r from-white via-green-50/90 to-white backdrop-blur-sm border-border/20">
      <div className="container">
        {/* Main header bar with improved mobile layout */}
        <div className="flex items-center justify-between min-h-[3rem] md:min-h-[4rem]">
          {/* Logo - improved responsive sizing */}
          <div 
            className="flex items-center cursor-pointer flex-shrink-0" 
            onClick={() => navigate('/')}
          >
            <img 
              src="/Bloomly-2.svg" 
              alt="Bloomly Logo"
              className="h-7 w-auto md:h-9 object-contain hover:scale-105 transition-all duration-300 filter-none"
            />
          </div>

          {/* Desktop Navigation - elegant minimal animations */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            <button 
              onClick={handleHomeClick}
              className="transition-all duration-300 font-medium 
                         text-responsive-base relative group min-h-[2.25rem] px-3 py-2
                         inline-flex items-center justify-center
                         text-foreground hover:text-primary"
            >
              Home
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 
                             transition-all duration-300 group-hover:w-4/5 bg-primary"></span>
            </button>
            <button 
              onClick={() => handleNavClick('about', 'about')}
              className="transition-all duration-300 font-medium 
                         text-responsive-base relative group min-h-[2.25rem] px-3 py-2
                         inline-flex items-center justify-center
                         text-foreground hover:text-primary"
            >
              About
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 
                             transition-all duration-300 group-hover:w-4/5 bg-primary"></span>
            </button>
            <button 
              onClick={() => handleNavClick('contact', 'contact')}
              className="transition-all duration-300 font-medium 
                         text-responsive-base relative group min-h-[2.25rem] px-3 py-2
                         inline-flex items-center justify-center
                         text-foreground hover:text-primary"
            >
              Contact
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 
                             transition-all duration-300 group-hover:w-4/5 bg-primary"></span>
            </button>
            <button 
              onClick={() => handleNavClick('/careers')}
              className="transition-all duration-300 font-medium 
                         text-responsive-base relative group min-h-[2.25rem] px-3 py-2
                         inline-flex items-center justify-center
                         text-foreground hover:text-primary"
            >
              Careers
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 
                             transition-all duration-300 group-hover:w-4/5 bg-primary"></span>
            </button>
          </nav>

          {/* Mobile Menu Button - improved touch target */}
          <button
            onClick={toggleMenu}
            className="md:hidden rounded-lg transition-transform duration-150
                       min-h-[2.25rem] min-w-[2.25rem] inline-flex items-center justify-center
                       border border-transparent hover:border-border hover:bg-green-100/50 text-foreground
                       will-change-transform"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            style={{ transform: 'translateZ(0)' }} // Force hardware acceleration
          >
            <div className={`transition-transform duration-200 will-change-transform ${isMenuOpen ? 'rotate-90' : ''}`}>
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Navigation - elegant slide animations */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-white/98 backdrop-blur-sm
                          animation-slide-down">
            <nav className="py-3 space-y-1">
              <button 
                onClick={handleHomeClick}
                className="text-foreground hover:text-primary 
                          transition-all duration-300 font-medium 
                          text-responsive-base w-full text-left
                          min-h-[2.25rem] px-4 py-2 
                          inline-flex items-center will-change-transform
                          hover:pl-6 relative group"
                style={{ 
                  animationDelay: '0.05s',
                  transform: 'translateZ(0)' // Force hardware acceleration
                }}
              >
                Home
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 w-0 h-0.5 
                               transition-all duration-300 group-hover:w-2 bg-primary"></span>
              </button>
              <button 
                onClick={() => handleNavClick('about', 'about')}
                className="text-foreground hover:text-primary 
                          transition-all duration-300 font-medium 
                          text-responsive-base w-full text-left
                          min-h-[2.25rem] px-4 py-2 
                          inline-flex items-center will-change-transform
                          hover:pl-6 relative group"
                style={{ 
                  animationDelay: '0.1s',
                  transform: 'translateZ(0)' // Force hardware acceleration
                }}
              >
                About
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 w-0 h-0.5 
                               transition-all duration-300 group-hover:w-2 bg-primary"></span>
              </button>
              <button 
                onClick={() => handleNavClick('contact', 'contact')}
                className="text-foreground hover:text-primary 
                          transition-all duration-300 font-medium 
                          text-responsive-base w-full text-left
                          min-h-[2.25rem] px-4 py-2 
                          inline-flex items-center will-change-transform
                          hover:pl-6 relative group"
                style={{ 
                  animationDelay: '0.15s',
                  transform: 'translateZ(0)' // Force hardware acceleration
                }}
              >
                Contact
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 w-0 h-0.5 
                               transition-all duration-300 group-hover:w-2 bg-primary"></span>
              </button>
              <button 
                onClick={() => handleNavClick('/careers')}
                className="text-foreground hover:text-primary 
                          transition-all duration-300 font-medium 
                          text-responsive-base w-full text-left
                          min-h-[2.25rem] px-4 py-2 
                          inline-flex items-center will-change-transform
                          hover:pl-6 relative group"
                style={{ 
                  animationDelay: '0.2s',
                  transform: 'translateZ(0)' // Force hardware acceleration
                }}
              >
                Careers
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 w-0 h-0.5 
                               transition-all duration-300 group-hover:w-2 bg-primary"></span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;