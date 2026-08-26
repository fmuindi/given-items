import { ShieldCheck } from "lucide-react";
import { PlaceholderPhoto } from "@/components/ui/PlaceholderPhoto";
import type { ItemIcon, PhotoTone } from "@/lib/data/types";

export function ItemGallery({
  icon,
  tone,
  title,
}: {
  icon: ItemIcon;
  tone: PhotoTone;
  title: string;
}) {
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] sm:aspect-[16/10]">
        <PlaceholderPhoto icon={icon} tone={tone} iconClassName="h-20 w-20 sm:h-24 sm:w-24" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11.5px] font-bold text-green-700 shadow-card">
          <ShieldCheck className="h-3.5 w-3.5" />
          Verified photo
        </div>
      </div>
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
      <span className="sr-only">{title} — verified staff photos</span>
    </div>
  );
}
