import Link from "next/link";
import { cn } from "@/lib/utils";
import { buildItemsHref, type ItemsSearchParams } from "@/lib/filters";
import { categories } from "@/lib/data/categories";
import type { Condition } from "@/lib/data/types";

const conditions: Condition[] = [
  "Like new",
  "Good",
  "Fair",
  "Working",
  "Needs repair",
  "Pending review",
];

export function FilterPanel({ current }: { current: ItemsSearchParams }) {
  const hasFilters = Boolean(current.category || current.condition);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-extrabold uppercase tracking-wide text-ink-500">
          Filters
        </span>
        {hasFilters && (
          <Link
            href={buildItemsHref(current, { category: undefined, condition: undefined })}
            className="text-[13px] font-bold text-green-700 hover:underline"
          >
            Clear all
          </Link>
        )}
      </div>

      <div>
        <div className="mb-2.5 text-[13px] font-bold text-ink">Category</div>
        <ul className="flex flex-col gap-0.5">
          {categories.map((c) => {
            const active = current.category === c.slug;
            return (
              <li key={c.slug}>
                <Link
                  href={buildItemsHref(current, {
                    category: active ? undefined : c.slug,
                  })}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-2.5 py-2 text-[13.5px] font-semibold transition-colors",
                    active
                      ? "bg-green-050 text-green-700"
                      : "text-ink-600 hover:bg-page"
                  )}
                >
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <div className="mb-2.5 text-[13px] font-bold text-ink">Condition</div>
        <ul className="flex flex-col gap-0.5">
          {conditions.map((cond) => {
            const active = current.condition === cond;
            return (
              <li key={cond}>
                <Link
                  href={buildItemsHref(current, {
                    condition: active ? undefined : cond,
                  })}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-2.5 py-2 text-[13.5px] font-semibold transition-colors",
                    active
                      ? "bg-green-050 text-green-700"
                      : "text-ink-600 hover:bg-page"
                  )}
                >
                  {cond}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
