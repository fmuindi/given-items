import { PlaceholderPhoto } from "@/components/ui/PlaceholderPhoto";
import { cn } from "@/lib/utils";
import type { ItemIcon, PhotoTone } from "@/lib/data/types";

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
    // eslint-disable-next-line @next/next/no-img-element -- external donor photos, not project-owned assets
    <img
      src={url}
      alt={alt}
      loading="lazy"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
