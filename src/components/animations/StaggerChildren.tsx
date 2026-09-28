"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
  id?: string;
}

export function StaggerChildren({ 
  children, 
  staggerDelay = 0.1, 
  className = "",
  once = true,
  id
}: StaggerChildrenProps) {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-50px" }}
      className={className}
      id={id}
    >
      {/* 
        We map through children and wrap them in a motion.div if they aren't already.
        But Framer Motion automatically propagates variants to children if the children 
        have the same variant labels. For simplicity and robustness with custom components,
        we can wrap them here or rely on the user to apply the variants.
        In this case, we'll assume the children will accept the variants or we wrap them.
      */}
      {/* Usually better to apply the item variant directly on the children in a map, 
          but if children is a complex tree, the parent handles staggering.
          We will assume children are standard DOM nodes or we export the item variant.
      */}
      {children}
    </motion.div>
  );
}

// Export the item variant so it can be used on children
export const staggerItemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};
