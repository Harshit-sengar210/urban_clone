"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, User } from "lucide-react";
import { summaryUpdate } from "./animations";
import { ExperienceLevel } from "./ExperienceLevelSelector";
import { VendorPortfolioItem } from "./PortfolioManager";

interface ProfessionalPreviewProps {
  experienceLevel: ExperienceLevel | "";
  yearsOfExperience: number | null;
  description: string;
  skills: string[];
  portfolio: VendorPortfolioItem[];
  projectsCompleted: number | null;
}

export function ProfessionalPreview({ 
  experienceLevel, 
  yearsOfExperience, 
  description, 
  skills, 
  portfolio, 
  projectsCompleted 
}: ProfessionalPreviewProps) {
  const [identity, setIdentity] = useState<{ name: string, type: string, services: string[] }>({ 
    name: "Your Name", 
    type: "Professional",
    services: [] 
  });

  useEffect(() => {
    try {
      const step3 = localStorage.getItem("vendor_onboarding_step3");
      const step4 = localStorage.getItem("vendor_onboarding_step4");
      
      let name = "Professional Name";
      let type = "Service Provider";
      let services: string[] = [];

      if (step3) {
        const data3 = JSON.parse(step3);
        name = data3.profileType === "business" && data3.businessName ? data3.businessName : data3.professionalName || "Your Name";
        type = data3.profileType === "business" ? (data3.businessType || "Business / Agency") : "Individual Professional";
      }
      
      if (step4) {
        // We could fetch real names, but for now we'll just mock based on step 4 selection count or generic
        const data4 = JSON.parse(step4);
        if (data4.selectedServiceIds && data4.selectedServiceIds.length > 0) {
          services = ["Primary Service", `+${data4.selectedServiceIds.length - 1} more`];
        }
      }

      setIdentity({ name, type, services });
    } catch (e) {}
  }, []);

  // Format experience string
  let expString = "";
  if (yearsOfExperience !== null && yearsOfExperience > 0) {
    expString = `${yearsOfExperience} years experience`;
  } else {
    switch (experienceLevel) {
      case "less_than_1": expString = "New professional"; break;
      case "1_2": expString = "1–2 years experience"; break;
      case "3_5": expString = "3–5 years experience"; break;
      case "5_10": expString = "5–10 years experience"; break;
      case "10_plus": expString = "10+ years experience"; break;
    }
  }

  // Cover photo
  const coverItem = portfolio.find(p => p.isCover) || portfolio[0];

  return (
    <div className="w-full h-full flex flex-col justify-center px-6 py-12 md:px-12 bg-slate-50 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/40 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/40 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 w-full max-w-[380px] mx-auto">
        <h2 className="text-xl font-extrabold text-[var(--color-foreground)] mb-6 text-center md:text-left">
          Live Profile Preview
        </h2>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
          
          {/* Header Cover / Profile Image Area */}
          <div className="h-32 bg-slate-100 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {coverItem ? (
                <motion.img 
                  key={coverItem.id}
                  src={coverItem.localPreviewUrl} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100"
                />
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Avatar overlay */}
            <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
              <User className="w-8 h-8 text-slate-400" />
            </div>
          </div>

          <div className="pt-10 px-6 pb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 truncate max-w-[200px]">{identity.name}</h3>
                <p className="text-xs font-semibold text-[var(--color-primary)]">{identity.type}</p>
              </div>
              <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                Pro
              </div>
            </div>

            {/* Experience & Projects */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
              <div className="flex-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Experience</span>
                <AnimatePresence mode="wait">
                  <motion.p key={expString || "empty"} variants={summaryUpdate} initial="initial" animate="animate" exit="exit" className="text-sm font-bold text-slate-800">
                    {expString || "Not specified"}
                  </motion.p>
                </AnimatePresence>
              </div>
              {projectsCompleted !== null && projectsCompleted > 0 && (
                <div className="flex-1 border-l border-slate-100 pl-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Projects</span>
                  <AnimatePresence mode="wait">
                    <motion.p key={projectsCompleted} variants={summaryUpdate} initial="initial" animate="animate" exit="exit" className="text-sm font-bold text-slate-800">
                      {projectsCompleted}+ completed
                    </motion.p>
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">About</span>
              <AnimatePresence mode="wait">
                {description ? (
                  <motion.p key="has-desc" variants={summaryUpdate} initial="initial" animate="animate" exit="exit" className="text-xs font-medium text-slate-600 line-clamp-3 leading-relaxed">
                    {description}
                  </motion.p>
                ) : (
                  <motion.p key="no-desc" variants={summaryUpdate} initial="initial" animate="animate" exit="exit" className="text-xs font-medium text-slate-400 italic">
                    Your professional introduction will appear here.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Skills</span>
              <div className="flex flex-wrap gap-1.5 min-h-[24px]">
                {skills.length === 0 && <span className="text-xs text-slate-300">None added</span>}
                <AnimatePresence>
                  {skills.slice(0, 5).map(skill => (
                    <motion.span
                      key={skill}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-full"
                    >
                      {skill}
                    </motion.span>
                  ))}
                  {skills.length > 5 && (
                    <motion.span layout className="text-[10px] font-bold text-slate-400 px-2 py-1">
                      +{skills.length - 5} more
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Portfolio Mini Preview */}
            {portfolio.length > 0 && (
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Portfolio</span>
                <div className="flex gap-2 overflow-hidden">
                  <AnimatePresence>
                    {portfolio.slice(0, 4).map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200"
                      >
                        <img src={item.localPreviewUrl} alt="" className="w-full h-full object-cover" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
