import {
  Refrigerator,
  Sofa,
  TreePine,
  Wrench,
  Tv,
  Car,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ItemIcon, PhotoTone } from "@/lib/data/types";

const icons: Record<ItemIcon, LucideIcon> = {
  appliance: Refrigerator,
  furniture: Sofa,
  garden: TreePine,
  tools: Wrench,
  electronics: Tv,
  vehicle: Car,
  kitchen: UtensilsCrossed,
};

const tones: Record<PhotoTone, string> = {
  navy: "from-navy-800 to-navy-900 text-white/25",
  green: "from-green-700 to-green-800 text-white/25",
  amber: "from-amber-500 to-amber-600 text-navy-900/20",
  slate: "from-ink-400 to-ink-600 text-white/25",
};

export function PlaceholderPhoto({
  icon,
  tone = "slate",
  className,
  iconClassName,
}: {
  icon: ItemIcon;
  tone?: PhotoTone;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = icons[icon] ?? Sofa;
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br",
        tones[tone],
        className
      )}
      aria-hidden="true"
    >
      <Icon className={cn("h-10 w-10 sm:h-12 sm:w-12", iconClassName)} strokeWidth={1.4} />
    </div>
  );
}
