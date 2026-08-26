import { ShieldCheck, Tag, Receipt } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Staff verified",
    body: "Every item is checked for condition, safety and ownership before it's listed.",
  },
  {
    icon: Tag,
    title: "Item price: $0",
    body: "The item itself is always free. No hidden pricing, ever.",
  },
  {
    icon: Receipt,
    title: "Transparent fees",
    body: "You see delivery and the flat service fee broken out before you pay.",
  },
];

export function TrustStrip() {
  return (
    <section className="rounded-[var(--radius-card)] border border-line-soft bg-surface p-5 shadow-card sm:p-6">
      <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-green-050 text-green-700">
              <item.icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <div className="text-[15px] font-bold text-ink">{item.title}</div>
              <div className="mt-0.5 text-[13.5px] leading-snug text-ink-500">
                {item.body}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
