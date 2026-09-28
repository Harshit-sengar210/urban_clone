"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle2, X, Building2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { uploadEnter, shakeAnimation } from "./animations";

interface BusinessLogoUploadProps {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
}

export function BusinessLogoUpload({ value, onChange }: BusinessLogoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
    // Reset input so the same file can be uploaded again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <div 
        className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden group ${
          isDragging 
            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' 
            : error 
              ? 'border-red-300 bg-red-50/50'
              : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100/50'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !value && fileInputRef.current?.click()}
      >
        <AnimatePresence mode="wait">
          {value ? (
            <motion.div
              key="image"
              variants={uploadEnter}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full h-40 flex items-center justify-center bg-white p-4"
            >
              <div className="relative w-32 h-32">
                <Image src={value} alt="Business Logo" fill className="object-contain" />
              </div>
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 gap-3 backdrop-blur-[2px]">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="bg-white text-slate-900 text-sm font-bold px-4 py-2 rounded-full hover:bg-slate-100 transition-colors shadow-lg"
                >
                  Change Logo
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onChange(null); }}
                  className="bg-red-500 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="absolute top-3 left-3 bg-white/90 text-green-600 px-2 py-1 rounded-md flex items-center gap-1.5 shadow-sm text-xs font-bold border border-green-100">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Logo Added
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={error ? shakeAnimation : { opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {isDragging ? (
                  <UploadCloud className="w-6 h-6 text-[var(--color-primary)]" />
                ) : (
                  <Building2 className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">
                {isDragging ? "Drop your logo here" : "Upload Business Logo"}
              </h4>
              <p className="text-xs font-medium text-slate-500">
                PNG, JPG or WEBP. Max 5MB.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/*"
          onChange={onFileInputChange}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-1.5 text-red-500 text-xs font-bold mt-2"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
