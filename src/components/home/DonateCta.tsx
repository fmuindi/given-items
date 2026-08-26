import { Button } from "@/components/ui/Button";

export function DonateCta() {
  return (
    <section className="rounded-[var(--radius-card)] bg-navy-900 p-6 sm:p-9">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="max-w-lg text-[24px] font-extrabold tracking-tight text-white sm:text-[30px]">
            Clearing out? Give it a second life.
          </h2>
          <p className="mt-2.5 max-w-md text-[15px] font-medium text-[#AFC4D5] sm:text-[15.5px]">
            An eight-minute private form. We handle verification, listing
            and delivery — you just say yes when we find the right home for
            it.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button href="/give-an-item" variant="primary" size="lg">
            Donate an item
          </Button>
          <Button href="/how-it-works" variant="outline-light" size="lg">
            How it works
          </Button>
        </div>
      </div>
    </section>
  );
}
