"use client";

import { useState, useEffect, use, useRef } from "react";
import { useRouter } from "next/navigation";
import { DEMO_BOOKINGS_FULL, Booking, BookingStatus } from "@/data/bookings";
import { BookingHeader } from "@/components/bookings/BookingHeader";
import { BookingInfo } from "@/components/bookings/BookingInfo";
import { BookingTimeline } from "@/components/bookings/BookingTimeline";
import { ProfessionalCard } from "@/components/bookings/ProfessionalCard";
import { PaymentSummary } from "@/components/bookings/PaymentSummary";
import { BookingActions } from "@/components/bookings/BookingActions";
import { CancellationPolicy } from "@/components/bookings/CancellationPolicy";
import { BookingSupport } from "@/components/bookings/BookingSupport";
import { RescheduleModal } from "@/components/bookings/RescheduleModal";
import { CancelBookingModal } from "@/components/bookings/CancelBookingModal";
import { ReviewModal } from "@/components/bookings/ReviewModal";
import { ToastContainer, useToast } from "@/components/bookings/Toast";
import { BookingStatusBadge } from "@/components/bookings/BookingStatusBadge";
import { Navigation, Download, ArrowLeft, PackageX } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { doc, getDoc, updateDoc, onSnapshot, collection, addDoc } from "firebase/firestore";
import { db } from "@/backend/firebase";
import { useCurrentUser } from "@/hooks/useCurrentUser";

// ─── Active Booking Banner ──────────────────────────────────────────────────
function ActiveBanner({ booking }: { booking: Booking }) {
  if (!["on_the_way", "in_progress"].includes(booking.status)) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-6 rounded-2xl overflow-hidden p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${booking.status === "in_progress" ? "bg-indigo-500" : "bg-sky-500"}`}
    >
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <div className="text-white">
          <p className="font-bold">
            {booking.status === "in_progress" ? "Service is in progress" : "Your professional is on the way"}
          </p>
          <p className="text-sm opacity-80">
            {booking.professional} {booking.status === "on_the_way" && `· Est. ${booking.estimatedArrival || "10-15 mins"}`}
          </p>
        </div>
      </div>
      {booking.status === "on_the_way" && (
        <Link href={`/dashboard/bookings/${booking.id}/track`}>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white text-sky-600 font-bold text-sm rounded-xl hover:bg-sky-50 transition-colors flex-shrink-0">
            <Navigation className="w-4 h-4" /> Track Live
          </button>
        </Link>
      )}
    </motion.div>
  );
}

// ─── Not Found State ────────────────────────────────────────────────────────
function BookingNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mb-5">
        <PackageX className="w-8 h-8 text-slate-400" />
      </div>
      <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-2">Booking not found</h2>
      <p className="text-sm text-[var(--color-muted)] mb-6 max-w-xs">We couldn't find this booking. It may have been removed or the ID is incorrect.</p>
      <Link href="/dashboard/bookings">
        <Button className="gap-2"><ArrowLeft className="w-4 h-4" /> Back to My Bookings</Button>
      </Link>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function BookingDetailPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = use(params);
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const { toasts, showToast, removeToast } = useToast();
  const prevStatusRef = useRef<BookingStatus | null>(null);
  
  const { user } = useCurrentUser();

  useEffect(() => {
    if (booking && prevStatusRef.current) {
      if (prevStatusRef.current !== "cancelled" && booking.status === "cancelled") {
        showToast("This booking has been cancelled.");
      }
    }
    if (booking) {
      prevStatusRef.current = booking.status;
    }
  }, [booking?.status]);

  useEffect(() => {
    const docRef = doc(db, "bookings", bookingId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const d = docSnap.data();
        const dateVal = d.date?.toDate ? d.date.toDate() : d.date ? new Date(d.date) : null;
        const createdVal = d.createdAt?.toDate ? d.createdAt.toDate() : new Date();
        
        const bookingData: Booking = {
          id: docSnap.id,
          serviceSlug: d.serviceSlug || "",
          service: d.service || d.serviceName || "Service",
          category: d.category || "Uncategorized",
          image: d.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
          date: dateVal ? dateVal.toISOString() : new Date().toISOString(),
          time: d.time || "Not set",
          status: d.status || "confirmed",
          amount: d.amount || d.price || (d.variant?.price) || 0,
          professional: d.professional || "Assigning...",
          professionalRating: d.professionalRating || null,
          vendorId: d.vendorId || undefined,
          paymentStatus: d.paymentStatus || "pending",
          address: typeof d.address === 'object' && d.address !== null ? d.address.fullAddress : d.address || "Unknown Address",
          addressType: typeof d.address === 'object' && d.address !== null ? d.address.type : d.addressType || "Home",
          createdAt: createdVal.toISOString(),
          review: d.review || null,
          cancellationPolicy: d.cancellationPolicy || { freeUntil: "Before 9:00 AM on booking day", refundable: true },
          estimatedArrival: d.estimatedArrival || undefined,
        };
        setBooking(bookingData);
      } else {
        // Fallback to demo bookings if not found in Firestore (useful for demo IDs)
        const found = DEMO_BOOKINGS_FULL.find((b) => b.id === bookingId) ?? null;
        setBooking(found);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching booking details:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [bookingId]);

  const handleCancel = async (id: string) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        status: "cancelled",
        paymentStatus: "refunded"
      });
      setBooking((prev) => prev ? { ...prev, status: "cancelled" as BookingStatus, paymentStatus: "refunded" } : prev);
      showToast("Booking cancelled successfully.");
    } catch (err) {
      showToast("Failed to cancel booking.");
    }
  };

  const handleReschedule = async (id: string, date: string, time: string) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        date: new Date(date),
        time: time,
        status: "rescheduled"
      });
      setBooking((prev) => prev ? { ...prev, date: new Date(date).toISOString(), time, status: "rescheduled" as BookingStatus } : prev);
      showToast("Booking rescheduled successfully.");
    } catch (err) {
      showToast("Failed to reschedule booking.");
    }
  };

  const handleReview = async (id: string, rating: number, comment: string) => {
    try {
      const reviewData = { rating, comment, submittedAt: new Date().toISOString() };
      
      // Update booking document
      await updateDoc(doc(db, "bookings", bookingId), { review: reviewData });
      
      // Push to reviews collection for vendor panel
      if (booking?.vendorId) {
        await addDoc(collection(db, "reviews"), {
          vendorId: booking.vendorId,
          bookingId: booking.id,
          userId: user?.uid || "unknown",
          userName: user?.name || "Customer",
          rating: rating,
          comment: comment,
          serviceName: booking.service,
          serviceId: booking.serviceSlug,
          createdAt: new Date(),
        });
      }

      setBooking((prev) => prev ? { ...prev, review: reviewData } : prev);
      showToast("Review submitted. Thank you!");
    } catch (err) {
      console.error(err);
      showToast("Failed to submit review.");
    }
  };

  const handleContact = (type: "call" | "message") => {
    showToast(type === "call" ? `Calling ${booking?.professional}...` : `Opening chat with ${booking?.professional}...`);
  };

  const handleDownloadInvoice = () => {
    setInvoiceLoading(true);
    setTimeout(() => { setInvoiceLoading(false); showToast("Invoice is being prepared..."); }, 1000);
  };

  if (loading) return (
    <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto space-y-4 animate-pulse">
      <div className="h-6 w-48 bg-slate-100 rounded-lg" />
      <div className="h-32 bg-slate-100 rounded-2xl" />
      <div className="h-56 bg-slate-100 rounded-2xl" />
      <div className="h-40 bg-slate-100 rounded-2xl" />
    </div>
  );

  if (!booking) return <div className="px-4 md:px-6 py-6"><BookingNotFound /></div>;

  const createdDate = new Date(booking.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto">
        <BookingHeader booking={booking} />
        <ActiveBanner booking={booking} />

        {/* Two-column layout on desktop */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left — Main Content */}
          <div className="flex-1 min-w-0 space-y-5">
            <BookingInfo booking={booking} />
            <BookingTimeline booking={booking} createdDateLabel={createdDate} />
            <CancellationPolicy booking={booking} />
          </div>

          {/* Right — Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-4">
            <PaymentSummary booking={booking} />
            <ProfessionalCard booking={booking} onContactAction={handleContact} />
            <BookingActions
              booking={booking}
              onReschedule={() => setRescheduleOpen(true)}
              onCancel={() => setCancelOpen(true)}
              onReview={() => setReviewOpen(true)}
              onContactAction={handleContact}
            />

            {/* Invoice */}
            <button
              onClick={handleDownloadInvoice}
              disabled={invoiceLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-[var(--color-border)] bg-white text-sm font-semibold text-[var(--color-foreground)] hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4 text-[var(--color-primary)]" />
              {invoiceLoading ? "Preparing invoice..." : "Download Invoice"}
            </button>

            <BookingSupport />
          </div>
        </div>
      </div>

      {/* Modals */}
      <RescheduleModal booking={booking} open={rescheduleOpen} onClose={() => setRescheduleOpen(false)} onConfirm={handleReschedule} />
      <CancelBookingModal booking={booking} open={cancelOpen} onClose={() => setCancelOpen(false)} onConfirm={handleCancel} />
      <ReviewModal booking={booking} open={reviewOpen} onClose={() => setReviewOpen(false)} onSubmit={handleReview} />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
