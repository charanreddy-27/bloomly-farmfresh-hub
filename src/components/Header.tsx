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

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-sm">
      <div className="container">
        {/* Main header bar with improved mobile layout */}
        <div className="flex items-center justify-between min-h-[3.5rem] md:min-h-[5rem]">
          {/* Logo - improved responsive sizing */}
          <div 
            className="flex items-center cursor-pointer flex-shrink-0" 
            onClick={() => navigate('/')}
          >
            <img 
              src="/Bloomly-2.svg" 
              alt="Bloomly Logo"
              className="h-8 w-auto md:h-11 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Desktop Navigation - improved spacing and typography */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-12">
            <button 
              onClick={() => handleNavClick('solutions', 'solutions')}
              className="text-foreground hover:text-primary transition-colors font-medium 
                         text-responsive-base relative group min-h-[2.75rem] px-3 py-2
                         inline-flex items-center justify-center rounded-md
                         hover:bg-muted/50"
            >
              Home
              <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-primary 
                             scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>
            <button 
              onClick={() => handleNavClick('about', 'about')}
              className="text-foreground hover:text-primary transition-colors font-medium 
                         text-responsive-base relative group min-h-[2.75rem] px-3 py-2
                         inline-flex items-center justify-center rounded-md
                         hover:bg-muted/50"
            >
              About
              <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-primary 
                             scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>
            <button 
              onClick={() => handleNavClick('contact', 'contact')}
              className="text-foreground hover:text-primary transition-colors font-medium 
                         text-responsive-base relative group min-h-[2.75rem] px-3 py-2
                         inline-flex items-center justify-center rounded-md
                         hover:bg-muted/50"
            >
              Contact
              <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-primary 
                             scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>
          </nav>

          {/* Mobile Menu Button - improved touch target */}
          <button
            onClick={toggleMenu}
            className="md:hidden rounded-lg hover:bg-muted transition-colors
                       min-h-[2.75rem] min-w-[2.75rem] inline-flex items-center justify-center
                       border border-transparent hover:border-border"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - improved layout and touch targets */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-sm
                          animation-slide-down">
            <nav className="py-4 space-y-2">
              <button 
                onClick={() => handleNavClick('solutions')}
                className="text-foreground hover:text-primary hover:bg-muted 
                          transition-all duration-200 font-medium 
                          text-responsive-base w-full text-left
                          min-h-[2.75rem] px-4 py-3 rounded-lg
                          inline-flex items-center"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('about', 'about')}
                className="text-foreground hover:text-primary hover:bg-muted 
                          transition-all duration-200 font-medium 
                          text-responsive-base w-full text-left
                          min-h-[2.75rem] px-4 py-3 rounded-lg
                          inline-flex items-center"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('contact', 'contact')}
                className="text-foreground hover:text-primary hover:bg-muted 
                          transition-all duration-200 font-medium 
                          text-responsive-base w-full text-left
                          min-h-[2.75rem] px-4 py-3 rounded-lg
                          inline-flex items-center"
              >
                Contact
              </button>
              
              {/* CTA Button for mobile - properly sized and spaced */}
              <div className="pt-4 px-4">
                <button 
                  onClick={handleGetStarted}
                  className="btn-primary w-full min-h-[2.75rem] text-responsive-base"
                >
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;