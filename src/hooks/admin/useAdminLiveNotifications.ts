import { useState, useEffect } from "react";
import { collection, query, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/backend/firebase";
import { AdminNotification } from "@/data/adminNotificationsData";

export function useAdminLiveNotifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  useEffect(() => {
    const unsubscribes: (() => void)[] = [];
    const notifsMap = new Map<string, AdminNotification>();

    const updateNotifs = () => {
      const sorted = Array.from(notifsMap.values()).sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setNotifications(sorted);
    };

    // 1. Listen to new bookings
    const qBookings = query(collection(db, "bookings"), limit(20));
    unsubscribes.push(
      onSnapshot(qBookings, (snap) => {
        snap.forEach((doc) => {
          const data = doc.data();
          if (!data.createdAt) return;
          const id = `booking-${doc.id}`;
          notifsMap.set(id, {
            id,
            type: "booking",
            title: "New Booking Received",
            message: `Booking created for ${data.serviceName || "a service"}.`,
            createdAt: data.createdAt,
            readStatus: "unread",
            actionLink: "/admin/bookings"
          });
        });
        updateNotifs();
      })
    );

    // 2. Listen to new vendor applications
    const qVendors = query(collection(db, "vendorApplications"), limit(20));
    unsubscribes.push(
      onSnapshot(qVendors, (snap) => {
        snap.forEach((doc) => {
          const data = doc.data();
          if (!data.createdAt) return;
          const id = `vendor-${doc.id}`;
          notifsMap.set(id, {
            id,
            type: "security",
            title: "New Vendor Application",
            message: `${data.businessName || "A vendor"} has applied to join the platform.`,
            createdAt: data.createdAt,
            readStatus: "unread",
            actionLink: "/admin/vendors"
          });
        });
        updateNotifs();
      })
    );

    // 3. Listen to new users
    const qUsers = query(collection(db, "users"), limit(20));
    unsubscribes.push(
      onSnapshot(qUsers, (snap) => {
        snap.forEach((doc) => {
          const data = doc.data();
          if (!data.createdAt) return;
          const id = `user-${doc.id}`;
          notifsMap.set(id, {
            id,
            type: "system",
            title: "New User Registered",
            message: `${data.name || "A new user"} has joined the platform.`,
            createdAt: data.createdAt,
            readStatus: "unread",
            actionLink: "/admin/users"
          });
        });
        updateNotifs();
      })
    );

    // 4. Listen to new support tickets
    const qTickets = query(collection(db, "supportTickets"), limit(20));
    unsubscribes.push(
      onSnapshot(qTickets, (snap) => {
        snap.forEach((doc) => {
          const data = doc.data();
          if (!data.createdAt) return;
          const id = `ticket-${doc.id}`;
          notifsMap.set(id, {
            id,
            type: "system",
            title: `New Support Ticket`,
            message: data.subject || "A new support ticket was created.",
            createdAt: data.createdAt,
            readStatus: "unread",
            actionLink: "/admin/support"
          });
        });
        updateNotifs();
      })
    );

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, []);

  return notifications;
}
