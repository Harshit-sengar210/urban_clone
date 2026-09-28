"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Menu, User, ChevronDown } from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";
import { cn } from "@/lib/utils";

export function VendorTopbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            className="flex items-center gap-3 p-1 pr-2 sm:pr-3 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden border border-indigo-200">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-700 leading-none">Harsh Bhati</div>
            </div>
            <ChevronDown className={cn(
              "w-4 h-4 text-slate-400 transition-transform hidden sm:block",
              isProfileOpen && "rotate-180"
            )} />
          </button>

          <ProfileDropdown 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
          />
        </div>
      </div>
    </header>
  );
}
