"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingStepsProps {
  currentStep: number;
}

export function BookingSteps({ currentStep }: BookingStepsProps) {
  const steps = [
    { num: 1, label: "Service" },
    { num: 2, label: "Date & Time" },
    { num: 3, label: "Address" },
    { num: 4, label: "Payment" },
    { num: 5, label: "Review" },
  ];

  return (
    <div className="flex items-center justify-between md:justify-start md:gap-4 mb-8 overflow-x-auto hide-scrollbar pb-2">
      {steps.map((step, idx) => {
        const isCompleted = currentStep > step.num;
        const isCurrent = currentStep === step.num;
        
        return (
          <div key={step.num} className="flex items-center shrink-0">
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300",
              isCompleted ? "text-[var(--color-primary)]" : "",
              isCurrent ? "bg-[var(--color-primary)] text-white shadow-md shadow-primary/20" : "",
              !isCompleted && !isCurrent ? "text-[var(--color-muted)]" : ""
            )}>
              {isCompleted ? (
                <div className="w-5 h-5 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
              ) : (
                <span className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-xs",
                  isCurrent ? "bg-white/20" : "bg-[var(--color-surface)] border border-[var(--color-border)]"
                )}>
                  {step.num}
                </span>
              )}
              <span>{step.label}</span>
            </div>
            
            {idx < steps.length - 1 && (
              <div className={cn(
                "w-4 md:w-8 h-px mx-2 md:mx-4 transition-colors duration-300",
                isCompleted ? "bg-[var(--color-primary)]/50" : "bg-[var(--color-border)]"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
