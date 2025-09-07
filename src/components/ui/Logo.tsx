import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showText = true, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20'
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Bloomly-2.svg Logo */}
      <img 
        src="/Bloomly-2.svg" 
        alt="Bloomly Logo"
        className={`${sizeClasses[size]} w-auto`}
      />
      
      {/* Logo Text with Split Coloring */}
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} tracking-tight`}>
          <span 
            className="text-[#2E7D32]"
            style={{ fontFamily: 'Nunito, Quicksand, system-ui, sans-serif' }}
          >
            Blo
          </span>
          <span 
            className="text-[#8BC34A]"
            style={{ fontFamily: 'Nunito, Quicksand, system-ui, sans-serif' }}
          >
            o
          </span>
          <span 
            className="text-[#2E7D32]"
            style={{ fontFamily: 'Nunito, Quicksand, system-ui, sans-serif' }}
          >
            mly
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
