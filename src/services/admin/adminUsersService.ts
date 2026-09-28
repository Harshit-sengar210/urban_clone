import { collection, getDocs } from "firebase/firestore";
import { db } from "@/backend/firebase";
import { AdminUser } from "@/data/adminUsersData";

export const fetchAllUsers = async (): Promise<AdminUser[]> => {
  const usersRef = collection(db, "users");

  // Fetch all docs then filter client-side:
  // Customers either have role == "customer" OR no role field at all.
  // Vendors have role == "vendor", admins have role == "admin" — exclude both.
  const snapshot = await getDocs(usersRef);

  return snapshot.docs
    .filter(doc => {
      const role = doc.data().role;
      return !role || role === "customer";
    })
    .map(doc => {
      const data = doc.data();

      const getTimestampStr = (field: any) => {
        if (field?.toDate) return field.toDate().toISOString();
        if (typeof field === "string") return field;
        return new Date().toISOString();
      };

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
};
