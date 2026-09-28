"use client";

import { motion } from "framer-motion";

export function BeforeYourService() {
  const steps = [
    { num: "01", title: "Choose your package", desc: "Select a package that best fits your needs." },
    { num: "02", title: "Select your preferred time", desc: "Choose a time slot that works best for you." },
    { num: "03", title: "Relax while your professional arrives", desc: "Our verified professional will arrive at your doorstep." }
  ];

  return (
    <div className="mt-20 mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-10"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0A192F] mb-2">Before your service</h2>
      </motion.div>
      
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
        {/* Animated Connecting Line - Desktop Only */}
        <div className="hidden md:block absolute top-6 left-12 right-12 h-[2px] bg-slate-100 z-0">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="h-full bg-[var(--color-primary)] origin-left"
          />
        </div>

        {/* Animated Connecting Line - Mobile Only */}
        <div className="md:hidden absolute top-6 bottom-6 left-[23px] w-[2px] bg-slate-100 z-0">
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full bg-[var(--color-primary)] origin-top"
          />
        </div>

        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.2 + 0.3 }}
            className="relative z-10 flex md:flex-col items-start md:items-center gap-4 md:text-center"
          >
            <div className="w-12 h-12 rounded-full bg-white border-2 border-[var(--color-primary)] flex items-center justify-center font-bold text-[var(--color-primary)] shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.2)] shrink-0">
              {step.num}
            </div>
            <div>
              <h3 className="font-bold text-[#0A192F] text-lg mb-1">{step.title}</h3>
              <p className="text-slate-500 text-sm">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
