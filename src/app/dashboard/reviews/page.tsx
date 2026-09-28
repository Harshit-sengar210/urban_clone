"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, Star, Search, SlidersHorizontal } from "lucide-react";
import {
  DEMO_REVIEWS, DEMO_PENDING_REVIEWS, Review, PendingReview
} from "@/data/reviews";
import { ReviewStats } from "@/components/reviews/ReviewStats";
import { PendingReviewCard } from "@/components/reviews/PendingReviewCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewDrawer, DeleteReviewModal } from "@/components/reviews/ReviewModals";
import { ReviewSkeleton, ReviewEmptyState } from "@/components/reviews/ReviewEmptyState";
import { ToastContainer, useToast } from "@/components/bookings/Toast";
import { cn } from "@/lib/utils";

type Tab = "all" | "pending" | "submitted";
type SortOption = "newest" | "oldest" | "highest" | "lowest";

export default function ReviewsPage() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [pending, setPending] = useState<PendingReview[]>([]);
  
  // UI State
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  
  // Modals
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rateTarget, setRateTarget] = useState<PendingReview | null>(null);
  const [editTarget, setEditTarget] = useState<Review | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Review | null>(null);
  
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => {
      setReviews(DEMO_REVIEWS);
      setPending(DEMO_PENDING_REVIEWS);
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  // ── Stats ─────────────────────────────────────────────────────────────
  const avgRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  // ── Filters & Sort ────────────────────────────────────────────────────
  const filteredReviews = reviews.filter(r => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return r.serviceName.toLowerCase().includes(q)
      || r.professional.name.toLowerCase().includes(q)
      || r.reviewText.toLowerCase().includes(q)
      || r.bookingId.toLowerCase().includes(q);
  }).sort((a, b) => {
    if (sortOption === "highest") return b.rating - a.rating;
    if (sortOption === "lowest") return a.rating - b.rating;
    if (sortOption === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // newest
  });

  const filteredPending = pending.filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return p.serviceName.toLowerCase().includes(q)
      || p.professional.name.toLowerCase().includes(q)
      || p.bookingId.toLowerCase().includes(q);
  });

  // ── Actions ───────────────────────────────────────────────────────────
  const openRate = (p: PendingReview) => {
    setRateTarget(p);
    setEditTarget(null);
    setDrawerOpen(true);
  };

  const openEdit = (r: Review) => {
    setEditTarget(r);
    setRateTarget(null);
    setDrawerOpen(true);
  };

  const handleSaveReview = (data: Omit<Review, "id" | "createdAt" | "updatedAt" | "bookingId" | "serviceSlug" | "serviceName" | "category" | "serviceImage" | "professional">) => {
    if (editTarget) {
      // Edit
      setReviews(prev => prev.map(r => r.id === editTarget.id ? { ...r, ...data, updatedAt: new Date().toISOString() } : r));
      showToast("Review updated successfully.");
    } else if (rateTarget) {
      // Add
      const newReview: Review = {
        ...data,
        id: `review_${Date.now()}`,
        bookingId: rateTarget.bookingId,
        serviceSlug: rateTarget.serviceSlug,
        serviceName: rateTarget.serviceName,
        category: rateTarget.category,
        serviceImage: rateTarget.serviceImage,
        professional: rateTarget.professional,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setReviews(prev => [newReview, ...prev]);
      setPending(prev => prev.filter(p => p.bookingId !== rateTarget.bookingId));
      showToast("Review submitted successfully.");
    }
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setReviews(prev => prev.filter(r => r.id !== deleteTarget.id));
    showToast("Review deleted successfully.");
  };

  const serviceInfoForDrawer = editTarget
    ? { serviceName: editTarget.serviceName, professional: editTarget.professional, serviceImage: editTarget.serviceImage }
    : rateTarget
      ? { serviceName: rateTarget.serviceName, professional: rateTarget.professional, serviceImage: rateTarget.serviceImage }
      : null;

  return (
    <>
      <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <nav className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-medium mb-3">
            <Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1">
              <Home className="w-3 h-3" /> Dashboard
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-[var(--color-foreground)]">Reviews & Ratings</span>
          </nav>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-[var(--color-primary)] fill-current" />
            </div>
            <h1 className="text-2xl font-extrabold text-[var(--color-foreground)] tracking-tight">Reviews & Ratings</h1>
          </div>
          <p className="text-sm text-[var(--color-muted)] font-medium ml-[52px]">
            Share your experience and help other customers choose the right professional.
          </p>
        </motion.div>

        {loading ? (
          <ReviewSkeleton />
        ) : (
          <>
            <ReviewStats submitted={reviews.length} pending={pending.length} average={avgRating} />

            {/* Tabs & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-2 p-1 bg-slate-100 rounded-xl inline-flex w-fit">
                {(["all", "pending", "submitted"] as Tab[]).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-all",
                      activeTab === tab ? "bg-white text-[var(--color-primary)] shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {tab}
                    {tab === "pending" && pending.length > 0 && <span className="ml-1.5 text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full">{pending.length}</span>}
                    {tab === "submitted" && reviews.length > 0 && <span className="ml-1.5 text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full">{reviews.length}</span>}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search reviews..."
                    className="w-full sm:w-64 h-10 pl-9 pr-4 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                  />
                </div>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="h-10 pl-9 pr-8 rounded-xl border border-[var(--color-border)] text-sm font-semibold appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                  </select>
                  <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Pending Reviews Section */}
            {(activeTab === "all" || activeTab === "pending") && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="font-bold text-[var(--color-foreground)]">Pending Reviews</h2>
                {filteredPending.length === 0 ? (
                  <ReviewEmptyState isPending={true} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence>
                      {filteredPending.map(p => (
                        <PendingReviewCard key={p.bookingId} review={p} onRate={openRate} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}

            {/* Submitted Reviews Section */}
            {(activeTab === "all" || activeTab === "submitted") && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4">
                <h2 className="font-bold text-[var(--color-foreground)]">Your Reviews</h2>
                {filteredReviews.length === 0 ? (
                  <ReviewEmptyState isPending={false} />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <AnimatePresence>
                      {filteredReviews.map(r => (
                        <ReviewCard key={r.id} review={r} onEdit={openEdit} onDelete={setDeleteTarget} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Review Drawer */}
      <ReviewDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        serviceInfo={serviceInfoForDrawer}
        initialData={editTarget ?? undefined}
        isEditing={!!editTarget}
        onSubmit={handleSaveReview}
      />

      {/* Delete Modal */}
      <DeleteReviewModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
