"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/backend/firebase";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authState, setAuthState] = useState<"loading" | "authorized" | "unauthorized">("loading");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Skip auth check on the login page itself
    if (pathname === "/admin/login") {
      setAuthState("authorized");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthState("unauthorized");
        router.replace("/admin/login");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setAuthState("authorized");
        } else {
          setAuthState("unauthorized");
          await auth.signOut();
          router.replace("/admin/login");
        }
      } catch {
        setAuthState("unauthorized");
        router.replace("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (authState === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full" />
          <p className="text-sm text-slate-500 font-medium">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (authState === "unauthorized") {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50 font-sans">
      <AdminSidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${collapsed ? "lg:ml-20" : "lg:ml-[270px]"}`}
      >
        <AdminTopbar 
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
