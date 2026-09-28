"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, MessageSquare, CheckCircle2, Star, Search } from "lucide-react";

import { VendorLayout } from "@/components/vendor-dashboard/VendorLayout";
import { RatingOverview } from "@/components/vendor-reviews/RatingOverview";
import { RatingTrendChart } from "@/components/vendor-reviews/RatingTrendChart";
import { ServiceRatings } from "@/components/vendor-reviews/ServiceRatings";
import { FeedbackThemes } from "@/components/vendor-reviews/FeedbackThemes";
import { ReviewFilterToolbar, ReviewFilters } from "@/components/vendor-reviews/ReviewFilterToolbar";
import { ReviewCard } from "@/components/vendor-reviews/ReviewCard";
import { ReviewDrawer } from "@/components/vendor-reviews/ReviewDrawer";

import { VendorReview, RatingDistribution, ServiceRatingSummary, ReviewTrendPoint } from "@/types/vendor";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { db } from "@/backend/firebase";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";

const DEFAULT_FILTERS: ReviewFilters = {
  search: "",
  rating: null,
  serviceId: null,
  replyStatus: "all",
  sortBy: "newest",
};

export default function VendorReviewsPage() {
  const { user } = useCurrentUser();
  const [reviews, setReviews] = useState<VendorReview[]>([]);
  const [filters, setFilters] = useState<ReviewFilters>(DEFAULT_FILTERS);
  const [selectedReview, setSelectedReview] = useState<VendorReview | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [ratingDistribution, setRatingDistribution] = useState<RatingDistribution[]>([
    { rating: 5, count: 0, percentage: 0 },
    { rating: 4, count: 0, percentage: 0 },
    { rating: 3, count: 0, percentage: 0 },
    { rating: 2, count: 0, percentage: 0 },
    { rating: 1, count: 0, percentage: 0 },
  ]);
  const [serviceRatings, setServiceRatings] = useState<ServiceRatingSummary[]>([]);
  const [averageRating, setAverageRating] = useState(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "reviews"),
      where("vendorId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rawReviews: VendorReview[] = [];
      const dist = [0, 0, 0, 0, 0];
      const srvMap = new Map<string, { sum: number, count: number, name: string }>();
      let totalSum = 0;

      snapshot.forEach(docSnap => {
        const d = docSnap.data();
        const rating = (d.rating || 5) as 1|2|3|4|5;
        dist[rating - 1]++;
        totalSum += rating;

        const dateVal = d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : new Date().toISOString();

        rawReviews.push({
          id: docSnap.id,
          customerDisplayName: d.userName || "Customer",
          customerAvatarColor: "bg-indigo-100 text-indigo-700",
          rating,
          reviewText: d.comment || "",
          serviceName: d.serviceName || "Service",
          serviceId: d.serviceId || "srv_1",
          createdAt: dateVal,
          reply: d.reply ? { text: d.reply.text, createdAt: d.reply.createdAt } : undefined,
        });

        const sId = d.serviceId || "srv_1";
        const sName = d.serviceName || "Service";
        if (!srvMap.has(sId)) srvMap.set(sId, { sum: 0, count: 0, name: sName });
        srvMap.get(sId)!.sum += rating;
        srvMap.get(sId)!.count++;
      });

      const total = rawReviews.length;
      setAverageRating(total > 0 ? Number((totalSum / total).toFixed(1)) : 0);

      const newDist: RatingDistribution[] = [5, 4, 3, 2, 1].map(r => ({
        rating: r as 1|2|3|4|5,
        count: dist[r - 1],
        percentage: total > 0 ? Math.round((dist[r - 1] / total) * 100) : 0
      }));
      setRatingDistribution(newDist);

      const newServiceRatings: ServiceRatingSummary[] = Array.from(srvMap.entries()).map(([sId, val]) => ({
        serviceId: sId,
        serviceName: val.name,
        averageRating: Number((val.sum / val.count).toFixed(1)),
        reviewCount: val.count,
        trend: "stable"
      }));
      setServiceRatings(newServiceRatings);

      setReviews(rawReviews);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  // Sync external rating/service filter clicks back into the toolbar
  const setRatingFilter = (rating: number | null) => setFilters(f => ({ ...f, rating }));
  const setServiceFilter = (serviceId: string | null) => setFilters(f => ({ ...f, serviceId }));

  const notRepliedCount = reviews.filter(r => !r.reply).length;

  // Filtered + sorted reviews
  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(r =>
        r.reviewText.toLowerCase().includes(q) ||
        r.customerDisplayName.toLowerCase().includes(q) ||
        r.serviceName.toLowerCase().includes(q)
      );
    }
    if (filters.rating !== null) result = result.filter(r => r.rating === filters.rating);
    if (filters.serviceId !== null) result = result.filter(r => r.serviceId === filters.serviceId);
    if (filters.replyStatus === "replied") result = result.filter(r => !!r.reply);
    if (filters.replyStatus === "not_replied") result = result.filter(r => !r.reply);

    result.sort((a, b) => {
      if (filters.sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (filters.sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (filters.sortBy === "highest") return b.rating - a.rating;
      if (filters.sortBy === "lowest") return a.rating - b.rating;
      return 0;
    });

    return result;
  }, [reviews, filters]);

  const handleReplySubmit = async (reviewId: string, text: string) => {
    const now = new Date().toISOString();
    
    // Save reply to firestore
    try {
      await updateDoc(doc(db, "reviews", reviewId), {
        reply: text.trim() ? {
          text,
          createdAt: now
        } : null
      });
      showToast(text.trim() ? "Reply posted successfully." : "Reply removed.");
    } catch (e) {
      console.error("Failed to post reply", e);
      showToast("Failed to post reply");
      return;
    }

    // Refresh selected review local state
    setSelectedReview(prev => {
      if (!prev || prev.id !== reviewId) return prev;
      const now = new Date().toISOString();
      return {
        ...prev,
        reply: {
          text,
          createdAt: prev.reply?.createdAt ?? now,
          updatedAt: prev.reply ? now : undefined,
        }
      };
    });
  const serviceOptions = serviceRatings.map(s => ({ id: s.serviceId, name: s.serviceName }));

  return (
    <VendorLayout>
      <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Reviews & Ratings</h1>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full">Demo Data</span>
            </div>
            <p className="text-slate-500 font-medium text-sm">Understand customer feedback and manage your professional reputation.</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Eye className="w-4 h-4" /> View Public Profile
          </button>
        </motion.div>

        {/* ── Quick Stats Row ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Reviews", value: reviews.length, icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Average Rating", value: `${averageRating} ★`, icon: Star, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Awaiting Reply", value: notRepliedCount, icon: MessageSquare, color: "text-orange-600", bg: "bg-orange-50", onClick: () => setFilters(f => ({ ...f, replyStatus: "not_replied" })) },
            { label: "5-Star Reviews", value: ratingDistribution.find(d => d.rating === 5)?.count ?? 0, icon: Star, color: "text-emerald-600", bg: "bg-emerald-50", onClick: () => setRatingFilter(5) },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              onClick={stat.onClick}
              className={`bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3 ${stat.onClick ? "cursor-pointer hover:shadow-md hover:border-indigo-100 transition-all" : ""}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                <div className="text-xl font-black text-slate-900">{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

          {/* ── Left Column — Review List ── */}
          <div className="space-y-5">

            <RatingOverview
              averageRating={averageRating}
              totalReviews={reviews.length}
              distribution={ratingDistribution}
              activeFilter={filters.rating}
              onFilterByRating={setRatingFilter}
            />

            {/* Filter Toolbar */}
            <ReviewFilterToolbar
              filters={filters}
              onChange={setFilters}
              serviceOptions={serviceOptions}
              notRepliedCount={notRepliedCount}
            />

            {/* Result count */}
            <div className="flex items-center justify-between px-1">
              <p className="text-sm font-bold text-slate-500">
                {filteredReviews.length} review{filteredReviews.length !== 1 ? "s" : ""}
                {filteredReviews.length !== reviews.length ? ` of ${reviews.length}` : ""}
              </p>
            </div>

            {/* Review List */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review, i) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      index={i}
                      onClick={() => setSelectedReview(review)}
                    />
                  ))
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="py-16 text-center bg-white rounded-2xl border border-slate-100 shadow-sm"
                  >
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">No reviews match your filters</h3>
                    <p className="text-slate-400 text-sm mb-5">Try adjusting or clearing your active filters.</p>
                    <button
                      onClick={() => setFilters(DEFAULT_FILTERS)}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right Column — Analytics Sidebar ── */}
          <div className="space-y-5">
            {/* Real trend data could go here, for now it's empty if no real data */}
            <ServiceRatings
              services={serviceRatings}
              activeServiceId={filters.serviceId}
              onFilter={setServiceFilter}
            />
            {/* Mock Feedback themes removed since no real themes data yet */}
          </div>
        </div>
      </div>

      {/* ── Review Drawer ── */}
      <ReviewDrawer
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
        onReplySubmit={handleReplySubmit}
      />

      {/* ── Toast ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2 border border-slate-700 whitespace-nowrap pointer-events-none"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </VendorLayout>
  );
}
