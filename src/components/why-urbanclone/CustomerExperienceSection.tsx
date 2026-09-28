"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Calendar, MapPin, Search, Phone, MessageSquare, Briefcase, CreditCard, Headphones, User, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CustomerExperienceSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-foreground)] tracking-tight mb-4">
            Everything You Need, <br className="hidden sm:block" />In One Place.
          </h2>
          <p className="text-lg text-[var(--color-muted)] max-w-xl mx-auto">
            Manage bookings, track professionals, and access support—all from a single, intuitive interface.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-5xl mx-auto bg-slate-50 rounded-[2.5rem] p-4 md:p-8 border border-slate-200 shadow-2xl shadow-slate-200/50 flex flex-col lg:flex-row gap-6 md:gap-8"
        >
          {/* Main Dashboard Panel */}
          <div className="w-full lg:w-2/3 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-[var(--color-foreground)]">Upcoming Booking</h3>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-xs rounded-full uppercase tracking-widest">
                Tomorrow
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:items-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100">
                <SparklesIcon className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">Intense Home Cleaning</h4>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
                  <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> 10:00 AM</div>
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Home Address</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 md:p-6 mb-8 border border-slate-100">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                    <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Pro" fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <p className="font-bold text-lg text-[var(--color-foreground)] leading-none">Ravi Kumar</p>
                      <BadgeCheck className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-sm font-medium text-slate-500">Professional Assigned</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Button variant="outline" className="w-full md:w-auto bg-white hover:bg-slate-50 border-slate-200">
                    <Phone className="w-4 h-4 mr-2" /> Call
                  </Button>
                  <Button variant="outline" className="w-full md:w-auto bg-white hover:bg-slate-50 border-slate-200">
                    <MessageSquare className="w-4 h-4 mr-2" /> Message
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              <Button className="w-full h-12 text-base font-bold shadow-md shadow-primary/10">Track Booking</Button>
              <Button variant="outline" className="w-full h-12 text-base font-bold border-slate-200">View Details</Button>
            </div>
          </div>

          {/* Sidebar / Quick Links */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {[
              { icon: Briefcase, title: "My Bookings", desc: "View past and upcoming", href: "/dashboard/bookings" },
              { icon: Search, title: "Offers", desc: "Coupons and rewards", href: "/dashboard/offers" },
              { icon: CreditCard, title: "Wallet", desc: "Manage saved cards", href: "/dashboard/payments" },
              { icon: Headphones, title: "Support", desc: "Get help with a booking", href: "/dashboard/support" }
            ].map((item, idx) => (
              <Link 
                key={idx} 
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)]/10 transition-colors">
                  <item.icon className="w-5 h-5 text-slate-500 group-hover:text-[var(--color-primary)] transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-foreground)] mb-0.5">{item.title}</h4>
                  <p className="text-xs font-medium text-slate-500">{item.desc}</p>
                </div>
              </Link>
            ))}
            
            <div className="mt-auto pt-4 flex items-center gap-3 p-4 bg-[var(--color-primary)] text-white rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white/80">Logged in as</p>
                <p className="font-bold text-sm">Guest User</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Temporary icon component since Sparkles isn't exported in lucide-react standard
function SparklesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
