import { cn } from "@/lib/utils";

const tones = {
  new: "bg-green-700 text-white",
  reserved: "bg-navy-900 text-white",
  available: "bg-white/95 text-ink-600",
  vehicle: "bg-amber-500 text-navy-900",
  accent: "bg-amber-500 text-navy-900",
  soft: "bg-green-050 text-green-800",
  error: "bg-error-050 text-error-600",
  neutral: "bg-line-soft text-ink-600",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
