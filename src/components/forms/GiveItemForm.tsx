"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, CircleCheck, ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  donorFormSchema,
  donorFormSteps,
  type DonorFormValues,
} from "@/lib/validation/donor-form";
import { categories } from "@/lib/data/categories";

const conditions = ["Like new", "Good", "Fair", "Working", "Needs repair"] as const;
const deliveryTypes = ["Parcel", "Local delivery", "Pickup", "Manual freight"] as const;

export function GiveItemForm() {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [reference, setReference] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<DonorFormValues>({
    resolver: zodResolver(donorFormSchema),
    mode: "onBlur",
    defaultValues: {
      photoCount: 0,
    },
  });

  const total = donorFormSteps.length;
  const current = donorFormSteps[step];

  async function goNext() {
    const valid = await trigger(current.fields, { shouldFocus: true });
    if (valid) setStep((s) => Math.min(s + 1, total - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const list = Array.from(e.target.files ?? []).map((f) => f.name);
    setFiles(list);
    setValue("photoCount", list.length, { shouldValidate: true });
  }

  async function onSubmit() {
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 900));
    setReference(`GI-${Math.floor(100000 + (step + files.length + 7) * 3697) % 900000 + 100000}`);
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="rounded-[var(--radius-card)] border border-line-soft bg-surface p-8 text-center shadow-card animate-slide-up">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-050 text-green-700">
          <CircleCheck className="h-8 w-8" />
        </span>
        <h2 className="mt-4 text-[22px] font-extrabold tracking-tight text-ink">
          Thank you — your submission is in review
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[14.5px] text-ink-500">
          Your reference number is <span className="font-bold text-ink">{reference}</span>.
          A staff verifier will review your item and email you if anything
          else is needed. Your submission stays private until it&apos;s
          approved and published.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/items" variant="outline">
            Browse items
          </Button>
          <Button href="/" variant="primary">
            Back home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-line-soft bg-surface p-5 shadow-card sm:p-7">
      <ol className="mb-6 flex items-center gap-1.5 overflow-x-auto" aria-label="Form progress">
        {donorFormSteps.map((s, i) => (
          <li key={s.id} className="flex items-center gap-1.5">
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold",
                i < step && "bg-green-700 text-white",
                i === step && "bg-navy-900 text-white",
                i > step && "bg-line-soft text-ink-400"
              )}
            >
              {i < step ? "✓" : i + 1}
            </span>
            {i < donorFormSteps.length - 1 && (
              <span className={cn("h-0.5 w-4 sm:w-6", i < step ? "bg-green-700" : "bg-line-soft")} />
            )}
          </li>
        ))}
      </ol>

      <p className="mb-1 text-[12px] font-extrabold uppercase tracking-wide text-green-700">
        Step {step + 1} of {total}
      </p>
      <h2 className="mb-5 text-[20px] font-extrabold tracking-tight text-ink">
        {current.title}
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step === total - 1) {
            handleSubmit(onSubmit)();
          } else {
            goNext();
          }
        }}
        noValidate
      >
        {current.id === "contact" && (
          <div className="flex flex-col gap-4">
            <Field label="Full name" error={errors.fullName?.message}>
              <input
                {...register("fullName")}
                className={inputClass}
                autoComplete="name"
                placeholder="Jordan Reyes"
              />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input
                {...register("email")}
                type="email"
                className={inputClass}
                autoComplete="email"
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <input
                {...register("phone")}
                type="tel"
                className={inputClass}
                autoComplete="tel"
                placeholder="(614) 555-0142"
              />
            </Field>
          </div>
        )}

        {current.id === "location" && (
          <div className="flex flex-col gap-4">
            <Field label="Street address" error={errors.addressLine1?.message}>
              <input
                {...register("addressLine1")}
                className={inputClass}
                autoComplete="address-line1"
                placeholder="123 Maple Street"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-[2fr_1fr_1fr]">
              <Field label="City" error={errors.city?.message}>
                <input {...register("city")} className={inputClass} placeholder="Columbus" />
              </Field>
              <Field label="State" error={errors.state?.message}>
                <input
                  {...register("state")}
                  className={inputClass}
                  placeholder="OH"
                  maxLength={2}
                />
              </Field>
              <Field label="ZIP" error={errors.zip?.message}>
                <input {...register("zip")} className={inputClass} placeholder="43215" />
              </Field>
            </div>
            <p className="text-[12.5px] text-ink-500">
              Your exact address is never shown publicly. It&apos;s only used
              by staff and, once approved, our delivery partner.
            </p>
          </div>
        )}

        {current.id === "item" && (
          <div className="flex flex-col gap-4">
            <Field label="Category" error={errors.category?.message}>
              <select {...register("category")} className={inputClass} defaultValue="">
                <option value="" disabled>
                  Choose a category
                </option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Item title" error={errors.title?.message}>
              <input
                {...register("title")}
                className={inputClass}
                placeholder="e.g. Chest freezer, 7 cu ft"
              />
            </Field>
            <Field label="Description" error={errors.description?.message}>
              <textarea
                {...register("description")}
                className={cn(inputClass, "h-28 resize-none py-2.5")}
                placeholder="What is it, how old is it, why are you giving it away?"
              />
            </Field>
          </div>
        )}

        {current.id === "condition" && (
          <div className="flex flex-col gap-4">
            <Field label="Condition" error={errors.condition?.message}>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {conditions.map((c) => (
                  <label
                    key={c}
                    className="tap-target flex cursor-pointer items-center justify-center rounded-[var(--radius-control)] border border-line px-2 text-center text-[13px] font-semibold text-ink-600 has-[:checked]:border-green-700 has-[:checked]:bg-green-050 has-[:checked]:text-green-700"
                  >
                    <input
                      type="radio"
                      value={c}
                      {...register("condition")}
                      className="sr-only"
                    />
                    {c}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="Known defects" error={errors.knownDefects?.message}>
              <textarea
                {...register("knownDefects")}
                className={cn(inputClass, "h-24 resize-none py-2.5")}
                placeholder='e.g. "Small dent on right panel" or "None noted"'
              />
            </Field>
            <Field label="Included parts (optional)" error={errors.includedParts?.message}>
              <textarea
                {...register("includedParts")}
                className={cn(inputClass, "h-20 resize-none py-2.5")}
                placeholder="Manuals, accessories, spare parts…"
              />
            </Field>
          </div>
        )}

        {current.id === "logistics" && (
          <div className="flex flex-col gap-4">
            <Field label="Delivery type" error={errors.deliveryType?.message}>
              <div className="grid grid-cols-2 gap-2">
                {deliveryTypes.map((d) => (
                  <label
                    key={d}
                    className="tap-target flex cursor-pointer items-center justify-center rounded-[var(--radius-control)] border border-line px-2 text-center text-[13px] font-semibold text-ink-600 has-[:checked]:border-green-700 has-[:checked]:bg-green-050 has-[:checked]:text-green-700"
                  >
                    <input
                      type="radio"
                      value={d}
                      {...register("deliveryType")}
                      className="sr-only"
                    />
                    {d}
                  </label>
                ))}
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Approx. dimensions" error={errors.dimensions?.message}>
                <input
                  {...register("dimensions")}
                  className={inputClass}
                  placeholder='e.g. 33"W x 25"D x 34"H'
                />
              </Field>
              <Field label="Approx. weight" error={errors.weight?.message}>
                <input {...register("weight")} className={inputClass} placeholder="e.g. 95 lb" />
              </Field>
            </div>
          </div>
        )}

        {current.id === "media" && (
          <div className="flex flex-col gap-3">
            <p className="text-[13.5px] text-ink-500">
              Add at least one clear photo. JPG or PNG, up to 10MB each.
              Staff use these to verify condition before publishing.
            </p>
            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-[var(--radius-card)] border-2 border-dashed border-line px-6 py-10 text-center hover:border-green-700">
              <Upload className="h-6 w-6 text-ink-400" />
              <span className="text-[13.5px] font-bold text-ink">
                Tap to choose photos
              </span>
              <span className="text-[12px] text-ink-400">or drag files here</span>
              <input
                type="file"
                accept="image/png,image/jpeg"
                multiple
                className="sr-only"
                onChange={onFilesChange}
              />
            </label>
            {errors.photoCount && (
              <p className="text-[12.5px] font-semibold text-error-600">
                {errors.photoCount.message}
              </p>
            )}
            {files.length > 0 && (
              <ul className="flex flex-col gap-1.5 text-[13px] text-ink-600">
                {files.map((f) => (
                  <li key={f} className="flex items-center gap-2 rounded-lg bg-page px-3 py-2">
                    <CircleCheck className="h-4 w-4 shrink-0 text-green-700" />
                    <span className="truncate">{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {current.id === "declarations" && (
          <div className="flex flex-col gap-4">
            <div className="rounded-[var(--radius-control)] bg-page p-4 text-[13.5px] text-ink-600">
              We&apos;ll review your submission privately. It never appears
              publicly unless staff verify and publish it.
            </div>
            <label className="flex items-start gap-3 text-[13.5px] text-ink-600">
              <input
                type="checkbox"
                {...register("consentVerification")}
                className="mt-0.5 h-4 w-4 shrink-0 accent-green-700"
              />
              I confirm I own this item and consent to staff verification
              before it is listed.
            </label>
            {errors.consentVerification && (
              <p className="-mt-3 text-[12.5px] font-semibold text-error-600">
                {errors.consentVerification.message}
              </p>
            )}
            <label className="flex items-start gap-3 text-[13.5px] text-ink-600">
              <input
                type="checkbox"
                {...register("consentPrivacy")}
                className="mt-0.5 h-4 w-4 shrink-0 accent-green-700"
              />
              I have read the{" "}
              <a href="/privacy" className="font-semibold text-green-700 underline">
                Privacy Policy
              </a>{" "}
              and understand my contact details stay private.
            </label>
            {errors.consentPrivacy && (
              <p className="-mt-3 text-[12.5px] font-semibold text-error-600">
                {errors.consentPrivacy.message}
              </p>
            )}
          </div>
        )}

        <div className="mt-7 flex items-center justify-between gap-3">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={goBack}>
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <span />
          )}

          {step < total - 1 ? (
            <Button type="submit" variant="primary">
              Continue
            </Button>
          ) : (
            <Button type="submit" variant="primary" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit for review"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

const inputClass =
  "h-11 w-full rounded-[var(--radius-control)] border border-line bg-white px-3.5 text-[14.5px] text-ink placeholder:text-ink-400 outline-none focus:border-green-700";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-bold text-ink">
        {children && (
          <>
            {label}
            <div className="mt-1.5 font-normal">{children}</div>
          </>
        )}
      </label>
      {error && (
        <p className="mt-1.5 text-[12.5px] font-semibold text-error-600">{error}</p>
      )}
    </div>
  );
}
