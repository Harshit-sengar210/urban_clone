"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Menu, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import { ProfileDropdown } from "./ProfileDropdown";
import { cn } from "@/lib/utils";
import { useVendorProfile } from "@/hooks/useVendorProfile";

export function VendorTopbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { profile, isLoading } = useVendorProfile();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Display name: professional/business name preferred, else full name
  const displayName = profile?.displayName || "Partner";
  const profilePhoto = profile?.profilePhoto || null;
  const initials = profile?.initials || "VP";

  return (
    <header className="h-16 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSidebar}
          className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="font-bold text-lg text-slate-800 hidden md:block">
          Dashboard
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors group">
          <Bell className="w-5 h-5 group-hover:text-slate-600 transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1 pr-2 sm:pr-3 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
          >
            {/* Avatar — photo if available, else initials */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center overflow-hidden border border-indigo-200 shrink-0 bg-indigo-100">
              {profilePhoto ? (
                <Image
                  src={profilePhoto}
                  alt={displayName}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              ) : isLoading ? (
                <div className="w-4 h-4 rounded-full border-2 border-indigo-300 border-t-transparent animate-spin" />
              ) : (
                <span className="text-xs font-extrabold text-indigo-600 leading-none">{initials}</span>
              )}
            </div>

            {/* Name — hidden on mobile */}
            <div className="hidden sm:block text-left max-w-[120px]">
              {isLoading ? (
                <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
              ) : (
                <div className="text-xs font-bold text-slate-700 leading-none truncate">{displayName}</div>
              )}
            </div>

            <ChevronDown className={cn(
              "w-4 h-4 text-slate-400 transition-transform hidden sm:block",
              isProfileOpen && "rotate-180"
            )} />
          </button>

          <ProfileDropdown
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            profile={profile}
          />
        </div>
      </div>
    </header>
  );
}
