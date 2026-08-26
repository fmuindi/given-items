import { Button } from "@/components/ui/Button";
import { PlaceholderPhoto } from "@/components/ui/PlaceholderPhoto";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <section className="grid gap-3.5 lg:grid-cols-[2fr_1fr]">
      <div className="relative min-h-[380px] overflow-hidden rounded-[var(--radius-card)] bg-navy-900 sm:min-h-[420px]">
        <div className="absolute inset-0">
          <PlaceholderPhoto icon="furniture" tone="navy" iconClassName="h-24 w-24 sm:h-32 sm:w-32" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 sm:via-navy-900/75 to-transparent" />
        <div className="relative flex h-full flex-col justify-center px-6 py-10 sm:max-w-[560px] sm:px-10 sm:py-12">
          <Badge tone="soft" className="w-fit bg-amber-500 text-navy-900">
            Non-profit
          </Badge>
          <h1 className="mt-4 text-[34px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[44px] lg:text-[48px]">
            Don&apos;t dump it.
            <br />
            Give it to someone
            <br />
            who needs it.
          </h1>
          <p className="mt-4 max-w-md text-[16px] font-medium text-[#C6D6E3] sm:text-[16.5px]">
            We verify every donated item and match it to a household that
            needs it.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Button href="/items" variant="primary" size="lg">
              Browse free items
            </Button>
            <Button href="/give-an-item" variant="outline-light" size="lg">
              Donate an item
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-1">
        <div className="relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-navy-800">
          <PlaceholderPhoto icon="garden" tone="green" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-800/95 via-navy-800/40 to-transparent" />
          <div className="relative p-5">
            <div className="text-xl font-extrabold tracking-tight text-white">
              Lawn &amp; garden
            </div>
            <div className="mt-1 text-[13.5px] font-semibold text-[#C6D6E3]">
              Verified and ready now
            </div>
          </div>
        </div>
        <div className="relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-green-700">
          <PlaceholderPhoto icon="appliance" tone="green" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-green-800/95 via-green-800/40 to-transparent" />
          <div className="relative p-5">
            <div className="text-xl font-extrabold tracking-tight text-white">
              Big appliances
            </div>
            <div className="mt-1 text-[13.5px] font-semibold text-[#CDEADD]">
              Delivery quoted at checkout
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
