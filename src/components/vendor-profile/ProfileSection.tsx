"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: (isEditing: boolean, setIsEditing: (v: boolean) => void) => React.ReactNode;
  onSave?: () => Promise<void>;
}

export function ProfileSection({ title, icon, children, onSave }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (onSave) {
      setIsSaving(true);
      await onSave();
      
      // Artificial delay for smooth UX
      setTimeout(() => {
        setIsSaving(false);
        setIsEditing(false);
        const event = new CustomEvent("show-toast", { detail: `${title} updated successfully.` });
        window.dispatchEvent(event);
      }, 800);
    } else {
      setIsEditing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "bg-white rounded-3xl border shadow-sm transition-all duration-300 overflow-hidden",
        isEditing ? "border-indigo-200 ring-4 ring-indigo-50" : "border-slate-100 hover:shadow-md hover:border-slate-200"
      )}
    >
      <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-sm border border-slate-100">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>
        )}
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={isEditing ? "editing" : "viewing"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children(isEditing, setIsEditing)}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {isEditing && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 overflow-hidden"
            >
              <button
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70 min-w-[120px] justify-center"
              >
                {isSaving ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" /> Save Changes
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
