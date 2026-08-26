import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, CircleCheck, TriangleAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ItemGallery } from "@/components/items/ItemGallery";
import { ClaimPanel } from "@/components/items/ClaimPanel";
import { ItemGrid } from "@/components/items/ItemGrid";
import { listings, getListing, getRelatedListings } from "@/lib/data/items";
import { getCategory } from "@/lib/data/categories";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return {};
  return {
    title: listing.title,
    description: `${listing.condition} condition, ${listing.city}, ${listing.state}. Free item — staff verified. ${listing.description}`,
  };
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  const category = getCategory(listing.categorySlug);
  const related = getRelatedListings(listing);

  return (
    <Container className="flex flex-col gap-6 pb-28 pt-5 lg:pb-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-ink-500">
        <Link href="/items" className="hover:text-green-700">
          Items
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        {category && (
          <>
            <Link href={`/categories/${category.slug}`} className="hover:text-green-700">
              {category.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        )}
        <span className="truncate text-ink-600">{listing.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <ItemGallery icon={listing.photoIcon} tone={listing.photoTone} title={listing.title} />

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {listing.status === "reserved" ? (
              <Badge tone="reserved">Reserved</Badge>
            ) : (
              <Badge tone="soft">Available</Badge>
            )}
            <Badge tone="neutral">{listing.condition}</Badge>
          </div>

          <h1 className="mt-3 text-[26px] font-extrabold leading-tight tracking-tight text-ink sm:text-[30px]">
            {listing.title}
          </h1>
          <p className="mt-1.5 text-[14px] font-semibold text-ink-500">
            {listing.city}, {listing.state} area · Listed{" "}
            {new Date(listing.postedDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <section className="mt-6">
            <h2 className="text-[15px] font-extrabold text-ink">Condition summary</h2>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-600">
              {listing.description}
            </p>
          </section>

          <section className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-1.5 text-[14px] font-extrabold text-ink">
                <TriangleAlert className="h-4 w-4 text-amber-600" />
                Known defects
              </h3>
              <ul className="mt-2 flex flex-col gap-1.5 text-[13.5px] text-ink-600">
                {listing.knownDefects.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-1.5 text-[14px] font-extrabold text-ink">
                <CircleCheck className="h-4 w-4 text-green-700" />
                Included parts
              </h3>
              <ul className="mt-2 flex flex-col gap-1.5 text-[13.5px] text-ink-600">
                {listing.includedParts.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-6 rounded-[var(--radius-card)] border border-line-soft bg-surface p-4">
            <dl className="grid grid-cols-2 gap-4 text-[13.5px] sm:grid-cols-4">
              <div>
                <dt className="text-ink-400">Dimensions</dt>
                <dd className="mt-0.5 font-semibold text-ink">{listing.dimensions}</dd>
              </div>
              <div>
                <dt className="text-ink-400">Weight</dt>
                <dd className="mt-0.5 font-semibold text-ink">{listing.weight}</dd>
              </div>
              <div>
                <dt className="text-ink-400">Delivery</dt>
                <dd className="mt-0.5 font-semibold text-ink">{listing.deliveryType}</dd>
              </div>
              <div>
                <dt className="text-ink-400">Category</dt>
                <dd className="mt-0.5 font-semibold text-ink">{category?.name}</dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="lg:pt-0">
          <ClaimPanel listing={listing} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-4">
          <h2 className="text-[19px] font-extrabold tracking-tight text-ink">
            More in {category?.name}
          </h2>
          <div className="mt-4">
            <ItemGrid listings={related} />
          </div>
        </section>
      )}
    </Container>
  );
}
