"use client";

import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchCTAProps {
  isVisible: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export function SearchCTA({ isVisible, isLoading, onClick }: SearchCTAProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-6"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        disabled={isLoading}
        className={cn(
          "w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-bold transition-all shadow-md flex items-center justify-center gap-2 relative overflow-hidden group",
          isLoading ? "bg-indigo-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20"
        )}
      >
        {/* Subtle shine effect on hover */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
        
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader2 className="w-5 h-5 text-white" />
            </motion.div>
            <span>Finding services...</span>
          </>
        ) : (
          <>
            <span>Find Services</span>
            <motion.div
              className="ml-1"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </motion.div>
          </>
        )}
      </motion.button>
    </motion.div>
  );
}
