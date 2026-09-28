import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, className, centered = false }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-2", centered && "items-center text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-foreground)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--color-muted)] text-base md:text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
