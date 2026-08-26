import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { StepsExplainer } from "@/components/home/StepsExplainer";
import { CategoryChips } from "@/components/home/CategoryChips";
import { DonateCta } from "@/components/home/DonateCta";
import { ItemGrid } from "@/components/items/ItemGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getPublicListings } from "@/lib/data/items";

export default function Home() {
  const listings = getPublicListings().slice(0, 8);

  return (
    <Container className="flex flex-col gap-4 pb-16 pt-4 sm:gap-5 sm:pt-5">
      <Hero />
      <TrustStrip />
      <StepsExplainer />
      <CategoryChips />

      <section className="rounded-[var(--radius-card)] border border-line-soft bg-surface p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[20px] font-extrabold tracking-tight text-ink sm:text-[22px]">
            Just added near Columbus, OH
          </h2>
          <Button href="/items" variant="ghost" size="sm">
            View all
          </Button>
        </div>
        <div className="mt-4">
          <ItemGrid listings={listings} />
        </div>
      </section>

      <DonateCta />
    </Container>
  );
}
