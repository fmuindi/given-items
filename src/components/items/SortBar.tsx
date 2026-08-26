import Link from "next/link";
import { cn } from "@/lib/utils";
import { buildItemsHref, type ItemsSearchParams } from "@/lib/filters";

const options = [
  { value: "newest", label: "Newest" },
  { value: "nearest", label: "Nearest" },
  { value: "cheapest", label: "Cheapest delivery" },
];

export function SortBar({ current }: { current: ItemsSearchParams }) {
  const activeSort = current.sort ?? "newest";

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = activeSort === opt.value;
        return (
          <Link
            key={opt.value}
            href={buildItemsHref(current, { sort: opt.value })}
            aria-current={active ? "true" : undefined}
            className={cn(
              "tap-target inline-flex items-center rounded-md px-3.5 text-[13px] font-bold transition-colors",
              active
                ? "bg-navy-900 text-white"
                : "border border-line text-ink-600 hover:border-ink-400"
            )}
          >
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
}
