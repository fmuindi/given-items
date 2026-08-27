"use client";

import { useState } from "react";
import { ShieldCheck, Camera } from "lucide-react";
import { PlaceholderPhoto } from "@/components/ui/PlaceholderPhoto";
import { cn } from "@/lib/utils";
import type { ItemIcon, PhotoTone } from "@/lib/data/types";

export function ItemGallery({
  photoUrls,
  icon,
  tone,
  title,
  verified = false,
}: {
  photoUrls: string[];
  icon: ItemIcon;
  tone: PhotoTone;
  title: string;
  verified?: boolean;
}) {
  const [active, setActive] = useState(0);
  const hasPhotos = photoUrls.length > 0;
  const mainUrl = hasPhotos ? photoUrls[Math.min(active, photoUrls.length - 1)] : undefined;

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-page sm:aspect-[16/10]">
        {mainUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- external donor photo
          <img src={mainUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          <PlaceholderPhoto icon={icon} tone={tone} iconClassName="h-20 w-20 sm:h-24 sm:w-24" />
        )}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11.5px] font-bold text-green-700 shadow-card">
          {verified ? (
            <>
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified photo
            </>
          ) : (
            <>
              <Camera className="h-3.5 w-3.5" />
              Donor photo — pending verification
            </>
          )}
        </div>
      </div>

      {hasPhotos && photoUrls.length > 1 ? (
        <div className="mt-2.5 grid grid-cols-4 gap-2.5">
          {photoUrls.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "aspect-square overflow-hidden rounded-[8px] outline-offset-2",
                active === i && "ring-2 ring-green-700"
              )}
              aria-label={`Show photo ${i + 1} of ${title}`}
              aria-current={active === i}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- external donor photo */}
              <img src={url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : !hasPhotos ? (
        <div className="mt-2.5 grid grid-cols-4 gap-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-[8px] opacity-90"
              aria-hidden="true"
            >
              <PlaceholderPhoto icon={icon} tone={tone} iconClassName="h-6 w-6" />
            </div>
          ))}
        </div>
      ) : null}
      <span className="sr-only">
        {title} — {verified ? "verified staff photos" : "donor-submitted photos, not yet verified by staff"}
      </span>
    </div>
  );
}
