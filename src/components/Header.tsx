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
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/Bloomly-2.svg" 
              alt="Bloomly Logo"
              className="h-11 w-17 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <button 
              onClick={() => handleNavClick('solutions', 'solutions')}
              className="text-foreground hover:text-primary transition-colors font-medium text-sm lg:text-base relative group"
            >
              Solutions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => handleNavClick('about', 'about')}
              className="text-foreground hover:text-primary transition-colors font-medium text-sm lg:text-base relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => handleNavClick('contact', 'contact')}
              className="text-foreground hover:text-primary transition-colors font-medium text-sm lg:text-base relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/98 backdrop-blur-sm">
            <nav className="flex flex-col space-y-2">
              <button 
                onClick={() => handleNavClick('solutions')}
                className="text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium px-4 py-3 rounded-lg text-left"
              >
                Solutions
              </button>
              <button 
                onClick={() => handleNavClick('about', 'about')}
                className="text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium px-4 py-3 rounded-lg text-left"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('contact', 'contact')}
                className="text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium px-4 py-3 rounded-lg text-left"
              >
                Contact
              </button>
              <div className="px-4 pt-2">
                <button 
                  onClick={handleGetStarted}
                  className="btn-primary w-full text-sm py-3"
                >

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