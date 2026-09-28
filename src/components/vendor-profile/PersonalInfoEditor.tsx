"use client";

import { VendorPersonalInfo } from "@/types/vendor";
import { User } from "lucide-react";
import { ProfileSection } from "./ProfileSection";
import { useState } from "react";

export function PersonalInfoEditor({ data }: { data: VendorPersonalInfo }) {
  const [form, setForm] = useState(data);

  return (
    <ProfileSection 
      title="Personal Information" 
      icon={<User className="w-5 h-5" />}
      onSave={async () => {
        // Mock save delay is handled by the wrapper
      }}
    >
      {(isEditing) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
            {isEditing ? (
              <input 
                type="text" 
                value={form.fullName}
                onChange={e => setForm({...form, fullName: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900" 
              />
            ) : (
              <div className="font-bold text-slate-900">{form.fullName}</div>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Date of Birth</label>
            {isEditing ? (
              <input 
                type="date" 
                value={form.dateOfBirth || ""}
                onChange={e => setForm({...form, dateOfBirth: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900" 
              />
            ) : (
              <div className="font-bold text-slate-900">{form.dateOfBirth || "Not provided"}</div>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Gender</label>
            {isEditing ? (
              <select 
                value={form.gender || ""}
                onChange={e => setForm({...form, gender: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900" 
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <div className="font-bold text-slate-900">{form.gender || "Not provided"}</div>
            )}
          </div>

          {/* Mobile */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mobile Number</label>
            {isEditing ? (
              <input 
                type="tel" 
                value={form.mobile}
                onChange={e => setForm({...form, mobile: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900" 
              />
            ) : (
              <div className="font-bold text-slate-900">{form.mobile}</div>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
            {isEditing ? (
              <input 
                type="email" 
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900" 
              />
            ) : (
              <div className="font-bold text-slate-900">{form.email}</div>
            )}
          </div>

        </div>
      )}
    </ProfileSection>
  );
}
