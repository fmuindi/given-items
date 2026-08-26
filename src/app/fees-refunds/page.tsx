import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose, Bullet } from "@/components/ui/Prose";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Fees & refunds",
  description:
    "Every item on GivenItems.org is $0. Understand delivery costs, the platform service fee and when refunds apply.",
};

const lines = [
  { label: "Item", value: "$0.00", note: "Always. There is no price for the item itself." },
  { label: "Delivery", value: "Varies", note: "The exact quoted or approved cost to get it to you." },
  { label: "Platform service fee", value: "Flat fee", note: "Keeps verification, listing and support running." },
  { label: "Tax", value: "If applicable", note: "Only where required, shown before you pay." },
];

export default function FeesRefundsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fees & refunds"
        title="The item is always free. Here's exactly what you pay."
        description="No surprise charges. Every line on your total is shown before you pay anything."
      />

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_360px]">
        <Prose>
          <h2>Why there&apos;s a service fee</h2>
          <p>
            GivenItems.org is a registered non-profit, not a store. The
            Platform Service Fee helps cover donor verification, item
            inspection, listing preparation, customer support and platform
            operations — none of which come from the price of the item,
            because the item is never priced.
          </p>

          <h2>When you pay</h2>
          <p>
            You only pay once you claim an item and reach checkout. The
            review screen breaks out delivery and the service fee
            separately from the total, and nothing is charged until you
            confirm.
          </p>

          <h2>Refunds</h2>
          <ul>
            <Bullet>If a donor can&apos;t fulfil an item after payment, delivery and the service fee are refunded in full and your eligibility to claim again is restored.</Bullet>
            <Bullet>If a carrier can&apos;t service your address before dispatch, you receive a full refund and the item is released back to the queue.</Bullet>
            <Bullet>Cancelling before a donor has prepared the item for pickup follows our published cancellation window.</Bullet>
            <Bullet>Delivery exceptions, damage or returns are reviewed by staff using carrier evidence — refunds are never automatic from a single request, to keep the process fair to donors too.</Bullet>
          </ul>
        </Prose>

        <aside className="rounded-[var(--radius-card)] border border-line-soft bg-surface p-5 shadow-card">
          <h2 className="text-[14px] font-extrabold uppercase tracking-wide text-ink-500">
            Example checkout total
          </h2>
          <dl className="mt-4 flex flex-col divide-y divide-line-soft text-[14px]">
            {lines.map((l) => (
              <div key={l.label} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <dt className="font-semibold text-ink">{l.label}</dt>
                  <dd className="text-[12.5px] text-ink-500">{l.note}</dd>
                </div>
                <span className="shrink-0 font-bold text-ink">{l.value}</span>
              </div>
            ))}
          </dl>
          <div className="mt-4">
            <Button href="/items" variant="primary" className="w-full">
              Browse items
            </Button>
          </div>
        </aside>
      </Container>
    </>
  );
}
