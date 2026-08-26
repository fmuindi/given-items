import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PlaceholderPhoto } from "@/components/ui/PlaceholderPhoto";
import { ItemGrid } from "@/components/items/ItemGrid";
import { Button } from "@/components/ui/Button";
import { categories, getCategory } from "@/lib/data/categories";
import { getListingsByCategory } from "@/lib/data/items";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `Browse verified, free ${category.name.toLowerCase()} available now. ${category.blurb}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const listings = getListingsByCategory(slug);

  return (
    <Container className="flex flex-col gap-6 pb-16 pt-5">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-ink-500">
        <Link href="/items" className="hover:text-green-700">
          Items
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink-600">{category.name}</span>
      </nav>

      <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line-soft bg-surface p-5 shadow-card sm:flex-row sm:items-center sm:gap-5">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[10px]">
          <PlaceholderPhoto icon={category.icon} tone="slate" />
        </div>
        <div>
          <h1 className="text-[22px] font-extrabold tracking-tight text-ink sm:text-[26px]">
            {category.name}
          </h1>
          <p className="mt-1 text-[14px] text-ink-500">{category.blurb}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <Button
            key={c.slug}
            href={`/categories/${c.slug}`}
            variant={c.slug === slug ? "dark" : "outline"}
            size="sm"
          >
            {c.name}
          </Button>
        ))}
      </div>

      <ItemGrid listings={listings} />
    </Container>
  );
}
