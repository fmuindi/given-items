import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AuthPreviewForm } from "@/components/forms/AuthPreviewForm";

export const metadata: Metadata = {
  title: "Create account",
};

export default function SignUpPage() {
  return (
    <Container className="flex justify-center py-14 sm:py-20">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-[24px] font-extrabold tracking-tight text-ink">
          Create your account
        </h1>
        <p className="mt-1.5 text-center text-[14px] text-ink-500">
          Verify your eligibility once, then claim an item when you find
          the right one.
        </p>

        <div className="mt-6 rounded-[var(--radius-card)] border border-line-soft bg-surface p-6 shadow-card">
          <AuthPreviewForm mode="sign-up" />
        </div>

        <p className="mt-5 text-center text-[13.5px] text-ink-500">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-green-700 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </Container>
  );
}
