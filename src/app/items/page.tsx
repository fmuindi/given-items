import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ItemGrid } from "@/components/items/ItemGrid";
import { SortBar } from "@/components/items/SortBar";
import { FilterPanel } from "@/components/items/FilterPanel";
import { MobileFiltersDisclosure } from "@/components/items/MobileFiltersDisclosure";
import { getPublicListings } from "@/lib/data/items";
import { getCategory } from "@/lib/data/categories";
import type { ItemsSearchParams } from "@/lib/filters";

export const metadata: Metadata = {
  title: "Browse free items",
  description:
    "Browse donated items available now — appliances, furniture, tools, electronics and more. Every item is $0.",
};

export default async function ItemsPage({
  searchParams,
}: {
  searchParams: Promise<ItemsSearchParams>;
}) {
  const sp = await searchParams;
  let listings = getPublicListings();

  if (sp.category) {
    listings = listings.filter((l) => l.categorySlug === sp.category);
  }
  if (sp.condition) {
    listings = listings.filter((l) => l.condition === sp.condition);
  }
  if (sp.q) {
    const q = sp.q.toLowerCase();
    listings = listings.filter((l) => l.title.toLowerCase().includes(q));
  }

  if (sp.sort === "cheapest") {
    listings = [...listings].sort((a, b) => {
      if (a.deliveryEstimateCents == null) return 1;
      if (b.deliveryEstimateCents == null) return -1;
      return a.deliveryEstimateCents - b.deliveryEstimateCents;
    });
  } else {
    listings = [...listings].sort(
      (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    );
  }

  const category = sp.category ? getCategory(sp.category) : undefined;
  const heading = category ? category.name : sp.q ? `Results for “${sp.q}”` : "All free items";

  return (
    <Container className="flex flex-col gap-5 pb-16 pt-5">
      <div>
        <h1 className="text-[24px] font-extrabold tracking-tight text-ink sm:text-[28px]">
          {heading}
        </h1>
        <p className="mt-1 text-[14px] text-ink-500">
          {listings.length} {listings.length === 1 ? "item" : "items"} donated so far
        </p>
      </div>

      <MobileFiltersDisclosure current={sp} />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-[var(--radius-card)] border border-line-soft bg-surface p-4 shadow-card">
            <FilterPanel current={sp} />
          </div>
        </aside>

        <div className="flex flex-col gap-4">
          <SortBar current={sp} />
          <ItemGrid listings={listings} />
        </div>
      </div>
    </Container>
  );
}
