"use client";

import { motion } from "framer-motion";
import { Camera, MapPin, Briefcase, Star, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import { VendorProfile } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface ProfileHeroProps {
  profile: VendorProfile;
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  const [avatar, setAvatar] = useState(profile.personal.avatar);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          setAvatar(reader.result as string);
          setIsUploading(false);
          const event = new CustomEvent("show-toast", { detail: "Profile photo updated successfully." });
          window.dispatchEvent(event);
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusBadge = () => {
    switch (profile.applicationStatus) {
      case "approved":
        return <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>Verified Partner</span>;
      case "under_review":
        return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"/>Application Under Review</span>;
      case "needs_changes":
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500"/>Action Required</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-slate-500"/>Draft Profile</span>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
        
        {/* Avatar Upload Section */}
        <div className="relative group shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-100 relative">
            {avatar ? (
              <img src={avatar} alt={profile.personal.fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-black text-slate-300">
                {profile.personal.fullName.charAt(0)}
              </div>
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <Camera className="w-8 h-8 text-white mb-1" />
              <span className="text-white text-xs font-bold">Change Photo</span>
            </div>

            {/* Loading state */}
            {isUploading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full mb-2" />
                <span className="text-xs font-bold text-indigo-900">Uploading...</span>
              </div>
            )}
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/jpeg,image/png,image/webp" 
            onChange={handleFileChange}
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">{profile.personal.fullName}</h2>
              {getStatusBadge()}
            </div>
            <p className="text-lg font-bold text-slate-700">{profile.professional.displayName}</p>
            <p className="text-sm font-medium text-indigo-600 mt-1">{profile.professional.profileType}</p>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
            {profile.professional.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="font-bold">{profile.serviceArea.primaryCity}</span>
              <span className="text-xs">({profile.serviceArea.radiusKm}km radius)</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <span className="font-bold">{profile.experience.years}+ Years Experience</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <Star className="w-4 h-4 text-slate-400" />
              <span className="font-bold">{profile.services.length} Active Services</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
