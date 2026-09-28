import { ServiceSearch } from "@/components/services/ServiceSearch";

export function ServicesHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[var(--color-lavender-light)] to-[var(--color-background)]">
      {/* Decorative background shapes */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-foreground)] mb-6 max-w-3xl">
          Everything Your Home Needs, <br className="hidden md:block" />
          <span className="text-[var(--color-primary)]">In One Place.</span>
        </h1>
        
        <p className="text-lg text-[var(--color-muted)] mb-10 max-w-2xl">
          From everyday cleaning to repairs, beauty and maintenance, book trusted professionals whenever you need them.
        </p>
        
        <ServiceSearch />
      </div>
    </section>
  );
}
