import type { Metadata } from "next";
import { ShieldCheck, EyeOff, Ban } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { GiveItemForm } from "@/components/forms/GiveItemForm";

export const metadata: Metadata = {
  title: "Give an item",
  description:
    "Submit an item privately for staff verification. Nothing you submit is public until it's reviewed and published.",
};

const notices = [
  {
    icon: ShieldCheck,
    title: "Staff verify everything",
    body: "Every submission is checked for condition, safety and ownership before it can be published.",
  },
  {
    icon: EyeOff,
    title: "Your details stay private",
    body: "Your name, address and contact information are never shown publicly.",
  },
  {
    icon: Ban,
    title: "No account, no listing power",
    body: "Donors can't create accounts or publish listings — only verified staff do.",
  },
];

export default function GiveAnItemPage() {
  return (
    <>
      <PageHeader
        eyebrow="Give an item"
        title="Tell us about your item. Staff take it from there."
        description="This private form takes about eight minutes. Nothing is public until our team verifies it."
      />

      <Container className="grid gap-8 py-10 sm:py-12 lg:grid-cols-[1fr_380px]">
        <GiveItemForm />

        <aside className="flex flex-col gap-4 lg:order-first">
          {notices.map((n) => (
            <div
              key={n.title}
              className="rounded-[var(--radius-card)] border border-line-soft bg-surface p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-green-050 text-green-700">
                  <n.icon className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <div className="text-[14px] font-bold text-ink">{n.title}</div>
                  <div className="mt-0.5 text-[13px] leading-relaxed text-ink-500">
                    {n.body}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </aside>
      </Container>
    </>
  );
}
