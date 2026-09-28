"use client";

import { Card, CardContent } from "@/components/ui/card";

export function ServiceSkeleton() {
  return (
    <Card className="group relative overflow-hidden border-transparent shadow-sm flex flex-col h-full animate-pulse">
      <div className="relative h-48 w-full bg-[var(--color-border)] opacity-50 shrink-0" />
      <CardContent className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="h-5 bg-[var(--color-border)] rounded w-2/3 opacity-50" />
          <div className="h-6 bg-[var(--color-border)] rounded w-16 opacity-50" />
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="h-4 bg-[var(--color-border)] rounded w-20 opacity-50" />
          <div className="h-4 bg-[var(--color-border)] rounded w-16 opacity-50" />
        </div>

        <div className="mt-auto">
          <div className="h-10 bg-[var(--color-border)] rounded-md w-full opacity-50" />
        </div>
      </CardContent>
    </Card>
  );
}
