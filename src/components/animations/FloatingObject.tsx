"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingObjectProps {
  children?: ReactNode;
  yOffset?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export function FloatingObject({
  children,
  yOffset = 15,
  duration = 4,
  delay = 0,
  className = ""
}: FloatingObjectProps) {
  return (
    <motion.div
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
