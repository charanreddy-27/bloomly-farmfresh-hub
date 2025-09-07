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
      {/* Logo SVG with two-leaf design */}
      <svg 
        className={`${sizeClasses[size]} w-auto`}
        viewBox="0 0 80 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="lightLeafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8BC34A" />
            <stop offset="100%" stopColor="#7CB342" />
          </linearGradient>
          <linearGradient id="darkLeafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E7D32" />
            <stop offset="100%" stopColor="#1B5E20" />
          </linearGradient>
          <filter id="leafShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Left Leaf - Light Green */}
        <path 
          d="M15 45 C15 35, 20 25, 30 20 C35 15, 40 15, 45 20 C40 25, 35 35, 30 40 C25 45, 20 45, 15 45 Z" 
          fill="url(#lightLeafGradient)" 
          filter="url(#leafShadow)"
          className="drop-shadow-lg"
        />
        
        {/* Right Leaf - Dark Green */}
        <path 
          d="M35 45 C35 35, 40 25, 50 20 C55 15, 60 15, 65 20 C60 25, 55 35, 50 40 C45 45, 40 45, 35 45 Z" 
          fill="url(#darkLeafGradient)" 
          filter="url(#leafShadow)"
          className="drop-shadow-lg"
        />
        
        {/* Leaf Veins for Detail */}
        <path 
          d="M30 20 L25 35 M35 25 L30 32" 
          stroke="#7CB342" 
          strokeWidth="1" 
          opacity="0.6"
        />
        <path 
          d="M50 20 L45 35 M55 25 L50 32" 
          stroke="#1B5E20" 
          strokeWidth="1" 
          opacity="0.6"
        />
      </svg>
      
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
