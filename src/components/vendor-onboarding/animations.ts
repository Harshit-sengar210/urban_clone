import { Variants } from "framer-motion";

export const onboardingPageVariants: Variants = {
  initial: {
    opacity: 0,
    x: 30,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: -30,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: 10, 
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export const shakeAnimation = {
  x: [0, -4, 4, -3, 3, 0],
  transition: { duration: 0.4 }
};

// NEW ANIMATIONS FOR STEP 03

export const expandCollapse: Variants = {
  hidden: { 
    opacity: 0, 
    height: 0,
    marginTop: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  visible: { 
    opacity: 1, 
    height: "auto",
    marginTop: 16, // Optional, can be overridden by class
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const previewTextChange: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } }
};

export const uploadEnter: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

export const chipEnter: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

export const summaryUpdate: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } }
};

export const scaleUp: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } }
};

// NEW ANIMATIONS FOR STEP 05

export const markerEnter: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: [0, 1.2, 1], 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } }
};

export const locationEnter: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

// NEW ANIMATIONS FOR STEP 06

export const modalEnter: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { opacity: 0, y: 20, scale: 0.96, transition: { duration: 0.2, ease: "easeIn" } }
};

export const imageEnter: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: "easeIn" } }
};

// NEW ANIMATIONS FOR STEP 07

export const floatAnimation: Variants = {
  initial: { y: 0 },
  animate: { 
    y: [-8, 8, -8],
    transition: { 
      duration: 6, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  }
};

export const pulseRing: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: [0.8, 1.2, 0.8],
    opacity: [0.2, 0.5, 0.2],
    transition: { 
      duration: 4, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  }
};
