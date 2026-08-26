import { cn } from "@/lib/utils";

export function Prose({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex max-w-[680px] flex-col gap-4 text-[14.5px] leading-relaxed text-ink-600",
        "[&_h2]:mt-6 [&_h2]:text-[19px] [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-ink",
        "[&_h3]:mt-3 [&_h3]:text-[15.5px] [&_h3]:font-bold [&_h3]:text-ink",
        "[&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-1",
        "[&_li]:flex [&_li]:gap-2.5",
        "[&_strong]:font-bold [&_strong]:text-ink",
        "[&_a]:font-semibold [&_a]:text-green-700 [&_a]:underline",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-400" />
      <span>{children}</span>
    </li>
  );
}
