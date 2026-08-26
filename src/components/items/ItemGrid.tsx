import { ItemCard } from "@/components/items/ItemCard";
import type { Listing } from "@/lib/data/types";

export function ItemGrid({ listings }: { listings: Listing[] }) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-dashed border-line py-16 text-center">
        <p className="text-[15px] font-bold text-ink">No items match right now</p>
        <p className="max-w-xs text-[13.5px] text-ink-500">
          Try a different category or check back soon — new items are added
          every day.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {listings.map((listing) => (
        <ItemCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
