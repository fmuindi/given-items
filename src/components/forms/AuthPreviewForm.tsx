"use client";

import { useState, type FormEvent } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AuthPreviewForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const [shown, setShown] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setShown(true);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {mode === "sign-up" && (
        <Field label="Full name">
          <input className={inputClass} placeholder="Jordan Reyes" autoComplete="name" />
        </Field>
      )}
      <Field label="Email">
        <input
          type="email"
          className={inputClass}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </Field>
      <Field label="Password">
        <input
          type="password"
          className={inputClass}
          placeholder="••••••••"
          autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
        />
      </Field>

      <Button type="submit" variant="primary" size="lg" className="mt-1 w-full">
        {mode === "sign-in" ? "Sign in" : "Create account"}
      </Button>

      {shown && (
        <div className="flex items-start gap-2.5 rounded-[var(--radius-control)] bg-green-050 p-3.5 text-[13px] leading-relaxed text-green-800 animate-slide-up">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            This is a visual preview of the account flow. Sign-in, email
            verification and eligibility checks connect in a later
            milestone, once Supabase Auth is wired up.
          </span>
        </div>
      )}
    </form>
  );
}

const inputClass =
  "h-11 w-full rounded-[var(--radius-control)] border border-line bg-white px-3.5 text-[14.5px] text-ink placeholder:text-ink-400 outline-none focus:border-green-700";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-[13px] font-bold text-ink">
      {label}
      <div className="mt-1.5 font-normal">{children}</div>
    </label>
  );
}
