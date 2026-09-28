"use client";

import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Clock3, CalendarClock } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/backend/firebase";

interface BookingStats {
  total: number;
  completed: number;
  inProgress: number;
  upcoming: number;
}

export function StatsCards() {
  const { user } = useCurrentUser();
  const [stats, setStats] = useState<BookingStats>({ total: 0, completed: 0, inProgress: 0, upcoming: 0 });

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      const all = snap.docs.map(d => d.data());
      setStats({
        total: all.length,
        completed: all.filter(b => b.status === "completed").length,
        inProgress: all.filter(b => b.status === "in_progress").length,
        upcoming: all.filter(b => b.status === "confirmed" || b.status === "scheduled").length,
      });
    });

    return () => unsub();
  }, [user?.uid]);

  const STATS = [
    { label: "Total Bookings", value: stats.total, sub: "All time", icon: CalendarDays, color: "text-[var(--color-primary)]", bg: "bg-[var(--color-primary)]/10", border: "border-[var(--color-primary)]/10" },
    { label: "Completed", value: stats.completed, sub: "All time", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
    { label: "In Progress", value: stats.inProgress, sub: "Active now", icon: Clock3, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { label: "Upcoming", value: stats.upcoming, sub: "Confirmed", icon: CalendarClock, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
          className={`bg-white border ${stat.border} rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <p className="text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-1">
            {stat.value}
          </p>
          <p className="text-sm font-semibold text-[var(--color-foreground)] mb-0.5">{stat.label}</p>
          <p className="text-xs text-[var(--color-muted)]">{stat.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}
