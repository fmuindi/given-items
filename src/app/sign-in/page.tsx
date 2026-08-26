import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AuthPreviewForm } from "@/components/forms/AuthPreviewForm";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <Container className="flex justify-center py-14 sm:py-20">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-[24px] font-extrabold tracking-tight text-ink">
          Sign in
        </h1>
        <p className="mt-1.5 text-center text-[14px] text-ink-500">
          Track a claim or start browsing eligible items.
        </p>

        <div className="mt-6 rounded-[var(--radius-card)] border border-line-soft bg-surface p-6 shadow-card">
          <AuthPreviewForm mode="sign-in" />
        </div>

        <p className="mt-5 text-center text-[13.5px] text-ink-500">
          New here?{" "}
          <Link href="/sign-up" className="font-semibold text-green-700 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </Container>
  );
}
