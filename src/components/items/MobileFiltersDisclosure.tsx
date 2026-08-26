import { SlidersHorizontal } from "lucide-react";
import { FilterPanel } from "@/components/items/FilterPanel";
import type { ItemsSearchParams } from "@/lib/filters";

export function MobileFiltersDisclosure({ current }: { current: ItemsSearchParams }) {
  return (
    <details className="group rounded-[var(--radius-control)] border border-line lg:hidden">
      <summary className="tap-target flex cursor-pointer list-none items-center justify-center gap-2 rounded-[var(--radius-control)] px-4 text-[13px] font-bold text-ink-600 marker:content-none [&::-webkit-details-marker]:hidden">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </summary>
      <div className="border-t border-line p-4">
        <FilterPanel current={current} />
      </div>
    </details>
  );
}
