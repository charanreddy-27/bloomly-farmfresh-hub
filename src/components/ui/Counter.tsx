import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({ 
  end, 
  start = 0, 
  duration = 1500, // Reduced from 2000ms to 1500ms for quicker animation
  suffix = '', 
  prefix = '',
  className = '' 
}) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startCountAnimation();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    // Backup trigger in case intersection observer doesn't work
    const backupTimer = setTimeout(() => {
      if (!hasAnimated) {
        setHasAnimated(true);
        startCountAnimation();
      }
    }, 500); // Reduced from 1000ms to 500ms for quicker backup trigger

    return () => {
      observer.disconnect();
      clearTimeout(backupTimer);
    };
  }, []);

  const startCountAnimation = () => {
    let startTime: number | null = null;
    const startValue = start;
    const endValue = end;
    const difference = endValue - startValue;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quicker easing for faster feel
      const easeOutCubic = 1 - Math.pow(1 - progress, 3); // Changed from easeOutQuart to easeOutCubic for quicker response
      const currentCount = Math.round(startValue + (difference * easeOutCubic));
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div 
      ref={counterRef} 
      className={`counter-container ${className}`}
    >
      <span className="font-bold tabular-nums tracking-tight">
        {`${prefix}${count.toLocaleString()}${suffix}`}
      </span>
    </div>
  );
};

export default Counter;
