"use client";

import { motion } from "framer-motion";
import { Plus, Image as ImageIcon } from "lucide-react";
import { VendorPortfolioItem } from "@/types/vendor";
import { useState, useRef } from "react";

export function PortfolioGrid({ items }: { items: VendorPortfolioItem[] }) {
  const [portfolio, setPortfolio] = useState(items);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          const newItem: VendorPortfolioItem = {
            id: `P-${Date.now()}`,
            url: reader.result as string,
            title: "New Portfolio Item",
            category: "General"
          };
          setPortfolio([newItem, ...portfolio]);
          setIsUploading(false);
          const event = new CustomEvent("show-toast", { detail: "Portfolio image added successfully." });
          window.dispatchEvent(event);
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-sm border border-slate-100">
            <ImageIcon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Work Portfolio</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {/* Upload Button */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-indigo-300 transition-colors cursor-pointer flex flex-col items-center justify-center text-slate-500 hover:text-indigo-600 group relative overflow-hidden"
        >
          {isUploading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full" />
          ) : (
            <>
              <Plus className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Add Image</span>
            </>
          )}
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/jpeg,image/png,image/webp" 
          onChange={handleFileChange}
        />

        {/* Grid Items */}
        {portfolio.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer"
          >
            <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">{item.category}</span>
              <h4 className="text-white text-sm font-bold line-clamp-1">{item.title}</h4>
            </div>
          </motion.div>
        ))}

      </div>
    </motion.div>
  );
}
