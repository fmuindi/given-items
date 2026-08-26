const steps = [
  {
    n: "1",
    title: "Donor contacts us",
    body: "A private, eight-minute form. No public account, no public listing.",
  },
  {
    n: "2",
    title: "We verify and publish",
    body: "Staff confirm condition, safety and ownership, then write the listing.",
  },
  {
    n: "3",
    title: "Recipient claims it",
    body: "One eligible item per household. Pay only delivery and the service fee.",
  },
];

export function StepsExplainer() {
  return (
    <section className="rounded-[var(--radius-card)] border border-line-soft bg-surface p-5 shadow-card sm:p-6">
      <div className="grid gap-6 sm:grid-cols-[1fr_2fr] sm:items-center sm:gap-8">
        <div>
          <div className="text-[12px] font-extrabold uppercase tracking-wider text-green-700">
            Why we exist
          </div>
          <h2 className="mt-2 text-[21px] font-extrabold leading-snug tracking-tight text-ink">
            Usable things shouldn&apos;t go to landfill while families go
            without.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-green-050 text-[15px] font-extrabold text-green-700">
                {s.n}
              </span>
              <div>
                <div className="text-[15px] font-bold text-ink">{s.title}</div>
                <div className="mt-0.5 text-[13.5px] text-ink-500">{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
