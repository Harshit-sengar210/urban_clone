"use client";

import { motion } from "framer-motion";
import { Wind, Sparkles, Wrench, Paintbrush } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/backend/firebase";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  serviceName: string;
  status: string;
  date: string;
  icon: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Wind, Sparkles, Wrench, Paintbrush,
};

const STATUS_COLOR: Record<string, string> = {
  completed: "text-green-600",
  in_progress: "text-blue-600",
  confirmed: "text-[var(--color-primary)]",
  cancelled: "text-red-500",
  scheduled: "text-[var(--color-primary)]",
};

const STATUS_LABEL: Record<string, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  scheduled: "Scheduled",
};

export function RecentActivity() {
  const { user } = useCurrentUser();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => {
        const d = doc.data();
        const dateVal = d.createdAt?.toDate ? d.createdAt.toDate() : d.date?.toDate ? d.date.toDate() : null;
        return {
          id: doc.id,
          serviceName: d.service || d.serviceName || "Service",
          status: d.status || "confirmed",
          date: dateVal ? dateVal.toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—",
          icon: "Sparkles",
        } as Activity;
      });
      setActivities(data);
    });

    return () => unsub();
  }, [user?.uid]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.18 }}
      className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-5"
    >
      <h3 className="font-bold text-[var(--color-foreground)] mb-4">Recent Activity</h3>

      {activities.length === 0 ? (
        <p className="text-sm text-[var(--color-muted)] text-center py-4">No recent activity</p>
      ) : (
        <div className="space-y-1">
          {activities.map((act, i) => {
            const Icon = ICON_MAP[act.icon] ?? Sparkles;
            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-foreground)] truncate">{act.serviceName}</p>
                  <p className="text-xs mt-0.5">
                    <span className={cn("font-semibold", STATUS_COLOR[act.status] || "text-slate-500")}>
                      {STATUS_LABEL[act.status] || act.status}
                    </span>
                    <span className="text-[var(--color-muted)]"> · {act.date}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
