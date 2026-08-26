import Link from "next/link";
import { PlaceholderPhoto } from "@/components/ui/PlaceholderPhoto";
import { categories } from "@/lib/data/categories";

export function CategoryChips() {
  return (
    <section className="rounded-[var(--radius-card)] border border-line-soft bg-surface p-4 shadow-card sm:p-5">
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}`}
            className="group flex flex-col items-center gap-2 rounded-lg p-2.5 text-center transition-colors hover:bg-page"
          >
            <span className="h-16 w-16 overflow-hidden rounded-[10px] sm:h-[84px] sm:w-[84px]">
              <PlaceholderPhoto icon={c.icon} tone="slate" iconClassName="h-7 w-7 sm:h-8 sm:w-8" />
            </span>
            <span className="text-[12.5px] font-bold leading-tight text-ink group-hover:text-green-700 sm:text-[13px]">
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
