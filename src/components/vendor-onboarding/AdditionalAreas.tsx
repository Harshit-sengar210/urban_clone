"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, MapPin } from "lucide-react";
import { chipEnter, expandCollapse } from "./animations";

interface AdditionalAreasProps {
  areas: string[];
  onChange: (areas: string[]) => void;
  maxAreas?: number;
}

export function AdditionalAreas({ areas, onChange, maxAreas = 5 }: AdditionalAreasProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() && !areas.includes(inputValue.trim()) && areas.length < maxAreas) {
      onChange([...areas, inputValue.trim()]);
      setInputValue("");
      setIsAdding(false);
    }
  };

  const handleRemove = (areaToRemove: string) => {
    onChange(areas.filter(a => a !== areaToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const isMaxReached = areas.length >= maxAreas;

  return (
    <div className="space-y-4">
      {/* Chips Container */}
      {areas.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {areas.map(area => (
              <motion.div
                key={area}
                variants={chipEnter}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold rounded-full transition-colors"
              >
                <MapPin className="w-3 h-3 text-indigo-400" />
                {area}
                <button
                  type="button"
                  onClick={() => handleRemove(area)}
                  className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors ml-1"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Input / Add Button */}
      <AnimatePresence mode="wait">
        {isAdding ? (
          <motion.div
            key="input"
            variants={expandCollapse}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex gap-2"
          >
            <input
              type="text"
              autoFocus
              placeholder="Search area or locality"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 h-10 px-4 rounded-xl border border-[var(--color-primary)] ring-4 ring-primary/10 transition-all outline-none text-sm font-semibold bg-white"
            />
            <button
              type="button"
              onClick={handleAdd}
              className="h-10 px-4 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setInputValue("");
              }}
              className="h-10 px-3 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          !isMaxReached && (
            <motion.button
              key="button"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              type="button"
              onClick={() => setIsAdding(true)}
              className="h-10 px-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 text-sm font-bold flex items-center gap-2 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all outline-none"
            >
              <Plus className="w-4 h-4" />
              Add Area
            </motion.button>
          )
        )}
      </AnimatePresence>

      {isMaxReached && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold text-amber-500 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Maximum additional areas reached.
        </motion.p>
      )}
    </div>
  );
}
