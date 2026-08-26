import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose, Bullet } from "@/components/ui/Prose";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Safety",
  description:
    "How GivenItems.org screens for prohibited and recalled items, and how to report a safety concern.",
};

export default function SafetyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Safety"
        title="Verification exists to keep every claim safe."
        description="Staff check every item for safety before it's published — here's what that means and how to report a concern."
      />

      <Container className="py-10 sm:py-12">
        <Prose>
          <h2>Prohibited items</h2>
          <p>
            We do not accept items that are unsafe, illegal to transfer, or
            subject to an active recall. This includes, but isn&apos;t
            limited to:
          </p>
          <ul>
            <Bullet>Recalled appliances, car seats and children&apos;s products</Bullet>
            <Bullet>Weapons, ammunition and hazardous chemicals</Bullet>
            <Bullet>Items with exposed wiring, gas leaks or structural damage that can&apos;t be disclosed and mitigated</Bullet>
            <Bullet>Counterfeit goods or items without clear proof of ownership</Bullet>
            <Bullet>Mattresses and other items restricted by local health regulations</Bullet>
          </ul>

          <h2>How we verify</h2>
          <p>
            Every submission goes through a structured check covering donor
            identity, item ownership, existence, condition, recall status
            and delivery feasibility. High-risk categories — vehicles,
            machinery and anything oversized — require a second staff
            approval before publication.
          </p>

          <h2>Recalls</h2>
          <p>
            Verifiers cross-check appliances and children&apos;s items
            against current recall notices. If an item is later recalled
            after listing, we pause it immediately and notify anyone with
            an active reservation or claim.
          </p>

          <h2>Reporting a concern</h2>
          <p>
            If you receive an item that seems unsafe, doesn&apos;t match its
            listing, or you have any other safety concern about a donor,
            recipient or delivery, contact our support team right away.
            Every report gets a reference number and a staff review.
          </p>
        </Prose>

        <div className="mt-8">
          <Button href="/help" variant="primary">
            Report a concern
          </Button>
        </div>
      </Container>
    </>
  );
}
