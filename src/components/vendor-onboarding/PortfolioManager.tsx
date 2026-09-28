"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Star, Maximize2, MoveLeft, MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { imageEnter } from "./animations";

export type VendorPortfolioItem = {
  id: string;
  localPreviewUrl: string;
  fileName: string;
  isCover: boolean;
  order: number;
};

interface PortfolioManagerProps {
  items: VendorPortfolioItem[];
  onChange: (items: VendorPortfolioItem[]) => void;
}

export function PortfolioManager({ items, onChange }: PortfolioManagerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      items.forEach(item => {
        if (item.localPreviewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(item.localPreviewUrl);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;
    
    const newItems: VendorPortfolioItem[] = [];
    const currentMaxOrder = items.length > 0 ? Math.max(...items.map(i => i.order)) : 0;
    
    Array.from(files).forEach((file, index) => {
      // Basic validation
      if (!file.type.startsWith("image/")) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const localPreviewUrl = e.target?.result as string;
        newItems.push({
          id: Math.random().toString(36).substring(7),
          localPreviewUrl,
          fileName: file.name,
          isCover: items.length === 0 && index === 0, // First image is cover by default
          order: currentMaxOrder + index + 1
        });
        
        // If this is the last file, call onChange
        if (newItems.length === Array.from(files).filter(f => f.type.startsWith("image/")).length) {
          onChange([...items, ...newItems].sort((a, b) => a.order - b.order));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    // Reset input so same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const itemToRemove = items.find(i => i.id === id);
    if (itemToRemove && itemToRemove.localPreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(itemToRemove.localPreviewUrl);
    }
    
    const newItems = items.filter(i => i.id !== id);
    // Ensure we still have a cover if we removed the cover
    if (itemToRemove?.isCover && newItems.length > 0) {
      newItems[0].isCover = true;
    }
    onChange(newItems);
  };

  const setCover = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(items.map(item => ({
      ...item,
      isCover: item.id === id
    })));
  };

  const moveItem = (id: string, direction: 'left' | 'right', e: React.MouseEvent) => {
    e.stopPropagation();
    const index = items.findIndex(i => i.id === id);
    if (index === -1) return;
    
    if (direction === 'left' && index > 0) {
      const newItems = [...items];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      // Update orders
      newItems.forEach((item, i) => item.order = i);
      onChange(newItems);
    } else if (direction === 'right' && index < items.length - 1) {
      const newItems = [...items];
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
      // Update orders
      newItems.forEach((item, i) => item.order = i);
      onChange(newItems);
    }
  };

  // Keyboard navigation for viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewerIndex === null) return;
      if (e.key === 'Escape') setViewerIndex(null);
      if (e.key === 'ArrowRight' && viewerIndex < items.length - 1) setViewerIndex(viewerIndex + 1);
      if (e.key === 'ArrowLeft' && viewerIndex > 0) setViewerIndex(viewerIndex - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewerIndex, items.length]);

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative w-full h-40 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 overflow-hidden",
          isDragging 
            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5" 
            : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
        )}
      >
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-colors duration-300",
          isDragging ? "bg-[var(--color-primary)] text-white" : "bg-white text-slate-400 shadow-sm"
        )}>
          <Upload className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-slate-700">
          {isDragging ? "Drop your photos here" : "Upload Work Photos"}
        </h4>
        <p className="text-xs font-medium text-slate-400 mt-1">
          Drag & drop or click to browse
        </p>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mt-2">
          JPG, PNG or WEBP
        </p>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileInput} 
          multiple 
          accept="image/*" 
          className="hidden" 
        />
      </motion.div>

      {/* Image Grid */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                variants={imageEnter}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                onClick={() => setViewerIndex(index)}
                className="group relative aspect-square rounded-2xl bg-slate-100 overflow-hidden cursor-pointer shadow-sm border border-slate-100"
              >
                <img 
                  src={item.localPreviewUrl} 
                  alt={item.fileName} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2">
                  <div className="flex justify-between items-start">
                    {/* Cover Badge / Button */}
                    {item.isCover ? (
                      <div className="bg-[var(--color-primary)] text-white px-2 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1 shadow-md">
                        <Star className="w-3 h-3 fill-current" /> Cover
                      </div>
                    ) : (
                      <button 
                        onClick={(e) => setCover(item.id, e)}
                        className="bg-white/20 hover:bg-white/40 text-white backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase transition-colors"
                      >
                        Set Cover
                      </button>
                    )}
                    
                    {/* Remove Button */}
                    <button 
                      onClick={(e) => removeImage(item.id, e)}
                      className="w-7 h-7 rounded-full bg-white/20 hover:bg-red-500 hover:text-white text-white backdrop-blur-md flex items-center justify-center transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  {/* Reorder / View Controls */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {index > 0 && (
                        <button 
                          onClick={(e) => moveItem(item.id, 'left', e)}
                          className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-800 backdrop-blur-md flex items-center justify-center transition-colors"
                        >
                          <MoveLeft className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {index < items.length - 1 && (
                        <button 
                          onClick={(e) => moveItem(item.id, 'right', e)}
                          className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-800 backdrop-blur-md flex items-center justify-center transition-colors"
                        >
                          <MoveRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <Maximize2 className="w-4 h-4 text-white opacity-70" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Lightweight Image Viewer Modal */}
      <AnimatePresence>
        {viewerIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
            onClick={() => setViewerIndex(null)}
          >
            {/* Close Button */}
            <button className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            
            {/* Counter */}
            <div className="absolute top-8 left-8 text-white font-bold text-sm tracking-widest">
              {viewerIndex + 1} / {items.length}
            </div>

            {/* Navigation Left */}
            {viewerIndex > 0 && (
              <button 
                onClick={(e) => { e.stopPropagation(); setViewerIndex(viewerIndex - 1); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Image */}
            <motion.img 
              key={viewerIndex}
              src={items[viewerIndex].localPreviewUrl}
              alt="Portfolio viewer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Navigation Right */}
            {viewerIndex < items.length - 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); setViewerIndex(viewerIndex + 1); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
