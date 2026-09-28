"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Booking, BookingStatus } from "@/data/bookings";
import { BookingsPageHeader } from "@/components/bookings/BookingsPageHeader";
import { BookingStats } from "@/components/bookings/BookingStats";
import { BookingTabs } from "@/components/bookings/BookingTabs";
import { BookingFilters } from "@/components/bookings/BookingFilters";
import { BookingCard } from "@/components/bookings/BookingCard";
import { BookingSkeleton } from "@/components/bookings/BookingSkeleton";
import { BookingEmptyState } from "@/components/bookings/BookingEmptyState";
import { RescheduleModal } from "@/components/bookings/RescheduleModal";
import { CancelBookingModal } from "@/components/bookings/CancelBookingModal";
import { ReviewModal } from "@/components/bookings/ReviewModal";
import { ToastContainer, useToast } from "@/components/bookings/Toast";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/backend/firebase";

const TAB_STATUS_MAP: Record<string, BookingStatus[]> = {
  all:         [],
  upcoming:    ["confirmed", "assigned", "rescheduled"],
  in_progress: ["on_the_way", "in_progress"],
  completed:   ["completed"],
  cancelled:   ["cancelled", "pending_payment"],
};

function BookingsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useCurrentUser();

  const initialTab = searchParams.get("status") ?? "all";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest First");
  const [dateFilter, setDateFilter] = useState("All Dates");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState<Booking[]>([]);

  // Modal state
  const [rescheduleTarget, setRescheduleTarget] = useState<Booking | null>(null);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [reviewTarget, setReviewTarget] = useState<Booking | null>(null);

  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(docSnap => {
        const d = docSnap.data();
        const dateVal = d.date?.toDate ? d.date.toDate() : d.date ? new Date(d.date) : null;
        const createdVal = d.createdAt?.toDate ? d.createdAt.toDate() : new Date();
        return {
          id: docSnap.id,
          service: d.service || d.serviceName || "Service",
          category: d.category || "Uncategorized",
          image: d.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
          date: dateVal ? dateVal.toISOString() : new Date().toISOString(),
          time: d.time || "Not set",
          status: d.status || "confirmed",
          amount: d.amount || d.price || (d.variant?.price) || 0,
          professional: d.professional || "Assigning...",
          paymentStatus: d.paymentStatus || "pending",
          address: typeof d.address === 'object' && d.address !== null ? d.address.fullAddress : d.address || "Unknown Address",
          addressType: typeof d.address === 'object' && d.address !== null ? d.address.type : d.addressType || "Home",
          createdAt: createdVal.toISOString(),
          review: d.review || undefined
        } as Booking;
      });
      setBookings(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    });

    return () => unsub();
  }, [user?.uid]);

  // Sync tab to URL
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const url = tab === "all" ? "/dashboard/bookings" : `/dashboard/bookings?status=${tab}`;
    router.replace(url, { scroll: false });
  };

  const hasActiveFilters = search !== "" || dateFilter !== "All Dates" || categoryFilter !== "All Categories";

  const clearFilters = () => {
    setSearch("");
    setDateFilter("All Dates");
    setCategoryFilter("All Categories");
  };

  // Filtering
  const filtered = useMemo(() => {
    let list = [...bookings];

    // Tab filter
    const statuses = TAB_STATUS_MAP[activeTab];
    if (statuses && statuses.length > 0) {
      list = list.filter((b) => statuses.includes(b.status));
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((b) =>
        b.service.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        (b.professional ?? "").toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (categoryFilter !== "All Categories") {
      list = list.filter((b) => b.category === categoryFilter);
    }

    // Sort
    if (sort === "Newest First")     list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    if (sort === "Oldest First")     list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    if (sort === "Highest Amount")   list.sort((a, b) => b.amount - a.amount);
    if (sort === "Lowest Amount")    list.sort((a, b) => a.amount - b.amount);
    if (sort === "Upcoming First")   list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return list;
  }, [bookings, activeTab, search, categoryFilter, sort]);

  // Handlers
  const handleCancel = async (bookingId: string) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        status: "cancelled",
        paymentStatus: "refunded" // simplifying for demo
      });
      showToast("Booking cancelled successfully.");
    } catch (err) {
      console.error(err);
      showToast("Failed to cancel booking.");
    }
  };

  const handleReschedule = async (bookingId: string, date: string, time: string) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        date: new Date(date),
        time: time,
        status: "rescheduled"
      });
      showToast("Booking rescheduled successfully.");
    } catch (err) {
      console.error(err);
      showToast("Failed to reschedule booking.");
    }
  };

  const handleReview = async (bookingId: string, rating: number, comment: string) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        review: {
          rating,
          comment,
          submittedAt: new Date().toISOString()
        }
      });
      showToast("Review submitted. Thank you!");
    } catch (err) {
      console.error(err);
      showToast("Failed to submit review.");
    }
  };

  return (
    <>
      <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto">
        <BookingsPageHeader />
        <BookingStats bookings={bookings} />
        <BookingTabs active={activeTab} onChange={handleTabChange} />
        <BookingFilters
          search={search} onSearchChange={setSearch}
          sort={sort} onSortChange={setSort}
          dateFilter={dateFilter} onDateFilterChange={setDateFilter}
          categoryFilter={categoryFilter} onCategoryFilterChange={setCategoryFilter}
          onClear={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Results */}
        {loading ? (
          <BookingSkeleton />
        ) : filtered.length === 0 ? (
          <BookingEmptyState tab={activeTab} />
        ) : (
          <div className="space-y-4">
            {filtered.map((booking, i) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                index={i}
                onReschedule={(b) => setRescheduleTarget(b)}
                onCancel={(b) => setCancelTarget(b)}
                onReview={(b) => setReviewTarget(b)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <RescheduleModal
        booking={rescheduleTarget}
        open={!!rescheduleTarget}
        onClose={() => setRescheduleTarget(null)}
        onConfirm={handleReschedule}
      />
      <CancelBookingModal
        booking={cancelTarget}
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancel}
      />
      <ReviewModal
        booking={reviewTarget}
        open={!!reviewTarget}
        onClose={() => setReviewTarget(null)}
        onSubmit={handleReview}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}

export default function MyBookingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading bookings...</div>}>
      <BookingsPageContent />
    </Suspense>
  );
}
