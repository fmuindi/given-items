import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderPhoto } from "@/components/ui/PlaceholderPhoto";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-5 py-20 text-center">
      <div className="h-24 w-24 overflow-hidden rounded-[var(--radius-card)]">
        <PlaceholderPhoto icon="furniture" tone="slate" />
      </div>
      <div>
        <h1 className="text-[24px] font-extrabold tracking-tight text-ink">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-1.5 max-w-sm text-[14.5px] text-ink-500">
          The item or page you&apos;re looking for may have been claimed,
          moved or never existed.
        </p>
      </div>
      <div className="flex gap-3">
        <Button href="/items" variant="outline">
          Browse items
        </Button>
        <Button href="/" variant="primary">
          Back home
        </Button>
      </div>
    </Container>
  );
}
