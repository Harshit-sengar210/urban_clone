"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationStepProps {
  onValidLocation: (pincode: string) => void;
}

export function LocationStep({ onValidLocation }: LocationStepProps) {
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus on mount
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 6) {
      setPincode(val);
      setError("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (pincode.length !== 6) {
      setError("Please enter a valid 6-digit pincode.");
      // Add subtle shake effect by forcing a re-render or using a class
      const inputEl = inputRef.current;
      if (inputEl) {
        inputEl.classList.add("animate-shake");
        setTimeout(() => inputEl.classList.remove("animate-shake"), 500);
      }
      return;
    }
    
    // Valid pincode
    onValidLocation(pincode);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full"
    >
      <motion.label layout className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 block">
        Where do you need the service?
      </motion.label>
      
      <div className="relative group flex items-center">
        <div 
          className={cn(
            "absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none",
            isFocused ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-indigo-200" : "bg-white shadow-sm border border-slate-200"
          )}
        />
        
        <div className="relative pl-5 pr-3 py-4 flex items-center w-full z-10">
          <MapPin 
            className={cn(
              "w-5 h-5 shrink-0 transition-colors duration-300",
              isFocused ? "text-indigo-600" : "text-slate-400"
            )} 
          />
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={pincode}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your pincode (e.g. 201301)"
            className="w-full bg-transparent border-none outline-none px-4 text-base sm:text-lg font-medium text-slate-900 placeholder:text-slate-400"
          />
          
          <AnimatePresence>
            {pincode.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-sm font-medium mt-2 ml-1"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tailwind animation class needs to be defined in global css or here using arbitrary values, but standard shake is often handled by a custom utility. Let's add a style tag just for the shake if needed, or rely on normal error text. */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}} />
    </motion.div>
  );
}
