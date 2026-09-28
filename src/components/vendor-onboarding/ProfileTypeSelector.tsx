"use client";

import { motion } from "framer-motion";
import { User, Building2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ProfileType = "individual" | "business";

interface ProfileTypeSelectorProps {
  value: ProfileType;
  onChange: (value: ProfileType) => void;
}

export function ProfileTypeSelector({ value, onChange }: ProfileTypeSelectorProps) {
  const options = [
    {
      id: "individual" as const,
      title: "Individual Professional",
      description: "I provide services independently.",
      icon: User,
    },
    {
      id: "business" as const,
      title: "Business / Agency",
      description: "I operate as a business, team, or agency.",
      icon: Building2,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option) => {
        const isSelected = value === option.id;
        const Icon = option.icon;

        return (
          <motion.button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative text-left p-5 rounded-2xl border-2 transition-all duration-300 outline-none flex flex-col",
              isSelected 
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md shadow-primary/10" 
                : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <motion.div 
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300",
                  isSelected ? "bg-[var(--color-primary)] text-white" : "bg-slate-100 text-slate-500"
                )}
                animate={isSelected ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-6 h-6" />
              </motion.div>

              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300",
                isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-slate-300"
              )}>
                <motion.div
                  initial={false}
                  animate={{ scale: isSelected ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </motion.div>
              </div>
            </div>

            <div>
              <h4 className={cn(
                "font-bold text-lg mb-1 transition-colors duration-300",
                isSelected ? "text-[var(--color-primary)]" : "text-slate-800"
              )}>
                {option.title}
              </h4>
              <p className="text-sm font-medium text-slate-500 leading-snug">
                {option.description}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
