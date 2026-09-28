"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Mail, Phone, Calendar, Clock, Star, AlertCircle, Edit, MoreVertical } from "lucide-react";
import Image from "next/image";
import type { AdminVendor, VendorService, VendorBooking, VendorReview, VendorEarnings } from "@/data/adminVendorsData";

export function VendorProfileDrawer({
  vendor,
  onClose,
  services,
  bookings,
  reviews,
  earnings,
  onSuspend,
  onRestore,
  onViewApplication
}: {
  vendor: AdminVendor | null;
  onClose: () => void;
  services: VendorService[];
  bookings: VendorBooking[];
  reviews: VendorReview[];
  earnings: VendorEarnings;
  onSuspend: (vendor: AdminVendor) => void;
  onRestore: (vendor: AdminVendor) => void;
  onViewApplication: (vendor: AdminVendor) => void;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "services" | "bookings" | "reviews" | "earnings">("overview");

  if (!vendor) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150] flex justify-end"
        onClick={onClose}
      >
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0A192F]">Vendor Profile</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                <Edit className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Profile Header */}
            <div className="p-6 border-b border-slate-100 flex flex-col items-center text-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 bg-slate-100 flex items-center justify-center font-bold text-3xl text-slate-300">
                {vendor.avatar ? <Image src={vendor.avatar} alt={vendor.name} fill className="object-cover" /> : vendor.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-[#0A192F] mb-1">{vendor.name}</h3>
              <p className="text-sm font-bold text-slate-700 mb-1">{vendor.businessName}</p>
              <p className="text-xs text-slate-500 mb-4">#{vendor.id} &bull; {vendor.status.toUpperCase()}</p>
              
              <div className="flex gap-2">
                {vendor.status === "approved" && (
                  <button onClick={() => onSuspend(vendor)} className="px-4 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-amber-100 transition-colors">
                    Suspend
                  </button>
                )}
                {vendor.status === "suspended" && (
                  <button onClick={() => onRestore(vendor)} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-emerald-100 transition-colors">
                    Restore
                  </button>
                )}
                <button onClick={() => onViewApplication(vendor)} className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-blue-100 transition-colors">
                  View Details
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 overflow-x-auto hide-scrollbar sticky top-0 bg-white z-10 px-2">
              {(["overview", "services", "bookings", "reviews", "earnings"] as const).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-bold capitalize transition-colors relative ${
                    activeTab === tab ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="vendorProfileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Needs Changes Notice */}
                  {vendor.status === "needs_changes" && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-amber-800 mb-1">Changes Requested</h4>
                        <ul className="text-sm text-amber-700 list-decimal list-inside space-y-1 mb-3">
                          <li>Update service description</li>
                          <li>Confirm service availability</li>
                        </ul>
                        <button className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1.5 rounded-lg hover:bg-amber-200 transition-colors">
                          Review Updated Application
                        </button>
                      </div>
                    </div>
                  )}

                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Profile Details</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Mail className="w-4 h-4" /></div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Email</p>
                          <p className="text-sm font-bold text-[#0A192F]">{vendor.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Phone className="w-4 h-4" /></div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Phone</p>
                          <p className="text-sm font-bold text-[#0A192F]">{vendor.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><MapPin className="w-4 h-4" /></div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Service Area</p>
                          <p className="text-sm font-bold text-[#0A192F]">{vendor.city} (5km radius)</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Experience & About</h4>
                    <p className="text-sm text-[#0A192F] font-bold mb-1">7 Years Experience</p>
                    <p className="text-sm text-slate-600">Professional provider of {vendor.primaryCategory} services. Committed to delivering high-quality results and ensuring customer satisfaction.</p>
                  </section>
                </div>
              )}

              {activeTab === "services" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {services.map(srv => (
                    <div key={srv.id} className="p-4 border border-slate-100 rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-[#0A192F]">{srv.name}</h4>
                          <p className="text-xs font-medium text-slate-500">{srv.category}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                          {srv.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-3">
                        <span className="text-slate-600">Starting from <strong className="text-[#0A192F]">₹{srv.price}</strong></span>
                        <span className="text-slate-500">{srv.duration} mins</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "bookings" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-xs font-medium text-slate-500 mb-1">Total</p>
                      <p className="text-lg font-bold text-[#0A192F]">{vendor.bookingCount}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-xs font-medium text-slate-500 mb-1">Completed</p>
                      <p className="text-lg font-bold text-[#0A192F]">{vendor.bookingCount}</p>
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recent Bookings</h4>
                  {bookings.map(booking => (
                    <div key={booking.id} className="p-4 border border-slate-100 rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs font-bold text-slate-400">{booking.id} &bull; {booking.customer}</p>
                          <h4 className="font-bold text-[#0A192F] text-sm">{booking.service}</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          booking.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">{booking.date}</span>
                        <span className="font-bold text-[#0A192F]">₹{booking.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-center">
                      <h3 className="text-4xl font-bold text-[#0A192F]">{vendor.rating.toFixed(1)}</h3>
                      <div className="flex items-center justify-center gap-0.5 my-1 text-amber-400">
                        ★★★★★
                      </div>
                      <p className="text-xs font-medium text-slate-500">{vendor.reviewCount} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5,4,3,2,1].map(star => (
                        <div key={star} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                          <span>{star}★</span>
                          <div className="h-1.5 flex-1 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400" style={{ width: star > 3 ? '80%' : '10%' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="p-4 border border-slate-100 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="text-sm font-bold text-[#0A192F]">{review.customer}</h4>
                            <p className="text-[11px] font-medium text-slate-500">{review.service}</p>
                          </div>
                          <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mb-2 text-amber-400 text-xs">★★★★★</div>
                        <p className="text-sm text-slate-600">"{review.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "earnings" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="bg-[#0A192F] text-white p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
                    <p className="text-slate-400 text-sm font-medium mb-1">Total Earnings</p>
                    <h3 className="text-3xl font-bold tracking-tight">₹{(earnings.total/100000).toFixed(2)}L</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">This Month</p>
                      <p className="text-lg font-bold text-[#0A192F]">₹{earnings.thisMonth.toLocaleString()}</p>
                    </div>
                    <div className="p-4 border border-amber-100 bg-amber-50 rounded-xl">
                      <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Pending</p>
                      <p className="text-lg font-bold text-amber-800">₹{earnings.pending.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
