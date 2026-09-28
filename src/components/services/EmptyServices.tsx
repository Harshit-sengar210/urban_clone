import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyServicesProps {
  onClearFilters: () => void;
}

export function EmptyServices({ onClearFilters }: EmptyServicesProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-surface-hover)]">
      <div className="w-16 h-16 bg-[var(--color-background)] rounded-full flex items-center justify-center mb-4 text-[var(--color-muted)] shadow-sm">
        <Search className="w-8 h-8 opacity-50" />
      </div>
      <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">No services found</h3>
      <p className="text-[var(--color-muted)] max-w-md mb-6">
        We couldn't find any services matching your current filters. Try adjusting your category or price range.
      </p>
      <Button onClick={onClearFilters}>Clear Filters</Button>
    </div>
  );
}
