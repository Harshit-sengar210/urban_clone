"use client";

import { VendorExperience } from "@/types/vendor";
import { Award, X } from "lucide-react";
import { ProfileSection } from "./ProfileSection";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ExperienceEditor({ data }: { data: VendorExperience }) {
  const [form, setForm] = useState(data);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !form.skills.includes(newSkill.trim())) {
      setForm({ ...form, skills: [...form.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setForm({ ...form, skills: form.skills.filter(s => s !== skill) });
  };

  return (
    <ProfileSection 
      title="Experience & Skills" 
      icon={<Award className="w-5 h-5" />}
      onSave={async () => {
        // Mock save
      }}
    >
      {(isEditing) => (
        <div className="space-y-8">
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Years of Experience</label>
            {isEditing ? (
              <div className="flex items-center gap-3">
                <input 
                  type="number"
                  min="0"
                  value={form.years}
                  onChange={e => setForm({...form, years: parseInt(e.target.value) || 0})}
                  className="w-32 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-bold text-slate-900" 
                />
                <span className="font-bold text-slate-700">Years</span>
              </div>
            ) : (
              <div className="font-bold text-slate-900 text-lg">{form.years}+ Years Experience</div>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Professional Skills</label>
            
            <div className="flex flex-wrap gap-2">
              {form.skills.map(skill => (
                <div key={skill} className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold",
                  isEditing ? "bg-indigo-50 text-indigo-700 border border-indigo-100" : "bg-slate-100 text-slate-700 border border-slate-200"
                )}>
                  {skill}
                  {isEditing && (
                    <button onClick={() => removeSkill(skill)} className="hover:bg-indigo-200 rounded-full p-0.5 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex items-center gap-2 max-w-sm mt-3">
                <input 
                  type="text" 
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addSkill()}
                  placeholder="Add a skill..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm font-medium text-slate-900" 
                />
                <button onClick={addSkill} className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors">Add</button>
              </div>
            )}
          </div>

        </div>
      )}
    </ProfileSection>
  );
}
