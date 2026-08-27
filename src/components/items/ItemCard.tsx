import Link from "next/link";
import { ItemPhoto } from "@/components/ui/ItemPhoto";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import type { Listing } from "@/lib/data/types";

export function ItemCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/items/${listing.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line-soft bg-surface shadow-card transition-all hover:-translate-y-0.5 hover:border-green-700 hover:shadow-card-hover"
    >
      <div className="relative aspect-square">
        <ItemPhoto
          url={listing.photoUrls[0]}
          alt={listing.title}
          icon={listing.photoIcon}
          tone={listing.photoTone}
        />
        <div className="absolute left-2.5 top-2.5">
          {listing.status === "reserved" ? (
            <Badge tone="reserved">Reserved</Badge>
          ) : listing.isNew ? (
            <Badge tone="new">New</Badge>
          ) : listing.categorySlug === "vehicles" ? (
            <Badge tone="vehicle">Vehicle</Badge>
          ) : (
            <Badge tone="available">Available</Badge>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <div className="flex flex-col gap-0.5">
          <span className="text-lg font-extrabold leading-tight tracking-tight text-green-700">
            FREE
          </span>
          <span className="whitespace-nowrap text-[12.5px] font-semibold text-ink-500">
            {listing.deliveryEstimateCents == null
              ? "+ Quote delivery"
              : `+ ${formatCurrency(listing.deliveryEstimateCents)} delivery`}
          </span>
        </div>
        <div className="line-clamp-2 text-[14.5px] font-semibold leading-tight text-ink">
          {listing.title}
        </div>
        <div className="text-[12.5px] font-semibold text-ink-400">
          {listing.condition} · {listing.city}, {listing.state}
          <span className="mx-1">·</span>
          {listing.postedLabel}
        </div>
      </div>
    </Link>
  );
}
