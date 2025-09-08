import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container">
        {/* Main Footer Content - responsive grid */}
        <div className="py-8 md:py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <img 
                src="/Bloomly-2.svg" 
                alt="Bloomly Logo" 
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
            <p className="text-primary-foreground/80 text-sm md:text-base leading-relaxed">
              Connecting farms directly with retailers for fresh, reliable produce delivery.
            </p>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base md:text-lg">Solutions</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#" 
                   className="hover:text-primary-foreground transition-colors 
                             text-sm md:text-base inline-flex items-center
                             min-h-[2.75rem] py-1">
                  Fresh Produce
                </a>
              </li>
              <li>
                <a href="#" 
                   className="hover:text-primary-foreground transition-colors 
                             text-sm md:text-base inline-flex items-center
                             min-h-[2.75rem] py-1">
                  Distribution
                </a>
              </li>
              <li>
                <a href="#" 
                   className="hover:text-primary-foreground transition-colors 
                             text-sm md:text-base inline-flex items-center
                             min-h-[2.75rem] py-1">
                  Supply Chain
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base md:text-lg">Company</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#about" 
                   className="hover:text-primary-foreground transition-colors 
                             text-sm md:text-base inline-flex items-center
                             min-h-[2.75rem] py-1">
                  About
                </a>
              </li>
              <li>
                <a href="#" 
                   className="hover:text-primary-foreground transition-colors 
                             text-sm md:text-base inline-flex items-center
                             min-h-[2.75rem] py-1">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" 
                   className="hover:text-primary-foreground transition-colors 
                             text-sm md:text-base inline-flex items-center
                             min-h-[2.75rem] py-1">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-base md:text-lg">Connect</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center space-x-3 min-h-[2.75rem]">
                <Mail className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="text-sm md:text-base break-all">hello@bloomly.co.in</span>
              </div>
              <div className="flex items-center space-x-3 min-h-[2.75rem]">
                <Phone className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="text-sm md:text-base">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 min-h-[2.75rem]">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="text-sm md:text-base">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer - responsive layout */}
        <div className="py-4 md:py-6 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/80 text-sm text-center sm:text-left">
              © 2024 Bloomly. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
              <a href="#" 
                 className="text-primary-foreground/80 hover:text-primary-foreground text-sm 
                           transition-colors text-center min-h-[2.75rem] inline-flex items-center justify-center">
                Privacy Policy
              </a>
              <a href="#" 
                 className="text-primary-foreground/80 hover:text-primary-foreground text-sm 
                           transition-colors text-center min-h-[2.75rem] inline-flex items-center justify-center">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;