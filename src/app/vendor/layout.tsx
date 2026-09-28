"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/backend/firebase";
import { getUserRole } from "@/lib/auth/roleUtils";

// Pages that don't need the auth guard (public vendor pages)
const PUBLIC_PATHS = ["/vendor/login", "/vendor/signup", "/vendor/onboarding"];

export default function VendorSectionLayout({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<"loading" | "authorized" | "unauthorized">("loading");
  const router = useRouter();
  const pathname = usePathname();

  const isPublicPath = PUBLIC_PATHS.some(p => pathname.startsWith(p));

  useEffect(() => {
    if (isPublicPath) {
      setAuthState("authorized");
      return;
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthState("unauthorized");
        router.replace("/vendor/login");
        return;
      }

      const role = await getUserRole(user);
      if (role === "vendor") {
        setAuthState("authorized");
      } else if (role === "admin") {
        router.replace("/admin");
      } else {
        // customer trying to access vendor panel
        router.replace("/dashboard");
      }
    });

    return () => unsub();
  }, [pathname, isPublicPath, router]);

  if (isPublicPath) return <>{children}</>;

  if (authState === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full" />
          <p className="text-sm text-slate-400 font-medium">Loading vendor panel...</p>
        </div>
      </div>
    );
  }

  if (authState === "unauthorized") return null;

  return <>{children}</>;
}
