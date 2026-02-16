// Framer Motion Animation Variants for DataByte

// Container animation for staggered children
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Item animation for staggered lists
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Fade in animation
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};

// Slide up animation
export const slideUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

// Scale animation
export const scaleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Glitch effect animation
export const glitchVariants = {
  initial: { x: 0, y: 0 },
  animate: {
    x: [0, -2, 2, -2, 2, 0],
    y: [0, 2, -2, 2, -2, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
};

// Hover scale animation
export const hoverScaleVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Card hover with glow effect
export const cardHoverVariants = {
  rest: {
    scale: 1,
    boxShadow: '0 0 0 rgba(0, 240, 255, 0)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

// Scan line animation
export const scanLineVariants = {
  initial: { top: '0%', opacity: 0 },
  animate: {
    top: '100%',
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 2,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

// Float animation
export const floatVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

// Rotate animation (for loader)
export const rotateVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

// Page transition variants
export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
    },
  },
};

// Matrix rain effect animation
export const matrixRainVariants = {
  animate: (i) => ({
    y: ['0vh', '100vh'],
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 3 + i * 0.5,
      ease: 'linear',
      repeat: Infinity,
      delay: i * 0.2,
    },
  }),
};

// Pulse glow animation
export const pulseGlowVariants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(0, 240, 255, 0.5)',
      '0 0 40px rgba(0, 240, 255, 0.8)',
      '0 0 20px rgba(0, 240, 255, 0.5)',
    ],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

// Text reveal animation (character by character)
export const textRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
};

// Bounding box corner animation
export const boundingBoxVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Terminal cursor blink
export const cursorBlinkVariants = {
  animate: {
    opacity: [1, 0, 1],
    transition: {
      duration: 1,
      ease: 'steps(2)',
      repeat: Infinity,
    },
  },
};

// Skill radar chart animation
export const radarChartVariants = {
  hidden: { scale: 0, opacity: 0, rotate: -180 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// Modal overlay animation
export const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Modal content animation
export const modalContentVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
    y: 50,
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.3,
    },
  },
};

// Stagger animation utility
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Custom spring animation
export const springTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
};

// Ease out transition
export const easeOutTransition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
};

export default {
  containerVariants,
  itemVariants,
  fadeInVariants,
  slideUpVariants,
  scaleVariants,
  glitchVariants,
  hoverScaleVariants,
  cardHoverVariants,
  scanLineVariants,
  floatVariants,
  rotateVariants,
  pageTransitionVariants,
  matrixRainVariants,
  pulseGlowVariants,
  textRevealVariants,
  boundingBoxVariants,
  cursorBlinkVariants,
  radarChartVariants,
  modalOverlayVariants,
  modalContentVariants,
  staggerContainer,
  springTransition,
  easeOutTransition,
};
