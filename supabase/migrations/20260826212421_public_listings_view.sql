-- Curated public projection. security_invoker = true means the view runs
-- with the CALLER's permissions, so it relies on (and is bounded by) the RLS
-- policies already in place on listings/items/item_media — it does not
-- grant any additional access on its own. Its fixed column list is what
-- keeps internal fields (verification_snapshot, approved_by, etc.) from
-- ever reaching a public response, even if a future table-level RLS policy
-- is loosened by mistake.

create view public.public_listings
  with (security_invoker = true)
  as
  select
    l.id,
    l.slug,
    l.title,
    l.description,
    l.city,
    l.state,
    l.category_slug,
    l.condition,
    l.status,
    l.published_at,
    i.dimensions,
    i.weight,
    i.delivery_type,
    i.known_defects,
    i.included_parts,
    l.created_at
  from public.listings l
  join public.items i on i.id = l.item_id
  where l.status in ('available', 'reserved');

grant select on public.public_listings to anon, authenticated;
