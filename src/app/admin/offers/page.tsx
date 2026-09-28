"use client";

import { useState, useMemo } from "react";
import { Plus, MoreHorizontal, Search, Filter, ArrowUpDown, Tag, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { adminOffersData, type AdminOffer } from "@/data/adminOffersData";
import { CreateOfferDrawer } from "@/components/admin/offers/CreateOfferDrawer";
import { OfferDetailsDrawer } from "@/components/admin/offers/OfferDetailsDrawer";

export default function AdminOffersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<AdminOffer | null>(null);
  const [offerToEdit, setOfferToEdit] = useState<AdminOffer | null>(null);
  
  const filteredOffers = useMemo(() => {
    let result = adminOffersData.offers;
    if (activeTab !== "all") {
      result = result.filter(o => o.status === activeTab);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(o => 
        o.name.toLowerCase().includes(q) || 
        o.code.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTab, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Offers & Promotions</h1>
          <p className="text-sm text-slate-500">Create, manage, and monitor promotional offers across the marketplace.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors hidden sm:block">
            More Actions
          </button>
          <button 
            onClick={() => {
              setOfferToEdit(null);
              setIsCreateDrawerOpen(true);
            }}
            className="flex justify-center items-center gap-2 px-4 h-10 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Offer</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Offers", value: adminOffersData.summary.total.toLocaleString() },
          { label: "Active Offers", value: adminOffersData.summary.active, highlight: "text-[var(--color-primary)]" },
          { label: "Scheduled", value: adminOffersData.summary.scheduled },
          { label: "Drafts", value: adminOffersData.summary.drafts },
          { label: "Redemptions", value: adminOffersData.summary.redemptions.toLocaleString() },
          { label: "Discount Given", value: `₹${(adminOffersData.summary.discountGiven/100000).toFixed(2)}L` },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <h3 className={`text-xl font-bold tracking-tight ${stat.highlight || 'text-[#0A192F]'}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto hide-scrollbar">
        {(["all", "active", "scheduled", "draft", "paused", "expired", "archived"]).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-bold capitalize whitespace-nowrap transition-colors relative ${
              activeTab === tab ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="offersTab"
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
              placeholder="Search offer name or coupon code..."
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

      {/* Offers Table */}
      {viewMode === "table" ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Offer</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Code</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Discount</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Validity</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Usage</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffers.map((offer) => (
                  <tr 
                    key={offer.id} 
                    onClick={() => setSelectedOffer(offer)}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <p className="text-sm font-bold text-[#0A192F]">{offer.name}</p>
                      <p className="text-xs text-slate-500">{offer.description}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold tracking-wider text-slate-700 font-mono">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {offer.code}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-bold text-emerald-600">
                        {offer.discountType === "percentage" ? `${offer.discountValue}% OFF` : `₹${offer.discountValue} OFF`}
                      </p>
                      {offer.maximumDiscount && <p className="text-[10px] text-slate-500 font-medium">Up to ₹{offer.maximumDiscount}</p>}
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-slate-700">{new Date(offer.validity.startDate).toLocaleDateString()} → {new Date(offer.validity.endDate).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[var(--color-primary)]" 
                            style={{ width: `${Math.min(100, (offer.usageCount / offer.eligibility.totalUsageLimit) * 100)}%` }} 
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-500">{offer.usageCount} / {offer.eligibility.totalUsageLimit}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${
                        offer.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        offer.status === 'scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        offer.status === 'draft' ? 'bg-slate-50 text-slate-700 border-slate-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {offer.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredOffers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-sm text-slate-500">
                      No offers match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <div 
              key={offer.id} 
              onClick={() => setSelectedOffer(offer)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="p-6 border-b border-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                <span className={`inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border mb-3 ${
                  offer.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  offer.status === 'scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  offer.status === 'draft' ? 'bg-slate-50 text-slate-700 border-slate-200' :
                  'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {offer.status}
                </span>
                <h3 className="text-lg font-bold text-[#0A192F] mb-1">{offer.name}</h3>
                <p className="text-sm font-bold text-emerald-600 mb-4">
                  {offer.discountType === "percentage" ? `${offer.discountValue}% OFF` : `₹${offer.discountValue} OFF`}
                  {offer.maximumDiscount && <span className="text-slate-500 text-xs font-medium ml-1">(Up to ₹{offer.maximumDiscount})</span>}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold tracking-wider text-slate-800 font-mono">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {offer.code}
                </div>
              </div>
              <div className="p-4 bg-slate-50/50 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Validity</span>
                  <span className="font-medium text-slate-700">{new Date(offer.validity.startDate).toLocaleDateString('en-GB', {day: 'numeric', month: 'short'})} → {new Date(offer.validity.endDate).toLocaleDateString('en-GB', {day: 'numeric', month: 'short'})}</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500">Usage Progress</span>
                    <span className="font-medium text-slate-700">{offer.usageCount} / {offer.eligibility.totalUsageLimit}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--color-primary)]" 
                      style={{ width: `${Math.min(100, (offer.usageCount / offer.eligibility.totalUsageLimit) * 100)}%` }} 
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100">
                <button className="w-full py-2 text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateOfferDrawer 
        isOpen={isCreateDrawerOpen}
        offerToEdit={offerToEdit}
        onClose={() => {
          setIsCreateDrawerOpen(false);
          setOfferToEdit(null);
        }}
        onSave={(data) => {
          console.log("Saving offer:", data);
          setIsCreateDrawerOpen(false);
          setOfferToEdit(null);
          // In a real app, this would dispatch an action or make an API call
        }}
      />

      <OfferDetailsDrawer 
        offer={selectedOffer}
        onClose={() => setSelectedOffer(null)}
        onEdit={(offer) => {
          setOfferToEdit(offer);
          setIsCreateDrawerOpen(true);
          setSelectedOffer(null);
        }}
        onDelete={(offerId) => {
          console.log("Deleting offer:", offerId);
          // Typically you'd show a confirmation modal then make API call
          setSelectedOffer(null);
        }}
      />
    </div>
  );
}
