import { SearchBar } from "./SearchBar";

export function DiscoveryHero() {
  return (
    <section className="pt-24 pb-8 bg-white border-b border-[var(--color-border)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-foreground)] mb-3">
            Find the right service for your home.
          </h1>
          <p className="text-[var(--color-muted)] mb-8 max-w-2xl">
            Trusted professionals, transparent pricing and convenient booking.
          </p>
          
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
