import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/backend/firebase";
import { AdminUser } from "@/data/adminUsersData";

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const usersRef = collection(db, "users");

    const getTimestampStr = (field: any) => {
      if (field?.toDate) return field.toDate().toISOString();
      if (typeof field === "string") return field;
      return new Date().toISOString();
    };

    // Real-time listener — updates automatically when Firestore data changes
    const unsubscribe = onSnapshot(
      usersRef,
      (snapshot) => {
        const allUsers = snapshot.docs
          // Only show customers (role == "customer" or no role set)
          .filter(doc => {
            const role = doc.data().role;
            return !role || role === "customer";
          })
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || data.displayName || (data.email ? data.email.split("@")[0] : "Unknown User"),
              email: data.email || "",
              phone: data.phone || "N/A",
              avatar: data.avatar || data.photoURL || undefined,
              status: data.status || "active",
              joinedAt: getTimestampStr(data.createdAt),
              lastActiveAt: getTimestampStr(data.lastLoginAt || data.createdAt),
              bookingCount: data.bookingCount || 0,
              completedBookings: data.completedBookings || 0,
              cancelledBookings: data.cancelledBookings || 0,
              totalSpend: data.totalSpend || 0,
              favoriteServices: data.favoriteServices || []
            } as AdminUser;
          });

        setUsers(allUsers);
        setError(null);
        setIsLoading(false);
      },
      (err) => {
        console.error("Failed to load users:", err);
        setError(err.message || "Failed to load users");
        setIsLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return { users, isLoading, error };
}
