import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose, Bullet } from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GivenItems.org collects, uses and protects donor and recipient information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated August 23, 2026" />

      <Container className="py-10 sm:py-12">
        <Prose>
          <h2>What we collect</h2>
          <p>
            To verify donors and match recipients safely, we collect
            contact details, delivery addresses, item information and
            photos, and — where required for eligibility — identity
            verification details. We only collect what each step actually
            needs.
          </p>

          <h2>What stays private</h2>
          <ul>
            <Bullet>Exact donor and recipient street addresses are never shown publicly — only a general city/state area appears on listings.</Bullet>
            <Bullet>Identity documents and verification evidence are stored in access-controlled storage and viewable only by authorized staff.</Bullet>
            <Bullet>Donor and recipient contact details are never shared with each other directly.</Bullet>
            <Bullet>Photos are reviewed and, where needed, cropped or redacted before publication to remove faces, documents, plates and location metadata.</Bullet>
          </ul>

          <h2>How we use information</h2>
          <p>
            We use your information to verify submissions, publish
            approved listings, process reservations and payments,
            coordinate delivery, provide support, and meet legal and
            non-profit reporting obligations. We do not sell personal
            information.
          </p>

          <h2>Service providers</h2>
          <p>
            We share the minimum necessary information with vetted service
            providers who help us operate — payment processing, address
            validation, shipping and carrier logistics, email delivery and
            security monitoring. Each is bound by a data-processing
            agreement appropriate to the information they handle.
          </p>

          <h2>Retention</h2>
          <p>
            We keep donor evidence, recipient addresses and transaction
            records only as long as needed for verification, delivery,
            support, fraud prevention and legal record-keeping, after
            which they are deleted or anonymized on a defined schedule.
          </p>

          <h2>Your choices</h2>
          <p>
            You can request a copy of your data or ask us to delete your
            account information, subject to records we&apos;re required to
            keep. Contact{" "}
            <a href="mailto:privacy@givenitems.org">privacy@givenitems.org</a>{" "}
            to make a request.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
            <a href="mailto:privacy@givenitems.org">privacy@givenitems.org</a>.
          </p>
        </Prose>
      </Container>
    </>
  );
}
