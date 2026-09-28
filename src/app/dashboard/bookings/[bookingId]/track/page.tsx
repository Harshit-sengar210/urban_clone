"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Home, RefreshCw, CheckCircle2, Circle, Loader2, HeadphonesIcon, CalendarDays, MapPin } from "lucide-react";
import { DEMO_BOOKINGS_FULL, Booking } from "@/data/bookings";
import { MOCK_TRACKING, ALL_TIMELINE_STEPS, TIMELINE_STEPS, TrackingData } from "@/data/tracking";
import { TrackingMap } from "@/components/bookings/TrackingMap";
import { TrackingStatus } from "@/components/bookings/TrackingStatus";
import { LiveProfessionalCard } from "@/components/bookings/LiveProfessionalCard";
import { ToastContainer, useToast } from "@/components/bookings/Toast";
import { PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Compact timeline for track page ───────────────────────────────────────
function TrackTimeline({ activeSteps }: { activeSteps: string[] }) {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-5">
      <h3 className="font-bold text-[var(--color-foreground)] mb-4">Live Status</h3>
      <div className="relative">
        <div className="absolute left-3.5 top-3.5 bottom-3.5 w-0.5 bg-slate-100" />
        <div className="space-y-4">
          {ALL_TIMELINE_STEPS.map((step, i) => {
            const done   = activeSteps.includes(step);
            const active = step === activeSteps[activeSteps.length - 1];
            return (
              <div key={step} className="relative flex items-center gap-3">
                <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  done ? "bg-[var(--color-primary)] text-white" : "bg-slate-100 border border-slate-200"
                }`}>
                  {done ? (
                    active ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-300" />
                  )}
                </div>
                <span className={`text-sm font-semibold ${done ? "text-[var(--color-foreground)]" : "text-slate-400"}`}>
                  {step}
                  {active && <span className="ml-2 text-xs text-[var(--color-primary)] font-bold">• Now</span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Not found fallback ─────────────────────────────────────────────────────
function NotFound({ bookingId }: { bookingId: string }) {
  return (
    <div className="px-4 py-12 flex flex-col items-center text-center">
      <PackageX className="w-12 h-12 text-slate-300 mb-4" />
      <h2 className="text-lg font-bold text-[var(--color-foreground)] mb-2">Tracking unavailable</h2>
      <p className="text-sm text-[var(--color-muted)] mb-6">
        Live tracking is only available for active bookings.
      </p>
      <Link href={`/dashboard/bookings/${bookingId}`}>
        <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Back to Booking</Button>
      </Link>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function TrackBookingPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = use(params);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [tracking, setTracking] = useState<TrackingData | null>(null);
  const [updatedAt, setUpdatedAt] = useState("Just now");
  const [refreshed, setRefreshed] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => {
      const found = DEMO_BOOKINGS_FULL.find((b) => b.id === bookingId) ?? null;
      const track = MOCK_TRACKING[bookingId] ?? null;
      setBooking(found);
      setTracking(track);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, [bookingId]);

  const handleRefresh = () => {
    setRefreshed(true);
    setUpdatedAt("A few seconds ago");
    setTimeout(() => setRefreshed(false), 800);
  };

  const handleContactAction = (type: "call" | "message") => {
    showToast(type === "call" ? `Calling ${tracking?.professional}...` : "Opening chat...");
  };

  if (loading) return (
    <div className="px-4 md:px-6 py-6 space-y-4 animate-pulse max-w-screen-xl mx-auto">
      <div className="h-5 w-40 bg-slate-100 rounded" />
      <div className="h-28 bg-slate-100 rounded-2xl" />
      <div className="h-72 bg-slate-100 rounded-2xl" />
      <div className="h-40 bg-slate-100 rounded-2xl" />
    </div>
  );

  // Show not-found if booking is missing or not trackable
  const isTrackable = booking && ["on_the_way", "in_progress", "assigned"].includes(booking.status);
  if (!booking || !isTrackable || !tracking) return <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto"><NotFound bookingId={bookingId} /></div>;

  const activeSteps = TIMELINE_STEPS[tracking.status] ?? [];
  const dateStr = new Date(booking.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <>
      <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-medium mb-4">
          <Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Dashboard
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link href="/dashboard/bookings" className="hover:text-[var(--color-primary)] transition-colors">My Bookings</Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link href={`/dashboard/bookings/${bookingId}`} className="hover:text-[var(--color-primary)] transition-colors">Booking Details</Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-[var(--color-foreground)]">Track</span>
        </nav>

        {/* Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[var(--color-foreground)] tracking-tight">Track Your Service</h1>
            <p className="text-sm text-[var(--color-muted)] font-medium mt-0.5">Your professional is on the way.</p>
          </div>
          <Link href={`/dashboard/bookings/${bookingId}`} className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Booking
          </Link>
        </div>

        {/* Live Status Banner */}
        <div className="mb-6">
          <TrackingStatus data={tracking} />
        </div>

        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left — Map + Details */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Map with refresh */}
            <div className="space-y-2">
              <TrackingMap data={tracking} refreshed={refreshed} />
              <div className="flex items-center justify-between px-1">
                <p className="text-xs text-[var(--color-muted)]">
                  <span className="inline-flex w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 mb-0.5" />
                  Last updated: {updatedAt}
                </p>
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] hover:underline"
                >
                  <RefreshCw className={`w-3 h-3 ${refreshed ? "animate-spin" : ""}`} /> Refresh
                </button>
              </div>
            </div>

            {/* Service Details card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-5"
            >
              <h3 className="font-bold text-[var(--color-foreground)] mb-4">Service Details</h3>
              <div className="space-y-3">
                <p className="font-bold text-[var(--color-foreground)]">{booking.service}</p>
                <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                  <CalendarDays className="w-4 h-4 text-slate-400" /> {dateStr} · {booking.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{booking.addressType} · {booking.address}</span>
                </div>
              </div>
            </motion.div>

            {/* Safety Card */}
            <div className="bg-slate-50 border border-[var(--color-border)] rounded-2xl p-4 flex items-start gap-3">
              <HeadphonesIcon className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-[var(--color-foreground)] mb-0.5">Need help?</p>
                <p className="text-xs text-[var(--color-muted)] mb-2">If something doesn't look right, contact UrbanClone Support.</p>
                <Link href="/dashboard/support" className="text-xs font-bold text-[var(--color-primary)] hover:underline">Get Help →</Link>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-4">
            <LiveProfessionalCard data={tracking} onAction={handleContactAction} />
            <TrackTimeline activeSteps={activeSteps} />
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
