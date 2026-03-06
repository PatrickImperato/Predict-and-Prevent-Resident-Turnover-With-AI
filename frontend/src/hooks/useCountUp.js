import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for smooth count-up animation
 * Triggers once when element enters viewport
 * @param {number} end - Final value to count to
 * @param {number} duration - Animation duration in ms (900-1200)
 * @param {string} suffix - Optional suffix like 'x' or '%'
 * @param {string} prefix - Optional prefix like '$'
 * @returns {[ref, displayValue]} - Ref to attach to element and current display value
 */
export function useCountUp(end, duration = 1000, suffix = '', prefix = '') {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const startTime = performance.now();
          const startValue = 0;
          
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease-out cubic curve for smooth deceleration
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            
            const currentValue = startValue + (end - startValue) * easeOutCubic;
            setCount(currentValue);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end); // Ensure final value is exact
            }
          };
          
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // Trigger when 30% visible
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  // Format the display value
  const formatValue = (value) => {
    if (value === 0 && !hasAnimated) return `${prefix}0${suffix}`;
    
    // Handle currency formatting
    if (prefix === '$') {
      return `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
    }
    
    // Handle decimal values (like 6.55x)
    if (end % 1 !== 0) {
      return `${prefix}${value.toFixed(2)}${suffix}`;
    }
    
    // Handle whole numbers
    return `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
  };

  return [elementRef, formatValue(count)];
}
