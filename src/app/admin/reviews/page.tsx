"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ArrowUpDown, Download, Star, MoreHorizontal, LayoutGrid, List } from "lucide-react";
import { motion } from "framer-motion";
import { adminReviewsData, type AdminReview, type ReviewStatus } from "@/data/adminReviewsData";
import { ReviewDetailsDrawer } from "@/components/admin/reviews/ReviewDetailsDrawer";
import { useEffect } from "react";
import { db } from "@/backend/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function AdminReviewsPage() {
  const [activeTab, setActiveTab] = useState<ReviewStatus | "all">("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState<AdminReview | null>(null);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [summary, setSummary] = useState(adminReviewsData.summary);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reviews"), (snap) => {
      let total = 0, sumRating = 0, flagged = 0, pending = 0, hidden = 0, thisMonth = 0;
      const now = new Date();
      
      const loadedReviews = snap.docs.map(doc => {
        const d = doc.data();
        total++;
        sumRating += (d.rating || 0);
        
        if (d.status === "flagged") flagged++;
        if (d.status === "under_review") pending++;
        if (d.status === "hidden") hidden++;
        
        const dateVal = d.createdAt?.toDate ? d.createdAt.toDate() : new Date(d.createdAt || Date.now());
        if (dateVal.getMonth() === now.getMonth() && dateVal.getFullYear() === now.getFullYear()) {
          thisMonth++;
        }
        
        return {
          id: doc.id,
          bookingId: d.bookingId || "Unknown",
          customer: {
            id: d.customerId || "Unknown",
            name: d.customerName || "Customer"
          },
          vendor: {
            id: d.vendorId || "Unknown",
            name: d.vendorName || d.professional || "Vendor",
            rating: 0
          },
          service: {
            categoryId: d.categoryId || "Unknown",
            serviceId: d.serviceId || "Unknown",
            packageId: d.packageId || "Unknown",
            categoryName: d.categoryName || "Category",
            serviceName: d.serviceName || "Service",
            packageName: d.packageName || "Package"
          },
          rating: d.rating || 0,
          title: d.title || "",
          text: d.reviewText || d.comment || "",
          status: d.status || "published",
          verifiedBooking: d.verifiedBooking !== false,
          helpfulCount: d.helpfulCount || 0,
          reportCount: d.reportCount || 0,
          moderationReason: d.moderationReason,
          createdAt: dateVal.toISOString(),
          updatedAt: dateVal.toISOString(),
          activity: []
        } as AdminReview;
      });
      
      const averageRating = total > 0 ? Number((sumRating / total).toFixed(1)) : 0;
      setSummary({ total, averageRating, reviewsThisMonth: thisMonth, pendingModeration: pending, flagged, hidden });
      setReviews(loadedReviews);
    });
    
    return () => unsub();
  }, []);

  const filteredReviews = useMemo(() => {
    let result = reviews;
    if (activeTab !== "all") {
      result = result.filter(r => r.status === activeTab);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.id.toLowerCase().includes(q) || 
        r.customer.name.toLowerCase().includes(q) ||
        r.vendor.name.toLowerCase().includes(q) ||
        r.service.serviceName.toLowerCase().includes(q) ||
        r.text.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTab, searchQuery, reviews]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Reviews & Ratings</h1>
          <p className="text-sm text-slate-500">Monitor customer feedback, moderate reviews, and maintain marketplace quality.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors">
            <span>More Actions</span>
          </button>
          <button className="flex items-center gap-2 px-4 h-10 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm">
            <span>Moderation Queue</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Reviews", value: summary.total.toLocaleString() },
          { label: "Average Rating", value: summary.averageRating, highlight: "text-emerald-600", isStar: true },
          { label: "This Month", value: summary.reviewsThisMonth.toLocaleString() },
          { label: "Pending Moderation", value: summary.pendingModeration, highlight: "text-amber-600" },
          { label: "Flagged Reviews", value: summary.flagged, highlight: "text-rose-600" },
          { label: "Hidden Reviews", value: summary.hidden },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <h3 className={`text-xl font-bold tracking-tight flex items-center gap-1 ${stat.highlight || 'text-[#0A192F]'}`}>
              {stat.value}
              {stat.isStar && <Star className="w-5 h-5 fill-emerald-600 text-emerald-600" />}
            </h3>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto hide-scrollbar">
        {(["all", "published", "flagged", "under_review", "hidden", "resolved"] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-bold capitalize whitespace-nowrap transition-colors relative ${
              activeTab === tab ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.replace('_', ' ')}
            {activeTab === tab && (
              <motion.div 
                layoutId="reviewsTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]" 
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search review, customer, vendor, service, booking..."
              className="w-full pl-9 pr-4 h-10 bg-white border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto hide-scrollbar">
            <button className="flex items-center gap-2 px-3 h-10 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm whitespace-nowrap">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="flex items-center gap-2 px-3 h-10 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm whitespace-nowrap">
              <ArrowUpDown className="w-4 h-4" /> Sort
            </button>
          </div>
        </div>
        <div className="flex items-center bg-slate-100 rounded-lg p-1 self-start sm:self-auto hidden sm:flex">
          <button 
            onClick={() => setViewMode("table")}
            className={`p-1.5 rounded-md transition-colors ${viewMode === "table" ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Shell for Partial Checkpoint */}
      {viewMode === "table" ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/3">Review</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer & Vendor</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Rating</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => (
                  <tr 
                    key={review.id} 
                    onClick={() => setSelectedReview(review)}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <p className="text-sm font-bold text-[#0A192F] mb-1">{review.title || 'No Title'}</p>
                      <p className="text-xs text-slate-600 line-clamp-2">{review.text}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-bold text-slate-700">{review.customer.name}</p>
                      <p className="text-xs text-slate-500 font-medium">To: {review.vendor.name}</p>
                      <p className="text-[10px] text-slate-400">{review.service.serviceName}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Star className={`w-4 h-4 ${review.rating >= 1 ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                        <span className="text-sm font-bold ml-1">{review.rating}.0</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${
                        review.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        review.status === 'flagged' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        review.status === 'under_review' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        {review.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-slate-700">{new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Grid Mockup */}
           {filteredReviews.map((review) => (
             <div 
              key={review.id} 
              onClick={() => setSelectedReview(review)}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
             >
               <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                     {review.customer.name.charAt(0)}
                   </div>
                   <div>
                     <p className="text-sm font-bold text-[#0A192F] leading-none">{review.customer.name}</p>
                     <p className="text-[10px] text-slate-500 mt-1">{new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded text-amber-700">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold">{review.rating}.0</span>
                 </div>
               </div>
               <p className="text-sm font-bold text-slate-800 mb-1">{review.title}</p>
               <p className="text-sm text-slate-600 line-clamp-3 mb-4">{review.text}</p>
               <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                 <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${
                    review.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    review.status === 'flagged' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                    review.status === 'under_review' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-slate-50 text-slate-700 border-slate-200'
                  }`}>
                    {review.status.replace('_', ' ')}
                  </span>
                  <button className="text-[11px] font-bold text-[var(--color-primary)] hover:underline">View Details</button>
               </div>
             </div>
           ))}
        </div>
      )}

      <ReviewDetailsDrawer
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
        onUpdateStatus={(status) => {
          console.log("Update status to", status);
          setSelectedReview(null);
        }}
      />
    </div>
  );
}
