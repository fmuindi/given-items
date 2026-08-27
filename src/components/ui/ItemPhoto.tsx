import { PlaceholderPhoto } from "@/components/ui/PlaceholderPhoto";
import { cn } from "@/lib/utils";
import type { ItemIcon, PhotoTone } from "@/lib/data/types";

/**
 * Donor photos arrive in whatever orientation the donor shot them —
 * portrait phone photos and landscape photos side by side. object-cover
 * would crop unpredictably (chopping the top off a fridge in one card,
 * barely cropping a landscape shot in the next), which reads as
 * inconsistent. object-contain on a neutral backdrop keeps every photo
 * whole and every box the same size, so the grid feels uniform instead.
 */
export function ItemPhoto({
  url,
  alt,
  icon,
  tone,
  className,
}: {
  url?: string;
  alt: string;
  icon: ItemIcon;
  tone?: PhotoTone;
  className?: string;
}) {
  if (!url) {
    return <PlaceholderPhoto icon={icon} tone={tone} className={className} />;
  }

  return (
    <div className={cn("flex h-full w-full items-center justify-center bg-page", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- external donor photos, not project-owned assets */}
      <img src={url} alt={alt} loading="lazy" className="h-full w-full object-contain" />
    </div>
  );
}
