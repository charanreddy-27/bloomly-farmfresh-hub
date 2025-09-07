import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container">
        <div className="flex items-center justify-between h-24 md:h-28">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/Bloomly-2.svg" 
              alt="Bloomly Logo" 
              className="h-16 md:h-20 lg:h-24 w-auto object-contain max-w-none hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#solutions" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Solutions
            </a>
            <a 
              href="#about" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="btn-accent">
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
          <div className="md:hidden py-4 border-t border-border bg-background">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#solutions" 
                className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </a>
              <a 
                href="#about" 
                className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-foreground hover:text-primary transition-colors font-medium px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="px-4 pt-4">
                <button className="btn-accent w-full">
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