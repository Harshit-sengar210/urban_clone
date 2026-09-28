"use client";

import { VendorProfessionalInfo } from "@/types/vendor";
import { Briefcase } from "lucide-react";
import { ProfileSection } from "./ProfileSection";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProfessionalProfileEditor({ data }: { data: VendorProfessionalInfo }) {
  const [form, setForm] = useState(data);

  return (
    <ProfileSection 
      title="Professional Profile" 
      icon={<Briefcase className="w-5 h-5" />}
      onSave={async () => {
        // Mock save delay
      }}
    >
      {(isEditing) => (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Profile Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Profile Type</label>
              {isEditing ? (
                <select 
                  value={form.profileType}
                  onChange={e => setForm({...form, profileType: e.target.value as any})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900" 
                >
                  <option value="Individual Professional">Individual Professional</option>
                  <option value="Business">Business / Agency</option>
                </select>
              ) : (
                <div className="font-bold text-slate-900">{form.profileType}</div>
              )}
            </div>

            {/* Display Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Professional Display Name</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={form.displayName}
                  onChange={e => setForm({...form, displayName: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900" 
                />
              ) : (
                <div className="font-bold text-slate-900">{form.displayName}</div>
              )}
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">About / Description</label>
              {isEditing && (
                <span className={cn(
                  "text-xs font-medium",
                  form.description.length > 500 ? "text-red-500" : "text-slate-400"
                )}>
                  {form.description.length}/500
                </span>
              )}
            </div>
            {isEditing ? (
              <textarea 
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900 resize-none" 
              />
            ) : (
              <p className="font-medium text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {form.description}
              </p>
            )}
          </div>
        </div>
      )}
    </ProfileSection>
  );
}
