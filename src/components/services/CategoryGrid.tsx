import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-background)]">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          title="Browse by Category"
          subtitle="Explore our wide range of professional services for your home."
          className="mb-10"
        />

        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar">
          {CATEGORIES.map((category) => (
            <Link href={`/services/${category.id}`} key={category.id} className="min-w-[240px] w-[70vw] md:w-auto md:min-w-0 snap-start shrink-0 block h-full">
              <CategoryCard
                name={category.name}
                description={category.description}
                icon={category.icon}
                image={category.image}
                color={category.color}
                serviceCount={category.subcategories?.reduce((acc, sub) => acc + (sub.services?.length || 0), 0)}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
