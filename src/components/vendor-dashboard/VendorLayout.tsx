"use client";

import { useState } from "react";
import { VendorSidebar } from "./VendorSidebar";
import { VendorTopbar } from "./VendorTopbar";

export function VendorLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white flex">
      <VendorSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen w-full transition-all">
        <VendorTopbar onOpenSidebar={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 w-full max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
