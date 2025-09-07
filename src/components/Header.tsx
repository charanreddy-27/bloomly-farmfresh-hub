import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/Bloomly-2.svg" 
              alt="Bloomly Logo" 
              className="h-12 md:h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <a 
              href="#solutions" 
              className="text-foreground hover:text-primary transition-colors font-medium text-sm lg:text-base relative group"
            >
              Solutions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#about" 
              className="text-foreground hover:text-primary transition-colors font-medium text-sm lg:text-base relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#contact" 
              className="text-foreground hover:text-primary transition-colors font-medium text-sm lg:text-base relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="btn-primary text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3">
              Get Started
            </button>
          </div>

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
              <a 
                href="#solutions" 
                className="text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium px-4 py-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </a>
              <a 
                href="#about" 
                className="text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium px-4 py-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-foreground hover:text-primary hover:bg-muted transition-all duration-200 font-medium px-4 py-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="px-4 pt-2">
                <button className="btn-primary w-full text-sm py-3">
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