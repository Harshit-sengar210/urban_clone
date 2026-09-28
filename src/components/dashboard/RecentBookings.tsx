"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
import { BookingStatusBadge } from "@/components/bookings/BookingStatusBadge";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { BookingStatus } from "@/data/bookings";
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/backend/firebase";

interface Booking {
  id: string;
  service: string;
  category: string;
  date: string;
  time: string;
  status: BookingStatus;
  amount: number;
}

export function RecentBookings() {
  const { user } = useCurrentUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(4)
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => {
        const d = doc.data();
        const dateVal = d.date?.toDate ? d.date.toDate() : d.date ? new Date(d.date) : null;
        return {
          id: doc.id,
          service: d.service || d.serviceName || "Service",
          category: d.category || "",
          date: dateVal ? dateVal.toISOString() : "",
          time: d.time || "",
          status: d.status || "confirmed",
          amount: d.amount || d.price || 0,
        } as Booking;
      });
      setBookings(data);
      setIsLoading(false);
    }, () => {
      setIsLoading(false);
    });

    return () => unsub();
  }, [user?.uid]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
        <h3 className="font-bold text-[var(--color-foreground)]">Recent Bookings</h3>
        <Link
          href="/dashboard/bookings"
          className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1"
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="px-6 py-12 flex justify-center">
          <div className="animate-spin w-7 h-7 border-4 border-[var(--color-primary)] border-t-transparent rounded-full" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="font-semibold text-[var(--color-foreground)] mb-1">No bookings yet</p>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Book your first home service and let UrbanClone take care of the rest.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            Explore Services
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-[var(--color-border)]">
                  {["Service", "Date & Time", "Status", "Amount", "Action"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {bookings.map((booking, i) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-[var(--color-foreground)]">{booking.service}</p>
                      <p className="text-xs text-[var(--color-muted)] mt-0.5">{booking.category}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[var(--color-foreground)]">
                        {booking.date ? new Date(booking.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                      </p>
                      <p className="text-xs text-[var(--color-muted)] mt-0.5">{booking.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <BookingStatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-[var(--color-foreground)]">₹{booking.amount}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/dashboard/bookings/${booking.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-primary)] hover:underline"
                      >
                        Details <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-[var(--color-border)]">
            {bookings.map((booking) => (
              <div key={booking.id} className="px-5 py-4 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--color-foreground)] truncate">{booking.service}</p>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    {booking.date ? new Date(booking.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"} · ₹{booking.amount}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <BookingStatusBadge status={booking.status} />
                  <Link href={`/dashboard/bookings/${booking.id}`}>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
