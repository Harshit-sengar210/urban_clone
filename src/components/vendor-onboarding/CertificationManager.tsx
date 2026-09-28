"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Award, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { expandCollapse, modalEnter } from "./animations";

export type VendorCertification = {
  id: string;
  name: string;
  issuingOrganization: string;
  year: number | null;
};

interface CertificationManagerProps {
  certifications: VendorCertification[];
  onChange: (certs: VendorCertification[]) => void;
}

export function CertificationManager({ certifications, onChange }: CertificationManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<VendorCertification>>({});

  const handleAdd = () => {
    if (formData.name && formData.issuingOrganization) {
      const newCert: VendorCertification = {
        id: Math.random().toString(36).substring(7),
        name: formData.name,
        issuingOrganization: formData.issuingOrganization,
        year: formData.year || null,
      };
      onChange([...certifications, newCert]);
      setIsAdding(false);
      setFormData({});
    }
  };

  const handleRemove = (id: string) => {
    onChange(certifications.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* List of Certifications */}
      <AnimatePresence>
        {certifications.map((cert) => (
          <motion.div
            key={cert.id}
            variants={expandCollapse}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="group relative bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-4 hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
              <Award className="w-5 h-5 text-slate-400 group-hover:text-[var(--color-primary)] transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-800 truncate pr-8">{cert.name}</h4>
              <p className="text-xs font-medium text-slate-500 truncate">{cert.issuingOrganization}</p>
              {cert.year && <p className="text-[10px] font-bold text-slate-400 mt-1">{cert.year}</p>}
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => handleRemove(cert.id)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Provided Status */}
            <div className="absolute bottom-4 right-4 text-[9px] font-bold uppercase tracking-wider text-slate-300">
              Provided by professional
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Button */}
      {!isAdding && (
        <motion.button
          type="button"
          onClick={() => setIsAdding(true)}
          className="w-full h-12 rounded-2xl border-2 border-dashed border-slate-200 text-sm font-bold text-slate-500 flex items-center justify-center gap-2 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all outline-none"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </motion.button>
      )}

      {/* Add Form (Inline Modal Style) */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            variants={modalEnter}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-slate-50 border border-slate-200 rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-bold text-[var(--color-foreground)]">New Certification</h4>
              <button 
                type="button" 
                onClick={() => { setIsAdding(false); setFormData({}); }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Certification Name</label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Electrical Training"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-semibold bg-white"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Issuing Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Skill Institute"
                    value={formData.issuingOrganization || ""}
                    onChange={(e) => setFormData({ ...formData, issuingOrganization: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-semibold bg-white"
                  />
                </div>
                
                <div className="col-span-1 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Year</label>
                  <input
                    type="number"
                    placeholder="e.g. 2024"
                    value={formData.year || ""}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-semibold bg-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAdding(false); setFormData({}); }}
                  className="px-5 h-11 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!formData.name || !formData.issuingOrganization}
                  className="px-5 h-11 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  Add Certification
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
