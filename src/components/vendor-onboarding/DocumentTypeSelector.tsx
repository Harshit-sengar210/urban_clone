"use client";

import { motion } from "framer-motion";
import { Check, FileText, CreditCard, Car, Book } from "lucide-react";
import { cn } from "@/lib/utils";

export type IdentityDocumentType = "aadhaar" | "pan" | "driving_license" | "passport";
export type DocumentSide = "front" | "back" | "photo_page";

export interface DocumentTypeOption {
  id: IdentityDocumentType;
  label: string;
  desc: string;
  icon: React.ElementType;
  requiredSides: DocumentSide[];
}

const documentTypes: DocumentTypeOption[] = [
  { 
    id: "aadhaar", 
    label: "Aadhaar Card", 
    desc: "Government identity", 
    icon: FileText,
    requiredSides: ["front", "back"] 
  },
  { 
    id: "pan", 
    label: "PAN Card", 
    desc: "Tax identity", 
    icon: CreditCard,
    requiredSides: ["front"] 
  },
  { 
    id: "driving_license", 
    label: "Driving Licence", 
    desc: "Government licence", 
    icon: Car,
    requiredSides: ["front", "back"] 
  },
  { 
    id: "passport", 
    label: "Passport", 
    desc: "Identity document", 
    icon: Book,
    requiredSides: ["photo_page"] 
  },
];

interface DocumentTypeSelectorProps {
  value: IdentityDocumentType | "";
  onChange: (doc: DocumentTypeOption) => void;
  error?: boolean;
  savedTypes?: string[];
}

export function DocumentTypeSelector({ value, onChange, error, savedTypes = [] }: DocumentTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {documentTypes.map((doc) => {
        const isSelected = value === doc.id;
        const Icon = doc.icon;
        const isSaved = savedTypes.includes(doc.id);
        const isMandatory = doc.id === "aadhaar" || doc.id === "pan";
        const shouldShowError = error && isMandatory && !isSaved;
        
        return (
          <motion.button
            key={doc.id}
            type="button"
            onClick={() => onChange(doc)}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative w-full p-4 rounded-2xl border-2 text-left transition-all duration-300 outline-none overflow-hidden group flex items-start gap-4",
              shouldShowError
                ? "border-red-300 bg-red-50 hover:border-red-400"
                : isSelected
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-sm shadow-primary/10"
                  : isSaved
                    ? "border-green-300 bg-green-50/50"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300",
              isSelected 
                ? "bg-[var(--color-primary)] text-white" 
                : isSaved 
                  ? "bg-green-100 text-green-600" 
                  : "bg-slate-100 text-slate-400 group-hover:text-[var(--color-primary)] group-hover:bg-indigo-50"
            )}>
              <Icon className="w-5 h-5" />
            </div>

            <div className="flex flex-col gap-1 pr-6 flex-1">
              <h4 className={cn(
                "font-extrabold text-sm transition-colors duration-300",
                isSelected ? "text-[var(--color-primary)]" : isSaved ? "text-green-800" : "text-slate-800"
              )}>
                {doc.label}
              </h4>
              <p className="text-xs font-medium text-slate-500">
                {doc.desc}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                {doc.requiredSides.join(" + ").replace(/_/g, " ")}
              </p>
            </div>

            {/* Check Indicator */}
            <div className={cn(
              "absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
              isSelected || isSaved
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]" 
                : "border-slate-300 bg-white group-hover:border-[var(--color-primary)]/50",
              isSaved && !isSelected ? "border-green-500 bg-green-500" : ""
            )}>
              <motion.div
                initial={false}
                animate={{ scale: isSelected || isSaved ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </motion.div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
