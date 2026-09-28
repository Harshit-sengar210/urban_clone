"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileImage, Replace, Maximize2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocumentSide } from "./DocumentTypeSelector";
import { imageEnter, modalEnter } from "./animations";

export type DocumentUploadStatus = "empty" | "added" | "error";

export interface DocumentUploadState {
  side: DocumentSide;
  fileName?: string;
  previewUrl?: string;
  status: DocumentUploadStatus;
}

interface DocumentUploaderProps {
  side: DocumentSide;
  uploadState: DocumentUploadState;
  onChange: (state: DocumentUploadState) => void;
}

const sideLabels: Record<DocumentSide, string> = {
  front: "Front Side",
  back: "Back Side",
  photo_page: "Photo Page",
};

export function DocumentUploader({ side, uploadState, onChange }: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (uploadState.previewUrl && uploadState.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(uploadState.previewUrl);
      }
    };
    // We specifically want this on unmount, or when previewUrl changes, but tracking it carefully.
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

  const processFile = (file: File | null) => {
    if (!file) return;
    
    // Basic validation
    if (!file.type.startsWith("image/")) {
      // Typically we'd use a toast, but this is handled by parent or simplified here
      onChange({ side, status: "error" });
      return;
    }
    
    // Cleanup old URL if it exists
    if (uploadState.previewUrl && uploadState.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(uploadState.previewUrl);
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const localPreviewUrl = e.target?.result as string;
      onChange({
        side,
        fileName: file.name,
        previewUrl: localPreviewUrl,
        status: "added"
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (uploadState.previewUrl && uploadState.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(uploadState.previewUrl);
    }
    onChange({ side, status: "empty" });
    setIsPreviewOpen(false);
  };

  // Keyboard navigation for preview modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPreviewOpen && e.key === 'Escape') setIsPreviewOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewOpen]);

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-slate-800">{sideLabels[side]}</h4>
      
      <AnimatePresence mode="wait">
        {uploadState.status === "empty" || uploadState.status === "error" ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative w-full h-32 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 overflow-hidden",
              isDragging 
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5" 
                : uploadState.status === "error"
                  ? "border-red-300 bg-red-50 hover:border-red-400"
                  : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors duration-300",
              isDragging ? "bg-[var(--color-primary)] text-white" : "bg-white text-slate-400 shadow-sm"
            )}>
              <Upload className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-700">
              {isDragging ? "Drop document here" : "Upload Document"}
            </h4>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mt-2">
              JPG, PNG or WEBP
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="added"
            variants={imageEnter}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full rounded-3xl border border-slate-200 bg-white p-4 flex gap-4 items-center shadow-sm"
          >
            {/* Thumbnail Preview */}
            <div 
              onClick={() => setIsPreviewOpen(true)}
              className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 cursor-pointer group relative"
            >
              <img 
                src={uploadState.previewUrl} 
                alt="Document preview" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <h4 className="text-sm font-bold text-slate-800 truncate">Added for this session</h4>
              </div>
              <p className="text-xs font-medium text-slate-500 truncate mb-2">
                {uploadState.fileName}
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] hover:text-indigo-700 bg-[var(--color-primary)]/10 hover:bg-indigo-100 px-2 py-1 rounded transition-colors"
                >
                  Preview
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                >
                  <Replace className="w-3 h-3" /> Replace
                </button>
              </div>
            </div>

            {/* Remove */}
            <button 
              onClick={handleRemove}
              className="w-8 h-8 rounded-full bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileInput} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isPreviewOpen && uploadState.previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
            onClick={() => setIsPreviewOpen(false)}
          >
            <button className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10">
              <X className="w-6 h-6" />
            </button>
            
            <div className="absolute top-8 left-8 text-white font-bold text-sm tracking-widest z-10">
              {sideLabels[side]} Preview
            </div>

            <motion.img 
              src={uploadState.previewUrl}
              alt="Full size document preview"
              variants={modalEnter}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => { setIsPreviewOpen(false); fileInputRef.current?.click(); }}
                className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                <Replace className="w-4 h-4" /> Replace
              </button>
              <button 
                onClick={handleRemove}
                className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Remove
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
