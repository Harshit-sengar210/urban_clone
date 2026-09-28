"use client";

import { useState, useRef } from "react";
import { ImagePlus, X, AlertCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const MAX_PHOTOS = 5;
const MAX_SIZE_MB = 5;
const ACCEPTED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

interface ReviewPhotoUploaderProps {
  photos: string[];             // object URLs for preview
  onChange: (photos: string[]) => void;
}

export function ReviewPhotoUploader({ photos, onChange }: ReviewPhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setError("");
    const newPhotos: string[] = [];
    const remaining = MAX_PHOTOS - photos.length;

    for (let i = 0; i < Math.min(files.length, remaining); i++) {
      const file = files[i];
      if (!ACCEPTED.includes(file.type)) {
        setError(`${file.name} is not a supported image format (JPG, PNG, WEBP).`);
        continue;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`${file.name} exceeds the 5MB size limit.`);
        continue;
      }
      newPhotos.push(URL.createObjectURL(file));
    }
    if (newPhotos.length > 0) onChange([...photos, ...newPhotos]);
  };

  const remove = (i: number) => {
    const updated = photos.filter((_, idx) => idx !== i);
    onChange(updated);
  };

  return (
    <div>
      <p className="text-xs font-bold text-[var(--color-foreground)] mb-2 uppercase tracking-wider">Add Photos (Optional)</p>
      <div className="flex flex-wrap gap-2">
        {photos.map((src, i) => (
          <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-[var(--color-border)]">
            <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        ))}
        {photos.length < MAX_PHOTOS && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 text-slate-400 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ImagePlus className="w-5 h-5" />
            <span className="text-[9px] font-semibold">Add</span>
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1.5 mt-2 text-xs text-red-500 font-medium">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {error}
        </div>
      )}
      <p className="text-[10px] text-slate-400 mt-1">Up to {MAX_PHOTOS} photos · JPG, PNG, WEBP · Max 5MB each</p>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        multiple
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
    </div>
  );
}
