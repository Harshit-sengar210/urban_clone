"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { skillCatalog } from "@/data/mockVendorServices";
import { chipEnter } from "./animations";

interface SkillsSelectorProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

export function SkillsSelector({ selectedSkills, onChange }: SkillsSelectorProps) {
  const [search, setSearch] = useState("");
  
  const filteredSkills = skillCatalog.filter(skill => 
    skill.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter(s => s !== skill));
    } else {
      onChange([...selectedSkills, skill]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search skills (e.g. Deep Cleaning)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-4 pr-10 rounded-xl border border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-medium"
        />
        {search && (
          <button 
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200"
          >
            <X className="w-3 h-3 text-slate-500" />
          </button>
        )}
      </div>

      {/* Selected Skills Chips */}
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {selectedSkills.map(skill => (
            <motion.button
              key={`selected-${skill}`}
              variants={chipEnter}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => toggleSkill(skill)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-primary)] text-white text-xs font-bold rounded-full shadow-sm shadow-primary/20 hover:bg-primary/90 transition-colors"
            >
              {skill}
              <X className="w-3 h-3 opacity-70 hover:opacity-100" />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Available Skills Grid */}
      <div className="pt-2 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Suggested Skills</p>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 pb-2">
          <AnimatePresence>
            {filteredSkills.map(skill => {
              const isSelected = selectedSkills.includes(skill);
              if (isSelected) return null; // Only show unselected here

              return (
                <motion.button
                  key={`available-${skill}`}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => toggleSkill(skill)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-full hover:bg-slate-100 hover:border-slate-300 transition-colors"
                >
                  <Plus className="w-3 h-3 text-slate-400" />
                  {skill}
                </motion.button>
              );
            })}
            
            {filteredSkills.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-center py-4 text-xs font-medium text-slate-400">
                No matching skills found
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
