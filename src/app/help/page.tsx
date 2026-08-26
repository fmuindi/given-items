import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Help",
  description: "Frequently asked questions and how to contact GivenItems.org support.",
};

const faqs = [
  {
    q: "Is GivenItems.org really free?",
    a: "Yes. Every listed item is $0. You only pay actual delivery costs and a flat, disclosed Platform Service Fee — shown before you confirm anything.",
  },
  {
    q: "How many items can I claim?",
    a: "A verified recipient may hold one active reservation and complete one eligible claim under the current program policy. This keeps items moving to as many households as possible.",
  },
  {
    q: "How long does verification take?",
    a: "Most donor submissions are triaged within a few business days. If we need more information, we'll reach out with a secure request and a deadline.",
  },
  {
    q: "Can I contact the donor directly?",
    a: "No. To protect everyone's privacy, donor and recipient contact details are never shared directly. Our team coordinates delivery on your behalf.",
  },
  {
    q: "What if the item doesn't match the listing?",
    a: "Contact support immediately with your reference number. We review the case using delivery evidence and our verification records, and offer a refund or resolution based on our published policy.",
  },
  {
    q: "Can I donate a car or riding mower?",
    a: "Yes, but large and freight-size items go through a manual review process rather than instant checkout, since delivery, title and insurance require extra coordination.",
  },
];

export default function HelpPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Answers to the questions we hear most."
        description="Can't find what you need? Reach our support team directly below."
      />

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col divide-y divide-line-soft rounded-[var(--radius-card)] border border-line-soft bg-surface shadow-card">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-bold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="shrink-0 text-ink-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-500">{f.a}</p>
            </details>
          ))}
        </div>

        <aside className="h-fit rounded-[var(--radius-card)] border border-line-soft bg-surface p-5 shadow-card">
          <h2 className="text-[15px] font-extrabold text-ink">Still need help?</h2>
          <p className="mt-1.5 text-[13.5px] text-ink-500">
            Every request gets a reference number so you can follow up
            easily.
          </p>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href="mailto:support@givenitems.org"
              className="flex items-center gap-2.5 rounded-[var(--radius-control)] border border-line px-3.5 py-3 text-[13.5px] font-semibold text-ink-600 hover:border-green-700 hover:text-green-700"
            >
              <Mail className="h-4 w-4" />
              support@givenitems.org
            </a>
            <a
              href="tel:+18005550118"
              className="flex items-center gap-2.5 rounded-[var(--radius-control)] border border-line px-3.5 py-3 text-[13.5px] font-semibold text-ink-600 hover:border-green-700 hover:text-green-700"
            >
              <Phone className="h-4 w-4" />
              1-800-555-0118
            </a>
          </div>
        </aside>
      </Container>
    </>
  );
}
