"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Calendar, Clock, MapPin, ChevronRight, CheckCircle2, ShieldBan, MoreVertical } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { AdminUser, UserBooking, UserActivity, UserReview } from "@/data/adminUsersData";

export function UserDetailsDrawer({
  user,
  onClose,
  bookings,
  activities,
  reviews,
  onSuspend,
  onRestore,
  onDisable
}: {
  user: AdminUser | null;
  onClose: () => void;
  bookings: UserBooking[];
  activities: UserActivity[];
  reviews: UserReview[];
  onSuspend: (user: AdminUser) => void;
  onRestore: (user: AdminUser) => void;
  onDisable: (user: AdminUser) => void;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "activity" | "reviews">("overview");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end"
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
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0A192F]">User Details</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50"
                    >
                      {user.status === "active" && (
                        <button 
                          onClick={() => { onSuspend(user); setIsMenuOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 font-medium"
                        >
                          Suspend User
                        </button>
                      )}
                      {user.status === "suspended" && (
                        <button 
                          onClick={() => { onRestore(user); setIsMenuOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-50 font-medium"
                        >
                          Restore User
                        </button>
                      )}
                      {user.status !== "disabled" && (
                        <button 
                          onClick={() => { onDisable(user); setIsMenuOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-rose-700 hover:bg-rose-50 font-medium"
                        >
                          Disable User
                        </button>
                      )}
                      <div className="border-t border-slate-100 my-1"></div>
                      <button 
                        onClick={() => { setIsMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        Send Message
                      </button>
                      <button 
                        onClick={() => { setIsMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        Reset Password
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Profile Header */}
            <div className="p-6 border-b border-slate-100 flex flex-col items-center text-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 bg-slate-100 flex items-center justify-center font-bold text-3xl text-slate-300">
                {user.avatar ? <Image src={user.avatar} alt={user.name} fill className="object-cover" /> : user.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-[#0A192F] mb-1">{user.name}</h3>
              <p className="text-sm font-medium text-slate-500 mb-3">{user.id}</p>
              
              <div className="flex gap-2">
                {user.status === "active" && (
                  <button onClick={() => onSuspend(user)} className="px-4 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-amber-100 transition-colors">
                    Suspend
                  </button>
                )}
                {user.status === "suspended" && (
                  <button onClick={() => onRestore(user)} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-emerald-100 transition-colors">
                    Restore
                  </button>
                )}
                {user.status !== "disabled" && (
                  <button onClick={() => onDisable(user)} className="px-4 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-rose-100 transition-colors">
                    Disable
                  </button>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 px-2 sticky top-0 bg-white z-10">
              {(["overview", "bookings", "activity", "reviews"] as const).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-sm font-bold capitalize transition-colors relative ${
                    activeTab === tab ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="userTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Account */}
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Account</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Mail className="w-4 h-4" /></div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Email Address</p>
                          <p className="text-sm font-bold text-[#0A192F]">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Phone className="w-4 h-4" /></div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Phone Number</p>
                          <p className="text-sm font-bold text-[#0A192F]">{user.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Calendar className="w-4 h-4" /></div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Joined Date</p>
                          <p className="text-sm font-bold text-[#0A192F]">{user.joinedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><Clock className="w-4 h-4" /></div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Last Active</p>
                          <p className="text-sm font-bold text-[#0A192F]">{user.lastActiveAt}</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Booking Summary */}
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Booking Summary</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-xs font-medium text-slate-500 mb-1">Total Bookings</p>
                        <p className="text-lg font-bold text-[#0A192F]">{user.bookingCount}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-xs font-medium text-slate-500 mb-1">Total Spend</p>
                        <p className="text-lg font-bold text-[#0A192F]">₹{user.totalSpend.toLocaleString()}</p>
                      </div>
                      <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                        <p className="text-xs font-medium text-emerald-700 mb-1">Completed</p>
                        <p className="text-lg font-bold text-emerald-800">{user.completedBookings}</p>
                      </div>
                      <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
                        <p className="text-xs font-medium text-rose-700 mb-1">Cancelled</p>
                        <p className="text-lg font-bold text-rose-800">{user.cancelledBookings}</p>
                      </div>
                    </div>
                  </section>

                  {/* Favorite Services */}
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Favorite Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.favoriteServices.map(svc => (
                        <span key={svc} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg">
                          {svc}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === "bookings" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {bookings.map(booking => (
                    <div key={booking.id} className="p-4 border border-slate-100 rounded-xl hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs font-bold text-slate-400">{booking.id}</p>
                          <h4 className="font-bold text-[#0A192F]">{booking.service}</h4>
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
                  <button className="w-full py-3 text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-xl transition-colors">
                    View All Bookings
                  </button>
                </div>
              )}

              {activeTab === "activity" && (
                <div className="relative pl-4 space-y-6 animate-in fade-in duration-300">
                  <div className="absolute left-[23px] top-2 bottom-2 w-px bg-slate-100" />
                  {activities.map((act, i) => (
                    <div key={act.id} className="relative pl-6">
                      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white bg-[var(--color-primary)] shadow-sm" />
                      <p className="font-medium text-sm text-[#0A192F] leading-snug">{act.event}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{act.timestamp}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {reviews.map(review => (
                    <div key={review.id} className="p-4 border border-slate-100 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-[#0A192F]">{review.service}</h4>
                        <span className="text-xs text-slate-500">{review.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map(s => (
                          <span key={s} className={`text-sm ${s <= review.rating ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
                        ))}
                      </div>
                      <p className="text-sm text-slate-600 italic">"{review.text}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
