import { ShieldCheck, Truck, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import type { Listing } from "@/lib/data/types";

export function ClaimPanel({ listing }: { listing: Listing }) {
  const reserved = listing.status === "reserved";

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <div className="hidden rounded-[var(--radius-card)] border border-line-soft bg-surface p-5 shadow-card lg:block">
        <ClaimPanelBody listing={listing} reserved={reserved} />
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 p-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[16px] font-extrabold leading-none text-green-700">
              FREE
            </div>
            <div className="truncate text-[12px] font-semibold text-ink-500">
              {listing.deliveryEstimateCents == null
                ? "+ Quote delivery"
                : `+ ${formatCurrency(listing.deliveryEstimateCents)} delivery`}
            </div>
          </div>
          {reserved ? (
            <Button variant="outline" size="lg" className="shrink-0" disabled>
              Reserved
            </Button>
          ) : (
            <Button
              href={`/sign-in?next=/items/${listing.slug}`}
              variant="primary"
              size="lg"
              className="shrink-0"
            >
              Claim this item
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

function ClaimPanelBody({ listing, reserved }: { listing: Listing; reserved: boolean }) {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <span className="text-[26px] font-extrabold leading-none text-green-700">FREE</span>
      </div>
      <dl className="mt-4 flex flex-col gap-2.5 border-y border-line-soft py-4 text-[13.5px]">
        <div className="flex items-center justify-between">
          <dt className="text-ink-500">Item</dt>
          <dd className="font-semibold text-ink">$0.00</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ink-500">Delivery ({listing.deliveryType.toLowerCase()})</dt>
          <dd className="font-semibold text-ink">
            {listing.deliveryEstimateCents == null
              ? "Quoted at checkout"
              : formatCurrency(listing.deliveryEstimateCents)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-ink-500">Platform service fee</dt>
          <dd className="font-semibold text-ink">Shown before payment</dd>
        </div>
      </dl>

      {reserved ? (
        <Button variant="outline" size="lg" className="mt-4 w-full" disabled>
          Reserved by another recipient
        </Button>
      ) : (
        <Button
          href={`/sign-in?next=/items/${listing.slug}`}
          variant="primary"
          size="lg"
          className="mt-4 w-full"
        >
          Claim this item
        </Button>
      )}

      <div className="mt-4 flex flex-col gap-2.5 text-[12.5px] text-ink-500">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />
          <span>
            {listing.verified
              ? "Verified by GivenItems.org staff before publication."
              : "Staff verification is still pending for this listing."}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Truck className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />
          <span>{listing.deliveryType} · ships from our regional hub</span>
        </div>
        <div className="flex items-start gap-2">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />
          <span>One eligible item per household. The donor never asks you for payment.</span>
        </div>
      </div>
    </>
  );
}
