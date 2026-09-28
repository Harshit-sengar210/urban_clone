"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface OnboardingNavigationProps {
  onBack: () => void;
  onSave: () => void;
  onContinue: () => void | boolean | Promise<boolean | void>;
  isNextDisabled: boolean;
}

export function OnboardingNavigation({ onBack, onSave, onContinue, isNextDisabled }: OnboardingNavigationProps) {
  const [isContinuing, setIsContinuing] = useState(false);

  const handleContinue = async () => {
    setIsContinuing(true);
    try {
      // Allow onContinue to return a boolean or Promise<boolean>
      // If it explicitly returns false, it means validation failed, so stop loading.
      const result = await onContinue();
      if (result === false) {
        setIsContinuing(false);
      }
    } catch (error) {
      setIsContinuing(false);
    }
  };

  return (
    <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
      <Button 
        type="button"
        variant="ghost" 
        className="w-full sm:w-auto h-12 font-bold text-slate-500 hover:text-slate-900 group"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back
      </Button>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <Button 
          type="button"
          variant="outline"
          className="w-full sm:w-auto h-12 font-bold text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          onClick={onSave}
        >
          Save & Continue Later
        </Button>

        <motion.div
          animate={isNextDisabled ? { scale: 0.98 } : { scale: 1 }}
          className="w-full sm:w-auto"
        >
          <Button 
            type="button"
            className="w-full sm:w-auto h-12 px-8 font-bold shadow-lg shadow-primary/20 group hover:-translate-y-0.5 transition-all"
            disabled={isNextDisabled || isContinuing}
            onClick={handleContinue}
          >
            {isContinuing ? (
              <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /></span>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
