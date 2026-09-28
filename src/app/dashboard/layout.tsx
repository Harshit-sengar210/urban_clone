"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/backend/firebase";
import { getUserRole } from "@/lib/auth/roleUtils";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MobileBottomNav } from "@/components/dashboard/MobileBottomNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authState, setAuthState] = useState<"loading" | "authorized" | "unauthorized">("loading");
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthState("unauthorized");
        router.replace("/login");
        return;
      }

      const role = await getUserRole(user);
      if (role === "admin") {
        router.replace("/admin");
      } else if (role === "vendor") {
        router.replace("/vendor/dashboard");
      } else {
        // customer or unknown — allow access
        setAuthState("authorized");
      }
    });

    return () => unsub();
  }, [router]);

  if (authState === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full" />
          <p className="text-sm text-slate-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (authState === "unauthorized") return null;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
}
