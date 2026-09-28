import { doc, getDoc } from "firebase/firestore";
import { db } from "@/backend/firebase";
import { User } from "firebase/auth";

export type UserRole = "admin" | "vendor" | "customer" | "unknown";

/**
 * Reads the user's role from Firestore and returns the correct dashboard URL.
 */
export async function getUserRole(user: User): Promise<UserRole> {
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
      const role = snap.data().role;
      if (role === "admin") return "admin";
      if (role === "vendor") return "vendor";
      if (role === "customer") return "customer";
    }
    // No role field means they are a legacy customer
    return "customer";
  } catch {
    return "unknown";
  }
}

/**
 * Maps a role to the default dashboard URL.
 */
export function getDashboardUrl(role: UserRole): string {
  switch (role) {
    case "admin": return "/admin";
    case "vendor": return "/vendor/dashboard";
    case "customer":
    default: return "/dashboard";
  }
}
