"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, MapPin, Calendar, CheckCircle2, User } from "lucide-react";
import { BookingRequest } from "@/types/vendor";
import { RejectBookingModal } from "./RejectBookingModal";
import { cn } from "@/lib/utils";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export function LiveBookingPanel({ 
  initialRequests, 
  onAccept,
  onReject
}: { 
  initialRequests: BookingRequest[],
  onAccept: (request: BookingRequest) => void,
  onReject: (id: string, reason: string) => void
}) {
  const [requests, setRequests] = useState<BookingRequest[]>(initialRequests);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const prevIdsRef = useRef<Set<string>>(new Set(initialRequests.map(r => r.id)));

  const playAlertSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Attempt to resume if browser blocked autoplay
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const playNote = (freq: number, startTime: number) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // Soft, bell-like sine wave
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);
        
        // Attack and release envelope for a soft chime
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.4, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1);
      };

      // Play a soft, pleasant double chime (C5 then E5)
      playNote(523.25, ctx.currentTime);
      playNote(659.25, ctx.currentTime + 0.15);
      
    } catch (err) {
      console.error("Audio playback failed", err);
    }
  };

  useEffect(() => {
    // Sync external changes (e.g. from Firebase)
    setRequests(initialRequests);
    
    // Check for new requests
    const currentIds = new Set(initialRequests.map(r => r.id));
    let hasNew = false;
    for (const id of currentIds) {
      if (!prevIdsRef.current.has(id)) {
        hasNew = true;
        break;
      }
    }
    
    if (hasNew) {
      playAlertSound();
    }
    
    prevIdsRef.current = currentIds;
  }, [initialRequests]);

  const handleAcceptClick = (id: string) => {
    setAcceptingId(id);
    
    // Simulate API call
    setTimeout(() => {
      setAcceptingId(null);
      setSuccessId(id);
      
      const acceptedRequest = requests.find(r => r.id === id);
      
      // Keep success state visible for a moment before removing
      setTimeout(() => {
        setRequests(prev => prev.filter(r => r.id !== id));
        if (acceptedRequest) {
          onAccept(acceptedRequest);
        }
        setSuccessId(null);
      }, 1000);
      
    }, 800);
  };

  const handleRejectConfirm = (reason: string) => {
    if (!rejectingId) return;
    const id = rejectingId;
    setRejectingId(null);
    setRequests(prev => prev.filter(r => r.id !== id));
    onReject(id, reason);
  };

  return (
    <div className="bg-[#0B1120] rounded-[2rem] p-5 md:p-6 shadow-2xl shadow-indigo-500/10 sticky top-[88px] flex flex-col max-h-[calc(100vh-120px)] overflow-hidden ring-1 ring-white/10 relative">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Requests
        </h3>
        <motion.span 
          key={requests.length}
          initial={{ scale: 1.5, color: "#a5b4fc" }}
          animate={{ scale: 1, color: "#818cf8" }}
          className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-[10px] flex items-center justify-center border border-indigo-500/30"
        >
          {requests.length}
        </motion.span>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar relative z-10 -mr-2 pr-2">
        <AnimatePresence initial={false}>
          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((req) => {
                const isAccepting = acceptingId === req.id;
                const isSuccess = successId === req.id;
                
                return (
                  <motion.div
                    key={req.id}
                    layout
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className={cn(
                      "bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100 transition-all",
                      isSuccess && "ring-2 ring-emerald-500 bg-emerald-50/50 border-emerald-200"
                    )}
                  >
                    {isSuccess ? (
                      <div className="h-full min-h-[160px] flex flex-col items-center justify-center text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3"
                        >
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </motion.div>
                        <h4 className="font-bold text-emerald-700">Booking Confirmed</h4>
                        <p className="text-xs text-emerald-600/80 mt-1">Added to your upcoming bookings</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                              <span className="font-bold text-indigo-600 text-sm">{req.customerName.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 leading-tight">{req.customerName}</div>
                              <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">{req.service}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-black text-slate-900">{formatCurrency(req.estimatedEarnings)}</div>
                            <div className="text-[10px] text-slate-400 font-medium mt-0.5">Earnings</div>
                          </div>
                        </div>

                        <div className="bg-slate-50/80 rounded-2xl p-3 mb-5 space-y-2.5">
                          <div className="flex items-start gap-2.5 text-xs text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                            <span className="font-medium">{req.location}</span>
                          </div>
                          <div className="flex items-start gap-2.5 text-xs text-slate-600">
                            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                            <span className="font-medium">{req.date} &middot; {req.time}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            disabled={isAccepting}
                            onClick={() => handleAcceptClick(req.id)}
                            className="flex-1 py-3 px-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-80 disabled:cursor-not-allowed shadow-sm shadow-indigo-600/20"
                          >
                            {isAccepting ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                  className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                                />
                                Accepting...
                              </>
                            ) : (
                              <>
                                <Check className="w-3.5 h-3.5" /> Accept
                              </>
                            )}
                          </button>
                          
                          <button
                            disabled={isAccepting}
                            onClick={() => setRejectingId(req.id)}
                            className="flex-1 py-3 px-3 rounded-full border border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-700 text-slate-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <X className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full min-h-[300px] flex flex-col items-center justify-center text-center px-4"
            >
              <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-slate-500" />
              </div>
              <h4 className="font-bold text-white mb-2">You're all caught up!</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
                No new booking requests right now. We'll notify you when customers book your services.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RejectBookingModal 
        isOpen={!!rejectingId}
        onClose={() => setRejectingId(null)}
        onConfirm={handleRejectConfirm}
      />
    </div>
  );
}
