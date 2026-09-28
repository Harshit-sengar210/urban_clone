"use client";

import { motion, useInView } from "framer-motion";
import { Clock, CalendarDays, Timer, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AvailabilitySettings } from "@/types/vendor";
import { cn } from "@/lib/utils";

// CountUp Component
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const duration = 1000; 

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * to));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [to, inView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function AvailabilitySummaries({ settings }: { settings: AvailabilitySettings }) {
  
  // Calculate total weekly hours and days
  let totalMinutes = 0;
  let activeDays = 0;

  settings.weeklySchedule.forEach(day => {
    if (day.enabled) {
      let dayMinutes = 0;
      day.ranges.forEach(r => {
        const [h1, m1] = r.start.split(':').map(Number);
        const [h2, m2] = r.end.split(':').map(Number);
        dayMinutes += (h2 * 60 + m2) - (h1 * 60 + m1);
      });
      day.breaks.forEach(b => {
        const [h1, m1] = b.start.split(':').map(Number);
        const [h2, m2] = b.end.split(':').map(Number);
        dayMinutes -= (h2 * 60 + m2) - (h1 * 60 + m1);
      });
      if (dayMinutes > 0) {
        activeDays++;
        totalMinutes += dayMinutes;
      }
    }
  });

  const weeklyHours = Math.round(totalMinutes / 60);

  const cards = [
    {
      title: "Weekly Hours",
      value: weeklyHours,
      suffix: " hrs",
      icon: Clock,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Working Days",
      value: activeDays,
      suffix: " days",
      icon: CalendarDays,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Booking Buffer",
      value: settings.bookingBufferMinutes,
      suffix: " min",
      icon: Timer,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Max Bookings / Day",
      value: settings.maxBookingsPerDay,
      suffix: "",
      icon: Layers,
      color: "text-blue-600",
      bg: "bg-blue-50",
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map((card, i) => (
        <motion.div 
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4"
        >
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", card.bg, card.color)}>
            <card.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">{card.title}</p>
            <h3 className="text-xl font-black text-slate-900">
              <CountUp to={card.value} suffix={card.suffix} />
            </h3>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
