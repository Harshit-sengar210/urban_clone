"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const RADIUS_OPTIONS = [3, 5, 10, 15, 20];

interface ServiceRadiusSliderProps {
  value: number;
  onChange: (radius: number) => void;
}

export function ServiceRadiusSlider({ value, onChange }: ServiceRadiusSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Find index of current value, default to middle if somehow missing
  const currentIndex = Math.max(0, RADIUS_OPTIONS.indexOf(value));
  const maxIndex = RADIUS_OPTIONS.length - 1;
  const percentage = (currentIndex / maxIndex) * 100;

  const updateFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = x / rect.width;
    
    // Snap to nearest option
    const closestIndex = Math.round(percent * maxIndex);
    const clampedIndex = Math.max(0, Math.min(closestIndex, maxIndex));
    
    onChange(RADIUS_OPTIONS[clampedIndex]);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateFromClientX(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updateFromClientX(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="w-full select-none py-6">
      <div 
        ref={containerRef}
        className="relative h-12 flex items-center cursor-pointer touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Track */}
        <div className="absolute left-0 right-0 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 inset-y-auto">
          {/* Active Track */}
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </div>

        {/* Stops */}
        {RADIUS_OPTIONS.map((opt, i) => {
          const isActive = i <= currentIndex;
          const posPercent = (i / maxIndex) * 100;
          return (
            <div 
              key={opt}
              className={cn(
                "absolute w-1.5 h-1.5 rounded-full -translate-x-1/2 transition-colors duration-300",
                isActive ? "bg-white" : "bg-slate-300"
              )}
              style={{ left: `${posPercent}%` }}
            />
          );
        })}

        {/* Thumb */}
        <motion.div
          className="absolute w-8 h-8 bg-white border-[3px] border-[var(--color-primary)] rounded-full shadow-md flex items-center justify-center -translate-x-1/2 -ml-0 z-10"
          animate={{ 
            left: `${percentage}%`,
            scale: isDragging ? 1.15 : 1
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="w-2.5 h-2.5 bg-[var(--color-primary)] rounded-full" />
        </motion.div>
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2 px-1">
        {RADIUS_OPTIONS.map((opt) => (
          <span 
            key={opt} 
            className={cn(
              "text-xs font-bold transition-colors duration-300 w-8 text-center",
              value === opt ? "text-[var(--color-primary)]" : "text-slate-400"
            )}
          >
            {opt}km
          </span>
        ))}
      </div>
    </div>
  );
}
