import { Leaf, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container">
        {/* Main Footer Content - compact responsive grid */}
        <div className="py-6 md:py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Company Info */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <img 
                src="/bloomlyfooter.png" 
                alt="Bloomly Logo" 
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm md:text-base">Company</h4>
            <ul className="space-y-1 text-primary-foreground/80">
              <li>
                <a href="#about" 
                   className="hover:text-primary-foreground transition-colors 
                             text-xs md:text-sm inline-flex items-center py-1">
                  About
                </a>
              </li>
              <li>
                <a href="#" 
                   className="hover:text-primary-foreground transition-colors 
                             text-xs md:text-sm inline-flex items-center py-1">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" 
                   className="hover:text-primary-foreground transition-colors 
                             text-xs md:text-sm inline-flex items-center py-1">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-sm md:text-base">Connect</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Mail className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="text-xs md:text-sm break-all">operations@bloomly.co.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="text-xs md:text-sm">+91 72595 36656</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="text-xs md:text-sm">Bangalore, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer - compact layout */}
        <div className="py-3 md:py-4 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-primary-foreground/80 text-xs text-center sm:text-left">
              © 2024 Bloomly. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4">
              <Link to="/privacy-policy" 
                 className="text-primary-foreground/80 hover:text-primary-foreground text-xs 
                           transition-colors text-center inline-flex items-center justify-center">
                Privacy Policy
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;