/**
 * Motion utilities for HappyCo Concierge
 * Product-appropriate, subtle animations following design guidelines
 */

// Fade + upward reveal for section entries
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.25, 0.1, 0.25, 1], // Ease-out cubic
    },
  },
};

// Staggered children for lists/grids
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Card hover elevation (subtle)
export const cardHoverVariants = {
  initial: { y: 0 },
  hover: {
    y: -2,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

// Modal/dialog entrance
export const modalVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 8,
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 1, 1],
    },
  },
};

// Page transition (very subtle)
export const pageTransitionVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: "easeOut",
    },
  },
};

// Count-up animation hook
export const useCountUp = (end, duration = 1200, shouldAnimate = true) => {
  const [count, setCount] = React.useState(shouldAnimate ? 0 : end);
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    if (!shouldAnimate) {
      setCount(end);
      return;
    }

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, shouldAnimate]);

  return count;
};

// Respects prefers-reduced-motion
export const getMotionProps = (variants) => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {};
  }
  return variants;
};
