"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPLASH_ENABLED = true;
const SHOW_SPLASH_ON_EVERY_REFRESH = true; // as requested

export function UrbanCloneSplash({ onComplete }: { onComplete: () => void }) {
  const [shouldShow, setShouldShow] = useState(false);
  const [stage, setStage] = useState<"initial" | "brandReveal" | "brandHold" | "panelExit" | "complete">("initial");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (!SPLASH_ENABLED) {
      onComplete();
      return;
    }

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPrefersReducedMotion(isReduced);

    // Determine if we should show splash
    const isNavigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const isReload = isNavigation?.type === "reload";
    const hasShownInSession = sessionStorage.getItem("splash_shown");

    if (SHOW_SPLASH_ON_EVERY_REFRESH && isReload) {
      setShouldShow(true);
    } else if (!hasShownInSession) {
      setShouldShow(true);
    } else {
      // Don't show on internal soft navigation if we already showed it in this session (unless refresh)
      onComplete();
      return;
    }

    sessionStorage.setItem("splash_shown", "true");

    // Lock scroll
    document.body.style.overflow = "hidden";

    if (isReduced) {
      // Fast path for reduced motion
      setTimeout(() => {
        setStage("brandReveal");
        setTimeout(() => {
          setStage("complete");
        }, 1000);
      }, 100);
    } else {
      // Normal premium sequence
      const sequence = async () => {
        // 200ms: URBAN appears
        setTimeout(() => setStage("brandReveal"), 200);
        
        // Hold brand until 900ms, then exit
        setTimeout(() => setStage("panelExit"), 900);
        
        // 900ms + 1000ms duration = 1900ms finish
        setTimeout(() => setStage("complete"), 2000);
      };
      
      sequence();
    }

    // Safety timeout (max 4 seconds)
    const safetyTimer = setTimeout(() => {
      setStage("complete");
    }, 4000);

    return () => {
      clearTimeout(safetyTimer);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  // Clean up body overflow when component unmounts or completes
  useEffect(() => {
    if (stage === "complete") {
      document.body.style.overflow = "unset";
      onComplete();
    }
  }, [stage, onComplete]);

  if (!shouldShow || stage === "complete") return null;

  // Premium easing curve
  const cinematicEase = [0.76, 0, 0.24, 1];

  return (
    <div className="fixed inset-0 z-[9999] flex overflow-hidden pointer-events-none bg-transparent">
      {/* Left Panel - 45% Mobile, 42% Desktop */}
      <motion.div
        className="relative h-full w-[45%] lg:w-[42%] bg-white flex justify-end items-center pointer-events-auto shadow-[1px_0_10px_rgba(0,0,0,0.03)] z-20"
        initial={{ y: "0%" }}
        animate={{ y: stage === "panelExit" ? (prefersReducedMotion ? 0 : "100%") : "0%", opacity: stage === "panelExit" && prefersReducedMotion ? 0 : 1 }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 1.1, ease: cinematicEase }}
      >
        <div className="pr-1 md:pr-2 xl:pr-3 overflow-visible whitespace-nowrap">
          <motion.span
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ 
              opacity: stage !== "initial" ? 1 : 0, 
              y: stage !== "initial" ? 0 : 15,
              scale: stage !== "initial" ? 1 : 0.96
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[120px] font-bold text-[#0A192F] tracking-tight leading-none"
          >
            URBAN
          </motion.span>
        </div>
        {/* Subtle center divider */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-slate-100/50 hidden md:block" />
      </motion.div>

      {/* Right Panel - 55% Mobile, 58% Desktop */}
      <motion.div
        className="relative h-full w-[55%] lg:w-[58%] bg-white flex justify-start items-center pointer-events-auto z-10"
        initial={{ y: "0%" }}
        animate={{ y: stage === "panelExit" ? (prefersReducedMotion ? 0 : "-100%") : "0%", opacity: stage === "panelExit" && prefersReducedMotion ? 0 : 1 }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 1.1, ease: cinematicEase }}
      >
        <div className="pl-1 md:pl-2 xl:pl-3 overflow-visible whitespace-nowrap">
          <motion.span
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ 
              opacity: stage !== "initial" && stage !== "brandReveal" ? 1 : 0, 
              y: stage !== "initial" && stage !== "brandReveal" ? 0 : 15,
              scale: stage !== "initial" && stage !== "brandReveal" ? 1 : 0.96
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.15 }}
            className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[120px] font-bold text-[var(--color-primary)] tracking-tight leading-none"
          >
            CLONE
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
