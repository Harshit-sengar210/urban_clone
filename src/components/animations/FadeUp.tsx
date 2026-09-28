"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
  once?: boolean;
}

export function FadeUp({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  className = "",
  yOffset = 30,
  once = true
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // premium ease out curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
