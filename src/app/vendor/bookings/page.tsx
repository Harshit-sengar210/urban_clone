"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { collection, query, where, onSnapshot, or, orderBy } from "firebase/firestore";
import { db } from "@/backend/firebase";

import { VendorLayout } from "@/components/vendor-dashboard/VendorLayout";
import { BookingSummaryCards } from "@/components/vendor-bookings/BookingSummaryCards";
import { BookingStatusTabs, BookingTab } from "@/components/vendor-bookings/BookingStatusTabs";
import { BookingToolbar } from "@/components/vendor-bookings/BookingToolbar";
import { BookingList } from "@/components/vendor-bookings/BookingList";
import { BookingDetailsDrawer } from "@/components/vendor-bookings/BookingDetailsDrawer";
import { 
  RejectBookingModal, 
  CancelBookingModal, 
  StartServiceModal, 
  CompleteServiceModal 
} from "@/components/vendor-bookings/BookingActionModals";

import { VendorBooking, BookingStatus } from "@/types/vendor";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function VendorBookingsPage() {
  const { user } = useCurrentUser();
  const [bookings, setBookings] = useState<VendorBooking[]>([]);

  useEffect(() => {
    if (!user?.uid) return;

    // Fetch both pending bookings (open to any vendor) and bookings explicitly assigned to this vendor
    const q = query(
      collection(db, "bookings"),
      or(
        where("status", "==", "pending"),
        where("vendorId", "==", user.uid)
      )
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(docSnap => {
        const d = docSnap.data();
        const dateVal = d.date?.toDate ? d.date.toDate() : d.date ? new Date(d.date) : new Date();
        const createdVal = d.createdAt?.toDate ? d.createdAt.toDate() : new Date();

        let loc = "Unknown Location";
        if (typeof d.address === 'object' && d.address !== null) {
          loc = d.address.fullAddress;
        } else if (typeof d.address === 'string') {
          loc = d.address;
        }

        return {
          id: docSnap.id,
          customerName: d.userName || "Customer",
          serviceName: d.serviceName || d.service || "Service",
          customerPhone: d.userPhone || d.phone || d.customerPhone || "+91 XXXXX XXXXX",
          location: loc,
          date: dateVal instanceof Date ? dateVal.toISOString() : dateVal,
          startTime: d.time || "Not set",
          endTime: "TBD",
          status: d.status || "pending",
          amount: d.variant?.price ? Math.floor(d.variant.price * 0.8) : (d.amount || d.price || 0),
          createdAt: createdVal.toISOString(),
        } as VendorBooking;
      });

      // Optionally, sort descending in JS since Firestore requires a composite index for OR + orderBy
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setBookings(data);
    });

    return () => unsub();
  }, [user?.uid]);
  
  // Filtering & Sorting State
  const [activeTab, setActiveTab] = useState<BookingTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Modals & Drawers State
  const [selectedBooking, setSelectedBooking] = useState<VendorBooking | null>(null);

  // Keep selectedBooking synced with real-time Firestore updates
  useEffect(() => {
    if (selectedBooking) {
      const updated = bookings.find(b => b.id === selectedBooking.id);
      if (updated && JSON.stringify(updated) !== JSON.stringify(selectedBooking)) {
        setSelectedBooking(updated);
      }
    }
  }, [bookings, selectedBooking]);
  
  const [actionBooking, setActionBooking] = useState<{ booking: VendorBooking, action: "reject" | "cancel" | "start" | "complete" } | null>(null);
  const [isSubmittingModal, setIsSubmittingModal] = useState(false);

  // Global Toast
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Derived State (Counts)
  const counts = useMemo(() => {
    const res: Record<BookingTab, number> = {
      all: bookings.length,
      pending: 0,
      confirmed: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
    };
    bookings.forEach(b => {
      const statusKey = b.status === "rescheduled" ? "pending" : b.status as BookingTab;
      if (res[statusKey] !== undefined) res[statusKey]++;
    });
    return res;
  }, [bookings]);

  // Derived State (Filtered & Sorted Bookings)
  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    // Tab Filter
    if (activeTab !== "all") {
      result = result.filter(b => {
        const mappedStatus = b.status === "rescheduled" ? "pending" : b.status;
        return mappedStatus === activeTab;
      });
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.customerName.toLowerCase().includes(q) || 
        b.serviceName.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q)
      );
    }

    // Date Filter
    if (dateFilter) {
      result = result.filter(b => b.date === dateFilter);
    }

    // Service Filter
    if (serviceFilter !== "all") {
      result = result.filter(b => b.serviceName === serviceFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "price_desc":
          return b.amount - a.amount;
        case "price_asc":
          return a.amount - b.amount;
        case "recent":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return result;
  }, [bookings, activeTab, searchQuery, dateFilter, serviceFilter, sortBy]);

  const uniqueServices = useMemo(() => {
    return Array.from(new Set(bookings.map(b => b.serviceName)));
  }, [bookings]);

  // Handlers
  const handleAccept = async (booking: VendorBooking) => {
    // Show local optimistic update
    setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: "confirmed" } : b));
    if (selectedBooking?.id === booking.id) {
      setSelectedBooking(prev => prev ? { ...prev, status: "confirmed" } : prev);
    }
    showToast("Booking accepted successfully.");
    
    // Update in Firestore
    try {
      await import("firebase/firestore").then(({ updateDoc, doc }) => {
        return updateDoc(doc(db, "bookings", booking.id), {
          status: "confirmed",
          vendorId: user?.uid,
          professional: user?.name || "Professional",
        });
      });
    } catch (e) {
      console.error("Failed to accept booking", e);
    }
  };

  const handleOnTheWay = async (booking: VendorBooking) => {
    setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: "on_the_way" } : b));
    if (selectedBooking?.id === booking.id) {
      setSelectedBooking(prev => prev ? { ...prev, status: "on_the_way" } : prev);
    }
    showToast("Status updated to On The Way.");
    
    try {
      await import("firebase/firestore").then(({ updateDoc, doc }) => {
        return updateDoc(doc(db, "bookings", booking.id), {
          status: "on_the_way",
        });
      });
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const handleModalConfirm = (data?: any) => {
    if (!actionBooking) return;
    setIsSubmittingModal(true);
    
    setTimeout(() => {
      setBookings(prev => prev.map(b => {
        if (b.id !== actionBooking.booking.id) return b;
        
        let newStatus: BookingStatus = b.status;
        if (actionBooking.action === "reject") newStatus = "rejected";
        if (actionBooking.action === "cancel") newStatus = "cancelled";
        if (actionBooking.action === "start") newStatus = "in_progress";
        if (actionBooking.action === "complete") newStatus = "completed";
        
        // In a real app we'd save the reason
        return { ...b, status: newStatus };
      }));
      
      // Update selected booking if drawer is open
      if (selectedBooking && selectedBooking.id === actionBooking.booking.id) {
        let newStatus: BookingStatus = selectedBooking.status;
        if (actionBooking.action === "reject") newStatus = "rejected";
        if (actionBooking.action === "cancel") newStatus = "cancelled";
        if (actionBooking.action === "start") newStatus = "in_progress";
        if (actionBooking.action === "complete") newStatus = "completed";
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }

      // Actual database updates
      import("firebase/firestore").then(({ updateDoc, doc }) => {
        let newStatus: BookingStatus = actionBooking.booking.status;
        if (actionBooking.action === "reject") newStatus = "rejected";
        if (actionBooking.action === "cancel") newStatus = "cancelled";
        if (actionBooking.action === "start") newStatus = "in_progress";
        if (actionBooking.action === "complete") newStatus = "completed";

        updateDoc(doc(db, "bookings", actionBooking.booking.id), {
          status: newStatus,
          ...(newStatus === "cancelled" || newStatus === "rejected" ? { cancellationReason: data || "" } : {}),
          ...(newStatus === "in_progress" || newStatus === "completed" ? { vendorId: user?.uid, professional: user?.name || "Professional" } : {}),
          ...(newStatus === "completed" && data ? {
            paymentStatus: "paid",
            paymentMethod: data.paymentType === "cash" ? "cod" : "upi",
            amountCollected: Number(data.amountCollected) || 0,
            paymentScreenshot: data.screenshotBase64 || null
          } : {})
        }).catch(err => console.error("Error updating booking", err));
      });

      setIsSubmittingModal(false);
      
      const toastMsgs = {
        reject: "Booking rejected successfully.",
        cancel: "Booking cancelled successfully.",
        start: "Service started successfully.",
        complete: "Booking marked as completed."
      };
      showToast(toastMsgs[actionBooking.action]);
      
      setActionBooking(null);
    }, 600);
  };

  return (
    <VendorLayout>
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            Bookings
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Manage your service requests, upcoming appointments, and completed bookings.
          </p>
        </motion.div>
        
        <BookingSummaryCards 
          pendingCount={counts.pending}
          confirmedCount={counts.confirmed}
          completedCount={counts.completed}
          cancelledCount={counts.cancelled}
        />

        <div className="space-y-4">
          <BookingStatusTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            counts={counts} 
          />

          <BookingToolbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            serviceFilter={serviceFilter}
            setServiceFilter={setServiceFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            uniqueServices={uniqueServices}
          />

          <BookingList 
            bookings={filteredBookings}
            onViewDetails={(b) => setSelectedBooking(b)}
            onAccept={handleAccept}
            onReject={(b) => setActionBooking({ booking: b, action: "reject" })}
            onOnTheWay={handleOnTheWay}
            onStartService={(b) => setActionBooking({ booking: b, action: "start" })}
            onCompleteService={(b) => setActionBooking({ booking: b, action: "complete" })}
            onCancel={(b) => setActionBooking({ booking: b, action: "cancel" })}
            onContact={() => showToast("Contacting customer...")}
            onClearFilters={() => {
              setSearchQuery("");
              setDateFilter("");
              setServiceFilter("all");
            }}
          />
        </div>

      </div>

      {/* Drawers & Modals */}
      <BookingDetailsDrawer 
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onAccept={handleAccept}
        onReject={(b) => setActionBooking({ booking: b, action: "reject" })}
        onOnTheWay={handleOnTheWay}
        onStartService={(b) => setActionBooking({ booking: b, action: "start" })}
        onCompleteService={(b) => setActionBooking({ booking: b, action: "complete" })}
        onCancel={(b) => setActionBooking({ booking: b, action: "cancel" })}
        onContact={() => showToast("Contacting customer...")}
      />

      <RejectBookingModal 
        isOpen={actionBooking?.action === "reject"}
        onClose={() => setActionBooking(null)}
        onConfirm={handleModalConfirm}
        isSubmitting={isSubmittingModal}
      />

      <CancelBookingModal 
        isOpen={actionBooking?.action === "cancel"}
        onClose={() => setActionBooking(null)}
        onConfirm={handleModalConfirm}
        isSubmitting={isSubmittingModal}
      />

      <StartServiceModal 
        isOpen={actionBooking?.action === "start"}
        onClose={() => setActionBooking(null)}
        onConfirm={handleModalConfirm}
        isSubmitting={isSubmittingModal}
      />

      <CompleteServiceModal 
        isOpen={actionBooking?.action === "complete"}
        onClose={() => setActionBooking(null)}
        onConfirm={handleModalConfirm}
        isSubmitting={isSubmittingModal}
      />

      {/* Global Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2 border border-slate-700 whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </VendorLayout>
  );
}
