"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X, Camera, Check } from "lucide-react";
import Image from "next/image";

interface ProfilePhotoUploadProps {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
}

export function ProfilePhotoUpload({ value, onChange }: ProfilePhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target?.result as string);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
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
  };

  return (
    <div className="mb-10">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[var(--color-foreground)]">Profile Photo</h3>
        <p className="text-sm text-[var(--color-muted)] font-medium">Add a clear photo so customers can recognize you.</p>
      </div>

      <div className="flex items-center gap-6">
        <div 
          className={`relative w-28 h-28 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 scale-105' : 'border-slate-200 bg-slate-50'} ${!value ? 'border-2 border-dashed hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5' : ''}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => !value && fileInputRef.current?.click()}
        >
          <AnimatePresence mode="popLayout">
            {value ? (
              <motion.div
                key="image"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="w-full h-full rounded-full overflow-hidden relative group"
              >
                <Image src={value} alt="Upload" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-slate-400 group flex flex-col items-center"
              >
                <UploadCloud className="w-8 h-8 mb-1 group-hover:text-[var(--color-primary)] group-hover:scale-110 transition-all duration-300" />
                <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-[var(--color-primary)] transition-colors">Upload</span>
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

        <div>
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg"
              >
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-green-600 font-bold" />
                </div>
                <span className="text-sm font-bold">Photo Added</span>
              </motion.div>
            ) : value ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-2"
              >
                <button
                  type="button"
                  onClick={() => onChange(null)}
                  className="text-sm font-bold text-red-500 hover:text-red-600 hover:underline flex items-center gap-1 w-fit"
                >
                  <X className="w-4 h-4" /> Remove Photo
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-sm text-slate-500 font-medium max-w-[200px] mb-2">
                  JPG, PNG or WEBP.<br/> Max size 5MB.
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm font-bold text-[var(--color-primary)] hover:underline"
                >
                  Browse Files
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
