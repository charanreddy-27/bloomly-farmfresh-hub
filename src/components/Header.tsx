import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Change background after 50px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`fixed top-0 left-0 right-0 border-b z-50 shadow-sm transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm border-border' 
        : 'bg-transparent border-transparent'
    }`}>
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
              className={`h-8 w-auto md:h-11 object-contain hover:scale-105 transition-all duration-300 ${
                isScrolled ? 'filter-none' : 'brightness-0 invert'
              }`}
            />
          </div>

          {/* Desktop Navigation - improved spacing and typography */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-12">
            <button 
              onClick={() => handleNavClick('solutions', 'solutions')}
              className={`transition-colors font-medium 
                         text-responsive-base relative group min-h-[2.75rem] px-3 py-2
                         inline-flex items-center justify-center rounded-md
                         hover:bg-muted/50 ${
                           isScrolled 
                             ? 'text-foreground hover:text-primary' 
                             : 'text-white hover:text-green-300'
                         }`}
            >
              Home
              <span className={`absolute bottom-1 left-3 right-3 h-0.5 
                             scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                               isScrolled ? 'bg-primary' : 'bg-green-300'
                             }`}></span>
            </button>
            <button 
              onClick={() => handleNavClick('about', 'about')}
              className={`transition-colors font-medium 
                         text-responsive-base relative group min-h-[2.75rem] px-3 py-2
                         inline-flex items-center justify-center rounded-md
                         hover:bg-muted/50 ${
                           isScrolled 
                             ? 'text-foreground hover:text-primary' 
                             : 'text-white hover:text-green-300'
                         }`}
            >
              About
              <span className={`absolute bottom-1 left-3 right-3 h-0.5 
                             scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                               isScrolled ? 'bg-primary' : 'bg-green-300'
                             }`}></span>
            </button>
            <button 
              onClick={() => handleNavClick('contact', 'contact')}
              className={`transition-colors font-medium 
                         text-responsive-base relative group min-h-[2.75rem] px-3 py-2
                         inline-flex items-center justify-center rounded-md
                         hover:bg-muted/50 ${
                           isScrolled 
                             ? 'text-foreground hover:text-primary' 
                             : 'text-white hover:text-green-300'
                         }`}
            >
              Contact
              <span className={`absolute bottom-1 left-3 right-3 h-0.5 
                             scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                               isScrolled ? 'bg-primary' : 'bg-green-300'
                             }`}></span>
            </button>
          </nav>

          {/* Mobile Menu Button - improved touch target */}
          <button
            onClick={toggleMenu}
            className={`md:hidden rounded-lg transition-colors
                       min-h-[2.75rem] min-w-[2.75rem] inline-flex items-center justify-center
                       border border-transparent hover:border-border ${
                         isScrolled 
                           ? 'hover:bg-muted text-foreground' 
                           : 'hover:bg-white/10 text-white'
                       }`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - improved layout and touch targets */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-white/98 backdrop-blur-sm
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