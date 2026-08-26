import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import {
  MessageSquareText,
  ClipboardCheck,
  Megaphone,
  Search,
  UserCheck,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How GivenItems.org verifies donors and items, publishes listings, and lets an eligible recipient claim one free item at a time.",
};

const donorSteps = [
  {
    icon: MessageSquareText,
    title: "Submit privately",
    body: "Complete an eight-minute form: contact details, item facts, condition and a few photos. Nothing is public yet.",
  },
  {
    icon: ClipboardCheck,
    title: "Staff verify",
    body: "We confirm identity, ownership, condition and safety. Rejected items stay private with a reason.",
  },
  {
    icon: Megaphone,
    title: "We publish it",
    body: "A second staff review checks photos, fees and location before the listing goes live.",
  },
];

const recipientSteps = [
  {
    icon: Search,
    title: "Browse and choose",
    body: "Every listing shows real condition, defects and delivery details before you claim anything.",
  },
  {
    icon: UserCheck,
    title: "Verify eligibility",
    body: "Create an account, confirm your email, phone and address. One active claim per household.",
  },
  {
    icon: Truck,
    title: "Pay delivery and receive it",
    body: "See the total before you pay — delivery plus a flat service fee, never a price for the item.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="A verified path from a spare room to someone who needs it."
        description="Donors never publish listings themselves. Staff verify every item and every recipient before anything changes hands."
      />

      <Container className="flex flex-col gap-12 py-10 sm:py-12">
        <section>
          <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-green-700">
            For donors
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {donorSteps.map((s, i) => (
              <div
                key={s.title}
                className="rounded-[var(--radius-card)] border border-line-soft bg-surface p-5 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-green-050 text-green-700">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="text-[13px] font-extrabold text-ink-400">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-3 text-[16px] font-bold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Button href="/give-an-item" variant="primary">
              Start the donor form
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-green-700">
            For recipients
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {recipientSteps.map((s, i) => (
              <div
                key={s.title}
                className="rounded-[var(--radius-card)] border border-line-soft bg-surface p-5 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-green-050 text-green-700">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="text-[13px] font-extrabold text-ink-400">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-3 text-[16px] font-bold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Button href="/items" variant="primary">
              Browse available items
            </Button>
          </div>
        </section>

        <section className="rounded-[var(--radius-card)] bg-green-050 p-6 sm:p-8">
          <h2 className="text-[19px] font-extrabold tracking-tight text-ink">
            Why one item per household?
          </h2>
          <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-ink-600">
            GivenItems.org exists to get usable things to people who need
            them, not to become a resale channel. Every account is checked
            for eligibility, and a verified recipient may hold only one
            active reservation and complete one eligible claim under the
            current program policy.
          </p>
        </section>
      </Container>
    </>
  );
}
