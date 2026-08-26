import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose, Bullet } from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing donor submissions, recipient claims and use of GivenItems.org.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" description="Last updated August 23, 2026" />

      <Container className="py-10 sm:py-12">
        <Prose>
          <h2>What GivenItems.org is</h2>
          <p>
            GivenItems.org is a managed giving platform operated by a
            registered non-profit. We connect verified donors with
            eligible recipients. We are not a marketplace: donors cannot
            publish listings themselves, and every listing is created and
            reviewed by our staff before publication.
          </p>

          <h2>Donor terms</h2>
          <ul>
            <Bullet>By submitting an item, you confirm you own it and have the right to give it away.</Bullet>
            <Bullet>Submissions are reviewed privately; approval is at our discretion based on condition, safety and eligibility.</Bullet>
            <Bullet>You may be asked to reconfirm availability before delivery, and to withdraw a submission at any time before publication.</Bullet>
          </ul>

          <h2>Recipient terms</h2>
          <ul>
            <Bullet>Items are $0. You are responsible for delivery costs and the disclosed Platform Service Fee shown at checkout.</Bullet>
            <Bullet>A verified account may hold only one active reservation and complete one eligible claim under the current program policy.</Bullet>
            <Bullet>Reservations expire automatically if checkout isn&apos;t completed within the stated window.</Bullet>
            <Bullet>Providing false eligibility or address information may result in cancellation of a claim and account restriction.</Bullet>
          </ul>

          <h2>Payments</h2>
          <p>
            Payments are processed by our third-party payment provider.
            We do not store full payment card details. All totals are
            calculated and confirmed server-side before you are charged;
            refunds follow our published{" "}
            <a href="/fees-refunds">fees and refunds policy</a>.
          </p>

          <h2>Prohibited use</h2>
          <p>
            You may not use GivenItems.org to resell claimed items for
            profit, submit items you don&apos;t own, misrepresent
            eligibility, or attempt to bypass verification or the
            one-item policy.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            Items are given &quot;as described&quot; based on staff
            verification at the time of listing. We are not responsible
            for pre-existing conditions disclosed in a listing, but we do
            investigate and remedy verified misrepresentation or delivery
            failures under our refund policy.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms as the platform evolves. Material
            changes will be posted here with an updated effective date.
          </p>
        </Prose>
      </Container>
    </>
  );
}
