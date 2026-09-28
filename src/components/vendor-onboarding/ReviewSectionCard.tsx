"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ReviewSectionCardProps {
  title: string;
  summary: string;
  icon: React.ElementType;
  isComplete: boolean;
  editRoute: string;
  children: React.ReactNode;
}

export function ReviewSectionCard({
  title,
  summary,
  icon: Icon,
  isComplete,
  editRoute,
  children,
}: ReviewSectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn(
      "bg-white rounded-2xl border transition-all duration-300 shadow-sm",
      isExpanded ? "border-indigo-200 shadow-md" : "border-slate-200 hover:border-slate-300"
    )}>
      <div 
        className="p-5 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
            isComplete ? "bg-indigo-50" : "bg-amber-50"
          )}>
            <Icon className={cn(
              "w-5 h-5",
              isComplete ? "text-indigo-600" : "text-amber-500"
            )} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
            <p className="text-xs text-slate-500">{summary}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isComplete ? (
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Complete</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
              <AlertCircle className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Incomplete</span>
            </div>
          )}
          
          <Link 
            href={editRoute}
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Edit
          </Link>

          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-slate-100 mt-2">
              <div className="pt-4">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
