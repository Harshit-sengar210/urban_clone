"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, LifeBuoy, ArrowRight } from "lucide-react";
import { auth, db } from "@/backend/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Link from "next/link";

export function SuspensionAlert() {
  const [isSuspended, setIsSuspended] = useState(false);
  const [reason, setReason] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const unsubscribeDoc = onSnapshot(doc(db, "vendors", user.uid), (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.status === "suspended") {
              setIsSuspended(true);
              setReason(data.suspensionReason || "Violations of platform policies.");
            } else if (data.status === "active") {
              setIsSuspended(false);
              setReason("");
            }
          }
        });
        return () => unsubscribeDoc();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (!isSuspended) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        <div className="p-8 text-center bg-amber-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
          <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Account Suspended</h2>
          <p className="text-amber-700 font-medium">
            Your vendor account has been temporarily suspended by an administrator.
          </p>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Reason for Suspension</span>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              "{reason}"
            </p>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed text-center">
            You will not be able to accept new bookings or manage your profile until this issue is resolved. Please contact support to discuss your account status.
          </p>

          <Link
            href="/vendor/support"
            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center gap-2 font-bold transition-colors"
            onClick={() => setIsSuspended(false)} // Allow routing to support page
          >
            <LifeBuoy className="w-4 h-4" />
            Raise a Ticket
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
